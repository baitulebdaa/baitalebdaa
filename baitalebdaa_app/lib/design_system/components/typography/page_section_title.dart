import 'package:flutter/material.dart';

import '../../theme/context_extensions.dart';
import '../../tokens/app_icons.dart';
import '../../tokens/app_layout_tokens.dart';

/// A serif section title (owner's design, 26 Oct 2026), with "View All" or a short line at the end.
class PageSectionTitle extends StatelessWidget {
  const PageSectionTitle({required this.title, super.key, this.onViewAll, this.trailing, this.viewAllLabel});

  final String title;
  final VoidCallback? onViewAll;
  final String? trailing;

  /// Replaces "View All", for example with "Show Less" once a list is open.
  final String? viewAllLabel;

  @override
  Widget build(BuildContext context) {
    final onViewAll = this.onViewAll;
    final trailing = this.trailing;
    final secondary = context.colors.textSecondary;
    return LayoutBuilder(
      // The end text keeps to the end at its own width; at large text sizes it takes at
      // most 40% of the row and wraps, instead of pushing the title off screen.
      builder: (context, constraints) => Row(
        children: [
          Expanded(
            child: Semantics(header: true, child: Text(title, style: context.textStyles.headline)),
          ),
          const SizedBox(width: AppSpacing.sm),
          ConstrainedBox(
            constraints: BoxConstraints(maxWidth: constraints.maxWidth * 0.4),
            child: onViewAll != null
                ? TextButton(
                    onPressed: onViewAll,
                    style: TextButton.styleFrom(foregroundColor: secondary, textStyle: context.textStyles.bodySmall),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Flexible(child: Text(viewAllLabel ?? context.l10n.homeViewAll, textAlign: TextAlign.end)),
                        const SizedBox(width: AppSpacing.xxs),
                        const Icon(AppIcons.forward, size: 16),
                      ],
                    ),
                  )
                : trailing != null
                ? Text(
                    trailing,
                    style: context.textStyles.caption.copyWith(color: secondary),
                    textAlign: TextAlign.end,
                  )
                : const SizedBox.shrink(),
          ),
        ],
      ),
    );
  }
}
