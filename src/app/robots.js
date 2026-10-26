export const dynamic = "force-static";
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // The admin panel (owner, 26 Oct 2026) and the APIs are not for search engines.
      disallow: ['/admin', '/api/', '/en/account', '/ar/account'],
    },
    sitemap: 'https://www.baitalebdaa.com/sitemap.xml',
  }
}
