"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { revalidatePath } from "next/cache";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/app/_components/atoms/select";
import { Skeleton } from "~/app/_components/atoms/skeleton";
import { getLocations, setSelectedLocation } from "~/server/actions/location";

export default function SelectLocation() {
  const query = useSuspenseQuery({
    queryKey: ["locations"],
    queryFn: async () => await getLocations(),
  });

  return (
    <div className="flex space-x-2">
      {query.isFetching ? (
        <Skeleton className="h-10 w-full" />
      ) : (
        <Select
          onValueChange={async (value) => {
            await setSelectedLocation(value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Pilih wilayah..." />
          </SelectTrigger>
          <SelectContent>
            {query.data.map((location) => (
              <SelectItem key={location.id} value={location.id.toString()}>
                {location.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
