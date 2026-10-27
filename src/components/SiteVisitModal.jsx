"use client";

import { useEffect, useState } from "react";
import { X } from "./icons";
import { useI18n } from "../i18n/I18nProvider";
import { Honeypot, honeypotValue } from "./Shared";
import { HONEYPOT_FIELD } from "../lib/request-guard";
import { apiErrorMessage, readJson } from "../lib/api-errors";
import { useAccountPrefill } from "./useAccountPrefill";

// Today in Dubai as YYYY-MM-DD, the earliest day that can be picked.
const dubaiToday = () => new Date(Date.now() + 4 * 3600000).toISOString().slice(0, 10);

/**
 * "Book a free site visit" (owner, 27 Oct 2026): where, which day and time of day, sent to
 * the team (Firestore + email) as a request. It is not a booking: the team calls to confirm
 * the time, then marks "Visit booked" in the admin panel. Signed-in customers get their
 * details filled in. `size` comes from the cost estimator, when opened from there.
 */
export function SiteVisitModal({ open, onClose, size }) {
  const { lang, dict } = useI18n();
  const t = dict.siteVisit;
  const emirates = dict.quoteModal.locationOptions;
  const me = useAccountPrefill(open);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (event) => event.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const submit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const fields = {
      name: data.get("name"),
      email: data.get("email") || undefined,
      phone: data.get("phone"),
      service: "Free site visit",
      location: data.get("emirate"),
      Address: data.get("address") || undefined,
      Property: data.get("property"),
      "Preferred day": data.get("day"),
      "Preferred time": data.get("time"),
      description: data.get("notes") || undefined,
      ...(size ? { Size: `${Number(size).toLocaleString("en-US")} sqft` } : {}),
    };
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "siteVisit", name: fields.name, email: fields.email || "", fields, [HONEYPOT_FIELD]: honeypotValue(form) }),
      });
      const result = await readJson(res);
      if (!res.ok || !result.success) {
        setError(apiErrorMessage(dict, result.code, dict.quoteModal.error));
        return;
      }
      setSent(true);
      form.reset();
    } catch {
      setError(dict.quoteModal.error);
    } finally {
      setSending(false);
    }
  };

  const close = () => {
    setSent(false);
    setError("");
    onClose();
  };

  return (
    <div className={`quote-modal-overlay ${open ? "is-open" : ""}`} aria-hidden={!open} onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
      <div className="quote-modal-panel" role="dialog" aria-modal="true" aria-labelledby="site-visit-title">
        <div className="quote-modal-header">
          <div>
            <h2 id="site-visit-title">{t.title}</h2>
            <p className="quote-modal-subtitle">{t.subtitle}</p>
            <p className="site-visit-free">{t.free}</p>
          </div>
          <button type="button" className="quote-modal-close" onClick={close} aria-label={lang === "ar" ? "إغلاق" : "Close"}><X size={20} /></button>
        </div>

        {sent ? (
          <div className="site-visit-done" role="status">
            <span aria-hidden="true">✓</span>
            <p>{t.success}</p>
            <button type="button" className="submit-button" onClick={close}>{lang === "ar" ? "تم" : "Done"}</button>
          </div>
        ) : (
          <form className="quote-modal-form" method="post" onSubmit={submit} key={me ? "account" : "guest"}>
            <Honeypot />
            <label className="quote-modal-field">
              <span>{t.name} *</span>
              <input name="name" required maxLength={80} autoComplete="name" defaultValue={me?.name || ""} />
            </label>
            <label className="quote-modal-field">
              <span>{t.phone} *</span>
              <input type="tel" name="phone" required maxLength={20} autoComplete="tel" defaultValue={me?.phone || "+971"} />
            </label>
            <label className="quote-modal-field">
              <span>{t.email}</span>
              <input type="email" name="email" maxLength={120} autoComplete="email" defaultValue={me?.email || ""} />
            </label>
            <label className="quote-modal-field">
              <span>{t.emirate} *</span>
              <select name="emirate" required defaultValue={emirates[0]}>
                {emirates.map((name) => <option key={name}>{name}</option>)}
              </select>
            </label>
            <label className="quote-modal-field">
              <span>{t.address}</span>
              <input name="address" maxLength={300} placeholder={t.addressPlaceholder} defaultValue={me?.address || ""} />
            </label>
            {me && <p className="quote-modal-prefilled">✓ {dict.accountPage.prefilled}</p>}

            <fieldset className="site-visit-choices">
              <legend>{t.property} *</legend>
              {t.properties.map((label, i) => (
                <label key={label} className="site-visit-chip">
                  <input type="radio" name="property" value={label} required defaultChecked={i === 0} />
                  <span>{label}</span>
                </label>
              ))}
            </fieldset>

            <label className="quote-modal-field">
              <span>{t.day} *</span>
              <input type="date" name="day" required min={dubaiToday()} />
            </label>
            <fieldset className="site-visit-choices">
              <legend>{t.time} *</legend>
              {t.times.map((label, i) => (
                <label key={label} className="site-visit-chip">
                  <input type="radio" name="time" value={label} required defaultChecked={i === 0} />
                  <span>{label}</span>
                </label>
              ))}
            </fieldset>

            {size && <p className="site-visit-size">{t.size}: {Number(size).toLocaleString(lang === "ar" ? "ar-AE" : "en-US")} sqft</p>}

            <label className="quote-modal-field">
              <span>{t.notes}</span>
              <textarea name="notes" rows="3" maxLength={300} placeholder={t.notesPlaceholder} />
            </label>

            <button type="submit" className="submit-button quote-modal-submit" disabled={sending}>
              {sending ? t.sending : t.send}
            </button>
            {error && <p className="quote-modal-error" role="status">{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
}
