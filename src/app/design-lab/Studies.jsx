"use client";
import { useState } from "react";
import { HERO_IMAGE_BY_SERVICE, WORK_GALLERY_BY_SERVICE } from "../../data/service-photos";
import { serviceContent } from "../../data/service-content";

export const sources = [
  {name:"Norm Architects", url:"https://normcph.com/", finding:"Recent work pairs a project name with a short account of its materials and atmosphere.", use:"Give the photograph room, then place a readable service introduction on a separate paper-coloured panel.", test:"Can you explain the service after reading the introduction?", version:1},
  {name:"Studioilse", url:"https://www.studioilse.com/what-we-do/", finding:"The studio explains its practice through the places people use and the work its team does there.", use:"Lead with the studio’s published service description. Let a second, quieter image support the story.", test:"Does the introduction answer who the service is for before you scroll?", version:2},
  {name:"Vitsœ", url:"https://www.vitsoe.com/gb/606", finding:"The 606 page separates the gallery, construction, prices and buying steps so a reader can investigate one question at a time.", use:"Show the actual service scope as an itemised specification beside a close view of the work.", test:"Can a homeowner identify two included deliverables without opening another page?", version:3},
  {name:"IKEA", url:"https://www.ikea.com/us/en/rooms/living-room/gallery/", finding:"Its living-room gallery organises room stories around practical needs, including storage, family time and working from home.", use:"Let visitors change the room photograph and inspect its caption before opening the service.", test:"Can you find a relevant room detail while keeping your place in the service?", version:4},
  {name:"Snøhetta", url:"https://www.snohetta.com/projects", finding:"The project archive offers grid and list views and lets readers filter by discipline, typology and location.", use:"Pair a visual service cover with a compact index. Offer the same six Bait Al Ebdaa projects as photographs or rows with comparable facts.", test:"Can you identify a commercial project and compare its year and size with another?", version:5},
];
export const versions=["Photo-led hero","Editorial split","Studio essay","Scope sheet","Room contact sheet","Service index"];
export const title = slug => slug.split("-").map(w=>w[0].toUpperCase()+w.slice(1)).join(" ");

export function Preview({service,version}) {
  const [selected, select] = useState(0);
  const data=serviceContent[service].en;
  const cover={src:HERO_IMAGE_BY_SERVICE[service],alt:title(service)+" interior"};
  const photos=[cover,...(WORK_GALLERY_BY_SERVICE[service]||[]).filter(p=>p.src!==cover.src)];
  const image=photos[selected]||cover;
  const link=<a className="service-link" href={"/en/"+service+"/dubai"}>Explore service ↗</a>;
  const heading=<h3>{title(service)} in Dubai</h3>;
  const eyebrow=<small>BAIT AL EBDAA · DUBAI</small>;
  if(version<2) return <article className={"sample v"+version}><img src={cover.src} alt={cover.alt}/><div>{eyebrow}{heading}{version===1&&<p>{data.summary}</p>}{link}</div></article>;
  if(version===2) return <article className="experiment essay">{eyebrow}{heading}<p>{data.summary}</p><figure><img src={cover.src} alt={cover.alt}/>{photos[1]&&<img src={photos[1].src} alt={photos[1].alt}/>}</figure>{link}</article>;
  if(version===3) return <article className="experiment scope"><img src={cover.src} alt={cover.alt}/><div>{eyebrow}{heading}<h4>Included in the scope</h4><ul>{data.included.map(item=><li key={item}>{item}</li>)}</ul>{link}</div></article>;
  if(version===4) return <article className="experiment contact-sheet">{eyebrow}{heading}<figure><img src={image.src} alt={image.alt}/><figcaption>{image.alt}</figcaption></figure><div className="thumbs">{photos.map((p,i)=><button key={p.src} aria-label={"Show "+p.alt} aria-pressed={image.src===p.src} onClick={()=>select(i)}><img src={p.src} alt=""/></button>)}</div>{link}</article>;
  return <article className="experiment index-study"><div>{eyebrow}{heading}{link}</div><img src={cover.src} alt={cover.alt}/><h4>Service index</h4>{Object.keys(HERO_IMAGE_BY_SERVICE).filter(s=>s!==service).slice(0,4).map(s=><a key={s} href={"/en/"+s+"/dubai"}>{title(s)} <span>↗</span></a>)}</article>;
}

export function Research({inspect}) {
  return <><p className="research-intro">Five references for reviewing the service journey, from the first room photograph to the scope of work. Each study uses the studio’s own content.</p><section className="research-recommendation"><h2>Which direction fits the brief?</h2><dl><dt>Joinery enquiry</dt><dd>Start with Scope sheet. A buyer checking what is included can scan the deliverables. Compare it with Room contact sheet when the buyer wants to inspect finishes first.</dd><dt>Interior design enquiry</dt><dd>Try Editorial split alongside Studio essay. The split keeps the room and introduction together. The essay gives the service description more space, but asks the reader to scroll further on a phone.</dd><dt>Finding a comparable project</dt><dd>Use Gallery for visual discovery and Index for comparing size, sector and year. With six completed projects, one sector filter keeps the choice manageable.</dd></dl></section><div className="research-grid">{sources.map(s=><article key={s.name}><small>{versions[s.version]}</small><h2>{s.name}</h2><p>{s.finding}</p><h3>Application</h3><p>{s.use}</p><h3>Review question</h3><p>{s.test}</p><div><button className="action" onClick={()=>inspect(s.version)}>Try this direction</button><a href={s.url} target="_blank" rel="noreferrer">Source ↗</a></div></article>)}</div></>;
}

export function Projects({projects}) {
  const [mode,setMode]=useState("Gallery");
  const [sector,setSector]=useState("All");
  return <section><h2>Project directory</h2><p>Compare photography-led discovery with a compact index of project facts.</p><div className="toolbar"><Choices label="Project layout" values={["Gallery","Index"]} value={mode} change={setMode}/><label>Sector<select value={sector} onChange={e=>setSector(e.target.value)}>{["All",...new Set(projects.map(p=>p.sector))].map(s=><option key={s}>{s}</option>)}</select></label></div><div className={mode==="Gallery"?"project-wall":"project-index"}>{projects.filter(p=>sector==="All"||p.sector===sector).map(p=><a key={p.slug} href={"/en/our-projects/"+p.slug}><img src={p.image} alt=""/><div><small>{p.sector}</small><h3>{p.name}</h3></div><span>{p.size} · {p.year}</span></a>)}</div></section>;
}

export function Choices({label,values,value,change}) {
  return <div className="choices" role="group" aria-label={label}>{values.map(v=><button key={v} aria-pressed={v===value} onClick={()=>change(v)}>{v}</button>)}</div>;
}

export function FaqStudy({service}) {
  const [mode,setMode]=useState("Accordion");
  const [index,setIndex]=useState(0);
  const faqs=serviceContent[service].en.faqs;
  return <section><h2>Service questions</h2><Choices label="FAQ layout" values={["Accordion","Question index"]} value={mode} change={setMode}/><div className="faq-study">{mode==="Accordion"?faqs.map(f=><details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>):<div className="question-index"><div>{faqs.map((f,i)=><button key={f.q} aria-pressed={index===i} onClick={()=>setIndex(i)}>{f.q}</button>)}</div><p>{faqs[index].a}</p></div>}</div></section>;
}

export const motions=["Still","Fade","Rise","Curtain reveal"];
export function MotionStudy({value,change}) {
  const [plays,setPlays]=useState(0);
  return <><h2>Photograph entrance</h2><p>Compare a static entrance with three transitions using the same room. Reduced-motion preferences keep each photograph still.</p><Choices label="Entrance" values={motions} value={value} change={change}/><div className="motion-photo"><img key={value+plays} data-motion={value} src={HERO_IMAGE_BY_SERVICE.joinery} alt="Walk-in closet with fitted shelving"/></div><button className="action" onClick={()=>setPlays(plays+1)}>Replay entrance</button></>;
}

