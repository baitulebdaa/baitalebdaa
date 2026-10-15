import { ORG_REF, SITE_URL } from "../lib/schema-ids";

// Author of every article on /media (owner, 15 Oct 2026). One Person entity, referenced by
// @id from each BlogPosting so search engines and AI answer engines see a single, named expert.
export const ARTICLE_AUTHOR = {
  name: "Awais ul Haq",
  jobTitle: "CEO",
};

export const ARTICLE_AUTHOR_ID = `${SITE_URL}/#awais-ul-haq`;

export function articleAuthorJsonLd() {
  return {
    "@type": "Person",
    "@id": ARTICLE_AUTHOR_ID,
    name: ARTICLE_AUTHOR.name,
    jobTitle: ARTICLE_AUTHOR.jobTitle,
    worksFor: ORG_REF,
  };
}
