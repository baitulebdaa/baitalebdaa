import Media from "../../../Media";
import { dictionaries } from "../../../i18n/dictionaries";
import { buildPageMetadata } from "../../../lib/page-metadata";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = (dictionaries[lang] || dictionaries.en).mediaPage;
  return {
    ...buildPageMetadata({ lang, path: "media", title: t.metaTitle, description: t.metaDescription }),
    // Noindexed until the placeholder articles below are replaced with real
    // Bait Al Ebdaa press coverage/case studies — see AGENTS.md / SEO audit note.
    robots: { index: false, follow: true },
  };
}

export default function MediaPage() {
  return <Media />;
}
