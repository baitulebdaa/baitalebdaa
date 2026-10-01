"use client";

// Site-wide icon set: Iconsax (iconsax-reactjs). Every component imports icons
// from here instead of a vendor package, under the names it already used, so the
// whole site can be re-skinned from one file.
//
// Iconsax has no diagonal "up-right" arrow, so ArrowUpRight is its straight
// ArrowUp rotated 45° (mirrored to -45° in Arabic, matching the old RTL flip).
// Iconsax has no LinkedIn mark either; that one stays an inline brand SVG.

import {
  ArrowUp as IsxArrowUp,
  ArrowRight as IsxArrowRight,
  ArrowLeft as IsxArrowLeft,
  ArrowDown2,
  TickCircle,
  CloseCircle,
  Call,
  Setting2,
  Like1,
  Dislike,
  Star1,
  Magicpen,
  ArrowRotateLeft,
  Add,
  MessageText,
  HamburgerMenu as IsxMenu,
  Location,
  Sms,
  InfoCircle,
  GalleryAdd,
  Global,
  Facebook as IsxFacebook,
  Instagram as IsxInstagram,
  Youtube as IsxYoutube,
  Clock as IsxClock,
  Calendar as IsxCalendar,
  Whatsapp as IsxWhatsapp,
  Paperclip2,
  Home2,
  Category,
  Building3,
} from "iconsax-reactjs";
import { useI18n } from "../i18n/I18nProvider";

const wrap = (Icon, defaults = {}) =>
  function SiteIcon({ size = 24, strokeWidth, absoluteStrokeWidth, ...props }) {
    return <Icon size={size} color="currentColor" {...defaults} {...props} />;
  };

export const ArrowUp = wrap(IsxArrowUp);
export const ArrowRight = wrap(IsxArrowRight);
export const ArrowLeft = wrap(IsxArrowLeft);
export const ChevronDown = wrap(ArrowDown2);
export const Check = wrap(TickCircle, { variant: "Bold" });
export const X = wrap(CloseCircle);
export const Phone = wrap(Call);
export const Wrench = wrap(Setting2);
export const ThumbsUp = wrap(Like1);
export const ThumbsDown = wrap(Dislike);
export const Star = wrap(Star1, { variant: "Bold" });
export const Sparkles = wrap(Magicpen);
export const RotateCcw = wrap(ArrowRotateLeft);
export const Plus = wrap(Add);
export const MessageSquare = wrap(MessageText);
export const Menu = wrap(IsxMenu);
export const MapPin = wrap(Location);
export const Mail = wrap(Sms);
export const Info = wrap(InfoCircle);
export const ImagePlus = wrap(GalleryAdd);
export const Globe = wrap(Global);
export const Facebook = wrap(IsxFacebook);
export const Instagram = wrap(IsxInstagram);
export const Youtube = wrap(IsxYoutube);
export const Clock = wrap(IsxClock);
export const Calendar = wrap(IsxCalendar);
export const Whatsapp = wrap(IsxWhatsapp, { variant: "Bold" });
export const Paperclip = wrap(Paperclip2);
export const Home = wrap(Home2);
export const Services = wrap(Category);
export const Projects = wrap(Building3);

export function ArrowUpRight({ size = 24, style, ...props }) {
  let rtl = false;
  try {
    rtl = useI18n().lang === "ar";
  } catch {
    rtl = false;
  }
  return (
    <IsxArrowUp
      size={size}
      color="currentColor"
      {...props}
      style={{ transform: `rotate(${rtl ? -45 : 45}deg)`, ...style }}
    />
  );
}

export function Linkedin({ size = 24, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
