import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../../app/router/routes.dart';
import '../../../design_system/components/navigation/app_header.dart';
import '../../../design_system/theme/context_extensions.dart';
import '../../../design_system/tokens/app_icons.dart';
import '../../../design_system/tokens/app_layout_tokens.dart';
import '../../content/presentation/content_builder.dart';
import '../../content/presentation/content_cards.dart';

/// All services as a photo grid, with the price guide one tap away.
class ServicesScreen extends StatelessWidget {
  const ServicesScreen({super.key});

  @override
  Widget build(BuildContext context) => Scaffold(
    body: ContentBuilder(
      builder: (context, content) {
        final size = AppWindowSize.of(context);
        final gutter = AppSpacing.gutter(size);
        final columns = switch (size) {
          AppWindowSize.compact => 2,
          AppWindowSize.medium => 3,
          AppWindowSize.expanded => 4,
        };
        return AppScrollView(
          eyebrow: context.l10n.homeServicesEyebrow,
          title: context.l10n.servicesTitle,
          subtitle: context.l10n.servicesHeaderSubtitle,
          slivers: [
            SliverPadding(
              padding: EdgeInsetsDirectional.symmetric(horizontal: gutter),
              sliver: SliverToBoxAdapter(child: _PriceGuideLink(onTap: () => context.go(AppRoutes.priceGuide))),
            ),
            SliverPadding(
              padding: EdgeInsetsDirectional.fromSTEB(gutter, AppSpacing.xl, gutter, AppSpacing.section),
              // Rows of cards that size to their own content, so names and prices never clip
              // at large text sizes (a fixed-ratio grid cell would).
              sliver: SliverList.separated(
                itemCount: (content.services.length / columns).ceil(),
                separatorBuilder: (context, index) => const SizedBox(height: AppSpacing.xl),
                itemBuilder: (context, row) => Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    for (var column = 0; column < columns; column++) ...[
                      if (column > 0) const SizedBox(width: AppSpacing.md),
                      Expanded(
                        child: switch (row * columns + column) {
                          final index when index < content.services.length => ServiceCard(
                            service: content.services[index],
                            content: content,
                            onTap: () => context.go(AppRoutes.service(content.services[index].slug)),
                          ),
                          _ => const SizedBox.shrink(),
                        },
                      ),
                    ],
                  ],
                ),
              ),
            ),
          ],
        );
      },
    ),
  );
}

class _PriceGuideLink extends StatelessWidget {
  const _PriceGuideLink({required this.onTap});

  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) => Material(
    color: context.colors.surfaceWarm,
    borderRadius: BorderRadius.circular(AppRadius.md),
    child: InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(AppRadius.md),
      child: Padding(
        padding: const EdgeInsetsDirectional.all(AppSpacing.md),
        child: Row(
          children: [
            const Icon(AppIcons.pricing),
            const SizedBox(width: AppSpacing.sm),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(context.l10n.homePricingTitle, style: context.textStyles.subtitle),
                  Text(
                    context.l10n.homePricingCta,
                    style: context.textStyles.caption.copyWith(color: context.colors.textSecondary),
                  ),
                ],
              ),
            ),
            const Icon(AppIcons.forward),
          ],
        ),
      ),
    ),
  );
}
