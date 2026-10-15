import ProjectDetail from "../../../../ProjectDetail";
import { dictionaries } from "../../../../i18n/dictionaries";
import { buildPageMetadata } from "../../../../lib/page-metadata";
import { REAL_PROJECT_SLUGS } from "../../../../data/project-catalog";
import { PageFaqSchema } from "../../../../components/PageFaqSchema";

// Every project here is a real completed project (owner-confirmed, 15 Oct 2026); indexing
// still goes through REAL_PROJECT_SLUGS so a future unverified entry can't slip in.
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
  const title = slug === "government-authority"
    ? (lang === "ar" ? "مشروع تجهيز مكاتب في مدينة دبي الأكاديمية | بيت الإبداع" : "Office Fit-Out Project, Dubai Academic City | Bait Al Ebdaa")
    : `${project.title} | Bait Al Ebdaa`;
  const description = project.metaDescription || project.description.split("\n\n")[0];
  return {
    ...buildPageMetadata({ lang, path: `our-projects/${slug}`, title, description }),
    robots: REAL_PROJECT_SLUGS.has(slug) ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export default async function ProjectDetailPage({ params }) {
  const resolvedParams = await params;
  return (
    <>
      {REAL_PROJECT_SLUGS.has(resolvedParams.slug) && <PageFaqSchema lang={resolvedParams.lang} faqKey={resolvedParams.slug} />}
      <ProjectDetail slug={resolvedParams.slug} />
    </>
  );
}
