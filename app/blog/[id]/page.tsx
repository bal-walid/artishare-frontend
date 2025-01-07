"use client";

import { fetchBlog } from "@/app/_network/blogs";
import { Blog } from "@/app/_type/blogs";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import "@/app/_ui/stylesheets/editor.scss";
import BlogDisplay from "@/app/_ui/components/blog/BlogDisplay";
import MainHeader from "@/app/_ui/components/blogList/MainHeader";

export default function BlogPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [blog, setBlog] = useState<Blog | null>(null);
  useEffect(() => {
    if (Array.isArray(id)) {
      throw new Error("Invalid Path");
    }
    if (id) {
      console.log(id);
      fetchBlog(parseInt(id)).then((blog) => {
        setBlog(blog.blog);
        setLoading(false);
      });
    }
  }, []);

  if (loading) {
    return "loading...";
  }
  if (blog) {
    return (
      <>
        <MainHeader isSearchPage={false} />
        <BlogDisplay blog={blog} />
      </>
    );
  }
}
