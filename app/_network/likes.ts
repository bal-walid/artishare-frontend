import { Like, CreateLike } from "@/app/_type/likes";
import { fetchData } from "./main";

// Fetch all likes for a blog
export const fetchLikes = async (blogId: number): Promise<Like[]> => {
  return (await fetchData<Like[]>(`/blogs/${blogId}/likes`)) as Like[];
};

// Add a like to a blog
export const createLike = async (
  blogId: number,
  data: CreateLike
): Promise<Like> => {
  return (await fetchData<Like>(`/blogs/${blogId}/likes`, {
    method: "POST",
    body: JSON.stringify(data),
  })) as Like;
};

// Fetch single like
export const fetchLike = async (
  blogId: number,
  likeId: number
): Promise<Like> => {
  return (await fetchData<Like>(`/blogs/${blogId}/likes/${likeId}`)) as Like;
};

// Remove a like
export const deleteLike = async (
  blogId: number,
  likeId: number
): Promise<boolean> => {
  await fetchData(`/blogs/${blogId}/likes/${likeId}`, {
    method: "DELETE",
  });
  return true;
};
