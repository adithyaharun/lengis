import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const locationRouter = createTRPCRouter({
  getLatest: publicProcedure
    .input(
      z
        .object({
          sortBy: z.string().optional(),
          sortDirection: z.enum(["asc", "desc"]).optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.location.findMany({
        orderBy: {
          [input?.sortBy ?? "name"]: input?.sortDirection ?? "asc",
        },
      });
    }),
});
