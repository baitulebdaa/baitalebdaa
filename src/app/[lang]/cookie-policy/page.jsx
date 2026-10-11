import LegalPage from "../../../LegalPage";
import { legalPages } from "../../../data/legal-pages";
import { buildPageMetadata } from "../../../lib/page-metadata";

const SLUG = "cookie-policy";
const pick = (lang) => legalPages[lang] || legalPages.en;

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = pick(lang)[SLUG];
  return buildPageMetadata({ lang, path: SLUG, title: t.metaTitle, description: t.metaDescription });
}

export default async function Page({ params }) {
  const { lang } = await params;
  const pages = pick(lang);
  return <LegalPage content={pages[SLUG]} reviewNote={pages.reviewNote} />;
}
