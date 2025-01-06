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
}

const BlogList = ({
  updateCurrentPage,
  currentPage,
  blogs,
  hasMore,
}: BlogListProps) => {
  const observerRef = useRef<HTMLDivElement | null>(null);
  const { isVisible, connect } = useIntersection({
    element: observerRef,
    rootMargin: "-150px", // Adjust this value to show part of the skeleton before fetching
    threshold: 0,
  });

  // Fetch blogs whenever `page` or `isVisible` changes
  useEffect(() => {
    if (isVisible && hasMore) {
      updateCurrentPage((+currentPage + 1).toString());
    }
  }, [isVisible, hasMore]);
  useEffect(() => {
    connect();
  }, [hasMore]);

  return (
    <div className="max-w-[728px] w-full p-4">
      {blogs.length === 0 ? (
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
