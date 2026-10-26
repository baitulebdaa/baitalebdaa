import 'package:baitalebdaa_app/core/fakes/fake_request_repository.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import '../../helpers/test_app.dart';

final _page = find.byWidgetPredicate((widget) => widget is Scrollable && widget.axisDirection == AxisDirection.down);

/// Taps [finder], first scrolling the page if it is further down and not built yet.
Future<void> _tap(WidgetTester tester, Finder finder) async {
  if (finder.evaluate().isEmpty) await tester.scrollUntilVisible(finder, 300, scrollable: _page.first);
  await tester.ensureVisible(finder);
  await tester.pumpAndSettle();
  await tester.tap(finder);
  await tester.pumpAndSettle();
}

Future<void> _continue(WidgetTester tester) => _tap(tester, find.widgetWithText(FilledButton, 'Continue'));

/// Book → Start a request → the required answers on each screen → Review.
Future<void> _fillRequest(WidgetTester tester) async {
  final content = realSnapshot;
  await tapTab(tester, 'Book');
  await _tap(tester, find.widgetWithText(FilledButton, 'Start a request'));

  // Requirements: a service and the emirate; the rest is optional.
  expect(find.text('What can we help with?'), findsOneWidget);
  await _tap(tester, find.text(content.services.first.name.en));
  await _tap(tester, find.text(content.business.emirates.first.name.en));
  await _continue(tester);
  await _continue(tester); // details
  await _tap(tester, find.text('Phone call'));
  await _continue(tester); // consultation and time
  await tester.enterText(find.widgetWithText(TextFormField, 'Full name'), 'Sara Ahmed');
  await tester.enterText(find.widgetWithText(TextFormField, 'Mobile number'), '050 123 4567');
  await _tap(tester, find.widgetWithText(FilledButton, 'Review your request'));
}

/// The contact section on Review (name and number in one block, near the end).
Future<void> _expectContactOnReview(WidgetTester tester, {String? reason}) async {
  final contact = find.textContaining('Sara Ahmed');
  await tester.scrollUntilVisible(contact, 300, scrollable: _page.first);
  expect(contact, findsOneWidget, reason: reason);
}

void main() {
  testWidgets('a guest fills in a request but must sign in to send it; the answers are kept', (tester) async {
    await pumpApp(tester);
    await _fillRequest(tester);

    expect(find.text('Review your request'), findsWidgets);
    await _expectContactOnReview(tester);
    expect(find.widgetWithText(FilledButton, 'Send request'), findsNothing, reason: 'guests cannot send');

    await _tap(tester, find.widgetWithText(FilledButton, 'Sign in to send'));
    await _tap(tester, find.text('Sign Up'));
    await tester.enterText(find.widgetWithText(TextFormField, 'Full Name'), 'Sara Ahmed');
    await tester.enterText(find.widgetWithText(TextFormField, 'Email Address'), 'sara@example.ae');
    await tester.enterText(find.widgetWithText(TextFormField, 'Password'), 'longenough');
    await _tap(tester, find.byType(Checkbox));
    await _tap(tester, find.widgetWithText(FilledButton, 'Create Account'));

    expect(find.widgetWithText(FilledButton, 'Send request'), findsOneWidget, reason: 'back on Review');
    await _expectContactOnReview(tester, reason: 'the answers survived signing in');
  });

  testWidgets('a signed-in customer sends a request: received, never confirmed', (tester) async {
    final requests = FakeRequestRepository(delay: Duration.zero);
    await pumpApp(tester, auth: signedInAuth(), requests: requests);
    await _fillRequest(tester);
    await _tap(tester, find.widgetWithText(FilledButton, 'Send request'));

    expect(find.text('Project request received'), findsOneWidget);
    expect(find.textContaining(RegExp(r'BAE-[2-9A-HJKMNP-Z]{5}')), findsWidgets);
    expect(find.textContaining('confirmed'), findsNothing, reason: 'only staff confirm an appointment');
    expect(find.text('Share photos or plans on WhatsApp'), findsOneWidget);

    await _tap(tester, find.widgetWithText(TextButton, 'Done'));
    await tapTab(tester, 'Profile');
    expect(find.text('My requests'), findsOneWidget);
    expect(find.text('Request received'), findsOneWidget, reason: 'the live status');
  });

  testWidgets('Save Draft keeps the request so it can be continued', (tester) async {
    final content = realSnapshot;
    await pumpApp(tester);
    await tapTab(tester, 'Book');
    await _tap(tester, find.widgetWithText(FilledButton, 'Start a request'));
    await _tap(tester, find.text(content.services.first.name.en));
    await _tap(tester, find.text(content.business.emirates.first.name.en));
    await _continue(tester);
    expect(find.text('Tell us about your project'), findsOneWidget);

    await _tap(tester, find.widgetWithText(TextButton, 'Save Draft'));
    expect(find.text('Continue your request · step 2 of 4'), findsOneWidget);
    await _tap(tester, find.text('Continue your request · step 2 of 4'));
    expect(find.text('Tell us about your project'), findsOneWidget, reason: 'resumes on the screen it was left');
  });

  testWidgets('back on the first screen offers to save and exit', (tester) async {
    await pumpApp(tester);
    await tapTab(tester, 'Book');
    await _tap(tester, find.widgetWithText(FilledButton, 'Start a request'));
    await _tap(tester, find.text(realSnapshot.services.first.name.en));

    await tester.tap(find.byTooltip('Back'));
    await tester.pumpAndSettle();
    await _tap(tester, find.text('Save and exit'));
    expect(find.text('Continue your request · step 1 of 4'), findsOneWidget);
  });

  testWidgets('a required step explains what is missing instead of moving on', (tester) async {
    await pumpApp(tester);
    await tapTab(tester, 'Book');
    await _tap(tester, find.widgetWithText(FilledButton, 'Start a request'));
    await _continue(tester);

    expect(find.text('Choose at least one service.'), findsOneWidget);
    expect(find.text('What can we help with?'), findsOneWidget);
  });
}
