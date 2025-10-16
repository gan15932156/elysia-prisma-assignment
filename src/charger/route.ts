import Elysia, { t } from "elysia";
import {
  ChargerInputCreate,
  ChargerPlain,
} from "../../generated/prismabox/Charger";
import { addHandler, getAllhandler } from "./handler";

// const test: tt = {
//   connectorType: "adds",
//   model: "ad",
//   station: {
//     connect: {
//       id: "adadad",
//     },
//   },
// };
export const charger = new Elysia({ prefix: "/charger" })
  .post(
    "/",
    async ({ body }) => {
      return await addHandler(body);
    },
    { body: ChargerInputCreate }
  )
  .get(
    "/",
    async () => {
      return await getAllhandler();
    },
    {
      response: {
        200: t.Array(ChargerPlain),
      },
    }
  );
