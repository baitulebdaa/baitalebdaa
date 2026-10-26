import 'package:flutter/material.dart';

import '../../theme/context_extensions.dart';
import '../../tokens/app_icons.dart';
import '../../tokens/app_layout_tokens.dart';
import '../buttons/app_buttons.dart';
import 'failure_message.dart';

/// One honest line and at most one useful action. No illustrations.
class EmptyState extends StatelessWidget {
  const EmptyState({required this.title, super.key, this.body, this.actionLabel, this.onAction});

  final String title;
  final String? body;
  final String? actionLabel;
  final VoidCallback? onAction;

  @override
  Widget build(BuildContext context) {
    final body = this.body;
    final actionLabel = this.actionLabel;
    return _CenteredColumn(
      children: [
        Semantics(
          header: true,
          child: Text(title, style: context.textStyles.title, textAlign: TextAlign.center),
        ),
        if (body != null) ...[
          const SizedBox(height: AppSpacing.xs),
          Text(
            body,
            style: context.textStyles.bodySmall.copyWith(color: context.colors.textSecondary),
            textAlign: TextAlign.center,
          ),
        ],
        if (actionLabel != null && onAction != null) ...[
          const SizedBox(height: AppSpacing.xl),
          SecondaryButton(label: actionLabel, onPressed: onAction),
        ],
      ],
    );
  }
}

/// Full-area error for a failed load. Shows Retry only when retrying could help.
class ErrorState extends StatelessWidget {
  const ErrorState({required this.error, super.key, this.onRetry, this.title});

  final Object error;
  final VoidCallback? onRetry;

  /// Defaults to the generic "Something went wrong".
  final String? title;

  @override
  Widget build(BuildContext context) {
    final onRetry = this.onRetry;
    return _CenteredColumn(
      children: [
        Icon(AppIcons.error, color: context.colors.error, size: AppIcons.size),
        const SizedBox(height: AppSpacing.md),
        Semantics(
          header: true,
          liveRegion: true,
          child: Text(title ?? context.l10n.errorTitle, style: context.textStyles.title, textAlign: TextAlign.center),
        ),
        const SizedBox(height: AppSpacing.xs),
        Text(
          failureMessage(context, error),
          style: context.textStyles.bodySmall.copyWith(color: context.colors.textSecondary),
          textAlign: TextAlign.center,
        ),
        if (onRetry != null && isRetryable(error)) ...[
          const SizedBox(height: AppSpacing.xl),
          SecondaryButton(label: context.l10n.actionRetry, onPressed: onRetry),
        ],
      ],
    );
  }
}

class _CenteredColumn extends StatelessWidget {
  const _CenteredColumn({required this.children});

  final List<Widget> children;

  @override
  Widget build(BuildContext context) => Center(
    child: SingleChildScrollView(
      padding: EdgeInsetsDirectional.symmetric(
        horizontal: AppSpacing.gutter(AppWindowSize.of(context)),
        vertical: AppSpacing.xxl,
      ),
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: AppSpacing.readingWidth),
        child: Column(mainAxisSize: MainAxisSize.min, children: children),
      ),
    ),
  );
}
