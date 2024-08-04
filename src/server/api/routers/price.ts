import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const priceRouter = createTRPCRouter({
  getPrices: publicProcedure
    .input(
      z
        .object({
          providerId: z.number().optional(),
          locationId: z.number().optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.productPrice.findMany({
        include: {
          product: true,
        },
        where: {
          ...(input?.locationId
            ? {
                location: {
                  id: input.locationId,
                },
              }
            : {}),
          ...(input?.providerId
            ? {
                product: {
                  provider: {
                    id: input.providerId,
                  },
                },
              }
            : {}),
        },
      });
    }),
});
