"use client";
import { useState } from "react";
/** Inline CSS custom properties. */
export const v = (vars) => vars;
const CTA = "Book on WhatsApp";
const LINK = "All services";
export function Rep({ n = 0, fn }) {
    return (<>
      {Array.from({ length: n }, (_, i) => (<i key={i} aria-hidden="true" style={v({ "--i": i, "--n": n, ...(fn ? fn(i) : {}) })}/>))}
    </>);
}
/** Remounts its children on each press, so entrance motions can be watched again. */
export function Replay({ children }) {
    const [key, setKey] = useState(0);
    return (<div className="grid w-full justify-items-center gap-3">
      <div key={key} className="grid w-full place-items-center">
        {children}
      </div>
      <button type="button" className="jm-pill" onClick={() => setKey((n) => n + 1)}>
        Replay
      </button>
    </div>);
}
export function Split({ text, cls = "", words = false }) {
    const parts = words ? text.split(" ") : Array.from(text);
    return (<span className={`jm-split ${cls}`} aria-label={text} role="text">
      {parts.map((part, i) => (<span key={i} aria-hidden="true" style={v({ "--i": i, "--n": parts.length })}>
          {part === " " ? " " : part}
          {words && i < parts.length - 1 ? " " : ""}
        </span>))}
    </span>);
}
function Toggle({ spec }) {
    const [on, setOn] = useState(false);
    return (<button type="button" aria-pressed={on} aria-label={spec.l ? undefined : spec.t} data-on={on} onClick={() => setOn((value) => !value)} className={spec.c}>
      <Rep n={spec.n} fn={spec.v}/>
      {/* A second label remounts on each switch so its entrance replays; a single label keeps its transitions. */}
      {spec.l && <span key={spec.alt ? String(on) : "label"}>{on && spec.alt ? spec.alt : spec.l}</span>}
    </button>);
}
function Faq({ spec }) {
    const [on, setOn] = useState(false);
    return (<div className={`jc-faq ${spec.c ?? ""}`} data-on={on}>
      <button type="button" aria-expanded={on} onClick={() => setOn((value) => !value)} className="jc-q">
        <span>{spec.l ?? "How much does sofa cleaning cost?"}</span>
        <i aria-hidden="true"/>
      </button>
      <div className="jc-a" data-on={on} inert={!on}>
        <div>
          <p>{spec.alt ?? "From AED 149. Send photos, and we confirm the price before you book."}</p>
        </div>
      </div>
    </div>);
}
function Burst({ spec }) {
    const [key, setKey] = useState(0);
    const n = spec.n ?? 8;
    return (<button type="button" onClick={() => setKey((k) => k + 1)} className={`jm-btn ${spec.c ?? ""}`}>
      <span>{spec.l ?? CTA}</span>
      {key > 0 && (<b key={key} aria-hidden="true" className="jm-burst">
          {Array.from({ length: n }, (_, i) => (<i key={i} style={v({ "--a": `${(360 / n) * i}deg`, "--i": i })}/>))}
        </b>)}
    </button>);
}
export function MotionDemo({ spec }) {
    const { k, c = "", l, alt, n, v: fn, dir, node } = spec;
    switch (k) {
        case "btn":
        case "ghost":
            return (<button type="button" className={`jm-btn ${k === "ghost" ? "jm-ghost " : ""}${c}`} data-alt={alt ?? l ?? CTA}>
          <span>{l ?? CTA}</span>
          <Rep n={n} fn={fn}/>
        </button>);
        case "link":
            return (<a href="#motion" onClick={(event) => event.preventDefault()} className={`jm-link ${c}`} data-alt={alt ?? l ?? LINK}>
          <span>{l ?? LINK}</span>
          <Rep n={n} fn={fn}/>
        </a>);
        case "loop":
            return node ? (<>{node}</>) : (<div className={c} aria-hidden="true" dir={dir}>
          <Rep n={n} fn={fn}/>
          {l && <span>{l}</span>}
        </div>);
        case "replay":
            return (<Replay>
          {node ?? (<div className={c} dir={dir}>
              <Rep n={n} fn={fn}/>
              {l && <span>{l}</span>}
            </div>)}
        </Replay>);
        case "letters":
        case "words":
            return (<Replay>
          <div dir={dir}>
            <Split text={l ?? ""} cls={c} words={k === "words"}/>
          </div>
        </Replay>);
        case "toggle":
            return <Toggle spec={spec}/>;
        case "faq":
            return <Faq spec={spec}/>;
        case "burst":
            return <Burst spec={spec}/>;
        case "custom":
            return <>{node}</>;
    }
}
