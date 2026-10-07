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

// Official WhatsApp logo (Simple Icons glyph, CC0) — the mark everyone recognises, not the
// Iconsax approximation used elsewhere. Takes `currentColor` like the other icons.
export function WhatsappLogo({ size = 24, strokeWidth, absoluteStrokeWidth, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

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
