import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { RefObject } from "react";

interface BlogCardSkeletonProps {
  ref?: RefObject<HTMLDivElement | null>;
}

const BlogCardSkeleton = ({ref} : BlogCardSkeletonProps) => {
  return (
    <Card ref={ref} className="w-full border-0 border-b rounded-none shadow-none">
      <CardHeader className="py-4 px-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Avatar Skeleton */}
            <Skeleton className="bg-muted h-7 w-7 rounded-full border-2" />
            {/* Creator Name Skeleton */}
            <Skeleton className="bg-muted h-4 w-20" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 pb-6">
        <div className="flex justify-between">
          <div className="space-y-2 flex-1">
            {/* Title Skeleton */}
            <Skeleton className="bg-muted h-6 w-3/4" />
            {/* Description Skeleton */}
            <Skeleton className="bg-muted h-4 w-full" />
            <Skeleton className="bg-muted h-4 w-5/6" />
            {/* Metadata Skeleton */}
            <div className="flex items-center gap-3 text-xs">
              <Skeleton className="bg-muted h-4 w-16" />
              <Skeleton className="bg-muted h-4 w-8" />
              <Skeleton className="bg-muted h-4 w-8" />
              <Skeleton className="bg-muted h-6 w-6 ml-auto" />
            </div>
          </div>
          {/* Image Skeleton */}
          <Skeleton className="bg-muted w-[160px] h-[107px] rounded-sm ml-16" />
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCardSkeleton;
