// use client
import { useEffect, useState } from "react";
import { getLoggedInUser } from "../_network/auth";
import { User } from "../_type/users";
import { login as loginApi, register } from "../_network/auth";
import { signUp } from "../_type/auth";
export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function checkUser() {
      try {
        const user = await getLoggedInUser();
        if (user) {
          setIsAuthenticated(true);
          setUser(user);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
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
    const formData = new FormData();
    formData.append("first_name", user.first_name);
    formData.append("last_name", user.last_name);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("password_confirmation", user.password_confirmation);
    if (user?.profile_image && user.profile_image.length > 0) {
      formData.append("profile_image", user.profile_image[0]);
    }
    const newUser = await register(formData);
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
    loading,
    user,
    login,
    signup,
    logout,
  };
};
