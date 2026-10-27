"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IconDashboard, IconGlobe, IconLeads, IconLogout, IconMenu, IconSearch, IconSettings, IconUsers, IconVisits } from "./icons";
import { NewLeadsBell } from "./NewLeadsBell";

// Only what the team uses every day (owner, 27 Oct 2026: simple for people who read little).
const NAV = [
  { label: "Home", href: "/admin", icon: IconDashboard, exact: true },
  { label: "Customers", href: "/admin/leads", icon: IconLeads, badge: true },
  { label: "Visits", href: "/admin/visits", icon: IconVisits },
  { label: "Users", href: "/admin/users", icon: IconUsers },
  { label: "Settings", href: "/admin/settings", icon: IconSettings },
];

export function Shell({ admin, newLeads, preview = false, children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  // On wide screens the menu button hides and shows the sidebar instead.
  const [collapsed, setCollapsed] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  // Close the phone menu after moving to another page.
  useEffect(() => setMenuOpen(false), [pathname]);

  const signOut = async () => {
    setSigningOut(true);
    await fetch("/api/admin/session", { method: "DELETE" }).catch(() => {});
    router.replace("/admin/login");
    router.refresh();
  };

  const isActive = (item) => (item.exact ? pathname === item.href : pathname.startsWith(item.href));

  return (
    <div className={`a-shell ${menuOpen ? "is-menu-open" : ""} ${collapsed ? "is-collapsed" : ""}`}>
      <aside className="a-side" aria-label="Admin menu">
        <a className="a-side__brand" href="/admin" aria-label="Dashboard">
          <Image src="/assets/logo.png" alt="Bait Al Ebdaa" width={2170} height={725} sizes="170px" priority />
        </a>
        <ul className="a-nav">
          {NAV.map((item) => {
            const Icon = item.icon;
            const inner = (
              <>
                <Icon size={26} color="currentColor" variant={isActive(item) ? "Bold" : "Linear"} />
                <span className="a-nav__label">{item.label}</span>
                {item.badge && newLeads > 0 && <span className="a-nav__badge" aria-label={`${newLeads} new`}>{newLeads}</span>}
              </>
            );
            return (
              <li key={item.label}>
                <a href={item.href} className={`a-nav__item ${isActive(item) ? "is-active" : ""}`} aria-current={isActive(item) ? "page" : undefined}>
                  {inner}
                </a>
              </li>
            );
          })}
        </ul>
        <div className="a-side__foot">
          {/* Name, email and Logout on one line (owner, 27 Oct 2026). */}
          <div className="a-me">
            <span className="a-me__avatar" aria-hidden="true">{admin.name.charAt(0)}</span>
            <div>
              <strong>{admin.name}</strong>
              <span title={admin.email}>{admin.email}</span>
            </div>
            <button
              type="button"
              className="a-logout"
              onClick={signOut}
              disabled={signingOut}
              aria-label={signingOut ? "Logging out" : "Logout"}
              title="Logout"
            >
              <IconLogout size={22} color="currentColor" />
            </button>
          </div>
        </div>
      </aside>

      <div className="a-main">
        <header className="a-top">
          <button
            type="button"
            className="a-icon-btn"
            aria-label="Menu"
            aria-expanded={menuOpen || !collapsed}
            onClick={() => (window.matchMedia("(max-width: 1024px)").matches ? setMenuOpen((open) => !open) : setCollapsed((value) => !value))}
          >
            <IconMenu size={22} color="currentColor" />
          </button>
          <form className="a-search" action="/admin/leads" role="search">
            <IconSearch size={18} color="currentColor" />
            <input type="search" name="q" placeholder="Find a customer (name or phone)" aria-label="Find a customer" />
          </form>
          <span className="a-top__spacer" />
          <a className="a-top__lang" href="/" target="_blank" rel="noopener noreferrer">
            <IconGlobe size={20} color="currentColor" /> Website
          </a>
          <NewLeadsBell initialCount={newLeads} />
        </header>
        <main className="a-content">
          {preview && (
            <p className="a-preview" role="note">
              Preview data (development only): these leads are made up to check the design. Real leads appear once
              Firebase is connected.
            </p>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
