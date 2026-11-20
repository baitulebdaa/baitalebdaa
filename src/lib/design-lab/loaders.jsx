import { Preview } from "../../app/design-lab/Studies";
import { servicePageVariants,previewSlugs } from "./registry";
import { serviceContent } from "../../data/service-content";
import { notFound } from "next/navigation";
export const servicePageLoaders=Object.fromEntries(servicePageVariants.map((v,index)=>[v.id+"/v1",async slug=>{
 if(!previewSlugs.some(s=>s.slug===slug))notFound();
 const data=serviceContent[slug].en;
 return <main className="study-preview"><Preview service={slug} version={index}/><section><h2>Service scope</h2><ul>{data.included.map(line=><li key={line}>{line}</li>)}</ul><h2>Questions</h2>{data.faqs.map(f=><details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}</section></main>;
}]));
