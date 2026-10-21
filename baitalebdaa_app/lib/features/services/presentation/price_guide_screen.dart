import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/platform/analytics.dart';
import '../../../design_system/components/navigation/app_header.dart';
import '../../../design_system/components/typography/section_header.dart';
import '../../../design_system/theme/context_extensions.dart';
import '../../../design_system/tokens/app_layout_tokens.dart';
import '../../content/presentation/content_builder.dart';
import 'service_detail_screen.dart';

/// Every published starting price, grouped as on the website's pricing page, with its
/// disclaimer. All figures and wording come from the website's pricing data.
class PriceGuideScreen extends ConsumerStatefulWidget {
  const PriceGuideScreen({super.key});

  @override
  ConsumerState<PriceGuideScreen> createState() => _PriceGuideScreenState();
}

class _PriceGuideScreenState extends ConsumerState<PriceGuideScreen> {
  @override
  void initState() {
    super.initState();
    unawaited(ref.read(analyticsSinkProvider).log(const PriceGuideViewed()));
  }

  @override
  Widget build(BuildContext context) => Scaffold(
    body: ContentBuilder(
      builder: (context, content) {
        final gutter = AppSpacing.gutter(AppWindowSize.of(context));
        final secondary = context.colors.textSecondary;
        return AppScrollView(
          title: context.l10n.priceGuideTitle,
          subtitle: context.l10n.homePricingBody,
          slivers: [
            SliverPadding(
              padding: EdgeInsetsDirectional.fromSTEB(gutter, AppSpacing.md, gutter, AppSpacing.section),
              sliver: SliverList.list(
                children: [
                  for (final group in content.pricing.groups) ...[
                    SectionHeader(eyebrow: context.localized(group.kicker), title: context.localized(group.title)),
                    const SizedBox(height: AppSpacing.xs),
                    Text(
                      context.localized(group.subtitle),
                      style: context.textStyles.caption.copyWith(color: secondary),
                    ),
                    const SizedBox(height: AppSpacing.sm),
                    for (final item in group.items) PriceRow(item: item),
                    const SizedBox(height: AppSpacing.xxl),
                  ],
                  Text(
                    context.localized(content.pricing.disclaimer),
                    style: context.textStyles.caption.copyWith(color: secondary),
                  ),
                ],
              ),
            ),
          ],
        );
      },
    ),
  );
}
