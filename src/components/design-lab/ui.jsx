"use client";
import { useEffect, useRef } from "react";
import { Add as X } from "iconsax-reactjs";
const buttonTones = {
    primary: "bg-[#9fe870] text-black hover:bg-[#b2f08b]",
    secondary: "border border-black/15 bg-white text-content hover:border-black/30",
    quiet: "text-content hover:bg-black/5",
    danger: "border border-red-700/40 text-red-700 hover:bg-red-50",
};
export function Button({ tone = "secondary", className = "", ...props }) {
    return (<button type="button" {...props} className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-3.5 text-body-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:border-transparent disabled:bg-black/5 disabled:text-black/35 ${buttonTones[tone]} ${className}`}/>);
}
export function PageHeader({ title, description, actions, }) {
    return (<header className="flex flex-col gap-4 border-b border-line pb-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl">
        <h1 className="text-[1.75rem] font-bold leading-tight tracking-[-0.02em] text-content">{title}</h1>
        {description && <p className="mt-2 text-[15px] text-muted">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </header>);
}
export function Segmented({ label, value, options, onChange, }) {
    return (<div role="group" aria-label={label} className="inline-flex flex-wrap rounded-lg bg-black/[0.05] p-1">
      {options.map((option) => {
            const on = option.value === value;
            return (<button key={option.value} type="button" aria-pressed={on} onClick={() => onChange(option.value)} className={`inline-flex min-h-8 items-center gap-1.5 rounded-md px-3 text-body-sm font-semibold transition-colors ${on ? "bg-white text-content shadow-sm" : "text-muted hover:text-content"}`}>
            {option.icon}
            {option.label}
          </button>);
        })}
    </div>);
}
export function Badge({ tone = "neutral", children, }) {
    const tones = {
        neutral: "bg-black/[0.06] text-muted",
        approved: "bg-[#9fe870] text-black",
        live: "border border-[#d8edd0] bg-[#f1f8ea] text-[#111827]",
        warning: "bg-amber-50 text-amber-800",
        danger: "bg-red-50 text-red-700",
    };
    return (<span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[12px] font-semibold ${tones[tone]}`}>
      {children}
    </span>);
}
export function Modal({ open, title, onClose, children, }) {
    const dialog = useRef(null);
    useEffect(() => {
        if (open && !dialog.current?.open)
            dialog.current?.showModal();
        if (!open && dialog.current?.open)
            dialog.current.close();
    }, [open]);
    return (<dialog ref={dialog} aria-labelledby="lab-modal-title" onClose={onClose} className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl bg-white p-0 text-content backdrop:bg-black/40">
      {open && (<div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <h2 id="lab-modal-title" className="text-lg font-bold leading-snug">
              {title}
            </h2>
            <button type="button" aria-label="Close" onClick={onClose} className="grid size-9 shrink-0 place-items-center rounded-full hover:bg-black/5">
              <X color="currentColor" aria-hidden="true" className="size-4 rotate-45"/>
            </button>
          </div>
          <div className="mt-3">{children}</div>
        </div>)}
    </dialog>);
}
export const fieldClass = "mt-1 w-full rounded-lg border border-black/20 bg-white p-2 text-body-sm font-normal focus:border-black focus:outline-none";
export function formatDate(iso) {
    return new Date(iso).toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}
