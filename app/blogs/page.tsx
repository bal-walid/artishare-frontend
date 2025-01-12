"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { fetchBlogs } from "../_network/blogs";
import { fetchCategories } from "../_network/categories";
import { Blog } from "../_type/blogs";
import { Category } from "../_type/categories";
import BlogList from "../_ui/components/blogList/BlogList";
import BlogSideBar from "../_ui/components/blogList/BlogSidebar";
import MainHeader from "../_ui/components/blogList/MainHeader";
import { AuthGuard } from "../contexts/AuthContext";

export default function Blogs() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") || "";
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [query, setQuery] = useState<string>(initialQuery);
  const [currentPage, setCurrentPage] = useState<string>("0");
  const [tags, setTags] = useState<Category[]>([]);
  const [loadingTags, setLoadingTags] = useState<boolean>(true);
  const [activeTags, setactiveTags] = useState<Category[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState<boolean>(true);

  const updatedAtaLocallly = useCallback(
    ({
      newQuery,
      newCurrentPage,
      newTags,
      newBlogs,
    }: {
      newQuery?: string;
      newCurrentPage?: string;
      newTags?: Category[];
      newBlogs?: Blog[];
    }) => {
      if (newQuery || newQuery === "") {
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

  const updateQuery = async (query: string) => {
    updatedAtaLocallly({
      newQuery: query,
      newCurrentPage: "0",
      newBlogs: [],
    });
    setHasMore(true);
  };
  const updateCurrentPage = useCallback(async () => {
    setLoadingBlogs(true);
    const { blogs: newBlogs, hasMoreBlogs } = await fetchBlogs(
      query,
      +currentPage + 1,
      activeTags.map((tag) => tag.name)
    );
    updatedAtaLocallly({
      newCurrentPage: (+currentPage + 1).toString(),
      newBlogs: [...blogs, ...newBlogs],
    });
    setHasMore(hasMoreBlogs);
    setLoadingBlogs(false);
  }, [query, currentPage, activeTags, updatedAtaLocallly, blogs]);
  const updateActiveTags = async (tags: Category[]) => {
    updatedAtaLocallly({
      newTags: tags,
      newCurrentPage: "0",
      newBlogs: [],
    });
    setHasMore(true);
  };

  useEffect(() => {
    async function fetchTags() {
      setLoadingTags(true);
      const tags = await fetchCategories();
      setLoadingTags(false);
      setTags(tags.slice(0, 12));
    }
    fetchTags();
  }, []);

  return (
    <AuthGuard requireAuth={false}>
      <div className="h-full flex flex-col">
        <MainHeader
          initialQuery={initialQuery}
          blogsByQuery={updateQuery}
          isSearchPage={true}
        />
        <main className="flex-1 flex justify-evenly overflow-y-auto overflow-x-hidden">
          <BlogList
            updateCurrentPage={updateCurrentPage}
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
    </AuthGuard>
  );
}
