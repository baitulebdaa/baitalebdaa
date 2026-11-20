"use client";
import Link from "next/link";
import { ArrowRight, Lock1 as Lock } from "iconsax-reactjs";
import { DeviceFrame, devices } from "../../../../components/design-lab/DeviceFrame";
import { useDecisions } from "../../../../components/design-lab/useDecisions";
import { Badge, PageHeader } from "../../../../components/design-lab/ui";
import { LAB, defaultPreviewSlug, previewSrc, servicePageVariants } from "../../../../lib/design-lab/registry";
const roleColour = {
    lead: "bg-[#9fe870]",
    explain: "bg-[#d8edd0]",
    trust: "bg-[#c7d2fe]",
    convert: "bg-[#fde68a]",
};
export default function ServicePagesIndex() {
    const { decisions } = useDecisions();
    const selected = decisions?.["service-page"].current;
    return (<>
      <PageHeader title="Service pages" description="Six service directions using the studio’s published scope, FAQs and interior photography." actions={<Link href={`${LAB}/compare`} className="inline-flex min-h-10 items-center rounded-lg border border-black/15 px-3.5 text-body-sm font-semibold hover:border-black/30">
            Compare side by side
          </Link>}/>
      <ul className="mt-6 grid gap-8 md:grid-cols-2">
        {servicePageVariants.map((variant) => {
            const approved = selected?.variantId === variant.id;
            const version = variant.versions[variant.versions.length - 1];
            const total = variant.flow.reduce((sum, block) => sum + block.weight, 0);
            return (<li key={variant.id}>
              <Link href={`${LAB}/service-pages/${variant.id}`} className="group block">
                <DeviceFrame thumbnail src={previewSrc(variant.id, version, defaultPreviewSlug)} title={`${variant.name} preview`} width={devices.desktop.width} height={devices.desktop.height}/>
                <div className="mt-3 flex items-start justify-between gap-3">
                  <div>
                    <h2 className="flex flex-wrap items-center gap-2 font-bold group-hover:text-[#111827]">
                      {variant.name}
                      <Badge>
                        {variant.versions.length} version{variant.versions.length > 1 ? "s" : ""}
                      </Badge>
                      {variant.live && <Badge tone="live">Live</Badge>}
                      {approved && (<Badge tone="approved">
                          <Lock color="currentColor" aria-hidden="true" className="size-3"/>
                          Selected
                        </Badge>)}
                    </h2>
                    <p className="text-body-sm text-muted">{variant.tagline}</p>
                  </div>
                  <ArrowRight color="currentColor" aria-hidden="true" className="mt-1 size-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5"/>
                </div>
              </Link>
              <p className="mt-2 text-body-sm">{variant.idea}</p>
              <div className="mt-3" aria-label={`${variant.name} page flow`}>
                <div className="flex h-2.5 overflow-hidden rounded-full">
                  {variant.flow.map((block) => (<span key={block.label} title={block.label} className={`${roleColour[block.role]} border-r border-white last:border-r-0`} style={{ width: `${(block.weight / total) * 100}%` }}/>))}
                </div>
                <p className="mt-1.5 text-[12px] text-muted">{variant.flow.map((block) => block.label).join(" → ")}</p>
              </div>
            </li>);
        })}
      </ul>
    </>);
}
