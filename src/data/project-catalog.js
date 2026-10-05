// Only projects backed by real published project data should be discoverable in
// public navigation and portfolio grids. Placeholder routes remain noindex until
// verified case-study content is supplied.
export const REAL_PROJECT_SLUGS = new Set(["government-authority"]);

export function isPublishedProject(slug) {
  return REAL_PROJECT_SLUGS.has(slug);
}
