import { User, CreateUser, UpdateUser } from "@/app/_type/users";
import { fetchData } from "./main";

// Fetch all users
export const fetchUsers = async (): Promise<User[]> => {
  return (await fetchData<User[]>("/users", {
    method: "GET",
  })) as User[];
};

// Fetch a single user
export const fetchUser = async (id: number): Promise<User> => {
  return (await fetchData<User>(`/users/${id}`, {
    method: "GET",
  })) as User;
};

// Create a new user
export const createUser = async (data: CreateUser): Promise<User> => {
  return (await fetchData<User>("/users", {
    method: "POST",
    body: JSON.stringify(data),
  })) as User;
};

// Update a user
export const updateUser = async (
  id: number,
  data: UpdateUser
): Promise<User> => {
  return (await fetchData<User>(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  })) as User;
};

// Delete a user
export const deleteUser = async (
  id: number
): Promise<boolean> => {
  return await fetchData<boolean>(`/users/${id}`, {
    method: "DELETE",
  });
};
