import got from "got";
import { priceOptions } from "./config";

export async function fetchPrice() {
  for (const provider of priceOptions.providers) {
    const res = await got(provider.url);
    provider.callback(res.body);
  }
}
