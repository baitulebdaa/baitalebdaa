import 'dart:io';

import 'package:baitalebdaa_app/app/app.dart';
import 'package:baitalebdaa_app/app/environment.dart';
import 'package:baitalebdaa_app/core/fakes/debug_analytics_sink.dart';
import 'package:baitalebdaa_app/core/fakes/fake_assistant_gateway.dart';
import 'package:baitalebdaa_app/core/fakes/fake_auth_gateway.dart';
import 'package:baitalebdaa_app/core/fakes/fake_file_uploader.dart';
import 'package:baitalebdaa_app/core/fakes/fake_push_gateway.dart';
import 'package:baitalebdaa_app/core/fakes/fake_request_repository.dart';
import 'package:baitalebdaa_app/core/platform/analytics.dart';
import 'package:baitalebdaa_app/core/platform/auth_gateway.dart';
import 'package:baitalebdaa_app/core/platform/file_uploader.dart';
import 'package:baitalebdaa_app/core/platform/push_gateway.dart';
import 'package:baitalebdaa_app/features/assistant/data/assistant_gateway.dart';
import 'package:baitalebdaa_app/features/content/data/content_repository.dart';
import 'package:baitalebdaa_app/features/content/domain/content_models.dart';
import 'package:baitalebdaa_app/features/request/data/draft_store.dart';
import 'package:baitalebdaa_app/features/request/data/request_repository.dart';
import 'package:baitalebdaa_app/features/settings/data/settings_store.dart';
import 'package:baitalebdaa_app/features/settings/domain/app_settings.dart';
import 'package:baitalebdaa_app/features/support/data/contact_launcher.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_riverpod/misc.dart' show Override;
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:shared_preferences_platform_interface/in_memory_shared_preferences_async.dart';
import 'package:shared_preferences_platform_interface/shared_preferences_async_platform_interface.dart';

/// The real generated snapshot, read from disk. rootBundle parses files this size on a
/// background isolate, which widget tests cannot wait for, so tests inject it directly.
final ContentSnapshot realSnapshot = ContentRepository.parse(File(ContentRepository.assetPath).readAsStringSync());

const devEnvironment = AppEnvironment(flavor: AppFlavor.dev, useFakeBackend: true);

/// Fresh in-memory preferences for each test.
void useInMemoryPreferences() {
  SharedPreferencesAsyncPlatform.instance = InMemorySharedPreferencesAsync.empty();
}

/// The dev fakes, each replaceable so a test can swap in exactly the behaviour it needs
/// (Riverpod rejects a provider overridden twice).
List<Override> testOverrides({
  AppSettings settings = const AppSettings(),
  ContentSnapshot? content,
  AssistantGateway? assistant,
  ContactLauncher? contactLauncher,
  AuthGateway? auth,
  RequestRepository? requests,
}) => [
  appEnvironmentProvider.overrideWithValue(devEnvironment),
  settingsStoreProvider.overrideWithValue(SettingsStore(SharedPreferencesAsync())),
  initialSettingsProvider.overrideWithValue(settings),
  draftStoreProvider.overrideWithValue(DraftStore(SharedPreferencesAsync())),
  contentSnapshotProvider.overrideWith((ref) => content ?? realSnapshot),
  authGatewayProvider.overrideWithValue(auth ?? FakeAuthGateway()),
  requestRepositoryProvider.overrideWithValue(requests ?? FakeRequestRepository(delay: Duration.zero)),
  fileUploaderProvider.overrideWithValue(FakeFileUploader()),
  pushGatewayProvider.overrideWithValue(FakePushGateway()),
  analyticsSinkProvider.overrideWithValue(DebugAnalyticsSink()),
  assistantGatewayProvider.overrideWithValue(assistant ?? FakeAssistantGateway()),
  if (contactLauncher != null) contactLauncherProvider.overrideWithValue(contactLauncher),
];

/// Pumps the whole app (router, theme, localisation) at phone size, from launch. Launch
/// goes splash → Home (no sign-in at launch).
Future<void> pumpApp(
  WidgetTester tester, {
  AppSettings settings = const AppSettings(language: AppLanguage.en),
  Size size = const Size(390, 844),
  AssistantGateway? assistant,
  ContactLauncher? contactLauncher,
  AuthGateway? auth,
  RequestRepository? requests,
}) async {
  useInMemoryPreferences();
  tester.view.physicalSize = size;
  tester.view.devicePixelRatio = 1;
  addTearDown(tester.view.reset);
  await tester.pumpWidget(
    ProviderScope(
      overrides: testOverrides(
        settings: settings,
        assistant: assistant,
        contactLauncher: contactLauncher,
        auth: auth,
        requests: requests,
      ),
      retry: (_, _) => null,
      child: const BaitAlEbdaaApp(),
    ),
  );
  await tester.pumpAndSettle();
}

/// Taps the bottom-tab destination with [label].
Future<void> tapTab(WidgetTester tester, String label) async {
  await tester.tap(find.descendant(of: find.byType(NavigationDestination), matching: find.text(label)));
  await tester.pumpAndSettle();
}

/// Scrolls the page (the first vertical scrollable, not a carousel) until [finder] is
/// built and visible, then taps it.
Future<void> scrollAndTap(WidgetTester tester, Finder finder) async {
  final page = find.byWidgetPredicate((widget) => widget is Scrollable && widget.axisDirection == AxisDirection.down);
  await tester.scrollUntilVisible(finder, 300, scrollable: page.first);
  // A widget already built in the cache area below the screen counts as found; bring it on.
  await tester.ensureVisible(finder);
  await tester.pumpAndSettle();
  await tester.tap(finder);
  await tester.pumpAndSettle();
}

/// A signed-in customer for tests that need an account.
FakeAuthGateway signedInAuth({String name = 'Sara Ahmed', String email = 'sara@example.ae'}) => FakeAuthGateway(
  initialUser: AppUser(uid: 'u-sara', isAnonymous: false, email: email, displayName: name),
);
