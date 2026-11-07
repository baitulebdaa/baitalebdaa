// Who can log in to the admin panel (owner, 27 Oct 2026: admins can add admins):
//   owners  the emails in the ADMIN_EMAILS setting (Vercel); always admins, can't be removed
//   added   emails added from Settings, kept in Firestore settings/admins
import { FieldValue } from "firebase-admin/firestore";
import { cache } from "react";
import { adminAuth, adminDb, adminEmails, isFirestoreConfigured } from "./firebase";

const ref = () => adminDb().collection("settings").doc("admins");

/** Emails added from the panel (lower case). */
export async function addedAdminEmails() {
  if (!isFirestoreConfigured()) return [];
  const doc = await ref().get();
  const emails = doc.exists ? doc.get("emails") : [];
  return Array.isArray(emails) ? emails.map((e) => String(e).toLowerCase()) : [];
}

/** Owners plus added admins. Read once per request. */
export const allAdminEmails = cache(async () => {
  const added = await addedAdminEmails().catch(() => []);
  return [...new Set([...adminEmails(), ...added])];
});

export const isOwner = (email) => adminEmails().includes(String(email || "").toLowerCase());

/**
 * Makes `email` an admin. With no account yet, creates one with `password` and `name`;
 * an existing account (e.g. a customer) keeps its own password.
 */
export async function addAdmin({ email, name, password }) {
  const clean = String(email).trim().toLowerCase();
  let created = false;
  let user;
  try {
    user = await adminAuth().getUserByEmail(clean);
  } catch (error) {
    if (error?.code !== "auth/user-not-found") throw error;
    // A new account needs a password, or nobody could log in with it.
    if (!password || password.length < 8) throw Object.assign(new Error("password needed"), { code: "auth/invalid-password" });
    user = await adminAuth().createUser({ email: clean, password, displayName: name || undefined });
    created = true;
  }
  await ref().set({ emails: FieldValue.arrayUnion(clean), updatedAt: FieldValue.serverTimestamp() }, { merge: true });
  if (user?.uid) {
    const db = adminDb();
    await Promise.all([
      db.collection("profiles").doc(user.uid).set({ email: clean, role: "admin", updatedAt: FieldValue.serverTimestamp() }, { merge: true }),
      db.collection("adminProfiles").doc(user.uid).set({ email: clean, role: "admin", updatedAt: FieldValue.serverTimestamp() }, { merge: true }),
    ]);
  }
  return { created };
}

/** Removes an added admin. Their account stays (as a normal user); their sessions end. */
export async function removeAdmin(email) {
  const clean = String(email).trim().toLowerCase();
  await ref().set({ emails: FieldValue.arrayRemove(clean), updatedAt: FieldValue.serverTimestamp() }, { merge: true });
  try {
    const user = await adminAuth().getUserByEmail(clean);
    if (user?.uid) {
      await adminDb().collection("profiles").doc(user.uid).set({ role: "customer", updatedAt: FieldValue.serverTimestamp() }, { merge: true });
    }
    await adminAuth().revokeRefreshTokens(user.uid);
  } catch {
    // No account: nothing to sign out.
  }
}
