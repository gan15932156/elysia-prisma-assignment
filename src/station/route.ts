import Elysia from "elysia";
import { addHandler, getAllhandler, updateHandler } from "./handler";
import { StationSchema, StationUpdateSchema } from "../schemas/station.schema";
import { formatResponseSchema } from "../utils/format-response";
import z from "zod";

export const station = new Elysia({ prefix: "/station" })
  .post(
    "/",
    async ({ body }) => {
      return await addHandler(body);
    },
    {
      body: StationSchema,
      response: formatResponseSchema(StationSchema),
    }
  )
  .get(
    "/",
    async () => {
      return await getAllhandler();
    },
    {
      response: formatResponseSchema(z.array(StationSchema)),
    }
  )
  .put(
    "/:id",
    async ({ body, params: { id } }) => {
      return await updateHandler(id, body);
    },
    {
      body: StationUpdateSchema,
    }
  );
