import 'package:flutter/material.dart';

import '../../tokens/app_colors.dart';
import '../../tokens/app_icons.dart';
import '../../tokens/app_layout_tokens.dart';

/// The one dark action on a screen. Shape, colour and size come from the theme; this
/// widget only adds the trailing arrow and the loading state.
class PrimaryButton extends StatelessWidget {
  const PrimaryButton({
    required this.label,
    required this.onPressed,
    super.key,
    this.showArrow = true,
    this.isLoading = false,
    this.onDark = false,
  });

  final String label;

  /// Null disables the button.
  final VoidCallback? onPressed;
  final bool showArrow;

  /// Keeps the button's size while showing progress, and ignores taps.
  final bool isLoading;

  /// Paper-coloured, for use on photography and ink banners.
  final bool onDark;

  @override
  Widget build(BuildContext context) => FilledButton(
    onPressed: isLoading ? null : onPressed,
    style: onDark
        ? FilledButton.styleFrom(
            backgroundColor: AppColors.light.surfacePrimary,
            foregroundColor: AppColors.light.textPrimary,
          )
        : null,
    child: _ButtonContent(label: label, showArrow: showArrow, isLoading: isLoading),
  );
}

/// Outline action, same shape as [PrimaryButton].
class SecondaryButton extends StatelessWidget {
  const SecondaryButton({required this.label, required this.onPressed, super.key, this.showArrow = false});

  final String label;
  final VoidCallback? onPressed;
  final bool showArrow;

  @override
  Widget build(BuildContext context) => OutlinedButton(
    onPressed: onPressed,
    child: _ButtonContent(label: label, showArrow: showArrow, isLoading: false),
  );
}

class _ButtonContent extends StatelessWidget {
  const _ButtonContent({required this.label, required this.showArrow, required this.isLoading});

  final String label;
  final bool showArrow;
  final bool isLoading;

  static const double _spinnerSize = 18;

  @override
  Widget build(BuildContext context) {
    if (isLoading) {
      return Semantics(
        label: label,
        child: const SizedBox.square(dimension: _spinnerSize, child: CircularProgressIndicator(strokeWidth: 2)),
      );
    }
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Flexible(child: Text(label, textAlign: TextAlign.center)),
        if (showArrow) ...[
          const SizedBox(width: AppSpacing.xs),
          const Icon(AppIcons.proceed, size: AppIcons.sizeSmall),
        ],
      ],
    );
  }
}
