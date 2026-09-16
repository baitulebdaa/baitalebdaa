import OurServices from "../../../OurServices";
import { dictionaries } from "../../../i18n/dictionaries";
import { buildPageMetadata } from "../../../lib/page-metadata";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = (dictionaries[lang] || dictionaries.en).ourServicesPage;
  return buildPageMetadata({ lang, path: "our-services", title: t.metaTitle, description: t.metaDescription });
}

export default function OurServicesPage() {
  return <OurServices />;
}
