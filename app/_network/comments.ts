import { Comt, CreateComment, UpdateComment } from "@/app/_type/comments";
import { fetchData } from "./main";

// Fetch all comments for a blog
export const fetchComments = async (blog_id: number): Promise<Comt[]> => {
  return (await fetchData<Comt[]>(`/blogs/${blog_id}/comments`)) as Comt[];
};

// Fetch a single comment
export const fetchComment = async (
  blog_id: number,
  commentId: number
): Promise<Comt> => {
  return (await fetchData<Comt>(
    `/blogs/${blog_id}/comments/${commentId}`
  )) as Comt;
};

// Create a new comment for a blog
export const createComment = async (
  blog_id: number,
  data: CreateComment
): Promise<{
  comment: Comt;
}> => {
  return (await fetchData<{
    comment: Comt;
  }>(`/blogs/${blog_id}/comments`, {
    method: "POST",
    body: JSON.stringify(data),
  })) as {
    comment: Comt;
  };
};

// Update a comment
export const updateComment = async (
  blog_id: number,
  commentId: number,
  data: UpdateComment
): Promise<Comt> => {
  return (await fetchData<Comt>(`/blogs/${blog_id}/comments/${commentId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  })) as Comt;
};

// Delete a comment
export const deleteComment = async (
  blog_id: number,
  commentId: number
): Promise<boolean> => {
  await fetchData(`/blogs/${blog_id}/comments/${commentId}`, {
    method: "DELETE",
  });
  return true;
};
