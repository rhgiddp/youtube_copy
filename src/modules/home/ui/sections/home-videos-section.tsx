"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { inferRouterOutputs } from "@trpc/server";

import { trpc } from "@/trpc/client";
import { InfiniteScroll } from "@/components/infinite-scroll";
import { VideoGridCard, VideoGridCardSkeleton } from "@/scripts/videos/ui/components/video-grid-card";
import { AppRouter } from "@/trpc/routers/_app";

const DEFAULT_LIMIT = 10;

interface HomeVideosSectionProps {
  categoryId?: string;
}

type Video = inferRouterOutputs<AppRouter>["videos"]["getMany"]["items"][number];

interface PageData {
  items: Video[];
  nextCursor: { id: string; updatedAt: Date; } | null;
}

export const HomeVideosSection = (props: HomeVideosSectionProps) => {
  return (
    <Suspense key={props.categoryId} fallback={<HomeVideosSectionSkeleton />}>
      <ErrorBoundary fallback={<p>Error</p>}>
        <HomeVideosSectionSuspense {...props} />
      </ErrorBoundary>
    </Suspense>
  );
};

export const HomeVideosSectionSkeleton = () => {
  return (
    <div className="gap-4 gap-y-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 [@media(min-width:1920px)]:grid-cols-5 [@media(min-width:2200px)]:grid-cols-6">
        {Array.from({ length: 18 }).map((_, index) => (
            <VideoGridCardSkeleton key={index} />
          ))
        }
      </div>
  )
}

const HomeVideosSectionSuspense = ({ categoryId }: HomeVideosSectionProps) => {
  const query = trpc.videos.getMany.useSuspenseInfiniteQuery(
    { categoryId, limit: DEFAULT_LIMIT },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  ) as unknown as {
    data: { pages: PageData[] };
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    fetchNextPage: () => void;
  };

  return (
    <div>
      <div className="gap-4 gap-y-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 [@media(min-width:1920px)]:grid-cols-5 [@media(min-width:2200px)]:grid-cols-6">
        {query.data?.pages
          .flatMap((page) => page.items)
          .map((video) => (
            <VideoGridCard key={video.id} data={video} />
          ))
        }
      </div>
      <InfiniteScroll
        hasNextPage={query.hasNextPage}
        isFetchingNextPage={query.isFetchingNextPage}
        fetchNextPage={query.fetchNextPage}
      />
    </div>
  )
}