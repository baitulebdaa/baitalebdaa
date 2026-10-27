// Lead statuses and sources: plain data, safe to import from client components. The ids
// are the mobile app's RequestStatus values, so a status set in the panel shows in the app.
//
// Simple words (owner, 27 Oct 2026: the team should not need to read much). The five with
// `main: true` are the buttons staff press; the others can only come from the app and are
// shown, never offered.
export const STATUSES = [
  { id: "submitted", label: "New", tone: "blue", main: true },
  { id: "contacted", label: "Called", tone: "amber", main: true },
  { id: "scheduled", label: "Visit booked", tone: "violet", main: true },
  { id: "completed", label: "Done", tone: "green", main: true },
  { id: "cancelled", label: "Cancelled", tone: "grey", main: true },
  { id: "inReview", label: "Checking", tone: "amber" },
  { id: "actionRequired", label: "Waiting for customer", tone: "amber" },
  { id: "rescheduleRequested", label: "Wants new time", tone: "amber" },
];
export const MAIN_STATUSES = STATUSES.filter((status) => status.main);
export const statusInfo = (id) => STATUSES.find((status) => status.id === id) || STATUSES[0];

// The tabs on the Customers page: each groups one or more statuses.
export const TABS = [
  { id: "new", label: "New", statuses: ["submitted"] },
  { id: "called", label: "Called", statuses: ["contacted", "inReview", "actionRequired", "rescheduleRequested"] },
  { id: "visit", label: "Visit", statuses: ["scheduled"] },
  { id: "done", label: "Done", statuses: ["completed"] },
  { id: "cancelled", label: "Cancelled", statuses: ["cancelled"] },
];

export const SOURCES = {
  website: "Website",
  app: "App",
  askAli: "Ask Ali chat",
};
