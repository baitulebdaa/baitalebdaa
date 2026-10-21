import 'package:flutter/widgets.dart';

import '../../../core/failure/failure.dart';
import '../../theme/context_extensions.dart';

/// The user-facing sentence for any error. Non-[Failure] errors read as "unknown"; raw
/// exception text never reaches the screen.
String failureMessage(BuildContext context, Object error) {
  final l10n = context.l10n;
  if (error is! Failure) return l10n.failureUnknown;
  return switch (error) {
    OfflineFailure() => l10n.failureOffline,
    TimeoutFailure() => l10n.failureTimeout,
    UnauthorisedFailure() => l10n.failureUnauthorised,
    NotFoundFailure() => l10n.failureNotFound,
    RateLimitedFailure() => l10n.failureRateLimited,
    ValidationFailure() => l10n.failureValidation,
    ServerFailure() => l10n.failureServer,
    UnavailableFailure() => l10n.failureUnavailable,
    AuthFailure(:final reason) => switch (reason) {
      AuthError.invalidCredentials => l10n.authErrorInvalidCredentials,
      AuthError.emailInUse => l10n.authErrorEmailInUse,
      AuthError.weakPassword => l10n.authErrorWeakPassword,
      AuthError.invalidEmail => l10n.authErrorInvalidEmail,
      AuthError.tooManyAttempts => l10n.authErrorTooManyAttempts,
      AuthError.userDisabled => l10n.authErrorUserDisabled,
      AuthError.methodDisabled => l10n.authErrorMethodDisabled,
      AuthError.requiresRecentLogin => l10n.authErrorRecentLogin,
    },
    DataFormatFailure() => l10n.failureDataFormat,
    UnknownFailure() => l10n.failureUnknown,
  };
}

/// Whether trying again could help. A malformed bundle or a missing page will not change.
bool isRetryable(Object error) => switch (error) {
  DataFormatFailure() || NotFoundFailure() || AuthFailure() => false,
  _ => true,
};
