import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../app/router/routes.dart';
import '../../../core/failure/failure.dart';
import '../../../core/format/phone.dart';
import '../../../design_system/components/feedback/failure_message.dart';
import '../../../design_system/components/navigation/app_header.dart';
import '../../../design_system/theme/context_extensions.dart';
import '../../../design_system/tokens/app_icons.dart';
import '../../../design_system/tokens/app_layout_tokens.dart';
import '../../content/domain/content_models.dart';
import '../../content/presentation/content_builder.dart';
import '../../support/data/contact_launcher.dart';
import '../domain/assistant_message.dart';
import 'assistant_controller.dart';

/// Ask Ali, the AI assistant. It introduces itself and states its limits in the website's
/// own words, and always offers WhatsApp for anything that needs a confirmed answer.
class AssistantScreen extends ConsumerWidget {
  const AssistantScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) => ContentBuilder(
    builder: (context, content) {
      final copy = content.assistant;
      final state = ref.watch(assistantControllerProvider);
      return Scaffold(
        appBar: AppTopBar(
          title: context.localized(copy.name),
          subtitle: context.localized(copy.subtitle),
          actions: [
            if (!state.isEmpty)
              AppBarButton(
                icon: AppIcons.startOver,
                tooltip: context.localized(copy.startOver),
                onPressed: state.isSending ? null : ref.read(assistantControllerProvider.notifier).startOver,
              ),
          ],
        ),
        body: Column(
          children: [
            Expanded(
              child: _Conversation(copy: copy, state: state),
            ),
            _Disclaimer(copy: copy, business: content.business),
            _Composer(copy: copy, isSending: state.isSending),
          ],
        ),
      );
    },
  );
}

class _Conversation extends ConsumerWidget {
  const _Conversation({required this.copy, required this.state});

  final AssistantCopy copy;
  final AssistantState state;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final gutter = AppSpacing.gutter(AppWindowSize.of(context));
    final items = <Widget>[
      _Bubble(
        role: AssistantRole.assistant,
        speaker: context.localized(copy.name),
        text: context.localized(copy.intro),
      ),
      if (state.isEmpty) _Starters(copy: copy),
      for (final message in state.messages)
        if (message.error case final error?)
          _ErrorBubble(copy: copy, error: error)
        else
          _Bubble(
            role: message.role,
            speaker: message.role == AssistantRole.user ? context.l10n.assistantYou : context.localized(copy.name),
            text: message.text!,
          ),
      if (state.isSending) _Typing(copy: copy),
    ];
    // Reversed so the newest message sits above the composer and the list follows it.
    return ListView(
      reverse: true,
      padding: EdgeInsetsDirectional.symmetric(horizontal: gutter, vertical: AppSpacing.md),
      children: [
        for (final item in items.reversed)
          Padding(
            padding: const EdgeInsetsDirectional.only(bottom: AppSpacing.sm),
            child: item,
          ),
      ],
    );
  }
}

class _Bubble extends StatelessWidget {
  const _Bubble({required this.role, required this.speaker, required this.text});

  final AssistantRole role;
  final String speaker;
  final String text;

  static const double _maxWidthFraction = 0.82;

  @override
  Widget build(BuildContext context) {
    final colors = context.colors;
    final isUser = role == AssistantRole.user;
    return Align(
      alignment: isUser ? AlignmentDirectional.centerEnd : AlignmentDirectional.centerStart,
      child: ConstrainedBox(
        constraints: BoxConstraints(maxWidth: MediaQuery.sizeOf(context).width * _maxWidthFraction),
        child: Semantics(
          label: speaker,
          child: DecoratedBox(
            decoration: BoxDecoration(
              color: isUser ? colors.surfaceInverse : colors.surfaceSecondary,
              border: isUser ? null : Border.all(color: colors.borderSubtle),
              borderRadius: BorderRadiusDirectional.only(
                topStart: const Radius.circular(AppRadius.lg),
                topEnd: const Radius.circular(AppRadius.lg),
                bottomStart: Radius.circular(isUser ? AppRadius.lg : AppRadius.sm),
                bottomEnd: Radius.circular(isUser ? AppRadius.sm : AppRadius.lg),
              ),
            ),
            child: Padding(
              padding: const EdgeInsetsDirectional.symmetric(horizontal: AppSpacing.md, vertical: AppSpacing.sm),
              child: SelectableText(
                text,
                style: context.textStyles.bodySmall.copyWith(color: isUser ? colors.textOnInverse : colors.textPrimary),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _ErrorBubble extends StatelessWidget {
  const _ErrorBubble({required this.copy, required this.error});

  final AssistantCopy copy;
  final Object error;

  @override
  Widget build(BuildContext context) {
    // The website's own wording when the assistant itself is unavailable.
    final message = error is UnavailableFailure ? context.localized(copy.unavailable) : failureMessage(context, error);
    return Semantics(
      liveRegion: true,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(AppIcons.error, color: context.colors.error, size: AppIcons.sizeSmall),
          const SizedBox(width: AppSpacing.xs),
          Expanded(
            child: Text(message, style: context.textStyles.bodySmall.copyWith(color: context.colors.error)),
          ),
        ],
      ),
    );
  }
}

class _Starters extends ConsumerWidget {
  const _Starters({required this.copy});

  final AssistantCopy copy;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final languageCode = Localizations.localeOf(context).languageCode;
    return Wrap(
      spacing: AppSpacing.xs,
      runSpacing: AppSpacing.xs,
      children: [
        for (final starter in context.localizedList(copy.starters))
          ActionChip(
            label: Text(starter),
            labelStyle: context.textStyles.bodySmall,
            side: BorderSide(color: context.colors.borderControl),
            backgroundColor: context.colors.surfacePrimary,
            shape: const StadiumBorder(),
            onPressed: () => ref.read(assistantControllerProvider.notifier).send(starter, languageCode: languageCode),
          ),
      ],
    );
  }
}

class _Typing extends StatelessWidget {
  const _Typing({required this.copy});

  final AssistantCopy copy;

  @override
  Widget build(BuildContext context) => Semantics(
    liveRegion: true,
    child: Text(
      context.localized(copy.typing),
      style: context.textStyles.caption.copyWith(color: context.colors.textSecondary),
    ),
  );
}

class _Disclaimer extends ConsumerWidget {
  const _Disclaimer({required this.copy, required this.business});

  final AssistantCopy copy;
  final BusinessFacts business;

  Future<void> _openWhatsApp(BuildContext context, WidgetRef ref) async {
    final messenger = ScaffoldMessenger.of(context);
    final failed = context.l10n.contactWhatsAppFailed(formatPhone(business.phone));
    final opened = await ref
        .read(contactLauncherProvider)
        .openWhatsApp(
          business,
          languageCode: Localizations.localeOf(context).languageCode,
          screen: AppRoutes.assistant,
        );
    if (!opened) messenger.showSnackBar(SnackBar(content: Text(failed)));
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final style = context.textStyles.caption.copyWith(color: context.colors.textSecondary);
    final gutter = AppSpacing.gutter(AppWindowSize.of(context));
    // One sentence with the link inline, as on the website. The whole line is the tap
    // target, so it stays at least 48 dp tall without a gap under the sentence.
    return Semantics(
      link: true,
      child: InkWell(
        onTap: () => _openWhatsApp(context, ref),
        child: ConstrainedBox(
          constraints: const BoxConstraints(minHeight: kMinTouchTarget),
          child: Padding(
            padding: EdgeInsetsDirectional.symmetric(horizontal: gutter, vertical: AppSpacing.xs),
            child: Align(
              alignment: AlignmentDirectional.centerStart,
              child: Text.rich(
                TextSpan(
                  style: style,
                  children: [
                    TextSpan(text: context.localized(copy.disclaimer)),
                    const TextSpan(text: ' '),
                    TextSpan(
                      text: context.localized(copy.disclaimerLink),
                      style: TextStyle(color: context.colors.textPrimary, decoration: TextDecoration.underline),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _Composer extends ConsumerStatefulWidget {
  const _Composer({required this.copy, required this.isSending});

  final AssistantCopy copy;
  final bool isSending;

  @override
  ConsumerState<_Composer> createState() => _ComposerState();
}

class _ComposerState extends ConsumerState<_Composer> {
  final _controller = TextEditingController();

  @override
  void initState() {
    super.initState();
    _controller.addListener(() => setState(() {}));
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _send() {
    final text = _controller.text;
    if (text.trim().isEmpty || widget.isSending) return;
    _controller.clear();
    ref
        .read(assistantControllerProvider.notifier)
        .send(text, languageCode: Localizations.localeOf(context).languageCode);
  }

  @override
  Widget build(BuildContext context) {
    final copy = widget.copy;
    final canSend = _controller.text.trim().isNotEmpty && !widget.isSending;
    final gutter = AppSpacing.gutter(AppWindowSize.of(context));
    return SafeArea(
      top: false,
      child: Padding(
        padding: EdgeInsetsDirectional.fromSTEB(gutter, AppSpacing.xs, gutter / 2, AppSpacing.sm),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            Expanded(
              child: TextField(
                controller: _controller,
                minLines: 1,
                maxLines: 4,
                maxLength: kAssistantMaxMessageLength,
                textInputAction: TextInputAction.send,
                onSubmitted: (_) => _send(),
                decoration: InputDecoration(
                  hintText: context.localized(copy.placeholder),
                  // The counter appears only near the limit, where it helps.
                  counterText: _controller.text.length > kAssistantMaxMessageLength - 100 ? null : '',
                  semanticCounterText: '',
                  isDense: true,
                ),
                style: context.textStyles.bodySmall,
              ).withSemanticsLabel(context.localized(copy.inputLabel)),
            ),
            const SizedBox(width: AppSpacing.xxs),
            IconButton(
              icon: const Icon(AppIcons.send),
              tooltip: context.localized(copy.send),
              onPressed: canSend ? _send : null,
            ),
          ],
        ),
      ),
    );
  }
}

extension on Widget {
  Widget withSemanticsLabel(String label) => Semantics(textField: true, label: label, child: this);
}
