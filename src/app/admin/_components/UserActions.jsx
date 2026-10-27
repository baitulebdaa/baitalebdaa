"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/** Block / Unblock, password reset email and Delete for one user, as big buttons. */
export function UserActions({ uid, email, blocked }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null);

  const run = async (method, body, done) => {
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/users/${uid}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
      });
      const result = await res.json().catch(() => ({}));
      if (res.status === 401) {
        router.replace("/admin/login");
        return;
      }
      if (!res.ok || !result.ok) {
        setMessage({ ok: false, text: result.error || "Not done. Please try again." });
        return;
      }
      done();
    } catch {
      setMessage({ ok: false, text: "No internet. Please try again." });
    } finally {
      setBusy(false);
    }
  };

  const toggleBlock = () =>
    run("PATCH", { action: blocked ? "unblock" : "block" }, () => {
      setMessage({ ok: true, text: blocked ? "✓ Unblocked. They can log in again." : "✓ Blocked. They can't log in now." });
      router.refresh();
    });

  const reset = () =>
    run("PATCH", { action: "reset" }, () => setMessage({ ok: true, text: `✓ Password email sent to ${email}.` }));

  const remove = () => {
    if (!window.confirm("Delete this user? Their requests stay in Customers.")) return;
    run("DELETE", null, () => {
      router.replace("/admin/users");
      router.refresh();
    });
  };

  return (
    <div className="a-status">
      <div className="a-user-actions">
        <button type="button" className={`a-big-btn ${blocked ? "a-big-btn--call" : "a-big-btn--warn"}`} onClick={toggleBlock} disabled={busy}>
          {blocked ? "✓ Unblock" : "⛔ Block"}
        </button>
        <button type="button" className="a-big-btn a-big-btn--open" onClick={reset} disabled={busy}>
          🔑 Send password email
        </button>
        <button type="button" className="a-big-btn a-big-btn--danger" onClick={remove} disabled={busy}>
          🗑 Delete user
        </button>
      </div>
      {message && <p className={`a-msg ${message.ok ? "a-msg--ok" : "a-msg--error"} a-status__msg`} role="status">{message.text}</p>}
    </div>
  );
}
