// Shared by the server layout (GA init script) and the client consent banner and footer.
// A "use client" module cannot export plain values to a server component, so they live here.
export const CONSENT_COOKIE = "bae_consent";
export const OPEN_COOKIE_SETTINGS_EVENT = "bae:cookie-settings";
