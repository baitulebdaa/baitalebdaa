"use client";
import { Forbidden2 as Ban, TickCircle as CircleCheck, CloseCircle as CircleX } from "iconsax-reactjs";
import { ApprovalControl } from "../../../../components/design-lab/ApprovalControl";
import { useDecisions } from "../../../../components/design-lab/useDecisions";
import { Badge, PageHeader } from "../../../../components/design-lab/ui";
import { checkPairs, palette, requiredPairs } from "../../../../lib/design-lab/tokens";
// Same classes as the live service page: bold 700 in soft near-black, never extrabold pure black.
const typeScale = [
    { label: "Hero H1", className: "text-[2.75rem] font-bold leading-[1.12] tracking-[-0.02em] text-[#111827]", sample: "Interior Design in Dubai" },
    { label: "Section H2", className: "hp-h2", sample: "What does the project include?" },
    { label: "Row title", className: "text-base font-bold text-[#111827]", sample: "Custom joinery" },
    { label: "Eyebrow", className: "hp-eyebrow", sample: "Quick answer" },
    { label: "Body", className: "text-[16px] leading-relaxed text-[#4b5563]", sample: "Discuss your plans with the studio and request a site survey." },
    { label: "Caption", className: "text-[13px] text-[#4b5563]", sample: "The studio confirms the quotation after the site survey." },
];
function Swatch({ id }) {
    const token = palette[id];
    return (<li className="overflow-hidden rounded-xl ring-1 ring-black/10">
      <div className="h-20" style={{ background: token.hex }}/>
      <div className="p-3">
        <p className="flex items-baseline justify-between gap-2">
          <span className="font-semibold">{token.name}</span>
          <code className="font-mono text-[12px] text-muted">{token.hex}</code>
        </p>
        <p className="mt-1 text-[13px] leading-snug text-muted">{token.use}</p>
      </div>
    </li>);
}
export default function FoundationsPage() {
    const { decisions, setDecisions } = useDecisions();
    const pairs = checkPairs();
    const required = requiredPairs(pairs);
    const passing = required.filter((pair) => pair.passes).length;
    return (<>
      <PageHeader title="Foundations" description="The colours, type and buttons the site is built from, with every colour pairing checked against WCAG 2.2 AA." actions={<ApprovalControl slot="palette" variantId="studio-green" version="v1" label="Studio green v1" decisions={decisions} onChange={setDecisions}/>}/>

      <section aria-labelledby="palette-title" className="mt-8">
        <div className="flex flex-wrap items-center gap-2">
          <h2 id="palette-title" className="text-xl font-bold tracking-tight">
            Studio green palette
          </h2>
          
        </div>
        <p className="mt-1 text-body-sm text-muted">
          Deep green actions, warm neutrals and quiet dividers.
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {Object.keys(palette).map((id) => (<Swatch key={id} id={id}/>))}
        </ul>
      </section>

      <section aria-labelledby="contrast-title" className="mt-10">
        <h2 id="contrast-title" className="text-xl font-bold tracking-tight">
          Contrast checks <span className="font-normal text-muted">({passing} of {required.length} in use pass)</span>
        </h2>
        <div tabIndex={0} role="region" aria-label="Contrast checks, scrollable" className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[44rem] border-collapse text-left text-body-sm">
            <thead>
              <tr className="border-b border-black/20">
                <th scope="col" className="py-2 pr-3 font-semibold">Sample</th>
                <th scope="col" className="px-3 py-2 font-semibold">Pair</th>
                <th scope="col" className="px-3 py-2 font-semibold">Where</th>
                <th scope="col" className="px-3 py-2 font-semibold">Ratio</th>
                <th scope="col" className="px-3 py-2 font-semibold">Needs</th>
                <th scope="col" className="px-3 py-2 font-semibold">Result</th>
              </tr>
            </thead>
            <tbody>
              {pairs.map((pair) => (<tr key={`${pair.fg}-${pair.bg}`} className="border-b border-line align-middle">
                  <td className="py-2 pr-3">
                    <span className="inline-flex h-9 min-w-24 items-center justify-center rounded-lg px-3 font-semibold ring-1 ring-black/10" style={{ color: pair.fgHex, background: pair.bgHex }}>
                      {pair.kind === "ui" ? "●  Edge" : "Aa Text"}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    {palette[pair.fg].name} on {palette[pair.bg].name}
                  </td>
                  <td className="px-3 py-2 text-muted">{pair.where}</td>
                  <td className="px-3 py-2 font-mono">{pair.ratio.toFixed(2)}:1</td>
                  <td className="px-3 py-2 font-mono text-muted">{pair.minimum}:1</td>
                  <td className="px-3 py-2">
                    {pair.avoid ? (<span className="inline-flex items-center gap-1 font-semibold text-muted">
                        <Ban color="currentColor" aria-hidden="true" className="size-4"/> Avoid
                      </span>) : pair.passes ? (<span className="inline-flex items-center gap-1 font-semibold text-[#111827]">
                        <CircleCheck color="currentColor" aria-hidden="true" className="size-4"/> Pass
                      </span>) : (<span className="inline-flex items-center gap-1 font-semibold text-red-700">
                        <CircleX color="currentColor" aria-hidden="true" className="size-4"/> Fail
                      </span>)}
                  </td>
                </tr>))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="type-title" className="mt-10">
        <h2 id="type-title" className="text-xl font-bold tracking-tight">
          Type <span className="font-normal text-muted">(preview scale)</span>
        </h2>
        <ul className="mt-4 divide-y divide-line rounded-xl bg-[#f6f7f3] px-5">
          {typeScale.map((row) => (<li key={row.label} className="grid gap-1 py-4 md:grid-cols-[9rem_1fr] md:items-baseline">
              <span className="text-[13px] font-semibold text-muted">{row.label}</span>
              <span className={row.className}>{row.sample}</span>
            </li>))}
        </ul>
      </section>

      <section aria-labelledby="buttons-title" className="mt-10">
        <h2 id="buttons-title" className="text-xl font-bold tracking-tight">
          Buttons
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="flex flex-wrap items-center gap-3 rounded-xl bg-white p-5 ring-1 ring-line">
            <span className="hp-btn hp-btn-primary">Request a Quote</span>
            <p className="w-full text-[13px] text-muted">Primary enquiry action.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 rounded-xl bg-[#f1fbe9] p-5">
            <span className="hp-btn hp-btn-primary">WhatsApp for a quote</span>
            <span className="hp-btn hp-btn-ghost">+971 58 262 1717</span>
            <p className="w-full text-[13px] text-muted">Secondary contact options.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 rounded-xl bg-white p-5 ring-1 ring-line">
            <span className="inline-flex min-h-11 items-center text-body-sm font-semibold text-[#111827] underline underline-offset-4">
              Or use the quote form
            </span>
            <p className="w-full text-[13px] text-muted">Second actions are text links, not a second button.</p>
          </div>
        </div>
      </section>
    </>);
}
