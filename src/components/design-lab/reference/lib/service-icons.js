/** One Iconsax (Linear) glyph per service. Iconsax only: no hand-drawn icons. Keep both language catalogues on these identities. */
export const SERVICE_ICONS = {
    "service-deep-cleaning": "MagicStar",
    "service-home-cleaning": "Home2",
    "service-maid-service": "Profile2User",
    "service-villa-cleaning": "House",
    "service-apartment-cleaning": "Building",
    "service-move-in-out-cleaning": "Truck",
    "service-sofa-cleaning": "Lamp",
    "service-carpet-cleaning": "Layer",
    "service-mattress-cleaning": "Moon",
    "service-curtain-cleaning": "Cards",
    "service-marble-polishing": "Brush2",
    "service-ac-duct-cleaning": "Wind",
    "service-pest-control": "Danger",
    "service-water-tank-cleaning": "Drop",
    "service-post-construction-cleaning": "Setting3",
    "service-window-cleaning": "Mirror",
    "service-office-cleaning": "Briefcase",
    "service-restaurant-cleaning": "Reserve",
    "service-showroom-cleaning": "Shop",
};
export function serviceIconName(slug) {
    return `service-${slug}`;
}
