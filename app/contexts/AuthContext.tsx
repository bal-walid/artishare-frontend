"use client";
import { createContext, useContext } from "react";
import { User, UpdateUser, UpdatePassword } from "../_type/users";
import { signUp } from "../_type/auth";
import { useAuth } from "../_hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "../_ui/components/Loading";

type AuthContextType = {
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<User>;
  signup: (user: signUp) => Promise<User>;
  logout: () => Promise<void>;
  userUpdate: (data: UpdateUser) => Promise<User | null>;
  userPasswordUpdate: (data: UpdatePassword) => Promise<User | null>;
  userImageUpdate: (data: FormData) => Promise<User | null>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export function AuthGuard({
  children,
  requireAuth = true,
  requireAdmin = false,
  redirectTo = "/login",
  requireClient = false,
}: {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
  requireClient?: boolean;
  requireAdmin?: boolean;
}) {
  const auth = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!auth.loading && requireAuth) {
      if (!auth.isAuthenticated) {
        router.push(redirectTo);
      }
    }
  }, [auth.loading, auth.isAuthenticated, requireAuth, redirectTo, router]);
  useEffect(() => {
    if (!auth.loading && requireAdmin) {
      if (!auth.isAdmin) {
        router.push(redirectTo);
      }
    }
  }, [auth.isAdmin, auth.loading, requireAdmin, redirectTo, router]);
  useEffect(() => {
    if (!auth.loading && requireClient) {
      if (auth.isAuthenticated) {
        router.push(redirectTo);
      }
    }
  }, [auth.isAuthenticated, auth.loading, requireClient, redirectTo, router]);
  if (auth.loading) {
    return <Loading />;
  }

  if (
    (requireAuth && !auth.isAuthenticated) ||
    (requireAdmin && !auth.isAdmin) ||
    (requireClient && auth.isAuthenticated)
  ) {
    // Don't render anything while redirecting
    return null;
  }

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
