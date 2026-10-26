import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart' show appFlavor;
import 'package:flutter_riverpod/flutter_riverpod.dart';

enum AppFlavor { dev, stg, prod }

/// Build-time configuration. The environment comes from the native build flavor
/// (`--flavor`, or `default-flavor` in pubspec.yaml); `config/<env>.json` passed with
/// `--dart-define-from-file` may add values but must agree with the flavor.
///
/// Only non-secret values belong here: anything secret lives server-side.
@immutable
class AppEnvironment {
  const AppEnvironment({required this.flavor, required this.useFakeBackend});

  factory AppEnvironment.fromDefines() {
    const appEnv = String.fromEnvironment('APP_ENV');
    const useFakeBackend = String.fromEnvironment('USE_FAKE_BACKEND');
    return AppEnvironment.parse(
      appEnv: appEnv.isEmpty ? null : appEnv,
      useFakeBackend: useFakeBackend.isEmpty ? null : useFakeBackend,
      // appFlavor is a compile-time define: null when analyzed, the real flavor when built.
      // ignore: avoid_redundant_argument_values
      buildFlavor: appFlavor,
    );
  }

  /// Resolves the environment from the build flavor and optional defines. Fakes default
  /// to on for dev only.
  ///
  /// Throws [ArgumentError] for an unknown value, and [StateError] when the defines
  /// contradict the build flavor or production is configured with fakes, so a
  /// misconfigured build fails at launch instead of quietly accepting customer requests
  /// into memory.
  factory AppEnvironment.parse({String? appEnv, String? useFakeBackend, String? buildFlavor}) {
    if (appEnv != null && buildFlavor != null && appEnv != buildFlavor) {
      throw StateError('Built as flavor "$buildFlavor" but configured as APP_ENV "$appEnv".');
    }
    final name = appEnv ?? buildFlavor ?? AppFlavor.dev.name;
    final flavor = AppFlavor.values.asNameMap()[name];
    if (flavor == null) {
      throw ArgumentError.value(name, 'APP_ENV', 'expected one of ${AppFlavor.values.map((f) => f.name)}');
    }
    useFakeBackend ??= (flavor == AppFlavor.dev).toString();
    final fakes = switch (useFakeBackend) {
      'true' => true,
      'false' => false,
      _ => throw ArgumentError.value(useFakeBackend, 'USE_FAKE_BACKEND', 'expected "true" or "false"'),
    };
    if (flavor == AppFlavor.prod && fakes) {
      throw StateError('Production builds cannot use the fake backend.');
    }
    return AppEnvironment(flavor: flavor, useFakeBackend: fakes);
  }

  final AppFlavor flavor;

  /// In-memory implementations of auth, uploads, push and remote settings, so the whole
  /// app runs end to end before a Firebase project exists.
  final bool useFakeBackend;

  bool get isProduction => flavor == AppFlavor.prod;
}

final appEnvironmentProvider = Provider<AppEnvironment>(
  (ref) => throw UnimplementedError('appEnvironmentProvider is overridden in bootstrap'),
);
