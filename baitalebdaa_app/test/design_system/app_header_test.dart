import 'package:baitalebdaa_app/design_system/components/navigation/app_header.dart';
import 'package:baitalebdaa_app/features/settings/domain/app_settings.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:go_router/go_router.dart';

import '../helpers/test_app.dart';

Future<void> _go(WidgetTester tester, String location) async {
  GoRouter.of(tester.element(find.byType(Scaffold).first)).go(location);
  await tester.pumpAndSettle();
}

void main() {
  final content = realSnapshot;

  testWidgets('a tab root has the large header and no back button', (tester) async {
    await pumpApp(tester);
    await tapTab(tester, 'Services');

    expect(find.byType(AppScrollView), findsOneWidget);
    expect(find.text('OUR SERVICES'), findsOneWidget);
    expect(find.text('Services'), findsNWidgets(2), reason: 'the large title and the tab label');
    expect(find.byType(AppBackButton), findsNothing);
  });

  testWidgets('scrolling collapses the title into the bar', (tester) async {
    await pumpApp(tester);
    await tapTab(tester, 'Services');
    final title = find.descendant(of: find.byType(SliverAppBar), matching: find.text('Services'));
    expect(title, findsNothing);

    await tester.drag(
      find.descendant(of: find.byType(AppScrollView), matching: find.byType(Scrollable)).first,
      const Offset(0, -400),
    );
    await tester.pumpAndSettle();
    expect(title, findsOneWidget);

    await tester.drag(
      find.descendant(of: find.byType(AppScrollView), matching: find.byType(Scrollable)).first,
      const Offset(0, 400),
    );
    await tester.pumpAndSettle();
    expect(title, findsNothing);
  });

  testWidgets('a pushed screen has a back button that returns', (tester) async {
    await pumpApp(tester);
    await _go(tester, '/services/pricing');

    expect(tester.takeException(), isNull);
    expect(find.text('Price guide'), findsOneWidget);
    await tester.tap(find.byTooltip('Back'));
    await tester.pumpAndSettle();
    expect(find.text('OUR SERVICES'), findsOneWidget);
  });

  testWidgets('a service page has a plain bar; a project page opens under a photo header', (tester) async {
    await pumpApp(tester);
    final service = content.services.first;
    await _go(tester, '/services/${service.slug}');
    expect(tester.takeException(), isNull);
    expect(find.byType(AppTopBar), findsOneWidget, reason: "owner's design, 26 Oct 2026");
    expect(find.text('Service Details'), findsOneWidget);
    expect(find.byTooltip('Back'), findsOneWidget);

    final project = content.projects.first;
    await _go(tester, '/projects/${project.slug}');
    expect(tester.takeException(), isNull);
    expect(find.byType(AppPhotoSliverHeader), findsOneWidget);
  });

  testWidgets('a photo header collapses into a plain bar with the title', (tester) async {
    await pumpApp(tester);
    final project = content.projects.first;
    await _go(tester, '/projects/${project.slug}');
    final bar = find.descendant(of: find.byType(SliverAppBar), matching: find.text(project.title.en));
    expect(bar, findsNothing, reason: 'the photo is open, the page shows its own title');

    final page = find.descendant(of: find.byType(CustomScrollView), matching: find.byType(Scrollable)).first;
    await tester.drag(page, const Offset(0, -700));
    await tester.pumpAndSettle();
    expect(bar, findsOneWidget);

    await tester.drag(page, const Offset(0, 700));
    await tester.pumpAndSettle();
    expect(bar, findsNothing);
  });

  for (final language in AppLanguage.values.where((l) => l != AppLanguage.system)) {
    for (final route in ['/services', '/projects', '/book', '/profile', '/services/pricing', '/profile/settings']) {
      testWidgets('$route lays out at 200% text in ${language.name}', (tester) async {
        tester.platformDispatcher.textScaleFactorTestValue = 2;
        addTearDown(tester.platformDispatcher.clearTextScaleFactorTestValue);
        await pumpApp(tester, settings: AppSettings(language: language));
        await _go(tester, route);
        expect(tester.takeException(), isNull);
      });
    }
  }
}
