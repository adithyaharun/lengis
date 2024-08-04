"use client";

import type { Provider } from "@prisma/client";
import Image from "next/image";
import { useEffect } from "react";
import { Skeleton } from "~/components/atoms/skeleton";
import { ToggleGroup, ToggleGroupItem } from "~/components/atoms/toggle-group";
import { api } from "~/trpc/react";

type SelectProviderProps = {
  value?: number;
  onSelected?: (provider: Provider) => void;
};

export const dynamic = "force-dynamic";
export function SelectProvider(props: SelectProviderProps) {
  const [providers, query] = api.provider.getLatest.useSuspenseQuery();

  useEffect(() => {
    if (providers.length > 0 && !props.value) {
      if (props.onSelected) {
        const firstProvider = providers[0];

        if (firstProvider) props.onSelected(firstProvider);
      }
    }
  }, [providers, props]);

  return (
    <div className="flex space-x-2">
      {query.isFetching ? (
        <>
          <Skeleton className="h-10 w-[128px]" />
          <Skeleton className="h-10 w-[180px]" />
          <Skeleton className="h-10 w-[160px]" />
        </>
      ) : (
        <ToggleGroup
          type="single"
          value={props.value?.toString()}
          onValueChange={(value) =>
            props.onSelected?.(
              providers.find((provider) => provider.id.toString() === value)!,
            )
          }
        >
          {providers.map((provider) => (
            <ToggleGroupItem
              variant={"outline"}
              key={provider.id}
              value={provider.id.toString()}
              aria-label="Toggle bold"
              className="flex items-center space-x-2 p-4"
              disabled={!provider.isActive}
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
