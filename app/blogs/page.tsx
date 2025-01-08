"use client";

import MainHeader from "../_ui/components/blogList/MainHeader";
import BlogList from "../_ui/components/blogList/BlogList";
import BlogSideBar from "../_ui/components/blogList/BlogSidebar";
import { useCallback, useEffect, useState } from "react";
import { Blog } from "../_type/blogs";
import { fetchBlogs } from "../_network/blogs";
import { fetchCategories } from "../_network/categories";
import { Category } from "../_type/categories";
import { useSearchParams } from "next/navigation";
import BlogCardSkeleton from "../_ui/components/blogList/BlogSkeleton";

export default function Blogs() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") || "";
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [query, setQuery] = useState<string>(initialQuery);
  const [currentPage, setCurrentPage] = useState<string>("1");
  const [tags, setTags] = useState<Category[]>([]);
  const [loadingTags, setLoadingTags] = useState<boolean>(true);
  const [activeTags, setactiveTags] = useState<Category[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState<boolean>(true);

  interface MainHeaderProps {
    newQuery?: string;
    newCurrentPage?: string;
    newTags?: Category[];
    newBlogs?: Blog[];
  }
  const updatedAtaLocallly = useCallback(
    ({ newQuery, newCurrentPage, newTags, newBlogs }: MainHeaderProps) => {
      if (newQuery) {
        setQuery(newQuery);
      }
      if (newCurrentPage) {
        setCurrentPage(newCurrentPage);
      }
      if (newTags) {
        setactiveTags(newTags);
      }
      if (newBlogs) {
        setBlogs(newBlogs);
      }
    },
    []
  );

  const updateQuery = useCallback(
    async (query: string) => {
      setLoadingBlogs(true);
      const { blogs, hasMoreBlogs } = await fetchBlogs(query, 1, []);
      updatedAtaLocallly({
        newQuery: query,
        newCurrentPage: "1",
        newBlogs: blogs,
      });
      setHasMore(hasMoreBlogs);
      setLoadingBlogs(false);
    },
    [updatedAtaLocallly]
  );
  const updateCurrentPage = async (page: string) => {
    setLoadingBlogs(true);
    const { blogs: newBlogs, hasMoreBlogs } = await fetchBlogs(
      query,
      +currentPage,
      []
    );
    updatedAtaLocallly({
      newCurrentPage: page,
      newBlogs: [...blogs, ...newBlogs],
    });
    setHasMore(hasMoreBlogs);
    setLoadingBlogs(false);
  };
  const updateActiveTags = async (tags: Category[]) => {
    setLoadingBlogs(true);
    const { blogs, hasMoreBlogs } = await fetchBlogs(
      "",
      1,
      tags.map((tag) => tag.name)
    );
    setHasMore(hasMoreBlogs);
    updatedAtaLocallly({
      newTags: tags,
      newBlogs: blogs,
      newCurrentPage: "1",
      newQuery: "",
    });
    setLoadingBlogs(false);
  };

  useEffect(() => {
    async function fetchTags() {
      setLoadingTags(true);
      const tags = await fetchCategories();
      setLoadingTags(false);
      setTags(tags);
    }
    fetchTags();
  }, []);

  useEffect(() => {
    if (initialQuery) {
      updateQuery(initialQuery);
    }
  }, [initialQuery, updateQuery]);
  return (
    <div className="h-full flex flex-col">
      <MainHeader
        initialQuery={initialQuery}
        blogsByQuery={updateQuery}
        isSearchPage={true}
      />
      <main className="flex-1 flex justify-evenly overflow-y-auto overflow-x-hidden">
        <BlogList
          updateCurrentPage={updateCurrentPage}
          currentPage={currentPage}
          blogs={blogs}
          hasMore={hasMore}
          loadingBlogs={loadingBlogs}
        />
        <BlogSideBar
          updateTags={updateActiveTags}
          activeTags={activeTags}
          loadingTags={loadingTags}
          tags={tags}
        />
      </main>
    </div>
  );
}
