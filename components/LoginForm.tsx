"use client";

import { useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export function LoginForm() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!email.trim() || !password) {
      setError("Enter your email and password to continue.");
      return;
    }
    setLoading(true);
    setError(null);
    const result = await signIn(email.trim(), password);
    setLoading(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    router.push("/");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") submit();
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="brand__mark" src="/lila-mark.svg" alt="" />
          <span className="brand__name">lila</span>
        </div>
        <p className="login-hint">Members only · invitation required</p>

        <label className="field-label" htmlFor="login-email">
          Email
        </label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(null);
          }}
          placeholder="you@email.com"
          className="field-input"
        />

        <label className="field-label" htmlFor="login-password">
          Password
        </label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(null);
          }}
          onKeyDown={onKeyDown}
          placeholder="••••••••"
          className="field-input"
        />

        {error && <p className="field-error">{error}</p>}

        <button type="button" onClick={submit} disabled={loading} className="btn btn--primary btn-full">
          {loading ? "Please wait…" : "Log in"}
        </button>

        <div className="login-back-row">
          <Link href="/" className="btn--text">
            ← Back to gallery
          </Link>
        </div>
      </div>
    </div>
  );
}
