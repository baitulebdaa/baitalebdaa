const BASE = "https://www.baitalebdaa.com";

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
      images: [{ url: "/assets/hero-penthouse.jpg", width: 1672, height: 941, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/assets/hero-penthouse.jpg"],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "Bait Al Ebdaa",
    url: BASE,
    logo: `${BASE}/assets/logo.png`,
    image: `${BASE}/assets/hero-penthouse.jpg`,
    telephone: "+971524621919",
    email: "info@baitalebdaa.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Showroom No. 052004009, Jurf Industrial 2",
      addressLocality: "Ajman",
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
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "09:00",
      closes: "18:00",
    },
    areaServed: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Fujairah", "Umm Al Quwain"],
    sameAs: [
      "https://www.facebook.com/baitalebdaa",
      "https://www.instagram.com/baitalebdaa",
      "https://www.linkedin.com/company/baitalebdaa",
      "https://www.youtube.com/baitalebdaa",
    ],
  };
}
