# Week 1 — SEO Baseline + Indexing

**Plan week:** 1 of 13 (24–30 Oct 2026), from `Bait_Al_Ebdaa_90_Day_Weekly_Plan.xlsx`
**Checked:** 9 Nov 2026, on the live site (www.baitalebdaa.com) and a local production build of `main` (`04d08c88`). Both gave the same results.

| Week 1 task | Status |
|---|---|
| Technical crawl | Done. No problems found |
| Redirects / 404 review | Done. No problems found |
| Internal-link depth audit | Done. No problems found |
| Classify non-indexed URLs | Expected classes listed below. Needs the Search Console export to confirm |
| Search Console baseline lock | **Waiting for the Search Console export** (see the last section) |

---

## 1. Technical crawl

The crawl started at the homepage, followed every internal link, then checked every URL in `sitemap.xml`.

| Check | Result |
|---|---|
| Pages reached by internal links | 218 (216 return 200, plus 2 redirects: `/en/account` and `/ar/account`, which go to the login page) |
| URLs in the sitemap | 200. All return 200, all are indexable, and every canonical points to the page itself |
| Indexable pages missing from the sitemap | 0 |
| Sitemap URLs that no internal link reaches (orphans) | 0 |
| Broken internal links (4xx/5xx) | 0 |
| Missing or duplicate titles and meta descriptions on indexable pages | 0 |
| Indexable pages without exactly one H1 | 0 |
| hreflang (en / ar / x-default) | Present on every page, and each language version links back to the other |
| Automated SEO and site-health tests (`npm run test:seo`) | All 49 pass |

## 2. Redirects and 404s

- All **50 legacy redirects** in `next.config.mjs` reach a 200 page in **one hop** (308). There are no redirect chains and no loops.
- A trailing slash on a live URL is removed in one hop. A request to the apex domain (baitalebdaa.com) goes straight to www.
- Unknown URLs return a real **404** on the live site: made-up pages, projects, articles and cities, `/wp-admin`, `/feed`, and the old WordPress sitemaps. None of them return 200 with an error message, so there are no soft 404s.
- These old URLs are left as 404 on purpose, as the notes in `next.config.mjs` explain: `/bespoke-upholstery-curtains/`, `/faq-frequently-asked-questions/` and the WordPress system URLs. Each one first loses its trailing slash (308), then returns 404. If Search Console shows clicks to the curtains URL, that is a reason to build a real curtains and upholstery page. Don't redirect it to a loosely related page.
- `/en` returns 200 with its canonical pointing to `/`, so it is not a separate page in Google's eyes. Nothing on the site links to `/en`.
- Note: on a Windows dev machine, `/EN/about` loads the page with an Arabic canonical. This happens only because Windows file names aren't case-sensitive. The live site returns 404 for it.

## 3. Internal-link depth

| Clicks from the homepage | Sitemap URLs |
|---|---|
| 0 | 1 |
| 1 | 44 |
| 2 | 99 |
| 3 | 56 |
| 4 or more | **0** |

Every indexable page is three clicks or fewer from the homepage, and every sitemap URL has more than two internal pages linking to it.

## 4. URL inventory and expected index status

These figures show what Search Console *should* report. Anything outside them is a finding.

| Group | URLs | Should be | Why |
|---|---|---|---|
| Homepage (EN `/`, AR `/ar`) | 2 | Indexed | — |
| Main pages (services, projects, process, contact, pricing, about, media, legal pages…) × 2 languages | 30 | Indexed | — |
| Project pages | 12 | Indexed | The 6 real projects × 2 languages |
| Articles and cost guides | 20 | Indexed | — |
| Service × emirate pages (17 services × Dubai, Abu Dhabi, Sharjah, Ajman) | 136 | Indexed | `approved: true` in `seo-pages.json` |
| **Total in the sitemap** | **200** | **Indexed** | |
| Other service × location pages (districts; RAK, Fujairah and UAQ; and the "UAE" pages) | 884 (442 × 2) | "Excluded by 'noindex' tag" | Guardrail: no thin city or district pages are indexed. Not linked and not in the sitemap |
| `/reviews` | 2 | "Excluded by 'noindex' tag" | `REVIEWS` is empty. The page becomes indexable once there are genuine reviews (plan Week 8) |
| `/products/*` | 12 | "Excluded by 'noindex' tag" | Category pages without enough content of their own |
| `/en/account*`, `/ar/account*`, `/admin`, `/api/` | — | "Blocked by robots.txt" | Expected. The account link appears in every page header, so Google may also show them as "Indexed, though blocked by robots.txt". That is harmless. |
| Legacy WordPress URLs | 50 redirects | "Page with redirect" | Expected. These reports clear up over time. |

**Points for later weeks:**
- The 34 `…/uae` pages (17 × 2 languages) are noindex. Searches like "interior design UAE" are a natural target. If Search Console shows impressions for them, consider approving the strongest ones in Week 5 (near-win SEO).
- `/reviews` is linked from the site but has no reviews. Fix this through the genuine-reviews workflow (Week 8), not with placeholder reviews.

## 5. Search Console baseline (still to do)

This needs Search Console access. Export the following from the `https://www.baitalebdaa.com` property:

1. **Performance → Search results**, last 28 days and last 3 months, filtered to *Web*: the Queries, Pages and Countries tabs (Export → CSV).
2. **Indexing → Pages**: the summary numbers, plus an export of each reason under "Why pages aren't indexed".
3. **Sitemaps**: the status of `sitemap.xml` and its submitted vs indexed counts.

Record the starting numbers here. They are the Week 1 actuals for the plan's Weekly Tracker.

| Metric (last 28 days, to ____) | Value |
|---|---|
| Impressions | |
| Clicks | |
| CTR | |
| Average position | |
| Share of impressions from the UAE | |
| Indexed pages (of 200 in the sitemap) | |
| Queries ranking 4–20, with impressions (Week 5 near-win list) | |
