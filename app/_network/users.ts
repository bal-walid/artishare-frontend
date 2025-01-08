import { UpdatePassword, UpdateUser, User } from "@/app/_type/users";
import { fetchData } from "./main";

// Fetch all users
export const fetchUsers = async (): Promise<User[]> => {
  return (await fetchData<User[]>("/users", {
    method: "GET",
  })) as User[];
};

// Fetch a single user
export const fetchUser = async (
  id: number
): Promise<{
  user: User;
}> => {
  return (await fetchData<{
    user: User;
  }>(`/users/${id}`, {
    method: "GET",
  })) as {
    user: User;
  };
};

// Update a user
export const updateUser = async (
  id: number,
  data: UpdateUser
): Promise<{
  user: User;
}> => {
  return (await fetchData<{
    user: User;
  }>(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  })) as {
    user: User;
  };
};

//update user image
export const updateUserImage = async (
  id: number,
  data: FormData
): Promise<{
  user: User;
}> => {
  return (await fetchData<{
    user: User;
  }>(`/users/${id}/image`, {
    method: "POST",
    body: data,
  })) as {
    user: User;
  };
};

//update user password
export const updateUserPassword = async (
  id: number,
  data: UpdatePassword
): Promise<{
  user: User;
}> => {
  return (await fetchData<{
    user: User;
  }>(`/users/${id}/password`, {
    method: "POST",
    body: JSON.stringify(data),
  })) as {
    user: User;
  };
};

// Delete a user
export const deleteUser = async (id: number): Promise<boolean> => {
  await fetchData<boolean>(`/users/${id}`, {
    method: "DELETE",
  });
  return true;
};
