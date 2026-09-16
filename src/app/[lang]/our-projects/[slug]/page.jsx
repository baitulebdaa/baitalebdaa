import ProjectDetail from "../../../../ProjectDetail";
import { dictionaries } from "../../../../i18n/dictionaries";
import { buildPageMetadata } from "../../../../lib/page-metadata";

export function generateStaticParams() {
  return [
    { slug: "government-authority" }
  ];
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const t = (dictionaries[lang] || dictionaries.en).projectDetailPage;
  const project = t.projects[slug] || t.projects["government-authority"];
  const title = `${project.title} | Bait Al Ebdaa`;
  const description = project.description.split("\n\n")[0];
  return buildPageMetadata({ lang, path: `our-projects/${slug}`, title, description });
}

export default async function ProjectDetailPage({ params }) {
  const resolvedParams = await params;
  return <ProjectDetail slug={resolvedParams.slug} />;
}
