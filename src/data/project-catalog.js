// Published projects: indexed, listed in the sitemap, the projects grid and the header menu.
// The owner confirmed on 15 Oct 2026 that all six are real completed projects and that their
// location, size, year and scope details are correct.
export const REAL_PROJECT_SLUGS = new Set([
  "government-authority",
  "dubai-hills-estate-villa",
  "palm-jumeirah-penthouse",
  "downtown-dubai-tech-hq",
  "al-barari-eco-villa",
  "saadiyat-island-villa",
]);

export function isPublishedProject(slug) {
  return REAL_PROJECT_SLUGS.has(slug);
}
