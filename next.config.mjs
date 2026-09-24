/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
  // Without this, Next's own built-in trailing-slash normalization runs BEFORE the
  // custom redirects below, so a legacy URL like /portfolio/ (the old site's real,
  // slash-terminated format) takes 2 hops: /portfolio/ -> /portfolio (Next's own
  // redirect) -> /en/our-projects (ours). skipTrailingSlashRedirect hands trailing-
  // slash handling entirely to the redirects() rules instead, so each legacy URL
  // — slash or no slash — resolves in exactly one hop. Verified against a live local
  // server (see redirect verification pass) after adding this.
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      // www.baitalebdaa.com is the canonical hostname — send every apex-domain
      // request there permanently so there's only ever one indexable URL per page.
      {
        source: "/:path*",
        has: [{ type: "host", value: "baitalebdaa.com" }],
        destination: "https://www.baitalebdaa.com/:path*",
        permanent: true,
      },
      // Legacy URLs from the previous site — each maps to its closest live topical
      // equivalent, single hop, no chains.
      // /about-us/ and /privacy-policy/ — real /en/about and /en/privacy-policy pages
      // now exist (added 2026-09-24) using only verified facts already established
      // elsewhere on the site; these redirects ship in the same deploy as those pages.
      { source: "/about-us", destination: "/en/about", permanent: true },
      { source: "/about-us/", destination: "/en/about", permanent: true },
      { source: "/privacy-policy", destination: "/en/privacy-policy", permanent: true },
      { source: "/privacy-policy/", destination: "/en/privacy-policy", permanent: true },
      // /furniture-maintenance-care/ was earning real Search Console clicks/impressions
      // at the un-prefixed URL but 404s without an explicit rule below, because the
      // generic trailing-slash catch-all at the bottom of this array strips the slash
      // without adding the required /en/ prefix — confirmed 2026-09-24 GSC audit.
      { source: "/furniture-maintenance-care", destination: "/en/furniture-maintenance-care", permanent: true },
      { source: "/furniture-maintenance-care/", destination: "/en/furniture-maintenance-care", permanent: true },
      // /bespoke-upholstery-curtains/ deliberately has NO redirect yet — reviewed
      // 2026-09-24. Bait Al Ebdaa still sells curtains and upholstered joinery (see
      // pricing.js: curtainsManual, curtainsSomfy, bed-headboard, banquette), so the
      // service isn't discontinued, but there is no dedicated page about it — /en/pricing
      // is a multi-service price catalog, not a curtains/upholstery service page, so
      // redirecting there would be a weak soft-404-style destination. Correct fix is a
      // real page, not a redirect to a loosely related one. Left as a genuine 404 until
      // that page exists.
      { source: "/en/services", destination: "/en/our-services", permanent: true },
      { source: "/services", destination: "/en/our-services", permanent: true },
      { source: "/our-services", destination: "/en/our-services", permanent: true },
      { source: "/our-services/", destination: "/en/our-services", permanent: true },
      { source: "/contact-us", destination: "/en/contact", permanent: true },
      { source: "/contact-us/", destination: "/en/contact", permanent: true },
      { source: "/portfolio", destination: "/en/our-projects", permanent: true },
      { source: "/portfolio/", destination: "/en/our-projects", permanent: true },
      { source: "/our-service-areas", destination: "/en/our-services", permanent: true },
      { source: "/our-service-areas/", destination: "/en/our-services", permanent: true },
      { source: "/custom-made-furniture", destination: "/en/custom-wardrobes/uae", permanent: true },
      { source: "/custom-made-furniture/", destination: "/en/custom-wardrobes/uae", permanent: true },
      { source: "/commercial-office-interiors", destination: "/en/office-fit-out/dubai", permanent: true },
      { source: "/commercial-office-interiors/", destination: "/en/office-fit-out/dubai", permanent: true },
      { source: "/luxury-interior-design", destination: "/en/interior-design/dubai", permanent: true },
      { source: "/luxury-interior-design/", destination: "/en/interior-design/dubai", permanent: true },
      { source: "/full-home-renovation", destination: "/en/villa-renovation/dubai", permanent: true },
      { source: "/full-home-renovation/", destination: "/en/villa-renovation/dubai", permanent: true },
      // Restores trailing-slash stripping for every OTHER route now that
      // skipTrailingSlashRedirect has turned Next's automatic version off site-wide —
      // without this, every one of the ~1,020 service/location pages (and every other
      // route) would serve as two separate live 200 URLs (with vs without trailing
      // slash) instead of redirecting to one canonical form. Placed last so the more
      // specific legacy-URL rules above take precedence for those exact paths.
      { source: "/:path+/", destination: "/:path+", permanent: true },
    ];
  },
};

export default nextConfig;
