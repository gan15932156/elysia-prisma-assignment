import Elysia from "elysia";
import { addHandler, getAllhandler } from "./handler";
import { ChargerSchema } from "../schemas/charger.schema";
import { formatResponseSchema } from "../utils/format-response";
import z from "zod";

export const charger = new Elysia({
  prefix: "/charger",
  detail: { tags: ["Charger"] },
})
  .post(
    "/",
    async ({ body }) => {
      return await addHandler(body);
    },
    { body: ChargerSchema, response: formatResponseSchema(ChargerSchema) }
  )
  .get(
    "/",
    async () => {
      return await getAllhandler();
    },
    {
      response: formatResponseSchema(z.array(ChargerSchema)),
    }
  );
