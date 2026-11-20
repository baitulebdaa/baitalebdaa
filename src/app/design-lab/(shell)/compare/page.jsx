"use client";
import { useEffect, useRef, useState } from "react";
import { ApprovalControl } from "../../../../components/design-lab/ApprovalControl";
import { DeviceFrame, deviceIds, devices } from "../../../../components/design-lab/DeviceFrame";
import { saveSnapshot } from "../../../../components/design-lab/capture";
import { useDecisions } from "../../../../components/design-lab/useDecisions";
import { PageHeader, Segmented } from "../../../../components/design-lab/ui";
import { defaultPreviewSlug, previewSlugs, previewSrc, servicePageVariants } from "../../../../lib/design-lab/registry";
const rows = [
    { label: "Idea", value: (variant) => variant.idea },
    { label: "Best for", value: (variant) => variant.bestFor },
    { label: "Trade-off", value: (variant) => variant.tradeOff },
    { label: "Page flow", value: (variant) => variant.flow.map((block) => block.label).join(" → ") },
];
const columns = { 1: "md:grid-cols-1", 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-4" };
/**
 * The preview's window, or null while it shows a browser error page (e.g. the dev server is
 * restarting). Error pages are cross-origin, and touching them throws a SecurityError.
 */
function previewWindow(frame) {
    const win = frame?.contentWindow;
    if (!win)
        return null;
    try {
        return win.document ? win : null;
    }
    catch {
        return null;
    }
}
export default function ComparePage() {
    const [picked, setPicked] = useState(servicePageVariants.slice(0, 2).map((variant) => variant.id));
    const [device, setDevice] = useState("desktop");
    const [slug, setSlug] = useState(defaultPreviewSlug);
    const [sync, setSync] = useState(true);
    const [loaded, setLoaded] = useState(0);
    const { decisions, setDecisions } = useDecisions();
    const frames = useRef({});
    const chosen = servicePageVariants.filter((variant) => picked.includes(variant.id));
    const slugLabel = previewSlugs.find((item) => item.slug === slug)?.label ?? slug;
    // Scrolling one preview moves the others to the same relative position.
    useEffect(() => {
        if (!sync)
            return;
        const cleanups = [];
        let leader = null;
        let release = 0;
        for (const variant of chosen) {
            const win = previewWindow(frames.current[variant.id]);
            if (!win)
                continue;
            const onScroll = () => {
                if (leader && leader !== win)
                    return;
                leader = win;
                window.clearTimeout(release);
                release = window.setTimeout(() => (leader = null), 120);
                const root = win.document.documentElement;
                const ratio = root.scrollTop / Math.max(1, root.scrollHeight - root.clientHeight);
                for (const other of chosen) {
                    const target = previewWindow(frames.current[other.id]);
                    if (!target || target === win)
                        continue;
                    const otherRoot = target.document.documentElement;
                    // The site sets `scroll-behavior: smooth`; followers jump so they don't trail the leader.
                    target.scrollTo({ top: ratio * (otherRoot.scrollHeight - otherRoot.clientHeight), behavior: "instant" });
                }
            };
            win.addEventListener("scroll", onScroll);
            cleanups.push(() => {
                try {
                    win.removeEventListener("scroll", onScroll);
                }
                catch {
                    // The frame has since moved to an error page; its listener went with the old document.
                }
            });
        }
        return () => cleanups.forEach((cleanup) => cleanup());
        // eslint-disable-next-line react-hooks/exhaustive-deps -- `chosen` derives from `picked`; `loaded` rebinds after iframes load.
    }, [sync, picked, loaded, device, slug]);
    function toggle(id) {
        setPicked((current) => current.includes(id) ? (current.length > 1 ? current.filter((item) => item !== id) : current) : [...current, id]);
    }
    return (<>
      <PageHeader title="Compare" description="Service page versions side by side, on the same service and device. Collapse the sidebar for more room."/>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
        <fieldset className="flex flex-wrap items-center gap-2">
          <legend className="sr-only">Versions to compare</legend>
          {servicePageVariants.map((variant) => {
            const on = picked.includes(variant.id);
            return (<button key={variant.id} type="button" aria-pressed={on} onClick={() => toggle(variant.id)} className={`min-h-9 rounded-lg border px-3 text-body-sm font-semibold ${on ? "border-[#9fe870] bg-[#9fe870] text-black" : "border-black/20 hover:bg-black/5"}`}>
                {variant.name}
              </button>);
        })}
        </fieldset>
        <Segmented label="Device" value={device} onChange={setDevice} options={deviceIds.map((id) => {
            const Icon = devices[id].icon;
            return { value: id, label: devices[id].label, icon: <Icon color="currentColor" aria-hidden="true" className="size-4"/> };
        })}/>
        <label className="inline-flex items-center gap-2 text-body-sm font-semibold">
          Service
          <select value={slug} onChange={(event) => setSlug(event.target.value)} className="min-h-9 rounded-lg border border-black/20 bg-white px-2 font-normal">
            {previewSlugs.map((item) => (<option key={item.slug} value={item.slug}>
                {item.label}
              </option>))}
          </select>
        </label>
        <label className="inline-flex min-h-9 cursor-pointer items-center gap-2 text-body-sm">
          <input type="checkbox" checked={sync} onChange={(event) => setSync(event.target.checked)} className="size-4 accent-[#111827]"/>
          Scroll together
        </label>
      </div>

      <div className={`mt-5 grid gap-5 ${columns[chosen.length]}`}>
        {chosen.map((variant) => {
            const version = variant.versions[variant.versions.length - 1];
            return (<div key={`${variant.id}-${device}-${slug}`} className="min-w-0">
              <DeviceFrame frameRef={(element) => {
                    frames.current[variant.id] = element;
                }} onLoad={() => setLoaded((count) => count + 1)} src={previewSrc(variant.id, version, slug)} title={`${variant.name} on ${devices[device].label}`} label={`${variant.name}${variant.live ? " (live)" : ""}`} width={devices[device].width} height={devices[device].height}/>
              <div className="mt-3">
                <ApprovalControl slot="service-page" variantId={variant.id} version={version} label={`${variant.name} ${version}`} decisions={decisions} onChange={setDecisions} capture={async () => {
                    const frame = frames.current[variant.id];
                    if (!frame)
                        throw new Error("The preview has not loaded yet.");
                    const saved = await saveSnapshot(frame, {
                        name: `${variant.name} ${version}, approved`,
                        note: "Saved automatically on approval.",
                        subject: `service-page/${variant.id}/${slug}`,
                        subjectLabel: `${variant.name} (${slugLabel})`,
                        version,
                        width: devices[device].width,
                        height: devices[device].height,
                    });
                    return saved.id;
                }}/>
              </div>
            </div>);
        })}
      </div>

      <div tabIndex={0} role="region" aria-label="Version comparison, scrollable" className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[40rem] border-collapse text-left text-body-sm">
          <caption className="sr-only">How the selected versions differ</caption>
          <thead>
            <tr className="border-b border-black/20">
              <td />
              {chosen.map((variant) => (<th key={variant.id} scope="col" className="px-3 py-2 font-bold">
                  {variant.name}
                </th>))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (<tr key={row.label} className="border-b border-line align-top">
                <th scope="row" className="w-28 py-3 pr-3 font-semibold">
                  {row.label}
                </th>
                {chosen.map((variant) => (<td key={variant.id} className="px-3 py-3 text-muted">
                    {row.value(variant)}
                  </td>))}
              </tr>))}
          </tbody>
        </table>
      </div>
    </>);
}
