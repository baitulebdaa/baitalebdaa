import 'package:flutter/foundation.dart';

import 'request_draft.dart';

/// The request lifecycle (Phase 1 doc, section I). Only staff move a request past
/// `submitted`; the app never infers a confirmation from the time the customer chose.
enum RequestStatus {
  submitted,
  inReview,
  actionRequired,
  contacted,

  /// The team set a date and time: the only state shown as "appointment confirmed".
  scheduled,
  rescheduleRequested,
  completed,
  cancelled;

  bool get isFinal => this == completed || this == cancelled;

  /// Unknown values (written by a newer staff tool) read as [submitted] rather than crash.
  static RequestStatus parse(Object? value) => RequestStatus.values.asNameMap()[value] ?? submitted;
}

enum RequestActor { customer, staff }

/// Who may move a request from one state to another. Enforced in Firestore security rules
/// for customers; staff changes are made in the console or a future staff tool.
const Map<RequestStatus, Map<RequestStatus, Set<RequestActor>>> requestTransitions = {
  RequestStatus.submitted: {
    RequestStatus.inReview: {RequestActor.staff},
    RequestStatus.actionRequired: {RequestActor.staff},
    RequestStatus.contacted: {RequestActor.staff},
    RequestStatus.cancelled: {RequestActor.staff, RequestActor.customer},
  },
  RequestStatus.inReview: {
    RequestStatus.actionRequired: {RequestActor.staff},
    RequestStatus.contacted: {RequestActor.staff},
    RequestStatus.scheduled: {RequestActor.staff},
    RequestStatus.cancelled: {RequestActor.staff, RequestActor.customer},
  },
  RequestStatus.actionRequired: {
    RequestStatus.inReview: {RequestActor.customer, RequestActor.staff},
    RequestStatus.cancelled: {RequestActor.staff, RequestActor.customer},
  },
  RequestStatus.contacted: {
    RequestStatus.scheduled: {RequestActor.staff},
    RequestStatus.cancelled: {RequestActor.staff, RequestActor.customer},
  },
  RequestStatus.scheduled: {
    RequestStatus.rescheduleRequested: {RequestActor.staff, RequestActor.customer},
    RequestStatus.completed: {RequestActor.staff},
    RequestStatus.cancelled: {RequestActor.staff, RequestActor.customer},
  },
  RequestStatus.rescheduleRequested: {
    RequestStatus.scheduled: {RequestActor.staff},
    RequestStatus.cancelled: {RequestActor.staff, RequestActor.customer},
  },
  RequestStatus.completed: {},
  RequestStatus.cancelled: {},
};

bool canTransition(RequestStatus from, RequestStatus to, RequestActor actor) =>
    requestTransitions[from]?[to]?.contains(actor) ?? false;

/// A sent request as the customer sees it.
@immutable
class ConsultationRequest {
  const ConsultationRequest({
    required this.id,
    required this.reference,
    required this.status,
    required this.createdAt,
    required this.details,
  });

  final String id;

  /// Short code the customer can quote on the phone, e.g. BAE-7K3Q9.
  final String reference;
  final RequestStatus status;
  final DateTime? createdAt;

  /// What the customer sent.
  final RequestDraft details;
}
