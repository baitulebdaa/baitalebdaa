import { ORGANIZATION_ID, ORG_REF, SITE_URL as BASE, WEBSITE_ID } from "./schema-ids";
import { SOCIAL_PROFILES } from "../data/social-profiles";
import { DEFAULT_BUSINESS } from "../data/business";

// Builds a complete, self-referencing metadata object for a static page (one not
// covered by the SEO map's generateMetadata in [service]/[location]/page.jsx).
// `path` is the route under /{lang}/, e.g. "our-services", "" for the home page,
// or "our-projects/government-authority" for a project detail page.
export function buildPageMetadata({ lang, path, title, description }) {
  const cleanPath = path ? `/${path}` : "";
  const isHome = path === "";

  // The homepage's English version lives at the bare domain root — src/proxy.js
  // rewrites "/" to "/en" internally so it renders, but Google should index the
  // clean https://www.baitalebdaa.com/ URL, not .../en/. Both the English and
  // Arabic renders of the homepage need to agree on that same URL for hreflang
  // to self-reference correctly in both directions.
  //
  // No trailing slash on non-home paths: this app has no trailingSlash config,
  // so a route only serves 200 without one — a trailing-slash URL 308-redirects
  // to it instead, which makes an unsuitable canonical/hreflang target (Google
  // treats "canonical points to a redirecting URL" as a real issue). The
  // homepage root ("/") is the one legitimate exception since "/" IS the route.
  const enUrl = isHome ? `${BASE}/` : `${BASE}/en${cleanPath}`;
  const arUrl = isHome ? `${BASE}/ar` : `${BASE}/ar${cleanPath}`;
  const selfUrl = lang === "en" ? enUrl : arUrl;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: selfUrl,
      languages: {
        en: enUrl,
        ar: arUrl,
        "x-default": enUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: selfUrl,
      siteName: "Bait Al Ebdaa",
      locale: lang === "ar" ? "ar_AE" : "en_AE",
      type: "website",
      images: [{ url: "/assets/bait-al-ebdaa-luxury-interior-design-dubai-og.jpg", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/assets/bait-al-ebdaa-luxury-interior-design-dubai-og.jpg"],
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${BASE}/`,
    name: "Bait Al Ebdaa",
    alternateName: ["Bait Al Ebdaa Interiors", "بيت الإبداع"],
    inLanguage: ["en-AE", "ar-AE"],
    publisher: ORG_REF,
  };
}

// Services the business actually sells (src/data/seo-pages.json) plus the standalone
// furniture-care service — the topics search and AI engines should associate with the entity.
const KNOWS_ABOUT = [
  "Interior design",
  "Turnkey fit-out",
  "Office fit-out",
  "Restaurant fit-out",
  "Retail fit-out",
  "Villa renovation",
  "Apartment renovation",
  "Office renovation",
  "Custom architectural joinery",
  "Custom wardrobes",
  "Kitchen design",
  "Kitchen renovation",
  "Furniture maintenance and care",
];

const ORG_DESCRIPTION = {
  en: "Interior design, turnkey fit-out and renovation company delivering villa, apartment and office projects in all seven emirates of the UAE, with custom joinery manufactured in its own 15,000 sq ft factory in Jurf Industrial 2, Ajman.",
  ar: "شركة تصميم داخلي وتجهيز متكامل وتجديد تنفّذ مشاريع الفلل والشقق والمكاتب في جميع الإمارات السبع، مع نجارة مخصصة تُصنع في مصنعها الخاص بمساحة 15,000 قدم مربع في الجرف الصناعية 2 بعجمان.",
};

/** `business` is the contact record edited in the admin panel (src/data/business.js). */
export function organizationJsonLd(lang = "en", business = DEFAULT_BUSINESS) {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": ORGANIZATION_ID,
    name: "Bait Al Ebdaa",
    alternateName: "بيت الإبداع",
    description: ORG_DESCRIPTION[lang] || ORG_DESCRIPTION.en,
    url: BASE,
    logo: { "@type": "ImageObject", url: `${BASE}/assets/logo.png`, width: 2170, height: 725 },
    image: `${BASE}/assets/bait-al-ebdaa-luxury-interior-design-dubai-og.jpg`,
    telephone: business.phone,
    email: business.email,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: business.phone,
      email: business.email,
      areaServed: "AE",
      availableLanguage: ["English", "Arabic"],
    },
    address: {
      "@type": "PostalAddress",
      // The default address's street part, or the whole edited address once it changes.
      streetAddress:
        business.address.en === DEFAULT_BUSINESS.address.en ? "Showroom No. 052004009, Jurf Industrial 2" : business.address.en,
      addressLocality: "Ajman",
      addressRegion: "Ajman",
      addressCountry: "AE",
    },
    // District-level approximation for Jurf Industrial 2, Ajman — not the exact
    // showroom pin. Replace with the precise lat/long from your Google Business
    // Profile listing (Maps > right-click your pin > coordinates shown at top).
    geo: {
      "@type": "GeoCoordinates",
      latitude: 25.40447,
      longitude: 55.491127,
    },
    priceRange: "$$$",
    // Confirmed by the business on 2026-10-12: Monday to Saturday, 8 AM to 10 PM. Keep this,
    // the chat prompt (src/app/api/chat/route.js), llms.txt and the Google Business Profile in sync.
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "22:00",
    },
    // Owner confirmed 13 Oct 2026: the business delivers in all seven emirates.
    areaServed: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Fujairah", "Umm Al Quwain"].map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    knowsAbout: KNOWS_ABOUT,
    sameAs: SOCIAL_PROFILES.map((profile) => profile.url),
  };
}
