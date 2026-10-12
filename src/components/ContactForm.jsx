"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight, Check, Paperclip } from "./icons";
import { useI18n } from "../i18n/I18nProvider";
import { Honeypot, Reveal } from "./Shared";
import { HONEYPOT_FIELD } from "../lib/request-guard";
import { apiErrorMessage, readJson } from "../lib/api-errors";

const WHATSAPP_NUMBER = "971582621717";

const FIELD_LABELS = {
  name: "Full Name",
  email: "Email",
  phone: "Phone",
  jobTitle: "Job Title",
  country: "Country",
  location: "Location",
  applyingFor: "Applying For",
  linkedin: "LinkedIn",
  message: "Message",
  companyName: "Company Name",
  companyDomain: "Company Domain",
  companyPhone: "Company Phone",
  companyEmail: "Company Email",
  companyLinkedin: "Company LinkedIn",
  companyAddress: "Company Address",
  companyCity: "City",
  companyRegion: "Region",
  description: "Description",
};

// Visible, programmatically-associated label above each control. Replaces placeholder-only fields,
// which lose their meaning as soon as the visitor starts typing.
function Field({ label, as: Tag = "input", className = "", children, ...props }) {
  return (
    <label className={`ff ${className}`.trim()}>
      <span className="ff__label">{label}</span>
      <Tag {...props}>{children}</Tag>
    </label>
  );
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] || "");
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Shared, Resend-wired contact form, used on the standalone /contact page
// (src/ContactPage.jsx). Wrapped in
// Suspense because useSearchParams() (reading ?service= from a pricing-page
// CTA) requires it in a statically-generated route.
export function ContactForm() {
  return (
    <Suspense fallback={null}>
      <ContactFormBody />
    </Suspense>
  );
}

function ContactFormBody() {
  const { lang, dict } = useI18n();
  const t = dict.contactSection;
  const searchParams = useSearchParams();
  const presetService = searchParams.get("service") || "";
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [type, setType] = useState(t.types[0]); // Default Project Form

  // Track selected type index to conditionally map
  const typeIndex = t.types.indexOf(type) !== -1 ? t.types.indexOf(type) : 1;
  const formTypeKey = ["project", "procurement", "careers"][typeIndex] || "project";

  const waMessage = presetService
    ? (lang === "ar"
        ? `مرحباً! أرغب بالاستفسار عن: ${presetService}.`
        : `Hello! I'd like to enquire about: ${presetService}.`)
    : (lang === "ar" ? "مرحباً! أرغب بالتواصل بخصوص مشروعي." : "Hello! I'd like to get in touch about my project.");
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;

  const submit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const name = data.get("name");
    const email = data.get("email");
    const fields = {};
    for (const [key, value] of data.entries()) {
      if (key === "cv" || key === "formType" || key === HONEYPOT_FIELD || !value) continue;
      fields[FIELD_LABELS[key] || key] = value;
    }
    if (presetService) fields["Interested Service"] = presetService;

    let attachments = [];
    const cvFile = data.get("cv");
    if (cvFile instanceof File && cvFile.size > 0) {
      // Catch a wrong file type or size here, before a slow upload the server would refuse.
      if (!/\.(pdf|docx?)$/i.test(cvFile.name)) {
        setError(dict.apiErrors.invalid_cv);
        return;
      }
      if (cvFile.size > 5 * 1024 * 1024) {
        setError(dict.apiErrors.file_too_large);
        return;
      }
      attachments = [{ filename: cvFile.name, content: await fileToBase64(cvFile) }];
    }

    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: formTypeKey, name, email, fields, attachments, [HONEYPOT_FIELD]: data.get(HONEYPOT_FIELD) || "" }),
      });
      const result = await readJson(res);
      if (!res.ok || !result.success) {
        setError(apiErrorMessage(dict, result.code, t.error || "Something went wrong. Please try again or WhatsApp us."));
        return;
      }

      setSent(true);
      form.reset();
      window.setTimeout(() => setSent(false), 5000);
    } catch {
      setError(t.error || "Something went wrong. Please try again or WhatsApp us.");
    } finally {
      setSending(false);
    }
  };

  return <section className="contact" id="contact"><div className="shell contact__centered"><Reveal as="form" className="project-form" delay={100} method="post" onSubmit={submit}>
    <Honeypot />
    <h2 className="form-main-heading">{t.mainHeading}</h2>
    <h3 className="form-heading">{t.heading}</h3>
    {presetService && (
      <p className="contact-preset-service">
        {lang === "ar" ? "بخصوص: " : "Regarding: "}<strong>{presetService}</strong>
      </p>
    )}
    <div className="project-types" dir="ltr">
      {/* We keep the tabs LTR internally just so the visual ordering doesn't break the rounded corners mapping */}
      {t.types.map((item, i) => <button type="button" key={i} className={type === item ? "is-active" : ""} onClick={() => setType(item)}>{item}</button>)}
    </div>

    {typeIndex === 2 && (
      <>
        <div className="form-row">
          <Field label={t.placeholders.fullName} name="name" autoComplete="name" required />
          <Field label={t.placeholders.email} type="email" name="email" autoComplete="email" required />
        </div>
        <div className="form-row">
          <Field label={t.placeholders.mobile} name="phone" inputMode="tel" autoComplete="tel" required />
          <Field as="select" label={t.placeholders.selectCountry} name="country" defaultValue="" required>
            <option value="" disabled hidden></option>
            {t.countries.map(c => <option key={c} value={c}>{c}</option>)}
          </Field>
        </div>
        <div className="form-row">
          <Field label={t.placeholders.applyingFor} name="applyingFor" required />
          <Field label={t.placeholders.linkedin} name="linkedin" type="url" />
        </div>
        <Field label={t.placeholders.message} as="textarea" name="message" rows="3" required />
        <div className="file-upload-wrapper">
          <label className="file-upload-label">
            <Paperclip size={12} />
            {t.uploadCV}
            <input type="file" name="cv" accept=".pdf,.doc,.docx" required />
          </label>
        </div>
      </>
    )}

    {typeIndex === 1 && (
      <>
        <div className="form-section-header">{t.contactPerson}</div>
        <div className="form-row">
          <Field label={t.placeholders.fullName} name="name" required />
          <Field label={t.placeholders.jobTitle} name="jobTitle" required />
        </div>
        <div className="form-row">
          <Field label={t.placeholders.email} type="email" name="email" required />
          <Field label={t.placeholders.phone} type="tel" name="phone" required />
        </div>
        <div className="form-row">
          <Field as="select" label={t.placeholders.selectCountry} name="country" defaultValue="" required>
            <option value="" disabled hidden></option>
            {t.countries.map(c => <option key={c} value={c}>{c}</option>)}
          </Field>
        </div>

        <div className="form-section-header">{t.companyDetails}</div>
        <div className="form-row form-row--three">
          <Field label={t.placeholders.companyName} name="companyName" required />
          <Field label={t.placeholders.companyDomain} name="companyDomain" />
          <Field label={t.placeholders.companyPhone} name="companyPhone" />
        </div>
        <div className="form-row">
          <Field label={t.placeholders.companyEmail} type="email" name="companyEmail" required />
          <Field label={t.placeholders.companyLinkedin} type="url" name="companyLinkedin" />
        </div>
        <div className="form-row form-row--three">
          <Field label={t.placeholders.companyAddress} name="companyAddress" />
          <Field label={t.placeholders.city} name="companyCity" />
          <Field label={t.placeholders.region} name="companyRegion" />
        </div>
        <Field label={t.placeholders.description} name="description" className="full-width-input" required />
      </>
    )}

    {typeIndex === 0 && (
      <>
        <div className="form-row">
          <Field label={t.placeholders.fullName} name="name" required />
          <Field label={t.placeholders.emailAddress} type="email" name="email" required />
        </div>
        <div className="form-row">
          <Field label={t.placeholders.phoneNumber} name="phone" required />
          <Field as="select" label={dict.quoteModal.locationLabel} name="location" defaultValue={t.locations[0]}>
            {t.locations.map(l => <option key={l}>{l}</option>)}
          </Field>
        </div>
        <Field label={t.placeholders.whatToCreate} as="textarea" name="message" rows="3" required />
      </>
    )}

    <div className="form-submit-wrapper">
      <button className="submit-button submit-button--outline" type="submit" disabled={sending}>{sending ? (t.sending || "Sending...") : t.sendRequest} <ArrowUpRight size={14} /></button>
      <a href={waHref} target="_blank" rel="noopener noreferrer" className="outline-button contact-whatsapp-link">
        {dict.quoteModal.whatsappCta} <ArrowUpRight size={14} />
      </a>
    </div>
    {error && <p className="quote-modal-error" role="status">{error}</p>}
    <p className={`form-success ${sent ? "is-visible" : ""}`} role="status"><Check size={18} /> {t.success}</p>
  </Reveal></div></section>;
}
