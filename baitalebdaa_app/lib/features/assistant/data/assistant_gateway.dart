import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/failure/failure.dart';
import '../domain/assistant_message.dart';

/// The Ask Ali backend. The AI model's key can never ship in the app, so replies always
/// come from a server: the website's chat endpoint or a Cloud Function (decided before
/// Phase 6). Conversation text is sent only to that server; it is never logged to
/// analytics or crash reports.
abstract interface class AssistantGateway {
  /// The assistant's reply to [conversation], whose last message is the user's.
  /// Errors with a [Failure].
  Future<String> reply({required List<AssistantMessage> conversation, required String languageCode});
}

/// No backend in this build yet: every message gets the website's "unavailable" reply,
/// with WhatsApp offered instead.
class UnconfiguredAssistantGateway implements AssistantGateway {
  const UnconfiguredAssistantGateway();

  @override
  Future<String> reply({required List<AssistantMessage> conversation, required String languageCode}) =>
      Future<String>.error(const UnavailableFailure());
}

final assistantGatewayProvider = Provider<AssistantGateway>((ref) => const UnconfiguredAssistantGateway());
