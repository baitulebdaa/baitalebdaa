// The admin's own details (Settings → My account): the name lives on the Firebase account,
// the phone and address in Firestore adminProfiles/{uid}. Only shown inside the panel.
import { FieldValue } from "firebase-admin/firestore";
import { adminAuth, adminDb } from "./firebase";
import { isPreview } from "./preview";

export const PROFILE_LIMITS = { name: 80, phone: 30, address: 300 };

export async function getAdminProfile(uid) {
  if (isPreview()) return { phone: "", address: "" };
  const doc = await adminDb().collection("adminProfiles").doc(uid).get();
  return { phone: (doc.exists && doc.get("phone")) || "", address: (doc.exists && doc.get("address")) || "" };
}

export async function saveAdminProfile(uid, { name, phone, address }) {
  await adminAuth().updateUser(uid, { displayName: name });
  await adminDb()
    .collection("adminProfiles")
    .doc(uid)
    .set({ phone: phone || null, address: address || null, updatedAt: FieldValue.serverTimestamp() }, { merge: true });
}
