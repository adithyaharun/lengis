import { api, HydrateClient } from "~/trpc/server";
import { PricingForm } from "../_components/pricing";

export const dynamic = "force-dynamic";

export default async function Home() {
  void api.location.getLatest.prefetch();
  void api.provider.getLatest.prefetch();
  void api.page.findPage.prefetch({ slug: "privacy-policy" });

  return (
    <HydrateClient>
      <div className="container mx-auto flex w-full max-w-xl flex-col space-y-8 py-16">
        <PricingForm />
      </div>
    </HydrateClient>
  );
}
