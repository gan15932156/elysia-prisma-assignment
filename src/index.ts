import { Elysia } from "elysia";
import {
  useErrorMiddleware,
  useSuccessResponseMiddleware,
} from "./middleware/response.middleware";
import { station } from "./station/route";
import { session } from "./session/route";
import { charger } from "./charger/route";
import openapi from "@elysiajs/openapi";
import z from "zod";

const app = new Elysia()
  .use(
    openapi({
      mapJsonSchema: {
        zod: z.toJSONSchema,
      },
    })
  )
  .use(useSuccessResponseMiddleware)
  .use(useErrorMiddleware)
  .use(session)
  .use(charger)
  .use(station)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
