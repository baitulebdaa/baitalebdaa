import Script from "next/script";
import { DM_Sans, Manrope, Tajawal, Cormorant_Garamond } from "next/font/google";
import "../../styles.css";
import { I18nProvider } from "../../i18n/I18nProvider";
import { getClientDictionary } from "../../i18n/client-dictionary";
import { organizationJsonLd } from "../../lib/page-metadata";
import { getBusiness } from "../../lib/business";
import { AskAIWidget } from "../../components/AskAIWidget";
import { AnalyticsClicks } from "../../components/AnalyticsClicks";
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
    default: "Interior Design & Fit-Out Company Dubai | Bait Al Ebdaa",
    template: "%s | Bait Al Ebdaa",
  },
  description:
    "Interior design & turnkey fit-out in Dubai & UAE. Custom joinery from our Ajman factory, villa renovation & free site surveys. Request a quote.",
  openGraph: {
    title: "Interior Design & Fit-Out Company Dubai | Bait Al Ebdaa",
    description: "Interior design & turnkey fit-out in Dubai & UAE. Custom joinery from our Ajman factory, villa renovation & free site surveys.",
    url: 'https://www.baitalebdaa.com',
    siteName: 'Bait Al Ebdaa',
    locale: 'en_AE',
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Interior Design & Fit-Out Company Dubai | Bait Al Ebdaa",
    description: "Interior design & turnkey fit-out in Dubai & UAE. Custom joinery from our Ajman factory, villa renovation & free site surveys.",
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
        <script dangerouslySetInnerHTML={{ __html: signedInScript(getClientDictionary(lang).nav.account, getClientDictionary(lang).nav.accountShort) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd(lang, business)).replace(/</g, "\\u003c") }} />
        {GA_MEASUREMENT_ID && (
          // Google Analytics loads only for visitors who have accepted analytics cookies
          // (owner, 6 Nov 2026: Consent Mode "basic"). Until then nothing is downloaded or sent.
          // gtag.js is 177 KB and took about 2 s of a phone's main thread on every first visit,
          // the largest part of the homepage's Total Blocking Time. The commands below wait in
          // dataLayer; loadAnalytics() fetches the library once the page is idle, either here
          // for a returning visitor who accepted, or from the banner when someone accepts.
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
              window.baeLoadAnalytics = function () {
                if (window.baeAnalyticsLoaded) return;
                window.baeAnalyticsLoaded = true;
                var s = document.createElement('script');
                s.async = true;
                s.src = 'https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}';
                document.head.appendChild(s);
              };
              if (/(?:^|; )${CONSENT_COOKIE}=granted/.test(document.cookie)) {
                var idle = function () { (window.requestIdleCallback || function (f) { setTimeout(f, 1500); })(window.baeLoadAnalytics); };
                if (document.readyState === 'complete') idle(); else window.addEventListener('load', idle, { once: true });
              }
            `}
          </Script>
        )}
        <I18nProvider lang={lang} dict={getClientDictionary(lang)} business={business}>
          {children}
          <AskAIWidget />
          {GA_MEASUREMENT_ID && <AnalyticsClicks />}
          {GA_MEASUREMENT_ID && <CookieConsent />}
        </I18nProvider>
      </body>
    </html>
  );
}
