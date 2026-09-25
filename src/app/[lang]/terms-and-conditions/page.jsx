import TermsAndConditions from "../../../TermsAndConditions";
import { dictionaries } from "../../../i18n/dictionaries";
import { buildPageMetadata } from "../../../lib/page-metadata";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = (dictionaries[lang] || dictionaries.en).termsPage;
  return buildPageMetadata({ lang, path: "terms-and-conditions", title: t.metaTitle, description: t.metaDescription });
}

export default function TermsAndConditionsPage() {
  return <TermsAndConditions />;
}
