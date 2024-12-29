import { AuthUser, User } from "../_type/users";
import { fetchData } from "./main";

//Loged in user
export const getLoggedInUser = async (): Promise<User> => {
  return (await fetchData<User>("/user")) as User;
};

// Login
export const login = async (
  email: string,
  password: string
): Promise<AuthUser> => {
  return (await fetchData<AuthUser>("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })) as AuthUser;
};

// Logout
export const logout = async (): Promise<boolean> => {
  try {
    await fetchData("/logout", {
      method: "POST",
    });
    return true;
  } catch (error) {
    throw error;
  }
};

// Register
export const register = async (
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  password_confirmation: string
): Promise<AuthUser> => {
  return (await fetchData<AuthUser>("/register", {
    method: "POST",
    body: JSON.stringify({
      first_name,
      last_name,
      email,
      password,
      password_confirmation,
    }),
  })) as AuthUser;
};
