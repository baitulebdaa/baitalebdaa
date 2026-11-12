import { BreadcrumbSchema } from "../../../components/BreadcrumbSchema";
import OurProjects from "../../../OurProjects";
import { dictionaries } from "../../../i18n/dictionaries";
import { buildPageMetadata } from "../../../lib/page-metadata";
import { PageFaqSchema } from "../../../components/PageFaqSchema";
import { isPublishedProject } from "../../../data/project-catalog";
import { ORG_REF, SITE_URL } from "../../../lib/schema-ids";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = (dictionaries[lang] || dictionaries.en).ourProjectsPage;
  return buildPageMetadata({ lang, path: "our-projects", title: t.metaTitle, description: t.metaDescription });
}

// ItemList of the published projects (11 Nov 2026): each one's name, page, opening paragraph
// and location, all from the owner-confirmed project facts.
function projectListJsonLd(lang) {
  const d = dictionaries[lang] || dictionaries.en;
  const projects = d.projectsSection.items.filter((p) => isPublishedProject(p.slug));
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: d.ourProjectsPage.explorePortfolio,
    itemListElement: projects.map((p, i) => {
      const detail = d.projectDetailPage.projects[p.slug] || {};
      return {
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "CreativeWork",
          name: p.title,
          url: `${SITE_URL}/${lang}/our-projects/${p.slug}`,
          description: (detail.description || "").split("\n\n")[0] || undefined,
          locationCreated: detail.metadata?.location ? { "@type": "Place", name: detail.metadata.location } : undefined,
          creator: ORG_REF,
        },
      };
    }),
  };
}

export default async function OurProjectsPage({ params }) {
  const { lang } = await params;
  const schema = JSON.stringify(projectListJsonLd(lang === "ar" ? "ar" : "en")).replace(/</g, "\\u003c");
  return (
    <>
      <PageFaqSchema lang={lang} faqKey="projects" />
      <BreadcrumbSchema lang={lang} path="our-projects" title={(dictionaries[lang] || dictionaries.en).ourProjectsPage.ourProjects} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
      <OurProjects />
    </>
  );
}
