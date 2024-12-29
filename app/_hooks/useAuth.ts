// use client
import { useEffect, useState } from "react";
import { getLoggedInUser } from "../_network/auth";
import { User } from "../_type/users";
import { login as loginApi, register } from "../_network/auth";
import { signUp } from "../_type/auth";
export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function checkUser() {
      const user = await getLoggedInUser();
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
      }
    }
    checkUser();
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    const user = await loginApi(email, password);
    setIsAuthenticated(true);
    setUser(user.user);
    localStorage.setItem("authToken", user.token);
    return user.user;
  };
  const signup = async (user: signUp): Promise<User> => {
    const newUser = await register(
      user.first_name,
      user.last_name,
      user.email,
      user.password,
      user.password_confirmation
    );
    setIsAuthenticated(true);
    setUser(newUser.user);
    localStorage.setItem("authToken", newUser.token);
    return newUser.user;
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    setUser(null);
  };

  return {
    isAuthenticated,
    user,
    login,
    signup,
    logout,
  };
};
