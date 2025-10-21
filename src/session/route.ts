import Elysia from "elysia";
import { addHandler, getAllhandler } from "./handler";
import { SessionSchema } from "../schemas/session.schema";
import { formatResponseSchema } from "../utils/format-response";
import z from "zod";

export const session = new Elysia({ prefix: "/session" })
  .post(
    "/",
    async ({ body }) => {
      return await addHandler(body);
    },
    { body: SessionSchema, response: formatResponseSchema(SessionSchema) }
  )
  .get("/", async () => await getAllhandler(), {
    response: formatResponseSchema(z.array(SessionSchema)),
  });
