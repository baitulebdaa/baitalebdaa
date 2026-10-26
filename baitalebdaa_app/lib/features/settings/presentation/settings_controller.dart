import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/platform/analytics.dart';
import '../data/settings_store.dart';
import '../domain/app_settings.dart';

class SettingsController extends Notifier<AppSettings> {
  @override
  AppSettings build() => ref.watch(initialSettingsProvider);

  Future<void> setLanguage(AppLanguage language) async {
    if (language == state.language) return;
    state = state.copyWith(language: language);
    await ref.read(settingsStoreProvider).save(state);
    await ref.read(analyticsSinkProvider).log(LanguageChanged(to: language.name));
  }

  Future<void> setThemeMode(ThemeMode themeMode) async {
    if (themeMode == state.themeMode) return;
    state = state.copyWith(themeMode: themeMode);
    await ref.read(settingsStoreProvider).save(state);
  }
}

final settingsControllerProvider = NotifierProvider<SettingsController, AppSettings>(SettingsController.new);
