import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../app/router/routes.dart';
import '../../../core/format/numbers.dart';
import '../../../core/platform/analytics.dart';
import '../../../design_system/components/buttons/app_buttons.dart';
import '../../../design_system/components/feedback/state_views.dart';
import '../../../design_system/components/media/bundled_photo.dart';
import '../../../design_system/components/navigation/app_header.dart';
import '../../../design_system/components/typography/section_header.dart';
import '../../../design_system/theme/context_extensions.dart';
import '../../../design_system/tokens/app_icons.dart';
import '../../../design_system/tokens/app_layout_tokens.dart';
import '../../content/domain/content_models.dart';
import '../../content/presentation/content_builder.dart';
import '../../content/presentation/content_cards.dart';
import '../../request/domain/request_options.dart';
import '../../request/presentation/request_flow_screen.dart';

/// One service: the website's photo, summary, inclusions, published prices, real projects
/// and FAQs, with a request for a free site survey always one tap away.
class ServiceDetailScreen extends ConsumerStatefulWidget {
  const ServiceDetailScreen({required this.slug, super.key});

  final String slug;

  @override
  ConsumerState<ServiceDetailScreen> createState() => _ServiceDetailScreenState();
}

class _ServiceDetailScreenState extends ConsumerState<ServiceDetailScreen> {
  @override
  void initState() {
    super.initState();
    unawaited(
      ref.read(analyticsSinkProvider).log(ServiceViewed(serviceId: widget.slug, source: ContentSource.services)),
    );
  }

  @override
  Widget build(BuildContext context) => ContentBuilder(
    builder: (context, content) {
      final service = content.service(widget.slug);
      if (service == null) {
        return Scaffold(
          appBar: const AppTopBar(),
          body: EmptyState(title: context.l10n.notFoundTitle, body: context.l10n.notFoundBody),
        );
      }
      return Scaffold(
        body: _ServiceBody(service: service, content: content),
        bottomNavigationBar: _RequestBar(
          onPressed: () => openRequestFlow(
            context,
            ref,
            entry: RequestEntry.service,
            serviceIds: [service.slug],
            consultationType: ConsultationType.siteSurvey,
          ),
        ),
      );
    },
  );
}

class _ServiceBody extends StatelessWidget {
  const _ServiceBody({required this.service, required this.content});

  final Service service;
  final ContentSnapshot content;

  @override
  Widget build(BuildContext context) {
    final l10n = context.l10n;
    final gutter = AppSpacing.gutter(AppWindowSize.of(context));
    final pricing = service.pricing;
    final prices = [for (final id in pricing?.itemIds ?? const <String>[]) ?content.priceItem(id)];
    final projects = content.projectsFor(service.slug);
    final faqs = service.detail.faqs;
    final secondary = context.colors.textSecondary;

    return CustomScrollView(
      slivers: [
        AppPhotoSliverHeader(
          aspectRatio: 1,
          title: context.localized(service.name),
          photo: BundledPhoto(image: service.image, aspectRatio: 1, semanticLabel: ''),
        ),
        SliverPadding(
          padding: EdgeInsetsDirectional.fromSTEB(gutter, AppSpacing.xl, gutter, AppSpacing.section),
          sliver: SliverList.list(
            children: [
              Semantics(header: true, child: Text(context.localized(service.name), style: context.textStyles.headline)),
              const SizedBox(height: AppSpacing.sm),
              Text(
                context.localized(service.detail.summary),
                style: context.textStyles.body.copyWith(color: secondary),
              ),
              const SizedBox(height: AppSpacing.xxl),
              SectionHeader(eyebrow: l10n.serviceIncluded),
              const SizedBox(height: AppSpacing.md),
              for (final item in context.localizedList(service.detail.included))
                Padding(
                  padding: const EdgeInsetsDirectional.only(bottom: AppSpacing.sm),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Icon(AppIcons.selected, size: AppIcons.sizeSmall, color: context.colors.brandAccentStrong),
                      const SizedBox(width: AppSpacing.sm),
                      Expanded(child: Text(item, style: context.textStyles.bodySmall)),
                    ],
                  ),
                ),
              if (prices.isNotEmpty) ...[
                const SizedBox(height: AppSpacing.xxl),
                SectionHeader(eyebrow: pricing!.direct ? l10n.servicePrices : l10n.serviceRelatedPrices),
                const SizedBox(height: AppSpacing.sm),
                for (final item in prices) PriceRow(item: item),
                const SizedBox(height: AppSpacing.sm),
                Text(
                  l10n.servicesVatNote(formatPercent(content.pricing.vatRate)),
                  style: context.textStyles.caption.copyWith(color: secondary),
                ),
              ],
              if (projects.isNotEmpty) ...[
                const SizedBox(height: AppSpacing.xxl),
                SectionHeader(eyebrow: l10n.serviceProjects),
                const SizedBox(height: AppSpacing.md),
                SizedBox(
                  height: MediaQuery.textScalerOf(context).scale(330),
                  child: ListView.separated(
                    scrollDirection: Axis.horizontal,
                    itemCount: projects.length,
                    separatorBuilder: (context, index) => const SizedBox(width: AppSpacing.md),
                    itemBuilder: (context, index) => SizedBox(
                      width: 220,
                      child: ProjectCard(
                        project: projects[index],
                        onTap: () => context.go(AppRoutes.project(projects[index].slug)),
                      ),
                    ),
                  ),
                ),
              ],
              if (faqs.isNotEmpty) ...[
                const SizedBox(height: AppSpacing.xxl),
                SectionHeader(eyebrow: l10n.serviceFaqs),
                const SizedBox(height: AppSpacing.xs),
                for (final faq in faqs)
                  ExpansionTile(
                    tilePadding: EdgeInsetsDirectional.zero,
                    childrenPadding: const EdgeInsetsDirectional.only(bottom: AppSpacing.md),
                    shape: const Border(),
                    title: Text(context.localized(faq.question), style: context.textStyles.subtitle),
                    children: [
                      Text(
                        context.localized(faq.answer),
                        style: context.textStyles.bodySmall.copyWith(color: secondary),
                      ),
                    ],
                  ),
              ],
            ],
          ),
        ),
      ],
    );
  }
}

/// A published price: the item name and the website's own formatted price.
class PriceRow extends StatelessWidget {
  const PriceRow({required this.item, super.key});

  final PriceItem item;

  @override
  Widget build(BuildContext context) => MergeSemantics(
    child: DecoratedBox(
      decoration: BoxDecoration(
        border: BorderDirectional(bottom: BorderSide(color: context.colors.borderSubtle)),
      ),
      child: Padding(
        padding: const EdgeInsetsDirectional.symmetric(vertical: AppSpacing.sm),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(child: Text(context.localized(item.name), style: context.textStyles.bodySmall)),
            const SizedBox(width: AppSpacing.md),
            Flexible(
              child: Text(context.localized(item.display), style: context.textStyles.label, textAlign: TextAlign.end),
            ),
          ],
        ),
      ),
    ),
  );
}

class _RequestBar extends StatelessWidget {
  const _RequestBar({required this.onPressed});

  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    final gutter = AppSpacing.gutter(AppWindowSize.of(context));
    return DecoratedBox(
      decoration: BoxDecoration(
        color: context.colors.surfacePrimary,
        border: BorderDirectional(top: BorderSide(color: context.colors.borderSubtle)),
      ),
      child: SafeArea(
        top: false,
        child: Padding(
          padding: EdgeInsetsDirectional.fromSTEB(gutter, AppSpacing.sm, gutter, AppSpacing.sm),
          child: PrimaryButton(label: context.l10n.servicesRequestCta, onPressed: onPressed),
        ),
      ),
    );
  }
}
