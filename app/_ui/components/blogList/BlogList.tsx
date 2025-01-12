"use client";
import { useIntersection } from "@/app/_hooks/useIntersection";
import { Blog } from "@/app/_type/blogs";
import { useEffect, useRef } from "react";
import BlogCard from "./BlogCard";
import BlogCardSkeleton from "./BlogSkeleton";

interface BlogListProps {
  updateCurrentPage: () => void;
  blogs: Blog[];
  hasMore: boolean;
  loadingBlogs: boolean;
}

const BlogList = ({
  updateCurrentPage,
  blogs,
  hasMore,
  loadingBlogs,
}: BlogListProps) => {
  const observerRef = useRef<HTMLDivElement | null>(null);
  const { isVisible, connect } = useIntersection({
    element: observerRef,
    rootMargin: "-150px",
    threshold: 0,
  });

  useEffect(() => {
    if (isVisible && hasMore) {
      updateCurrentPage();
    }
  }, [isVisible, hasMore, updateCurrentPage]);
  useEffect(() => {
    connect();
  }, [hasMore, connect]);
  if (loadingBlogs && blogs.length === 0) {
    return (
      <div className="max-w-[728px] w-full p-4 pt-8">
        <BlogCardSkeleton />
        <BlogCardSkeleton />
        <BlogCardSkeleton />
        <BlogCardSkeleton />
        <BlogCardSkeleton />
        <BlogCardSkeleton />
      </div>
    );
  }
  return (
    <div className="max-w-[728px] w-full p-4 pt-8">
      {/* This is to avoid that no blogs message on first load,
      do NOT remove */}
      {blogs.length === 0 && !loadingBlogs && !hasMore ? (
        <div className="text-center text-muted-foreground">
          No blogs available.
        </div>
      ) : (
        blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
      )}

      {/* Render skeletons while data is loading, but stop when hasMore is false */}
      {hasMore && (
        <>
          <BlogCardSkeleton ref={observerRef} />
          <BlogCardSkeleton />
          <BlogCardSkeleton />
          <BlogCardSkeleton />
          <BlogCardSkeleton />
          <BlogCardSkeleton />
        </>
      )}
    </div>
  );
};

export default BlogList;
