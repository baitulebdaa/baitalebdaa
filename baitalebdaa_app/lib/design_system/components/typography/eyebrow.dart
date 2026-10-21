import 'package:flutter/material.dart';

import '../../theme/context_extensions.dart';
import '../../tokens/app_layout_tokens.dart';
import '../../tokens/app_typography.dart';

/// The website's section label: small caps-style text with a short rule beneath.
/// Latin is upper-cased; Arabic has no case and is shown as written.
class Eyebrow extends StatelessWidget {
  const Eyebrow(this.text, {super.key, this.onDark = false});

  final String text;

  /// For use on photography or inverse surfaces.
  final bool onDark;

  static const double _ruleWidth = 24;

  @override
  Widget build(BuildContext context) {
    final styles = context.textStyles;
    final color = onDark ? context.colors.textOnInverse : context.colors.textSecondary;
    final shown = styles.script == AppScript.latin ? text.toUpperCase() : text;
    return Semantics(
      header: true,
      label: text,
      excludeSemantics: true,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(shown, style: styles.eyebrow.copyWith(color: color)),
          const SizedBox(height: AppSpacing.xs),
          SizedBox(
            width: _ruleWidth,
            height: 1,
            child: ColoredBox(color: color),
          ),
        ],
      ),
    );
  }
}
