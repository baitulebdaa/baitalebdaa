import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

import '../../theme/context_extensions.dart';
import '../../tokens/app_icons.dart';

/// A website photo that is not bundled (project galleries), cached on disk after the first
/// view. A warm placeholder shows while it loads; a failed load shows a quiet icon, never a
/// broken-image glyph.
class NetworkPhoto extends StatelessWidget {
  const NetworkPhoto({required this.url, required this.semanticLabel, super.key, this.fit = BoxFit.cover});

  final String url;
  final String semanticLabel;
  final BoxFit fit;

  @override
  Widget build(BuildContext context) {
    final warm = context.colors.surfaceWarm;
    return Semantics(
      image: true,
      label: semanticLabel,
      child: LayoutBuilder(
        builder: (context, constraints) {
          final pixels = MediaQuery.devicePixelRatioOf(context);
          final width = constraints.maxWidth.isFinite ? (constraints.maxWidth * pixels).round() : null;
          return CachedNetworkImage(
            imageUrl: url,
            fit: fit,
            memCacheWidth: width,
            placeholder: (context, url) => ColoredBox(color: warm),
            errorWidget: (context, url, error) => ColoredBox(
              color: warm,
              child: Center(child: Icon(AppIcons.offline, color: context.colors.textTertiary)),
            ),
          );
        },
      ),
    );
  }
}
