import 'package:flutter/foundation.dart';

enum AssistantRole { user, assistant }

/// One turn in an Ask Ali conversation. A failed reply is kept as a message with an
/// [error], so the conversation shows what went wrong where it went wrong.
@immutable
class AssistantMessage {
  const AssistantMessage.user(String this.text) : role = AssistantRole.user, error = null;

  const AssistantMessage.assistant(String this.text) : role = AssistantRole.assistant, error = null;

  const AssistantMessage.failed(Object this.error) : role = AssistantRole.assistant, text = null;

  final AssistantRole role;
  final String? text;
  final Object? error;

  bool get isError => error != null;

  @override
  bool operator ==(Object other) =>
      other is AssistantMessage && other.role == role && other.text == text && other.error == error;

  @override
  int get hashCode => Object.hash(role, text, error);
}

/// Longest message a user can send; matches the website chat's server limit
/// (MAX_MESSAGE_LENGTH in src/app/api/chat/route.js), which stays the real check.
const int kAssistantMaxMessageLength = 600;
