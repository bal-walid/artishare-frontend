import { Blog } from "./blogs";
import { Comt } from "./comments";
import { Like } from "./likes";

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  created_at: string;
  updatedAt: string;
  blogs: Blog[];
  likes: Like[];
  comments: Comt[];
  profile_image: string;
  role: string;
  account_locked: boolean;
};

export type CreateUser = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  profile_image: FileList;
};

export type UpdateUser = {
  first_name: string;
  last_name: string;
  email: string;
};
export type UpdatePassword = {
  current_password: string;
  new_password: string;
  confirm_password: string;
};
export type DeleteUser = {
  id: number;
};
export type AuthUser = {
  user: User;
  token: string;
};
