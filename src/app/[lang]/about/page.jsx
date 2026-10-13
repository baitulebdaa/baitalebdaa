import About from "../../../About";
import { dictionaries } from "../../../i18n/dictionaries";
import { buildPageMetadata } from "../../../lib/page-metadata";
import { PageFaqSchema } from "../../../components/PageFaqSchema";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = (dictionaries[lang] || dictionaries.en).aboutPage;
  return buildPageMetadata({ lang, path: "about", title: t.metaTitle, description: t.metaDescription });
}

export default async function AboutPage({ params }) {
  const { lang } = await params;
  return (
    <>
      <PageFaqSchema lang={lang} faqKey="about" />
      <About />
    </>
  );
}
