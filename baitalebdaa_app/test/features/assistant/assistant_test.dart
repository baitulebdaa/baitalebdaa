import 'dart:async';

import 'package:baitalebdaa_app/core/failure/failure.dart';
import 'package:baitalebdaa_app/core/fakes/debug_analytics_sink.dart';
import 'package:baitalebdaa_app/features/assistant/data/assistant_gateway.dart';
import 'package:baitalebdaa_app/features/assistant/domain/assistant_message.dart';
import 'package:baitalebdaa_app/features/assistant/presentation/assistant_controller.dart';
import 'package:baitalebdaa_app/features/support/data/contact_launcher.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';

import '../../helpers/test_app.dart';

/// Records what it was asked and answers from a script.
class _ScriptedGateway implements AssistantGateway {
  _ScriptedGateway(this.answer);

  final FutureOr<String> Function() answer;
  final List<List<AssistantMessage>> received = [];

  @override
  Future<String> reply({required List<AssistantMessage> conversation, required String languageCode}) async {
    received.add(conversation);
    return answer();
  }
}

void main() {
  group('AssistantController', () {
    ProviderContainer containerWith(AssistantGateway gateway) {
      final container = ProviderContainer(overrides: [assistantGatewayProvider.overrideWithValue(gateway)]);
      addTearDown(container.dispose);
      return container;
    }

    test('adds the user message and the reply', () async {
      final container = containerWith(_ScriptedGateway(() => 'Hello'));
      await container.read(assistantControllerProvider.notifier).send('  Hi  ', languageCode: 'en');

      expect(container.read(assistantControllerProvider).messages, const [
        AssistantMessage.user('Hi'),
        AssistantMessage.assistant('Hello'),
      ]);
      expect(container.read(assistantControllerProvider).isSending, isFalse);
    });

    test('ignores empty messages', () async {
      final gateway = _ScriptedGateway(() => 'unused');
      final container = containerWith(gateway);
      await container.read(assistantControllerProvider.notifier).send('   ', languageCode: 'en');

      expect(container.read(assistantControllerProvider).isEmpty, isTrue);
      expect(gateway.received, isEmpty);
    });

    test('ignores a second message while a reply is pending', () async {
      final pending = Completer<String>();
      final gateway = _ScriptedGateway(() => pending.future);
      final controller = containerWith(gateway).read(assistantControllerProvider.notifier);

      final first = controller.send('one', languageCode: 'en');
      await controller.send('two', languageCode: 'en');
      pending.complete('reply');
      await first;

      expect(gateway.received, hasLength(1));
    });

    test('keeps a failed reply in the conversation but not in what the model sees', () async {
      var call = 0;
      final gateway = _ScriptedGateway(() => call++ == 0 ? throw const UnavailableFailure() : 'ok');
      final container = containerWith(gateway);
      final controller = container.read(assistantControllerProvider.notifier);

      await controller.send('first', languageCode: 'en');
      expect(container.read(assistantControllerProvider).messages.last.error, isA<UnavailableFailure>());

      await controller.send('second', languageCode: 'en');
      expect(gateway.received.last.where((m) => m.isError), isEmpty);
      expect(gateway.received.last.map((m) => m.text), ['first', 'second']);
    });

    test('caps a message at the website chat limit', () async {
      final gateway = _ScriptedGateway(() => 'ok');
      await containerWith(gateway).read(assistantControllerProvider.notifier).send('x' * 700, languageCode: 'en');

      expect(gateway.received.single.single.text, hasLength(kAssistantMaxMessageLength));
    });

    test('start over clears the conversation', () async {
      final container = containerWith(_ScriptedGateway(() => 'ok'));
      await container.read(assistantControllerProvider.notifier).send('hi', languageCode: 'en');
      container.read(assistantControllerProvider.notifier).startOver();

      expect(container.read(assistantControllerProvider).isEmpty, isTrue);
    });
  });

  group('Ask Ali', () {
    final copy = realSnapshot.assistant;

    Future<void> openAssistant(
      WidgetTester tester, {
      AssistantGateway? assistant,
      ContactLauncher? contactLauncher,
    }) async {
      await pumpApp(tester, assistant: assistant, contactLauncher: contactLauncher);
      await scrollAndTap(tester, find.text('Ask a question'));
    }

    testWidgets('opens from the Home card, above the tabs', (tester) async {
      await openAssistant(tester);

      expect(find.byType(NavigationBar), findsNothing);
      expect(find.byType(TextField), findsOneWidget);
    });

    testWidgets('introduces itself with the website copy and starter questions', (tester) async {
      await openAssistant(tester);

      expect(find.text(copy.intro.en), findsOneWidget);
      for (final starter in copy.starters.en) {
        expect(find.text(starter), findsOneWidget);
      }
      expect(find.textContaining(copy.disclaimer.en, findRichText: true), findsOneWidget);
    });

    testWidgets('a starter question is sent and answered', (tester) async {
      await openAssistant(tester);
      await tester.tap(find.text(copy.starters.en.first));
      await tester.pump();
      expect(find.text(copy.typing.en), findsOneWidget, reason: 'the typing state shows while waiting');
      // The dev stand-in replies after a short delay; pumpAndSettle alone would not wait for it.
      await tester.pump(const Duration(seconds: 1));
      await tester.pumpAndSettle();

      expect(find.text(copy.starters.en.first), findsOneWidget, reason: 'now shown as the user message');
      expect(find.textContaining('Development preview'), findsOneWidget);
      expect(find.text(copy.starters.en[1]), findsNothing, reason: 'starters hide once the chat begins');
    });

    testWidgets('without a backend it says so in the website words', (tester) async {
      await openAssistant(tester, assistant: const UnconfiguredAssistantGateway());
      await tester.enterText(find.byType(TextField), 'Do you work in Fujairah?');
      await tester.testTextInput.receiveAction(TextInputAction.send);
      await tester.pumpAndSettle();

      expect(find.text(copy.unavailable.en), findsOneWidget);
    });

    testWidgets('the WhatsApp link opens the business number with the neutral greeting only', (tester) async {
      Uri? opened;
      final launcher = ContactLauncher(
        open: (uri) async {
          opened = uri;
          return true;
        },
        analytics: DebugAnalyticsSink(),
      );
      await openAssistant(tester, contactLauncher: launcher);
      await tester.enterText(find.byType(TextField), 'my secret villa address');
      await tester.tap(find.textContaining(copy.disclaimerLink.en, findRichText: true));
      await tester.pumpAndSettle();

      final business = realSnapshot.business;
      expect(opened?.host, 'wa.me');
      expect(opened?.path, '/${business.whatsapp}');
      expect(opened?.queryParameters['text'], business.whatsappMessage.en);
      expect(opened.toString(), isNot(contains('secret')));
    });
  });
}
