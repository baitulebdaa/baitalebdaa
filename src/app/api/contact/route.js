import { saveLead } from "../../../lib/admin/leads";
import { clientIp, isAllowedCv, isHoneypotFilled, isSameOrigin, rateLimitedResponse, takeRateLimit, HONEYPOT_FIELD, RATE_LIMITS } from "../../../lib/request-guard";

// Every error carries a stable `code`; the forms turn it into an English or Arabic message
// (dict.apiErrors), so visitors never see a raw English server string on an Arabic page.
const fail = (code, error, status) => Response.json({ success: false, code, error }, { status });

const RESEND_API_URL = "https://api.resend.com/emails";
const MAX_FIELDS = 30;
const MAX_FIELD_LENGTH = 5_000;

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isValidEmail(value) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// Renders arbitrary label/value pairs into a simple HTML table — used for both the
// quote modal and the multi-type contact form so this route doesn't need a rigid
// per-form schema.
function renderFieldsHtml(fields) {
  return Object.entries(fields)
    .filter(([, value]) => value !== undefined && value !== null && String(value).trim() !== "")
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px;font-weight:600;color:#11110f;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td><td style="padding:6px 12px;color:#333;">${escapeHtml(value)}</td></tr>`
    )
    .join("");
}

export async function POST(request) {
  if (!isSameOrigin(request)) {
    return fail("forbidden", "Forbidden.", 403);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    return fail("unavailable", "Email sending is not configured.", 500);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return fail("invalid", "Invalid request body.", 400);
  }

  const { formType, name, email, fields, attachments } = body || {};

  // Bots that fill the hidden honeypot get a normal-looking success and no email is sent.
  if (isHoneypotFilled(body?.[HONEYPOT_FIELD])) {
    return Response.json({ success: true });
  }

  // Newsletter and enquiry forms have separate buckets, so one never blocks the other.
  const bucket = formType === "newsletter" ? "newsletter" : "contactForm";
  const limitKey = `${bucket}:${clientIp(request)}`;
  if (!takeRateLimit(limitKey, RATE_LIMITS[bucket])) {
    return rateLimitedResponse(limitKey, RATE_LIMITS[bucket], { success: false });
  }

  if (!fields || typeof fields !== "object" || Array.isArray(fields)) {
    return fail("invalid", "Missing form fields.", 400);
  }
  const fieldEntries = Object.entries(fields);
  if (fieldEntries.length > MAX_FIELDS || fieldEntries.some(([key, value]) => key.length > 100 || String(value ?? "").length > MAX_FIELD_LENGTH)) {
    return fail("too_long", "The form is too long.", 400);
  }

  // The newsletter signup only collects an email address, so it skips the name check
  // every other form goes through.
  if (formType === "newsletter") {
    if (!isValidEmail(email)) {
      return fail("invalid_email", "A valid email is required.", 400);
    }
  } else if (!name || typeof name !== "string" || !isValidEmail(email)) {
    return fail("invalid_email", "A valid name and email are required.", 400);
  }

  const subjectLabel =
    {
      quote: "Free Quote Request",
      project: "Project Enquiry",
      procurement: "Procurement Enquiry",
      careers: "Careers Application",
      newsletter: "Newsletter Signup",
    }[formType] || "Website Enquiry";

  // Only pass through well-formed, size-capped attachments (~7MB base64 ≈ 5MB file) that
  // really are PDF/DOC/DOCX files — used for the Careers form's CV upload.
  const MAX_ATTACHMENT_BASE64_CHARS = 7 * 1024 * 1024;
  const safeAttachments = Array.isArray(attachments)
    ? attachments
        .filter(
          (a) =>
            a &&
            typeof a.filename === "string" &&
            a.filename.length < 200 &&
            typeof a.content === "string" &&
            a.content.length > 0 &&
            a.content.length < MAX_ATTACHMENT_BASE64_CHARS &&
            isAllowedCv(a.filename, a.content)
        )
        .slice(0, 1)
        .map((a) => ({ filename: a.filename.replace(/[^\w.\- ]+/g, "_"), content: a.content }))
    : [];
  if (Array.isArray(attachments) && attachments.length > 0 && safeAttachments.length === 0) {
    return fail("invalid_cv", "Please upload your CV as a PDF, DOC or DOCX file.", 400);
  }

  const html = `
    <div style="font-family:sans-serif;max-width:560px;">
      <h2 style="margin-bottom:4px;">New ${escapeHtml(subjectLabel)}</h2>
      <p style="color:#666;margin-top:0;">Submitted from www.baitalebdaa.com</p>
      <table style="border-collapse:collapse;width:100%;">${renderFieldsHtml(fields)}</table>
    </div>
  `;

  try {
    const resendResponse = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Bait Al Ebdaa Website <${fromEmail}>`,
        to: [toEmail],
        reply_to: email,
        subject: `${subjectLabel} — ${name || email}`,
        html,
        ...(safeAttachments.length > 0 ? { attachments: safeAttachments } : {}),
      }),
    });

    if (!resendResponse.ok) {
      const errorBody = await resendResponse.text();
      console.error("Resend API error:", resendResponse.status, errorBody);
      return fail("unavailable", "Failed to send message.", 502);
    }

    // Enquiries also go to the admin panel's inbox (src/app/admin). Newsletter sign-ups
    // and job applications are not leads.
    if (formType !== "newsletter" && formType !== "careers") {
      await saveLead({ source: "website", formType: formType || "general", name, email, fields });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("Contact form submission failed:", err);
    return fail("unavailable", "Failed to send message.", 500);
  }
}
