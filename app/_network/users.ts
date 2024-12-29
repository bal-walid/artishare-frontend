import { User, UpdateUser } from "@/app/_type/users";
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
export const deleteUser = async (id: number): Promise<boolean> => {
  await fetchData<boolean>(`/users/${id}`, {
    method: "DELETE",
  });
  return true;
};
