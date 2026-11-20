"use client";
import { use, useRef, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Camera, ExportSquare as ExternalLink } from "iconsax-reactjs";
import { ApprovalControl } from "../../../../../components/design-lab/ApprovalControl";
import { AuditPanel } from "../../../../../components/design-lab/AuditPanel";
import { DeviceFrame, deviceIds, devices } from "../../../../../components/design-lab/DeviceFrame";
import { saveSnapshot } from "../../../../../components/design-lab/capture";
import { useDecisions } from "../../../../../components/design-lab/useDecisions";
import { Badge, Button, Modal, PageHeader, Segmented, fieldClass } from "../../../../../components/design-lab/ui";
import { LAB, defaultPreviewSlug, previewSlugs, previewSrc, servicePageVariants, } from "../../../../../lib/design-lab/registry";
const allView = ["desktop", "tablet", "mobile"];
export default function ServicePageVariantPage({ params }) {
    const { id } = use(params);
    const variant = servicePageVariants.find((item) => item.id === id);
    if (!variant)
        notFound();
    return <VariantView variant={variant}/>;
}
function VariantView({ variant }) {
    const [view, setView] = useState("all");
    const [version, setVersion] = useState(variant.versions[variant.versions.length - 1]);
    const [slug, setSlug] = useState(defaultPreviewSlug);
    const [saving, setSaving] = useState(false);
    const [name, setName] = useState("");
    const [note, setNote] = useState("");
    const [savedMessage, setSavedMessage] = useState("");
    const { decisions, setDecisions } = useDecisions();
    const frames = useRef({});
    const visible = view === "all" ? allView : [view];
    const primary = visible[0];
    const src = previewSrc(variant.id, version, slug);
    const slugLabel = previewSlugs.find((item) => item.slug === slug)?.label ?? slug;
    async function snapshot(snapshotName, snapshotNote) {
        const frame = frames.current[primary];
        if (!frame)
            throw new Error("The preview has not loaded yet.");
        return saveSnapshot(frame, {
            name: snapshotName,
            note: snapshotNote,
            subject: `service-page/${variant.id}/${slug}`,
            subjectLabel: `${variant.name} (${slugLabel})`,
            version,
            width: devices[primary].width,
            height: devices[primary].height,
        });
    }
    return (<>
      <Link href={`${LAB}/service-pages`} className="mb-3 inline-flex items-center gap-1 text-body-sm text-muted hover:text-content">
        <ArrowLeft color="currentColor" aria-hidden="true" className="size-4"/>
        All service page versions
      </Link>
      <PageHeader title={variant.name} description={<>
            {variant.live && (<span className="mr-2 align-middle">
                <Badge tone="live">Live</Badge>
              </span>)}
            {variant.idea}
          </>} actions={<>
            <Button onClick={() => {
                setName(`${variant.name} ${version}, ${slugLabel}, ${devices[primary].label.toLowerCase()}`);
                setSaving(true);
            }}>
              <Camera color="currentColor" aria-hidden="true" className="size-4"/>
              Save snapshot
            </Button>
            <ApprovalControl slot="service-page" variantId={variant.id} version={version} label={`${variant.name} ${version}`} decisions={decisions} onChange={setDecisions} capture={async () => (await snapshot(`${variant.name} ${version}, approved`, "Saved automatically on approval.")).id}/>
          </>}/>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Segmented label="Device" value={view} onChange={setView} options={[
            { value: "all", label: "All devices" },
            ...deviceIds.map((device) => {
                const Icon = devices[device].icon;
                return { value: device, label: devices[device].label, icon: <Icon color="currentColor" aria-hidden="true" className="size-4"/> };
            }),
        ]}/>
        {variant.versions.length > 1 && (<Segmented label="Version" value={version} onChange={setVersion} options={variant.versions.map((item) => ({ value: item, label: item }))}/>)}
        <label className="inline-flex items-center gap-2 text-body-sm font-semibold">
          Service
          <select value={slug} onChange={(event) => setSlug(event.target.value)} className="min-h-9 rounded-lg border border-black/20 bg-white px-2 font-normal">
            {previewSlugs.map((item) => (<option key={item.slug} value={item.slug}>
                {item.label}
              </option>))}
          </select>
        </label>
        <a href={src} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-body-sm font-semibold underline underline-offset-4 hover:text-[#111827]">
          Open full page <ExternalLink color="currentColor" aria-hidden="true" className="size-3.5"/>
        </a>
        {savedMessage && (<p role="status" className="text-body-sm text-muted">
            {savedMessage}
          </p>)}
      </div>

      <div className={`mt-5 ${view === "all" ? "flex flex-col gap-6 xl:flex-row xl:items-start" : ""}`}>
        {visible.map((device) => (<div key={`${device}-${slug}`} style={view === "all" ? { flex: `${devices[device].width} 1 0`, minWidth: 0 } : undefined} className={view === device && device !== "desktop" ? "mx-auto" : ""}>
            <DeviceFrame frameRef={(element) => {
                frames.current[device] = element;
            }} src={src} title={`${variant.name} on ${devices[device].label}`} label={devices[device].label} width={devices[device].width} height={devices[device].height}/>
          </div>))}
      </div>

      <div className="mt-6">
        <AuditPanel getFrames={() => visible.flatMap((device) => {
            const frame = frames.current[device];
            return frame ? [{ frame, label: devices[device].label }] : [];
        })}/>
      </div>

      <dl className="mt-8 grid gap-6 border-t border-line pt-6 text-body-sm md:grid-cols-3">
        {[
            ["Best for", variant.bestFor],
            ["Trade-off", variant.tradeOff],
            ["First action", variant.primaryAction],
        ].map(([term, value]) => (<div key={term}>
            <dt className="font-semibold">{term}</dt>
            <dd className="mt-1 text-muted">{value}</dd>
          </div>))}
      </dl>

      <Modal open={saving} title="Save a snapshot" onClose={() => setSaving(false)}>
        <p className="text-body-sm text-muted">
          Freezes the {devices[primary].label.toLowerCase()} preview exactly as it is now, including anything you have opened.
        </p>
        <label className="mt-4 block text-body-sm font-semibold">
          Name
          <input value={name} onChange={(event) => setName(event.target.value)} className={`${fieldClass} h-10`}/>
        </label>
        <label className="mt-3 block text-body-sm font-semibold">
          Note (optional)
          <textarea value={note} onChange={(event) => setNote(event.target.value)} rows={2} className={fieldClass}/>
        </label>
        <div className="mt-5 flex justify-end gap-2">
          <Button tone="quiet" onClick={() => setSaving(false)}>
            Cancel
          </Button>
          <Button tone="primary" disabled={!name.trim()} onClick={async () => {
            try {
                await snapshot(name, note);
                setSavedMessage(`Saved "${name}".`);
            }
            catch (problem) {
                setSavedMessage(problem.message);
            }
            setSaving(false);
            setNote("");
        }}>
            Save
          </Button>
        </div>
      </Modal>
    </>);
}
