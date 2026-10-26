// Server-only Firebase access for the admin panel and lead capture. It reads and writes
// Firestore with a service-account key, which bypasses the security rules, so it must
// never be imported by a client component.
//
// Environment (set in Vercel, see .env.example):
//   FIREBASE_SERVICE_ACCOUNT  the project's service-account JSON (raw or base64)
//   FIREBASE_WEB_API_KEY      the project's Web API key, for email/password sign-in
//   ADMIN_EMAILS              comma-separated emails allowed into /admin
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { isPreview } from "./preview";

const APP_NAME = "bae-admin";

function serviceAccount() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT?.trim();
  if (!raw) return null;
  try {
    const json = JSON.parse(raw.startsWith("{") ? raw : Buffer.from(raw, "base64").toString("utf8"));
    // Keys pasted into env vars often arrive with literal "\n" in place of newlines.
    if (typeof json.private_key === "string") json.private_key = json.private_key.replace(/\n/g, "\n");
    return json.project_id && json.client_email && json.private_key ? json : null;
  } catch {
    return null;
  }
}

export function adminEmails() {
  return (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

/** Firestore can be written (lead capture works). */
export function isFirestoreConfigured() {
  return serviceAccount() !== null;
}

/** Everything the admin panel needs is set: Firestore, sign-in and at least one admin. */
export function isAdminConfigured() {
  if (isPreview()) return true;
  return isFirestoreConfigured() && Boolean(process.env.FIREBASE_WEB_API_KEY) && adminEmails().length > 0;
}

/** Which settings are missing, by name, for the setup screen. */
export function missingAdminSettings() {
  return [
    !isFirestoreConfigured() && "FIREBASE_SERVICE_ACCOUNT",
    !process.env.FIREBASE_WEB_API_KEY && "FIREBASE_WEB_API_KEY",
    adminEmails().length === 0 && "ADMIN_EMAILS",
  ].filter(Boolean);
}

function app() {
  const existing = getApps().find((candidate) => candidate.name === APP_NAME);
  if (existing) return existing;
  const account = serviceAccount();
  if (!account) throw new Error("FIREBASE_SERVICE_ACCOUNT is not set.");
  return initializeApp({ credential: cert(account), projectId: account.project_id }, APP_NAME);
}

export const adminAuth = () => getAuth(app());
export const adminDb = () => getFirestore(app());
