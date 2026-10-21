import 'package:baitalebdaa_app/features/settings/domain/app_settings.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:go_router/go_router.dart';

import '../helpers/test_app.dart';

TextDirection _direction(WidgetTester tester) => Directionality.of(tester.element(find.byType(Scaffold).first));

const _tabs = ['Home', 'Services', 'Projects', 'Book', 'Profile'];

void main() {
  final content = realSnapshot;

  testWidgets('launches straight to Home, left to right, with the five tabs', (tester) async {
    await pumpApp(tester);

    expect(_direction(tester), TextDirection.ltr);
    expect(find.text(content.hero.title.en), findsOneWidget);
    for (final label in _tabs) {
      expect(find.descendant(of: find.byType(NavigationBar), matching: find.text(label)), findsOneWidget);
    }
    expect(find.text('Ask Ali'), findsNothing, reason: 'the assistant is a Home card, not a tab');
  });

  testWidgets('Arabic is right to left with Arabic website copy', (tester) async {
    await pumpApp(tester, settings: const AppSettings(language: AppLanguage.ar));

    expect(_direction(tester), TextDirection.rtl);
    expect(find.text(content.hero.title.ar), findsOneWidget);
    expect(find.text('الرئيسية'), findsOneWidget);
  });

  testWidgets('Services shows each service and the website starting prices', (tester) async {
    await pumpApp(tester);
    await tapTab(tester, 'Services');

    final first = content.services.first;
    expect(find.text(first.name.en), findsOneWidget);
    // Interior Design and Residential Interior Design share the same published starting price.
    expect(find.text(content.startingPrice(first)!.display.en), findsWidgets);
  });

  testWidgets('a service opens its detail page with a free site survey request', (tester) async {
    await pumpApp(tester);
    await tapTab(tester, 'Services');
    final first = content.services.first;
    await tester.tap(find.text(first.name.en));
    await tester.pumpAndSettle();

    expect(find.text(first.detail.summary.en), findsOneWidget);
    expect(find.widgetWithText(FilledButton, 'Request a free site survey'), findsOneWidget);
  });

  testWidgets('Projects lists the real projects and opens one', (tester) async {
    await pumpApp(tester);
    await tapTab(tester, 'Projects');

    final project = content.projects.first;
    expect(find.text(project.title.en), findsOneWidget);
    await tester.tap(find.text(project.title.en));
    await tester.pumpAndSettle();
    expect(find.text('Plan a similar project'), findsOneWidget);
    expect(find.byType(NavigationBar), findsOneWidget, reason: 'the tab bar stays visible');

    // Re-selecting the tab returns to the list.
    await tapTab(tester, 'Projects');
    expect(find.text('Plan a similar project'), findsNothing);
  });

  testWidgets('switching to Arabic in Settings flips the whole app to RTL', (tester) async {
    await pumpApp(tester);
    await tapTab(tester, 'Profile');
    await scrollAndTap(tester, find.text('Settings'));

    await tester.tap(find.text('العربية'));
    await tester.pumpAndSettle();

    expect(_direction(tester), TextDirection.rtl);
    expect(find.text('الإعدادات'), findsWidgets);

    // Every language option lines up at the start (right) edge in Arabic, including the
    // Latin-script "English": its paragraph must lay out right to left, not be forced LTR.
    final english = tester.renderObject<RenderParagraph>(find.text('English'));
    expect(english.textDirection, TextDirection.rtl);
  });

  testWidgets('re-selecting the current tab returns to its root screen', (tester) async {
    await pumpApp(tester);
    await tapTab(tester, 'Profile');
    await scrollAndTap(tester, find.text('Settings'));
    expect(find.text('Match device'), findsOneWidget);

    await tapTab(tester, 'Profile');
    expect(find.text('Match device'), findsNothing);
    expect(find.text('No requests yet'), findsOneWidget);
  });

  testWidgets('tablets get a navigation rail instead of a tab bar', (tester) async {
    await pumpApp(tester, size: const Size(1024, 768));

    expect(find.byType(NavigationRail), findsOneWidget);
    expect(find.byType(NavigationBar), findsNothing);
  });

  for (final language in [AppLanguage.en, AppLanguage.ar]) {
    testWidgets('every tab lays out at 200% text size in ${language.name}', (tester) async {
      tester.platformDispatcher.textScaleFactorTestValue = 2;
      addTearDown(tester.platformDispatcher.clearTextScaleFactorTestValue);
      await pumpApp(tester, settings: AppSettings(language: language));

      for (final index in [1, 2, 3, 4, 0]) {
        await tester.tap(find.byType(NavigationDestination).at(index));
        await tester.pumpAndSettle();
        expect(tester.takeException(), isNull);
      }
    });
  }

  testWidgets('an unknown link shows the not-found screen with a way home', (tester) async {
    await pumpApp(tester);
    GoRouter.of(tester.element(find.byType(Scaffold).first)).go('/no-such-page');
    await tester.pumpAndSettle();

    expect(find.text("This page isn't available"), findsOneWidget);
    await tester.tap(find.text('Go to Home'));
    await tester.pumpAndSettle();
    expect(find.text(content.hero.title.en), findsOneWidget);
  });
}
