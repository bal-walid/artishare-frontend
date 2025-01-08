"use client";
import { useIntersection } from "@/app/_hooks/useIntersection";
import { Blog } from "@/app/_type/blogs";
import { useEffect, useRef } from "react";
import BlogCard from "./BlogCard";
import BlogCardSkeleton from "./BlogSkeleton";

interface BlogListProps {
  updateCurrentPage: (page: string) => void;
  currentPage: string;
  blogs: Blog[];
  hasMore: boolean;
  loadingBlogs: boolean;
}

const BlogList = ({
  updateCurrentPage,
  currentPage,
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
    console.log(currentPage);
  }, [currentPage]);
  useEffect(() => {
    if (isVisible && hasMore) {
      updateCurrentPage((+currentPage + 1).toString());
    }
  }, [isVisible, hasMore]);
  useEffect(() => {
    connect();
  }, [hasMore, connect]);

  return (
    <div className="max-w-[728px] w-full p-4">
      {loadingBlogs && (
        <div className="flex flex-col items-center">
          <BlogCardSkeleton />
          <BlogCardSkeleton />
          <BlogCardSkeleton />
        </div>
      )}
      {/* This is to avoid that no blogs message on first load,
      do NOT remove */}
      {blogs.length === 0 && !loadingBlogs ? (
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
        </>
      )}
    </div>
  );
};

export default BlogList;
