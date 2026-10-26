import { IdentityError, signIn } from "../../../../lib/account/identity";
import { endSession, startSession } from "../../../../lib/account/session";
import { validEmail } from "../../../../lib/account/validation";
import { isSameOrigin } from "../../../../lib/request-guard";
import { fail, guard, readBody } from "../_shared";

// Sign in with the same email and password as the mobile app.
export async function POST(request) {
  const blocked = guard(request, "accountAuth");
  if (blocked) return blocked;
  const { email, password } = await readBody(request);
  if (!validEmail(email) || !password || String(password).length > 200) return fail("invalid_credentials", 401);
  try {
    await startSession(await signIn(String(email).trim(), String(password)));
    return Response.json({ ok: true });
  } catch (error) {
    if (error instanceof IdentityError) return fail(error.code, error.code === "invalid_credentials" ? 401 : 400);
    console.error("Account sign-in failed:", error);
    return fail("unavailable", 502);
  }
}

// Sign out on this browser.
export async function DELETE(request) {
  if (!isSameOrigin(request)) return fail("forbidden", 403);
  await endSession();
  return Response.json({ ok: true });
}
