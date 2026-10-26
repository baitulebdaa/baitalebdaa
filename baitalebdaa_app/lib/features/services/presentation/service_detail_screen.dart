import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:share_plus/share_plus.dart';

import '../../../core/format/numbers.dart';
import '../../../core/platform/analytics.dart';
import '../../../design_system/components/feedback/state_views.dart';
import '../../../design_system/components/media/bundled_photo.dart';
import '../../../design_system/components/navigation/app_header.dart';
import '../../../design_system/components/typography/page_section_title.dart';
import '../../../design_system/theme/context_extensions.dart';
import '../../../design_system/tokens/app_icons.dart';
import '../../../design_system/tokens/app_layout_tokens.dart';
import '../../content/domain/content_models.dart';
import '../../content/presentation/content_builder.dart';
import '../../projects/presentation/project_grid_card.dart';
import '../../request/domain/request_options.dart';
import '../../request/presentation/request_flow_screen.dart';
import '../../saved/data/saved_items.dart';

/// One service (owner's design, 26 Oct 2026): the website's photo, summary, inclusions,
/// real projects, the four-stage process, published prices and FAQs, with a consultation
/// request always one tap away. It can be saved on the device or shared as its website page.
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
      final l10n = context.l10n;
      final saved = ref.watch(savedServicesProvider).contains(service.slug);
      final name = context.localized(service.name);
      final languageCode = Localizations.localeOf(context).languageCode;
      return Scaffold(
        appBar: AppTopBar(
          title: l10n.serviceDetailsTitle,
          actions: [
            AppBarButton(
              icon: saved ? AppIcons.bookmarked : AppIcons.bookmark,
              tooltip: saved ? l10n.serviceUnsave : l10n.serviceSave,
              onPressed: () => ref.read(savedServicesProvider.notifier).toggle(service.slug),
            ),
            AppBarButton(
              icon: AppIcons.share,
              tooltip: l10n.serviceShare,
              // The service's own page on the website (every service has a Dubai page).
              onPressed: () => SharePlus.instance.share(
                ShareParams(
                  text: l10n.serviceShareText(name, '${content.business.siteUrl}/$languageCode/${service.slug}/dubai'),
                  subject: name,
                ),
              ),
            ),
          ],
        ),
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

class _ServiceBody extends ConsumerStatefulWidget {
  const _ServiceBody({required this.service, required this.content});

  final Service service;
  final ContentSnapshot content;

  @override
  ConsumerState<_ServiceBody> createState() => _ServiceBodyState();
}

class _ServiceBodyState extends ConsumerState<_ServiceBody> {
  /// Inclusions shown before "View All".
  static const _includedPreview = 5;
  var _allIncluded = false;

  @override
  Widget build(BuildContext context) {
    final service = widget.service;
    final content = widget.content;
    final l10n = context.l10n;
    final styles = context.textStyles;
    final colors = context.colors;
    final gutter = AppSpacing.gutter(AppWindowSize.of(context));
    final pricing = service.pricing;
    final prices = [for (final id in pricing?.itemIds ?? const <String>[]) ?content.priceItem(id)];
    final projects = content.projectsFor(service.slug);
    final included = context.localizedList(service.detail.included);
    final shownIncluded = _allIncluded ? included : included.take(_includedPreview).toList();
    final faqs = service.detail.faqs;
    final starting = content.startingPrice(service);

    return ListView(
      padding: EdgeInsetsDirectional.fromSTEB(gutter, AppSpacing.sm, gutter, AppSpacing.section),
      children: [
        BundledPhoto(
          image: service.image,
          aspectRatio: 4 / 3,
          borderRadius: BorderRadius.circular(18),
          semanticLabel: '',
        ),
        const SizedBox(height: AppSpacing.lg),
        Semantics(header: true, child: Text(context.localized(service.name), style: styles.display)),
        const SizedBox(height: AppSpacing.sm),
        Text(context.localized(service.detail.summary), style: styles.body.copyWith(color: colors.textSecondary)),
        const SizedBox(height: AppSpacing.xl),
        _FactGrid(
          facts: [
            (icon: AppIcons.survey, label: l10n.serviceFactSurvey, value: null),
            (icon: AppIcons.location, label: l10n.serviceFactEmirates, value: null),
            (icon: AppIcons.factory, label: l10n.serviceFactFactory, value: null),
            if (starting != null)
              (icon: AppIcons.pricing, label: l10n.serviceStartingFrom, value: context.localized(starting.display)),
          ],
        ),
        const SizedBox(height: AppSpacing.xxl),
        PageSectionTitle(
          title: l10n.serviceIncluded,
          onViewAll: included.length > _includedPreview ? () => setState(() => _allIncluded = !_allIncluded) : null,
          viewAllLabel: _allIncluded ? l10n.serviceShowLess : null,
        ),
        const SizedBox(height: AppSpacing.md),
        for (final item in shownIncluded)
          Padding(
            padding: const EdgeInsetsDirectional.only(bottom: AppSpacing.sm),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                DecoratedBox(
                  decoration: BoxDecoration(color: colors.surfaceWarm, shape: BoxShape.circle),
                  child: SizedBox.square(
                    dimension: 26,
                    child: Icon(AppIcons.selected, size: 16, color: colors.brandPrimary),
                  ),
                ),
                const SizedBox(width: AppSpacing.md),
                Expanded(child: Text(item, style: styles.bodySmall)),
              ],
            ),
          ),
        if (projects.isNotEmpty) ...[
          const SizedBox(height: AppSpacing.xxl),
          PageSectionTitle(title: l10n.homeFeaturedProjects),
          ProjectCardRow(
            projects: projects,
            inset: false,
            saved: ref.watch(savedProjectsProvider),
            onToggleSaved: (slug) => ref.read(savedProjectsProvider.notifier).toggle(slug),
          ),
        ],
        const SizedBox(height: AppSpacing.xxl),
        PageSectionTitle(title: l10n.serviceHowItWorks),
        const SizedBox(height: AppSpacing.md),
        _ProcessRow(steps: content.process),
        if (prices.isNotEmpty) ...[
          const SizedBox(height: AppSpacing.xxl),
          PageSectionTitle(title: pricing!.direct ? l10n.servicePrices : l10n.serviceRelatedPrices),
          const SizedBox(height: AppSpacing.sm),
          for (final item in prices) PriceRow(item: item),
          const SizedBox(height: AppSpacing.sm),
          Text(
            l10n.servicesVatNote(formatPercent(content.pricing.vatRate)),
            style: styles.caption.copyWith(color: colors.textSecondary),
          ),
        ],
        if (faqs.isNotEmpty) ...[
          const SizedBox(height: AppSpacing.xxl),
          PageSectionTitle(title: l10n.serviceFaqs),
          const SizedBox(height: AppSpacing.xs),
          for (final faq in faqs)
            ExpansionTile(
              tilePadding: EdgeInsetsDirectional.zero,
              childrenPadding: const EdgeInsetsDirectional.only(bottom: AppSpacing.md),
              shape: const Border(),
              title: Text(context.localized(faq.question), style: styles.subtitle),
              children: [
                Text(context.localized(faq.answer), style: styles.bodySmall.copyWith(color: colors.textSecondary)),
              ],
            ),
        ],
      ],
    );
  }
}

typedef _Fact = ({IconData icon, String label, String? value});

/// Facts about the service in soft tiles, two to a row on phones, four on wider screens.
class _FactGrid extends StatelessWidget {
  const _FactGrid({required this.facts});

  final List<_Fact> facts;

  @override
  Widget build(BuildContext context) {
    final columns = AppWindowSize.of(context) == AppWindowSize.compact ? 2 : 4;
    final rows = (facts.length / columns).ceil();
    return Column(
      children: [
        for (var row = 0; row < rows; row++) ...[
          if (row > 0) const SizedBox(height: AppSpacing.sm),
          IntrinsicHeight(
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                for (var column = 0; column < columns; column++) ...[
                  if (column > 0) const SizedBox(width: AppSpacing.sm),
                  Expanded(
                    child: switch (row * columns + column) {
                      final i when i < facts.length => _FactTile(fact: facts[i]),
                      _ => const SizedBox.shrink(),
                    },
                  ),
                ],
              ],
            ),
          ),
        ],
      ],
    );
  }
}

class _FactTile extends StatelessWidget {
  const _FactTile({required this.fact});

  final _Fact fact;

  @override
  Widget build(BuildContext context) {
    final colors = context.colors;
    final styles = context.textStyles;
    final value = fact.value;
    return MergeSemantics(
      child: DecoratedBox(
        decoration: BoxDecoration(color: colors.surfaceWarm, borderRadius: BorderRadius.circular(14)),
        child: Padding(
          padding: const EdgeInsetsDirectional.all(AppSpacing.sm),
          child: Row(
            children: [
              DecoratedBox(
                decoration: BoxDecoration(color: colors.surfacePrimary, shape: BoxShape.circle),
                child: SizedBox.square(dimension: 40, child: Icon(fact.icon, size: 20, color: colors.textPrimary)),
              ),
              const SizedBox(width: AppSpacing.sm),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      fact.label,
                      style: value == null
                          ? styles.caption.copyWith(color: colors.textPrimary, fontWeight: FontWeight.w600)
                          : styles.caption.copyWith(color: colors.textSecondary),
                    ),
                    if (value != null) Text(value, style: styles.label),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

/// The website's four-stage process as a sideways row: number, icon, stage, one line.
class _ProcessRow extends StatelessWidget {
  const _ProcessRow({required this.steps});

  final List<ProcessStep> steps;

  static const _icons = [AppIcons.stageDiscover, AppIcons.stageVisualize, AppIcons.stageApprove, AppIcons.stageMake];
  static const double _stepWidth = 180;

  @override
  Widget build(BuildContext context) {
    final colors = context.colors;
    final styles = context.textStyles;
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      clipBehavior: Clip.none,
      child: IntrinsicHeight(
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            for (final (i, step) in steps.indexed) ...[
              if (i > 0) const SizedBox(width: AppSpacing.md),
              SizedBox(
                width: _stepWidth,
                child: MergeSemantics(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          DecoratedBox(
                            decoration: BoxDecoration(color: colors.surfaceWarm, shape: BoxShape.circle),
                            child: SizedBox.square(
                              dimension: 36,
                              child: Center(child: Text('${i + 1}', style: styles.label)),
                            ),
                          ),
                          const SizedBox(width: AppSpacing.sm),
                          Icon(_icons[i % _icons.length], color: colors.textPrimary),
                          if (i < steps.length - 1) ...[
                            const SizedBox(width: AppSpacing.sm),
                            Expanded(child: Divider(color: colors.brandAccent)),
                          ],
                        ],
                      ),
                      const SizedBox(height: AppSpacing.sm),
                      Text(context.localized(step.title), style: styles.label),
                      const SizedBox(height: AppSpacing.xxs),
                      Text(context.localized(step.body), style: styles.caption.copyWith(color: colors.textSecondary)),
                    ],
                  ),
                ),
              ),
            ],
          ],
        ),
      ),
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

/// The always-visible request: a deep green pill across the bottom.
class _RequestBar extends StatelessWidget {
  const _RequestBar({required this.onPressed});

  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    final gutter = AppSpacing.gutter(AppWindowSize.of(context));
    final colors = context.colors;
    return ColoredBox(
      color: colors.surfacePrimary,
      child: SafeArea(
        top: false,
        child: Padding(
          padding: EdgeInsetsDirectional.fromSTEB(gutter, AppSpacing.sm, gutter, AppSpacing.sm),
          child: FilledButton(
            onPressed: onPressed,
            style: FilledButton.styleFrom(
              shape: const StadiumBorder(),
              minimumSize: const Size.fromHeight(56),
              textStyle: context.textStyles.headline.copyWith(fontSize: 22),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Flexible(child: Text(context.l10n.serviceRequestConsultation, textAlign: TextAlign.center)),
                const SizedBox(width: AppSpacing.sm),
                const Icon(AppIcons.proceed),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
