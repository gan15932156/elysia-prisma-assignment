import { z } from "zod";

const BaseResponseSchema = z.object({
  path: z.string(),
  timeStamp: z.string(),
});

export const SuccessResponseSchema = BaseResponseSchema.extend({
  message: z.string().default("Success"),
  data: z.any().nullable(),
  status: z.number().default(200),
});

export type SuccessResponse = z.infer<typeof SuccessResponseSchema>;

const FieldErrorsSchema = z.record(z.string(), z.array(z.string()));
export const ErrorResponseSchema = BaseResponseSchema.extend({
  message: z.string(),
  status: z.number(),
  code: z.string(),
  errors: FieldErrorsSchema.nullable().default(null),
  data: z.any().nullable().default(null),
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
