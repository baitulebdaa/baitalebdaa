import 'package:baitalebdaa_app/core/fakes/debug_analytics_sink.dart';
import 'package:baitalebdaa_app/core/platform/analytics.dart';
import 'package:baitalebdaa_app/features/settings/data/settings_store.dart';
import 'package:baitalebdaa_app/features/settings/domain/app_settings.dart';
import 'package:baitalebdaa_app/features/settings/presentation/settings_controller.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:shared_preferences_platform_interface/in_memory_shared_preferences_async.dart';
import 'package:shared_preferences_platform_interface/shared_preferences_async_platform_interface.dart';

void main() {
  setUp(() => SharedPreferencesAsyncPlatform.instance = InMemorySharedPreferencesAsync.empty());

  group('SettingsStore', () {
    test('defaults when nothing is stored', () async {
      expect(await SettingsStore(SharedPreferencesAsync()).load(), const AppSettings());
    });

    test('round-trips saved settings', () async {
      final store = SettingsStore(SharedPreferencesAsync());
      const saved = AppSettings(language: AppLanguage.ar, themeMode: ThemeMode.dark);
      await store.save(saved);
      expect(await store.load(), saved);
    });

    test('ignores values it does not recognise', () async {
      SharedPreferencesAsyncPlatform.instance = InMemorySharedPreferencesAsync.withData({
        'settings.language': 'fr',
        'settings.themeMode': 'sepia',
      });
      expect(await SettingsStore(SharedPreferencesAsync()).load(), const AppSettings());
    });
  });

  group('SettingsController', () {
    late ProviderContainer container;
    late DebugAnalyticsSink analytics;

    setUp(() {
      analytics = DebugAnalyticsSink();
      container = ProviderContainer(
        overrides: [
          settingsStoreProvider.overrideWithValue(SettingsStore(SharedPreferencesAsync())),
          analyticsSinkProvider.overrideWithValue(analytics),
        ],
      );
      addTearDown(container.dispose);
    });

    test('changes and persists the language, and logs only its code', () async {
      await container.read(settingsControllerProvider.notifier).setLanguage(AppLanguage.ar);

      expect(container.read(settingsControllerProvider).language, AppLanguage.ar);
      expect((await SettingsStore(SharedPreferencesAsync()).load()).language, AppLanguage.ar);
      expect(analytics.events.single.parameters, {'to': 'ar'});
    });

    test('selecting the current value is a no-op', () async {
      await container.read(settingsControllerProvider.notifier).setLanguage(AppLanguage.system);
      expect(analytics.events, isEmpty);
    });

    test('changes and persists the theme mode', () async {
      await container.read(settingsControllerProvider.notifier).setThemeMode(ThemeMode.dark);
      expect((await SettingsStore(SharedPreferencesAsync()).load()).themeMode, ThemeMode.dark);
    });
  });
}
