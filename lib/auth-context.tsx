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
import { signInAction, signOutAction, signUpAction } from "./auth-actions";

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

function getAccessTokenCookie() {
  const match = document.cookie
    .split(";")
    .find((c) => c.trim().startsWith("insforge_access_token="));
  return match ? decodeURIComponent(match.split("=")[1] ?? "") : null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/auth/refresh", { method: "POST", credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (body?.accessToken) insforge.setAccessToken(body.accessToken);
        setUser(body?.user ?? null);
      })
      .catch(() => setUser(null))
      .finally(() => setIsLoaded(true));
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const { user: signedInUser, error } = await signInAction(email, password);
    if (error) return { error };
    const accessToken = getAccessTokenCookie();
    if (accessToken) insforge.setAccessToken(accessToken);
    setUser(signedInUser);
    return {};
  }, []);

  const signUp = useCallback(
    async (email: string, password: string, name?: string) => {
      const { user: signedUpUser, requireEmailVerification, error } = await signUpAction(
        email,
        password,
        name
      );
      if (error) return { error };
      if (requireEmailVerification) {
        return { error: "Check your email to verify your account, then sign in." };
      }
      const accessToken = getAccessTokenCookie();
      if (accessToken) insforge.setAccessToken(accessToken);
      setUser(signedUpUser);
      return {};
    },
    []
  );

  const signOut = useCallback(async () => {
    await signOutAction();
    insforge.setAccessToken(null);
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
