import 'package:baitalebdaa_app/design_system/components/media/bundled_photo.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:go_router/go_router.dart';

import '../helpers/test_app.dart';

/// Every photo, and its placeholder while it loads, fills the whole frame. A photo that
/// shrank to its own aspect ratio showed as a narrow strip on Projects and Services.
void _expectPhotosFillTheirFrames(WidgetTester tester) {
  final photos = find.byType(BundledPhoto);
  expect(photos, findsWidgets);
  for (final photo in photos.evaluate()) {
    final frame = tester.getSize(find.byWidget(photo.widget));
    final layers = find.descendant(
      of: find.byWidget(photo.widget),
      matching: find.byWidgetPredicate((widget) => widget is Image || widget is ColoredBox),
    );
    for (final layer in layers.evaluate()) {
      expect(tester.getSize(find.byWidget(layer.widget)), frame, reason: '${layer.widget.runtimeType} fills the frame');
    }
  }
}

void main() {
  for (final route in ['/services', '/projects', '/services/interior-design']) {
    testWidgets('photos fill their frames on $route', (tester) async {
      await pumpApp(tester);
      GoRouter.of(tester.element(find.byType(Scaffold).first)).go(route);
      await tester.pump();
      _expectPhotosFillTheirFrames(tester);

      // And once the photos have decoded.
      await tester.runAsync(() => Future<void>.delayed(const Duration(milliseconds: 300)));
      await tester.pumpAndSettle();
      _expectPhotosFillTheirFrames(tester);
    });
  }
}
