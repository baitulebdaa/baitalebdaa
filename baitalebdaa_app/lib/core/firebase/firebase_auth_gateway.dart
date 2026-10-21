import 'package:firebase_auth/firebase_auth.dart';

import '../failure/failure.dart';
import '../platform/auth_gateway.dart';

/// [AuthGateway] backed by Firebase Authentication.
class FirebaseAuthGateway implements AuthGateway {
  FirebaseAuthGateway(this._auth);

  final FirebaseAuth _auth;

  @override
  Stream<AppUser?> authStateChanges() => _auth.userChanges().map(_toAppUser);

  @override
  AppUser? get currentUser => _toAppUser(_auth.currentUser);

  @override
  Future<AppUser> signInWithEmail({required String email, required String password}) => _guard(() async {
    final result = await _auth.signInWithEmailAndPassword(email: email.trim(), password: password);
    return _toAppUser(result.user)!;
  });

  @override
  Future<AppUser> createAccount({required String name, required String email, required String password}) =>
      _guard(() async {
        final result = await _auth.createUserWithEmailAndPassword(email: email.trim(), password: password);
        final user = result.user!;
        await user.updateDisplayName(name.trim());
        // Best effort: an account that exists without a sent verification email is still
        // usable, and the user can ask for another link later.
        try {
          await user.sendEmailVerification();
        } on FirebaseAuthException {
          // Ignored deliberately; see above.
        }
        await user.reload();
        return _toAppUser(_auth.currentUser)!;
      });

  @override
  Future<void> sendPasswordReset(String email) => _guard(() => _auth.sendPasswordResetEmail(email: email.trim()));

  @override
  Future<AppUser> ensureSignedIn() => _guard(() async {
    final existing = _auth.currentUser;
    if (existing != null) return _toAppUser(existing)!;
    final result = await _auth.signInAnonymously();
    return _toAppUser(result.user)!;
  });

  @override
  Future<void> signOut() => _guard(_auth.signOut);

  @override
  Future<void> deleteAccount() => _guard(() async => _auth.currentUser?.delete());

  static AppUser? _toAppUser(User? user) => user == null
      ? null
      : AppUser(
          uid: user.uid,
          isAnonymous: user.isAnonymous,
          email: user.email,
          displayName: user.displayName,
          emailVerified: user.emailVerified,
        );

  static Future<T> _guard<T>(Future<T> Function() action) async {
    try {
      return await action();
    } on FirebaseAuthException catch (error) {
      throw failureFromAuthCode(error.code);
    }
  }
}

/// Firebase Authentication error codes → [Failure]. Unknown codes are kept as the cause of
/// an [UnknownFailure] for crash reports; the user sees a generic message.
Failure failureFromAuthCode(String code) => switch (code) {
  'invalid-credential' ||
  'invalid-login-credentials' ||
  'wrong-password' ||
  'user-not-found' => const AuthFailure(AuthError.invalidCredentials),
  'email-already-in-use' => const AuthFailure(AuthError.emailInUse),
  'weak-password' => const AuthFailure(AuthError.weakPassword),
  'invalid-email' => const AuthFailure(AuthError.invalidEmail),
  'too-many-requests' => const AuthFailure(AuthError.tooManyAttempts),
  'user-disabled' => const AuthFailure(AuthError.userDisabled),
  'operation-not-allowed' || 'admin-restricted-operation' => const AuthFailure(AuthError.methodDisabled),
  'requires-recent-login' => const AuthFailure(AuthError.requiresRecentLogin),
  'network-request-failed' => const OfflineFailure(),
  _ => UnknownFailure('firebase_auth/$code'),
};
