"use client";

import { Star } from "./icons";
import { Reveal } from "./Shared";

export function Stars({ rating, label }) {
  return (
    <span className="rv-stars" role="img" aria-label={label}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={16} className={i < Math.round(rating) ? "rv-star rv-star--on" : "rv-star"} aria-hidden="true" />
      ))}
    </span>
  );
}

function formatMonth(date, lang) {
  if (!date) return null;
  return new Intl.DateTimeFormat(lang === "ar" ? "ar-AE" : "en-GB", { month: "long", year: "numeric" }).format(new Date(`${date}T12:00:00`));
}

// One client review. Stars, date and source render only when the client actually gave them;
// a text shown in the other site language is labelled as a translation.
export function ReviewCard({ review, lang, t, delay }) {
  const text = review.text[lang] || review.text[review.originalLang];
  const translated = review.originalLang !== lang && Boolean(review.text[lang]);
  const when = formatMonth(review.date, lang);
  const hasRating = Number.isInteger(review.rating);
  // Arabic pages show the Arabic spelling of the name and company when there is one.
  const name = (lang === "ar" && review.nameAr) || review.name;
  const company = (lang === "ar" && review.companyAr) || review.company;
  return (
    <Reveal as="article" className="rv-card" delay={delay}>
      {(hasRating || translated) && (
        <div className="rv-card__top">
          {hasRating ? <Stars rating={review.rating} label={t.ratingLabel.replace("{n}", review.rating)} /> : <span />}
          {translated && <span className="rv-card__badges"><span className="rv-badge">{t.translatedLabel}</span></span>}
        </div>
      )}
      <blockquote className="rv-card__quote">
        <p>{text}</p>
      </blockquote>
      <footer className="rv-card__meta">
        <span className="rv-card__avatar" aria-hidden="true">{name.trim().charAt(0)}</span>
        <span className="rv-card__who">
          <strong>{name}</strong>
          <span>{[company, when].filter(Boolean).join(" · ")}</span>
        </span>
        {review.source && (
          <span className="rv-card__source">
            {review.sourceUrl ? <a href={review.sourceUrl} target="_blank" rel="noopener noreferrer">{review.source}</a> : review.source}
          </span>
        )}
      </footer>
    </Reveal>
  );
}
