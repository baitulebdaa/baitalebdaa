// Leads for the admin panel, from two Firestore collections:
//   leads     website forms and Ask Ali quotes, written by saveLead() below
//   requests  consultation requests from the mobile app (baitalebdaa_app)
// Both are read here into one shape, so the panel lists them side by side. The status
// values are the app's own (RequestStatus), so a status set here shows in the app.
import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { serviceCatalog } from "../../data/service-catalog";
import { adminDb, isFirestoreConfigured } from "./firebase";
import { SOURCES, STATUSES, statusInfo } from "./statuses";

export { SOURCES, STATUSES, statusInfo };

const STATUS_IDS = new Set(STATUSES.map((status) => status.id));

const FORM_LABELS = {
  quote: "Quote form",
  project: "Project enquiry",
  procurement: "Procurement enquiry",
  general: "Contact form",
};

const EMIRATES = {
  dubai: "Dubai",
  "abu-dhabi": "Abu Dhabi",
  sharjah: "Sharjah",
  ajman: "Ajman",
  "ras-al-khaimah": "Ras Al Khaimah",
  fujairah: "Fujairah",
  "umm-al-quwain": "Umm Al Quwain",
};

const CONSULTATION = { phone: "Phone call", whatsapp: "WhatsApp", siteSurvey: "Site survey", factoryVisit: "Factory visit" };

const serviceLabel = (slug) =>
  slug === "not-sure" ? "Not sure yet" : serviceCatalog.find((service) => service.slug === slug)?.en || slug;

const toIso = (value) => (value instanceof Timestamp ? value.toDate().toISOString() : value || null);

// ---- Writing ------------------------------------------------------------------------

function pick(fields, names) {
  for (const [key, value] of Object.entries(fields || {})) {
    if (names.includes(key.toLowerCase()) && String(value ?? "").trim()) return String(value).trim().slice(0, 500);
  }
  return null;
}

/**
 * Saves a website or Ask Ali enquiry so it appears in the panel. Returns whether it was
 * saved; a missing key or a Firestore error is logged, never thrown.
 */
export async function saveLead({ source, formType = null, name, email, fields = {}, locale = null }) {
  if (!isFirestoreConfigured()) return false;
  try {
    const clean = Object.fromEntries(
      Object.entries(fields)
        .filter(([, value]) => value !== undefined && value !== null && String(value).trim() !== "")
        .slice(0, 30)
        .map(([key, value]) => [String(key).slice(0, 100), String(value).slice(0, 5000)])
    );
    await adminDb()
      .collection("leads")
      .add({
        source,
        formType,
        name: String(name || "").slice(0, 120) || null,
        // Lower case, so a customer signed in on the website finds their enquiries.
        email: String(email || "").trim().toLowerCase().slice(0, 254) || null,
        phone: pick(clean, ["phone", "company phone"]),
        service: pick(clean, ["servicetype", "service", "interested service", "applying for"]),
        location: pick(clean, ["location", "city", "region"]),
        message: pick(clean, ["description", "message"]),
        fields: clean,
        locale,
        status: "submitted",
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      });
    return true;
  } catch (error) {
    console.error("Saving the lead to Firestore failed:", error);
    return false;
  }
}

// ---- Reading ------------------------------------------------------------------------

export function fromLead(doc) {
  const d = doc.data();
  return {
    key: `lead/${doc.id}`,
    kind: "lead",
    id: doc.id,
    source: d.source === "askAli" ? "askAli" : "website",
    channel: d.source === "askAli" ? SOURCES.askAli : FORM_LABELS[d.formType] || SOURCES.website,
    reference: null,
    name: d.name || d.email || "Unnamed",
    email: d.email || null,
    phone: d.phone || null,
    service: d.service || null,
    location: d.location || null,
    message: d.message || null,
    status: STATUS_IDS.has(d.status) ? d.status : "submitted",
    createdAt: toIso(d.createdAt),
    updatedAt: toIso(d.updatedAt),
    visitAt: toIso(d.visitAt),
    preferred: null,
    details: Object.entries(d.fields || {}),
  };
}

export function fromRequest(doc) {
  const d = doc.data();
  const contact = d.contact || {};
  const services = (d.serviceIds || []).map(serviceLabel);
  const preferred = [
    d.consultationType && CONSULTATION[d.consultationType],
    d.timeFlexible ? "Flexible on time" : [d.preferredDate, d.preferredWindow].filter(Boolean).join(", "),
  ]
    .filter(Boolean)
    .join(" · ");
  return {
    key: `request/${doc.id}`,
    kind: "request",
    id: doc.id,
    source: "app",
    channel: SOURCES.app,
    reference: d.reference || null,
    name: contact.name || "Unnamed",
    email: contact.email || null,
    phone: contact.phone || null,
    service: services.join(", ") || null,
    location: [d.area, EMIRATES[d.emirateId] || d.emirateId].filter(Boolean).join(", ") || null,
    message: d.note || null,
    status: STATUS_IDS.has(d.status) ? d.status : "submitted",
    createdAt: toIso(d.createdAt),
    updatedAt: toIso(d.updatedAt),
    visitAt: toIso(d.visitAt),
    preferred: preferred || null,
    details: [
      ["Reference", d.reference],
      ["Property", d.propertyType],
      ["Size", d.size ? `${d.size.value} ${d.size.unit}` : null],
      ["Stage", d.stage],
      ["Budget", d.budgetAed ? `AED ${Number(d.budgetAed).toLocaleString("en-US")}` : "To discuss"],
      ["Language", d.locale],
      ["Phone type", d.platform],
    ].filter(([, value]) => value),
  };
}

const byNewest = (a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || ""));

/** Up to `limit` of the newest leads from both collections, newest first. */
export async function listLeads({ limit = 500 } = {}) {
  const db = adminDb();
  const [leads, requests] = await Promise.all([
    db.collection("leads").orderBy("createdAt", "desc").limit(limit).get(),
    db.collection("requests").orderBy("createdAt", "desc").limit(limit).get(),
  ]);
  return [...leads.docs.map(fromLead), ...requests.docs.map(fromRequest)].sort(byNewest).slice(0, limit);
}

const collectionFor = (kind) => (kind === "request" ? "requests" : kind === "lead" ? "leads" : null);

export async function getLead(kind, id) {
  const collection = collectionFor(kind);
  if (!collection || !/^[A-Za-z0-9_-]{1,64}$/.test(id)) return null;
  const doc = await adminDb().collection(collection).doc(id).get();
  if (!doc.exists) return null;
  return kind === "request" ? fromRequest(doc) : fromLead(doc);
}

/**
 * Sets a lead's status, and the site-visit time when booking one. Returns the updated
 * lead, or null when it does not exist or the input is not valid.
 */
export async function updateLeadStatus(kind, id, { status, visitAt }, admin) {
  const collection = collectionFor(kind);
  if (!collection || !STATUS_IDS.has(status) || !/^[A-Za-z0-9_-]{1,64}$/.test(id)) return null;
  const ref = adminDb().collection(collection).doc(id);
  const doc = await ref.get();
  if (!doc.exists) return null;
  const visit = visitAt ? new Date(visitAt) : null;
  if (visit && Number.isNaN(visit.getTime())) return null;
  await ref.update({
    status,
    updatedAt: FieldValue.serverTimestamp(),
    visitAt: status === "scheduled" && visit ? Timestamp.fromDate(visit) : status === "scheduled" ? doc.get("visitAt") ?? null : null,
  });
  const lead = kind === "request" ? fromRequest(doc) : fromLead(doc);
  await adminDb()
    .collection("adminActivity")
    .add({
      type: "status",
      leadKey: `${kind}/${id}`,
      text: `${lead.name}: ${statusInfo(lead.status).label} → ${statusInfo(status).label}`,
      by: admin.email,
      at: FieldValue.serverTimestamp(),
    });
  return getLead(kind, id);
}

/** The newest status changes made in the panel. */
export async function listActivity({ limit = 10 } = {}) {
  const snapshot = await adminDb().collection("adminActivity").orderBy("at", "desc").limit(limit).get();
  return snapshot.docs.map((doc) => {
    const d = doc.data();
    return { id: doc.id, type: d.type, text: d.text, by: d.by, at: toIso(d.at), leadKey: d.leadKey };
  });
}
