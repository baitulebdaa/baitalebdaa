import 'package:flutter/material.dart';

import '../../theme/context_extensions.dart';
import '../../tokens/app_layout_tokens.dart';
import 'eyebrow.dart';

/// Eyebrow with an optional title below it.
class SectionHeader extends StatelessWidget {
  const SectionHeader({required this.eyebrow, super.key, this.title});

  final String eyebrow;
  final String? title;

  @override
  Widget build(BuildContext context) {
    final title = this.title;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        Eyebrow(eyebrow),
        if (title != null) ...[
          const SizedBox(height: AppSpacing.md),
          Semantics(header: true, child: Text(title, style: context.textStyles.title)),
        ],
      ],
    );
  }
}
