// Stable JSON-LD node ids. The Organization is defined once (organizationJsonLd in
// page-metadata.js, rendered by the root layout on every page); every other schema block
// points at it by @id instead of declaring its own anonymous Organization, so search
// engines and LLMs resolve one "Bait Al Ebdaa" entity rather than several weak copies.
export const SITE_URL = "https://www.baitalebdaa.com";
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const ORG_REF = { "@id": ORGANIZATION_ID };
