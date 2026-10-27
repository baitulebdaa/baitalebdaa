import { notFound } from "next/navigation";
import ProductDetail from "../../../../ProductDetail";
import { PRODUCTS, productBySlug } from "../../../../data/products";
import { serviceCatalog } from "../../../../data/service-catalog";
import { buildPageMetadata } from "../../../../lib/page-metadata";

export function generateStaticParams() {
  return PRODUCTS.map(({ slug }) => ({ slug }));
}
export const dynamicParams = false;

// noindex and left out of the sitemap until the owner has reviewed the text
// (SEO change freeze; the home cards still link here for visitors).
export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const product = productBySlug(slug);
  if (!product) return {};
  const copy = product[lang] || product.en;
  return {
    ...buildPageMetadata({
      lang,
      path: `products/${slug}`,
      title: `${copy.title} | Bait Al Ebdaa`,
      description: `${copy.subtitle}. ${copy.intro.split(". ")[0]}.`,
    }),
    robots: { index: false, follow: true },
  };
}

// Only this page's language goes to the browser.
export default async function ProductPage({ params }) {
  const { lang, slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();
  const pick = (item) => ({ slug: item.slug, photo: item.photo, ...(item[lang] || item.en) });
  return (
    <ProductDetail
      product={{ ...pick(product), gallery: product.gallery }}
      services={product.services.map((s) => serviceCatalog.find((c) => c.slug === s)).filter(Boolean).map((s) => ({ slug: s.slug, name: s[lang] || s.en }))}
      others={PRODUCTS.filter((item) => item.slug !== slug).map((item) => {
        const { slug: otherSlug, photo, title, subtitle } = pick(item);
        return { slug: otherSlug, photo, title, subtitle };
      })}
    />
  );
}
