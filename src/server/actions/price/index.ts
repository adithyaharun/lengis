import got from "got";
import { scrapPertamina } from "./pertamina";

export type Source = {
  listPath: string;
  itemPath: string;
};

export type SourceProviderCallback = (html: string) => void;

export type SourceProvider = {
  name: string;
  url: string;
  callback: SourceProviderCallback;
};

const priceOptions = {
  providers: [
    {
      name: "Pertamina",
      url: "https://mypertamina.id/fuels-harga",
      callback: scrapPertamina,
    },
  ],
};

export async function fetchPrice() {
  for (const provider of priceOptions.providers) {
    const res = await got(provider.url);
    await provider.callback(res.body);
  }
}
