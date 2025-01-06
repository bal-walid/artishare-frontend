import { Category } from "./categories";
import { Comt } from "./comments";
import { Like } from "./likes";
import { User } from "./users";

export type Blog = {
    id: number;
    title: string;
    description: string;
    body: string;
    creatorId: number;
    creator: User;
    comments: Comt[];
    likes: Like[];
    categories: Category[];
    createdAt: string;
    updatedAt: string;
};

// This type is meant for display in the /blogs list
export type DisplayBlog = {
    id: number;
    title: string;
    creator: string;
    description: string;
    categories: string[];
    likeCount: number;
    commentCount: number;
    date: string;
}

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
