import { Blog } from "./blogs";
import { Like } from "./likes";

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  blogs: Blog[];
  likes: Like[];
  comments: Comment[];
  profile_image: string;
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
