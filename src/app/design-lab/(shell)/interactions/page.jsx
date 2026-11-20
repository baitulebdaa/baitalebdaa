"use client";
import { useState } from "react";
import { ApprovalControl } from "../../../../components/design-lab/ApprovalControl";
import { useDecisions } from "../../../../components/design-lab/useDecisions";
import { Badge, PageHeader, Segmented } from "../../../../components/design-lab/ui";
import { interactionDemos } from "../../../../components/design-lab/experiments/interactions";
import { interactionSlots, slots } from "../../../../lib/design-lab/registry";
import { ReviewBar, SlotNote, VariantReview, reviewMark, useReview } from "../../../../components/design-lab/review";
const tryIt = {
    "faq-toggle": "Open and close the questions.",
    "cta-motion": "Hover, then press and hold.",
    "section-reveal": "Press Replay to watch the entrance again.",
    "hero-motion": "Watch for a few seconds.",
    "link-hover": "Hover each link, then move away.",
    "footer-layout": "Compare the two layouts, then switch language.",
};
/** Stages that need room for text get a wider column. */
const wide = new Set(["faq-toggle", "section-reveal", "footer-layout"]);
export default function InteractionsPage() {
    const { decisions, setDecisions } = useDecisions();
    const [lang, setLang] = useState("en");
    const { review } = useReview();
    return (<>
      <PageHeader title="Interactions" description="Site-wide decisions on motion and layout. Every option is working code in its own file, shown with real site copy. Compare the English and Arabic versions before choosing." actions={<Segmented label="Language" value={lang} onChange={setLang} options={[
                { value: "en", label: "English" },
                { value: "ar", label: "العربية" },
            ]}/>}/>

      <ReviewBar />

      <nav aria-label="Decisions on this page" className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-body-sm">
        {interactionSlots.map((slot) => (<a key={slot.id} href={`#${slot.id}`} className="inline-flex min-h-9 items-center font-semibold text-muted hover:text-content">
            {slots[slot.id].label}
          </a>))}
      </nav>

      {interactionSlots.map((slot) => {
            const current = decisions?.[slot.id].current;
            return (<section key={slot.id} id={slot.id} aria-labelledby={`${slot.id}-title`} className="mt-10 scroll-mt-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-line pb-3">
              <div>
                <h2 id={`${slot.id}-title`} className="text-xl font-bold tracking-tight">
                  {slots[slot.id].label}
                </h2>
                <p className="mt-0.5 text-body-sm text-muted">
                  {slot.question} Used on: {slot.where}
                </p>
              </div>
              <p className="text-[13px] text-muted">{tryIt[slot.id]}</p>
            </div>

            <ul className={`mt-5 grid gap-5 ${wide.has(slot.id) ? "md:grid-cols-2" : "md:grid-cols-2 2xl:grid-cols-4"}`}>
              {slot.variants.map((variant) => {
                    const version = variant.versions[variant.versions.length - 1];
                    const Demo = interactionDemos[`${slot.id}/${variant.id}/${version}`];
                    const chosen = current?.variantId === variant.id || reviewMark(review.marks, slot.id, variant.id) === "pick";
                    return (<li key={variant.id} className={`flex flex-col gap-3 rounded-2xl p-4 ring-1 ${chosen ? "ring-2 ring-[#111827]" : "ring-line"}`}>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold">{variant.name}</h3>
                      <Badge>{version}</Badge>
                      {variant.live && <Badge tone="live">Live</Badge>}
                    </div>
                    <div dir={lang === "ar" ? "rtl" : "ltr"} lang={lang} className={`grid min-h-44 place-items-center rounded-xl bg-white p-4 ring-1 ring-line ${lang === "ar" ? "font-tajawal" : ""}`}>
                      <div className="w-full">
                        <div className={slot.id === "cta-motion" || slot.id === "link-hover" ? "flex justify-center" : ""}>
                          {Demo ? <Demo lang={lang}/> : <p className="text-muted">Missing component</p>}
                        </div>
                      </div>
                    </div>
                    <p className="flex-1 text-body-sm text-muted">{variant.idea}</p>
                    <VariantReview slot={slot.id} variant={variant.id}/>
                    <div>
                      <ApprovalControl slot={slot.id} variantId={variant.id} version={version} label={`${variant.name} ${version}`} decisions={decisions} onChange={setDecisions}/>
                    </div>
                  </li>);
                })}
            </ul>
            <SlotNote slot={slot.id}/>
          </section>);
        })}
    </>);
}
