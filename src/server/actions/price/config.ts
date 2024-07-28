import * as cheerio from "cheerio";

type Source = {
  listPath: string;
  itemPath: string;
};

type SourceProviderCallback = (html: string) => void;

type SourceProvider = {
  name: string;
  url: string;
  callback: SourceProviderCallback;
};

const priceOptions = {
  providers: [
    {
      name: "Pertamina",
      url: "https://mypertamina.id/fuels-harga",
      callback: (html: string) => {
        // console.log(html);
      },
    },
  ],
};

export { priceOptions };
