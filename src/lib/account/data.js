// What a signed-in customer sees of their own data: requests sent from the app (their
// uid), website enquiries sent while signed in or with their email, and the phone and
// address on their profile (which also prefill the website's quote forms).
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
  const [requests, linked, byEmail] = await Promise.all([
    db.collection("requests").where("ownerUid", "==", customer.uid).limit(100).get(),
    db.collection("leads").where("customerUid", "==", customer.uid).limit(100).get(),
    email ? db.collection("leads").where("email", "==", email).limit(100).get() : Promise.resolve({ docs: [] }),
  ]);
  // A quote sent while signed in can match both ways; keep each once.
  const leads = [...new Map([...linked.docs, ...byEmail.docs].map((doc) => [doc.id, doc])).values()];
  return [...requests.docs.map(fromRequest), ...leads.map(fromLead)]
    .map(forCustomer)
    .sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")));
}

/** The phone and address kept on the customer's profile (profiles/{uid}); "" when unset. */
export async function customerProfile(uid) {
  const doc = await adminDb().collection("profiles").doc(uid).get();
  return { phone: (doc.exists && doc.get("phone")) || "", address: (doc.exists && doc.get("address")) || "" };
}

/** The phone on the customer's profile, or "". */
export async function customerPhone(uid) {
  return (await customerProfile(uid)).phone;
}

export async function saveCustomerPhone(uid, phone) {
  await adminDb()
    .collection("profiles")
    .doc(uid)
    .set({ phone: phone || null, updatedAt: FieldValue.serverTimestamp() }, { merge: true });
}

export async function saveCustomerAddress(uid, address) {
  await adminDb()
    .collection("profiles")
    .doc(uid)
    .set({ address: address || null, updatedAt: FieldValue.serverTimestamp() }, { merge: true });
}

export async function deleteCustomerProfile(uid) {
  await adminDb().collection("profiles").doc(uid).delete();
}
