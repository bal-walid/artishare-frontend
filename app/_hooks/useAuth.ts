"use client";
import { useEffect, useState } from "react";
import { UnauthorizedError } from "../_errors/main";
import {
  getLoggedInUser,
  login as loginApi,
  logout as logoutApi,
  register,
} from "../_network/auth";
import {
  updateUser,
  updateUserImage,
  updateUserPassword,
} from "../_network/users";
import { signUp } from "../_type/auth";
import { UpdatePassword, UpdateUser, User } from "../_type/users";
export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    async function checkUser() {
      try {
        const Newuser = await getLoggedInUser();
        if (Newuser) {
          setIsAuthenticated(true);
          setUser(Newuser);
          if (Newuser.role === "admin") {
            setIsAdmin(true);
          }
        }
      } catch (error) {
        if (error instanceof UnauthorizedError) {
          setLoading(false);
        }
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
  const userImageUpdate = async (data: FormData): Promise<User | null> => {
    if (!user) return null;
    const updatedUser = await updateUserImage(user?.id, data);
    setUser(updatedUser.user);
    return updatedUser.user;
  };

  const userUpdate = async (data: UpdateUser): Promise<User | null> => {
    if (!user) return null;
    const updatedUser = await updateUser(user?.id, data);
    setUser(updatedUser.user);
    return updatedUser.user;
  };
  const userPasswordUpdate = async (
    data: UpdatePassword
  ): Promise<User | null> => {
    if (!user) return null;
    const updatedUser = await updateUserPassword(user?.id, data);
    setUser(updatedUser.user);
    return updatedUser.user;
  };

  const logout = async () => {
    await logoutApi();
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    setUser(null);
  };

  return {
    isAuthenticated,
    isAdmin,
    loading,
    user,
    login,
    signup,
    logout,
    userUpdate,
    userPasswordUpdate,
    userImageUpdate,
  };
};
