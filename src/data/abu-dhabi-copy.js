// Factual location cleanup for the Abu Dhabi service pages only.
//
// Several shared copy blocks name Dubai authorities (Dubai Municipality, DDA, Trakhees). On an
// Abu Dhabi page that is wrong, and Bait Al Ebdaa has not confirmed which Abu Dhabi authority
// submissions it handles, so the wording is neutral on purpose: no Abu Dhabi authority names
// until the business confirms them. Dubai and every other page keep the original text.
//
// Each pair is an exact substring of the shared text; text without a match is returned as is.
const REPLACEMENTS = {
  en: [
    // B2 (fit-out FAQ), B1 (fit-out summary), A2 (why choose), A1 (process step)
    ['Technical packages, Dubai Municipality and NOC coordination.', "Technical packages, authority coordination and NOC support."],
  ],
  ar: [
    ['حزم تقنية، تنسيق مع بلدية دبي وشهادات عدم الممانعة.', "حزم تقنية وتنسيق مع الجهات المختصة ودعم في شهادات عدم الممانعة."],
  ],
};

export function abuDhabiCopy(text, lang) {
  if (typeof text !== "string") return text;
  return (REPLACEMENTS[lang === "ar" ? "ar" : "en"] || []).reduce((out, [from, to]) => out.split(from).join(to), text);
}
