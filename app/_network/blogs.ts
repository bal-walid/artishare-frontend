import { Blog, CreateBlog, UpdateBlog } from "@/app/_type/blogs";
import { fetchData } from "./main";

// Fetch all blogs
export const fetchBlogs = async (): Promise<Blog[]> => {
  return (await fetchData<Blog[]>("/blogs")) as Blog[];
};

// Fetch a single blog
export const fetchBlog = async (id: number): Promise<Blog> => {
  return (await fetchData<Blog>(`/blogs/${id}`)) as Blog;
};

// Create a new blog
export const createBlog = async (data: CreateBlog): Promise<Blog> => {
  return (await fetchData<Blog>("/blogs", {
    method: "POST",
    body: JSON.stringify(data),
  })) as Blog;
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
  return await fetchData<boolean>(`/blogs/${id}`, {
    method: "DELETE",
  });
};
