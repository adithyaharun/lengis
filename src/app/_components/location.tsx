"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Skeleton } from "~/components/ui/skeleton";

import { api } from "~/trpc/react";

export function SelectLocation() {
  const [providers, query] = api.provider.getLatest.useSuspenseQuery();

  return (
    <div className="flex space-x-2">
      {query.isFetching ? (
        <Skeleton className="h-10 w-full" />
      ) : (
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Pilih wilayah..." />
          </SelectTrigger>
          <SelectContent>
            {providers.map((provider) => (
              <SelectItem
                key={provider.id}
                value={provider.id.toString()}
              >
                {provider.name}
              </SelectItem>

            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
