import Elysia from "elysia";
import { SessionInputCreate } from "../../generated/prismabox/Session";
import { addHandler } from "./handler";

export const session = new Elysia({ prefix: "/session" }).post(
  "/",
  async ({ body }) => {
    return await addHandler(body);
  },
  { body: SessionInputCreate }
);
