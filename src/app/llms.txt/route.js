// /llms.txt: a plain-markdown map of the site for AI assistants and answer engines
// (llmstxt.org format). Built from the same data as the sitemap, so new articles and
// indexable service pages appear here automatically. Facts are limited to what the site
// already states on its pages.
import seoData from "../../data/seo-pages.json";
import { isPageIndexable } from "../../lib/seo-pages";
import { dictionaries } from "../../i18n/dictionaries";
import { SOCIAL_PROFILES } from "../../data/social-profiles";
import { SITE_URL } from "../../lib/schema-ids";

export const dynamic = "force-static";

function buildLlmsTxt() {
  const en = dictionaries.en;
  const articles = [en.mediaPage.featuredArticle, ...en.mediaPage.articles];
  const servicePages = Object.values(seoData.pages.en)
    .filter(isPageIndexable)
    .map((page) => `- [${page.h1}](${page.canonical})`);

  return [
    "# Bait Al Ebdaa",
    "",
    "> Interior design, turnkey fit-out and renovation company delivering villa, apartment and office projects in all seven emirates of the UAE. Custom joinery is manufactured in its own 15,000 sq ft factory in Jurf Industrial 2, Ajman, with a 5-year workmanship guarantee on the joinery it makes and installs.",
    "",
    "Key facts:",
    "- Delivery area: all seven emirates (Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, Umm Al Quwain).",
    "- Registered address and factory: Showroom No. 052004009, Jurf Industrial 2, Ajman, UAE.",
    "- Contact: +971 58 262 1717 (phone and WhatsApp), info@baitalebdaa.com.",
    "- Opening hours: Monday to Saturday, 8:00 AM to 10:00 PM (UAE time).",
    "- Design, authority approvals, fit-out and joinery are delivered by one team under one contract.",
    "- Languages: English and Arabic. Every page below has an Arabic version under /ar/.",
    "- Prices on the site are indicative starting prices in AED, excluding VAT.",
    "",
    "## Company",
    `- [About Bait Al Ebdaa](${SITE_URL}/en/about)`,
    `- [Services overview](${SITE_URL}/en/our-services)`,
    `- [Design and delivery process](${SITE_URL}/en/process)`,
    `- [Pricing guide (AED starting prices)](${SITE_URL}/en/pricing)`,
    `- [Projects](${SITE_URL}/en/our-projects)`,
    `- [Case study: 50,500 sq ft government authority headquarters, Dubai Academic City](${SITE_URL}/en/our-projects/government-authority)`,
    `- [Contact and free site survey](${SITE_URL}/en/contact)`,
    "",
    "## Services by city",
    ...servicePages,
    `- [Furniture maintenance and care](${SITE_URL}/en/furniture-maintenance-care)`,
    "",
    "## Guides",
    ...articles.map((article) => `- [${article.title}](${SITE_URL}/en/media/${article.slug})`),
    "",
    "## Optional",
    `- [Service level agreement](${SITE_URL}/en/service-level-agreement)`,
    `- [Refund policy](${SITE_URL}/en/refund-policy)`,
    `- [Terms and conditions](${SITE_URL}/en/terms-and-conditions)`,
    ...SOCIAL_PROFILES.map((profile) => `- [${profile.network}](${profile.url})`),
    "",
  ].join("\n");
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
