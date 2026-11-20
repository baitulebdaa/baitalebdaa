/**
 * Single source of truth for Just Shine Cleaning Services contact details (Abu Dhabi, UAE).
 * Sourced directly from official Google Business Profile & Trustpilot.
 */
export const PHONE_DISPLAY = "+971 55 223 2850";
export const PHONE_E164 = "+971552232850";
export const PHONE_HREF = `tel:${PHONE_E164}`;
export const WHATSAPP_HREF = `https://wa.me/${PHONE_E164.replace("+", "")}`;
export const WHATSAPP_BOOKING_TEXT_EN = "Hello Just Shine! I would like to book a cleaning service in Abu Dhabi. Please share available time slots and prices.";
export const WHATSAPP_BOOKING_TEXT_AR = "مرحباً جاست شاين! أرغب بحجز خدمة تنظيف في أبوظبي. يرجى تزويدي بالمواعيد والأسعار المتاحة.";
export const WHATSAPP_BOOKING_HREF = `${WHATSAPP_HREF}?text=${encodeURIComponent(WHATSAPP_BOOKING_TEXT_EN)}`;
export const WHATSAPP_BOOKING_HREF_AR = `${WHATSAPP_HREF}?text=${encodeURIComponent(WHATSAPP_BOOKING_TEXT_AR)}`;
export const CALL_HREF = PHONE_HREF;
export const CALL_LABEL = PHONE_DISPLAY;
/** Single site-wide email */
export const EMAIL = "info@justshinecleaningservices.com";
export const EMAIL_HREF = `mailto:${EMAIL}`;
export const COMPANY_NAME = "Just Shine Cleaning Services";
/** Trade name exactly as on the Abu Dhabi Economic Licence (sole establishment, not an LLC). */
export const COMPANY_LEGAL_NAME = "Just Shine Cleaning Services";
export const SITE_URL = "https://www.justshinecleaningservices.com";
/** Official Google Business Profile Address */
export const ADDRESS = "Al Jazeera Towers - Al Danah - Zone 1 - Abu Dhabi - United Arab Emirates";
/** Arabic renderings of the same GBP address and hours, for /ar pages. */
export const ADDRESS_AR = "أبراج الجزيرة - الدانة - المنطقة ١ - أبوظبي - الإمارات العربية المتحدة";
export const OPENING_HOURS_RANGE_AR = "٨:٠٠ صباحاً – ١٠:٠٠ مساءً";
export const OPENING_HOURS_DISPLAY_AR = `يومياً: ${OPENING_HOURS_RANGE_AR}`;
export const ADDRESS_STREET = "Al Jazeera Towers, Al Danah, Zone 1";
export const ADDRESS_TOWN = "Abu Dhabi";
export const ADDRESS_POSTCODE = "";
export const ADDRESS_COUNTRY = "United Arab Emirates";
/** Operating Hours & Socials */
export const OPENING_HOURS = "Mo-Su 08:00-22:00";
/** Opening hours as 24h numbers (Abu Dhabi time), for the live open/closed top bar. Keep in step with OPENING_HOURS. */
export const OPEN_HOUR = 8;
export const CLOSE_HOUR = 22;
/** The one time-range format for opening hours (en dash, no leading zero). Use it instead of typing the hours. */
export const OPENING_HOURS_RANGE = "8:00 AM – 10:00 PM";
export const OPENING_HOURS_DISPLAY = `Daily: ${OPENING_HOURS_RANGE}`;
/**
 * No aggregate rating or review count is published. The former "4.7 / 13 reviews"
 * values had no verifiable external source and did not match the public Trustpilot
 * profile. Only reintroduce a number here if the business supplies a verifiable
 * source, and label that source wherever it is displayed. Do not add AggregateRating schema.
 */
// The live page's handle really is spelled "servces" (no "i"), confirmed by the owner on
// 15 Nov 2026. It is not a typo: do not "fix" it, or every Facebook link breaks.
export const FACEBOOK_URL = "https://www.facebook.com/justshinecleaningservces/";
export const INSTAGRAM_URL = "https://www.instagram.com/justshinecleaning";
export const TRUSTPILOT_URL = "https://www.trustpilot.com/review/justshinecleaningservices.com";
/**
 * Twitter (X) and LinkedIn, moved here from the footers. LinkedIn was confirmed by
 * the owner on 16 Nov 2026; the X handle is still unconfirmed, so check with the
 * owner before changing it.
 */
export const TWITTER_URL = "https://x.com/justshinecleaning";
export const LINKEDIN_URL = "https://www.linkedin.com/company/just-shine-cleaning/";
/** The business's verified Google Maps listing (Place ID ChIJpahBLwBnXj4RsGMJoU3ArcA). */
export const GOOGLE_MAPS_URL = "https://maps.google.com/?cid=13883964665899869104";
/** Google Maps rating and review count, copied by hand from the listing above. Update both when they change. */
export const GOOGLE_RATING = 4.6;
export const GOOGLE_REVIEW_COUNT = 19;
/** Opens Google's "write a review" form for the listing. */
export const GOOGLE_REVIEW_URL = "https://search.google.com/local/writereview?placeid=ChIJpahBLwBnXj4RsGMJoU3ArcA";
/**
 * Single source of truth for claims that were previously worded inconsistently
 * across pages (service-area count, hourly rate, and reply-time wording).
 * Update here so every page stays in sync.
 */
// Must equal `areas.length` in lib/areas.ts (and `areasAr.length` in
// lib/areas-ar.ts) — currently 63. It is a literal rather than an import because
// client components import this file and should not bundle the area dataset.
// Use this constant instead of typing the count into copy.
export const SERVICE_AREA_COUNT = 63;
/**
 * Credentials shown as homepage pills. Set at the owner's request (11 Nov 2026);
 * keep them true to the business: null / false hides the pill.
 */
export const FOUNDED_YEAR = 2021;
export const LICENSED_IN_ABU_DHABI = true;
/** Abu Dhabi trade licence number (DED / ADDED); shown as a tooltip when set. */
export const TRADE_LICENCE_NO = "CN-5067242";
/** Unified licence number from the Abu Dhabi Economic Licence (ADRA / Dept. of Economic Development). */
export const UNIFIED_LICENCE_NO = "501-2023-100237974";
export const SERVICE_AREA_CLAIM = `${SERVICE_AREA_COUNT} Abu Dhabi communities`;
/** Hourly maid-service rate: AED 35/hr for 2-hour bookings, AED 30/hr for 4-hour+ bookings. */
/**
 * Date the published prices were last checked against the price tables; shown on
 * service pages as "Prices last checked". Update it whenever prices are reviewed.
 */
export const PRICES_CHECKED = { iso: "2026-11-15", en: "15 November 2026", ar: "١٥ نوفمبر ٢٠٢٦" };
export const HOURLY_RATE_2H = 35;
export const HOURLY_RATE_4H = 30;
export const HOURLY_RATE_FROM = `from AED ${HOURLY_RATE_4H}/hr`;
export const HOURLY_RATE_DETAIL = `AED ${HOURLY_RATE_2H}/hr for a 2-hour booking, AED ${HOURLY_RATE_4H}/hr on 4-hour+ bookings`;
/** WhatsApp/phone reply-time estimate — an estimate, not a guaranteed SLA. */
/** Published prices already include VAT (confirmed by the business, Oct 2026). */
export const VAT_NOTE = "All prices include 5% VAT.";
export const VAT_NOTE_AR = "جميع الأسعار تشمل ضريبة القيمة المضافة ٥٪.";
export const REPLY_TIME_CLAIM = "usually within about 2 hours during opening hours";
