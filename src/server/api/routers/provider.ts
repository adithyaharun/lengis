import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const providerRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.provider.create({
        data: {
          name: input.name,
        },
      });
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.provider.findMany();
  }),
});
