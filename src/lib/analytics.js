// Conversion events for Google Analytics 4 (6 Nov 2026). See docs/conversion-measurement.md.
//
// Rules:
//   - Nothing is sent unless the visitor has accepted analytics cookies (GA itself only loads
//     after Accept, see the [lang] layout). Events from before consent are dropped, not queued.
//   - Only non-personal context: never a name, phone number, email or free-text message.
//   - generate_lead is sent only after /api/contact confirms the enquiry was received.
//     WhatsApp and phone clicks are interactions, not leads, and have their own events.
import { CONSENT_COOKIE } from "./consent";

const ALLOWED_PARAMS = new Set(["service", "emirate", "page_type", "cta_location", "cta", "form_type", "error_type", "lang", "estimate_mode"]);

function consented() {
  return typeof document !== "undefined" && new RegExp(`(?:^|; )${CONSENT_COOKIE}=granted`).test(document.cookie);
}

// "home", "service", "project", "pricing", "contact", "media", "product" or "other".
export function pageType(pathname = typeof window !== "undefined" ? window.location.pathname : "/") {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] === "en" || parts[0] === "ar") parts.shift();
  if (parts.length === 0) return "home";
  const first = parts[0];
  if (["our-projects", "pricing", "contact", "media", "products"].includes(first)) {
    return { "our-projects": "project", products: "product" }[first] || first;
  }
  if (first === "our-services") return "services";
  return parts.length === 2 ? "service" : "other";
}

export function track(event, params = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function" || !consented()) return;
  const clean = { page_type: pageType(), lang: document.documentElement.lang || undefined };
  for (const [key, value] of Object.entries(params)) {
    if (ALLOWED_PARAMS.has(key) && value !== undefined && value !== null && value !== "") clean[key] = String(value).slice(0, 100);
  }
  window.gtag("event", event, clean);
}
