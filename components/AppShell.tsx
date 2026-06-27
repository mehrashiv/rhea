"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { AppHeader, type Tab } from "./AppHeader";
import { Feed } from "./Feed";
import { MyPhotos } from "./MyPhotos";

export function AppShell() {
  const { user, signOut } = useAuth();
  const [tab, setTab] = useState<Tab>("feed");

  if (!user) return null;

  const greetingName = user.profile?.name || user.email.split("@")[0];

  return (
    <>
      <AppHeader greetingName={greetingName} onSignOut={signOut} tab={tab} onTabChange={setTab} />
      {tab === "feed" ? <Feed currentUserId={user.id} /> : <MyPhotos />}
    </>
  );
}
