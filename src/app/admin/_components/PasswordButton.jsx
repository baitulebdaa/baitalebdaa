"use client";

import { useState } from "react";

/** Emails the admin a link to set a new password. */
export function PasswordButton({ email }) {
  const [state, setState] = useState("idle");
  const [error, setError] = useState("");

  const send = async () => {
    setState("busy");
    setError("");
    try {
      const res = await fetch("/api/admin/password", { method: "POST" });
      const result = await res.json().catch(() => ({}));
      if (!res.ok || !result.ok) {
        setError(result.error || "Not sent. Please try again.");
        setState("idle");
        return;
      }
      setState("sent");
    } catch {
      setError("No internet. Please try again.");
      setState("idle");
    }
  };

  return (
    <div className="a-setting__action">
      <button type="button" className="a-big-btn a-big-btn--open" onClick={send} disabled={state !== "idle"}>
        🔑 {state === "busy" ? "Sending…" : state === "sent" ? "Email sent" : "Change my password"}
      </button>
      {state === "sent" && <p className="a-msg a-msg--ok">✓ Check {email}: open the email and choose a new password.</p>}
      {error && <p className="a-msg a-msg--error">{error}</p>}
    </div>
  );
}
