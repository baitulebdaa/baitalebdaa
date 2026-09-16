import Process from "../../../Process";
import { dictionaries } from "../../../i18n/dictionaries";
import { buildPageMetadata } from "../../../lib/page-metadata";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = (dictionaries[lang] || dictionaries.en).ourProcessPage;
  return buildPageMetadata({ lang, path: "process", title: t.metaTitle, description: t.metaDescription });
}

export default function ProcessPage() {
  return <Process />;
}
