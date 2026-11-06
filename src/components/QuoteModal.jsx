"use client";

import { useId, useMemo, useRef, useState } from "react";
import { Check, WhatsappLogo, X } from "./icons";
import { useBusiness, useI18n } from "../i18n/I18nProvider";
import { Honeypot, honeypotValue } from "./Shared";
import { HONEYPOT_FIELD } from "../lib/request-guard";
import { apiErrorMessage, readJson } from "../lib/api-errors";
import { useAccountPrefill } from "./useAccountPrefill";
import { useDialog } from "./useDialog";
import { QUOTE_SERVICES, QUOTE_SERVICE_EN, pageUrl, whatsappHref } from "../lib/enquiry";
import { track } from "../lib/analytics";

const NOT_SURE = "not-sure";

// Splits a stored number (country code, then the local number) into a known code and the rest.
function splitPhone(phone, countries) {
  const value = String(phone || "").trim();
  const match = countries.map(([, code]) => code).sort((a, b) => b.length - a.length).find((code) => value.startsWith(code));
  return match ? { code: match, number: value.slice(match.length).trim() } : { code: countries[0][1], number: value.replace(/^\+/, "") };
}

// "Request a Quote" (6 Nov 2026): the one enquiry form behind every "Request a Quote" button.
// It starts with four questions (name, phone or WhatsApp, service, emirate); everything else
// is optional and folded away. Landing pages preselect their service and the estimator hands
// over its choice, so nobody types what they already picked. Success is shown only once
// /api/contact confirms the enquiry was received; on any failure the details stay in place
// and WhatsApp is offered instead.
//
//   service:      a QUOTE_SERVICES key to preselect (lib/enquiry.js), else "not sure"
//   estimate:     a one-line summary of the estimator's choice and figure, sent with the request
//   measurements: prefills the optional size field (e.g. "measure on the site survey")
//   source:       where the button was (analytics cta_location), e.g. "hero", "estimator"
export function QuoteModal({ open, onClose, service, estimate, measurements, source }) {
  const { lang, dict } = useI18n();
  const business = useBusiness();
  const t = dict.quoteModal;
  const id = useId();
  // Signed-in customers get their details filled in (owner, 27 Oct 2026).
  const me = useAccountPrefill(open);
  const panelRef = useDialog(open, onClose);

  const countries = t.countries;
  const initialPhone = useMemo(() => splitPhone(me?.phone, countries), [me?.phone, countries]);
  const [values, setValues] = useState(null);
  const form = values || {
    name: me?.name || "",
    code: initialPhone.code,
    phone: initialPhone.number,
    service: service && QUOTE_SERVICES.includes(service) ? service : "",
    emirate: "",
    email: me?.email || "",
    budget: "",
    measurements: measurements || "",
    description: "",
  };
  const [moreOpen, setMoreOpen] = useState(Boolean(measurements));
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [serverError, setServerError] = useState("");
  const sendingRef = useRef(false);
  const startedRef = useRef(false);

  const set = (name) => (event) => {
    if (!startedRef.current) {
      startedRef.current = true;
      track("form_start", { form_type: "quote", cta_location: source, service: form.service || undefined });
    }
    setValues({ ...form, [name]: event.target.value });
    if (errors[name]) setErrors({ ...errors, [name]: undefined });
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = t.errors.name;
    if (form.phone.replace(/\D/g, "").length < 7) next.phone = t.errors.phone;
    if (!form.service) next.service = t.errors.service;
    if (!form.emirate) next.emirate = t.errors.emirate;
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = t.errors.email;
    return next;
  };

  const serviceLabel = (key) => t.serviceOptions[key];
  const waText = t.whatsappMessage
    .replace("{service}", form.service && form.service !== NOT_SURE ? serviceLabel(form.service) : t.whatsappAnyService)
    .replace("{page}", pageUrl());
  const waHref = whatsappHref(business.whatsapp, waText);

  const submit = async (event) => {
    event.preventDefault();
    if (sendingRef.current || status === "sent") return;
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      track("form_error", { form_type: "quote", error_type: "validation", service: form.service || undefined });
      if (found.email) setMoreOpen(true);
      const firstInvalid = ["name", "phone", "service", "emirate", "email"].find((key) => found[key]);
      window.requestAnimationFrame(() => document.getElementById(`${id}-${firstInvalid}`)?.focus());
      return;
    }

    const emirate = form.emirate === NOT_SURE ? "Not sure yet" : form.emirate;
    const fields = {
      name: form.name.trim(),
      phone: `${form.code} ${form.phone.trim()}`.trim(),
      serviceType: QUOTE_SERVICE_EN[form.service],
      location: emirate,
      email: form.email.trim() || undefined,
      Budget: form.budget || undefined,
      propertySize: form.measurements.trim() || undefined,
      description: form.description.trim() || undefined,
      Estimate: estimate || undefined,
      Page: typeof window !== "undefined" ? window.location.pathname : undefined,
    };

    sendingRef.current = true;
    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "quote", name: fields.name, email: fields.email || "", fields, [HONEYPOT_FIELD]: honeypotValue(event.currentTarget) }),
      });
      const result = await readJson(res);
      if (!res.ok || !result.success) {
        setServerError(apiErrorMessage(dict, result.code, t.error));
        setStatus("error");
        track("form_error", { form_type: "quote", error_type: `server_${result.code || res.status}`, service: form.service });
        return;
      }
      setStatus("sent");
      // A genuine, received enquiry: the only place generate_lead is sent.
      track("generate_lead", { form_type: "quote", service: form.service, emirate: form.emirate, cta_location: source });
    } catch {
      setServerError(t.error);
      setStatus("error");
      track("form_error", { form_type: "quote", error_type: "network", service: form.service });
    } finally {
      sendingRef.current = false;
    }
  };

  const field = (name) => ({
    id: `${id}-${name}`,
    name,
    value: form[name],
    onChange: set(name),
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${id}-${name}-error` : undefined,
  });
  const fieldError = (name) => errors[name] && <span className="quote-field-error" id={`${id}-${name}-error`}>{errors[name]}</span>;

  return (
    <div className={`quote-modal-overlay ${open ? "is-open" : ""}`} aria-hidden={!open} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="quote-modal-panel" role="dialog" aria-modal="true" aria-labelledby={`${id}-title`} ref={panelRef} tabIndex={-1}>
        <div className="quote-modal-header">
          <div>
            <h2 id={`${id}-title`}>{status === "sent" ? t.successTitle : t.title}</h2>
            {status !== "sent" && <p className="quote-modal-subtitle">{t.subtitle}</p>}
          </div>
          <button type="button" className="quote-modal-close" onClick={onClose} aria-label={t.close}><X size={20} /></button>
        </div>

        {status === "sent" ? (
          <div className="site-visit-done" role="status">
            <span aria-hidden="true"><Check size={28} /></span>
            <p>{t.success}</p>
            <button type="button" className="submit-button" onClick={onClose}>{t.done}</button>
          </div>
        ) : (
          <form className="quote-modal-form quote-form" method="post" onSubmit={submit} noValidate>
            <Honeypot />
            {estimate && (
              <p className="quote-estimate">
                <span>{t.estimateLabel}</span>
                <strong>{estimate}</strong>
              </p>
            )}

            <div className="quote-modal-field">
              <label htmlFor={`${id}-name`}>{t.fullName} <span aria-hidden="true">*</span></label>
              <input {...field("name")} autoComplete="name" maxLength={80} required />
              {fieldError("name")}
            </div>

            <div className="quote-modal-field">
              <label htmlFor={`${id}-phone`}>{t.phone} <span aria-hidden="true">*</span></label>
              <div className="quote-phone">
                <select {...field("code")} aria-label={t.countryCode} autoComplete="tel-country-code">
                  {countries.map(([iso, code, label]) => <option key={iso} value={code}>{`${label} ${code}`}</option>)}
                </select>
                <input {...field("phone")} type="tel" inputMode="tel" autoComplete="tel-national" maxLength={20} required dir="ltr" />
              </div>
              {errors.phone ? fieldError("phone") : <span className="quote-field-hint">{t.phoneHint}</span>}
            </div>

            <div className="quote-modal-field">
              <label htmlFor={`${id}-service`}>{t.serviceType} <span aria-hidden="true">*</span></label>
              <select {...field("service")} required>
                <option value="" disabled>{t.choose}</option>
                {QUOTE_SERVICES.map((key) => <option key={key} value={key}>{serviceLabel(key)}</option>)}
              </select>
              {fieldError("service")}
            </div>

            <div className="quote-modal-field">
              <label htmlFor={`${id}-emirate`}>{t.locationLabel} <span aria-hidden="true">*</span></label>
              <select {...field("emirate")} required>
                <option value="" disabled>{t.choose}</option>
                {t.locationOptions.map((name, i) => <option key={name} value={dict.quoteModal.locationValues?.[i] || name}>{name}</option>)}
                <option value={NOT_SURE}>{t.notSure}</option>
              </select>
              {fieldError("emirate")}
            </div>

            <button type="button" className="quote-more" aria-expanded={moreOpen} aria-controls={`${id}-more`} onClick={() => setMoreOpen(!moreOpen)}>
              {t.moreDetails}
            </button>
            <div id={`${id}-more`} className="quote-more-fields" hidden={!moreOpen}>
              <div className="quote-modal-field">
                <label htmlFor={`${id}-email`}>{t.email}</label>
                <input {...field("email")} type="email" inputMode="email" autoComplete="email" maxLength={120} dir="ltr" />
                {fieldError("email")}
              </div>
              <div className="quote-modal-field">
                <label htmlFor={`${id}-measurements`}>{t.measurementsLabel}</label>
                <input {...field("measurements")} maxLength={200} placeholder={t.measurementsPlaceholder} />
              </div>
              <div className="quote-modal-field">
                <label htmlFor={`${id}-budget`}>{t.budgetLabel}</label>
                <select {...field("budget")}>
                  <option value="">{t.choose}</option>
                  {t.budgetOptions.map((label, i) => <option key={label} value={t.budgetValues[i]}>{label}</option>)}
                </select>
              </div>
              <div className="quote-modal-field">
                <label htmlFor={`${id}-description`}>{t.descriptionLabel}</label>
                <textarea {...field("description")} rows="3" maxLength={500} placeholder={t.descriptionPlaceholder} />
              </div>
            </div>

            <button type="submit" className="submit-button quote-modal-submit" disabled={status === "sending"} aria-busy={status === "sending"}>
              {status === "sending" ? t.sending : t.submit}
            </button>

            <div aria-live="polite">
              {status === "error" && (
                <div className="quote-modal-error" role="alert">
                  <p>{serverError}</p>
                  <a href={waHref} target="_blank" rel="noopener noreferrer" data-cta-location="quote-form-error">
                    <WhatsappLogo size={16} /> {t.whatsappFallback}
                  </a>
                </div>
              )}
            </div>
            {status !== "error" && (
              <a href={waHref} target="_blank" rel="noopener noreferrer" className="outline-button quote-modal-whatsapp" data-cta-location="quote-form">
                <WhatsappLogo size={16} /> {t.whatsappCta}
              </a>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
