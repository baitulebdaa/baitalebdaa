import { adminAuth } from "../../../../lib/admin/firebase";
import { deleteCustomerProfile, saveCustomerAddress, saveCustomerPhone } from "../../../../lib/account/data";
import { currentCustomer, endSession, setSignedInHint } from "../../../../lib/account/session";
import { normalizePhone, validName } from "../../../../lib/account/validation";
import { fail, guard, readBody } from "../_shared";

// Changes the name (on the account, so the app shows it too) and the phone.
export async function PATCH(request) {
  const blocked = guard(request);
  if (blocked) return blocked;
  const customer = await currentCustomer();
  if (!customer) return fail("signed_out", 401);
  const { name, phone, address } = await readBody(request);
  if (!validName(name)) return fail("invalid_name");
  const e164 = normalizePhone(phone);
  if (e164 === null) return fail("invalid_phone");
  try {
    await adminAuth().updateUser(customer.uid, { displayName: String(name).trim() });
    await saveCustomerPhone(customer.uid, e164);
    await saveCustomerAddress(customer.uid, String(address || "").trim().slice(0, 300));
    await setSignedInHint(String(name).trim());
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Profile update failed:", error);
    return fail("unavailable", 502);
  }
}

// Deletes the account. Requests already sent stay with the team, as the page says first.
export async function DELETE(request) {
  const blocked = guard(request);
  if (blocked) return blocked;
  const customer = await currentCustomer();
  if (!customer) return fail("signed_out", 401);
  try {
    await deleteCustomerProfile(customer.uid);
    await adminAuth().deleteUser(customer.uid);
    await endSession();
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Account deletion failed:", error);
    return fail("unavailable", 502);
  }
}
