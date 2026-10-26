import 'package:baitalebdaa_app/app/router/launch_gate.dart';
import 'package:baitalebdaa_app/app/router/routes.dart';
import 'package:baitalebdaa_app/core/failure/failure.dart';
import 'package:baitalebdaa_app/core/firebase/firebase_auth_gateway.dart';
import 'package:baitalebdaa_app/core/platform/auth_gateway.dart';
import 'package:baitalebdaa_app/features/auth/domain/auth_validation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';

const _member = AsyncData<AppUser?>(AppUser(uid: 'u1', isAnonymous: false, email: 'a@b.co'));
const _anonymous = AsyncData<AppUser?>(AppUser(uid: 'u2', isAnonymous: true));
const _signedOut = AsyncData<AppUser?>(null);

void main() {
  group('AuthValidation', () {
    test('email', () {
      expect(AuthValidation.email(''), FieldIssue.required);
      expect(AuthValidation.email('   '), FieldIssue.required);
      expect(AuthValidation.email('name@'), FieldIssue.invalidEmail);
      expect(AuthValidation.email('name@example'), FieldIssue.invalidEmail);
      expect(AuthValidation.email(' name@example.ae '), isNull);
    });

    test('new password needs the minimum length; sign-in password only needs something', () {
      expect(AuthValidation.newPassword(''), FieldIssue.required);
      expect(AuthValidation.newPassword('1234567'), FieldIssue.passwordTooShort);
      expect(AuthValidation.newPassword('12345678'), isNull);
      expect(AuthValidation.password(''), FieldIssue.required);
      expect(AuthValidation.password('x'), isNull);
    });

    test('name', () {
      expect(AuthValidation.name('  '), FieldIssue.required);
      expect(AuthValidation.name('a' * 81), FieldIssue.nameTooLong);
      expect(AuthValidation.name('Sara Ahmed'), isNull);
    });
  });

  group('launchRedirect', () {
    String? redirect(String location, AsyncValue<AppUser?> auth) =>
        launchRedirect(uri: Uri.parse(location), auth: auth);

    test('the splash waits while the auth state is unknown', () {
      expect(redirect(AppRoutes.splash, const AsyncLoading()), isNull);
    });

    test('the splash always goes to Home: no sign-in at launch', () {
      expect(redirect(AppRoutes.splash, _signedOut), AppRoutes.home);
      expect(redirect(AppRoutes.splash, _anonymous), AppRoutes.home);
      expect(redirect(AppRoutes.splash, _member), AppRoutes.home);
      expect(redirect(AppRoutes.splash, AsyncError<AppUser?>(Exception(), StackTrace.empty)), AppRoutes.home);
    });

    test('sign-in never redirects: the screen closes itself once signed in', () {
      expect(redirect(AppRoutes.signIn, _member), isNull);
      expect(redirect('${AppRoutes.signIn}?from=%2Frequest', _member), isNull);
      expect(redirect(AppRoutes.signIn, _signedOut), isNull);
    });

    test('other screens never redirect, so browsing needs no account', () {
      expect(redirect(AppRoutes.services, _signedOut), isNull);
      expect(redirect(AppRoutes.projects, const AsyncLoading()), isNull);
      expect(redirect(AppRoutes.book, _signedOut), isNull);
      expect(redirect(AppRoutes.request, _signedOut), isNull, reason: 'guests can fill in a request');
    });
  });

  test('safeReturnPath accepts in-app paths only', () {
    expect(safeReturnPath('/profile'), '/profile');
    expect(safeReturnPath('https://evil.example'), isNull);
    expect(safeReturnPath('//evil.example'), isNull);
    expect(safeReturnPath(AppRoutes.signIn), isNull);
    expect(safeReturnPath(AppRoutes.splash), isNull);
    expect(safeReturnPath(null), isNull);
  });

  test('Firebase auth codes map to failures', () {
    for (final code in ['invalid-credential', 'wrong-password', 'user-not-found']) {
      expect(
        failureFromAuthCode(code),
        isA<AuthFailure>().having((f) => f.reason, 'reason', AuthError.invalidCredentials),
      );
    }
    expect((failureFromAuthCode('email-already-in-use') as AuthFailure).reason, AuthError.emailInUse);
    expect((failureFromAuthCode('operation-not-allowed') as AuthFailure).reason, AuthError.methodDisabled);
    expect((failureFromAuthCode('requires-recent-login') as AuthFailure).reason, AuthError.requiresRecentLogin);
    expect(failureFromAuthCode('network-request-failed'), isA<OfflineFailure>());
    expect(failureFromAuthCode('something-new'), isA<UnknownFailure>());
  });
}
