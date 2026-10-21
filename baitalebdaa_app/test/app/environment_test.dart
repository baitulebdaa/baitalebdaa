import 'package:baitalebdaa_app/app/app.dart';
import 'package:baitalebdaa_app/app/environment.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  group('AppEnvironment.parse', () {
    test('reads each flavor', () {
      expect(AppEnvironment.parse(appEnv: 'dev', useFakeBackend: 'true').flavor, AppFlavor.dev);
      expect(AppEnvironment.parse(appEnv: 'stg', useFakeBackend: 'false').useFakeBackend, isFalse);
      expect(AppEnvironment.parse(appEnv: 'prod', useFakeBackend: 'false').isProduction, isTrue);
    });

    test('rejects an unknown environment or flag', () {
      expect(() => AppEnvironment.parse(appEnv: 'production', useFakeBackend: 'false'), throwsArgumentError);
      expect(() => AppEnvironment.parse(appEnv: 'dev', useFakeBackend: 'yes'), throwsArgumentError);
    });

    test('refuses fakes in production', () {
      expect(() => AppEnvironment.parse(appEnv: 'prod', useFakeBackend: 'true'), throwsStateError);
    });

    test('follows the build flavor when no config file is given', () {
      final dev = AppEnvironment.parse(buildFlavor: 'dev');
      expect(dev.flavor, AppFlavor.dev);
      expect(dev.useFakeBackend, isTrue, reason: 'fakes default on for dev only');

      final prod = AppEnvironment.parse(buildFlavor: 'prod');
      expect(prod.isProduction, isTrue);
      expect(prod.useFakeBackend, isFalse);
      expect(AppEnvironment.parse(buildFlavor: 'stg').useFakeBackend, isFalse);
    });

    test('defaults to dev with fakes when there is no flavor at all', () {
      final environment = AppEnvironment.parse();
      expect(environment.flavor, AppFlavor.dev);
      expect(environment.useFakeBackend, isTrue);
    });

    test('refuses a config file that contradicts the build flavor', () {
      expect(() => AppEnvironment.parse(appEnv: 'dev', buildFlavor: 'prod'), throwsStateError);
      expect(AppEnvironment.parse(appEnv: 'stg', buildFlavor: 'stg').flavor, AppFlavor.stg);
    });
  });

  group('locale resolution', () {
    const supported = [Locale('ar'), Locale('en')];

    test('matches by language code', () {
      expect(BaitAlEbdaaApp.resolveLocale(const [Locale('ar', 'AE')], supported), const Locale('ar'));
      expect(BaitAlEbdaaApp.resolveLocale(const [Locale('fr'), Locale('en', 'GB')], supported), const Locale('en'));
    });

    test('falls back to English, not to the first supported locale', () {
      expect(BaitAlEbdaaApp.resolveLocale(const [Locale('fr')], supported), const Locale('en'));
      expect(BaitAlEbdaaApp.resolveLocale(null, supported), const Locale('en'));
    });
  });
}
