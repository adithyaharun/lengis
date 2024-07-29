import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const pageRouter = createTRPCRouter({
  findPage: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const page = await ctx.db.page.findFirst({
        select: {
          id: true,
          title: true,
          slug: true,
          content: true,
        },
        where: {
          slug: input.slug,
        },
      });

      return page;
    }),
});
