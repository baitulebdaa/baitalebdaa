import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../domain/app_settings.dart';

/// Persists non-sensitive preferences. Nothing secret is ever stored here.
class SettingsStore {
  SettingsStore(this._preferences);

  static const _languageKey = 'settings.language';
  static const _themeModeKey = 'settings.themeMode';

  final SharedPreferencesAsync _preferences;

  /// Unknown or missing values fall back to defaults, so a value written by a newer build
  /// never crashes an older one.
  Future<AppSettings> load() async {
    final language = AppLanguage.values.asNameMap()[await _preferences.getString(_languageKey)];
    final themeMode = ThemeMode.values.asNameMap()[await _preferences.getString(_themeModeKey)];
    return AppSettings(language: language ?? AppLanguage.system, themeMode: themeMode ?? ThemeMode.system);
  }

  Future<void> save(AppSettings settings) async {
    await _preferences.setString(_languageKey, settings.language.name);
    await _preferences.setString(_themeModeKey, settings.themeMode.name);
  }
}

final settingsStoreProvider = Provider<SettingsStore>((ref) => SettingsStore(SharedPreferencesAsync()));

/// Settings read before the first frame, so the app never flashes the wrong language or
/// theme. Overridden in bootstrap.
final initialSettingsProvider = Provider<AppSettings>((ref) => const AppSettings());
