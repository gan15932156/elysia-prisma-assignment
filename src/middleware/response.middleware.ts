import Elysia from "elysia";
import { Prisma } from "../generated/prisma";
import { ErrorResponse, SuccessResponse } from "../schemas/response-schema";
import { transformValidationError } from "../utils/transform-validation-error";
export const isJsonString = (str: string) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return false;
  }
};

export const useSuccessResponseMiddleware = new Elysia().onAfterHandle(
  { as: "global" },
  async (context): Promise<SuccessResponse> => {
    const path = context.request.url;
    const message = "success";
    const response = context.responseValue;
    const timeStamp = new Date().toISOString();
    const status = context.set.status ?? 200;

    return {
      path,
      message,
      data: response,
      timeStamp,
      status: typeof status === "number" ? status : 200,
    };
  }
);

export const useErrorMiddleware = new Elysia().onError(
  { as: "global" },
  async ({ request, error, set, code }): Promise<ErrorResponse> => {
    const path = request.url;
    const timeStamp = new Date().toISOString();
    let status = 500;
    let message: string = "Internal Server Error";
    let errors = {};
    const errorCode = code.toString();

    // 1. Determine the correct HTTP Status
    if (typeof set.status === "number") {
      status = set.status;
    } else if (code === "NOT_FOUND") {
      status = 404;
    } else if (code === "VALIDATION") {
      status = 400;
    } else if (
      error &&
      "status" in error &&
      typeof (error as any).status === "number"
    ) {
      status = (error as any).status;
    }
    set.status = status;

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      message =
        "A database constraint violation occurred (e.g., duplicate entry).";
      status = 409;
      set.status = status;
    } else if (code === "VALIDATION") {
      errors = transformValidationError(error.message);
      message = "Validation failed for one or more fields.";
    } else {
      // 3. Handle general errors (e.g., regular Errors, runtime exceptions)

      const parsedMessage =
        "message" in error ? isJsonString(error.message) : null;

      if (parsedMessage && typeof parsedMessage.message === "string") {
        message = parsedMessage.message;
      } else if ("message" in error && typeof error.message === "string") {
        message = error.message;
      } else {
        message = error.toString();
      }
    }

    // 4. Log the error
    console.error(
      `\x1b[31m[ERROR] ${new Date().toLocaleString()} | ${status} | ${
        request.method
      } ${path}\x1b[0m`
    );

    if (errors) {
      console.error(
        "\x1b[31mStructured Errors:\x1b[0m",
        JSON.stringify(errors, null, 2)
      );
    } else {
      console.error("\x1b[31mMessage:\x1b[0m", message);
    }

    // 5. Final Error Response
    return {
      path,
      message,
      errors,
      data: null,
      timeStamp,
      status,
      code: errorCode,
    };
  }
);
