"use client";
import { useMemo, useState } from "react";
import { SearchNormal1 as Search } from "iconsax-reactjs";
import { Badge, PageHeader, Segmented } from "../../../../components/design-lab/ui";
import { MotionDemo } from "../../../../components/design-lab/motion/kit";
import { families } from "../../../../components/design-lab/motion/families";
import "../../../../components/design-lab/motion/base.css";
import "../../../../components/design-lab/motion/touch.css";
import "../../../../components/design-lab/motion/waiting.css";
import "../../../../components/design-lab/motion/type.css";
import "../../../../components/design-lab/motion/content.css";
import "../../../../components/design-lab/motion/controls.css";
import "../../../../components/design-lab/motion/scenes.css";
const numbered = (() => {
    let no = 0;
    return families.flatMap((family) => family.motions.map((motion) => ({ ...motion, no: ++no, family: family.label })));
})();
function Study({ motion }) {
    return (<li className="flex flex-col gap-3 rounded-2xl p-4 ring-1 ring-line">
      <div>
        <p className="text-[12px] font-semibold text-muted">
          Motion {motion.no} · {motion.family}
        </p>
        <h3 className="font-bold leading-snug">{motion.t}</h3>
      </div>
      <div className="jm-stage">
        <MotionDemo spec={motion}/>
      </div>
      <p className="text-body-sm leading-snug text-muted">{motion.note}</p>
    </li>);
}
export default function MotionLibraryPage() {
    const [tab, setTab] = useState(families[0].id);
    const [query, setQuery] = useState("");
    const family = families.find((item) => item.id === tab) ?? families[0];
    const shown = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q)
            return numbered.filter((motion) => motion.family === family.label);
        return numbered.filter((motion) => `${motion.t} ${motion.note} ${motion.family}`.toLowerCase().includes(q));
    }, [query, family.label]);
    const first = numbered.findIndex((motion) => motion.family === family.label) + 1;
    return (<>
      <PageHeader title={`Motion library: ${numbered.length} motions`} description="Original motion studies from Just Shine: cleaning, our services and the site's real parts. Each rests in its finished state and stops under reduced motion. Nothing here is approved; the good ones move into Interactions as options." actions={<Badge>Exploration</Badge>}/>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Segmented label="Family" value={tab} onChange={(value) => {
            setTab(value);
            setQuery("");
        }} options={families.map((item) => ({ value: item.id, label: item.label }))}/>
        <label className="relative flex items-center">
          <span className="sr-only">Search motions</span>
          <Search color="currentColor" aria-hidden="true" className="pointer-events-none absolute start-3 size-4 text-muted"/>
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search, e.g. steam, FAQ, price" className="h-10 w-72 rounded-lg bg-white ps-9 pe-3 text-body-sm ring-1 ring-black/15 focus:outline-none focus:ring-2 focus:ring-black"/>
        </label>
      </div>
      <p className="mt-2 text-body-sm text-muted">
        {query
            ? `${shown.length} match${shown.length === 1 ? "" : "es"} across all families.`
            : `${family.blurb} Motion ${first} to ${first + family.motions.length - 1}.`}
      </p>

      <ul key={query ? "search" : tab} className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {shown.map((motion) => (<Study key={motion.no} motion={motion}/>))}
      </ul>
    </>);
}
