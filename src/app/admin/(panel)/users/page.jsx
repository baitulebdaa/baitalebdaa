import { requireAdmin } from "../../../../lib/admin/session";
import { listUsers, requestCounts } from "../../../../lib/admin/users";
import { getLeads } from "../../_components/data";
import { UserCard } from "../../_components/UserCard";

export const metadata = { title: "Users" };

// Users (owner, 27 Oct 2026): everyone with an account on the website or app, newest first,
// under simple tabs, with a search box.
export default async function Users({ searchParams }) {
  await requireAdmin();
  const params = await searchParams;
  const tab = ["active", "blocked"].includes(params?.tab) ? params.tab : "";
  const q = String(params?.q || "").trim().slice(0, 80);
  const [users, leads] = await Promise.all([listUsers(), getLeads().catch(() => [])]);
  const counts = requestCounts(users, leads);
  const now = Date.now();
  const needle = q.toLowerCase().replace(/[\s-]/g, "");
  const shown = users.filter(
    (user) =>
      (!tab || (tab === "blocked") === user.blocked) &&
      (!needle ||
        [user.name, user.email, user.phone].filter(Boolean).some((v) => v.toLowerCase().replace(/[\s-]/g, "").includes(needle)))
  );
  const link = (changes) => {
    const next = new URLSearchParams(Object.entries({ tab, q, ...changes }).filter(([, v]) => v));
    return `/admin/users${next.toString() ? `?${next}` : ""}`;
  };

  return (
    <>
      <div className="a-head">
        <div>
          <h1>Users</h1>
          <p>People with an account on the website or the app.</p>
        </div>
      </div>

      <form className="a-user-search" action="/admin/users" role="search">
        {tab && <input type="hidden" name="tab" value={tab} />}
        <input type="search" name="q" defaultValue={q} placeholder="Find a user (name, email or phone)" aria-label="Find a user" />
        <button type="submit" className="a-big-btn a-big-btn--open">Find</button>
      </form>

      <nav className="a-tabs" aria-label="Show">
        <a className={`a-tab ${!tab ? "is-on" : ""}`} href={link({ tab: "" })}>All <b>{users.length}</b></a>
        <a className={`a-tab ${tab === "active" ? "is-on" : ""}`} href={link({ tab: "active" })}>
          Active <b>{users.filter((u) => !u.blocked).length}</b>
        </a>
        <a className={`a-tab ${tab === "blocked" ? "is-on" : ""}`} href={link({ tab: "blocked" })}>
          Blocked <b>{users.filter((u) => u.blocked).length}</b>
        </a>
      </nav>

      {q && <a className="a-more-link" href={link({ q: "" })}>✕ Clear search</a>}

      {shown.length === 0 ? (
        <p className="a-empty-big">No users here.</p>
      ) : (
        <ul className="a-leads">
          {shown.map((user) => (
            <UserCard key={user.uid} user={user} requests={counts.get(user.uid) || 0} now={now} />
          ))}
        </ul>
      )}
    </>
  );
}
