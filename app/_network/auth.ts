import { fetchData } from "./main";

//Loged in user
export const getLoggedInUser = async (): Promise<void> => {
  await fetchData<void>("/user");
};


// Login
export const login = async (email: string, password: string): Promise<void> => {
  await fetchData<void>("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

// Logout
export const logout = async (): Promise<void> => {
  await fetchData<void>("/logout", {
    method: "POST",
  });
};

// Register
export const register = async (
  email: string,
  password: string
): Promise<void> => {
  await fetchData<void>("/register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};
