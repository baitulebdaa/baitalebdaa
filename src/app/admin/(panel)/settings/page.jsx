import { addedAdminEmails } from "../../../../lib/admin/admins";
import { adminEmails } from "../../../../lib/admin/firebase";
import { isPreview } from "../../../../lib/admin/preview";
import { getAdminProfile } from "../../../../lib/admin/profile";
import { requireAdmin } from "../../../../lib/admin/session";
import { readBusinessFresh } from "../../../../lib/business";
import { BusinessForm } from "../../_components/BusinessForm";
import { IconChart, IconExternal, IconGlobe } from "../../_components/icons";
import { PasswordButton } from "../../_components/PasswordButton";
import { ProfileForm } from "../../_components/ProfileForm";
import { TeamManager } from "../../_components/TeamManager";

export const metadata = { title: "Settings" };

// Settings (owner, 27 Oct 2026), kept simple: your details and password, the business
// details the website shows, who can log in, and links to the website and its tools.
export default async function Settings() {
  const admin = await requireAdmin();
  const owners = isPreview() ? [admin.email] : adminEmails();
  const [profile, business, added] = await Promise.all([
    getAdminProfile(admin.uid),
    readBusinessFresh(),
    isPreview() ? [] : addedAdminEmails().catch(() => []),
  ]);

  return (
    <>
      <h1 className="a-visually-hidden">Settings</h1>
      <section className="a-block">
        <h2>My account</h2>
        <div className="a-setting">
          <span className="a-me__avatar a-setting__avatar" aria-hidden="true">{admin.name.charAt(0)}</span>
          <div className="a-setting__who">
            <strong>{admin.name}</strong>
            <span>{admin.email}</span>
          </div>
          <PasswordButton email={admin.email} />
        </div>
        <ProfileForm name={admin.name} phone={profile.phone} address={profile.address} />
      </section>

      <section className="a-block">
        <h2>Business details on the website</h2>
        <p className="a-setting__note">Phone, WhatsApp, email, address and opening hours shown on every page of the website.</p>
        <BusinessForm business={business} />
      </section>

      <section className="a-block">
        <h2>Who can log in</h2>
        <TeamManager me={admin.email} owners={owners} added={added} />
      </section>

      <section className="a-block">
        <h2>Links</h2>
        <div className="a-links">
          <a className="a-big-btn a-big-btn--open" href="/" target="_blank" rel="noopener noreferrer">
            <IconGlobe size={22} color="currentColor" /> Open website
          </a>
          <a className="a-big-btn a-big-btn--open" href="https://analytics.google.com/" target="_blank" rel="noopener noreferrer">
            <IconChart size={22} color="currentColor" /> Website visitors
          </a>
          <a className="a-big-btn a-big-btn--open" href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer">
            <IconExternal size={22} color="currentColor" /> Google search
          </a>
        </div>
      </section>
    </>
  );
}
