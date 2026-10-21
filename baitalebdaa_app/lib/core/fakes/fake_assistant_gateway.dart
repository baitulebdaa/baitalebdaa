import '../../features/assistant/data/assistant_gateway.dart';
import '../../features/assistant/domain/assistant_message.dart';

/// Development stand-in for Ask Ali, so the chat screen can be built and tested before a
/// backend exists. It says plainly that it is not the real assistant and never invents
/// prices, availability or business facts.
class FakeAssistantGateway implements AssistantGateway {
  FakeAssistantGateway({this.delay = const Duration(milliseconds: 700)});

  final Duration delay;

  @override
  Future<String> reply({required List<AssistantMessage> conversation, required String languageCode}) async {
    await Future<void>.delayed(delay);
    return languageCode == 'ar'
        ? 'نسخة تطوير: لم يتم ربط المساعد بعد، لذلك هذا رد تجريبي وليس إجابة حقيقية.'
        : 'Development preview: Ask Ali is not connected yet, so this is a placeholder reply, not a real answer.';
  }
}
