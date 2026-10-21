// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'localized.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_LocalizedText _$LocalizedTextFromJson(Map<String, dynamic> json) =>
    $checkedCreate('_LocalizedText', json, ($checkedConvert) {
      final val = _LocalizedText(
        en: $checkedConvert('en', (v) => v as String),
        ar: $checkedConvert('ar', (v) => v as String),
      );
      return val;
    });

Map<String, dynamic> _$LocalizedTextToJson(_LocalizedText instance) => <String, dynamic>{
  'en': instance.en,
  'ar': instance.ar,
};

_LocalizedList _$LocalizedListFromJson(Map<String, dynamic> json) =>
    $checkedCreate('_LocalizedList', json, ($checkedConvert) {
      final val = _LocalizedList(
        en: $checkedConvert('en', (v) => (v as List<dynamic>).map((e) => e as String).toList()),
        ar: $checkedConvert('ar', (v) => (v as List<dynamic>).map((e) => e as String).toList()),
      );
      return val;
    });

Map<String, dynamic> _$LocalizedListToJson(_LocalizedList instance) => <String, dynamic>{
  'en': instance.en,
  'ar': instance.ar,
};
