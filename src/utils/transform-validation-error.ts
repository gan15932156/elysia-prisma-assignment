import { $ZodIssue } from "zod/v4/core";
type ValidationErrors = Record<string, Array<string>>;
export function transformValidationError(errors: string) {
  try {
    const json = JSON.parse(errors);
    if ("errors" in json) {
      const errors = json["errors"] as Array<$ZodIssue>;
      const result: ValidationErrors = {};
      errors.forEach((error) => {
        const path = error.path.join(".");
        if (path in result) {
          result[path].push(error.message);
        } else {
          result[path] = [error.message];
        }
      });
      return result;
    } else {
      return {};
    }
  } catch (e) {
    console.error(e);
    return {};
  }
}
