import 'package:flutter/material.dart';

/// `system` follows the device language, falling back to English for any language the app
/// does not support.
enum AppLanguage {
  system,
  en,
  ar;

  Locale? get locale => switch (this) {
    system => null,
    en => const Locale('en'),
    ar => const Locale('ar'),
  };
}

@immutable
class AppSettings {
  const AppSettings({this.language = AppLanguage.system, this.themeMode = ThemeMode.system});

  final AppLanguage language;

  /// Light is the brand's signature; dark follows the device by default (Phase 1 doc,
  /// Design deliverable section 11).
  final ThemeMode themeMode;

  AppSettings copyWith({AppLanguage? language, ThemeMode? themeMode}) =>
      AppSettings(language: language ?? this.language, themeMode: themeMode ?? this.themeMode);

  @override
  bool operator ==(Object other) => other is AppSettings && other.language == language && other.themeMode == themeMode;

  @override
  int get hashCode => Object.hash(language, themeMode);
}
