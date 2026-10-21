import 'package:freezed_annotation/freezed_annotation.dart';

import 'request_options.dart';

part 'request_draft.freezed.dart';
part 'request_draft.g.dart';

/// A consultation request being filled in. It lives only on this device (saved after every
/// change so nothing is lost) until the customer sends it. Nothing about a customer who
/// never sends is stored anywhere else.
@freezed
abstract class RequestDraft with _$RequestDraft {
  const factory RequestDraft({
    /// Also the Firestore document id, so a retried send cannot create a second request.
    required String draftId,
    @Default(<String>[]) List<String> serviceIds,
    PropertyType? propertyType,
    String? emirateId,
    @Default('') String area,
    int? sizeValue,
    @Default(AreaUnit.sqft) AreaUnit sizeUnit,
    @Default(false) bool sizeUnknown,
    int? budgetAed,
    @Default(false) bool budgetToDiscuss,
    ProjectStage? stage,
    ConsultationType? consultationType,

    /// Calendar day in Asia/Dubai, `YYYY-MM-DD`.
    String? preferredDate,
    TimeWindow? preferredWindow,
    @Default(false) bool timeFlexible,
    @Default('') String name,
    @Default('') String phone,
    @Default('') String email,
    @Default('') String note,

    /// Index of the step the customer was on, so an unfinished request resumes there.
    @Default(0) int stepIndex,
  }) = _RequestDraft;

  factory RequestDraft.fromJson(Map<String, Object?> json) => _$RequestDraftFromJson(json);
}
