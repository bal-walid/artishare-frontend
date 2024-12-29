export type Category = {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
};

export type CreateCategory = {
    name: string;
};

export type UpdateCategory = {
    name?: string;
};

export type DeleteCategory = {
    id: number;
};
