import { Elysia } from "elysia";
import { station } from "./station/route";
import { Prisma } from "./generated/prisma";
import { charger } from "./charger/route";
import { session } from "./session/route";

const app = new Elysia()
  .onError(({ error, code }) => {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.message, code);
      return { error: true, message: "prisma error" };
    } else {
      console.log(error);
      return { error: true, message: "An other error" };
    }
  })
  .use(station)
  .use(charger)
  .use(session)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
