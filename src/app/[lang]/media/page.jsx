import { BreadcrumbSchema } from "../../../components/BreadcrumbSchema";
import Media from "../../../Media";
import { dictionaries } from "../../../i18n/dictionaries";
import { buildPageMetadata } from "../../../lib/page-metadata";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = (dictionaries[lang] || dictionaries.en).mediaPage;
  return buildPageMetadata({ lang, path: "media", title: t.metaTitle, description: t.metaDescription });
}

export default async function MediaPage({ params }) {
  const { lang } = await params;
  return (
    <>
      <BreadcrumbSchema lang={lang} path="media" title={(dictionaries[lang] || dictionaries.en).nav.media || "Media"} />
      <Media />
    </>
  );
}
