"use client";

import { useI18n } from "../i18n/I18nProvider";
import { Reveal } from "./Shared";

// "What happens next" (6 Nov 2026), beside the estimators and enquiry buttons: the call, the
// free site survey, the quotation and how the programme is agreed. Built only from published
// facts (dict.nextSteps); no response time is promised, because none has been approved.
export function NextSteps() {
  const { dict } = useI18n();
  const t = dict.nextSteps;
  return (
    <section className="shell next-steps" aria-labelledby="next-steps-title">
      <Reveal>
        <p className="micro">{t.kicker}</p>
        <h2 className="next-steps__title" id="next-steps-title">{t.title}</h2>
      </Reveal>
      <ol className="next-steps__list">
        {t.items.map(([title, body], i) => (
          <li key={title}>
            <span className="next-steps__num" aria-hidden="true">{i + 1}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
