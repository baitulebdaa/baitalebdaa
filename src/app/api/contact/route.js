const RESEND_API_URL = "https://api.resend.com/emails";

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
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    return Response.json({ success: false, error: "Email sending is not configured." }, { status: 500 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ success: false, error: "Invalid request body." }, { status: 400 });
  }

  const { formType, name, email, fields, attachments } = body || {};

  if (!fields || typeof fields !== "object") {
    return Response.json({ success: false, error: "Missing form fields." }, { status: 400 });
  }

  if (!name || typeof name !== "string" || !isValidEmail(email)) {
    return Response.json({ success: false, error: "A valid name and email are required." }, { status: 400 });
  }

  const subjectLabel =
    { quote: "Free Quote Request", project: "Project Enquiry", procurement: "Procurement Enquiry", careers: "Careers Application" }[
      formType
    ] || "Website Enquiry";

  // Only pass through well-formed, size-capped attachments (~7MB base64 ≈ 5MB file) —
  // used for the Careers form's CV upload.
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
            a.content.length < MAX_ATTACHMENT_BASE64_CHARS
        )
        .slice(0, 1)
        .map((a) => ({ filename: a.filename, content: a.content }))
    : [];

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
        subject: `${subjectLabel} — ${name}`,
        html,
        ...(safeAttachments.length > 0 ? { attachments: safeAttachments } : {}),
      }),
    });

    if (!resendResponse.ok) {
      const errorBody = await resendResponse.text();
      console.error("Resend API error:", resendResponse.status, errorBody);
      return Response.json({ success: false, error: "Failed to send message." }, { status: 502 });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("Contact form submission failed:", err);
    return Response.json({ success: false, error: "Failed to send message." }, { status: 500 });
  }
}
