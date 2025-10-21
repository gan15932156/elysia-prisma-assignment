import z, { ZodType } from "zod";

export const formatResponseSchema = <TSchema extends ZodType>(
  dataSchema: TSchema
) => {
  const standardizedResponseSchema = z.object({
    path: z.string(),
    message: z.string().optional(),
    data: dataSchema, // <-- Now TSchema is constrained by ZodType
    status: z.union([z.number(), z.string()]),
    timeStamp: z.string(),
  });
  return [standardizedResponseSchema];
};
