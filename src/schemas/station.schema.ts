import z from "zod";
import { ChargerSchema } from "./charger.schema";

export const StationSchema = z.object({
  id: z.optional(z.string()),
  name: z.string(),
  location: z.string(),
});
export type Station = z.infer<typeof StationSchema>;

export const CreateStationSchema = StationSchema.omit({ id: true });
export type CreateStation = z.infer<typeof CreateStationSchema>;

export const StationUpdateSchema = CreateStationSchema.partial();
export type StationUpdate = z.infer<typeof StationUpdateSchema>;

export const StationWithDetailSchema = StationSchema.extend({
  chargers: z.array(ChargerSchema),
});
export type StationWithDetail = z.infer<typeof StationWithDetailSchema>;
