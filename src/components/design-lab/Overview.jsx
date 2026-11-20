"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Element3, ArrowRight, Camera, RowVertical as Columns2, TaskSquare as ListChecks, Mouse as MousePointerClick, ColorSwatch as Palette, DocumentText as Sofa, MagicStar as Sparkles } from "iconsax-reactjs";
import { LAB, defaultPreviewSlug, previewSrc, servicePageVariants, slotIds, slots } from "../../lib/design-lab/registry";
import { requiredPairs } from "../../lib/design-lab/tokens";
import { DeviceFrame, devices } from "./DeviceFrame";
import { useDecisions } from "./useDecisions";
import { Badge } from "./ui";
const areas = [
    { href: `${LAB}/service-pages`, icon: Sofa, title: "Service pages", body: "Every version of the service page template, on desktop, laptop, tablet and phone." },
    { href: `${LAB}/compare`, icon: Columns2, title: "Compare", body: "Versions side by side on the same service, with scrolling kept in step." },
    { href: `${LAB}/foundations`, icon: Palette, title: "Foundations", body: "Brand palette, live WCAG contrast checks, type and buttons." },
    { href: `${LAB}/cards`, icon: Element3, title: "Cards & widgets", body: "20 card and widget types, two variations each. Choose one per type and add notes." },
    { href: `${LAB}/interactions`, icon: MousePointerClick, title: "Interactions", body: "Site-wide motion decisions: FAQ toggle, WhatsApp button, section entrance, hero and links." },
    { href: `${LAB}/motion`, icon: Sparkles, title: "Motion library", body: "Six families of our own custom motions, ported from the Just Shine reference library." },
    { href: `${LAB}/snapshots`, icon: Camera, title: "Snapshots", body: "Frozen iterations, compared side by side or with a wipe." },
    { href: `${LAB}/decisions`, icon: ListChecks, title: "Decisions", body: "What is approved, what is open, and the full history." },
];
export function Overview() {
    const { decisions } = useDecisions();
    const [snapshotCount, setSnapshotCount] = useState(null);
    useEffect(() => {
        fetch(`${LAB}/api/snapshots`, { cache: "no-store" })
            .then((response) => response.json())
            .then((list) => setSnapshotCount(list.length))
            .catch(() => setSnapshotCount(0));
    }, []);
    const pairs = requiredPairs();
    const passing = pairs.filter((pair) => pair.passes).length;
    const approved = decisions ? slotIds.filter((slot) => decisions[slot].current).length : null;
    const open = decisions ? slotIds.filter((slot) => !decisions[slot].current) : [];
    const drifted = decisions ? slotIds.filter((slot) => decisions[slot].drifted) : [];
    const versionCount = servicePageVariants.reduce((total, variant) => total + variant.versions.length, 0);
    const stats = [
        { label: "Service page versions", value: versionCount },
        { label: "Contrast pairs at AA", value: `${passing}/${pairs.length}` },
        { label: "Decisions approved", value: approved === null ? "..." : `${approved}/${slotIds.length}` },
        { label: "Snapshots", value: snapshotCount ?? "..." },
    ];
    return (<>
      <header>
        <p className="text-body-sm font-semibold text-muted">Bait Al Ebdaa Design Lab</p>
        <h1 className="mt-1 max-w-3xl text-4xl font-bold leading-[1.1] tracking-[-0.025em] md:text-5xl">
          Explore, compare and decide, before anything goes live.
        </h1>
      </header>

      <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-line ring-1 ring-line md:grid-cols-4">
        {stats.map((stat) => (<div key={stat.label} className="bg-white p-4">
            <dd className="text-2xl font-bold tracking-tight">{stat.value}</dd>
            <dt className="mt-0.5 text-body-sm text-muted">{stat.label}</dt>
          </div>))}
      </dl>

      {(open.length > 0 || drifted.length > 0) && (<section aria-labelledby="overview-input" className="mt-8 rounded-xl bg-[#f1f8ea] p-5">
          <h2 id="overview-input" className="font-bold">
            Waiting on you
          </h2>
          <ul className="mt-2 space-y-1.5 text-body-sm">
            {open.map((slot) => (<li key={slot} className="flex flex-wrap items-center gap-2">
                <Badge>Open</Badge>
                {slots[slot].label} not chosen yet.{" "}
                <Link href={slots[slot].href} className="font-semibold underline underline-offset-4 hover:text-[#111827]">
                  Review options
                </Link>
              </li>))}
            {drifted.map((slot) => (<li key={slot} className="flex flex-wrap items-center gap-2">
                <Badge tone="danger">Changed</Badge>
                The approved {slots[slot].label.toLowerCase()} was edited after approval.{" "}
                <Link href={`${LAB}/decisions`} className="font-semibold underline underline-offset-4 hover:text-[#111827]">
                  See decisions
                </Link>
              </li>))}
          </ul>
        </section>)}

      <section aria-labelledby="overview-pages" className="mt-10">
        <div className="flex items-end justify-between">
          <h2 id="overview-pages" className="text-xl font-bold tracking-tight">
            Service page template
          </h2>
          <Link href={`${LAB}/service-pages`} className="inline-flex items-center gap-1 text-body-sm font-semibold hover:text-[#111827]">
            View all <ArrowRight color="currentColor" aria-hidden="true" className="size-4"/>
          </Link>
        </div>
        <ul className="mt-4 grid gap-5 sm:grid-cols-2">
          {servicePageVariants.map((variant) => (<li key={variant.id}>
              <Link href={`${LAB}/service-pages/${variant.id}`} className="group block">
                <DeviceFrame thumbnail src={previewSrc(variant.id, variant.versions[variant.versions.length - 1], defaultPreviewSlug)} title={`${variant.name} preview`} width={devices.desktop.width} height={devices.desktop.height}/>
                <p className="mt-2 flex items-center gap-2 font-semibold group-hover:text-[#111827]">
                  {variant.name}
                  {variant.live && <Badge tone="live">Live</Badge>}
                </p>
                <p className="text-body-sm text-muted">{variant.tagline}</p>
              </Link>
            </li>))}
        </ul>
      </section>

      <section aria-labelledby="overview-areas" className="mt-10">
        <h2 id="overview-areas" className="text-xl font-bold tracking-tight">
          Everything else
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {areas.map(({ href, icon: Icon, title, body }) => (<li key={href}>
              <Link href={href} className="flex h-full gap-3 rounded-xl bg-[#f6f7f3] p-4 transition-colors hover:bg-[#f1f8ea]">
                <Icon color="currentColor" aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-[#111827]"/>
                <span>
                  <span className="block font-semibold">{title}</span>
                  <span className="mt-0.5 block text-body-sm text-muted">{body}</span>
                </span>
              </Link>
            </li>))}
        </ul>
      </section>
    </>);
}
