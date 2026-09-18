import Script from "next/script";
import { DM_Sans, Manrope, Tajawal } from "next/font/google";
import "../../styles.css";
import { I18nProvider } from "../../i18n/I18nProvider";
import { organizationJsonLd } from "../../lib/page-metadata";

// Set in .env.local / hosting env vars once you have real IDs — see .env.example.
// Left unset by default so nothing fake ships to production.
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const GOOGLE_SITE_VERIFICATION = process.env.GOOGLE_SITE_VERIFICATION;
const BING_SITE_VERIFICATION = process.env.BING_SITE_VERIFICATION;

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-manrope",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
  display: "swap",
});

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ar' }];
}
export const dynamicParams = false;

export const metadata = {
  metadataBase: new URL('https://www.baitalebdaa.com'),
  title: {
    default: "Bait Al Ebdaa | Turnkey Interior Design Dubai",
    template: "%s | Bait Al Ebdaa",
  },
  description:
    "Bait Al Ebdaa creates refined villa and office interiors across Dubai and Abu Dhabi, with in-house joinery, photorealistic 3D visualization, approvals and luxury fit-out.",
  keywords: ["Turnkey Interior Design", "Custom Architectural Joinery", "Luxury Fit-out Dubai", "Abu Dhabi Interiors", "Interior Design UAE", "Bait Al Ebdaa"],
  openGraph: {
    title: "Bait Al Ebdaa | Turnkey Interior Design Dubai",
    description: "Refined villa and office interiors across Dubai and Abu Dhabi.",
    url: 'https://www.baitalebdaa.com',
    siteName: 'Bait Al Ebdaa',
    locale: 'en_AE',
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Bait Al Ebdaa | Turnkey Interior Design Dubai",
    description: "Refined villa and office interiors across Dubai and Abu Dhabi.",
  },
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'ar': '/ar',
    },
  },
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
  
  return (
    <html lang={lang} dir={isRtl ? "rtl" : "ltr"} className={`${dmSans.variable} ${manrope.variable} ${tajawal.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }} />
        {GA_MEASUREMENT_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
        <I18nProvider lang={lang}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
