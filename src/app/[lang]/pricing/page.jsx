import PricingPage from "../../../PricingPage";
import { dictionaries } from "../../../i18n/dictionaries";
import { buildPageMetadata } from "../../../lib/page-metadata";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = (dictionaries[lang] || dictionaries.en).pricingPage;
  return buildPageMetadata({ lang, path: "pricing", title: t.metaTitle, description: t.metaDescription });
}

export default function PricingPageRoute() {
  return <PricingPage />;
}
