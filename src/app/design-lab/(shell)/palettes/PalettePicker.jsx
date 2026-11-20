"use client";

import { useState } from "react";
import styles from "./palettes.module.css";

const schemes = [
  { name: "Forest + Limestone", canvas: "#F8F6F0", accent: "#1F4A3D", tint: "#EDF3EE" },
  { name: "Forest + Gallery White", canvas: "#FFFFFF", accent: "#1F4A3D", tint: "#F1F3F2" },
  { name: "Ink + Travertine", canvas: "#EEE7DB", accent: "#282B29", tint: "#F5EFE6" },
];

export function PalettePicker({ children }) {
  const [scheme, setScheme] = useState(schemes[0]);
  return (
    <div className={styles.preview} style={{ "--canvas": scheme.canvas, "--accent": scheme.accent, "--selection": scheme.tint }}>
      <h1 className="text-2xl font-bold">Estimator colour study</h1>
      <div role="group" aria-label="Colour scheme" className={styles.choices}>
        {schemes.map(item => (
          <button key={item.name} type="button" aria-pressed={scheme === item} onClick={() => setScheme(item)}>
            {item.name}
          </button>
        ))}
      </div>
      <div className={styles.canvas}>{children}</div>
    </div>
  );
}
