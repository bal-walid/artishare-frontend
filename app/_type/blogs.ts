import { Category } from "./categories";
import { Comt } from "./comments";
import { Like } from "./likes";
import { User } from "./users";

export type Blog = {
  id: number;
  title: string;
  description: string;
  body: string;
  creator_id: number;
  user: User;
  comments: Comt[];
  likes: Like[];
  preview?: string;
  categories: Category[];
  created_at: string;
  updatedAt: string;
};

export type CreateBlog = {
  title: string;
  description: string;
  preview: string;
  body: string;
  categories: string[];
};

export type UpdateBlog = {
  title?: string;
  description?: string;
  body?: string;
  preview?: string;
  categories?: number[];
};

export type DeleteBlog = {
  id: number;
};
