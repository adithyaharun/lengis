import { z } from "zod";

export const getPricesSchema = z.object({
  locationId: z.coerce.number(),
  providerId: z.coerce.number(),
});
