import 'package:freezed_annotation/freezed_annotation.dart';

part 'localized.freezed.dart';
part 'localized.g.dart';

/// A piece of website content in both languages. The app never machine-translates: both
/// sides come from the website's own copy.
@freezed
abstract class LocalizedText with _$LocalizedText {
  const factory LocalizedText({required String en, required String ar}) = _LocalizedText;

  const LocalizedText._();

  factory LocalizedText.fromJson(Map<String, Object?> json) => _$LocalizedTextFromJson(json);

  String resolve(String languageCode) => languageCode == 'ar' ? ar : en;
}

@freezed
abstract class LocalizedList with _$LocalizedList {
  const factory LocalizedList({required List<String> en, required List<String> ar}) = _LocalizedList;

  const LocalizedList._();

  factory LocalizedList.fromJson(Map<String, Object?> json) => _$LocalizedListFromJson(json);

  List<String> resolve(String languageCode) => languageCode == 'ar' ? ar : en;
}
