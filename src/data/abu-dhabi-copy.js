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
    ['with Dubai Municipality, the Dubai Development Authority, Trakhees, Abu Dhabi Municipality and Civil Defense are managed', "with the relevant authorities for your Abu Dhabi project are managed"],
    [', and full Dubai Municipality / Civil Defense approvals handled in-house.', ", with in-house coordination for applicable Abu Dhabi project approvals."],
    ['Approvals handled in-house — our compliance team manages Dubai Municipality, DDA, Trakhees and Civil Defense submissions directly.', "Approvals handled in-house — our compliance team manages authority submissions for applicable Abu Dhabi project approvals directly."],
    ['Technical packages, Dubai Municipality and NOC coordination.', "Technical packages, authority coordination and NOC support."],
  ],
  ar: [
    ['مع بلدية دبي وسلطة دبي للتطوير وتراخيص وبلدية أبوظبي والدفاع المدني تدار', "لدى الجهات المختصة بمشروعك في أبوظبي تدار"],
    ['مع إدارة كاملة لموافقات بلدية دبي والدفاع المدني داخلياً.', "مع تنسيق داخلي للموافقات المطلوبة لمشروعك في أبوظبي."],
    ['إدارة الموافقات داخلياً — يتولى فريق الامتثال لدينا التقديم المباشر لدى بلدية دبي وسلطة دبي للتطوير وتراخيص والدفاع المدني.', "إدارة الموافقات داخلياً — يتولى فريق الامتثال لدينا التقديم المباشر لدى الجهات المختصة للموافقات المطلوبة لمشروعك في أبوظبي."],
    ['حزم تقنية، تنسيق مع بلدية دبي وشهادات عدم الممانعة.', "حزم تقنية وتنسيق مع الجهات المختصة ودعم في شهادات عدم الممانعة."],
  ],
};

export function abuDhabiCopy(text, lang) {
  if (typeof text !== "string") return text;
  return (REPLACEMENTS[lang === "ar" ? "ar" : "en"] || []).reduce((out, [from, to]) => out.split(from).join(to), text);
}
