import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { api, HydrateClient } from "~/trpc/server";
import { SelectLocation } from "../_components/location";
import { SelectProvider } from "../_components/provider";

export const dynamic = 'force-dynamic';

export default async function Home() {
  void api.provider.getLatest.prefetch();

  return (
    <HydrateClient>
      <div className="container max-w-xl mx-auto py-16 flex w-full flex-col space-y-8">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">
            <Label>Pilih Penyedia BBM</Label>
            <SelectProvider />
          </div>
          <div className="flex flex-col space-y-2">
            <Label>Wilayah</Label>
            <SelectLocation />
          </div>
          <Button>Cek Harga</Button>
        </div>
      </div>
    </HydrateClient>
  );
}
