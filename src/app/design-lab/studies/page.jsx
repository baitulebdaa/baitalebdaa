import { notFound } from "next/navigation";
import Studio from "../Studio";

import { dictionaries } from "../../../i18n/dictionaries";
import { REAL_PROJECT_SLUGS, HERO_IMAGE_BY_SLUG } from "../../../data/project-catalog";

export default function DesignLab() {
  if (process.env.NODE_ENV === "production") notFound();
  const projects = Array.from(REAL_PROJECT_SLUGS, slug => {
    const project = dictionaries.en.projectDetailPage.projects[slug];
    return { slug, name: project.title, image: HERO_IMAGE_BY_SLUG[slug], ...project.metadata };
  });
  return <Studio projects={projects} />;
}
