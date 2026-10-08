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
      // Apex-domain requests for legacy URLs that have a final destination go there in
      // ONE hop (apex -> final), instead of apex -> www -> final. Must sit above the
      // generic apex rule. Covers /luxury-interior-design (the only URL that ever
      // existed in that namespace: a single WordPress page with no child pages) and /en/privacy.
      { source: "/luxury-interior-design", has: [{ type: "host", value: "baitalebdaa.com" }], destination: "https://www.baitalebdaa.com/en/interior-design/dubai", permanent: true },
      { source: "/luxury-interior-design/", has: [{ type: "host", value: "baitalebdaa.com" }], destination: "https://www.baitalebdaa.com/en/interior-design/dubai", permanent: true },
      { source: "/en/privacy", has: [{ type: "host", value: "baitalebdaa.com" }], destination: "https://www.baitalebdaa.com/en/privacy-policy", permanent: true },
      { source: "/en/privacy/", has: [{ type: "host", value: "baitalebdaa.com" }], destination: "https://www.baitalebdaa.com/en/privacy-policy", permanent: true },
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
      // /en/privacy was never a real page; it is the natural guess for the policy URL.
      { source: "/en/privacy", destination: "/en/privacy-policy", permanent: true },
      { source: "/en/privacy/", destination: "/en/privacy-policy", permanent: true },
      // Legacy URLs found in the Search Console Page-indexing report (5-7 Oct 2026) that still
      // 404ed. Each maps to its real current equivalent, single hop.
      { source: "/ar/privacy", destination: "/ar/privacy-policy", permanent: true },
      { source: "/ar/privacy/", destination: "/ar/privacy-policy", permanent: true },
      { source: "/terms-conditions", destination: "/en/terms-and-conditions", permanent: true },
      { source: "/terms-conditions/", destination: "/en/terms-and-conditions", permanent: true },
      { source: "/commercial-&-office-interiors", destination: "/en/office-fit-out/dubai", permanent: true },
      { source: "/commercial-&-office-interiors/", destination: "/en/office-fit-out/dubai", permanent: true },
      { source: "/commercial-%26-office-interiors", destination: "/en/office-fit-out/dubai", permanent: true },
      { source: "/commercial-%26-office-interiors/", destination: "/en/office-fit-out/dubai", permanent: true },
      // /luxury-interior-design/services showed real Search Console impressions (position ~7),
      // proving the URL existed; /luxury-interior-design/pricing has no such evidence and stays 404.
      { source: "/luxury-interior-design/services", destination: "/en/our-services", permanent: true },
      { source: "/luxury-interior-design/services/", destination: "/en/our-services", permanent: true },

      // Old WordPress pages that redirected (via the trailing-slash rule) and then 404ed. Each now goes
      // to the genuinely equivalent current page. /faq-frequently-asked-questions, /bespoke-upholstery-curtains
      // and the WordPress system URLs have no real equivalent and stay 404.
      { source: "/our-process", destination: "/en/process", permanent: true },
      { source: "/our-process/", destination: "/en/process", permanent: true },
      { source: "/interior-insights-trends-blog", destination: "/en/media", permanent: true },
      { source: "/interior-insights-trends-blog/", destination: "/en/media", permanent: true },
      { source: "/premium-fit-out-works", destination: "/en/fit-out/dubai", permanent: true },
      { source: "/premium-fit-out-works/", destination: "/en/fit-out/dubai", permanent: true },
      { source: "/residential-villas", destination: "/en/residential-interior-design/dubai", permanent: true },
      { source: "/residential-villas/", destination: "/en/residential-interior-design/dubai", permanent: true },
      { source: "/modern-arabic-majlis-design", destination: "/en/interior-design/dubai", permanent: true },
      { source: "/modern-arabic-majlis-design/", destination: "/en/interior-design/dubai", permanent: true },
      { source: "/kitchen-wardrobe-solutions", destination: "/en/our-services", permanent: true },
      { source: "/kitchen-wardrobe-solutions/", destination: "/en/our-services", permanent: true },
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
      { source: "/custom-made-furniture", destination: "/en/custom-wardrobes/dubai", permanent: true },
      { source: "/custom-made-furniture/", destination: "/en/custom-wardrobes/dubai", permanent: true },
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
