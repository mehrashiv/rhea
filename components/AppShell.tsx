"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { UploadDropzone } from "./UploadDropzone";
import { Feed } from "./Feed";
import { MyPhotos } from "./MyPhotos";

type Tab = "feed" | "mine";

export function AppShell() {
  const { user, signOut } = useAuth();
  const [tab, setTab] = useState<Tab>("feed");
  const [refreshSignal, setRefreshSignal] = useState(0);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col">
      <header className="flex items-center justify-between border-b border-border px-4 py-4">
        <h1 className="text-xl font-semibold tracking-tight text-brand-600">
          Snapshare
        </h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted">{user?.email}</span>
          <button
            type="button"
            onClick={() => signOut()}
            className="rounded-md border border-border px-3 py-1.5 text-sm font-medium hover:bg-surface"
          >
            Sign out
          </button>
        </div>
      </header>

      <UploadDropzone onPosted={() => setRefreshSignal((n) => n + 1)} />

      <nav className="flex border-b border-border px-4">
        {[
          { id: "feed" as const, label: "Feed" },
          { id: "mine" as const, label: "My Photos" },
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`-mb-px border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
              tab === t.id
                ? "border-brand-500 text-brand-600"
                : "border-transparent text-muted hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <main className="flex-1">
        {tab === "feed" ? (
          <Feed refreshSignal={refreshSignal} />
        ) : (
          <MyPhotos refreshSignal={refreshSignal} />
        )}
      </main>
    </div>
  );
}
