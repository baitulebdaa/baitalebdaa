"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * Settings → Who can log in: the admins (owners first), Remove for added ones, and a form to
 * add one (owner, 27 Oct 2026).
 */
export function TeamManager({ me, owners, added }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null);

  const call = async (method, body) => {
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/admins", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok || !result.ok) {
        setMessage({ ok: false, text: result.error || "Not done. Please try again." });
        return null;
      }
      router.refresh();
      return result;
    } catch {
      setMessage({ ok: false, text: "No internet. Please try again." });
      return null;
    } finally {
      setBusy(false);
    }
  };

  const add = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const result = await call("POST", data);
    if (result) {
      setMessage({
        ok: true,
        text: result.created
          ? `✓ Added. ${data.email} can log in with the password you chose.`
          : `✓ Added. ${data.email} already had an account and logs in with their own password.`,
      });
      form.reset();
    }
  };

  const remove = async (email) => {
    if (!window.confirm(`Remove ${email} as admin? They will not be able to open the admin panel.`)) return;
    if (await call("DELETE", { email })) setMessage({ ok: true, text: `✓ ${email} is no longer an admin.` });
  };

  const rows = [
    ...owners.map((email) => ({ email, owner: true })),
    ...added.filter((email) => !owners.includes(email)).map((email) => ({ email, owner: false })),
  ];

  return (
    <>
      <ul className="a-team">
        {rows.map(({ email, owner }) => (
          <li key={email}>
            <span className="a-me__avatar a-setting__avatar" aria-hidden="true">{email.charAt(0)}</span>
            <span className="a-team__email">{email}</span>
            {owner && <span className="a-pill a-pill--violet">Owner</span>}
            {email === me && <span className="a-pill a-pill--green">You</span>}
            {!owner && email !== me && (
              <button type="button" className="a-big-btn a-big-btn--danger a-team__remove" onClick={() => remove(email)} disabled={busy}>
                Remove
              </button>
            )}
          </li>
        ))}
      </ul>

      <form className="a-form" onSubmit={add}>
        <h3 className="a-form__title">➕ Add an admin</h3>
        <label className="a-field">
          <span>Name</span>
          <input name="name" maxLength={80} autoComplete="off" />
        </label>
        <label className="a-field">
          <span>Email</span>
          <input name="email" type="email" required maxLength={120} autoComplete="off" />
        </label>
        <label className="a-field a-field--wide">
          <span>Password (for a new account, at least 8 characters)</span>
          <input name="password" type="text" minLength={8} maxLength={100} autoComplete="new-password" />
        </label>
        <div className="a-form__end">
          <button className="a-big-btn a-big-btn--save" type="submit" disabled={busy}>{busy ? "Adding…" : "Add admin"}</button>
          {message && <p className={`a-msg ${message.ok ? "a-msg--ok" : "a-msg--error"}`} role="status">{message.text}</p>}
        </div>
      </form>
    </>
  );
}
