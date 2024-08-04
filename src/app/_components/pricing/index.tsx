"use client";

import type { Location, Provider } from "@prisma/client";
import { useState } from "react";
import { Label } from "~/components/atoms/label";
import { SelectLocation } from "../location";
import { SelectProvider } from "../provider";
import { PricingTable } from "./table";

export const dynamic = "force-dynamic";
export function PricingForm() {
  const [provider, setProvider] = useState<Provider | null>(null);
  const [location, setLocation] = useState<Location | null>(null);

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <Label>Pilih Penyedia BBM</Label>
        <SelectProvider
          value={provider?.id}
          onSelected={(p) => setProvider(p)}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <Label>Wilayah</Label>
        <SelectLocation
          value={location?.id}
          onSelected={(l) => setLocation(l)}
        />
      </div>
      {provider && location && (
        <PricingTable providerId={provider.id} locationId={location.id} />
      )}
    </div>
  );
}
