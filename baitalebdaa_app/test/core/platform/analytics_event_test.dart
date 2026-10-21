import 'package:baitalebdaa_app/core/platform/analytics.dart';
import 'package:flutter_test/flutter_test.dart';

/// One instance of every event. Adding an event to the sealed class without adding it
/// here leaves it untested, so keep this list complete.
final List<AnalyticsEvent> _allEvents = [
  const AppOpened(locale: 'ar', contentSchemaVersion: 1),
  const ServiceViewed(serviceId: 'joinery', source: ContentSource.home),
  const PriceGuideViewed(),
  const PriceGuideViewed(groupId: 'villa'),
  const ProjectViewed(projectId: 'dubai-hills-estate-villa', source: ContentSource.deepLink),
  const ProjectGalleryOpened(projectId: 'dubai-hills-estate-villa'),
  const ContactTapped(channel: ContactChannel.whatsapp, screen: '/projects/:slug'),
  const LanguageChanged(to: 'en'),
];

final _snakeCase = RegExp(r'^[a-z][a-z0-9_]*$');

void main() {
  test('event and parameter names follow Firebase Analytics limits', () {
    for (final event in _allEvents) {
      expect(event.name, matches(_snakeCase));
      expect(event.name.length, lessThanOrEqualTo(40), reason: event.name);
      expect(event.parameters.length, lessThanOrEqualTo(25), reason: event.name);
      for (final key in event.parameters.keys) {
        expect(key, matches(_snakeCase), reason: '${event.name}.$key');
        expect(key.length, lessThanOrEqualTo(40), reason: '${event.name}.$key');
      }
    }
  });

  test('parameter values are short identifiers, numbers or flags only', () {
    for (final event in _allEvents) {
      for (final MapEntry(:key, :value) in event.parameters.entries) {
        expect(value, anyOf(isA<String>(), isA<num>(), isA<bool>()), reason: '${event.name}.$key');
        if (value is String) {
          expect(value.length, lessThanOrEqualTo(100), reason: '${event.name}.$key');
          expect(value, isNot(contains(' ')), reason: '${event.name}.$key looks like free text');
        }
      }
    }
  });

  test('optional parameters are omitted, not sent empty', () {
    expect(const PriceGuideViewed().parameters, isEmpty);
  });
}
