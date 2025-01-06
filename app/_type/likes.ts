export type Like = {
  id: number;
  userId: number;
  blogId: number;
  created_at: string;
  updatedAt: string;
};

export type CreateLike = {
  userId: number;
  blogId: number;
};

export type DeleteLike = {
  id: number;
};
