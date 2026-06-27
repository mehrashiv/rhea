"use client";

import { useAuth } from "@/lib/auth-context";
import { AppShell } from "@/components/AppShell";
import { Feed } from "@/components/Feed";
import { PublicMasthead } from "@/components/PublicMasthead";

export default function Home() {
  const { user, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="page-loader">
        <div className="spinner" />
      </div>
    );
  }

  if (user) {
    return <AppShell />;
  }

  return (
    <>
      <PublicMasthead />
      <Feed />
    </>
  );
}
