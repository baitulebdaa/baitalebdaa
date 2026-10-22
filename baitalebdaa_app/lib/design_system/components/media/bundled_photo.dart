import 'package:flutter/material.dart';

import '../../../features/content/domain/content_models.dart';
import '../../theme/context_extensions.dart';
import '../../tokens/app_layout_tokens.dart';

/// A website photo the app bundles, at a fixed aspect ratio. It is decoded at the size it is
/// shown (not full resolution) to keep memory low and lists smooth, fades in over a warm
/// placeholder, and never shows a broken-image icon.
class BundledPhoto extends StatelessWidget {
  const BundledPhoto({
    required this.image,
    required this.aspectRatio,
    super.key,
    this.borderRadius = BorderRadius.zero,
    this.semanticLabel,
  });

  final BundledImage image;
  final double aspectRatio;
  final BorderRadiusGeometry borderRadius;

  /// Read by screen readers; defaults to the website's alt text. Pass an empty string for
  /// a purely decorative photo whose meaning is already in nearby text.
  final String? semanticLabel;

  /// Lays the old and new frame over each other at the full size of the photo.
  static Widget _fill(Widget? current, List<Widget> previous) =>
      Stack(fit: StackFit.expand, children: [...previous, ?current]);

  @override
  Widget build(BuildContext context) {
    final alt = image.alt;
    final label = semanticLabel ?? (alt == null ? null : context.localized(alt));
    final placeholder = SizedBox.expand(child: ColoredBox(color: context.colors.surfaceWarm));
    return AspectRatio(
      aspectRatio: aspectRatio,
      child: ClipRRect(
        borderRadius: borderRadius,
        child: LayoutBuilder(
          builder: (context, constraints) {
            final pixels = MediaQuery.devicePixelRatioOf(context);
            final width = constraints.maxWidth.isFinite ? (constraints.maxWidth * pixels).round() : null;
            // Explicit infinite size: the photo always fills its frame. Without it, while
            // fading in (inside the switcher's loose Stack) it shrank to its own aspect
            // ratio and showed as a narrow strip.
            return Image.asset(
              image.asset,
              width: double.infinity,
              height: double.infinity,
              fit: BoxFit.cover,
              cacheWidth: width,
              semanticLabel: label,
              excludeFromSemantics: label == null || label.isEmpty,
              frameBuilder: (context, child, frame, wasSynchronouslyLoaded) {
                if (wasSynchronouslyLoaded) return child;
                return AnimatedSwitcher(
                  duration: AppMotion.of(context).standard,
                  layoutBuilder: _fill,
                  child: frame == null ? placeholder : child,
                );
              },
              errorBuilder: (context, error, stack) => placeholder,
            );
          },
        ),
      ),
    );
  }
}
