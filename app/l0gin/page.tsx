"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  const { user, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user) router.replace("/");
  }, [isLoaded, user, router]);

  if (!isLoaded || user) return null;

  return <LoginForm />;
}
