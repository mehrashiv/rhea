"use server";

import { cookies } from "next/headers";
import { createAuthActions } from "@insforge/sdk/ssr";

async function getActions() {
  return createAuthActions({ cookies: await cookies() });
}

export async function signInAction(email: string, password: string) {
  const { data, error } = await (await getActions()).signInWithPassword({ email, password });
  return { user: data?.user ?? null, error: error?.message };
}

export async function signUpAction(email: string, password: string, name?: string) {
  const { data, error } = await (await getActions()).signUp({ email, password, name });
  return {
    user: data?.user ?? null,
    requireEmailVerification: data?.requireEmailVerification ?? false,
    error: error?.message,
  };
}

export async function signOutAction() {
  await (await getActions()).signOut();
}
