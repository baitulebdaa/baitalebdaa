import OurProjects from "../../../OurProjects";
import { dictionaries } from "../../../i18n/dictionaries";
import { buildPageMetadata } from "../../../lib/page-metadata";
import { PageFaqSchema } from "../../../components/PageFaqSchema";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = (dictionaries[lang] || dictionaries.en).ourProjectsPage;
  return buildPageMetadata({ lang, path: "our-projects", title: t.metaTitle, description: t.metaDescription });
}

export default async function OurProjectsPage({ params }) {
  const { lang } = await params;
  return (
    <>
      <PageFaqSchema lang={lang} faqKey="projects" />
      <OurProjects />
    </>
  );
}
