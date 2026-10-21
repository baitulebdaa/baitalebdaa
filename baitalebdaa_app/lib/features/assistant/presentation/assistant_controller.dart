import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../data/assistant_gateway.dart';
import '../domain/assistant_message.dart';

@immutable
class AssistantState {
  const AssistantState({this.messages = const [], this.isSending = false});

  final List<AssistantMessage> messages;

  /// A reply is on its way; new messages wait until it arrives.
  final bool isSending;

  bool get isEmpty => messages.isEmpty;
}

/// Holds one Ask Ali conversation in memory for as long as the app runs. Nothing is
/// persisted on the device.
class AssistantController extends Notifier<AssistantState> {
  @override
  AssistantState build() => const AssistantState();

  Future<void> send(String text, {required String languageCode}) async {
    final message = text.trim();
    if (message.isEmpty || state.isSending) return;

    final sent = AssistantMessage.user(
      message.length > kAssistantMaxMessageLength ? message.substring(0, kAssistantMaxMessageLength) : message,
    );
    final history = [...state.messages, sent];
    state = AssistantState(messages: history, isSending: true);

    AssistantMessage answer;
    try {
      final reply = await ref
          .read(assistantGatewayProvider)
          // Failed turns are shown to the user but are not part of what the model sees.
          .reply(conversation: history.where((m) => !m.isError).toList(), languageCode: languageCode);
      answer = AssistantMessage.assistant(reply);
    } on Object catch (error) {
      answer = AssistantMessage.failed(error);
    }
    if (!ref.mounted) return;
    state = AssistantState(messages: [...state.messages, answer]);
  }

  void startOver() => state = const AssistantState();
}

final assistantControllerProvider = NotifierProvider<AssistantController, AssistantState>(AssistantController.new);
