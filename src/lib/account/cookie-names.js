// Readable by the page, not a credential: the customer's first name, which the header shows
// under the account icon (owner, 26 Oct 2026) instead of "Sign in". The real session stays
// in the httpOnly cookie (ACCOUNT_COOKIE in session.js). Kept in its own file so the page
// layout can use it without loading the server-only session code.
export const SIGNED_IN_COOKIE = "bae_signed_in";
