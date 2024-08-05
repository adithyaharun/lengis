"use server";

import type { z } from "zod";
import type { getPricesSchema } from "./schema";
import { db } from "~/server/db";

export async function getPrices(input: z.infer<typeof getPricesSchema>) {
  return await db.productPrice.findMany({
    include: {
      product: true,
    },
    where: {
      locationId: input.locationId,
      product: {
        providerId: input.providerId,
      },
    },
  });
}
