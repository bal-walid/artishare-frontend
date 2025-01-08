import { Blog } from "./blogs";

export type Like = {
  id: number;
  user_id: number;
  blog_id: number;
  blog: Blog;
  created_at: string;
  updatedAt: string;
};

export type CreateLike = {
  user_id: number;
  blog_id: number;
};

export type DeleteLike = {
  id: number;
};
