import { IdentityError, sendPasswordReset } from "../../../../lib/account/identity";
import { validEmail } from "../../../../lib/account/validation";
import { fail, guard, readBody } from "../_shared";

// Emails a reset link. The answer is the same whether or not the email has an account.
export async function POST(request) {
  const blocked = guard(request, "accountReset");
  if (blocked) return blocked;
  const { email } = await readBody(request);
  if (!validEmail(email)) return fail("invalid_email");
  try {
    await sendPasswordReset(String(email).trim());
    return Response.json({ ok: true });
  } catch (error) {
    if (error instanceof IdentityError) return fail(error.code);
    return fail("unavailable", 502);
  }
}
