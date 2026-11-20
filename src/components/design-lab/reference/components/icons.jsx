"use client";
import Sparkle from "./Sparkle";
import { Add, ArrowDown2, ArrowLeft, ArrowRight, ArrowUp, Box, Box1, Brush2, Briefcase, Building, Cards, House, Mirror, Profile2User, Setting3, Shop, Cake, Call, Category, Clock, CloseCircle, Copy, Danger, Designtools, DocumentText, Drop, Edit2, Eye, Facebook, Flash, Global, HamburgerMenu, Home2, InfoCircle, Instagram, Judge, Layer, Link21, Location, Lock1, Logout, MagicStar, Man, MessageText, Minus, Moon, Notification, QuoteDown, Reserve, Routing, SearchNormal1, Setting2, Share, ShoppingCart, Sms, Star1, Sun1, Tag, TickCircle, Truck, User, UserTick, Whatsapp, Wind, EyeSlash, Lamp, Refresh2, } from "iconsax-reactjs";
import { SERVICE_ICONS } from "../lib/service-icons";
const ICONS = {
    home: Home2,
    // Services mega menu: one distinct iconsax glyph per service.
    "menu-deep-cleaning": MagicStar,
    "menu-home-cleaning": Home2,
    "menu-maid-service": Profile2User,
    "menu-villa-cleaning": House,
    "menu-apartment-cleaning": Building,
    "menu-move-in-out-cleaning": Truck,
    "menu-carpet-cleaning": Layer,
    "menu-curtain-cleaning": Cards,
    "menu-marble-polishing": Brush2,
    "menu-ac-duct-cleaning": Wind,
    "menu-water-tank-cleaning": Drop,
    "menu-post-construction-cleaning": Setting3,
    "menu-window-cleaning": Mirror,
    "menu-office-cleaning": Briefcase,
    "menu-restaurant-cleaning": Reserve,
    "menu-showroom-cleaning": Shop,
    briefcase: Briefcase,
    box: Box,
    // The shield glyph is banned site-wide.
    truck: Truck,
    globe: Global,
    wrench: Setting2,
    cart: ShoppingCart,
    star: Star1,
    user: User,
    clock: Clock,
    sparkles: MagicStar,
    // Owner rule: the calendar and shield-tick glyphs are never shown; these names fall back to neutral icons.
    calendar: Clock,
    mapPin: Location,
    route: Routing,
    cube: Box1,
    tag: Tag,
    search: SearchNormal1,
    chevronDown: ArrowDown2,
    arrowLeft: ArrowLeft,
    arrowRight: ArrowRight,
    arrowUp: ArrowUp,
    quote: QuoteDown,
    link: Link21,
    copy: Copy,
    share: Share,
    facebook: Facebook,
    instagram: Instagram,
    whatsapp: Whatsapp,
    check2: TickCircle,
    phone: Call,
    menu: HamburgerMenu,
    dashboard: Category,
    layers: Layer,
    building: Building,
    userCheck: UserTick,
    wind: Wind,
    droplet: Drop,
    utensils: Reserve,
    eye: Eye,
    feather: Layer,
    tool: Designtools,
    sun: Sun1,
    moon: Moon,
    plus: Add,
    minus: Minus,
    mail: Sms,
    lock: Lock1,
    doc: DocumentText,
    scale: Judge,
    accessibility: Man,
    cookie: Cake,
    info: InfoCircle,
    alert: Danger,
    edit: Edit2,
    logout: Logout,
    alertCircle: InfoCircle,
    bell: Notification,
    messageSquare: MessageText,
    xCircle: CloseCircle,
    zap: Flash,
    check: TickCircle,
    eyeSlash: EyeSlash,
    loader: Refresh2,
    sofa: Lamp,
    armchair: Lamp,
    bed: Moon,
    "menu-sofa-cleaning": Lamp,
    "menu-mattress-cleaning": Moon,
    "menu-pest-control": Danger,
};
// Service glyphs, by Iconsax name from lib/service-icons.
const SERVICE_GLYPHS = {
    MagicStar, Home2, Profile2User, House, Building, Truck, Lamp, Layer, Moon, Cards, Brush2, Wind, Danger, Drop, Setting3, Mirror, Briefcase, Reserve, Shop,
};
// Brand logos only (X and LinkedIn are not in Iconsax). Every other icon is Iconsax: no hand-drawn icons.
const brandLogos = {
    twitter: <path fill="currentColor" stroke="none" d="M18.9 2H22l-6.8 7.8L23.2 22H17l-4.9-7.4L5.6 22H2.4l8.3-9.5L1 2h6.5l4.5 6.8L18.9 2ZM17.8 20h1.7L6.6 3.9H4.8L17.8 20Z"/>,
    linkedin: <g fill="currentColor" stroke="none"><circle cx="4.5" cy="5" r="2"/><path d="M3 9h3v12H3zm6 0h3v1.6c.9-1.2 2-1.9 3.8-1.9 3.1 0 4.7 1.9 4.7 5.3v7h-3.3v-6.5c0-2-.6-3-2.2-3-1.8 0-2.7 1.2-2.7 3.3V21H9z"/></g>,
};
function sizeFromClass(cn) {
    if (!cn)
        return undefined;
    const utility = cn.match(/(?:^|\s)(?:h|size)-(\d+(?:\.\d+)?)(?=\s|$)/);
    if (utility)
        return Number(utility[1]) * 4;
    if (/\bh-4\b/.test(cn))
        return 16;
    if (/\bh-5\b/.test(cn))
        return 20;
    if (/\bh-6\b/.test(cn))
        return 24;
    if (/\bh-\[18px\]/.test(cn))
        return 18;
    return undefined;
}
export function Icon({ name, className, size }) {
    const dimension = size ?? sizeFromClass(className) ?? 20;
    const logo = brandLogos[name];
    if (logo) {
        return <svg aria-hidden="true" width={dimension} height={dimension} viewBox="0 0 24 24" className={className}>{logo}</svg>;
    }
    // Deep cleaning and "sparkles" use the four-point sparkle outline (owner, 14 Nov: no black MagicStar).
    if (name === "menu-deep-cleaning" || name === "sparkles") {
        return <Sparkle variant="outline" size={dimension} className={className}/>;
    }
    // Iconsax has no plain X, so close is its plus turned 45 degrees.
    if (name === "close" || name === "x") {
        return <Add aria-hidden="true" variant="Linear" color="currentColor" size={dimension} className={`rotate-45 ${className ?? ""}`}/>;
    }
    const Glyph = SERVICE_GLYPHS[SERVICE_ICONS[name] ?? ""] ?? ICONS[name] ?? Box;
    return <Glyph aria-hidden="true" variant="Linear" color="currentColor" size={dimension} className={className}/>;
}
/** Star rating row: Iconsax Star1, filled (owner, 14 Nov: stars above the reviewer's name, Iconsax only). */
export function Stars({ rating, size = 18, className = "" }) {
    const n = Math.max(0, Math.min(5, Math.round(rating)));
    return (<span role="img" aria-label={`${n} out of 5 stars`} className={`flex gap-0.5 ${className}`}>
      {Array.from({ length: n }, (_, i) => (<Star1 key={i} aria-hidden="true" variant="Bold" color="currentColor" size={size}/>))}
    </span>);
}

