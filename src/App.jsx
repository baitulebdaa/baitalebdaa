import { PhoneFold } from "./components/PhoneFold";
import Image from "next/image";
import { ArrowUpRight, Box, Calendar, Lamp, ShoppingCart, Users, Wrench } from "./components/icons";
import { Footer, Reveal, FaqSplit, ProcessTimeline } from "./components/Shared";
import { ServiceTileGrid } from "./components/ServiceTiles";
import { Estimator } from "./components/Estimator";
import { NextSteps } from "./components/NextSteps";
import { Hero, Sectors, SiteHeader } from "./components/HomeIslands";
import { isPublishedProject } from "./data/project-catalog";
import { REVIEWS } from "./data/reviews";
import { ReviewCard } from "./components/ReviewCard";
import { dictionaries } from "./i18n/dictionaries";
import { getBusiness } from "./lib/business";

// The homepage. A server component since 6 Nov 2026: until then the whole page was one client
// component, so a phone downloaded the code for every section and re-rendered all of them
// before the page responded (most of its Total Blocking Time after Google Analytics). Now
// the sections below arrive as finished HTML and only the interactive parts run in the
// browser: the header, hero slider and sector tabs (components/HomeIslands.jsx), the
// service tiles, price explorer, estimator, FAQ and the scroll reveals.

function Services({ lang, dict, business }) {
  const waMessage = encodeURIComponent(
    lang === "ar"
      ? "مرحباً! أرغب بمناقشة مشروعي معكم."
      : "Hello! I'd like to discuss my project with you."
  );
  const waHref = `https://wa.me/${business.whatsapp}?text=${waMessage}`;
  const images = ["/assets/minimalist-living-room-fluted-wall-panel-cove-lighting.jpeg", "/assets/tv-wall-unit-led-display-shelves.jpeg", "/assets/glass-door-wardrobe-matte-handles.jpeg"];
  return <section className="section section--light" id="services"><div className="shell"><Reveal className="section-heading section-heading--center"><p className="micro">{dict.servicesSection.micro}</p><h2 className="section-title" style={{whiteSpace: 'pre-wrap'}}>{dict.servicesSection.title}</h2><p className="lede">{dict.servicesSection.lede}</p></Reveal><div className="service-grid">{dict.servicesSection.items.map((s, i) => <Reveal className={`service-card service-card--${i + 1}`} delay={i * 110} key={i}><div className="service-card__image"><Image src={images[i]} alt={s.title} fill sizes="(max-width: 700px) 100vw, (max-width: 980px) 50vw, 33vw" /></div><div className="service-card__copy"><span>{s.number}</span><h3>{s.title}</h3><p>{s.body}</p><a href={waHref} target="_blank" rel="noopener noreferrer">{dict.servicesSection.discuss} <ArrowUpRight size={16} /></a></div></Reveal>)}</div></div></section>;
}

// Featured services as the same tiles the services page uses; the full list is one click away.
const FEATURED_SERVICES = ["interior-design", "residential-interior-design", "fit-out", "office-fit-out", "villa-renovation", "joinery", "custom-wardrobes", "kitchen-design"];

function ServicesDirectory({ lang, dict }) {
  const t = dict.servicesDirectory;
  return <section className="section section--light services-directory" id="all-services">
    <div className="shell">
      <Reveal className="section-heading section-heading--center"><p className="micro">{t.micro}</p><h2 className="section-title">{t.title}</h2><p className="lede">{t.lede}</p></Reveal>
      <ServiceTileGrid slugs={FEATURED_SERVICES} aftercare={false} titleTag="p" />
      <Reveal className="sd-all" delay={120}><a href={`/${lang}/our-services`} className="outline-button outline-button--dark">{dict.servicesSection.viewAllServices} <ArrowUpRight size={16} /></a></Reveal>
    </div>
  </section>;
}

// The problems the studio solves (owner's design, 26 Oct 2026), set before the product
// ranges that answer them. The photo is the site's own sketch-to-render image.
const CHALLENGE_ICONS = [ShoppingCart, Box, Lamp, Users];

function Challenges({ dict }) {
  const t = dict.challengesSection;
  return <section className="section challenges" id="challenges">
    <div className="shell challenges__inner">
      <Reveal className="challenges__image"><Image src="/assets/cad-render.jpg" alt={t.imageAlt} fill sizes="(max-width: 900px) 100vw, 50vw" /></Reveal>
      <Reveal className="challenges__copy" delay={100}>
        <p className="micro">{t.micro}</p>
        <h2 className="section-title">{t.title}</h2>
        <ul className="challenges__list">{t.items.map((item, i) => { const Icon = CHALLENGE_ICONS[i]; return <li key={item.title}><span className="challenges__icon" aria-hidden="true"><Icon size={20} /></span><div><h3>{item.title}</h3><p>{item.body}</p></div></li>; })}</ul>
      </Reveal>
    </div>
  </section>;
}

// One card per product range (owner's design and confirmation, 26 Oct 2026); each opens
// WhatsApp with the range named, like the service cards above. Photos are the site's own.
// Same order as dict.productCollection.items; each card opens its page (src/data/products.js).
const PRODUCT_SLUGS = ["doors-windows", "surface-materials", "lighting", "fixed-furniture", "movable-furniture", "soft-furnishings"];
const PRODUCT_IMAGES = ["/assets/hero-penthouse.jpg", "/assets/luxury-living-room-stone-tv-wall-fireplace.jpeg", "/assets/modern-dining-room-pendant-lights-oak-table.jpeg", "/assets/walk-in-closet-island-led-ceiling.jpeg", "/assets/dining-table.jpeg", "/assets/curtains-6.jpeg"];

function ProductCollection({ lang, dict }) {
  const t = dict.productCollection;
  return <section className="section product-collection" id="products">
    <div className="shell">
      <Reveal className="section-heading section-heading--center"><p className="micro">{t.micro}</p><h2 className="section-title">{t.title}</h2></Reveal>
      <div className="product-grid">{t.items.map((item, i) => <Reveal className="product-card" delay={(i % 3) * 90} key={item.title}><a href={`/${lang}/products/${PRODUCT_SLUGS[i]}`}><Image src={PRODUCT_IMAGES[i]} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 980px) 50vw, 33vw" /><div className="product-card__copy"><h3>{item.title}</h3><p>{item.body}</p></div></a></Reveal>)}</div>
    </div>
  </section>;
}

function Factory({ lang, dict }) {
  const f = dict.factorySection;
  return <section className="section section--light" id="factory">
    <div className="shell factory-grid">
      <Reveal className="factory-copy">
        <p className="micro">{f.badge}</p>
        <h2 className="section-title">{f.title}</h2>
        <p className="factory-desc">{f.description}</p>
        <a href={`/${lang}/joinery/ajman`} className="factory-link">{f.joineryLink} <ArrowUpRight size={14} /></a>
        <div className="factory-feature-grid">
          {f.features.map((item, i) => <div className="factory-feature-card" key={i}>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>)}
        </div>
        <a href={`/${lang}/contact#contact-form`} className="outline-button outline-button--dark factory-cta"><Calendar size={16} /> {f.cta}</a>
      </Reveal>
      <Reveal className="factory-image-wrap" delay={120}>
        <Image src="/assets/walk-in-closet-island-led-ceiling.jpeg" alt={f.title} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
        <div className="factory-image-caption">
          <span>{f.captionLocation}</span>
          <span className="factory-live-badge"><Wrench size={12} /> {f.captionBadge}</span>
        </div>
      </Reveal>
    </div>
  </section>;
}

function Projects({ lang, dict }) {
  // Homepage shows three cards: the published project first, then the next entries
  // that have a detail page (placeholders, still noindex — see data/project-catalog.js).
  const withDetail = dict.projectsSection.items.filter((project) => dict.projectDetailPage.projects[project.slug]);
  const projects = [...withDetail.filter((p) => isPublishedProject(p.slug)), ...withDetail.filter((p) => !isPublishedProject(p.slug))].slice(0, 3);
  const imageBySlug = Object.fromEntries(projects.map((p) => [p.slug, dict.projectDetailPage.projects[p.slug].images[0]]));
  imageBySlug["government-authority"] = "/assets/tv-wall-unit-led-display-shelves.jpeg";
  return <section className="section projects" id="projects"><div className="shell projects__heading"><Reveal><p className="micro">{dict.projectsSection.micro}</p><h2 className="section-title" style={{whiteSpace: 'pre-wrap'}}>{dict.projectsSection.title}</h2></Reveal><Reveal className="projects__tools" delay={100} style={{display: 'flex', alignItems: 'flex-end'}}><a href={`/${lang}/our-projects`} className="outline-button outline-button--dark">{dict.projectsSection.viewAll} <ArrowUpRight size={16} /></a></Reveal></div><div className="shell project-grid-home">{projects.map((p) => <article className="project-card-home" key={p.slug}><a href={`/${lang}/our-projects/${p.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}><div className="project-card-home__image"><Image src={imageBySlug[p.slug]} alt="" fill sizes="(max-width: 700px) 100vw, 33vw" /></div><div className="project-card-home__meta"><h3>{p.title}{p.place ? `, ${p.place}` : ''} <ArrowUpRight size={16} style={{display: 'inline-block', verticalAlign: 'middle', marginLeft: '5px'}} /></h3></div></a></article>)}</div></section>;
}

// Real client reviews (src/data/reviews.js), shown in the client's words; the full list is on /reviews.
function Testimonials({ lang, dict }) {
  const t = dict.testimonialsSection;
  if (REVIEWS.length === 0) return null;
  return <section className="section testimonials" id="reviews">
    <div className="shell projects__heading"><Reveal><p className="micro">{t.micro}</p><h2 className="section-title">{t.title}</h2></Reveal><Reveal className="projects__tools" delay={100} style={{display: 'flex', alignItems: 'flex-end'}}><a href={`/${lang}/reviews`} className="outline-button outline-button--dark">{t.readAll} <ArrowUpRight size={16} /></a></Reveal></div>
    <div className="shell rv-grid">{REVIEWS.slice(0, 3).map((review, i) => <ReviewCard key={review.id} review={review} lang={lang} t={dict.reviewsPage} delay={60 + i * 60} />)}</div>
  </section>;
}

function Process({ dict }) {
  return <section className="section process-timeline-section" id="process"><div className="shell">
    <ProcessTimeline kicker={dict.processSection.micro} title={dict.processSection.title} items={dict.processSection.items} headingClassName="process__heading" titleStyle={{ whiteSpace: 'pre-wrap' }} />
  </div></section>;
}

function Faq({ dict }) {
  const faq = dict.faqSection;
  return <FaqSplit kicker={faq.kicker} title={faq.title} subtitle={faq.subtitle} items={faq.items} idPrefix="home" />;
}

function LatestNews({ lang, dict }) {
  const t = dict.mediaPage;
  const articles = t.articles.slice(0, 4);
  return <section className="section latest-news-section" id="news"><div className="shell"><Reveal className="section-heading section-heading--center"><p className="micro">{t.newsAndInsights}</p><h2 className="section-title" style={{whiteSpace: 'pre-wrap'}}>{t.latestNewsAndInsights}</h2></Reveal><div className="media-grid" style={{ marginTop: '40px' }}>{articles.map((article, index) => <Reveal className="media-card" key={index} delay={100 + index * 100}><a href={article.link} className="media-card-link"><div className="media-image-wrapper"><Image src={article.image} alt={article.title} fill sizes="(max-width: 768px) 100vw, 25vw" style={{ objectFit: 'cover' }} /></div><div className="media-card-content"><h3>{article.title}</h3><span className="read-more">{t.readMore}</span></div></a></Reveal>)}</div><Reveal className="news-tools" delay={200} style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}><a href={`/${lang}/media`} className="outline-button outline-button--dark">{dict.nav.media || "Media"} <ArrowUpRight size={16} /></a></Reveal></div></section>;
}

export default async function App({ lang }) {
  const dict = dictionaries[lang] || dictionaries.en;
  // Contact details as edited in the admin panel (Settings → Business details).
  const business = await getBusiness();
  const props = { lang, dict };
  return <>
    <SiteHeader />
    <main className="home-main">
      <Hero />
      <ServicesDirectory {...props} />
      <Projects {...props} />
      <Challenges {...props} />
      <PhoneFold className="phone-fold--estimator" title={lang === "ar" ? "احسب ميزانية مشروعك" : "Estimate your project budget"}>
        <Estimator />
      </PhoneFold>
      <Factory {...props} />
      <Sectors />
      <ProductCollection {...props} />
      <NextSteps />
      <Process {...props} />
      <Testimonials {...props} />
      <Faq {...props} />
      <LatestNews {...props} />
    </main>
    <Footer />
  </>;
}
