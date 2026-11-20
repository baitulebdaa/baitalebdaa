"use client";
import { useEffect, useState } from "react";
import { Telescope, LayoutGrid, FileText, Rows2, SwatchBook, PanelsTopLeft, Mouse, Sparkles, Camera, ListChecks, PanelLeftClose, PanelLeftOpen, ExternalLink, ArrowRight } from "lucide-react";
import { HERO_IMAGE_BY_SERVICE } from "../../data/service-photos";

import { Preview, Research, Projects, FaqStudy, MotionStudy, sources, versions, title, motions } from "./Studies";

const sections = [
  ["Overview", LayoutGrid], ["Design research", Telescope], ["Service pages", FileText], ["Compare", Rows2],
  ["Foundations", SwatchBook], ["Cards & widgets", PanelsTopLeft], ["Interactions", Mouse],
  ["Motion library", Sparkles], ["Snapshots", Camera], ["Decisions", ListChecks],
];

const questions = ["Choose a service page direction", "Review the colour foundations", "Review the section entrance"];
const destinations = ["Compare", "Foundations", "Motion library"];
const colours = [["Deep green","#1F4A3D"],["Ink","#11110F"],["Muted","#5F5D58"],["Paper","#F3F1EC"],["White","#FFFFFF"]];
const pairs = [[0,4],[1,3],[2,4],[4,0]];
function luminance(hex) {
  const rgb = hex.slice(1).match(/../g).map(v => parseInt(v,16)/255).map(v => v <= .04045 ? v/12.92 : ((v+.055)/1.055)**2.4);
  return rgb[0]*.2126 + rgb[1]*.7152 + rgb[2]*.0722;
}
const checks = pairs.map(([a,b]) => {
  const light = [luminance(colours[a][1]), luminance(colours[b][1])].sort((x,y)=>y-x);
  return (light[0]+.05)/(light[1]+.05);
});
const services = Object.keys(HERO_IMAGE_BY_SERVICE);
const key = "bait-design-review-v1";
export default function Studio({projects}) {
  const [section, go] = useState("Design research");
  const [collapsed, collapse] = useState(false);
  const [mobile, menu] = useState(false);
  const [service, choose] = useState("interior-design");
  const [version, change] = useState(0);
  const [approved, approve] = useState({});
  const [snaps, snapshots] = useState([]);
  const [motion, replay] = useState("Rise");
  const [other, compare] = useState(3);
  const [notice, notify] = useState("");
  useEffect(()=>{
    try {
      const data = JSON.parse(localStorage.getItem(key) || "{}");
      approve(data.approved || {}); snapshots(Array.isArray(data.snaps)?data.snaps:[]);
    } catch {}
  },[]);
  function save(a,s) {
    approve(a); snapshots(s);
    try {localStorage.setItem(key,JSON.stringify({approved:a,snaps:s}));}
    catch {notify("Browser storage is unavailable. Changes last for this session.");}
  }
  function open(name) {go(name);menu(false);notify("");window.scrollTo(0,0);}
  function inspect(v) {change(v); open("Service pages");}
  function capture() {
    save(approved,[{service,version,date:new Date().toISOString()},...snaps]);
    open("Snapshots");
  }
  const count=questions.filter((_,i)=>approved[i]).length;
  const servicePicker=<label>Service <select value={service} onChange={e=>choose(e.target.value)}>{services.map(s=><option value={s} key={s}>{title(s)}</option>)}</select></label>;
  const versionPicker=<label>Direction <select value={version} onChange={e=>change(Number(e.target.value))}>{versions.map((v,i)=><option value={i} key={v}>{v}</option>)}</select></label>;
  return <div className={"lab "+(collapsed?"compact ":"")+(mobile?"mobile-open":"")}>
    <aside><div className="brand"><span className="brand-icon"><Telescope size={21}/></span><div><strong>Bait Al Ebdaa</strong><span>Design Lab</span></div><button className="collapse" aria-label="Toggle sidebar" onClick={()=>collapse(!collapsed)}>{collapsed?<PanelLeftOpen/>:<PanelLeftClose/>}</button><button className="mobile-toggle" aria-expanded={mobile} onClick={()=>menu(!mobile)}>{mobile?"Close":"Menu"}</button></div>
    <nav aria-label="Design lab">{sections.map(([name,Icon])=><button title={name} aria-current={section===name?"page":undefined} key={name} onClick={()=>open(name)}><Icon/><span>{name}</span></button>)}</nav>
    <footer><a href="https://www.baitalebdaa.com/" target="_blank" rel="noreferrer">Open live site <ExternalLink size={14}/></a><p><a href="/design-lab">Back to Design Lab</a></p></footer></aside>
    <main><a href="/design-lab" className="eyebrow">← Design Lab</a><h1>{section==="Overview"?<>Explore, compare and decide,<br className="wide"/> before anything goes live.</>:section}</h1>
    {section==="Overview" && <>
      <div className="stats">{[[versions.length,"Service page versions","Service pages"],[checks.filter(c=>c>=4.5).length+"/"+checks.length,"Contrast pairs at AA","Foundations"],[count+"/"+questions.length,"Decisions approved","Decisions"],[snaps.length,"Snapshots","Snapshots"]].map(([num,label,target])=><button key={label} onClick={()=>open(target)}><strong>{num}</strong>{label}</button>)}</div>
      <section className="waiting"><h2>{count===questions.length?"Review complete":"Waiting on you"}</h2>{questions.map((q,i)=>!approved[i] && <div key={q}><b>Review</b><span>{q}.</span><button onClick={()=>open(destinations[i])}>Open review</button></div>)}{count===questions.length && <p>All three decisions are approved in this browser.</p>}</section>
      <div className="research-banner"><div><h2>Design research</h2><p>Explore five international references and try their patterns with the studio’s own work.</p></div><button className="action" onClick={()=>open("Design research")}>Explore studies</button></div>
      <div className="section-title"><h2>Service page template</h2><button onClick={()=>open("Service pages")}>View all <ArrowRight size={17}/></button></div><Preview service={service} version={version}/>
    </>}
    {section==="Design research" && <Research inspect={inspect}/>}
    {["Service pages","Compare"].includes(section) && <>
      <div className="toolbar">{servicePicker}</div>
      <div className={section==="Compare"?"twocol":""}>
        {(section==="Compare"?[version,other]:[version]).map((v,slot)=><section key={slot}>
          <label>{section==="Compare"?(slot?"Right direction":"Left direction"):"Direction"}
            <select value={v} onChange={e=>(slot?compare:change)(Number(e.target.value))}>{versions.map((name,i)=><option key={name} value={i}>{name}</option>)}</select>
          </label>
          <Preview key={service+v} service={service} version={v}/>
          {sources[v-1] && <p className="study-note">{sources[v-1].test} <a href={sources[v-1].url} target="_blank" rel="noreferrer">{sources[v-1].name} ↗</a></p>}
          <button className="action" onClick={()=>{change(v);open("Decisions");}}>Review this direction</button>
        </section>)}
      </div>{section==="Service pages"&&<button className="action" onClick={capture}><Camera size={16}/> Save snapshot</button>}</>}
    {section==="Foundations" && <><h2>Studio palette</h2><div className="swatches">{colours.map(([name,hex])=><article key={hex}><i style={{background:hex}}/><strong>{name}</strong><small>{hex}</small></article>)}</div><h2>Text contrast</h2>{pairs.map(([a,b],i)=><div className="row" key={i}><b style={{background:colours[b][1],color:colours[a][1],padding:10}}>Aa</b><span>{colours[a][0]} on {colours[b][0]}</span><strong>{checks[i].toFixed(2)}:1</strong></div>)}<button className="action" onClick={()=>open("Decisions")}>Review decisions</button></>}
    {section==="Cards & widgets" && <><Projects projects={projects}/><h2>Service cards</h2><div className="cards">{["interior-design","fit-out","joinery"].map(s=><button key={s} onClick={()=>{choose(s);open("Service pages");}}><img src={HERO_IMAGE_BY_SERVICE[s]} alt=""/><strong>{title(s)}</strong><ArrowRight size={17}/></button>)}</div></>}
    {section==="Interactions" && <>{servicePicker}<FaqStudy key={service} service={service}/><h2>Room inspection</h2><Preview key={service} service={service} version={4}/></>}
    {section==="Motion library" && <><MotionStudy value={motion} change={replay}/> <button className="action" onClick={()=>open("Decisions")}>Review decision</button></>}
    {section==="Snapshots" && <><p>Saved service and layout selections on this device.</p>{!snaps.length&&<div className="empty">Your snapshot collection is empty.</div>}<div className="toolbar">{servicePicker}{versionPicker}<button className="action" onClick={capture}>Save snapshot</button></div><div className="twocol">{snaps.map((s,i)=><article key={s.date+i}><h2>{versions[s.version]}</h2><p>{new Date(s.date).toLocaleString()}</p><Preview service={s.service} version={s.version}/></article>)}</div></>}
    {section==="Decisions" && <>{questions.map((q,i)=><article className="decision" key={q}><div><small>{approved[i]?"Approved":"Awaiting review"}</small><h2>{q}</h2>{i===0&&(approved[i]?<p>{approved[i]}</p>:versionPicker)}{i===2 && (approved[i]?<p>{approved[i]}</p>:<label>Entrance<select value={motion} onChange={e=>replay(e.target.value)}>{motions.map(m=><option key={m}>{m}</option>)}</select></label>)}</div><button className="action" onClick={()=>save({...approved,[i]:approved[i]?null:i===0?versions[version]:i===2?motion:"Approved"},snaps)}>{approved[i]?"Reopen":"Approve"}</button></article>)}</>}
    <p role="status">{notice}</p></main></div>;
}
