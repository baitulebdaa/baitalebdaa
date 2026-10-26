"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  IconBell, IconBlog, IconDashboard, IconEstimator, IconForms, IconGlobe, IconLeads, IconLogout, IconMedia,
  IconMenu, IconPages, IconPortfolio, IconProjects, IconSearch, IconServices, IconSettings, IconTeam,
  IconTestimonials, IconUsers, IconVisits,
} from "./icons";

// The design's menu. Items without `href` are planned: their content still lives in the
// website's code (src/data), so they show as "Soon" until it moves to the database.
const NAV = [
  { label: "Dashboard", href: "/admin", icon: IconDashboard, exact: true },
  { label: "Leads & Inquiries", href: "/admin/leads", icon: IconLeads, badge: true },
  { label: "Projects", icon: IconProjects },
  { label: "Bookings / Site Visits", href: "/admin/visits", icon: IconVisits },
  { label: "Services", icon: IconServices },
  { label: "Projects Portfolio", icon: IconPortfolio },
  { label: "Pages & Content", icon: IconPages },
  { label: "Media Library", icon: IconMedia },
  { label: "Testimonials", icon: IconTestimonials },
  { label: "Team Members", icon: IconTeam },
  { label: "Blog / Articles", icon: IconBlog },
  { label: "Forms & Quotes", icon: IconForms },
  { label: "Cost Estimator", icon: IconEstimator },
  { label: "Users & Roles", icon: IconUsers },
  { label: "Settings", icon: IconSettings },
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
                <Icon size={20} color="currentColor" variant={item.href && isActive(item) ? "Bold" : "Linear"} />
                <span className="a-nav__label">{item.label}</span>
                {item.badge && newLeads > 0 && <span className="a-nav__badge" aria-label={`${newLeads} new`}>{newLeads}</span>}
                {!item.href && <span className="a-nav__soon">Soon</span>}
              </>
            );
            return (
              <li key={item.label}>
                {item.href ? (
                  <a href={item.href} className={`a-nav__item ${isActive(item) ? "is-active" : ""}`} aria-current={isActive(item) ? "page" : undefined}>
                    {inner}
                  </a>
                ) : (
                  <span className="a-nav__item is-soon" aria-disabled="true">{inner}</span>
                )}
              </li>
            );
          })}
        </ul>
        <div className="a-side__foot">
          {/* Logout sits at the end of the account row (owner, 26 Oct 2026). */}
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
              aria-label={signingOut ? "Signing out" : "Logout"}
              title="Logout"
            >
              <IconLogout size={20} color="currentColor" />
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
            <input type="search" name="q" placeholder="Search leads by name, email, phone or service…" aria-label="Search leads" />
          </form>
          <span className="a-top__spacer" />
          <a className="a-top__lang" href="/" target="_blank" rel="noopener noreferrer">
            <IconGlobe size={18} color="currentColor" /> View website
          </a>
          <a className="a-icon-btn" href="/admin/leads?status=submitted" aria-label={newLeads > 0 ? `${newLeads} new leads` : "No new leads"}>
            <IconBell size={22} color="currentColor" />
            {newLeads > 0 && <span className="a-icon-btn__dot" />}
          </a>
          <span className="a-top__brand">
            <Image src="/assets/footer logo.png" alt="" width={2170} height={725} sizes="150px" />
          </span>
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
