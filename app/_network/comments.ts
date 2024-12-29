import { Comment, CreateComment, UpdateComment } from "@/app/_type/comments";
import { fetchData } from "./main";

// Fetch all comments for a blog
export const fetchComments = async (blogId: number): Promise<Comment[]> => {
  return (await fetchData<Comment[]>(`/blogs/${blogId}/comments`)) as Comment[];
};

// Fetch a single comment
export const fetchComment = async (
  blogId: number,
  commentId: number
): Promise<Comment> => {
  return (await fetchData<Comment>(
    `/blogs/${blogId}/comments/${commentId}`
  )) as Comment;
};

// Create a new comment for a blog
export const createComment = async (
  blogId: number,
  data: CreateComment
): Promise<Comment> => {
  return (await fetchData<Comment>(`/blogs/${blogId}/comments`, {
    method: "POST",
    body: JSON.stringify(data),
  })) as Comment;
};

// Update a comment
export const updateComment = async (
  blogId: number,
  commentId: number,
  data: UpdateComment
): Promise<Comment> => {
  return (await fetchData<Comment>(`/blogs/${blogId}/comments/${commentId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  })) as Comment;
};

// Delete a comment
export const deleteComment = async (
  blogId: number,
  commentId: number
): Promise<boolean> => {
  await fetchData(`/blogs/${blogId}/comments/${commentId}`, {
    method: "DELETE",
  });
  return true;
};
