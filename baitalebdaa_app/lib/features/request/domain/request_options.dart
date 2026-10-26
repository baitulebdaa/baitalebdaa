/// Choices offered in the request flow. Stored by `name` in Firestore, so renaming a value
/// is a data migration: add new values, never rename existing ones.
///
/// The lists follow the Phase 1 proposal and the website's sectors; the exact wording and
/// the property types per service await business confirmation.
enum PropertyType { villa, townhouse, apartment, penthouse, office, restaurant, retail, commercial, other }

enum ProjectStage { exploring, needDesign, haveDrawings, readyForFitOut, renovating, joineryOnly, other }

/// How the customer would like the first conversation. A factory visit is offered only when
/// remote settings enable it (not yet confirmed by the business).
enum ConsultationType { phone, whatsapp, siteSurvey, factoryVisit }

/// Parts of the published opening hours (Mon–Sat, 8 AM – 10 PM). A preference, never a
/// booked slot; exact windows await business confirmation.
enum TimeWindow { morning, afternoon, evening }

enum AreaUnit { sqft, sqm }

/// The "not sure yet" choice on the services step, stored like a service slug.
const String kServiceNotSure = 'not-sure';
const int kMaxServices = 3;
