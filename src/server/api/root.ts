import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { pageRouter } from "./routers/page";
import { providerRouter } from "./routers/provider";
import { locationRouter } from "./routers/location";
import { priceRouter } from "./routers/price";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  location: locationRouter,
  provider: providerRouter,
  price: priceRouter,
  page: pageRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.provider.all();
 *       ^? provider[]
 */
export const createCaller = createCallerFactory(appRouter);
