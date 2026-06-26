"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { insforge } from "./insforge";

export type AppUser = {
  id: string;
  email: string;
  profile?: { name?: string; avatar_url?: string } | null;
};

type AuthContextValue = {
  user: AppUser | null;
  isLoaded: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (
    email: string,
    password: string,
    name?: string
  ) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    insforge.auth.getCurrentUser().then(({ data }) => {
      setUser(data?.user ?? null);
      setIsLoaded(true);
    });
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const { data, error } = await insforge.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return { error: error.message };
    setUser(data?.user ?? null);
    return {};
  }, []);

  const signUp = useCallback(
    async (email: string, password: string, name?: string) => {
      const { data, error } = await insforge.auth.signUp({
        email,
        password,
        name,
      });
      if (error) return { error: error.message };
      if (!data?.accessToken) {
        return { error: "Check your email to verify your account, then sign in." };
      }
      setUser(data.user ?? null);
      return {};
    },
    []
  );

  const signOut = useCallback(async () => {
    await insforge.auth.signOut();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoaded, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
