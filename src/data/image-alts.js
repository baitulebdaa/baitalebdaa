// Natural-language alt text for the interior photography, keyed by file name, in both
// site languages. Describes what is visible (not keywords). Decorative uses of the same
// photos (e.g. small thumbnails inside link tiles) should keep alt="" instead.
export const imageAlts = {
  "walk-in-closet-island-led-ceiling.jpeg": {
    en: "Walk-in closet with a central island, glass-fronted wardrobes and LED ceiling lighting",
    ar: "غرفة ملابس واسعة بجزيرة مركزية وخزائن بواجهات زجاجية وإضاءة LED في السقف",
  },
  "study-nook-wardrobe-led-shelving-wood-slats.jpeg": {
    en: "Study nook with a floating desk, backlit wood shelving and slatted wall panelling beside a fitted wardrobe",
    ar: "ركن دراسة بمكتب معلّق ورفوف خشبية بإضاءة خلفية وتغطية جدارية بشرائح خشبية بجانب خزانة مدمجة",
  },
  "hallway-wardrobe-bench-upholstered-panel.jpeg": {
    en: "Hallway wardrobe with a built-in bench and an upholstered wall panel",
    ar: "خزانة ممر مع مقعد مدمج ولوح جداري منجّد",
  },
  "double-height-tv-wall-fireplace-curtains.jpeg": {
    en: "Double-height living room with a stone TV wall, linear fireplace and floor-to-ceiling curtains",
    ar: "غرفة معيشة بارتفاع مزدوج مع جدار تلفاز حجري ومدفأة خطية وستائر من الأرض إلى السقف",
  },
  "corner-wardrobe-glass-doors-black-handles.jpeg": {
    en: "Corner wardrobe with smoked glass doors and long black handles",
    ar: "خزانة زاوية بأبواب زجاج مدخّن ومقابض سوداء طويلة",
  },
  "living-room-curved-sofa-wood-slat-wall.jpeg": {
    en: "Living room with a curved sofa in front of a wood-slat feature wall",
    ar: "غرفة معيشة بأريكة منحنية أمام جدار مميز بشرائح خشبية",
  },
  "villa-majlis-living-room-wood-wall-cove-ceiling.jpeg": {
    en: "Villa living room with wood wall panelling, a corner sofa and a cove-lit ceiling",
    ar: "غرفة معيشة في فيلا بجدران خشبية وأريكة زاوية وسقف بإضاءة مخفية",
  },
};

export function imageAlt(src, lang) {
  const entry = imageAlts[String(src).split("/").pop()];
  return entry ? entry[lang === "ar" ? "ar" : "en"] : "";
}
