import Process from "../../../Process";
import { dictionaries } from "../../../i18n/dictionaries";
import { buildPageMetadata } from "../../../lib/page-metadata";
import { PageFaqSchema } from "../../../components/PageFaqSchema";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = (dictionaries[lang] || dictionaries.en).ourProcessPage;
  return buildPageMetadata({ lang, path: "process", title: t.metaTitle, description: t.metaDescription });
}

export default async function ProcessPage({ params }) {
  const { lang } = await params;
  return (
    <>
      <PageFaqSchema lang={lang} faqKey="process" />
      <Process />
    </>
  );
}
