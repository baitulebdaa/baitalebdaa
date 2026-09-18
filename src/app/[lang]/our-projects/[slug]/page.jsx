import ProjectDetail from "../../../../ProjectDetail";
import { dictionaries } from "../../../../i18n/dictionaries";
import { buildPageMetadata } from "../../../../lib/page-metadata";

// "government-authority" is the one real published project. The rest are dummy
// placeholder case studies (added at the owner's request, pending real project data)
// — see projectDetailPage.projects in dictionaries.js for the noindex rationale.
const REAL_PROJECT_SLUGS = ["government-authority"];

export function generateStaticParams() {
  return [
    { slug: "government-authority" },
    { slug: "dubai-hills-estate-villa" },
    { slug: "palm-jumeirah-penthouse" },
    { slug: "downtown-dubai-tech-hq" },
    { slug: "al-barari-eco-villa" },
    { slug: "saadiyat-island-villa" },
  ];
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const t = (dictionaries[lang] || dictionaries.en).projectDetailPage;
  const project = t.projects[slug] || t.projects["government-authority"];
  const title = `${project.title} | Bait Al Ebdaa`;
  const description = project.description.split("\n\n")[0];
  return {
    ...buildPageMetadata({ lang, path: `our-projects/${slug}`, title, description }),
    robots: REAL_PROJECT_SLUGS.includes(slug) ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export default async function ProjectDetailPage({ params }) {
  const resolvedParams = await params;
  return <ProjectDetail slug={resolvedParams.slug} />;
}
