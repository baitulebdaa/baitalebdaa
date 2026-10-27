// Users (owner, 27 Oct 2026): the customer accounts of the website and app (Firebase
// Authentication, project baitalebdaa), with the phone and address from profiles/{uid}.
// Admins can block, unblock, send a password reset and delete. Server only.
import { allAdminEmails } from "./admins";
import { adminAuth, adminDb } from "./firebase";
import { isPreview } from "./preview";

const toIso = (value) => (value ? new Date(value).toISOString() : null);

function fromUser(user, profile = {}, admins = []) {
  const email = (user.email || "").toLowerCase();
  return {
    uid: user.uid,
    name: user.displayName || email.split("@")[0] || "No name",
    email,
    phone: profile.phone || user.phoneNumber || "",
    address: profile.address || "",
    blocked: Boolean(user.disabled),
    verified: Boolean(user.emailVerified),
    admin: admins.includes(email),
    createdAt: toIso(user.metadata?.creationTime),
    lastSignInAt: toIso(user.metadata?.lastSignInTime),
    signInWith: (user.providerData || []).map((p) => p.providerId.replace(".com", "")).join(", ") || "email",
  };
}

async function profilesFor(uids) {
  if (uids.length === 0) return new Map();
  const db = adminDb();
  const map = new Map();
  // getAll reads many documents in one request; 100 at a time keeps requests small.
  for (let i = 0; i < uids.length; i += 100) {
    const refs = uids.slice(i, i + 100).map((uid) => db.collection("profiles").doc(uid));
    for (const doc of await db.getAll(...refs)) if (doc.exists) map.set(doc.id, doc.data());
  }
  return map;
}

const PREVIEW_USERS = Array.from({ length: 8 }, (_, i) => ({
  uid: `preview-user-${i}`,
  name: `Sample User ${String.fromCharCode(65 + i)}`,
  email: `user${i}@example.com`,
  phone: i % 2 ? "" : "+10000000000",
  address: i % 3 ? "" : "Sample address, Dubai",
  blocked: i === 5,
  verified: i % 2 === 0,
  admin: false,
  createdAt: new Date(Date.now() - i * 3 * 86400000).toISOString(),
  lastSignInAt: new Date(Date.now() - i * 86400000).toISOString(),
  signInWith: "email",
}));

/** Every account, newest first (up to 1,000, plenty for this business). */
export async function listUsers() {
  if (isPreview()) return PREVIEW_USERS;
  const [result, admins] = await Promise.all([adminAuth().listUsers(1000), allAdminEmails()]);
  const profiles = await profilesFor(result.users.map((u) => u.uid));
  return result.users
    .map((user) => fromUser(user, profiles.get(user.uid), admins))
    .sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")));
}

export async function getUser(uid) {
  if (isPreview()) return PREVIEW_USERS.find((u) => u.uid === uid) || null;
  if (!/^[A-Za-z0-9_-]{1,128}$/.test(uid)) return null;
  try {
    const user = await adminAuth().getUser(uid);
    const profile = await adminDb().collection("profiles").doc(uid).get();
    return fromUser(user, profile.exists ? profile.data() : {}, await allAdminEmails());
  } catch {
    return null;
  }
}

/** Blocks (or unblocks) sign-in; blocking also ends the user's open sessions. */
export async function setBlocked(uid, blocked) {
  await adminAuth().updateUser(uid, { disabled: blocked });
  if (blocked) await adminAuth().revokeRefreshTokens(uid);
}

/** Deletes the account and its profile. Requests already sent stay with the team. */
export async function deleteUser(uid) {
  await adminDb().collection("profiles").doc(uid).delete();
  await adminAuth().deleteUser(uid);
}

/** How many requests each user has sent (app requests by uid, website ones by uid or email). */
export function requestCounts(users, leads) {
  const byUid = new Map();
  const byEmail = new Map(users.map((u) => [u.email, u.uid]));
  for (const lead of leads) {
    const uid = lead.ownerUid || lead.customerUid || (lead.email && byEmail.get(lead.email.toLowerCase()));
    if (uid) byUid.set(uid, (byUid.get(uid) || 0) + 1);
  }
  return byUid;
}
