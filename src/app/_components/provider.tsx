"use client";

import Image from "next/image";
import { Skeleton } from "~/components/ui/skeleton";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";

import { api } from "~/trpc/react";

export function SelectProvider() {
  const [providers, query] = api.provider.getLatest.useSuspenseQuery();

  return (
    <div className="flex space-x-2">
      {query.isFetching && (
        <>
          <Skeleton className="h-10 w-[128px]" />
          <Skeleton className="h-10 w-[180px]" />
          <Skeleton className="h-10 w-[160px]" />
        </>
      )}
      {!query.isFetching && (
        <ToggleGroup type="single">
          {providers.map((provider) => (
            <ToggleGroupItem
              variant={"outline"}
              key={provider.id}
              value={provider.id.toString()}
              aria-label="Toggle bold"
              className="p-4 flex items-center space-x-2"
            >
              <Image
                src={provider.imageUrl ?? ""}
                alt={provider.name}
                height={24}
                width={24}
                unoptimized
              />
              <span>{provider.name}</span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      )}
    </div>
  );
}
