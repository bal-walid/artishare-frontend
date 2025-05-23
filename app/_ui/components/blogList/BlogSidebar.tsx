"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { Category } from "@/app/_type/categories";

interface BlogSideBarProps {
  updateTags: (tags: Category[]) => void;
  tags: Category[];
  loadingTags: boolean;
  activeTags: Category[];
}

const BlogSideBar = ({
  updateTags,
  tags,
  activeTags,
  loadingTags,
}: BlogSideBarProps) => {
  const handleTagClick = (tag: Category) => {
    if (activeTags.some((activeTag) => activeTag.id === tag.id)) {
      updateTags(activeTags.filter((activeTag) => activeTag.id !== tag.id));
    } else {
      updateTags([...activeTags, tag]);
    }
  };

  return (
    <div className="sticky top-0 border-l p-4 max-w-[368px] max-lg:max-w-[240px] max-md:order-1 max-md:max-w-none max-md:relative max-md:overflow-visible max-md:pb-0 overflow-hidden" >
      <h2 className="mb-3 font-bold">Recommended Topics</h2>
      {loadingTags ? (
        <div className="flex flex-wrap gap-x-2 gap-y-3">
          <Skeleton className="bg-muted h-9 rounded-full w-40" />
          <Skeleton className="bg-muted h-9 rounded-full w-40" />
          <Skeleton className="bg-muted h-9 rounded-full w-24" />
          <Skeleton className="bg-muted h-9 rounded-full w-24" />
          <Skeleton className="bg-muted h-9 rounded-full w-24" />
          <Skeleton className="bg-muted h-9 rounded-full w-28" />
          <Skeleton className="bg-muted h-9 rounded-full w-36" />
        </div>
      ) : (
        <div className="flex flex-wrap gap-x-2 gap-y-3 overflow-hidden">
          {tags.map((tag) => {
            const isActive = activeTags.some(
              (activeTag) => activeTag.id === tag.id
            );
            return (
              <Button
                key={tag.id}
                className={`text-sm font-normal rounded-full ${
                  isActive ? "bg-primary text-white" : "bg-secondary text-black"
                }`}
                variant={isActive ? "default" : "destructive"}
                onClick={() => handleTagClick(tag)}
              >
                {tag.name}
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BlogSideBar;