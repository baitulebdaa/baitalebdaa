"use client";
import { useEffect, useRef, useState } from "react";
import { Monitor, Mobile as Smartphone, Devices as Tablet } from "iconsax-reactjs";
export const devices = {
    desktop: { label: "Desktop", width: 1440, height: 900, icon: Monitor },
    laptop: { label: "Laptop", width: 1280, height: 600, icon: Monitor },
    tablet: { label: "Tablet", width: 834, height: 1112, icon: Tablet },
    mobile: { label: "Mobile", width: 390, height: 844, icon: Smartphone },
};
export const deviceIds = Object.keys(devices);
/**
 * A real iframe at the device's true width, scaled down to fit. Media queries inside respond
 * as they would on that device, and nothing in the Lab can leak into the experiment.
 */
export function DeviceFrame({ src, title, width, height, label, frameRef, thumbnail = false, sandbox, onLoad, }) {
    const box = useRef(null);
    const [available, setAvailable] = useState(0);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        const element = box.current;
        if (!element)
            return;
        const observer = new ResizeObserver(([entry]) => setAvailable(entry.contentRect.width));
        observer.observe(element);
        return () => observer.disconnect();
    }, []);
    const scale = available ? Math.min(1, available / width) : 0;
    return (<figure ref={box} className="min-w-0">
      {label && (<figcaption className="mb-2 flex items-baseline justify-between gap-2 text-[12px] text-muted">
          <span className="font-semibold text-content">{label}</span>
          <span className="font-mono">
            {width}×{height}
            {scale && scale < 1 ? ` at ${Math.round(scale * 100)}%` : ""}
          </span>
        </figcaption>)}
      <div className="relative mx-auto overflow-hidden rounded-xl bg-[#f6f7f3] ring-1 ring-black/10" style={{ width: width * scale, height: height * scale }}>
        {!loaded && <p className="absolute inset-0 grid place-items-center text-body-sm text-muted">Loading preview</p>}
        {scale > 0 && (<iframe ref={frameRef} src={src} title={title} sandbox={sandbox} loading={thumbnail ? "lazy" : undefined} tabIndex={thumbnail ? -1 : undefined} onLoad={() => {
                setLoaded(true);
                onLoad?.();
            }} style={{
                width,
                height,
                transform: `scale(${scale})`,
                transformOrigin: "0 0",
                pointerEvents: thumbnail ? "none" : undefined,
            }} className={`relative block border-0 bg-white transition-opacity ${loaded ? "opacity-100" : "opacity-0"}`}/>)}
      </div>
    </figure>);
}
