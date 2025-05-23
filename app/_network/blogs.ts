import { Blog, CreateBlog, UpdateBlog } from "@/app/_type/blogs";
import { fetchData } from "./main";

// Fetch all blogs
export const fetchBlogs = async (
  query: string = "",
  page = 1,
  tags: string[] = []
): Promise<{ blogs: Blog[]; currentPage: number; hasMoreBlogs: boolean }> => {
  try {
    const response = await fetchData<{
      blogs: Blog[];
      currentPage: number;
      hasMoreBlogs: boolean;
    }>(`/blogs/search?query=${query}&currentPage=${page}`, {
      method: "POST",
      body: JSON.stringify({ tags }),
    });
    return response as {
      blogs: Blog[];
      currentPage: number;
      hasMoreBlogs: boolean;
    };
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return { blogs: [], currentPage: 1, hasMoreBlogs: false };
  }
};

// Fetch a single blog
export const fetchBlog = async (
  id: number
): Promise<{
  blog: Blog;
}> => {
  return (await fetchData<{
    blog: Blog;
  }>(`/blogs/${id}`)) as {
    blog: Blog;
  };
};

//Search for blogs
export const searchBlogs = async (
  query: string,
  currentPage: string
): Promise<Blog[]> => {
  return (await fetchData<Blog[]>(
    `/blogs?query=${query}&currentPage=${currentPage}`
  )) as Blog[];
};
// Create a new blog
export const createBlog = async (
  data: CreateBlog
): Promise<{
  blog: Blog;
}> => {
  return (await fetchData<{
    blog: Blog;
  }>("/blogs", {
    method: "POST",
    body: JSON.stringify(data),
  })) as {
    blog: Blog;
  };
};
// save image to the server
export const saveImage = async (
  data: FormData
): Promise<{
  url: string;
}> => {
  return (await fetchData<{
    url: string;
  }>("/blogs/upload", {
    method: "POST",
    body: data,
  })) as {
    url: string;
  };
};

// Update an existing blog
export const updateBlog = async (
  id: number,
  data: UpdateBlog
): Promise<Blog> => {
  return (await fetchData<Blog>(`/blogs/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  })) as Blog;
};

// Delete a blog
export const deleteBlog = async (id: number): Promise<boolean> => {
  await fetchData(`/blogs/${id}`, {
    method: "DELETE",
  });
  return true;
};
