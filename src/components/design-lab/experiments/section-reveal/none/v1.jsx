"use client";
import { demoCopy } from "../../demo-copy";
/** No entrance: the section is in place from the first frame. Nothing to replay or switch off. */
export default function RevealNone({ lang }) {
    const copy = demoCopy[lang];
    return (<section>
      <p className="hp-eyebrow">{copy.eyebrow}</p>
      <h3 className="mt-2 text-xl font-bold leading-snug text-[#111827]">{copy.heading}</h3>
      <ul className="mt-4 border-t border-line">
        {copy.rows.map(([title, body]) => (<li key={title} className="border-b border-line py-3">
            <strong className="block text-[15px] font-bold text-[#111827]">{title}</strong>
            <span className="text-body-sm text-[#4b5563]">{body}</span>
          </li>))}
      </ul>
    </section>);
}
