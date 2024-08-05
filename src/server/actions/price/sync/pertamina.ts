import { Prisma } from "@prisma/client";
import * as cheerio from "cheerio";
import { db } from "~/server/db";

export async function scrapPertamina(html: string) {
  const $ = cheerio.load(html);
  const locations = await db.location.findMany({
    orderBy: { id: "asc" },
  });
  const products = await db.product.findMany({
    include: { prices: true },
  });
  const slides = $("#priceSlider .card");
  const prices = [];

  for (const slide of slides) {
    // Identify the product by the image file name.
    const image = $(slide).find("img.img-fluid").attr("src");
    let slug =
      image
        ?.replaceAll("https://mypertamina.id/assets/img/products/", "")
        ?.replaceAll(".png", "")
        ?.replaceAll(".jpg", "") ?? "";

    // Specifically for Pertamax because image file name for Pertamax is 1.png.
    if (slug === "1") slug = "pertamax";

    // Since Bio-solar that aided and non-aided by government using the same logo,
    // we need to differentiate between them by checking text on certain parts.
    if ($(slide).find("div div p").text().includes("**BioSolar Subsidi")) {
      slug += "-subsidized";
    }

    let product = products.find((p) => p.slug === slug);

    if (!product) {
      product = await db.product.create({
        data: {
          name: slug,
          slug,
          providerId: 1,
          imageUrl: image ?? "",
          isActive: true,
          isSubsidized: slug.includes("subsidized"),
        },
        include: { prices: true },
      });

      products.push(product);
    }

    const pricesEl = $(slide).find(".d-flex.justify-content-between");

    for (const priceEl of pricesEl) {
      const locationName = $(priceEl)
        .find("label:first-child")
        .text()
        .replaceAll("Prov. ", "")
        .trim();

      const price = $(priceEl)
        .find("label:last-child")
        .text()
        .replaceAll("Rp.", "")
        .replaceAll("Rp", "")
        .replaceAll(",", "")
        .trim();

      if (price !== "-") {
        let location = locations.find((l) => l.name === locationName);
        if (!location) {
          location = await db.location.create({
            data: {
              name: locationName,
              latitude: 0,
              longitude: 0,
            },
          });
        }

        const priceOnDecimal = new Prisma.Decimal(price);

        if (product) {
          const existingPrice = product.prices.find(
            (p) => p.locationId === location?.id,
          );

          if (existingPrice) {
            if (existingPrice.price !== priceOnDecimal) {
              existingPrice.price = priceOnDecimal;
            }
          } else {
            prices.push({
              locationId: location.id,
              productId: product.id,
              price: priceOnDecimal,
            });
          }
        }
      }
    }
  }

  for (const price of prices) {
    const dup =
      prices.filter(
        (p) =>
          p.locationId === price.locationId && p.productId === price.productId,
      ).length > 1;

    if (dup) console.log(`Dup: ${dup} ${price.productId} ${price.locationId}`);
  }

  if (prices.length > 0) {
    console.log("Scraped", prices.length, "prices");
    await db.productPrice.createMany({
      data: prices,
    });
  }
}
