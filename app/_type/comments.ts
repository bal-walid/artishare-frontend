import { Blog } from "./blogs";
import { User } from "./users";

export type Comt = {
  id: number;
  content: string;
  user_id: number;
  user: User;
  blog_id: number;
  blog?: Blog;
  created_at: string;
  updatedAt: string;
};

export type CreateComment = {
  content: string;
  user_id: number;
  blog_id: number;
};

export type UpdateComment = {
  content?: string;
};

export type DeleteComment = {
  id: number;
};
