import 'package:flutter/material.dart';

import '../../../../design_system/theme/context_extensions.dart';
import '../../../../design_system/tokens/app_icons.dart';
import '../../../../design_system/tokens/app_layout_tokens.dart';
import '../../domain/request_validation.dart';
import '../request_labels.dart';

/// The shared shape of every step: one question as a headline, one line of help, then the
/// answers, spaced evenly.
class StepBody extends StatelessWidget {
  const StepBody({required this.title, required this.children, super.key, this.help});

  final String title;
  final String? help;
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    final help = this.help;
    final gutter = AppSpacing.gutter(AppWindowSize.of(context));
    return ListView(
      padding: EdgeInsetsDirectional.fromSTEB(gutter, AppSpacing.xl, gutter, AppSpacing.xxl),
      children: [
        Semantics(header: true, child: Text(title, style: context.textStyles.headline)),
        if (help != null) ...[
          const SizedBox(height: AppSpacing.xs),
          Text(help, style: context.textStyles.bodySmall.copyWith(color: context.colors.textSecondary)),
        ],
        const SizedBox(height: AppSpacing.xl),
        for (final (index, child) in children.indexed) ...[if (index > 0) const SizedBox(height: AppSpacing.sm), child],
      ],
    );
  }
}

/// The step's problems, announced to screen readers when they appear.
class StepIssues extends StatelessWidget {
  const StepIssues({required this.issues, super.key});

  final Set<RequestIssue> issues;

  @override
  Widget build(BuildContext context) {
    if (issues.isEmpty) return const SizedBox.shrink();
    final color = context.colors.error;
    return Semantics(
      liveRegion: true,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          for (final issue in issues)
            Padding(
              padding: const EdgeInsetsDirectional.only(bottom: AppSpacing.xxs),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Icon(AppIcons.error, size: AppIcons.sizeSmall, color: color),
                  const SizedBox(width: AppSpacing.xs),
                  Expanded(
                    child: Text(context.issueLabel(issue), style: context.textStyles.bodySmall.copyWith(color: color)),
                  ),
                ],
              ),
            ),
        ],
      ),
    );
  }
}

/// A small label above a group of answers within a step.
class StepLabel extends StatelessWidget {
  const StepLabel(this.text, {super.key});

  final String text;

  @override
  Widget build(BuildContext context) => Padding(
    padding: const EdgeInsetsDirectional.only(top: AppSpacing.md),
    child: Text(text, style: context.textStyles.label),
  );
}
