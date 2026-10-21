import 'package:flutter_riverpod/flutter_riverpod.dart';

/// Where a detail screen was opened from.
enum ContentSource { home, services, projects, project, deepLink }

enum ContactChannel { whatsapp, call, email }

/// Where a consultation request was started from.
enum RequestEntry { home, service, project, book, profile, resume }

/// The analytics taxonomy (Phase 1 doc, section V). Parameters hold only ids, enums,
/// counts and flags. Because every event is a typed subclass, free text such as names,
/// phone numbers, notes or file names cannot be sent. Request and auth events are added
/// with those features (Phases 4 and 5).
sealed class AnalyticsEvent {
  const AnalyticsEvent();

  String get name;

  Map<String, Object> get parameters;
}

final class AppOpened extends AnalyticsEvent {
  const AppOpened({required this.locale, required this.contentSchemaVersion});

  final String locale;
  final int contentSchemaVersion;

  @override
  String get name => 'app_opened';

  @override
  Map<String, Object> get parameters => {'locale': locale, 'content_version': contentSchemaVersion};
}

final class ServiceViewed extends AnalyticsEvent {
  const ServiceViewed({required this.serviceId, required this.source});

  final String serviceId;
  final ContentSource source;

  @override
  String get name => 'service_viewed';

  @override
  Map<String, Object> get parameters => {'service_id': serviceId, 'source': source.name};
}

final class PriceGuideViewed extends AnalyticsEvent {
  const PriceGuideViewed({this.groupId});

  final String? groupId;

  @override
  String get name => 'price_guide_viewed';

  @override
  Map<String, Object> get parameters => {'group_id': ?groupId};
}

final class ProjectViewed extends AnalyticsEvent {
  const ProjectViewed({required this.projectId, required this.source});

  final String projectId;
  final ContentSource source;

  @override
  String get name => 'project_viewed';

  @override
  Map<String, Object> get parameters => {'project_id': projectId, 'source': source.name};
}

final class ProjectGalleryOpened extends AnalyticsEvent {
  const ProjectGalleryOpened({required this.projectId});

  final String projectId;

  @override
  String get name => 'project_gallery_opened';

  @override
  Map<String, Object> get parameters => {'project_id': projectId};
}

final class ContactTapped extends AnalyticsEvent {
  const ContactTapped({required this.channel, required this.screen});

  final ContactChannel channel;

  /// A route pattern such as `/projects/:slug`, never a filled-in path.
  final String screen;

  @override
  String get name => 'contact_tapped';

  @override
  Map<String, Object> get parameters => {'channel': channel.name, 'screen': screen};
}

final class LanguageChanged extends AnalyticsEvent {
  const LanguageChanged({required this.to});

  final String to;

  @override
  String get name => 'language_changed';

  @override
  Map<String, Object> get parameters => {'to': to};
}

final class RequestStarted extends AnalyticsEvent {
  const RequestStarted({required this.entry, required this.prefilled});

  final RequestEntry entry;
  final bool prefilled;

  @override
  String get name => 'request_started';

  @override
  Map<String, Object> get parameters => {'entry': entry.name, 'prefilled': prefilled};
}

final class RequestStepCompleted extends AnalyticsEvent {
  const RequestStepCompleted({required this.step, required this.skipped});

  /// A request-flow step, by enum name. Never the answer itself.
  final Enum step;
  final bool skipped;

  @override
  String get name => 'request_step_completed';

  @override
  Map<String, Object> get parameters => {'step': step.name, 'skipped': skipped};
}

final class RequestSubmitted extends AnalyticsEvent {
  const RequestSubmitted({required this.serviceCount, required this.consultationType});

  final int serviceCount;
  final Enum consultationType;

  @override
  String get name => 'request_submitted';

  @override
  Map<String, Object> get parameters => {'service_count': serviceCount, 'consultation_type': consultationType.name};
}

abstract interface class AnalyticsSink {
  Future<void> log(AnalyticsEvent event);

  /// [routePattern] is the route template (`/projects/:slug`), never the filled-in path.
  Future<void> logScreenView(String routePattern);

  /// Collection stays off until the user consents (Phase 1 doc, sections V and Y).
  Future<void> setCollectionEnabled(bool enabled);
}

class NoopAnalyticsSink implements AnalyticsSink {
  const NoopAnalyticsSink();

  @override
  Future<void> log(AnalyticsEvent event) async {}

  @override
  Future<void> logScreenView(String routePattern) async {}

  @override
  Future<void> setCollectionEnabled(bool enabled) async {}
}

final analyticsSinkProvider = Provider<AnalyticsSink>((ref) => const NoopAnalyticsSink());
