// Firebase Authentication's REST API, called from the server with the project's Web API
// key, so the browser never loads a Firebase SDK. Customer accounts are the same accounts
// the mobile app uses (project baitalebdaa).
const BASE = "https://identitytoolkit.googleapis.com/v1/accounts";

/** A refusal from Firebase, as a short code the pages turn into English or Arabic. */
export class IdentityError extends Error {
  constructor(code) {
    super(code);
    this.code = code;
  }
}

// Firebase's messages → our codes. Unknown and wrong-password look the same on purpose,
// so the form never reveals which emails have accounts.
function codeFor(message = "") {
  if (/INVALID_LOGIN_CREDENTIALS|INVALID_PASSWORD|EMAIL_NOT_FOUND|USER_DISABLED/.test(message)) return "invalid_credentials";
  if (message.startsWith("EMAIL_EXISTS")) return "email_in_use";
  if (message.startsWith("WEAK_PASSWORD")) return "weak_password";
  if (message.startsWith("INVALID_EMAIL")) return "invalid_email";
  if (message.startsWith("TOO_MANY_ATTEMPTS")) return "too_many_attempts";
  if (message.startsWith("OPERATION_NOT_ALLOWED") || message.startsWith("CONFIGURATION_NOT_FOUND")) return "unavailable";
  return "unavailable";
}

async function call(action, body) {
  const key = process.env.FIREBASE_WEB_API_KEY;
  if (!key) throw new IdentityError("unavailable");
  const res = await fetch(`${BASE}:${action}?key=${encodeURIComponent(key)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const result = await res.json().catch(() => ({}));
  if (!res.ok) throw new IdentityError(codeFor(result?.error?.message));
  return result;
}

/** Checks the password; returns an ID token for a session cookie. */
export async function signIn(email, password) {
  return (await call("signInWithPassword", { email, password, returnSecureToken: true })).idToken;
}

/** Creates the account; returns its ID token and uid. */
export async function signUp(email, password) {
  const result = await call("signUp", { email, password, returnSecureToken: true });
  return { idToken: result.idToken, uid: result.localId };
}

/** Sends the "verify your email" message. Best effort: the account works without it. */
export async function sendVerification(idToken) {
  try {
    await call("sendOobCode", { requestType: "VERIFY_EMAIL", idToken });
  } catch {
    // Ignored deliberately; the customer can still use the account.
  }
}

/** Sends a reset link. Completes the same way whether or not the email has an account. */
export async function sendPasswordReset(email) {
  try {
    await call("sendOobCode", { requestType: "PASSWORD_RESET", email });
  } catch (error) {
    if (error.code === "too_many_attempts") throw error;
  }
}
