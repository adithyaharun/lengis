import got from "got";
import { env } from "~/env";

export const supabaseClient = got.extend({
  prefixUrl: env.NEXT_PUBLIC_SUPABASE_URL,
  headers: {
    Authorization: `Bearer ${env.SUPABASE_JWT_SECRET}`,
  },
});
