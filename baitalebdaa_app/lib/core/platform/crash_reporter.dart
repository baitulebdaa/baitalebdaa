import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

/// Crash and non-fatal error reporting (Crashlytics from Phase 6). Implementations must
/// never attach request contents, contact details or notes as custom keys.
abstract interface class CrashReporter {
  Future<void> recordError(Object error, StackTrace? stack, {bool fatal = false});

  Future<void> setCollectionEnabled(bool enabled);
}

/// Prints to the debug console in debug builds; silent in release until Crashlytics exists.
class ConsoleCrashReporter implements CrashReporter {
  const ConsoleCrashReporter();

  @override
  Future<void> recordError(Object error, StackTrace? stack, {bool fatal = false}) async {
    if (kDebugMode) {
      debugPrint('${fatal ? 'FATAL' : 'Error'}: $error');
      if (stack != null) debugPrintStack(stackTrace: stack, maxFrames: 12);
    }
  }

  @override
  Future<void> setCollectionEnabled(bool enabled) async {}
}

final crashReporterProvider = Provider<CrashReporter>((ref) => const ConsoleCrashReporter());
