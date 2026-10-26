// Lead statuses and sources: plain data, safe to import from client components. The ids
// are the mobile app's RequestStatus values, so a status set in the panel shows in the app.
export const STATUSES = [
  { id: "submitted", label: "New", tone: "blue" },
  { id: "inReview", label: "In review", tone: "violet" },
  { id: "contacted", label: "Contacted", tone: "amber" },
  { id: "actionRequired", label: "Waiting on customer", tone: "amber" },
  { id: "scheduled", label: "Site visit booked", tone: "violet" },
  { id: "rescheduleRequested", label: "Reschedule requested", tone: "amber" },
  { id: "completed", label: "Completed", tone: "green" },
  { id: "cancelled", label: "Cancelled", tone: "grey" },
];
export const statusInfo = (id) => STATUSES.find((status) => status.id === id) || STATUSES[0];

export const SOURCES = {
  website: "Website form",
  app: "Mobile app",
  askAli: "Ask Ali chat",
};
