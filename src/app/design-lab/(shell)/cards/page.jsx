"use client";
import { useMemo, useState } from "react";
import { Badge, PageHeader, Segmented } from "../../../../components/design-lab/ui";
import { ReviewBar, SlotNote, VariantReview, reviewMark, useReview } from "../../../../components/design-lab/review";
import { cardTypes } from "../../../../components/design-lab/cards/catalog";
import { PhoneView } from "../../../../components/design-lab/cards/kit";
const PICKS_ONLY = "picks";
export default function CardsPage() {
    const { review } = useReview();
    const [view, setView] = useState("desktop");
    const [show, setShow] = useState("all");
    const phone = view === "phone";
    const groups = useMemo(() => cardTypes.map((c) => ({ id: c.id, label: `${c.no}. ${c.label}`, variants: c.variants.map((v) => ({ id: v.id, name: `${v.id.toUpperCase()} ${v.name}` })) })), []);
    const decided = cardTypes.filter((c) => c.variants.some((v) => reviewMark(review.marks, c.id, v.id) === "pick")).length;
    return (<>
      <PageHeader title="Cards & widgets: 20 types, 2 variations each" description="Original Just Shine reference cards. Prices, reviews and cleaning examples belong to the reference business. Pick layouts and add notes for Bait Al Ebdaa." actions={<Badge>{decided}/20 chosen</Badge>}/>

      <ReviewBar groups={groups} title="Cards & widgets review"/>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Segmented label="View" value={view} onChange={setView} options={[{ value: "desktop", label: "Desktop" }, { value: "phone", label: "Phone (390px, flat)" }]}/>
        <Segmented label="Show" value={show} onChange={setShow} options={[{ value: "all", label: "Both variations" }, { value: PICKS_ONLY, label: "My picks only" }]}/>
      </div>
      {phone && <p className="mt-2 text-body-sm text-muted">Phone view: panels go flat (no fill, hairline on top), as they will below 640px on the site.</p>}

      <nav aria-label="Card types" className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-[13px]">
        {cardTypes.map((c) => {
            const picked = c.variants.find((v) => reviewMark(review.marks, c.id, v.id) === "pick");
            return (<a key={c.id} href={`#${c.id}`} className="font-semibold text-muted hover:text-content">
              {c.no}. {c.label}
              {picked && <span className="text-content"> · {picked.id.toUpperCase()}</span>}
            </a>);
        })}
      </nav>

      <div className="mt-6 divide-y divide-line">
        {cardTypes.map((c) => (<section key={c.id} id={c.id} className="scroll-mt-20 py-8">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-[20px] font-bold">
                {c.no}. {c.label}
              </h2>
              <p className="text-[13px] text-muted">For: {c.use}</p>
            </div>
            <div className="mt-4 grid gap-6 lg:grid-cols-2">
              {c.variants.map(({ id, name, idea, Demo }) => {
                const mark = reviewMark(review.marks, c.id, id);
                if (show === PICKS_ONLY && mark !== "pick" && mark !== "maybe")
                    return null;
                return (<article key={id} className={`flex flex-col gap-4 rounded-lg bg-[#eef3e8] p-4 ring-1 ${mark === "pick" ? "ring-black/35" : "ring-black/5"}`}>
                    <div>
                      <p className="text-[12px] font-semibold text-muted">Variation {id.toUpperCase()}</p>
                      <h3 className="font-bold leading-snug">{name}</h3>
                      <p className="text-body-sm text-muted">{idea}</p>
                    </div>
                    <div className="rounded-lg px-1 py-2">
                      <div className={`mx-auto ${phone ? "w-[390px] max-w-full rounded-lg bg-white px-4 py-5 ring-1 ring-black/10" : "max-w-[440px]"}`}>
                        <PhoneView.Provider value={phone}>
                          <Demo />
                        </PhoneView.Provider>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <VariantReview slot={c.id} variant={id}/>
                    </div>
                  </article>);
            })}
            </div>
            <SlotNote slot={c.id} label={c.label}/>
          </section>))}
      </div>
    </>);
}
