import { HydrateClient } from "~/trpc/server";
import { PricingForm } from "../_components/pricing";

export default async function Home() {
  return (
    <HydrateClient>
      <div className="container mx-auto flex w-full max-w-xl flex-col space-y-8 py-16">
        <PricingForm />
      </div>
    </HydrateClient>
  );
}
