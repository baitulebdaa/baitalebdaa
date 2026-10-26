import { requireAdmin } from "../../../lib/admin/session";
import { SOURCES } from "../../../lib/admin/statuses";
import {
  dailySeries, needsAttention, parseRange, recentActivity, smooth, sourceBreakdown, summary, upcomingVisits,
} from "../../../lib/admin/stats";
import { LeadsChart, SourcesDonut } from "../_components/Charts";
import { getActivity, getLeads } from "../_components/data";
import { dayAndMonth, formatDate, formatTime, timeAgo } from "../_components/format";
import {
  IconChart, IconChat, IconDone, IconDown, IconExternal, IconLeads, IconMobile, IconMore, IconUp, IconVisits,
} from "../_components/icons";
import { RangeSelect } from "../_components/RangeSelect";
import { StatusPill } from "../_components/StatusPill";

export const metadata = { title: "Dashboard" };

const CARD_ICONS = { leads: IconLeads, visits: IconVisits, followed: IconChat, completed: IconDone };
const ACTIVITY_COLORS = { new: "#4f7fd6", status: "#2f9b6a" };

function Change({ value }) {
  if (value === null) return <div className="a-stat__change">New</div>;
  if (value === 0) return <div className="a-stat__change is-flat">No change</div>;
  const Arrow = value > 0 ? IconUp : IconDown;
  return (
    <div className={`a-stat__change ${value < 0 ? "is-down" : ""}`}>
      <Arrow size={14} color="currentColor" /> {Math.abs(value)}%
    </div>
  );
}

// The design's dashboard, from real leads only. Its "Quotes Sent" and "Projects Won" have
// no data behind them yet, so the cards count follow-ups and completed leads instead, and
// "Ongoing Projects" is "Needs Attention". Visitor numbers stay in Google Analytics.
export default async function Dashboard({ searchParams }) {
  const admin = await requireAdmin();
  const days = parseRange((await searchParams)?.range);
  const [leads, activity] = await Promise.all([getLeads(), getActivity().catch(() => [])]);
  const now = Date.now();
  const cards = summary(leads, days, now);
  const chart = dailySeries(leads, days, now);
  // Day-by-day counts are spiky; longer ranges show a moving average, as the caption says.
  const average = days >= 90 ? 7 : days >= 30 ? 3 : 1;
  const series = Object.fromEntries(Object.entries(chart.series).map(([key, values]) => [key, smooth(values, average)]));
  const sources = sourceBreakdown(leads, days, now);
  const visits = upcomingVisits(leads, now);
  const attention = needsAttention(leads, now);
  const events = recentActivity(leads, activity);
  const from = formatDate(new Date(now - (days - 1) * 86400000).toISOString());
  const to = formatDate(new Date(now).toISOString());
  const firstName = admin.name.split(/[\s._-]/)[0];

  return (
    <>
      <div className="a-head">
        <div>
          <h1>Welcome back, {firstName.charAt(0).toUpperCase() + firstName.slice(1)}</h1>
          <p>Here&apos;s what&apos;s happening with your business · {from} – {to}</p>
        </div>
        <RangeSelect value={days} />
      </div>

      <section className="a-stats" aria-label="Summary">
        {cards.map((card) => {
          const Icon = CARD_ICONS[card.id];
          return (
            <div className="a-card a-stat" key={card.id}>
              <span className="a-stat__icon"><Icon size={34} color="currentColor" /></span>
              <div>
                <div className="a-stat__label">{card.label}</div>
                <div className="a-stat__value">{card.value.toLocaleString("en-US")}</div>
                <Change value={card.change} />
                <div className="a-stat__vs">vs previous {days} days</div>
              </div>
            </div>
          );
        })}
        <a className="a-card a-stat" href="https://analytics.google.com/" target="_blank" rel="noopener noreferrer">
          <span className="a-stat__icon"><IconChart size={34} color="currentColor" /></span>
          <div>
            <div className="a-stat__label">Website Visitors</div>
            <div className="a-stat__value" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              GA4 <IconExternal size={18} color="currentColor" />
            </div>
            <div className="a-stat__note">Visitor numbers are in Google Analytics.</div>
          </div>
        </a>
      </section>

      <div className="a-grid-2">
        <section className="a-card">
          <div className="a-card__head">
            <h2>Leads Overview</h2>
            <span className="a-link" style={{ color: "var(--a-muted)" }}>
              {average > 1 ? `Leads per day, ${average}-day average` : "Leads per day"}
            </span>
          </div>
          <LeadsChart dates={chart.dates} series={series} />
        </section>
        <section className="a-card">
          <div className="a-card__head"><h2>Lead Sources</h2></div>
          <SourcesDonut total={sources.total} parts={sources.parts} />
        </section>
      </div>

      <div className="a-grid-2">
        <section className="a-card">
          <div className="a-card__head">
            <h2>Recent Inquiries</h2>
            <a className="a-link" href="/admin/leads">View All</a>
          </div>
          {leads.length === 0 ? (
            <p className="a-empty">No inquiries yet. Website forms, Ask Ali quotes and app requests appear here as they arrive.</p>
          ) : (
            <div className="a-table-wrap">
              <table className="a-table">
                <thead>
                  <tr>
                    <th>Name</th><th>Service</th><th>Source</th><th>Date</th><th>Status</th>
                    <th><span style={{ position: "absolute", left: -9999 }}>Open</span></th>
                  </tr>
                </thead>
                <tbody>
                  {leads.slice(0, 6).map((lead) => (
                    <tr key={lead.key}>
                      <td className="a-table__name">{lead.name}</td>
                      <td>{lead.service || "—"}</td>
                      <td>{SOURCES[lead.source]}</td>
                      <td>{formatDate(lead.createdAt)}</td>
                      <td><StatusPill status={lead.status} /></td>
                      <td>
                        <a className="a-more" href={`/admin/leads/${lead.key}`} aria-label={`Open ${lead.name}`}>
                          <IconMore size={18} color="currentColor" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
        <section className="a-card">
          <div className="a-card__head">
            <h2>Needs Attention</h2>
            <a className="a-link" href="/admin/leads?status=submitted">View All</a>
          </div>
          {attention.length === 0 ? (
            <p className="a-empty">Nothing waiting. New leads older than a day and reschedule requests show here.</p>
          ) : (
            <ul className="a-list a-attn">
              {attention.map((lead) => (
                <li key={lead.key}>
                  <a href={`/admin/leads/${lead.key}`}>
                    <span>
                      <strong>{lead.name}</strong>
                      <small>{lead.service || SOURCES[lead.source]} · {timeAgo(lead.createdAt, now)}</small>
                    </span>
                    <StatusPill status={lead.status} />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <div className="a-grid-3">
        <section className="a-card">
          <div className="a-card__head"><h2>Quick Actions</h2></div>
          <div className="a-actions">
            <a className="a-action" href="/admin/leads?status=submitted"><IconLeads size={18} color="currentColor" /> New leads</a>
            <a className="a-action" href="/admin/visits"><IconVisits size={18} color="currentColor" /> Site visits</a>
            <a className="a-action" href="/admin/leads?source=app"><IconMobile size={18} color="currentColor" /> App requests</a>
            <a className="a-action" href="/" target="_blank" rel="noopener noreferrer"><IconExternal size={18} color="currentColor" /> Open website</a>
            <a className="a-action" href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer"><IconChart size={18} color="currentColor" /> Search Console</a>
            <a className="a-action" href="https://console.firebase.google.com/project/baitalebdaa/authentication/users" target="_blank" rel="noopener noreferrer"><IconDone size={18} color="currentColor" /> Admin accounts</a>
          </div>
        </section>
        <section className="a-card">
          <div className="a-card__head">
            <h2>Upcoming Site Visits</h2>
            <a className="a-link" href="/admin/visits">View All</a>
          </div>
          {visits.length === 0 ? (
            <p className="a-empty">No visits booked. Set a lead to “Site visit booked” with a date to add one.</p>
          ) : (
            <ul className="a-list">
              {visits.map((lead) => {
                const { day, month } = dayAndMonth(lead.visitAt);
                return (
                  <li key={lead.key}>
                    <a className="a-visit" href={`/admin/leads/${lead.key}`}>
                      <span className="a-date"><strong>{day}</strong><span>{month}</span></span>
                      <span>
                        <strong>{lead.service || "Site visit"}</strong>
                        <small>{lead.name}{lead.location ? ` · ${lead.location}` : ""}</small>
                      </span>
                      <time dateTime={lead.visitAt}>{formatTime(lead.visitAt)}</time>
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
        <section className="a-card">
          <div className="a-card__head"><h2>Recent Activities</h2></div>
          {events.length === 0 ? (
            <p className="a-empty">No activity yet.</p>
          ) : (
            <ul className="a-list a-activity">
              {events.map((event) => (
                <li key={event.id}>
                  <span className="a-activity__icon" style={{ background: ACTIVITY_COLORS[event.kind] }} aria-hidden="true">
                    {event.kind === "new" ? <IconLeads size={13} color="#fff" /> : <IconDone size={13} color="#fff" />}
                  </span>
                  {event.href ? <a href={event.href}>{event.text}</a> : <span>{event.text}</span>}
                  <time dateTime={event.at}>{timeAgo(event.at, now)}</time>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}
