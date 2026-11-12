import { BreadcrumbSchema } from "../../../components/BreadcrumbSchema";
import TermsAndConditions from "../../../TermsAndConditions";
import { dictionaries } from "../../../i18n/dictionaries";
import { buildPageMetadata } from "../../../lib/page-metadata";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = (dictionaries[lang] || dictionaries.en).termsPage;
  return buildPageMetadata({ lang, path: "terms-and-conditions", title: t.metaTitle, description: t.metaDescription });
}

export default async function TermsAndConditionsPage({ params }) {
  const { lang } = await params;
  const t = (dictionaries[lang] || dictionaries.en).termsPage;
  return (
    <>
      <BreadcrumbSchema lang={lang} path="terms-and-conditions" title={t.navTitle || t.metaTitle} />
      <TermsAndConditions />
    </>
  );
}
