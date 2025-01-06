"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

const defaultTags = [
  "Self-Improvement",
  "Cryptocurrency",
  "Politics",
  "Productiviy",
  "Programming",
  "Psychology",
  "Engineering",
];

const BlogSideBar = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [loadingTags, setLoadingTags] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setTags(defaultTags);
      setLoadingTags(false);
    }, 2000);
  }, []);
  return (
    <div className="sticky top-0 border-l p-4 max-w-[368px] min-w-[368px]">
      <h2 className="mb-3 font-bold">Recommended Topics</h2>
      {loadingTags ? (
        <div className="flex flex-wrap gap-x-2 gap-y-3">
        <Skeleton className="bg-muted h-9 rounded-full w-40"/>
        <Skeleton className="bg-muted h-9 rounded-full w-40"/>
        <Skeleton className="bg-muted h-9 rounded-full w-24"/>
        <Skeleton className="bg-muted h-9 rounded-full w-24"/>
        <Skeleton className="bg-muted h-9 rounded-full w-24"/>
        <Skeleton className="bg-muted h-9 rounded-full w-28"/>
        <Skeleton className="bg-muted h-9 rounded-full w-36"/>
      </div>
      ) : (
        <div className="flex flex-wrap gap-x-2 gap-y-3">
          {tags.map((tag) => (
            <Button
              className="text-sm font-normal rounded-full"
              variant={"secondary"}
            >
              {tag}
            </Button>
          ))}
        </div>
      )}

      <Link
        className="mt-3 inline-block font-semibold text-sm text-black/50"
        href={""}
      >
        See More Topics
      </Link>
    </div>
  );
};
export default BlogSideBar;
