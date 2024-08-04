"use client";

import type { Location } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/atoms/select";
import { Skeleton } from "~/components/atoms/skeleton";
import { api } from "~/trpc/react";

type SelectLocationProps = {
  value?: number;
  onSelected?: (location: Location) => void;
};

export function SelectLocation(props: SelectLocationProps) {
  const [locations, query] = api.location.getLatest.useSuspenseQuery();
  return (
    <div className="flex space-x-2">
      {query.isFetching ? (
        <Skeleton className="h-10 w-full" />
      ) : (
        <Select
          value={props.value?.toString()}
          onValueChange={(value) =>
            props.onSelected?.(
              locations.find((location) => location.id.toString() === value)!,
            )
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Pilih wilayah..." />
          </SelectTrigger>
          <SelectContent>
            {locations.map((location) => (
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
