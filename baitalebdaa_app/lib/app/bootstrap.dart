import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../core/platform/crash_reporter.dart';
import '../features/content/data/content_repository.dart';
import '../features/request/data/draft_store.dart';
import '../features/settings/data/settings_store.dart';
import '../features/settings/domain/app_settings.dart';
import 'app.dart';
import 'environment.dart';
import 'firebase_setup.dart';
import 'platform_overrides.dart';

/// Composition root: reads configuration, preloads what the first frame needs, wires
/// error reporting, then starts the app.
Future<void> bootstrap() async {
  WidgetsFlutterBinding.ensureInitialized();
  final environment = AppEnvironment.fromDefines();
  _registerFontLicenses();

  final settingsStore = SettingsStore(SharedPreferencesAsync());
  // Preferences and Firebase start together; the native splash covers both. Unreadable
  // preferences fall back to defaults, and a Firebase failure leaves the app usable.
  final draftStore = DraftStore(SharedPreferencesAsync());
  final (initialSettings, initialDraft, firebaseReady) = await (
    settingsStore.load().catchError((Object _) => const AppSettings()),
    draftStore.load().catchError((Object _) => null),
    initializeFirebase(environment, const ConsoleCrashReporter()),
  ).wait;

  final container = ProviderContainer(
    overrides: [
      appEnvironmentProvider.overrideWithValue(environment),
      settingsStoreProvider.overrideWithValue(settingsStore),
      initialSettingsProvider.overrideWithValue(initialSettings),
      draftStoreProvider.overrideWithValue(draftStore),
      initialDraftProvider.overrideWithValue(initialDraft),
      ...platformOverrides(environment, firebaseReady: firebaseReady),
    ],
    // Retries belong to data sources that know an operation is safe to repeat (Dio retries
    // GETs only). A blanket provider retry would repeat writes and hide real errors.
    retry: (_, _) => null,
  );

  final crashReporter = container.read(crashReporterProvider);
  FlutterError.onError = (details) {
    FlutterError.presentError(details);
    unawaited(crashReporter.recordError(details.exception, details.stack));
  };
  PlatformDispatcher.instance.onError = (error, stack) {
    unawaited(crashReporter.recordError(error, stack, fatal: true));
    return true;
  };

  // Warm the bundled content so the first frame already has it. A failure is not handled
  // here: screens watching the provider show the error state.
  await container.read(contentSnapshotProvider.future).then<void>((_) {}, onError: (Object _) {});

  runApp(UncontrolledProviderScope(container: container, child: const BaitAlEbdaaApp()));
}

void _registerFontLicenses() {
  LicenseRegistry.addLicense(() async* {
    const fonts = [
      ('Cormorant Garamond', 'cormorant-garamond'),
      ('Manrope', 'manrope'),
      ('DM Sans', 'dmsans'),
      ('Tajawal', 'tajawal'),
    ];
    for (final (family, file) in fonts) {
      yield LicenseEntryWithLineBreaks([family], await rootBundle.loadString('assets/licenses/OFL-$file.txt'));
    }
  });
}
