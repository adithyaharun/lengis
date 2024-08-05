"use client";

import { Label } from "~/app/_components/atoms/label";
import SelectLocation from "../location";
import SelectProvider from "../provider";

export default function PricingForm() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <Label>Pilih Penyedia BBM</Label>
        <SelectProvider />
      </div>
      <div className="flex flex-col space-y-2">
        <Label>Wilayah</Label>
        <SelectLocation />
      </div>
    </div>
  );
}
