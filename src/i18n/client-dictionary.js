import { dictionaries } from "./dictionaries.js";

// What the browser receives through I18nProvider. dictionaries.js holds both languages and
// every article's full HTML (~515 KB of JS when a client component imported it directly);
// pages only need the current language, and article bodies reach the article page as a prop
// from its server component (src/app/[lang]/media/[slug]/page.jsx).
const withoutBody = ({ content, ...card }) => card;

export function getClientDictionary(lang) {
  const dict = dictionaries[lang] || dictionaries.en;
  return {
    ...dict,
    mediaPage: {
      ...dict.mediaPage,
      featuredArticle: withoutBody(dict.mediaPage.featuredArticle),
      articles: dict.mediaPage.articles.map(withoutBody),
    },
  };
}
