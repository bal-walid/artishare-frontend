import { Like, CreateLike } from "@/app/_type/likes";
import { fetchData } from "./main";

// Fetch all likes for a blog
export const fetchLikes = async (blog_id: number): Promise<Like[]> => {
  return (await fetchData<Like[]>(`/blogs/${blog_id}/likes`)) as Like[];
};

// Add a like to a blog
export const createLike = async (
  blog_id: number,
  data: CreateLike
): Promise<Like> => {
  return (await fetchData<Like>(`/blogs/${blog_id}/likes`, {
    method: "POST",
    body: JSON.stringify(data),
  })) as Like;
};

// Fetch single like
export const fetchLike = async (
  blog_id: number,
  likeId: number
): Promise<Like> => {
  return (await fetchData<Like>(`/blogs/${blog_id}/likes/${likeId}`)) as Like;
};

// Remove a like
export const deleteLike = async (
  blog_id: number,
  likeId: number
): Promise<boolean> => {
  await fetchData(`/blogs/${blog_id}/likes/${likeId}`, {
    method: "DELETE",
  });
  return true;
};
