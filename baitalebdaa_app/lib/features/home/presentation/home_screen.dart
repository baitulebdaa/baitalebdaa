import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../app/router/routes.dart';
import '../../../core/platform/analytics.dart';
import '../../../design_system/components/brand/brand_logo.dart';
import '../../../design_system/components/buttons/app_buttons.dart';
import '../../../design_system/components/typography/page_section_title.dart';
import '../../../design_system/theme/context_extensions.dart';
import '../../../design_system/tokens/app_icons.dart';
import '../../../design_system/tokens/app_layout_tokens.dart';
import '../../content/domain/content_models.dart';
import '../../content/presentation/content_builder.dart';
import '../../projects/presentation/project_grid_card.dart';
import '../../request/data/request_repository.dart';
import '../../request/domain/request_options.dart';
import '../../request/presentation/request_entry_widgets.dart';
import '../../request/presentation/request_flow_screen.dart';
import '../../saved/data/saved_items.dart';
import '../../support/presentation/contact_actions.dart';
import '../data/preferred_emirate.dart';
import 'home_sections.dart';

/// Home (owner's design, 26 Oct 2026): a photo banner that starts a request, then the
/// services, featured projects, the price guide and why the studio, all from the website's
/// own data. Each section sizes to its content and to the user's text size.
class HomeScreen extends ConsumerWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) => Scaffold(
    body: SafeArea(
      bottom: false,
      child: ContentBuilder(
        builder: (context, content) {
          final l10n = context.l10n;
          final gutter = AppSpacing.gutter(AppWindowSize.of(context));
          final saved = ref.watch(savedProjectsProvider);
          EdgeInsetsDirectional padded([double top = AppSpacing.xxl]) =>
              EdgeInsetsDirectional.fromSTEB(gutter, top, gutter, 0);
          return ListView(
            padding: const EdgeInsetsDirectional.only(bottom: AppSpacing.section),
            children: [
              Padding(
                padding: EdgeInsetsDirectional.fromSTEB(gutter, AppSpacing.xs, gutter - AppSpacing.xs, 0),
                child: HomeTopBar(emirates: content.business.emirates),
              ),
              Padding(
                padding: padded(AppSpacing.sm),
                child: HeroCarousel(slides: content.heroSlides),
              ),
              Padding(
                padding: padded(AppSpacing.md),
                child: Column(
                  children: [
                    // No "Continue your request" card here (owner, 26 Oct 2026); Book
                    // still offers it.
                    LatestRequestCard(content: content),
                  ],
                ),
              ),
              Padding(
                padding: padded(AppSpacing.lg),
                child: PageSectionTitle(
                  title: l10n.homeServicesHeading,
                  onViewAll: () => context.go(AppRoutes.services),
                ),
              ),
              _ServiceRow(services: content.services),
              Padding(
                padding: padded(),
                child: PageSectionTitle(
                  title: l10n.homeFeaturedProjects,
                  onViewAll: () => context.go(AppRoutes.projects),
                ),
              ),
              ProjectCardRow(
                projects: content.projects,
                saved: saved,
                onToggleSaved: (slug) => ref.read(savedProjectsProvider.notifier).toggle(slug),
              ),
              Padding(
                padding: padded(),
                child: EstimateBanner(image: content.heroSlides.last.image),
              ),
              Padding(
                padding: padded(),
                child: PageSectionTitle(title: l10n.homeWhyTitle, trailing: l10n.homeWhyTagline),
              ),
              Padding(
                padding: padded(AppSpacing.lg),
                child: WhyGrid(facts: content.business.studioFacts),
              ),
              Padding(
                padding: padded(AppSpacing.section),
                child: AskAliCard(copy: content.assistant),
              ),
              if (content.reviews.firstOrNull case final review?)
                Padding(
                  padding: padded(),
                  child: ReviewQuote(review: review),
                ),
              Padding(
                padding: padded(),
                child: _BookingBanner(business: content.business),
              ),
            ],
          );
        },
      ),
    ),
  );
}

/// Logo at the start; search, requests and the visitor's emirate at the end. Home and
/// Profile share it (owner's designs, 26 Oct 2026).
class HomeTopBar extends ConsumerWidget {
  const HomeTopBar({required this.emirates, super.key});

  final List<Emirate> emirates;

  static const double _logoWidth = 160;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = context.l10n;
    final requests = ref.watch(myRequestsProvider).value ?? const [];
    final active = requests.any((request) => !request.status.isFinal);
    final emirateId = ref.watch(preferredEmirateProvider);
    final emirate = emirates.where((e) => e.id == emirateId).firstOrNull;
    return Row(
      children: [
        // The wordmark over the three trades (owner's design); it shrinks before anything
        // overflows at large text sizes.
        const Expanded(
          child: Align(
            alignment: AlignmentDirectional.centerStart,
            child: FittedBox(
              fit: BoxFit.scaleDown,
              child: BrandLockup(width: _logoWidth),
            ),
          ),
        ),
        IconButton(
          visualDensity: VisualDensity.compact,
          icon: const Icon(AppIcons.search),
          tooltip: l10n.homeSearchTooltip,
          onPressed: () => context.push(AppRoutes.search),
        ),
        IconButton(
          visualDensity: VisualDensity.compact,
          // The dot means a request is still open; the bell opens the list on Profile.
          icon: Badge(
            isLabelVisible: active,
            smallSize: 9,
            backgroundColor: context.colors.brandPrimary,
            child: const Icon(AppIcons.notifications),
          ),
          tooltip: active ? l10n.homeRequestsActiveTooltip : l10n.homeRequestsTooltip,
          onPressed: () => context.go(AppRoutes.profile),
        ),
        // Capped, not Flexible: a Flexible here shares the spare width with the logo and
        // leaves a gap at the end of the bar.
        ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 120),
          child: Tooltip(
            message: l10n.homeEmirateTooltip,
            child: InkWell(
              onTap: () => _chooseEmirate(context, ref, emirateId),
              borderRadius: BorderRadius.circular(AppRadius.md),
              child: ConstrainedBox(
                constraints: const BoxConstraints(minHeight: kMinTouchTarget, minWidth: kMinTouchTarget),
                child: Padding(
                  padding: const EdgeInsetsDirectional.symmetric(horizontal: AppSpacing.xs),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Flexible(
                        child: Text(
                          emirate == null ? l10n.homeEmirateAll : context.localized(emirate.name),
                          style: context.textStyles.label,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                      const SizedBox(width: AppSpacing.xxs),
                      const Icon(AppIcons.expand, size: AppIcons.sizeSmall),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }

  Future<void> _chooseEmirate(BuildContext context, WidgetRef ref, String? current) async {
    // The sheet returns '' for "All of the UAE", so a dismissed sheet (null) changes nothing.
    final picked = await showModalBottomSheet<String>(
      context: context,
      showDragHandle: true,
      builder: (context) => SafeArea(
        child: ListView(
          shrinkWrap: true,
          padding: const EdgeInsetsDirectional.fromSTEB(AppSpacing.lg, 0, AppSpacing.lg, AppSpacing.lg),
          children: [
            Text(context.l10n.homeEmirateTooltip, style: context.textStyles.title),
            const SizedBox(height: AppSpacing.xs),
            Text(
              context.l10n.homeEmirateSheetBody,
              style: context.textStyles.bodySmall.copyWith(color: context.colors.textSecondary),
            ),
            const SizedBox(height: AppSpacing.sm),
            for (final (id, label) in [
              ('', context.l10n.homeEmirateAllOption),
              for (final e in emirates) (e.id, context.localized(e.name)),
            ])
              ListTile(
                title: Text(label),
                selected: id == (current ?? ''),
                trailing: id == (current ?? '') ? Icon(AppIcons.selected, color: context.colors.brandPrimary) : null,
                onTap: () => Navigator.of(context).pop(id),
              ),
          ],
        ),
      ),
    );
    if (picked != null) await ref.read(preferredEmirateProvider.notifier).choose(picked.isEmpty ? null : picked);
  }
}

/// The height of [lines] lines of [style] at the user's text size.
double _linesHeight(BuildContext context, TextStyle style, int lines) =>
    MediaQuery.textScalerOf(context).scale(style.fontSize!) * (style.height ?? 1.2) * lines;

/// All services as square photo tiles in a sideways row.
class _ServiceRow extends StatelessWidget {
  const _ServiceRow({required this.services});

  final List<Service> services;

  static const double _tileWidth = 104;

  @override
  Widget build(BuildContext context) {
    final gutter = AppSpacing.gutter(AppWindowSize.of(context));
    final caption = context.textStyles.caption;
    return Padding(
      padding: const EdgeInsetsDirectional.only(top: AppSpacing.md),
      child: SizedBox(
        height: _tileWidth + AppSpacing.xs + _linesHeight(context, caption, 2) + AppSpacing.xxs,
        child: ListView.separated(
          scrollDirection: Axis.horizontal,
          padding: EdgeInsetsDirectional.symmetric(horizontal: gutter),
          itemCount: services.length,
          separatorBuilder: (context, index) => const SizedBox(width: AppSpacing.md),
          itemBuilder: (context, index) => SizedBox(
            width: _tileWidth,
            child: HomeServiceTile(
              service: services[index],
              onTap: () => context.go(AppRoutes.service(services[index].slug)),
            ),
          ),
        ),
      ),
    );
  }
}

/// The closing call to action: a free site survey, with Call and WhatsApp for those who
/// would rather talk now.
class _BookingBanner extends ConsumerWidget {
  const _BookingBanner({required this.business});

  final BusinessFacts business;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = context.l10n;
    final colors = context.colors;
    return Column(
      children: [
        DecoratedBox(
          decoration: BoxDecoration(color: colors.surfaceWarm, borderRadius: BorderRadius.circular(AppRadius.lg)),
          child: Padding(
            padding: const EdgeInsetsDirectional.all(AppSpacing.xl),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Icon(AppIcons.survey, color: colors.brandPrimary),
                const SizedBox(height: AppSpacing.md),
                Text(l10n.homeCtaTitle, style: context.textStyles.title),
                const SizedBox(height: AppSpacing.xs),
                Text(l10n.homeCtaBody, style: context.textStyles.bodySmall.copyWith(color: colors.textSecondary)),
                const SizedBox(height: AppSpacing.xl),
                PrimaryButton(
                  label: l10n.homeCtaButton,
                  onPressed: () => openRequestFlow(
                    context,
                    ref,
                    entry: RequestEntry.home,
                    consultationType: ConsultationType.siteSurvey,
                  ),
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: AppSpacing.md),
        ContactRow(business: business, screen: AppRoutes.home),
      ],
    );
  }
}
