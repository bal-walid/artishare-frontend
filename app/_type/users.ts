export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateUser = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type UpdateUser = {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  emailVerifiedAt?: string | null;
};

export type DeleteUser = {
  id: number;
};
export type AuthUser = {
  user: User;
  token: string;
};
