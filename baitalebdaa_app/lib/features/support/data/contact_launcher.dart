import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../../core/platform/analytics.dart';
import '../../content/domain/content_models.dart';

/// Opens WhatsApp, the phone dialler or email with the business's own details from the
/// website snapshot. The WhatsApp text is the website's neutral greeting: it never carries
/// anything the user typed into the app.
class ContactLauncher {
  ContactLauncher({required this._open, required this._analytics});

  final Future<bool> Function(Uri) _open;
  final AnalyticsSink _analytics;

  static Uri whatsappUri(BusinessFacts business, String languageCode, {String? message}) =>
      Uri.https('wa.me', '/${business.whatsapp}', {'text': message ?? business.whatsappMessage.resolve(languageCode)});

  /// Opens the phone dialler with the business number.
  Future<bool> call(BusinessFacts business, {required String screen}) async {
    await _analytics.log(ContactTapped(channel: ContactChannel.call, screen: screen));
    return _open(Uri(scheme: 'tel', path: business.phone));
  }

  /// Opens WhatsApp with the website's greeting, or with [message] when the customer chose
  /// to share something (it is shown in WhatsApp for them to edit before sending).
  /// Returns false when no app could handle the link, so the screen can offer the number.
  Future<bool> openWhatsApp(
    BusinessFacts business, {
    required String languageCode,
    required String screen,
    String? message,
  }) async {
    await _analytics.log(ContactTapped(channel: ContactChannel.whatsapp, screen: screen));
    return _open(whatsappUri(business, languageCode, message: message));
  }
}

final contactLauncherProvider = Provider<ContactLauncher>(
  (ref) => ContactLauncher(
    open: (uri) => launchUrl(uri, mode: LaunchMode.externalApplication),
    analytics: ref.watch(analyticsSinkProvider),
  ),
);
