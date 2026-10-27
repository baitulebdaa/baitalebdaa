import { customerProfile } from "../../../../lib/account/data";
import { currentCustomer } from "../../../../lib/account/session";

// The signed-in customer's own details, used to prefill the website's quote forms. Signed
// out (or accounts not set up) returns { signedIn: false }. Never cached.
export const dynamic = "force-dynamic";

export async function GET() {
  const customer = await currentCustomer().catch(() => null);
  if (!customer) return Response.json({ signedIn: false }, { headers: { "Cache-Control": "no-store" } });
  const profile = await customerProfile(customer.uid).catch(() => ({ phone: "", address: "" }));
  return Response.json(
    { signedIn: true, name: customer.name, email: customer.email, phone: profile.phone, address: profile.address },
    { headers: { "Cache-Control": "no-store" } }
  );
}
