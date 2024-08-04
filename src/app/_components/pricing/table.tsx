"use client";

import Image from "next/image";
import { useEffect } from "react";
import { Card, CardContent } from "~/components/atoms/card";
import { api } from "~/trpc/react";

type Props = {
  providerId: number;
  locationId: number;
};

const recentlySynced = (lastSyncAt: Date | null) => {
  if (!lastSyncAt) return false;

  const now = new Date();
  const diff = now.getTime() - lastSyncAt.getTime();
  const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
  return diffDays < 7;
};

const PricingTableSkeleton = () => {
  return (
    <div className="flex animate-pulse flex-col">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          className="flex items-center justify-between border-b border-border p-4"
          key={i}
        >
          <div className="h-6 w-1/2 rounded bg-black/10 dark:bg-muted" />
          <div className="flex flex-col items-end space-y-2">
            <div className="h-6 w-[128px] rounded bg-black/10 dark:bg-muted" />
            <div className="h-4 w-[72px] rounded bg-black/10 dark:bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
};

export function PricingTable({ providerId, locationId }: Props) {
  const [prices, priceQuery] = api.price.getPrices.useSuspenseQuery({
    providerId,
    locationId,
  });

  useEffect(() => {
    console.log(prices);
  }, [prices]);

  return (
    <Card className="rounded">
      <CardContent className="p-0">
        {priceQuery.isFetching ? (
          <PricingTableSkeleton />
        ) : prices.length > 0 ? (
          prices.map((price) => (
            <div
              key={price.id}
              className="flex cursor-pointer items-center justify-between border-b border-border p-4 hover:bg-muted"
            >
              <div className="flex flex-col items-start space-y-1">
                <Image
                  height={128}
                  width={128}
                  src={price.product.imageUrl ?? ""}
                  alt={price.product.name}
                  style={{ width: "auto", height: 20 }}
                />
                {price.product.isSubsidized && (
                  <p className="text-xs font-medium text-muted-foreground">
                    (Di-subsidi Pemerintah)
                  </p>
                )}
              </div>
              <div className="flex flex-col items-end">
                <p className="text-xl font-bold text-green-700">
                  {price.price.toNumber().toLocaleString()}
                </p>
                <p className="text-sm italic text-muted-foreground">
                  {recentlySynced(price.product.lastSyncAt) &&
                    "Update: " +
                      price.product.lastSyncAt?.toLocaleString("id", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No prices found</p>
        )}
      </CardContent>
    </Card>
  );
}
