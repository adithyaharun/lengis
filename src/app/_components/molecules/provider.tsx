"use client";

import { type Provider } from "@prisma/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { Skeleton } from "~/app/_components/atoms/skeleton";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "~/app/_components/atoms/toggle-group";
import { getProviders, setSelectedProvider } from "~/server/actions/provider";

export default function SelectProvider() {
  const query = useSuspenseQuery({
    queryKey: ["providers"],
    queryFn: getProviders,
  });

  return (
    <div className="flex space-x-2">
      {query.isFetching ? (
        <>
          <Skeleton className="h-10 w-[15%]" />
          <Skeleton className="h-10 w-[45%]" />
          <Skeleton className="h-10 w-[30%]" />
        </>
      ) : (
        <ToggleGroup
          type="single"
          onValueChange={async (value) => {
            await setSelectedProvider(value);
          }}
        >
          {query.data.map((provider) => (
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
