"use client";
import { DisplayBlog } from "@/app/_type/blogs";
import { useState, useEffect, useRef } from "react";
import BlogCard from "./BlogCard";
import { useIntersection } from "@/app/_hooks/useIntersection";
import BlogCardSkeleton from "./BlogSkeleton";
import { fetchBlogs } from "@/app/_network/blogs";

const BlogList = () => {
  const [blogs, setBlogs] = useState<DisplayBlog[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true); // Track if there are more blogs
  const [page, setPage] = useState<number>(1); // Track the current page
  const observerRef = useRef<HTMLDivElement | null>(null);
  const { isVisible } = useIntersection({
    element: observerRef,
    rootMargin: "0px",
  });

  // Fetch blogs whenever `page` or `isVisible` changes
  useEffect(() => {
    if (isVisible && hasMore) {
      fetchBlogs(page).then(({ blogs, hasMore }) => {
        setBlogs((prevBlogs) => [...prevBlogs, ...blogs]);
        setHasMore(hasMore);
        if (hasMore) setPage((prevPage) => prevPage + 1); // Increment page if more blogs are available
      });
    }
  }, [isVisible]);

  return (
    <div className="max-w-[728px] w-full p-4">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
      
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
