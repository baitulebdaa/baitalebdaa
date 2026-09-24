import PrivacyPolicy from "../../../PrivacyPolicy";
import { dictionaries } from "../../../i18n/dictionaries";
import { buildPageMetadata } from "../../../lib/page-metadata";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = (dictionaries[lang] || dictionaries.en).privacyPolicyPage;
  return buildPageMetadata({ lang, path: "privacy-policy", title: t.metaTitle, description: t.metaDescription });
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
