"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, X } from "./icons";
import { useBusiness, useI18n } from "../i18n/I18nProvider";
import { sliderFillPosition } from "../lib/slider";
import { Honeypot, honeypotValue } from "./Shared";
import { HONEYPOT_FIELD } from "../lib/request-guard";
import { apiErrorMessage, readJson } from "../lib/api-errors";
import { useAccountPrefill } from "./useAccountPrefill";

// initialSize lets the homepage estimator hand its selected size straight into this
// modal (see Estimator's onBookSurvey) instead of the two duplicating a lead form.
export function QuoteModal({ open, onClose, initialSize }) {
  const { lang, dict } = useI18n();
  const business = useBusiness();
  const t = dict.quoteModal;
  // Signed-in customers get their details filled in (owner, 27 Oct 2026).
  const me = useAccountPrefill(open);

  const [size, setSize] = useState(initialSize || 3500);
  const [service, setService] = useState(0);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open && initialSize) setSize(initialSize);
    return () => { document.body.style.overflow = ""; };
  }, [open, initialSize]);

  const sizeFillPos = sliderFillPosition(size, 500, 15000);

  const submit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const fields = {
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      address: data.get("address") || undefined,
      propertySize: `${size.toLocaleString()} sqft`,
      serviceType: t.serviceOptions[service],
      location: data.get("location"),
      description: data.get("description"),
    };

    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "quote", name: fields.name, email: fields.email, fields, [HONEYPOT_FIELD]: honeypotValue(form) }),
      });
      const result = await readJson(res);
      if (!res.ok || !result.success) {
        setError(apiErrorMessage(dict, result.code, t.error || "Something went wrong. Please try WhatsApp instead."));
        return;
      }

      setSent(true);
      form.reset();
      setDesc("");
      window.setTimeout(() => { setSent(false); onClose(); }, 2500);
    } catch {
      setError(t.error || "Something went wrong. Please try WhatsApp instead.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className={`quote-modal-overlay ${open ? "is-open" : ""}`} aria-hidden={!open} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="quote-modal-panel" role="dialog" aria-modal="true" aria-labelledby="quote-modal-title">
        <div className="quote-modal-header">
          <div>
            <h2 id="quote-modal-title">{t.title}</h2>
            <p className="quote-modal-subtitle">{t.subtitle}</p>
          </div>
          <button type="button" className="quote-modal-close" onClick={onClose} aria-label={lang === "ar" ? "إغلاق" : "Close"}><X size={20} /></button>
        </div>

        <form className="quote-modal-form" method="post" onSubmit={submit} key={me ? "account" : "guest"}>
          <Honeypot />
          <label className="quote-modal-field">
            <span>{t.fullName} *</span>
            <input name="name" required placeholder={t.fullNamePlaceholder} defaultValue={me?.name || ""} />
          </label>

          <label className="quote-modal-field">
            <span>{t.email} *</span>
            <input type="email" name="email" required placeholder={t.emailPlaceholder} defaultValue={me?.email || ""} />
          </label>

          <label className="quote-modal-field">
            <span>{t.phone} *</span>
            <input type="tel" name="phone" required defaultValue={me?.phone || "+971"} />
          </label>

          {me && (
            <label className="quote-modal-field">
              <span>{dict.accountPage.address}</span>
              <input name="address" defaultValue={me.address} placeholder={dict.accountPage.addressPlaceholder} maxLength={300} />
            </label>
          )}
          {me && <p className="quote-modal-prefilled">✓ {dict.accountPage.prefilled}</p>}

          <div className="quote-modal-field">
            <div className="estimator-label-row">
              <span>{t.propertySize}</span>
              <div className="estimator-value-badge">{size.toLocaleString()} sqft</div>
            </div>
            <input
              type="range"
              min="500"
              max="15000"
              step="100"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="estimator-slider"
              aria-label={t.propertySize}
              style={{ background: `linear-gradient(to ${lang === "ar" ? "left" : "right"}, #000 ${sizeFillPos}, rgba(0,0,0,.12) ${sizeFillPos})` }}
            />
            <div className="estimator-slider-ticks">
              <span>500 sqft</span>
              <span>15,000 sqft</span>
            </div>
          </div>

          <div className="quote-modal-field">
            <span>{t.serviceType} *</span>
            <div className="quote-modal-service-grid">
              {t.serviceOptions.map((opt, i) => (
                <label key={i} className={`quote-modal-service-card ${service === i ? "is-active" : ""}`}>
                  <input type="radio" name="serviceType" checked={service === i} onChange={() => setService(i)} required />
                  {opt}
                </label>
              ))}
            </div>
          </div>

          <label className="quote-modal-field">
            <span>{t.locationLabel} *</span>
            <select name="location" defaultValue={t.locationOptions[0]} required>
              {t.locationOptions.map((loc) => <option key={loc}>{loc}</option>)}
            </select>
          </label>

          <label className="quote-modal-field">
            <span>{t.descriptionLabel}</span>
            <textarea
              name="description"
              rows="3"
              maxLength={300}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder={t.descriptionPlaceholder}
            />
            <span className="quote-modal-char-count">{desc.length}/300</span>
          </label>

          <button type="submit" className="submit-button quote-modal-submit" disabled={sending}>
            {sending ? t.sending || "Sending..." : t.submit}
          </button>
          <a
            href={`https://wa.me/${business.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="outline-button quote-modal-whatsapp"
          >
            {t.whatsappCta} <ArrowUpRight size={15} />
          </a>

          {error && <p className="quote-modal-error" role="status">{error}</p>}
          <p className={`form-success ${sent ? "is-visible" : ""}`}>{t.success}</p>
        </form>
      </div>
    </div>
  );
}
