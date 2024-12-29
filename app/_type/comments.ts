export type Comment = {
  id: number;
  content: string;
  userId: number;
  blogId: number;
  createdAt: string;
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
