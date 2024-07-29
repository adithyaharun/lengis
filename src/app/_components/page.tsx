"use client";

import Image from "next/image";
import { Skeleton } from "~/components/atoms/skeleton";
import { ToggleGroup, ToggleGroupItem } from "~/components/atoms/toggle-group";

import { api } from "~/trpc/react";

type PageContentProps = {
  slug: string;
}

export function PageContent({ slug }: PageContentProps) {
  const [page, query] = api.page.findPage.useSuspenseQuery({ slug });

  return (
    <div className="flex space-x-2">
      {query.isFetching ? (
        <>
          <Skeleton className="h-10 w-[128px]" />
          <Skeleton className="h-10 w-[180px]" />
          <Skeleton className="h-10 w-[160px]" />
        </>
      ) : (page && (
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
      ))}
    </div>
  );
}
