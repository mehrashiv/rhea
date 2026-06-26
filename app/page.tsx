"use client";

import { useAuth } from "@/lib/auth-context";
import { AuthForm } from "@/components/AuthForm";
import { AppShell } from "@/components/AppShell";

export default function Home() {
  const { user, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted">Loading…</p>
      </div>
    );
  }

  return user ? <AppShell /> : <AuthForm />;
}
