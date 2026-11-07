# Internal Linking Architecture & Cluster Map
**Client:** Bait Al Ebdaa (`www.baitalebdaa.com`)  
**Standard:** Contextual, topic-clustered link graph with descriptive anchor text, zero dead fragment links (`href="#"`), and clear conversion funnels.

---

## 1. Hub-and-Spoke Topic Cluster Architecture

```
                       ┌─────────────────────────┐
                       │     Homepage (Hub)      │
                       │ https://www.baitalebdaa │
                       └────────────┬────────────┘
                                    │
       ┌────────────────────────────┼────────────────────────────┐
       ▼                            ▼                            ▼
┌──────────────┐             ┌──────────────┐             ┌──────────────┐
│ Core Service │             │  Portfolio   │             │   Pricing    │
│   Pillars    │             │ Case Studies │             │    Guide     │
└──────┬───────┘             └──────┬───────┘             └──────┬───────┘
       │                            │                            │
       └────────────────────────────┼────────────────────────────┘
                                    │
                                    ▼
                     ┌─────────────────────────────┐
                     │ Editorial Guides / AEO FAQs │
                     │   /en/media/[article-slug]  │
                     └──────────────┬──────────────┘
                                    │
                                    ▼
                     ┌─────────────────────────────┐
                     │  Conversion Endpoint (CTA)  │
                     │  /en/contact (Free Survey)  │
                     │  WhatsApp / Direct Call     │
                     └─────────────────────────────┘
```

---

## 2. Cluster Linking Matrix

| Cluster Theme | Pillar Page (Hub) | Supporting Spoke Content & Case Studies | Informational Guide / AEO Asset | Conversion Target Anchor & URL |
|---|---|---|---|---|
| **Luxury Interior Design** | `/en/interior-design/dubai` | - `/en/our-projects/dubai-hills-estate-villa`<br/>- `/en/our-projects/palm-jumeirah-penthouse`<br/>- `/en/residential-interior-design/dubai` | `/en/media/luxury-villa-interior-design-trends-dubai` | "Request an Interior Design Consultation"<br/>-> `/en/contact` |
| **Commercial & Turnkey Fit-Out** | `/en/fit-out/dubai` | - `/en/office-fit-out/dubai`<br/>- `/en/our-projects/downtown-dubai-tech-hq`<br/>- `/en/our-projects/government-authority` | Cost guide: `/en/media/office-fit-out-cost-guide-dubai`<br/>Approvals: Dubai Municipality & DDA requirements | "Schedule a Free Commercial Fit-Out Survey"<br/>-> `/en/contact` |
| **Bespoke Architectural Joinery** | `/en/joinery/ajman` | - `/en/custom-wardrobes/dubai`<br/>- `/en/kitchen-design/dubai`<br/>- `/en/furniture-maintenance-care` | Joinery guide: Wood veneer vs solid wood performance in UAE climate | "Tour Our 15,000 sq ft Ajman Joinery Factory"<br/>-> `/en/contact` |
| **Turnkey Villa Renovation** | `/en/villa-renovation/dubai` | - `/en/our-projects/al-barari-eco-villa`<br/>- `/en/our-projects/saadiyat-island-villa`<br/>- `/en/apartment-renovation/dubai` | Renovation guide: Budgeting and structural permissions in UAE gated communities | "Get a Villa Renovation Cost Estimate"<br/>-> `/en/pricing` & `/en/contact` |

---

## 3. Before-and-After Internal Linking Matrix

| Page Type | Previous Linking Pattern | Optimized Linking Architecture | Expected SEO & CRO Benefit |
|---|---|---|---|
| **Homepage Hero & Navigation** | Generic anchor tags and floating button links without deep cluster association. | Direct links to 8 featured services (`ServiceTileGrid`), 3 highlighted real projects, and transparent pricing explorer (`/en/pricing`). | Distributes link equity directly from homepage to high-intent transactional pages. |
| **Service Pillar Pages** | Standalone service copy with weak links to related evidence or case studies. | Every service page embeds: verified project card from same sector, pricing estimator component, FAQ accordion with structured schema, and related service pills. | Boosts topical authority; reduces bounce rate by offering direct visual proof. |
| **Project Detail Pages** | Visual gallery with isolated scope text. | Links back to primary service pillar (e.g. "Fit-Out Dubai", "Joinery Ajman"), lists similar projects, and incorporates fact-built FAQ accordion. | Creates bidirectional link loops between commercial services and real portfolio proof. |
| **Media & Editorial Guides** | Static articles written by CEO Awais ul Haq with minimal contextual commercial exits. | Contextual in-content links embedded into article body pointing to relevant service pillars, official UAE authorities (DDA, DM, Civil Defense), and `/en/contact`. | Captures top-of-funnel informational queries and funnels them directly to commercial consultation. |
| **Footer & Secondary Navigation** | Flat list of legal and company pages. | Grouped architectural hierarchy: Services, Verified Projects, Company & Legal, and Live NAP (Address, Hours, Single Phone Link). | Ensures clean crawl paths for search engine bots and AI agent scrapers. |

