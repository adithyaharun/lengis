import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import PricingForm from "../_components/molecules/pricing";
import { getProviders } from "~/server/actions/provider";
import { getLocations } from "~/server/actions/location";
import { cookies } from "next/headers";
import { PricingTable } from "../_components/molecules/pricing/table";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["providers"],
    queryFn: getProviders,
  });
  await queryClient.prefetchQuery({
    queryKey: ["locations"],
    queryFn: getLocations,
  });

  const providerId = cookies().get("providerId")?.value;
  const locationId = cookies().get("locationId")?.value;

  return (
    <div className="container mx-auto flex w-full max-w-xl flex-col space-y-8 py-16">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PricingForm />
        {providerId && locationId && (
          <PricingTable
            providerId={Number(providerId)}
            locationId={Number(locationId)}
          />
        )}
      </HydrationBoundary>
    </div>
  );
}
