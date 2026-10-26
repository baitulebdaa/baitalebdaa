import 'package:flutter/material.dart';

import '../../../../design_system/components/media/bundled_photo.dart';
import '../../../../design_system/theme/context_extensions.dart';
import '../../../../design_system/tokens/app_icons.dart';
import '../../../../design_system/tokens/app_layout_tokens.dart';
import '../../../content/domain/content_models.dart';
import '../../domain/request_validation.dart';
import '../request_labels.dart';

/// Places a step on a request screen (owner's design, 26 Oct 2026): its number and short
/// name head the section, and the step's question becomes the line under it.
class RequestSection extends InheritedWidget {
  const RequestSection({
    required this.number,
    required this.name,
    required super.child,
    super.key,
    this.optional = false,
  });

  final int number;
  final String name;
  final bool optional;

  static RequestSection? maybeOf(BuildContext context) => context.dependOnInheritedWidgetOfExactType<RequestSection>();

  @override
  bool updateShouldNotify(RequestSection oldWidget) =>
      number != oldWidget.number || name != oldWidget.name || optional != oldWidget.optional;
}

/// The shared shape of every step: a numbered section on a request screen, or (on its
/// own) one question as a headline, one line of help, then the answers, spaced evenly.
class StepBody extends StatelessWidget {
  const StepBody({required this.title, required this.children, super.key, this.help});

  final String title;
  final String? help;
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    final help = this.help;
    final section = RequestSection.maybeOf(context);
    final styles = context.textStyles;
    final secondary = context.colors.textSecondary;
    final answers = [
      for (final (index, child) in children.indexed) ...[if (index > 0) const SizedBox(height: AppSpacing.sm), child],
    ];
    if (section != null) {
      return Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Semantics(
            header: true,
            child: Text.rich(
              TextSpan(
                text: '${section.number}. ${section.name}',
                children: [
                  if (section.optional)
                    TextSpan(
                      text: ' (${context.l10n.requestOptional})',
                      style: styles.bodySmall.copyWith(color: secondary),
                    ),
                ],
              ),
              style: styles.headline,
            ),
          ),
          const SizedBox(height: AppSpacing.xxs),
          Text(title, style: styles.bodySmall.copyWith(color: secondary)),
          if (help != null) Text(help, style: styles.caption.copyWith(color: secondary)),
          const SizedBox(height: AppSpacing.md),
          ...answers,
        ],
      );
    }
    final gutter = AppSpacing.gutter(AppWindowSize.of(context));
    return ListView(
      padding: EdgeInsetsDirectional.fromSTEB(gutter, AppSpacing.xl, gutter, AppSpacing.xxl),
      children: [
        Semantics(header: true, child: Text(title, style: styles.headline)),
        if (help != null) ...[
          const SizedBox(height: AppSpacing.xs),
          Text(help, style: styles.bodySmall.copyWith(color: secondary)),
        ],
        const SizedBox(height: AppSpacing.xl),
        ...answers,
      ],
    );
  }
}

/// Tiles of one width in a sideways row, all as tall as the tallest.
class ChoiceRow extends StatelessWidget {
  const ChoiceRow({required this.tileWidth, required this.children, super.key});

  final double tileWidth;
  final List<Widget> children;

  @override
  Widget build(BuildContext context) => SingleChildScrollView(
    scrollDirection: Axis.horizontal,
    clipBehavior: Clip.none,
    child: IntrinsicHeight(
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          for (final (index, child) in children.indexed) ...[
            if (index > 0) const SizedBox(width: AppSpacing.sm),
            SizedBox(width: tileWidth, child: child),
          ],
        ],
      ),
    ),
  );
}

/// A choice shown as a tile: a photo or an icon over its label. Chosen, it gets a green
/// border, a warm fill and a tick badge; screen readers hear a selectable button.
class ChoiceTile extends StatelessWidget {
  const ChoiceTile({
    required this.label,
    required this.selected,
    required this.onTap,
    super.key,
    this.image,
    this.icon,
  });

  final String label;
  final bool selected;
  final VoidCallback onTap;
  final BundledImage? image;
  final IconData? icon;

  static const double _radius = 14;

  @override
  Widget build(BuildContext context) {
    final colors = context.colors;
    final image = this.image;
    return Semantics(
      button: true,
      selected: selected,
      label: label,
      excludeSemantics: true,
      child: Material(
        color: selected ? colors.surfaceWarm : colors.surfaceSecondary,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(_radius),
          side: BorderSide(color: selected ? colors.brandPrimary : colors.borderSubtle, width: selected ? 2 : 1),
        ),
        clipBehavior: Clip.antiAlias,
        child: InkWell(
          onTap: onTap,
          child: Stack(
            children: [
              Padding(
                padding: EdgeInsetsDirectional.all(image == null ? AppSpacing.sm : AppSpacing.xs),
                child: Column(
                  crossAxisAlignment: image == null ? CrossAxisAlignment.center : CrossAxisAlignment.start,
                  children: [
                    if (image != null)
                      BundledPhoto(
                        image: image,
                        aspectRatio: 1,
                        borderRadius: BorderRadius.circular(10),
                        semanticLabel: '',
                      )
                    else ...[
                      const SizedBox(height: AppSpacing.xs),
                      Icon(icon, size: 28, color: colors.textPrimary),
                    ],
                    const SizedBox(height: AppSpacing.xs),
                    Text(
                      label,
                      style: context.textStyles.caption.copyWith(
                        color: colors.textPrimary,
                        fontWeight: selected ? FontWeight.w600 : FontWeight.w400,
                      ),
                      textAlign: image == null ? TextAlign.center : TextAlign.start,
                    ),
                  ],
                ),
              ),
              if (selected)
                PositionedDirectional(
                  top: AppSpacing.xs,
                  end: AppSpacing.xs,
                  child: DecoratedBox(
                    decoration: const BoxDecoration(color: Color(0xFFFFFFFF), shape: BoxShape.circle),
                    child: Icon(AppIcons.checkBadge, size: 22, color: colors.brandPrimary),
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}

/// A soft card with an icon, a bold line and a note: information, not a question.
class RequestInfoCard extends StatelessWidget {
  const RequestInfoCard({required this.icon, required this.title, required this.body, super.key});

  final IconData icon;
  final String title;
  final String body;

  @override
  Widget build(BuildContext context) => DecoratedBox(
    decoration: BoxDecoration(color: context.colors.surfaceWarm, borderRadius: BorderRadius.circular(14)),
    child: Padding(
      padding: const EdgeInsetsDirectional.all(AppSpacing.md),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, color: context.colors.textPrimary),
          const SizedBox(width: AppSpacing.md),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: context.textStyles.label),
                const SizedBox(height: AppSpacing.xxs),
                Text(body, style: context.textStyles.caption.copyWith(color: context.colors.textSecondary)),
              ],
            ),
          ),
        ],
      ),
    ),
  );
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
