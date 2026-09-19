"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Star, X } from "lucide-react";
import { useI18n } from "../i18n/I18nProvider";

export function QuoteModal({ open, onClose }) {
  const { dict } = useI18n();
  const t = dict.quoteModal;

  const [size, setSize] = useState(3500);
  const [service, setService] = useState(0);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const sizeFraction = (size - 500) / (15000 - 500);
  const sizeFillPos = `calc(${sizeFraction} * (100% - 20px) + 10px)`;

  const submit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const fields = {
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
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
        body: JSON.stringify({ formType: "quote", name: fields.name, email: fields.email, fields }),
      });
      const result = await res.json();
      if (!res.ok || !result.success) throw new Error(result.error || "Failed to send");

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
          <button type="button" className="quote-modal-close" onClick={onClose} aria-label="Close"><X size={20} /></button>
        </div>

        <div className="quote-modal-rating">
          <div className="quote-modal-rating-identity">
            <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
            </svg>
            <div className="quote-modal-rating-copy">
              <span className="quote-modal-rating-label">{t.ratingLabel}</span>
              <span className="quote-modal-rating-value">{t.reviewsText}</span>
            </div>
          </div>
          <div className="quote-modal-stars" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
          </div>
        </div>

        <form className="quote-modal-form" method="post" onSubmit={submit}>
          <label className="quote-modal-field">
            <span>{t.fullName} *</span>
            <input name="name" required placeholder={t.fullNamePlaceholder} />
          </label>

          <label className="quote-modal-field">
            <span>{t.email} *</span>
            <input type="email" name="email" required placeholder={t.emailPlaceholder} />
          </label>

          <label className="quote-modal-field">
            <span>{t.phone} *</span>
            <input type="tel" name="phone" required defaultValue="+971" />
          </label>

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
              style={{ background: `linear-gradient(to right, #000 ${sizeFillPos}, rgba(0,0,0,.12) ${sizeFillPos})` }}
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
            href="https://wa.me/971524621919"
            target="_blank"
            rel="noopener noreferrer"
            className="outline-button quote-modal-whatsapp"
          >
            {t.whatsappCta} <ArrowUpRight size={15} />
          </a>

          {error && <p className="quote-modal-error">{error}</p>}
          <p className={`form-success ${sent ? "is-visible" : ""}`}>{t.success}</p>
        </form>
      </div>
    </div>
  );
}
