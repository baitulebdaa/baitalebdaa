import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../app/router/routes.dart';
import '../../../core/platform/analytics.dart';
import '../../../core/platform/auth_gateway.dart';
import '../../../design_system/components/brand/brand_logo.dart';
import '../../../design_system/components/buttons/app_buttons.dart';
import '../../../design_system/components/typography/section_header.dart';
import '../../../design_system/theme/context_extensions.dart';
import '../../../design_system/tokens/app_icons.dart';
import '../../../design_system/tokens/app_layout_tokens.dart';
import '../../content/domain/content_models.dart';
import '../../content/presentation/content_builder.dart';
import '../../content/presentation/content_cards.dart';
import '../../request/domain/request_options.dart';
import '../../request/presentation/request_entry_widgets.dart';
import '../../request/presentation/request_flow_screen.dart';
import '../../support/presentation/contact_actions.dart';
import 'home_sections.dart';

/// Home: real photography and real facts first, and every section leads somewhere useful:
/// a service, a project, the price guide, or a request. Each section sizes to its content
/// and to the user's text size.
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
          EdgeInsetsDirectional padded([double top = AppSpacing.section]) =>
              EdgeInsetsDirectional.fromSTEB(gutter, top, gutter, 0);
          return ListView(
            padding: const EdgeInsetsDirectional.only(bottom: AppSpacing.section),
            children: [
              Padding(padding: padded(AppSpacing.md), child: const _Header()),
              Padding(
                padding: padded(AppSpacing.xl),
                child: HeroCarousel(slides: content.heroSlides),
              ),
              Padding(
                padding: padded(AppSpacing.md),
                child: Column(
                  children: [
                    const ResumeDraftCard(),
                    const SizedBox(height: AppSpacing.sm),
                    LatestRequestCard(content: content),
                  ],
                ),
              ),
              Padding(
                padding: padded(AppSpacing.xl),
                child: _SectionTitle(
                  eyebrow: l10n.homeServicesEyebrow,
                  linkLabel: l10n.homeSeeAllServices,
                  onLink: () => context.go(AppRoutes.services),
                ),
              ),
              _HorizontalCards(
                itemWidth: 156,
                imageAspect: 4 / 5,
                textHeight: ServiceCard.textHeight(context),
                children: [
                  for (final service in content.services)
                    ServiceCard(
                      service: service,
                      content: content,
                      onTap: () => context.go(AppRoutes.service(service.slug)),
                    ),
                ],
              ),
              Padding(
                padding: padded(),
                child: SectionHeader(eyebrow: l10n.homePlanningTitle),
              ),
              Padding(
                padding: padded(AppSpacing.md),
                child: const PlanningChoices(entry: RequestEntry.home),
              ),
              Padding(
                padding: padded(),
                child: _SectionTitle(
                  eyebrow: l10n.homeProjectsEyebrow,
                  linkLabel: l10n.homeSeeAllProjects,
                  onLink: () => context.go(AppRoutes.projects),
                ),
              ),
              _HorizontalCards(
                itemWidth: 248,
                imageAspect: 4 / 5,
                textHeight: ProjectCard.textHeight(context),
                children: [
                  for (final project in content.projects)
                    ProjectCard(project: project, onTap: () => context.go(AppRoutes.project(project.slug))),
                ],
              ),
              Padding(padding: padded(), child: const PricingEntry()),
              const SizedBox(height: AppSpacing.section),
              WhyBand(facts: content.business.studioFacts),
              Padding(
                padding: padded(),
                child: ProcessSteps(steps: content.process),
              ),
              if (content.reviews.firstOrNull case final review?)
                Padding(
                  padding: padded(),
                  child: ReviewQuote(review: review),
                ),
              Padding(
                padding: padded(),
                child: AskAliCard(copy: content.assistant),
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

class _Header extends ConsumerWidget {
  const _Header();

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = context.l10n;
    final user = ref.watch(authStateProvider).value;
    final firstName = user != null && user.hasAccount ? user.displayName?.trim().split(' ').first : null;
    final hour = DateTime.now().hour;
    final greeting = hour < 12
        ? l10n.homeGreetingMorning
        : hour < 17
        ? l10n.homeGreetingAfternoon
        : l10n.homeGreetingEvening;
    return Row(
      children: [
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const BrandLogo(width: 120),
              const SizedBox(height: AppSpacing.md),
              Text(
                firstName == null || firstName.isEmpty ? l10n.homeWelcome : l10n.homeGreetingName(greeting, firstName),
                style: context.textStyles.title,
              ),
            ],
          ),
        ),
        IconButton.outlined(
          icon: const Icon(AppIcons.account),
          tooltip: l10n.homeProfileTooltip,
          onPressed: () => context.go(AppRoutes.profile),
        ),
      ],
    );
  }
}

class _SectionTitle extends StatelessWidget {
  const _SectionTitle({required this.eyebrow, required this.linkLabel, required this.onLink});

  final String eyebrow;
  final String linkLabel;
  final VoidCallback onLink;

  @override
  Widget build(BuildContext context) => LayoutBuilder(
    // The link keeps to the end at its own width; at large text sizes it takes at most half
    // the row and wraps, instead of pushing the row off screen.
    builder: (context, constraints) => Row(
      crossAxisAlignment: CrossAxisAlignment.end,
      children: [
        Expanded(child: SectionHeader(eyebrow: eyebrow)),
        const SizedBox(width: AppSpacing.sm),
        ConstrainedBox(
          constraints: BoxConstraints(maxWidth: constraints.maxWidth / 2),
          child: TextButton(
            onPressed: onLink,
            child: Text(linkLabel, textAlign: TextAlign.end),
          ),
        ),
      ],
    ),
  );
}

/// A horizontal row of cards whose height follows the photo and the user's text size, so
/// labels never clip.
class _HorizontalCards extends StatelessWidget {
  const _HorizontalCards({
    required this.itemWidth,
    required this.imageAspect,
    required this.textHeight,
    required this.children,
  });

  final double itemWidth;
  final double imageAspect;

  /// The card's text block at the user's text size (see the cards' `textHeight`).
  final double textHeight;
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    final gutter = AppSpacing.gutter(AppWindowSize.of(context));
    return Padding(
      padding: const EdgeInsetsDirectional.only(top: AppSpacing.md),
      child: SizedBox(
        height: itemWidth / imageAspect + textHeight + AppSpacing.xs,
        child: ListView.separated(
          scrollDirection: Axis.horizontal,
          padding: EdgeInsetsDirectional.symmetric(horizontal: gutter),
          itemCount: children.length,
          separatorBuilder: (context, index) => const SizedBox(width: AppSpacing.md),
          itemBuilder: (context, index) => SizedBox(width: itemWidth, child: children[index]),
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
          decoration: BoxDecoration(color: colors.surfaceInverse, borderRadius: BorderRadius.circular(AppRadius.lg)),
          child: Padding(
            padding: const EdgeInsetsDirectional.all(AppSpacing.xl),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Icon(AppIcons.survey, color: colors.textOnInverse),
                const SizedBox(height: AppSpacing.md),
                Text(l10n.homeCtaTitle, style: context.textStyles.title.copyWith(color: colors.textOnInverse)),
                const SizedBox(height: AppSpacing.xs),
                Text(l10n.homeCtaBody, style: context.textStyles.bodySmall.copyWith(color: colors.textOnInverse)),
                const SizedBox(height: AppSpacing.xl),
                PrimaryButton(
                  label: l10n.homeCtaButton,
                  onDark: Theme.of(context).brightness == Brightness.light,
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
