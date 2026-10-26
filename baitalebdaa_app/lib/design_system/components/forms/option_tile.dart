import 'package:flutter/material.dart';

import '../../theme/context_extensions.dart';
import '../../tokens/app_icons.dart';
import '../../tokens/app_layout_tokens.dart';

/// A selectable answer: a hairline-bordered tile that turns accent-bordered with a tick
/// when chosen. Used for single and multiple choice; screen readers announce it as a
/// selectable button with its state.
class OptionTile extends StatelessWidget {
  const OptionTile({
    required this.label,
    required this.selected,
    required this.onTap,
    super.key,
    this.description,
    this.enabled = true,
  });

  final String label;
  final String? description;
  final bool selected;
  final bool enabled;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final colors = context.colors;
    final description = this.description;
    final borderColor = selected ? colors.brandPrimary : colors.borderControl;
    return Semantics(
      button: true,
      selected: selected,
      enabled: enabled,
      child: Material(
        color: selected ? colors.surfaceWarm : colors.surfacePrimary,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(AppRadius.md),
          side: BorderSide(color: enabled ? borderColor : colors.borderSubtle, width: selected ? 2 : 1),
        ),
        clipBehavior: Clip.antiAlias,
        child: InkWell(
          onTap: enabled ? onTap : null,
          child: ConstrainedBox(
            constraints: const BoxConstraints(minHeight: kMinTouchTarget + AppSpacing.xs),
            child: Padding(
              padding: const EdgeInsetsDirectional.symmetric(horizontal: AppSpacing.md, vertical: AppSpacing.sm),
              child: Row(
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text(
                          label,
                          style: context.textStyles.subtitle.copyWith(
                            color: enabled ? colors.textPrimary : colors.textTertiary,
                          ),
                        ),
                        if (description != null)
                          Text(description, style: context.textStyles.caption.copyWith(color: colors.textSecondary)),
                      ],
                    ),
                  ),
                  if (selected) ...[
                    const SizedBox(width: AppSpacing.xs),
                    Icon(AppIcons.selected, size: AppIcons.sizeSmall, color: colors.brandPrimary),
                  ],
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
