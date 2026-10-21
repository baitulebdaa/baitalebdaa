/// Every error the app can show a user, mapped once at the data source.
///
/// Screens switch over this sealed type exhaustively, so adding a case is a compile error
/// until every screen decides how to present it.
sealed class Failure implements Exception {
  const Failure();
}

/// No connection, or the host could not be reached.
final class OfflineFailure extends Failure {
  const OfflineFailure();
}

/// The request was sent but did not complete in time.
final class TimeoutFailure extends Failure {
  const TimeoutFailure();
}

/// The session is missing or expired; the user needs to sign in again.
final class UnauthorisedFailure extends Failure {
  const UnauthorisedFailure();
}

final class NotFoundFailure extends Failure {
  const NotFoundFailure();
}

final class RateLimitedFailure extends Failure {
  const RateLimitedFailure({this.retryAfter});

  final Duration? retryAfter;
}

/// The server rejected the input. Keys are field names, values are server error codes;
/// screens translate the codes, never show them raw.
final class ValidationFailure extends Failure {
  const ValidationFailure(this.fieldErrors);

  final Map<String, String> fieldErrors;
}

final class ServerFailure extends Failure {
  const ServerFailure({this.statusCode});

  final int? statusCode;
}

/// The backend is not configured in this build (no Firebase project yet) or is switched
/// off remotely. Screens offer WhatsApp or phone instead.
final class UnavailableFailure extends Failure {
  const UnavailableFailure();
}

enum AuthError {
  /// Wrong email or password. Deliberately not split into "no such account" and "wrong
  /// password", so the app never reveals which emails are registered.
  invalidCredentials,
  emailInUse,
  weakPassword,
  invalidEmail,
  tooManyAttempts,
  userDisabled,

  /// The sign-in method is switched off in the Firebase console.
  methodDisabled,

  /// A sensitive action (deleting the account) needs a fresh sign-in first.
  requiresRecentLogin,
}

/// A sign-in, sign-up or password-reset attempt was refused.
final class AuthFailure extends Failure {
  const AuthFailure(this.reason);

  final AuthError reason;

  @override
  String toString() => 'AuthFailure: ${reason.name}';
}

/// Bundled or downloaded data did not match the expected format. Not recoverable by retry.
final class DataFormatFailure extends Failure {
  const DataFormatFailure(this.detail);

  final String detail;

  @override
  String toString() => 'DataFormatFailure: $detail';
}

final class UnknownFailure extends Failure {
  const UnknownFailure([this.cause]);

  final Object? cause;

  @override
  String toString() => 'UnknownFailure: $cause';
}
