"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/** Settings → Business details: what the website shows for calls, WhatsApp, email, address and hours. */
export function BusinessForm({ business }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null);

  const save = async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/business", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok || !result.ok) {
        setMessage({ ok: false, text: result.error || "Not saved. Please try again." });
        return;
      }
      setMessage({ ok: true, text: "✓ Saved. The website shows it in a few seconds." });
      router.refresh();
    } catch {
      setMessage({ ok: false, text: "No internet. Please try again." });
    } finally {
      setBusy(false);
    }
  };

  const local = (e164) => e164.replace(/^\+971/, "0");

  return (
    <form className="a-form" onSubmit={save}>
      <label className="a-field">
        <span>📞 Phone (for calls)</span>
        <input name="phone" type="tel" defaultValue={local(business.phone)} required maxLength={20} />
      </label>
      <label className="a-field">
        <span>💬 WhatsApp number</span>
        <input name="whatsapp" type="tel" defaultValue={local(`+${business.whatsapp}`)} required maxLength={20} />
      </label>
      <label className="a-field">
        <span>✉️ Main email</span>
        <input name="email" type="email" defaultValue={business.email} required maxLength={120} />
      </label>
      <label className="a-field">
        <span>✉️ Sales email</span>
        <input name="salesEmail" type="email" defaultValue={business.salesEmail} maxLength={120} />
      </label>
      <label className="a-field a-field--wide">
        <span>📍 Address (English)</span>
        <textarea name="addressEn" defaultValue={business.address.en} required maxLength={200} rows={2} />
      </label>
      <label className="a-field a-field--wide">
        <span>📍 Address (Arabic)</span>
        <textarea name="addressAr" defaultValue={business.address.ar} maxLength={200} rows={2} dir="rtl" />
      </label>
      <label className="a-field a-field--wide">
        <span>🕒 Opening hours (English)</span>
        <input name="hoursEn" defaultValue={business.hours.en} required maxLength={120} />
      </label>
      <label className="a-field a-field--wide">
        <span>🕒 Opening hours (Arabic)</span>
        <input name="hoursAr" defaultValue={business.hours.ar} maxLength={120} dir="rtl" />
      </label>
      <div className="a-form__end">
        <button className="a-big-btn a-big-btn--save" type="submit" disabled={busy}>{busy ? "Saving…" : "Save"}</button>
        {message && <p className={`a-msg ${message.ok ? "a-msg--ok" : "a-msg--error"}`} role="status">{message.text}</p>}
      </div>
    </form>
  );
}
