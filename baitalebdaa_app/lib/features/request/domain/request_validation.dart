import 'request_draft.dart';
import 'request_options.dart';

/// The flow's steps, one question each, in the order the customer sees them. Only services,
/// location, consultation and contact are required; the rest can be skipped.
enum RequestStep {
  services,
  property,
  location,
  size,
  stage,
  budget,
  details,
  consultation,
  time,
  contact;

  bool get isOptional => switch (this) {
    property || size || stage || budget || details || time => true,
    services || location || consultation || contact => false,
  };
}

/// The request's screens (owner's design, 26 Oct 2026): several questions on each, in
/// [RequestStep] order. Review and "received" follow the last one.
enum RequestPage {
  requirements([
    RequestStep.services,
    RequestStep.property,
    RequestStep.location,
    RequestStep.size,
    RequestStep.stage,
    RequestStep.budget,
  ]),
  details([RequestStep.details]),
  consultation([RequestStep.consultation, RequestStep.time]),
  contact([RequestStep.contact]);

  const RequestPage(this.steps);

  final List<RequestStep> steps;

  static RequestPage of(RequestStep step) => values.firstWhere((page) => page.steps.contains(step));

  /// Issues that stop the customer leaving this screen.
  Set<RequestIssue> issues(RequestDraft draft) => {for (final step in steps) ...validateStep(step, draft)};
}

enum RequestIssue {
  chooseService,
  chooseEmirate,
  areaTooLong,
  sizeInvalid,
  budgetInvalid,
  chooseConsultation,
  nameRequired,
  nameTooLong,
  phoneInvalid,
  emailInvalid,
  noteTooLong,
}

abstract final class RequestLimits {
  static const maxName = 80;
  static const maxArea = 80;
  static const maxNote = 500;
  static const maxSize = 1000000;
  static const maxBudgetAed = 100000000;
  static const preferredDays = 21;
}

final _email = RegExp(r'^[^\s@]+@[^\s@]+\.[^\s@]+$');
final _e164 = RegExp(r'^\+[1-9]\d{7,14}$');

/// Turns what people type into E.164: "050 123 4567" → "+971501234567". UAE numbers may be
/// typed locally; other countries need their "+" code. Returns null when it cannot be a
/// phone number.
String? normalizePhone(String input) {
  var digits = input.replaceAll(RegExp(r'[\s\-().]'), '');
  if (digits.startsWith('00')) digits = '+${digits.substring(2)}';
  if (digits.startsWith('971')) digits = '+$digits';
  if (RegExp(r'^0[1-9]\d{7,8}$').hasMatch(digits)) digits = '+971${digits.substring(1)}';
  return _e164.hasMatch(digits) ? digits : null;
}

/// Issues that stop the customer leaving [step]. Empty when the step can be left.
Set<RequestIssue> validateStep(RequestStep step, RequestDraft draft) => switch (step) {
  RequestStep.services => {if (draft.serviceIds.isEmpty) RequestIssue.chooseService},
  RequestStep.property => const {},
  RequestStep.location => {
    if (draft.emirateId == null) RequestIssue.chooseEmirate,
    if (draft.area.trim().length > RequestLimits.maxArea) RequestIssue.areaTooLong,
  },
  RequestStep.size => {
    if (draft.sizeValue case final size? when size <= 0 || size > RequestLimits.maxSize) RequestIssue.sizeInvalid,
  },
  RequestStep.budget => {
    if (draft.budgetAed case final budget? when budget <= 0 || budget > RequestLimits.maxBudgetAed)
      RequestIssue.budgetInvalid,
  },
  RequestStep.stage => const {},
  RequestStep.details => {if (draft.note.trim().length > RequestLimits.maxNote) RequestIssue.noteTooLong},
  RequestStep.consultation => {if (draft.consultationType == null) RequestIssue.chooseConsultation},
  RequestStep.time => const {},
  RequestStep.contact => {
    if (draft.name.trim().isEmpty) RequestIssue.nameRequired,
    if (draft.name.trim().length > RequestLimits.maxName) RequestIssue.nameTooLong,
    if (normalizePhone(draft.phone) == null) RequestIssue.phoneInvalid,
    if (draft.email.trim().isNotEmpty && !_email.hasMatch(draft.email.trim())) RequestIssue.emailInvalid,
  },
};

/// The first step with an issue, or null when the whole request can be sent.
RequestStep? firstIncompleteStep(RequestDraft draft) {
  for (final step in RequestStep.values) {
    if (validateStep(step, draft).isNotEmpty) return step;
  }
  return null;
}

/// A selection rule for the services step: up to [kMaxServices], and "not sure" stands alone.
List<String> toggleService(List<String> current, String slug) {
  if (current.contains(slug)) return [...current]..remove(slug);
  if (slug == kServiceNotSure) return const [kServiceNotSure];
  final withoutNotSure = current.where((s) => s != kServiceNotSure).toList();
  if (withoutNotSure.length >= kMaxServices) return withoutNotSure;
  return [...withoutNotSure, slug];
}
