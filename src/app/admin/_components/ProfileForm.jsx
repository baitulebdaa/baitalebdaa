"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/** Settings → My account: name, phone and address, with one Save button. */
export function ProfileForm({ name, phone, address }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null);

  const save = async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok || !result.ok) {
        setMessage({ ok: false, text: result.error || "Not saved. Please try again." });
        return;
      }
      setMessage({ ok: true, text: "✓ Saved" });
      router.refresh();
    } catch {
      setMessage({ ok: false, text: "No internet. Please try again." });
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="a-form" onSubmit={save}>
      <label className="a-field">
        <span>Name</span>
        <input name="name" defaultValue={name} required maxLength={80} autoComplete="name" />
      </label>
      <label className="a-field">
        <span>Phone</span>
        <input name="phone" type="tel" defaultValue={phone} maxLength={30} autoComplete="tel" placeholder="05X XXX XXXX" />
      </label>
      <label className="a-field a-field--wide">
        <span>Address</span>
        <textarea name="address" defaultValue={address} maxLength={300} rows={2} autoComplete="street-address" />
      </label>
      <div className="a-form__end">
        <button className="a-big-btn a-big-btn--save" type="submit" disabled={busy}>{busy ? "Saving…" : "Save"}</button>
        {message && <p className={`a-msg ${message.ok ? "a-msg--ok" : "a-msg--error"}`} role="status">{message.text}</p>}
      </div>
    </form>
  );
}
