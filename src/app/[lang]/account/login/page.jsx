import { redirect } from "next/navigation";
import AccountAuth from "../../../../AccountAuth";
import { dictionaries } from "../../../../i18n/dictionaries";
import { currentCustomer, isAccountConfigured } from "../../../../lib/account/session";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return { title: { absolute: (dictionaries[lang] || dictionaries.en).accountPage.metaTitle }, robots: { index: false, follow: false } };
}

// Log in, or sign up with ?mode=register. Signed-in customers go straight to their account.
export default async function AccountLoginRoute({ params, searchParams }) {
  const { lang } = await params;
  if (await currentCustomer()) redirect(`/${lang}/account`);
  const mode = (await searchParams)?.mode === "register" ? "register" : "login";
  return <AccountAuth initialMode={mode} available={isAccountConfigured()} />;
}
