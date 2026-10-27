import Script from "next/script";
import { DM_Sans, Manrope, Tajawal, Cormorant_Garamond } from "next/font/google";
import "../../styles.css";
import { I18nProvider } from "../../i18n/I18nProvider";
import { getClientDictionary } from "../../i18n/client-dictionary";
import { organizationJsonLd } from "../../lib/page-metadata";
import { getBusiness } from "../../lib/business";
import { AskAIWidget } from "../../components/AskAIWidget";
import { CookieConsent } from "../../components/CookieConsent";
import { CONSENT_COOKIE } from "../../lib/consent";
import { signedInScript } from "../../lib/account/signed-in-script";

// The site's GA4 web stream (owner, 25 Oct 2026). Only production deployments send data
// (Vercel sets VERCEL_ENV); preview and local builds stay silent unless the env var is set.
const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || (process.env.VERCEL_ENV === "production" ? "G-3XNVMKSM87" : undefined);
const GOOGLE_SITE_VERIFICATION = process.env.GOOGLE_SITE_VERIFICATION;
const BING_SITE_VERIFICATION = process.env.BING_SITE_VERIFICATION;

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
  display: "swap",
  preload: false,
});

// Display serif for the FAQ section heading only (see src/App.jsx Faq()) — matches
// the reference site's heading face exactly. Latin-only (no Arabic glyphs), so it's
// applied via [dir="ltr"] in styles.css rather than the site-wide h1/h2/h3 rule —
// Arabic pages keep the existing Tajawal heading font untouched.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
  preload: false,
});

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ar' }];
}
export const dynamicParams = false;

export const metadata = {
  metadataBase: new URL('https://www.baitalebdaa.com'),
  // The site has ONE phone number, +971 58 262 1717, always linked explicitly with tel:/wa.me.
  // Without this, browsers and crawlers auto-detect "Showroom No. 052004009" in the address as a
  // second (landline-looking) phone number and turn it into a call link.
  formatDetection: { telephone: false, address: false, email: false },
  title: {
    default: "Bait Al Ebdaa | Turnkey Interior Design Dubai",
    template: "%s | Bait Al Ebdaa",
  },
  description:
    "Bait Al Ebdaa delivers villa and office interior design, turnkey fit-out and in-house joinery across the UAE.",
  openGraph: {
    title: "Bait Al Ebdaa | Turnkey Interior Design Dubai",
    description: "Villa and office interior design, turnkey fit-out and in-house joinery across the UAE.",
    url: 'https://www.baitalebdaa.com',
    siteName: 'Bait Al Ebdaa',
    locale: 'en_AE',
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Bait Al Ebdaa | Turnkey Interior Design Dubai",
    description: "Villa and office interior design, turnkey fit-out and in-house joinery across the UAE.",
  },
  // No site-wide canonical/hreflang default here on purpose: a layout-level canonical is
  // inherited by any page that forgets its own, silently pointing it at the homepage. Every
  // route sets its own via buildPageMetadata() or the [service]/[location] generateMetadata.
  ...(GOOGLE_SITE_VERIFICATION || BING_SITE_VERIFICATION
    ? {
        verification: {
          ...(GOOGLE_SITE_VERIFICATION ? { google: GOOGLE_SITE_VERIFICATION } : {}),
          ...(BING_SITE_VERIFICATION ? { other: { "msvalidate.01": BING_SITE_VERIFICATION } } : {}),
        },
      }
    : {}),
};

export const viewport = {
  themeColor: "#11110f",
};

export default async function RootLayout({ children, params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || "en";
  const isRtl = lang === "ar";
  // Contact details as edited in the admin panel (Settings → Business details).
  const business = await getBusiness();
  
  return (
    // suppressHydrationWarning: the signed-in script below adds data-signed-in and the name to <html>.
    <html lang={lang} dir={isRtl ? "rtl" : "ltr"} className={`${dmSans.variable} ${manrope.variable} ${tajawal.variable} ${cormorant.variable}`} suppressHydrationWarning>
      <body data-analytics={GA_MEASUREMENT_ID ? "on" : undefined}>
        {/* Runs before the header is drawn, so the account button never flickers (see Header). */}
        <script dangerouslySetInnerHTML={{ __html: signedInScript(getClientDictionary(lang).nav.account) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd(lang, business)).replace(/</g, "\\u003c") }} />
        {GA_MEASUREMENT_ID && (
          <>
            {/* Consent Mode v2: analytics cookies only after the visitor accepts (components/CookieConsent.jsx).
                The library loads after the page, so it never competes with what the visitor sees first. */}
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                var granted = /(?:^|; )${CONSENT_COOKIE}=granted/.test(document.cookie);
                gtag('consent', 'default', { analytics_storage: granted ? 'granted' : 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="lazyOnload" />
          </>
        )}
        <I18nProvider lang={lang} dict={getClientDictionary(lang)} business={business}>
          {children}
          <AskAIWidget />
          {GA_MEASUREMENT_ID && <CookieConsent />}
        </I18nProvider>
      </body>
    </html>
  );
}
