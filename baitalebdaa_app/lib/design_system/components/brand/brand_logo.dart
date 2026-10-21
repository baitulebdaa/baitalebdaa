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
