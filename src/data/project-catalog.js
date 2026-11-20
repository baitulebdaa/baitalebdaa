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

// Every card whose project has a real detail page uses that page's own hero photo
// (first image in its images array), so the card matches what it links to.
export const HERO_IMAGE_BY_SLUG = {
  "government-authority": "/assets/tv-wall-unit-led-display-shelves.jpeg",
  "dubai-hills-estate-villa": "/assets/living-room-wood-slat-wall-lounge-seating.jpeg",
  "palm-jumeirah-penthouse": "/assets/luxury-living-room-stone-tv-wall-fireplace.jpeg",
  "downtown-dubai-tech-hq": "/assets/tv-media-wall-floating-console-fireplace.jpeg",
  "al-barari-eco-villa": "/assets/contemporary-living-room-wall-panelling-track-lighting.jpeg",
  "saadiyat-island-villa": "/assets/modern-living-room-beige-sofa-curtain-wall-panels.jpeg",
};
