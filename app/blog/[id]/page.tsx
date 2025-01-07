"use client";

import { fetchBlog } from "@/app/_network/blogs";
import { Blog } from "@/app/_type/blogs";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import "@/app/_ui/stylesheets/editor.scss";
import BlogDisplay from "@/app/_ui/components/blog/BlogDisplay";
import MainHeader from "@/app/_ui/components/blogList/MainHeader";

export default function BlogPage() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [blog, setBlog] = useState<Blog | null>(null);
  useEffect(() => {
    if (Array.isArray(id)) {
      throw new Error("Invalid Path");
    }
    async function fetchData() {
      if (!id) return;
      setLoading(true);
      const { blog } = await fetchBlog(parseInt(id));
      setBlog(blog);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  if (loading) return;
  if (blog) {
    return (
      <>
        <MainHeader isSearchPage={false} />
        <BlogDisplay blog={blog} />
      </>
    );
  }
}
