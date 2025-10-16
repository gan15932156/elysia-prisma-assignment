import Elysia, { t } from "elysia";
import {
  StationPlain,
  StationPlainInputCreate,
  StationPlainInputUpdate,
} from "../../generated/prismabox/Station";
import { addHandler, getAllhandler, updateHandler } from "./handler";

export const station = new Elysia({ prefix: "/station" })
  .post(
    "/",
    async ({ body }) => {
      return await addHandler(body);
    },
    { body: StationPlainInputCreate }
  )
  .get(
    "/",
    async () => {
      return await getAllhandler();
    },
    {
      response: {
        200: t.Array(StationPlain),
      },
    }
  )
  .put(
    "/:id",
    async ({ body, params: { id } }) => {
      return await updateHandler(id, body);
    },
    {
      body: StationPlainInputUpdate,
    }
  );
