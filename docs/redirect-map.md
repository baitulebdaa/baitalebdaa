# Legacy URL Redirection & Canonical Mapping
**Client:** Bait Al Ebdaa (`www.baitalebdaa.com`)  
**Standard:** 1-hop 301 permanent redirects, zero redirect chains, zero loops, intent-preserving destinations.

---

## Redirection Architecture in `next.config.mjs`

| Source Legacy URL | Normalized Target URL | HTTP Status | Rationale & Intent Consolidation | Implementation Status |
|---|---|---|---|---|
| `/services` | `/en/our-services` | 301 Permanent | Root namespace consolidation to canonical localized services directory. | **Active** in `next.config.mjs` |
| `/en/services` | `/en/our-services` | 301 Permanent | Canonicalization of `/en/services` path variation to `/en/our-services`. | **Active** in `next.config.mjs` |
| `/portfolio` / `/portfolio/` | `/en/our-projects` | 301 Permanent | Legacy portfolio archive consolidated into verified project gallery. | **Active** in `next.config.mjs` |
| `/about-us` / `/about-us/` | `/en/about` | 301 Permanent | Legacy about page to verified studio about page. | **Active** in `next.config.mjs` |
| `/contact-us` / `/contact-us/` | `/en/contact` | 301 Permanent | Direct commercial lead channel preservation. | **Active** in `next.config.mjs` |
| `/our-process` / `/our-process/` | `/en/process` | 301 Permanent | Workflow and delivery methodology page consolidation. | **Active** in `next.config.mjs` |
| `/privacy-policy` / `/privacy-policy/` | `/en/privacy-policy` | 301 Permanent | Compliance and legal policy destination. | **Active** in `next.config.mjs` |
| `/en/privacy` / `/en/privacy/` | `/en/privacy-policy` | 301 Permanent | Fix common user & crawler mistyped policy path. | **Active** in `next.config.mjs` |
| `/ar/privacy` / `/ar/privacy/` | `/ar/privacy-policy` | 301 Permanent | Arabic compliance path consolidation. | **Active** in `next.config.mjs` |
| `/terms-conditions` / `/terms-conditions/` | `/en/terms-and-conditions` | 301 Permanent | Legal terms consolidation. | **Active** in `next.config.mjs` |
| `/luxury-interior-design` / `.../` | `/en/interior-design/dubai` | 301 Permanent | High-authority legacy landing page redirected to primary Dubai interior design pillar. | **Active** in `next.config.mjs` |
| `/luxury-interior-design/services` / `.../` | `/en/our-services` | 301 Permanent | Search Console legacy impressions (~position 7) consolidated to services directory. | **Active** in `next.config.mjs` |
| `/luxury-interior-design/pricing` / `.../` | `/en/pricing` | 301 Permanent | Redirects legacy pricing inquiries directly to the live verified AED pricing guide. | **Added & Active** in `next.config.mjs` |
| `/premium-fit-out-works` / `.../` | `/en/fit-out/dubai` | 301 Permanent | Legacy fit-out keyword URL mapped to primary Dubai fit-out page. | **Active** in `next.config.mjs` |
| `/commercial-office-interiors` / `.../` | `/en/office-fit-out/dubai` | 301 Permanent | Legacy commercial office URL mapped to Dubai office fit-out pillar. | **Active** in `next.config.mjs` |
| `/commercial-&-office-interiors` / `.../` | `/en/office-fit-out/dubai` | 301 Permanent | Encoded & ampersand variation redirected to avoid crawler 404s. | **Active** in `next.config.mjs` |
| `/residential-villas` / `.../` | `/en/residential-interior-design/dubai` | 301 Permanent | Residential villa fit-out intent preserved. | **Active** in `next.config.mjs` |
| `/full-home-renovation` / `.../` | `/en/villa-renovation/dubai` | 301 Permanent | Full-home renovation intent mapped to Dubai villa renovation pillar. | **Active** in `next.config.mjs` |
| `/modern-arabic-majlis-design` / `.../` | `/en/interior-design/dubai` | 301 Permanent | Custom majlis interior design mapped to primary interior design pillar. | **Active** in `next.config.mjs` |
| `/custom-made-furniture` / `.../` | `/en/custom-wardrobes/dubai` | 301 Permanent | Bespoke furniture intent mapped to specialized custom joinery & wardrobe pillar. | **Active** in `next.config.mjs` |
| `/kitchen-wardrobe-solutions` / `.../` | `/en/our-services` | 301 Permanent | Combined solutions path directed to full services overview. | **Active** in `next.config.mjs` |
| `/furniture-maintenance-care` / `.../` | `/en/furniture-maintenance-care` | 301 Permanent | Search Console click path normalized with localized prefix. | **Active** in `next.config.mjs` |
| `baitalebdaa.com/*` (Apex domain) | `https://www.baitalebdaa.com/*` | 301 Permanent | Canonical domain enforcement (single hop apex -> www destination). | **Active** in `next.config.mjs` |
| `/*path+/` (Generic trailing slash) | `/*path+` | 308/301 Permanent | Global trailing slash stripping via `skipTrailingSlashRedirect: true` rule. | **Active** in `next.config.mjs` |

