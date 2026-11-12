// Service page photos (moved out of ServiceLocationPage.jsx on 12 Nov 2026 so the server-side
// metadata can use the same hero photo as the share image). All are the website's own photos.
export const HERO_IMAGE_BY_SERVICE = {
  "interior-design": "/assets/luxury-living-room-chandelier-wall-panelling.jpeg",
  "fit-out": "/assets/luxury-living-room-stone-tv-wall-fireplace.jpeg",
  "office-fit-out": "/assets/built-in-wardrobe-study-desk-wood-shelves.jpeg",
  "restaurant-fit-out": "/assets/luxury-lounge-feature-wall-led-sconces.jpeg",
  "retail-fit-out": "/assets/villa-majlis-living-room-wood-wall-cove-ceiling.jpeg",
  "commercial-interior-design": "/assets/tv-wall-unit-led-display-shelves.jpeg",
  "residential-interior-design": "/assets/living-room-curved-sofa-wood-slat-wall.jpeg",
  "office-interior-design": "/assets/study-nook-wardrobe-led-shelving-wood-slats.jpeg",
  "restaurant-interior-design": "/assets/contemporary-living-room-wall-panelling-track-lighting.jpeg",
  "retail-interior-design": "/assets/minimalist-living-room-fluted-wall-panel-cove-lighting.jpeg",
  "villa-renovation": "/assets/living-room-wood-slat-wall-lounge-seating.jpeg",
  "apartment-renovation": "/assets/modern-living-room-beige-sofa-curtain-wall-panels.jpeg",
  "office-renovation": "/assets/tv-media-wall-floating-console-fireplace.jpeg",
  joinery: "/assets/l-shaped-walk-in-closet-led-drawers.jpeg",
  "custom-wardrobes": "/assets/walk-in-closet-island-led-ceiling.jpeg",
  "kitchen-design": "/assets/corner-coffee-bar-black-fluted-cabinet-led-lighting.jpeg",
  "kitchen-renovation": "/assets/coffee-corner-white-cabinet-wine-cooler-led-shelves.jpeg",
};

// Real completed-work photography, grouped by the service it actually documents.
// Used both as an alternate hero (varied per location, still 100% genuine) and in the
// "From our recent work" gallery below — see the AGENTS.md / plan note on avoiding
// fabricated per-location proof: these are real photos, just not tied to one specific city.
export const WORK_GALLERY_BY_SERVICE = {
  "custom-wardrobes": [
    { src: "/assets/walk-in-closet-island-led-ceiling.jpeg", alt: "Walk-in closet with central island and LED ceiling lighting" },
    { src: "/assets/l-shaped-walk-in-closet-led-drawers.jpeg", alt: "L-shaped walk-in closet with brass-handled drawers and LED shelves" },
    { src: "/assets/corner-wardrobe-glass-doors-black-handles.jpeg", alt: "Corner wardrobe with smoked glass doors and black handles" },
    { src: "/assets/glass-door-wardrobe-matte-handles.jpeg", alt: "Custom wardrobe with glass door and matte handles" },
    { src: "/assets/hallway-wardrobe-bench-upholstered-panel.jpeg", alt: "Hallway wardrobe with built-in bench and upholstered wall panel" },
    { src: "/assets/built-in-wardrobe-study-desk-wood-shelves.jpeg", alt: "Built-in wardrobe with study desk and open wood shelves" },
    { src: "/assets/study-nook-wardrobe-led-shelving-wood-slats.jpeg", alt: "Wardrobe and study nook with LED shelving and wood-slat panelling" },
  ],
  joinery: [
    { src: "/assets/glass-door-wardrobe-matte-handles.jpeg", alt: "Custom joinery wardrobe with glass door" },
    { src: "/assets/tv-wall-unit-led-display-shelves.jpeg", alt: "Custom joinery TV wall with backlit display shelving" },
    { src: "/assets/tv-media-wall-floating-console-fireplace.jpeg", alt: "Bespoke TV media wall with floating console joinery" },
    { src: "/assets/tv-feature-wall-travertine-bio-fireplace.jpeg", alt: "Custom joinery TV feature wall with travertine panel" },
    { src: "/assets/walnut-coffee-bar-cabinet-led-shelving.jpeg", alt: "Walnut coffee bar cabinet with LED-lit shelves" },
  ],
  "interior-design": [
    { src: "/assets/minimalist-bedroom-grey-bed-stone-wall.jpeg", alt: "Residential bedroom interior design concept" },
    { src: "/assets/modern-dining-room-pendant-lights-oak-table.jpeg", alt: "Dining area interior design with custom furniture" },
    { src: "/assets/living-room-tv-unit-floating-shelves-curtains.jpeg", alt: "Living room interior design with floor-to-ceiling curtains" },
  ],
  "residential-interior-design": [
    { src: "/assets/bedroom-wardrobe-led-shelves-pouf.jpeg", alt: "Residential bedroom interior design with fitted wardrobe" },
    { src: "/assets/modern-bedroom-upholstered-headboard-wall-panels.jpeg", alt: "Bedroom interior design with ambient cove lighting" },
    { src: "/assets/double-height-tv-wall-fireplace-curtains.jpeg", alt: "Living room with double-height TV wall and floor-to-ceiling curtains" },
    { src: "/assets/master-bedroom-tufted-wall-panels-ceiling.jpeg", alt: "Master bedroom with tufted wall panels and feature ceiling" },
  ],
  "villa-renovation": [
    { src: "/assets/bedroom-wood-headboard-floating-nightstand.jpeg", alt: "Renovated villa bedroom with wood headboard wall" },
    { src: "/assets/travertine-tv-wall-linear-fireplace.jpeg", alt: "Renovated villa living room TV wall" },
    { src: "/assets/luxury-lounge-feature-wall-led-sconces.jpeg", alt: "Villa lounge feature wall after renovation" },
  ],
  "apartment-renovation": [
    { src: "/assets/minimalist-bedroom-grey-bed-stone-wall.jpeg", alt: "Renovated apartment bedroom" },
    { src: "/assets/tv-wall-marble-panel-bedroom-divider.jpeg", alt: "Apartment marble TV wall after renovation" },
    { src: "/assets/hallway-wardrobe-bench-upholstered-panel.jpeg", alt: "Apartment hallway wardrobe after renovation" },
  ],
  "kitchen-design": [
    { src: "/assets/corner-coffee-bar-black-fluted-cabinet-led-lighting.jpeg", alt: "Corner pantry and coffee bar with fluted black cabinetry" },
    { src: "/assets/corner-coffee-station-walnut-stone-cabinet.jpeg", alt: "Corner coffee station with walnut and stone cabinetry" },
    { src: "/assets/home-bar-cabinet-wine-fridge-led-shelves.jpeg", alt: "Home bar cabinet with wine fridge and LED shelves" },
  ],
  "kitchen-renovation": [
    { src: "/assets/coffee-corner-white-cabinet-wine-cooler-led-shelves.jpeg", alt: "Renovated coffee corner with white cabinet and wine cooler" },
    { src: "/assets/walnut-coffee-bar-cabinet-led-shelving.jpeg", alt: "Walnut pantry cabinet with LED shelving after renovation" },
  ],
};

// Deterministic pick so the same location always shows the same photo (stable across
// rebuilds/CDN caching) while different locations in the same service show different genuine photos.
export function pickByLocation(list, locationSlug) {
  if (!list || list.length === 0) return null;
  const seed = [...locationSlug].reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return list[seed % list.length];
}


const DEFAULT_HERO = "/assets/luxury-living-room-chandelier-wall-panelling.jpeg";

// The hero photo a service + location page shows (and shares): a gallery photo picked by
// location, else the service's own photo.
export function serviceHeroPhoto(serviceSlug, locationSlug) {
  const photo = pickByLocation(WORK_GALLERY_BY_SERVICE[serviceSlug] || [], locationSlug);
  return { src: photo?.src || HERO_IMAGE_BY_SERVICE[serviceSlug] || DEFAULT_HERO, alt: photo?.alt || null };
}
