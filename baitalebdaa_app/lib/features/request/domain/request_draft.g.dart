// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'request_draft.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_RequestDraft _$RequestDraftFromJson(Map<String, dynamic> json) =>
    $checkedCreate('_RequestDraft', json, ($checkedConvert) {
      final val = _RequestDraft(
        draftId: $checkedConvert('draftId', (v) => v as String),
        serviceIds: $checkedConvert(
          'serviceIds',
          (v) => (v as List<dynamic>?)?.map((e) => e as String).toList() ?? const <String>[],
        ),
        propertyType: $checkedConvert('propertyType', (v) => $enumDecodeNullable(_$PropertyTypeEnumMap, v)),
        emirateId: $checkedConvert('emirateId', (v) => v as String?),
        area: $checkedConvert('area', (v) => v as String? ?? ''),
        sizeValue: $checkedConvert('sizeValue', (v) => (v as num?)?.toInt()),
        sizeUnit: $checkedConvert('sizeUnit', (v) => $enumDecodeNullable(_$AreaUnitEnumMap, v) ?? AreaUnit.sqft),
        sizeUnknown: $checkedConvert('sizeUnknown', (v) => v as bool? ?? false),
        budgetAed: $checkedConvert('budgetAed', (v) => (v as num?)?.toInt()),
        budgetToDiscuss: $checkedConvert('budgetToDiscuss', (v) => v as bool? ?? false),
        stage: $checkedConvert('stage', (v) => $enumDecodeNullable(_$ProjectStageEnumMap, v)),
        consultationType: $checkedConvert('consultationType', (v) => $enumDecodeNullable(_$ConsultationTypeEnumMap, v)),
        preferredDate: $checkedConvert('preferredDate', (v) => v as String?),
        preferredWindow: $checkedConvert('preferredWindow', (v) => $enumDecodeNullable(_$TimeWindowEnumMap, v)),
        timeFlexible: $checkedConvert('timeFlexible', (v) => v as bool? ?? false),
        name: $checkedConvert('name', (v) => v as String? ?? ''),
        phone: $checkedConvert('phone', (v) => v as String? ?? ''),
        email: $checkedConvert('email', (v) => v as String? ?? ''),
        note: $checkedConvert('note', (v) => v as String? ?? ''),
        stepIndex: $checkedConvert('stepIndex', (v) => (v as num?)?.toInt() ?? 0),
      );
      return val;
    });

Map<String, dynamic> _$RequestDraftToJson(_RequestDraft instance) => <String, dynamic>{
  'draftId': instance.draftId,
  'serviceIds': instance.serviceIds,
  'propertyType': _$PropertyTypeEnumMap[instance.propertyType],
  'emirateId': instance.emirateId,
  'area': instance.area,
  'sizeValue': instance.sizeValue,
  'sizeUnit': _$AreaUnitEnumMap[instance.sizeUnit]!,
  'sizeUnknown': instance.sizeUnknown,
  'budgetAed': instance.budgetAed,
  'budgetToDiscuss': instance.budgetToDiscuss,
  'stage': _$ProjectStageEnumMap[instance.stage],
  'consultationType': _$ConsultationTypeEnumMap[instance.consultationType],
  'preferredDate': instance.preferredDate,
  'preferredWindow': _$TimeWindowEnumMap[instance.preferredWindow],
  'timeFlexible': instance.timeFlexible,
  'name': instance.name,
  'phone': instance.phone,
  'email': instance.email,
  'note': instance.note,
  'stepIndex': instance.stepIndex,
};

const _$PropertyTypeEnumMap = {
  PropertyType.villa: 'villa',
  PropertyType.townhouse: 'townhouse',
  PropertyType.apartment: 'apartment',
  PropertyType.penthouse: 'penthouse',
  PropertyType.office: 'office',
  PropertyType.restaurant: 'restaurant',
  PropertyType.retail: 'retail',
  PropertyType.commercial: 'commercial',
  PropertyType.other: 'other',
};

const _$AreaUnitEnumMap = {AreaUnit.sqft: 'sqft', AreaUnit.sqm: 'sqm'};

const _$ProjectStageEnumMap = {
  ProjectStage.exploring: 'exploring',
  ProjectStage.needDesign: 'needDesign',
  ProjectStage.haveDrawings: 'haveDrawings',
  ProjectStage.readyForFitOut: 'readyForFitOut',
  ProjectStage.renovating: 'renovating',
  ProjectStage.joineryOnly: 'joineryOnly',
  ProjectStage.other: 'other',
};

const _$ConsultationTypeEnumMap = {
  ConsultationType.phone: 'phone',
  ConsultationType.whatsapp: 'whatsapp',
  ConsultationType.siteSurvey: 'siteSurvey',
  ConsultationType.factoryVisit: 'factoryVisit',
};

const _$TimeWindowEnumMap = {
  TimeWindow.morning: 'morning',
  TimeWindow.afternoon: 'afternoon',
  TimeWindow.evening: 'evening',
};
