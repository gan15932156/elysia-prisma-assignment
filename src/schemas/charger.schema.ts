import z from "zod";
import { SessionSchema } from "./session.schema";
import { StationSchema } from "./station.schema";

const Status = z.enum(["CHARGING", "AVAILABLE"]);

export const ChargerSchema = z.object({
  id: z.optional(z.string()),
  model: z.string(),
  connectorType: z.string(),
  stationId: z.string(),
  status: Status.default("AVAILABLE"),
});

export type Charger = z.infer<typeof ChargerSchema>;

export const ChargerUpdateSchema = ChargerSchema.omit({
  id: true,
}).partial();
export type ChargerUpdate = z.infer<typeof ChargerUpdateSchema>;

export const ChargerWithDetailSchema = ChargerSchema.extend({
  station: z.lazy(() => StationSchema),
  sessions: z.array(SessionSchema),
});
export type ChargerWithDetail = z.infer<typeof ChargerWithDetailSchema>;
