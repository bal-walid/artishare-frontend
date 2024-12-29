import { Category } from "./categories";
import { Like } from "./likes";
import { User } from "./users";

export type Blog = {
    id: number;
    title: string;
    description: string;
    body: string;
    creatorId: number;
    creator: User;
    comments: Comment[];
    likes: Like[];
    categories: Category[];
    createdAt: string;
    updatedAt: string;
};

export type CreateBlog = {
    title: string;
    description: string;
    body: string;
    creatorId: number;
    category_id: number[];
};

export type UpdateBlog = {
    title?: string;
    description?: string;
    body?: string;
    category_id?: number[];
};

export type DeleteBlog = {
    id: number;
};
