import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../failure/failure.dart';

/// The signed-in identity, as much as the app needs of it. Profile data (phone, language,
/// notification preferences) lives in the user's profile document, not here.
@immutable
class AppUser {
  const AppUser({
    required this.uid,
    required this.isAnonymous,
    this.email,
    this.displayName,
    this.emailVerified = false,
  });

  final String uid;

  /// A silent guest identity created at the first upload or submit, so security rules have
  /// an owner without asking anyone to create an account.
  final bool isAnonymous;
  final String? email;
  final String? displayName;
  final bool emailVerified;

  /// Signed in with a real account, not as a silent guest.
  bool get hasAccount => !isAnonymous;

  @override
  bool operator ==(Object other) =>
      other is AppUser &&
      other.uid == uid &&
      other.isAnonymous == isAnonymous &&
      other.email == email &&
      other.displayName == displayName &&
      other.emailVerified == emailVerified;

  @override
  int get hashCode => Object.hash(uid, isAnonymous, email, displayName, emailVerified);
}

/// Authentication boundary: Firebase Authentication in configured builds,
/// [FakeAuthGateway] in dev without Firebase, [UnconfiguredAuthGateway] otherwise.
/// Every method errors with a [Failure] ([AuthFailure] for refused credentials).
abstract interface class AuthGateway {
  /// Emits the current user immediately, then on every change. `null` means signed out.
  Stream<AppUser?> authStateChanges();

  AppUser? get currentUser;

  Future<AppUser> signInWithEmail({required String email, required String password});

  /// Creates the account, sets its display name and sends a verification email.
  Future<AppUser> createAccount({required String name, required String email, required String password});

  /// Sends a reset link. Completes normally whether or not the email has an account, so
  /// the app never reveals which emails are registered.
  Future<void> sendPasswordReset(String email);

  /// Returns the existing user if one is signed in, otherwise creates a guest identity.
  Future<AppUser> ensureSignedIn();

  Future<void> signOut();

  /// Deletes the signed-in account. Errors with [AuthError.requiresRecentLogin] when the
  /// provider needs a fresh sign-in first.
  Future<void> deleteAccount();
}

/// Used when no backend is configured: browsing works, anything needing an identity fails
/// with [UnavailableFailure] and the screen offers WhatsApp or phone instead.
class UnconfiguredAuthGateway implements AuthGateway {
  const UnconfiguredAuthGateway();

  @override
  Stream<AppUser?> authStateChanges() => Stream<AppUser?>.value(null);

  @override
  AppUser? get currentUser => null;

  @override
  Future<AppUser> signInWithEmail({required String email, required String password}) =>
      Future<AppUser>.error(const UnavailableFailure());

  @override
  Future<AppUser> createAccount({required String name, required String email, required String password}) =>
      Future<AppUser>.error(const UnavailableFailure());

  @override
  Future<void> sendPasswordReset(String email) => Future<void>.error(const UnavailableFailure());

  @override
  Future<AppUser> ensureSignedIn() => Future<AppUser>.error(const UnavailableFailure());

  @override
  Future<void> signOut() async {}

  @override
  Future<void> deleteAccount() => Future<void>.error(const UnavailableFailure());
}

final authGatewayProvider = Provider<AuthGateway>((ref) => const UnconfiguredAuthGateway());

final authStateProvider = StreamProvider<AppUser?>((ref) => ref.watch(authGatewayProvider).authStateChanges());
