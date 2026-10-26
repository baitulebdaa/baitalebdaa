// Development-only preview of the admin panel with made-up leads, for checking the design
// before Firebase is connected. On only for `next dev` with ADMIN_PREVIEW=1; a production
// build (NODE_ENV=production) can never turn it on. Nothing here is real customer data.

export const isPreview = () => process.env.NODE_ENV === "development" && process.env.ADMIN_PREVIEW === "1";

export const PREVIEW_ADMIN = { uid: "preview", email: "admin@baitalebdaa.com", name: "Admin" };

const NAMES = ["Sample Lead A", "Sample Lead B", "Sample Lead C", "Sample Lead D", "Sample Lead E", "Sample Lead F"];
const SERVICES = ["Villa Renovation", "Interior Design", "Office Fit-Out", "Joinery", "Apartment Renovation", "Kitchen Design"];
const PLACES = ["Jumeirah, Dubai", "Business Bay, Dubai", "Al Reem, Abu Dhabi", "Al Nuaimiya, Ajman", "JVC, Dubai"];
const CHANNELS = [
  ["website", "Quote form"],
  ["website", "Project enquiry"],
  ["app", "Mobile app"],
  ["askAli", "Ask Ali chat"],
  ["website", "Contact form"],
];
const STATUS_CYCLE = ["submitted", "contacted", "scheduled", "inReview", "completed", "submitted", "cancelled", "actionRequired"];

/** About 60 leads over the last 60 days, the same on every run of the day. */
export function previewLeads(now = Date.now()) {
  const leads = [];
  for (let i = 0; i < 60; i++) {
    const [source, channel] = CHANNELS[(i * 7) % CHANNELS.length];
    const status = STATUS_CYCLE[i % STATUS_CYCLE.length];
    const createdAt = new Date(now - (i * 0.97 + (i % 3) * 0.3) * 86400000 - 3600000 * (i % 5)).toISOString();
    // Visits on the next few days at whole hours between 10 AM and 3 PM, Dubai time.
    const visitDay = new Date(now + ((i % 4) + 1) * 86400000).toISOString().slice(0, 10);
    const visitAt = status === "scheduled" ? new Date(`${visitDay}T${String(10 + (i % 6)).padStart(2, "0")}:00:00+04:00`).toISOString() : null;
    leads.push({
      key: `lead/preview-${i}`,
      kind: "lead",
      id: `preview-${i}`,
      source,
      channel,
      reference: source === "app" ? `BAE-PRV${String(i).padStart(2, "0")}` : null,
      name: NAMES[i % NAMES.length],
      email: "lead@example.com",
      phone: "+10000000000",
      service: SERVICES[i % SERVICES.length],
      location: PLACES[i % PLACES.length],
      message: "Sample message for the design preview.",
      status,
      createdAt,
      updatedAt: createdAt,
      visitAt,
      preferred: source === "app" ? "Site survey · Morning" : null,
      details: [["Note", "Preview data, not a real lead"]],
    });
  }
  return leads;
}

export function previewActivity(now = Date.now()) {
  return [
    { id: "p1", type: "status", text: "Sample Lead B: New → Contacted", by: PREVIEW_ADMIN.email, at: new Date(now - 15 * 60000).toISOString(), leadKey: "lead/preview-1" },
    { id: "p2", type: "status", text: "Sample Lead C: Contacted → Site visit booked", by: PREVIEW_ADMIN.email, at: new Date(now - 3 * 3600000).toISOString(), leadKey: "lead/preview-2" },
  ];
}
