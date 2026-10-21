import 'dart:async';

import 'package:baitalebdaa_app/app/router/routes.dart';
import 'package:baitalebdaa_app/core/fakes/fake_auth_gateway.dart';
import 'package:baitalebdaa_app/features/settings/domain/app_settings.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:go_router/go_router.dart';

import '../../helpers/test_app.dart';

Future<void> _fillAndSubmit(WidgetTester tester, Map<String, String> fields, String button) async {
  for (final MapEntry(key: label, value: text) in fields.entries) {
    await tester.enterText(find.widgetWithText(TextFormField, label), text);
  }
  await tester.ensureVisible(find.widgetWithText(FilledButton, button));
  await tester.tap(find.widgetWithText(FilledButton, button));
  await tester.pumpAndSettle();
}

Future<void> _tapText(WidgetTester tester, String text) => scrollAndTap(tester, find.text(text));

final _page = find.byWidgetPredicate((widget) => widget is Scrollable && widget.axisDirection == AxisDirection.down);

/// Scrolls the page until [text] is built, for checks on long screens such as Profile.
Future<void> _scrollTo(WidgetTester tester, String text) =>
    tester.scrollUntilVisible(find.text(text), 300, scrollable: _page.first);

Future<void> _scrollToTop(WidgetTester tester) async {
  await tester.fling(_page.first, const Offset(0, 3000), 3000);
  await tester.pumpAndSettle();
}

/// Profile → "Sign in or create an account", the way a guest reaches sign-in.
Future<void> _openFromProfile(WidgetTester tester) async {
  await tapTab(tester, 'Profile');
  await _tapText(tester, 'Sign in or create an account');
}

void main() {
  testWidgets('a guest launches to Home with no sign-in screen', (tester) async {
    await pumpApp(tester);

    expect(find.text(realSnapshot.hero.title.en), findsOneWidget);
    expect(find.widgetWithText(FilledButton, 'Sign in'), findsNothing);
    expect(find.text('Welcome'), findsOneWidget);
  });

  testWidgets('an account holder is greeted by first name on Home', (tester) async {
    await pumpApp(tester, auth: signedInAuth());

    expect(find.textContaining(', Sara'), findsOneWidget);
  });

  testWidgets('sign-in opens from Profile above the tabs and can be closed', (tester) async {
    await pumpApp(tester);
    await _openFromProfile(tester);

    expect(find.widgetWithText(FilledButton, 'Sign in'), findsOneWidget);
    expect(find.byType(NavigationBar), findsNothing, reason: 'sign-in covers the tabs');
    await tester.tap(find.byTooltip('Close'));
    await tester.pumpAndSettle();
    expect(find.text('Sign in or create an account'), findsOneWidget, reason: 'back on Profile');
  });

  testWidgets('empty or malformed fields are flagged before anything is sent', (tester) async {
    await pumpApp(tester);
    await _openFromProfile(tester);
    await _fillAndSubmit(tester, {}, 'Sign in');
    expect(find.text('Required'), findsNWidgets(2));

    await _fillAndSubmit(tester, {'Email': 'sara@', 'Password': 'x'}, 'Sign in');
    expect(find.text('Enter a valid email address'), findsOneWidget);
  });

  testWidgets('a wrong password keeps the user on sign-in with a clear message', (tester) async {
    await pumpApp(tester);
    await _openFromProfile(tester);
    await _fillAndSubmit(tester, {'Email': 'nobody@example.ae', 'Password': 'wrong-pass'}, 'Sign in');

    expect(find.text("The email or password isn't right."), findsOneWidget);
    expect(find.widgetWithText(FilledButton, 'Sign in'), findsOneWidget);
  });

  testWidgets('creating an account returns to Profile signed in, until sign-out', (tester) async {
    await pumpApp(tester);
    await _openFromProfile(tester);
    await _tapText(tester, 'New here? Create an account');
    expect(find.text('Create your account'), findsOneWidget);

    await _fillAndSubmit(tester, {
      'Full name': 'Sara Ahmed',
      'Email': 'sara@example.ae',
      'Password': 'longenough',
    }, 'Create account');

    expect(find.byType(NavigationBar), findsOneWidget, reason: 'sign-in closed itself once signed in');
    expect(find.text('Sara Ahmed'), findsOneWidget);
    expect(find.text('sara@example.ae'), findsOneWidget);
    expect(find.text('Check your inbox to verify your email address.'), findsOneWidget);

    await _tapText(tester, 'Sign out');
    await _scrollToTop(tester);
    expect(find.text('Sara Ahmed'), findsNothing);
    expect(find.text('Sign in or create an account'), findsOneWidget);
  });

  testWidgets('a short new password is refused with the rule', (tester) async {
    await pumpApp(tester);
    await _openFromProfile(tester);
    await _tapText(tester, 'New here? Create an account');
    await _fillAndSubmit(tester, {
      'Full name': 'Sara',
      'Email': 'sara@example.ae',
      'Password': 'short',
    }, 'Create account');

    expect(find.text('Use at least 8 characters'), findsOneWidget);
  });

  testWidgets('a reset link is confirmed without revealing whether the account exists', (tester) async {
    await pumpApp(tester);
    await _openFromProfile(tester);
    await _tapText(tester, 'Forgot password?');
    await _fillAndSubmit(tester, {'Email': 'sara@example.ae'}, 'Send reset link');

    expect(find.textContaining('If an account exists for sara@example.ae'), findsOneWidget);
  });

  testWidgets('an existing customer signs in and returns to Profile', (tester) async {
    final auth = FakeAuthGateway();
    await auth.createAccount(name: 'Sara', email: 'sara@example.ae', password: 'longenough');
    await auth.signOut();
    await pumpApp(tester, auth: auth);
    await _openFromProfile(tester);

    await _fillAndSubmit(tester, {'Email': 'sara@example.ae', 'Password': 'longenough'}, 'Sign in');
    expect(find.byType(NavigationBar), findsOneWidget, reason: 'sign-in closed itself');
    await _scrollTo(tester, 'Sign out');
    expect(find.text('Sign out'), findsOneWidget, reason: 'back on Profile, signed in');
  });

  testWidgets('deleting the account asks first, then signs out', (tester) async {
    await pumpApp(tester, auth: signedInAuth());
    await tapTab(tester, 'Profile');
    await _tapText(tester, 'Delete account');
    expect(find.text('Delete your account?'), findsOneWidget);

    await tester.tap(find.text('Cancel'));
    await tester.pumpAndSettle();
    expect(find.text('Sign out'), findsOneWidget, reason: 'cancel keeps the account');

    await _tapText(tester, 'Delete account');
    await tester.tap(find.descendant(of: find.byType(AlertDialog), matching: find.text('Delete account')));
    await tester.pumpAndSettle();
    await _scrollToTop(tester);
    expect(find.text('Sara Ahmed'), findsNothing);
    expect(find.text('Sign in or create an account'), findsOneWidget);
  });

  testWidgets('sign-in works in Arabic, right to left, and can switch language', (tester) async {
    await pumpApp(tester, settings: const AppSettings(language: AppLanguage.ar));
    unawaited(GoRouter.of(tester.element(find.byType(Scaffold).first)).push(AppRoutes.signIn));
    await tester.pumpAndSettle();

    expect(Directionality.of(tester.element(find.byType(Form))), TextDirection.rtl);
    expect(find.widgetWithText(FilledButton, 'تسجيل الدخول'), findsOneWidget);

    await tester.tap(find.text('English'));
    await tester.pumpAndSettle();
    expect(find.widgetWithText(FilledButton, 'Sign in'), findsOneWidget);
    expect(Directionality.of(tester.element(find.byType(Form))), TextDirection.ltr);
  });
}
