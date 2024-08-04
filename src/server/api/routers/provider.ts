import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const providerRouter = createTRPCRouter({
  getLatest: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.provider.findMany();
  }),
});
