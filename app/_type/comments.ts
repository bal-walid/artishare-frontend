import { Blog } from "./blogs";
import { User } from "./users";

export type Comt = {
  id: number;
  content: string;
  userId: number;
  user: User;
  blogId: number;
  blog?: Blog;
  created_at: string;
  updatedAt: string;
};

export type CreateComment = {
  content: string;
  userId: number;
  blogId: number;
};

export type UpdateComment = {
  content?: string;
};

export type DeleteComment = {
  id: number;
};
