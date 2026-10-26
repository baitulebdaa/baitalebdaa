import { adminAuth } from "../../../../lib/admin/firebase";
import { saveCustomerPhone } from "../../../../lib/account/data";
import { IdentityError, sendVerification, signUp } from "../../../../lib/account/identity";
import { startSession } from "../../../../lib/account/session";
import { MIN_PASSWORD, normalizePhone, validEmail, validName } from "../../../../lib/account/validation";
import { fail, guard, readBody } from "../_shared";

// Creates the account (usable in the app too), keeps the name and phone, sends the
// verification email and signs the customer in.
export async function POST(request) {
  const blocked = guard(request, "accountAuth");
  if (blocked) return blocked;
  const { name, email, phone, password, agreed } = await readBody(request);
  if (!validName(name)) return fail("invalid_name");
  if (!validEmail(email)) return fail("invalid_email");
  const e164 = normalizePhone(phone);
  if (e164 === null) return fail("invalid_phone");
  if (!password || String(password).length < MIN_PASSWORD || String(password).length > 200) return fail("weak_password");
  if (agreed !== true) return fail("terms");
  try {
    const { idToken, uid } = await signUp(String(email).trim(), String(password));
    await adminAuth().updateUser(uid, { displayName: String(name).trim() });
    if (e164) await saveCustomerPhone(uid, e164);
    await sendVerification(idToken);
    await startSession(idToken, String(name).trim());
    return Response.json({ ok: true });
  } catch (error) {
    if (error instanceof IdentityError) return fail(error.code);
    console.error("Account sign-up failed:", error);
    return fail("unavailable", 502);
  }
}
