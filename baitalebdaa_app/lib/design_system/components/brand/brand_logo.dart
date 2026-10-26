import 'package:flutter/material.dart';

import '../../theme/context_extensions.dart';

/// The website's wordmark (public/assets/logo.png and "footer logo.png", cropped).
/// Picks the white or black version to suit the surface it sits on.
class BrandLogo extends StatelessWidget {
  const BrandLogo({super.key, this.width = defaultWidth, this.onDark});

  static const onDarkAsset = 'assets/brand/logo_on_dark.png';
  static const onLightAsset = 'assets/brand/logo_on_light.png';

  /// Matches the native splash image (720 px at 4x), so launch hands over without a jump.
  static const double splashWidth = 180;
  static const double defaultWidth = 140;

  final double width;

  /// Forces a version; by default it follows the current theme's brightness.
  final bool? onDark;

  @override
  Widget build(BuildContext context) {
    final dark = onDark ?? Theme.of(context).brightness == Brightness.dark;
    return Semantics(
      image: true,
      label: context.l10n.appTitle,
      child: Image.asset(dark ? onDarkAsset : onLightAsset, width: width, excludeFromSemantics: true),
    );
  }
}

/// The wordmark over the studio's three trades, set to the wordmark's width (owner's
/// design, 26 Oct 2026). The design's house mark is not part of the real logo, so it is
/// left out.
class BrandLockup extends StatelessWidget {
  const BrandLockup({super.key, this.width = BrandLogo.defaultWidth, this.onDark, this.centered = false});

  final double width;
  final bool? onDark;
  final bool centered;

  @override
  Widget build(BuildContext context) {
    final dark = onDark ?? Theme.of(context).brightness == Brightness.dark;
    final arabic = context.isArabic;
    return Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: centered ? CrossAxisAlignment.center : CrossAxisAlignment.start,
      children: [
        BrandLogo(width: width, onDark: dark),
        SizedBox(height: width * 0.06),
        SizedBox(
          width: width,
          child: FittedBox(
            fit: BoxFit.fitWidth,
            child: Text(
              context.l10n.brandServicesLine,
              maxLines: 1,
              style: context.textStyles.caption.copyWith(
                color: dark ? const Color(0xFFFFFFFF) : context.colors.textPrimary,
                fontWeight: FontWeight.w500,
                // Spaced capitals in Latin; Arabic letters must stay joined.
                letterSpacing: arabic ? 0 : 2.6,
              ),
            ),
          ),
        ),
      ],
    );
  }
}
