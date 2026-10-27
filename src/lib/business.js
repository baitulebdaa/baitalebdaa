// Server side of the business details (src/data/business.js): read from Firestore
// settings/business once and cached for every page; the admin panel's Save clears the cache
// (revalidateTag("business")) so the site shows the change at once. Falls back to the
// defaults when Firestore isn't configured or can't be reached.
import { unstable_cache } from "next/cache";
import { DEFAULT_BUSINESS, mergeBusiness } from "../data/business";
import { adminDb, isFirestoreConfigured } from "./admin/firebase";

export const BUSINESS_TAG = "business";

export const getBusiness = unstable_cache(
  async () => {
    if (!isFirestoreConfigured()) return DEFAULT_BUSINESS;
    try {
      const doc = await adminDb().collection("settings").doc("business").get();
      return mergeBusiness(doc.exists ? doc.data() : null);
    } catch (error) {
      console.error("Reading the business details failed; using defaults:", error);
      return DEFAULT_BUSINESS;
    }
  },
  ["business-details"],
  { tags: [BUSINESS_TAG], revalidate: 3600 }
);

/** For the admin panel: the current details straight from Firestore, not the site's cache. */
export async function readBusinessFresh() {
  if (!isFirestoreConfigured()) return DEFAULT_BUSINESS;
  const doc = await adminDb().collection("settings").doc("business").get();
  return mergeBusiness(doc.exists ? doc.data() : null);
}
