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

export const SessionUpdateSchema = SessionSchema.omit({ id: true }).partial();
export type SessionUpdate = z.infer<typeof SessionUpdateSchema>;

export const SessionWithDetailSchema = SessionSchema.extend({
  charger: z.lazy(() => ChargerSchema),
});
export type SessionWithDetail = z.infer<typeof SessionWithDetailSchema>;

// please edit schema for crud operation
// currently, it not pass
