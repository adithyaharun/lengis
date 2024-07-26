import got from "got";
import { env } from "~/env";

export const supabaseClient = got.extend({
  prefixUrl: env.SUPABASE_URL,
  headers: {
    Authorization: `Bearer ${env.SUPABASE_KEY}`,
  },
});
