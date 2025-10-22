import z from "zod";
import { ChargerSchema } from "./charger.schema";

export const SessionSchema = z.object({
  id: z.optional(z.string()),
  startTime: z.optional(z.iso.datetime()),
  endTime: z.nullable(z.iso.datetime()),
  energyUsedKWh: z.nullable(z.number()),
  pricePerKWh: z.number(),
  totalCost: z.nullable(z.number()),
  chargerId: z.string(),
});
export type Session = z.infer<typeof SessionSchema>;

export const CreateSessionSchema = SessionSchema.omit({
  id: true,
  startTime: true,
  totalCost: true,
  endTime: true,
  energyUsedKWh: true,
});
export type CreateSession = z.infer<typeof CreateSessionSchema>;

export const SessionUpdateSchema = SessionSchema.omit({ id: true }).partial();
export type SessionUpdate = z.infer<typeof SessionUpdateSchema>;

export const SessionWithDetailSchema = SessionSchema.extend({
  charger: z.lazy(() => ChargerSchema),
});
export type SessionWithDetail = z.infer<typeof SessionWithDetailSchema>;

// https://medium.com/@mendes.develop/authentication-and-authorization-made-easy-with-hot-js-runtime-1fa42e8f7905
// https://sadewawicak25.medium.com/jwt-authentication-elysia-js-with-redis-3-3290a59bf2bf
// https://medium.com/@mdzulfirdaus/unleashing-the-power-of-bun-and-elysia-error-handling-middleware-and-authentication-ee90841257de
