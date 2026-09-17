const BASE = "https://www.baitalebdaa.com";

// Builds a complete, self-referencing metadata object for a static page (one not
// covered by the SEO map's generateMetadata in [service]/[location]/page.jsx).
// `path` is the route under /{lang}/, e.g. "our-services", "" for the home page,
// or "our-projects/government-authority" for a project detail page.
export function buildPageMetadata({ lang, path, title, description }) {
  const cleanPath = path ? `/${path}` : "";
  const isHome = path === "";

  // The homepage's English version lives at the bare domain root — middleware
  // rewrites "/" to "/en" internally so it renders, but Google should index the
  // clean https://www.baitalebdaa.com/ URL, not .../en/. Both the English and
  // Arabic renders of the homepage need to agree on that same URL for hreflang
  // to self-reference correctly in both directions.
  const enUrl = isHome ? `${BASE}/` : `${BASE}/en${cleanPath}/`;
  const arUrl = `${BASE}/ar${cleanPath}/`;
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
    areaServed: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Fujairah", "Umm Al Quwain"],
    sameAs: [
      "https://www.facebook.com/baitalebdaa",
      "https://www.instagram.com/baitalebdaa",
      "https://www.linkedin.com/company/baitalebdaa",
      "https://www.youtube.com/baitalebdaa",
    ],
  };
}
