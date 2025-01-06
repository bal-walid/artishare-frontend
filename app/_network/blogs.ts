import { Blog, CreateBlog, DisplayBlog, UpdateBlog } from "@/app/_type/blogs";
import { fetchData } from "./main";
import { serverAddress } from "../_config/main";

// Fetch all blogs
export const fetchBlogs = async (page = 1): Promise<{ blogs: DisplayBlog[]; hasMore: boolean }> => {
  try {
    const response = await fetchData(`/blogs?page=${page}`);
    const blogs = response.blog.data.map((blog: any) => ({
      id: blog.id,
      title: blog.title,
      creator: `${blog.user.first_name} ${blog.user.last_name}`,
      creatorPicture: serverAddress + blog.user.profile_image,
      description: blog.description,
      preview: serverAddress + blog.preview,
      categories: blog.categories.map((category: any) => category.name),
      likeCount: blog.likes_count,
      commentCount: blog.comments_count,
      date: blog.created_at,
    }));
    const hasMore = response.blog.next_page_url !== null;

    return { blogs, hasMore };
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return { blogs: [], hasMore: false };
  }
};


// Fetch a single blog
export const fetchBlog = async (id: number): Promise<Blog> => {
  return (await fetchData<Blog>(`/blogs/${id}`)) as Blog;
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
export const createBlog = async (data: CreateBlog): Promise<Blog> => {
  return (await fetchData<Blog>("/blogs", {
    method: "POST",
    body: JSON.stringify(data),
  })) as Blog;
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
