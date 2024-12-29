export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type UpdateUser = {
  firstName?: string;
  lastName?: string;
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
