"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { IconEye, IconEyeSlash } from "../_components/icons";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.get("email"), password: data.get("password") }),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok || !result.ok) {
        setError(result.error || "Sign-in failed. Please try again.");
        return;
      }
      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: 14 }}>
      <label className="a-field">
        <span>Email</span>
        <input name="email" type="email" autoComplete="username" placeholder="you@baitalebdaa.com" required />
      </label>
      <label className="a-field">
        <span>Password</span>
        <span className="a-password">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            className="a-password__toggle"
            onClick={() => setShowPassword((value) => !value)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            title={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <IconEye size={20} color="currentColor" /> : <IconEyeSlash size={20} color="currentColor" />}
          </button>
        </span>
      </label>
      {error && <p className="a-msg a-msg--error" role="alert">{error}</p>}
      <button className="a-btn" type="submit" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
    </form>
  );
}
