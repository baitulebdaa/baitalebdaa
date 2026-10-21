import 'package:flutter/foundation.dart';

import '../platform/analytics.dart';

/// Prints events to the debug console and keeps them for tests to assert on.
class DebugAnalyticsSink implements AnalyticsSink {
  final List<AnalyticsEvent> events = [];
  final List<String> screens = [];

  @override
  Future<void> log(AnalyticsEvent event) async {
    events.add(event);
    debugPrint('analytics ${event.name} ${event.parameters}');
  }

  @override
  Future<void> logScreenView(String routePattern) async {
    screens.add(routePattern);
    debugPrint('analytics screen_view $routePattern');
  }

  @override
  Future<void> setCollectionEnabled(bool enabled) async {}
}
