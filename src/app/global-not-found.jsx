// Site-wide 404 for URLs that match no route. The root layout lives under the [lang]
// segment, so Next's default 404 rendered a bare "This page could not be found." with no
// way back into the site. This page is self-contained (global-not-found bypasses layouts)
// and deliberately light: inline styles only, no site bundle. Next serves it with a 404
// status and its own noindex robots tag, so it can never be indexed as a soft 404.

export const metadata = {
  title: "Page not found | Bait Al Ebdaa",
  description: "The page you are looking for does not exist. Explore Bait Al Ebdaa's interior design, fit-out and joinery services across the UAE.",
  // No robots entry: Next already emits <meta name="robots" content="noindex"> on 404s.
};

const LINKS = {
  en: [
    ["/", "Home"],
    ["/en/our-services", "Services"],
    ["/en/our-projects", "Projects"],
    ["/en/pricing", "Pricing"],
    ["/en/contact", "Contact"],
  ],
  ar: [
    ["/ar", "الرئيسية"],
    ["/ar/our-services", "خدماتنا"],
    ["/ar/our-projects", "مشاريعنا"],
    ["/ar/pricing", "الأسعار"],
    ["/ar/contact", "تواصل معنا"],
  ],
};

const styles = {
  body: { margin: 0, minHeight: "100vh", display: "grid", placeItems: "center", background: "#f3f1ec", color: "#11110f", fontFamily: "Arial, Helvetica, sans-serif" },
  main: { width: "min(100% - 32px, 720px)", padding: "64px 0" },
  logo: { display: "block", width: 180, height: "auto", marginBottom: 48 },
  code: { margin: "0 0 12px", fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#5f5d58", fontWeight: 600 },
  h1: { margin: "0 0 16px", fontSize: "clamp(2rem, 6vw, 3.4rem)", lineHeight: 1.05, fontWeight: 500, letterSpacing: "-0.03em" },
  p: { margin: "0 0 28px", color: "#5f5d58", lineHeight: 1.6 },
  nav: { display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 48 },
  link: { border: "1px solid #11110f", borderRadius: "15px 0", padding: "11px 18px", color: "#11110f", textDecoration: "none", fontSize: "0.85rem" },
  ar: { borderTop: "1px solid rgba(17,17,15,.18)", paddingTop: 36 },
};

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body style={styles.body}>
        <main style={styles.main}>
          <a href="/" aria-label="Bait Al Ebdaa home">
            <img src="/assets/footer%20logo.png" alt="Bait Al Ebdaa" width={2170} height={725} style={styles.logo} />
          </a>
          <p style={styles.code}>Error 404</p>
          <h1 style={styles.h1}>This page could not be found</h1>
          <p style={styles.p}>The link may be old or the page may have moved. These pages are a good place to start:</p>
          <nav style={styles.nav} aria-label="Helpful links">
            {LINKS.en.map(([href, label]) => (
              <a key={href} href={href} style={styles.link}>{label}</a>
            ))}
          </nav>
          <section lang="ar" dir="rtl" style={styles.ar}>
            <p style={{ ...styles.h1, fontSize: "1.6rem" }}>الصفحة غير موجودة</p>
            <p style={styles.p}>ربما تغيّر الرابط أو نُقلت الصفحة. يمكنك المتابعة من هنا:</p>
            <nav style={{ ...styles.nav, marginBottom: 0 }} aria-label="روابط مفيدة">
              {LINKS.ar.map(([href, label]) => (
                <a key={href} href={href} style={styles.link}>{label}</a>
              ))}
            </nav>
          </section>
        </main>
      </body>
    </html>
  );
}
