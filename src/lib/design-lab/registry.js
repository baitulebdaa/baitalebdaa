/**
 * Catalogue of every Design Lab experiment. Pure data: the Lab reads this without loading experiment code.
 *
 * A version that has been approved is never edited in place. A new iteration is a new file (v2.tsx),
 * a new entry in `versions`, and a new line in `loaders.ts`, so v1 keeps working and can be compared.
 */
import { HERO_IMAGE_BY_SERVICE } from "../../data/service-photos";
export const servicePageVariants = [
["photo-led","Photo-led hero","A centred headline over the interior.","A quick introduction","The overlay reduces photo contrast."],
["editorial","Editorial split","The service brief and room photograph share the first view.","Reading scope alongside a room","Less width for the photograph."],
["essay","Studio essay","A service introduction followed by a photographic spread.","Explaining a design engagement","The introduction takes more space."],
["scope","Scope sheet","Published deliverables beside a full-height interior.","Comparing service scope","The layout prioritises detail."],
["contact-sheet","Room contact sheet","A captioned room gallery with selectable thumbnails.","Inspecting finishes","Reading the scope takes a second step."],
["index","Service index","An image-led introduction that leads into related services.","Exploring multiple services","More links compete for attention."]
].map(([id,name,idea,bestFor,tradeOff])=>({id,name,tagline:idea,idea,bestFor,tradeOff,primaryAction:"Explore service",versions:["v1"],flow:[{label:name,role:"lead",weight:4},{label:"Service scope",role:"explain",weight:2},{label:"Questions",role:"trust",weight:2}]}));
export const previewSlugs=Object.keys(HERO_IMAGE_BY_SERVICE).map(slug=>({slug,label:slug.replaceAll("-"," ")}));
export const defaultPreviewSlug = previewSlugs[0].slug;
export const LAB = "/design-lab";
export const previewSrc = (variant, version, slug) => `${LAB}/preview/service-page/${variant}/${version}/${slug}`;
export const slots = {
    "service-page": { label: "Service page template", href: `${LAB}/service-pages` },
    palette: { label: "Colour palette", href: `${LAB}/foundations` },
    "faq-toggle": { label: "FAQ toggle", href: `${LAB}/interactions#faq-toggle` },
    "cta-motion": { label: "WhatsApp button motion", href: `${LAB}/interactions#cta-motion` },
    "section-reveal": { label: "Section entrance", href: `${LAB}/interactions#section-reveal` },
    "hero-motion": { label: "Hero illustration motion", href: `${LAB}/interactions#hero-motion` },
    "link-hover": { label: "Text link hover", href: `${LAB}/interactions#link-hover` },
    "footer-layout": { label: "Footer layout", href: `${LAB}/interactions#footer-layout` },
};
export const slotIds = Object.keys(slots);
export const palettes = [{ id: "studio-green", name: "Studio green", versions: ["v1"] }];
/**
 * Site-wide motion decisions. Each option is working code in its own file:
 * components/design-lab/experiments/<slot>/<variant>/<version>.tsx
 */
export const interactionSlots = [
    {
        id: "faq-toggle",
        question: "How should a question open?",
        where: "Homepage, service, area and pricing FAQs, in English and Arabic.",
        variants: [
            { id: "swap", name: "Plus–minus swap", idea: "The sign swaps from + to −, and the answer drops in 6px while it fades.", versions: ["v1"], live: false },
            { id: "fold", name: "Folding plus", idea: "The upright bar of the + folds flat into a −, and the answer opens and closes with its real height.", versions: ["v1"] },
            { id: "wipe", name: "Clean wipe", idea: "The answer is wiped into view from the reading edge, like a squeegee pass, with a thin line under the open question.", versions: ["v1"] },
            { id: "ring", name: "Soft ring", idea: "The +/− sits in a thin circle that fills with tint when open; the answer slides open with its height.", versions: ["v1"] },
        ],
    },
    {
        id: "cta-motion",
        question: "How should the WhatsApp button respond?",
        where: "Every primary button: hero, sidebar, package and final CTA.",
        variants: [
            { id: "flat", name: "Colour only", idea: "Hover lightens the lime. Nothing moves.", versions: ["v1"], live: false },
            { id: "shine", name: "Shine sweep", idea: "One soft glint crosses the button on hover, like a freshly wiped surface.", versions: ["v1"] },
            { id: "sponge", name: "Sponge press", idea: "Pressing squashes the button a little and it springs back, so the tap feels physical.", versions: ["v1"] },
            { id: "bubbles", name: "Soap bubbles", idea: "While hovered, three small bubble rings rise from the button and fade.", versions: ["v1"] },
        ],
    },
    {
        id: "section-reveal",
        question: "How should sections enter as you scroll?",
        where: "Sections below the fold on every page (the Reveal component).",
        variants: [
            { id: "fade", name: "Soft fade", idea: "The section fades in over 0.35s. No movement.", versions: ["v1"], live: false },
            { id: "rise", name: "Staggered rise", idea: "The heading, then each row, rises 12px into place one after another.", versions: ["v1"] },
            { id: "wipe", name: "Squeegee wipe", idea: "The section is uncovered from the reading edge behind a thin lime line.", versions: ["v1"] },
            { id: "none", name: "No entrance", idea: "Everything is simply there. Fastest, and nothing to switch off.", versions: ["v1"] },
        ],
    },
    {
        id: "hero-motion",
        question: "Should the hero illustration move?",
        where: "The service illustration in the hero of each service page.",
        variants: [
            { id: "still", name: "Still", idea: "The illustration stays put.", versions: ["v1"], live: false },
            { id: "float", name: "Gentle float", idea: "The sofa rises and settles 6px every few seconds, and its floor shadow breathes with it.", versions: ["v1"] },
            { id: "steam", name: "Rising steam", idea: "Three thin wisps rise above the sofa: a quiet nod to hot water extraction.", versions: ["v1"] },
            { id: "glints", name: "Sparkle glints", idea: "Small four-point sparkles twinkle on the fabric in turn, as if just cleaned.", versions: ["v1"] },
        ],
    },
    {
        id: "link-hover",
        question: "How should text links respond?",
        where: "\"All services\", \"Compare prices\", guides and other text links.",
        variants: [
            { id: "underline", name: "Underline", idea: "An underline appears and the arrow nudges 3px.", versions: ["v1"], live: false },
            { id: "draw", name: "Drawn line", idea: "A line draws from the reading edge on hover and leaves from the far edge.", versions: ["v1"] },
            { id: "tint", name: "Tint sweep", idea: "A pale lime tint wipes in behind the words, like a cloth pass.", versions: ["v1"] },
            { id: "glide", name: "Arrow glide", idea: "The arrow slides out of the far edge and comes back in from the near one.", versions: ["v1"] },
        ],
    },
    {
        id: "footer-layout",
        question: "How should the footer be laid out?",
        where: "The footer on every English and Arabic page.",
        variants: [
            {
                id: "columns",
                name: "Balanced columns",
                idea: "Brand, contact and social on one side, four link columns beside them (Pest Control has its own column), then one licence line and the legal row. Flat, no cards, light tint.",
                versions: ["v1"],
            },
            {
                id: "centred",
                name: "Centred minimal",
                idea: "Everything on one centred column: logo, one row of links, phone and email, social logos, then licence and legal in two quiet lines. The shortest footer on a phone.",
                versions: ["v1"],
            },
        ],
    },
];
/** The source file a decision protects, relative to the project root. Null if the variant is unknown. */
export function sourceFor(slot, variantId, version) {
    if (slot === "palette") {
        return palettes.some((p) => p.id === variantId && p.versions.includes(version)) ? "src/lib/design-lab/tokens.js" : null;
    }
    const interaction = interactionSlots.find((item) => item.id === slot);
    if (interaction) {
        const option = interaction.variants.find((item) => item.id === variantId);
        return option?.versions.includes(version) ? `src/components/design-lab/experiments/${slot}/${variantId}/${version}.jsx` : null;
    }
    const variant = servicePageVariants.find((item) => item.id === variantId);
    if (!variant?.versions.includes(version))
        return null;
    // The live variant protects the real page, so an edit to the public template is flagged as drift.
    return variant.live
        ? "app/(en)/services/[slug]/page.tsx"
        : "src/app/design-lab/Studies.jsx";
}
