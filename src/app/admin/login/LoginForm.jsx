"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

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
        <input name="email" type="email" autoComplete="username" required />
      </label>
      <label className="a-field">
        <span>Password</span>
        <input name="password" type="password" autoComplete="current-password" required />
      </label>
      {error && <p className="a-msg a-msg--error" role="alert">{error}</p>}
      <button className="a-btn" type="submit" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
    </form>
  );
}
