import 'package:flutter/widgets.dart';
import 'package:intl/intl.dart';

import '../../../design_system/theme/context_extensions.dart';
import '../../content/domain/content_models.dart';
import '../domain/consultation_request.dart';
import '../domain/request_draft.dart';
import '../domain/request_options.dart';
import '../domain/request_validation.dart';

/// Localised words for every request option, status and issue, in one place.
extension RequestLabels on BuildContext {
  String propertyLabel(PropertyType type) => switch (type) {
    PropertyType.villa => l10n.propertyVilla,
    PropertyType.townhouse => l10n.propertyTownhouse,
    PropertyType.apartment => l10n.propertyApartment,
    PropertyType.penthouse => l10n.propertyPenthouse,
    PropertyType.office => l10n.propertyOffice,
    PropertyType.restaurant => l10n.propertyRestaurant,
    PropertyType.retail => l10n.propertyRetail,
    PropertyType.commercial => l10n.propertyCommercial,
    PropertyType.other => l10n.propertyOther,
  };

  String stageLabel(ProjectStage stage) => switch (stage) {
    ProjectStage.exploring => l10n.stageExploring,
    ProjectStage.needDesign => l10n.stageNeedDesign,
    ProjectStage.haveDrawings => l10n.stageHaveDrawings,
    ProjectStage.readyForFitOut => l10n.stageReadyForFitOut,
    ProjectStage.renovating => l10n.stageRenovating,
    ProjectStage.joineryOnly => l10n.stageJoineryOnly,
    ProjectStage.other => l10n.stageOther,
  };

  (String, String) consultationLabel(ConsultationType type) => switch (type) {
    ConsultationType.phone => (l10n.consultPhone, l10n.consultPhoneHelp),
    ConsultationType.whatsapp => (l10n.consultWhatsapp, l10n.consultWhatsappHelp),
    ConsultationType.siteSurvey => (l10n.consultSiteSurvey, l10n.consultSiteSurveyHelp),
    ConsultationType.factoryVisit => (l10n.consultFactoryVisit, l10n.consultFactoryVisitHelp),
  };

  String windowLabel(TimeWindow window) => switch (window) {
    TimeWindow.morning => l10n.windowMorning,
    TimeWindow.afternoon => l10n.windowAfternoon,
    TimeWindow.evening => l10n.windowEvening,
  };

  String unitLabel(AreaUnit unit) => switch (unit) {
    AreaUnit.sqft => l10n.unitSqft,
    AreaUnit.sqm => l10n.unitSqm,
  };

  String statusLabel(RequestStatus status) => switch (status) {
    RequestStatus.submitted => l10n.statusSubmitted,
    RequestStatus.inReview => l10n.statusInReview,
    RequestStatus.actionRequired => l10n.statusActionRequired,
    RequestStatus.contacted => l10n.statusContacted,
    RequestStatus.scheduled => l10n.statusScheduled,
    RequestStatus.rescheduleRequested => l10n.statusRescheduleRequested,
    RequestStatus.completed => l10n.statusCompleted,
    RequestStatus.cancelled => l10n.statusCancelled,
  };

  String issueLabel(RequestIssue issue) => switch (issue) {
    RequestIssue.chooseService => l10n.issueChooseService,
    RequestIssue.chooseEmirate => l10n.issueChooseEmirate,
    RequestIssue.areaTooLong => l10n.issueTooLong(RequestLimits.maxArea),
    RequestIssue.sizeInvalid => l10n.issueSizeInvalid,
    RequestIssue.budgetInvalid => l10n.issueBudgetInvalid,
    RequestIssue.chooseConsultation => l10n.issueChooseConsultation,
    RequestIssue.nameRequired => l10n.validationRequired,
    RequestIssue.nameTooLong => l10n.issueTooLong(RequestLimits.maxName),
    RequestIssue.phoneInvalid => l10n.issuePhoneInvalid,
    RequestIssue.emailInvalid => l10n.validationEmail,
    RequestIssue.noteTooLong => l10n.issueTooLong(RequestLimits.maxNote),
  };

  /// Service names from the website snapshot, in the current language.
  String servicesLabel(List<String> ids, ContentSnapshot content) => ids
      .map((id) {
        if (id == kServiceNotSure) return l10n.stepServicesNotSure;
        final service = content.service(id);
        return service == null ? id : localized(service.name);
      })
      .join(isArabic ? '، ' : ', ');

  String emirateLabel(String? id, ContentSnapshot content) {
    final emirate = content.business.emirates.where((e) => e.id == id).firstOrNull;
    return emirate == null ? l10n.reviewNotGiven : localized(emirate.name);
  }

  /// "Tue 4 Nov". Western digits in both languages, as on the website.
  String shortDate(DateTime date) {
    final code = Localizations.localeOf(this).languageCode;
    return '${DateFormat.E(code).format(date)} ${date.day} ${DateFormat.MMM(code).format(date)}';
  }

  String preferredTimeLabel(RequestDraft draft) {
    if (draft.timeFlexible) return l10n.stepTimeFlexible;
    final date = DateTime.tryParse(draft.preferredDate ?? '');
    final window = draft.preferredWindow;
    final parts = [if (date != null) shortDate(date), if (window != null) windowLabel(window)];
    return parts.isEmpty ? l10n.reviewNotGiven : parts.join(' · ');
  }
}

/// AED amount with Western digits and grouping, e.g. "AED 250,000".
String formatAed(int amount) => 'AED ${NumberFormat.decimalPattern('en').format(amount)}';
