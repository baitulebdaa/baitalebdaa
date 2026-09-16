const BASE = "https://baitalebdaa.com";

// Builds a complete, self-referencing metadata object for a static page (one not
// covered by the SEO map's generateMetadata in [service]/[location]/page.jsx).
// `path` is the route under /{lang}/, e.g. "our-services", "" for the home page,
// or "our-projects/government-authority" for a project detail page.
export function buildPageMetadata({ lang, path, title, description }) {
  const otherLang = lang === "en" ? "ar" : "en";
  const cleanPath = path ? `/${path}` : "";
  const selfUrl = `${BASE}/${lang}${cleanPath}/`;
  const otherUrl = `${BASE}/${otherLang}${cleanPath}/`;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: selfUrl,
      languages: {
        [lang]: selfUrl,
        [otherLang]: otherUrl,
        "x-default": lang === "en" ? selfUrl : otherUrl,
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
    email: "sales@baitalebdaa.ae",
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
