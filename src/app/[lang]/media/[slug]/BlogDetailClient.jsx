"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Header, Footer, Reveal, PageHeader } from "../../../../components/Shared";

export default function BlogDetailClient({ article, breadcrumbs, newsAndInsights, allArticles, lang, discuss }) {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const recentArticles = allArticles.filter(a => a.slug !== article.slug).slice(0, 3);
  
  const waMessage = encodeURIComponent(
    lang === "ar"
      ? "مرحباً! أرغب بمناقشة مشروعي معكم."
      : "Hello! I'd like to discuss my project with you."
  );
  const waHref = `https://wa.me/971524621919?text=${waMessage}`;

  return (
    <>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} useFooterLogo={true} lightTheme={true} />
      
      <main className="blog-detail-page">
        <PageHeader 
          kicker={newsAndInsights}
          breadcrumbs={breadcrumbs}
          title={article.title}
        />
        
        <section className="shell article-layout" style={{ display: 'flex', flexWrap: 'wrap', gap: '60px', padding: '60px 0' }}>
          
          {/* Main Content — not wrapped in <Reveal>: that component only shows its
              content once an IntersectionObserver sees 14% of its (very tall, for a
              full article) height on screen at once, which a multi-thousand-word
              article can never satisfy in a normal viewport, leaving it permanently
              opacity:0. Fade in just the compact meta/image row instead. */}
          <div className="article-main" style={{ flex: '1 1 600px', minWidth: 0 }}>
            <Reveal>
              <div className="article-meta" style={{ display: 'flex', gap: '20px', color: 'var(--muted)', marginBottom: '30px', fontSize: '0.9rem' }}>
                <span>{article.date}</span>
                <span>•</span>
                <span>{article.author}</span>
              </div>

              <div className="article-featured-image" style={{ position: 'relative', width: '100%', height: '400px', marginBottom: '50px', borderRadius: '12px', overflow: 'hidden' }}>
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 800px) 100vw, 800px"
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
            </Reveal>

            <div
              className="article-body"
              style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--ink)' }}
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>

          {/* Sidebar */}
          <aside className="article-sidebar" style={{ flex: '0 0 350px', minWidth: '280px' }}>
            <Reveal delay={200}>
              {/* Recent Articles Widget */}
              <div className="sidebar-widget" style={{ padding: '30px', backgroundColor: 'var(--paper)', borderRadius: '12px', marginBottom: '40px' }}>
                <h3 style={{ marginBottom: '25px', fontSize: '1.2rem', color: 'var(--ink)' }}>{newsAndInsights}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {recentArticles.map((ra, idx) => (
                    <a key={idx} href={`/${lang}/media/${ra.slug}`} style={{ display: 'flex', gap: '15px', alignItems: 'center', textDecoration: 'none' }}>
                      <div style={{ position: 'relative', width: '80px', height: '80px', flexShrink: 0, borderRadius: '8px', overflow: 'hidden' }}>
                        <Image src={ra.image} alt={ra.title} fill sizes="80px" style={{ objectFit: 'cover' }} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: '0.95rem', margin: '0 0 5px 0', lineHeight: '1.4', color: 'var(--ink)' }}>{ra.title}</h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{ra.date}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* CTA Widget */}
              <div className="sidebar-cta" style={{ padding: '30px', backgroundColor: 'var(--ink)', color: '#fff', borderRadius: '12px', textAlign: 'center' }}>
                <h3 style={{ marginBottom: '15px', color: '#fff' }}>{discuss}</h3>
                <p style={{ fontSize: '0.9rem', marginBottom: '25px', opacity: 0.8 }}>
                  {lang === 'ar' ? 'هل لديك مشروع في الاعتبار؟ تواصل مع خبرائنا اليوم.' : 'Have a project in mind? Speak to our experts today.'}
                </p>
                <a href={waHref} target="_blank" rel="noopener noreferrer" className="outline-button outline-button--light" style={{ width: '100%', justifyContent: 'center' }}>
                  {lang === 'ar' ? 'تواصل معنا' : 'Contact Us'} <ArrowUpRight size={16} />
                </a>
              </div>
            </Reveal>
          </aside>
          
        </section>
      </main>

      <Footer />
    </>
  );
}
