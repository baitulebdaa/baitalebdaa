import { revalidateTag } from "next/cache";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "../../../../lib/admin/firebase";
import { isPreview } from "../../../../lib/admin/preview";
import { currentAdmin } from "../../../../lib/admin/session";
import { BUSINESS_TAG } from "../../../../lib/business";
import { isSameOrigin } from "../../../../lib/request-guard";

const fail = (error, status = 400) => Response.json({ ok: false, error }, { status });
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// A local UAE number ("05X XXX XXXX"), "00971…" or "+971…" → E.164; null if it isn't a number.
function toE164(input) {
  let digits = String(input || "").replace(/[\s\-().]/g, "");
  if (digits.startsWith("00")) digits = `+${digits.slice(2)}`;
  if (digits.startsWith("971")) digits = `+${digits}`;
  if (/^0[1-9]\d{7,8}$/.test(digits)) digits = `+971${digits.slice(1)}`;
  return /^\+[1-9]\d{7,14}$/.test(digits) ? digits : null;
}

// Saves the business details shown across the website (Settings → Business details), then
// clears the site's cached copy so every page shows them within seconds.
export async function PATCH(request) {
  if (!isSameOrigin(request)) return fail("Forbidden.", 403);
  if (isPreview()) return fail("Preview: not saved.");
  const admin = await currentAdmin();
  if (!admin) return fail("Please log in again.", 401);
  const b = await request.json().catch(() => ({}));
  const text = (value, max) => String(value || "").trim().slice(0, max);

  const phone = toE164(b.phone);
  if (!phone) return fail("Phone number is not right. Example: 058 262 1717");
  const whatsapp = toE164(b.whatsapp);
  if (!whatsapp) return fail("WhatsApp number is not right. Example: 058 262 1717");
  const email = text(b.email, 120);
  const salesEmail = text(b.salesEmail, 120);
  if (!EMAIL.test(email)) return fail("Main email is not right.");
  if (salesEmail && !EMAIL.test(salesEmail)) return fail("Sales email is not right.");
  const address = { en: text(b.addressEn, 200), ar: text(b.addressAr, 200) };
  const hours = { en: text(b.hoursEn, 120), ar: text(b.hoursAr, 120) };
  if (!address.en || !hours.en) return fail("Please fill the address and opening hours (English).");

  try {
    await adminDb()
      .collection("settings")
      .doc("business")
      .set({
        phone,
        whatsapp: whatsapp.replace(/\D/g, ""),
        email,
        salesEmail: salesEmail || null,
        address,
        hours,
        updatedAt: FieldValue.serverTimestamp(),
        updatedBy: admin.email,
      });
    revalidateTag(BUSINESS_TAG);
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Saving the business details failed:", error);
    return fail("Not saved. Please try again.", 502);
  }
}
