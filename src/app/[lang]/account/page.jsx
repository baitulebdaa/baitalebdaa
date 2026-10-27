import { redirect } from "next/navigation";
import AccountDashboard from "../../../AccountDashboard";
import { dictionaries } from "../../../i18n/dictionaries";
import { customerProfile, customerRequests } from "../../../lib/account/data";
import { currentCustomer } from "../../../lib/account/session";

// A private page: signed-in customers only, never indexed.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return { title: { absolute: (dictionaries[lang] || dictionaries.en).accountPage.metaTitle }, robots: { index: false, follow: false } };
}

export default async function AccountRoute({ params }) {
  const { lang } = await params;
  const customer = await currentCustomer();
  if (!customer) redirect(`/${lang}/account/login`);
  const [requests, profile] = await Promise.all([
    customerRequests(customer).catch((error) => {
      console.error("Loading the customer's requests failed:", error);
      return [];
    }),
    customerProfile(customer.uid).catch(() => ({ phone: "", address: "" })),
  ]);
  return <AccountDashboard customer={customer} phone={profile.phone} address={profile.address} requests={requests} />;
}
