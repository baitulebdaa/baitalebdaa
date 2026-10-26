// What a signed-in customer sees of their own data: requests sent from the app (their
// uid) and website enquiries sent with their email, plus the phone on their profile.
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "../admin/firebase";
import { fromLead, fromRequest } from "../admin/leads";

// Only what the customer gave and the status the team set; never internal notes.
const forCustomer = (lead) => ({
  key: lead.key,
  source: lead.source,
  channel: lead.channel,
  reference: lead.reference,
  service: lead.service,
  location: lead.location,
  status: lead.status,
  createdAt: lead.createdAt,
  visitAt: lead.status === "scheduled" ? lead.visitAt : null,
});

export async function customerRequests(customer) {
  const db = adminDb();
  const email = customer.email.trim().toLowerCase();
  const [requests, leads] = await Promise.all([
    db.collection("requests").where("ownerUid", "==", customer.uid).limit(100).get(),
    email ? db.collection("leads").where("email", "==", email).limit(100).get() : Promise.resolve({ docs: [] }),
  ]);
  return [...requests.docs.map(fromRequest), ...leads.docs.map(fromLead)]
    .map(forCustomer)
    .sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")));
}

/** The phone kept on the customer's profile (profiles/{uid}), or "". */
export async function customerPhone(uid) {
  const doc = await adminDb().collection("profiles").doc(uid).get();
  return (doc.exists && doc.get("phone")) || "";
}

export async function saveCustomerPhone(uid, phone) {
  await adminDb()
    .collection("profiles")
    .doc(uid)
    .set({ phone: phone || null, updatedAt: FieldValue.serverTimestamp() }, { merge: true });
}

export async function deleteCustomerProfile(uid) {
  await adminDb().collection("profiles").doc(uid).delete();
}
