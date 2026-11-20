"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Element3, Camera, RowVertical as Columns2, ExportSquare as ExternalLink, Microscope as FlaskConical, Category as LayoutGrid, TaskSquare as ListChecks, HamburgerMenu as Menu, Mouse as MousePointerClick, SidebarLeft as PanelLeftClose, SidebarRight as PanelLeftOpen, ColorSwatch as Palette, DocumentText as Sofa, MagicStar as Sparkles, Add as X } from "iconsax-reactjs";
import { LAB } from "../../lib/design-lab/registry";
const items = [
    { href: LAB, label: "Overview", icon: LayoutGrid },
    {href: LAB+"/research",label:"Design research",icon:Palette},
    { href: `${LAB}/service-pages`, label: "Service pages", icon: Sofa },
    { href: `${LAB}/compare`, label: "Compare", icon: Columns2 },
    { href: `${LAB}/foundations`, label: "Foundations", icon: Palette },
    { href: `${LAB}/cards`, label: "Cards & widgets", icon: Element3 },
    { href: `${LAB}/interactions`, label: "Interactions", icon: MousePointerClick },
    { href: `${LAB}/motion`, label: "Motion library", icon: Sparkles },
    { href: `${LAB}/snapshots`, label: "Snapshots", icon: Camera },
    { href: `${LAB}/decisions`, label: "Decisions", icon: ListChecks },
];
function Logo() {
    return (<span className="flex items-center gap-2.5">
      <span className="grid size-8 place-items-center rounded-lg bg-[#9fe870] text-black">
        <FlaskConical color="currentColor" aria-hidden="true" className="size-4"/>
      </span>
      <span className="leading-tight">
        <span className="block text-[15px] font-bold text-content">Bait Al Ebdaa</span>
        <span className="block text-[12px] font-semibold text-muted">Design Lab</span>
      </span>
    </span>);
}
export function LabShell({ children }) {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    useEffect(() => {
        try {
            // eslint-disable-next-line react-hooks/set-state-in-effect -- browser-only preference, read after hydration.
            setCollapsed(localStorage.getItem("lab-sidebar") === "collapsed");
        }
        catch {
            // Storage can be unavailable; the sidebar just stays open.
        }
    }, []);
    function toggleCollapsed() {
        const next = !collapsed;
        setCollapsed(next);
        try {
            localStorage.setItem("lab-sidebar", next ? "collapsed" : "open");
        }
        catch {
            // Storage can be unavailable; the choice just won't persist.
        }
    }
    const links = (compact) => (<ul className="space-y-0.5">
      {items.map(({ href, label, icon: Icon }) => {
            const on = href === LAB ? pathname === LAB : pathname.startsWith(href);
            return (<li key={href}>
            <Link href={href} onClick={() => setMobileOpen(false)} aria-current={on ? "page" : undefined} aria-label={compact ? label : undefined} title={compact ? label : undefined} className={`flex min-h-10 items-center gap-3 rounded-lg px-3 text-body-sm font-semibold transition-colors ${on ? "bg-[#f1f8ea] text-content" : "text-muted hover:bg-black/[0.04] hover:text-content"} ${compact ? "justify-center px-0" : ""}`}>
              <Icon color="currentColor" aria-hidden="true" className={`size-4 shrink-0 ${on ? "text-[#111827]" : ""}`}/>
              {!compact && label}
            </Link>
          </li>);
        })}
    </ul>);
    return (<div className="flex min-h-screen bg-white text-content">
      <a href="#lab-main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-white focus:p-3">
        Skip to content
      </a>

      <aside className={`sticky top-0 hidden h-screen shrink-0 flex-col border-r border-line bg-white lg:flex ${collapsed ? "w-16" : "w-60"}`}>
        <div className={`flex h-16 items-center ${collapsed ? "justify-center" : "justify-between px-4"}`}>
          {!collapsed && (<Link href={LAB}>
              <Logo />
            </Link>)}
          <button type="button" aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} onClick={toggleCollapsed} className="grid size-9 place-items-center rounded-lg text-muted hover:bg-black/5">
            {collapsed ? <PanelLeftOpen color="currentColor" aria-hidden="true" className="size-4"/> : <PanelLeftClose color="currentColor" aria-hidden="true" className="size-4"/>}
          </button>
        </div>
        <nav aria-label="Lab" className="flex-1 overflow-y-auto px-3 py-2">
          {links(collapsed)}
        </nav>
        {!collapsed && (<div className="border-t border-line px-4 py-3 text-[12px] text-muted">
            <a href="/" target="_blank" rel="noreferrer" className="mb-1 inline-flex items-center gap-1 font-semibold text-content hover:text-[#111827]">
              Open live site <ExternalLink color="currentColor" aria-hidden="true" className="size-3"/>
            </a>
            <p>Local only. Never deployed.</p>
          </div>)}
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-line bg-white px-4 lg:hidden">
          <Link href={LAB}>
            <Logo />
          </Link>
          <button type="button" aria-expanded={mobileOpen} aria-label={mobileOpen ? "Close menu" : "Open menu"} onClick={() => setMobileOpen(!mobileOpen)} className="grid size-11 place-items-center rounded-lg hover:bg-black/5">
            {mobileOpen ? <X color="currentColor" aria-hidden="true" className="size-5 rotate-45"/> : <Menu color="currentColor" aria-hidden="true" className="size-5"/>}
          </button>
        </header>
        {mobileOpen && (<nav aria-label="Lab" className="border-b border-line bg-white p-3 lg:hidden">
            {links(false)}
          </nav>)}
        <main id="lab-main" className="mx-auto max-w-[110rem] px-4 py-6 md:px-8 md:py-8">
          {children}
        </main>
      </div>
    </div>);
}

