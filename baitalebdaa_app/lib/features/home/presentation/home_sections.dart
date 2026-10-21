import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../app/router/routes.dart';
import '../../../core/format/numbers.dart';
import '../../../core/platform/analytics.dart';
import '../../../design_system/components/buttons/app_buttons.dart';
import '../../../design_system/components/media/bundled_photo.dart';
import '../../../design_system/components/typography/eyebrow.dart';
import '../../../design_system/components/typography/section_header.dart';
import '../../../design_system/theme/context_extensions.dart';
import '../../../design_system/tokens/app_colors.dart';
import '../../../design_system/tokens/app_icons.dart';
import '../../../design_system/tokens/app_layout_tokens.dart';
import '../../content/domain/content_models.dart';
import '../../request/presentation/request_flow_screen.dart';

/// The website's hero slides as a swipeable banner, each ending in "Plan your project".
/// It never moves on its own: motion is the user's choice.
class HeroCarousel extends ConsumerStatefulWidget {
  const HeroCarousel({required this.slides, super.key});

  final List<HeroSlide> slides;

  @override
  ConsumerState<HeroCarousel> createState() => _HeroCarouselState();
}

class _HeroCarouselState extends ConsumerState<HeroCarousel> {
  final _pages = PageController();
  int _index = 0;

  static const double _aspect = 4 / 5;
  static const double _maxHeight = 560;

  @override
  void dispose() {
    _pages.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final slides = widget.slides;
    return LayoutBuilder(
      builder: (context, constraints) {
        final height = (constraints.maxWidth / _aspect).clamp(0, _maxHeight).toDouble();
        return Column(
          children: [
            SizedBox(
              height: height,
              child: PageView.builder(
                controller: _pages,
                itemCount: slides.length,
                onPageChanged: (index) => setState(() => _index = index),
                itemBuilder: (context, index) => _HeroSlideView(
                  slide: slides[index],
                  onPlan: () => openRequestFlow(context, ref, entry: RequestEntry.home),
                ),
              ),
            ),
            const SizedBox(height: AppSpacing.sm),
            Semantics(
              label: context.l10n.heroSlideLabel(_index + 1, slides.length),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  for (var i = 0; i < slides.length; i++)
                    AnimatedContainer(
                      duration: AppMotion.of(context).standard,
                      margin: const EdgeInsetsDirectional.symmetric(horizontal: AppSpacing.xxs),
                      width: i == _index ? AppSpacing.xl : AppSpacing.xs,
                      height: 3,
                      decoration: BoxDecoration(
                        color: i == _index ? context.colors.textPrimary : context.colors.borderControl,
                        borderRadius: BorderRadius.circular(2),
                      ),
                    ),
                ],
              ),
            ),
          ],
        );
      },
    );
  }
}

class _HeroSlideView extends StatelessWidget {
  const _HeroSlideView({required this.slide, required this.onPlan});

  final HeroSlide slide;
  final VoidCallback onPlan;

  @override
  Widget build(BuildContext context) {
    final onPhoto = AppColors.dark.textPrimary;
    const scrim = AppColors.splashBackground;
    return ClipRRect(
      borderRadius: BorderRadius.circular(AppRadius.lg),
      child: Stack(
        fit: StackFit.expand,
        children: [
          BundledPhoto(image: slide.image, aspectRatio: 4 / 5, semanticLabel: ''),
          // Keeps text on the photo at AA contrast on the lightest images.
          DecoratedBox(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [scrim.withValues(alpha: 0.05), scrim.withValues(alpha: 0.35), scrim.withValues(alpha: 0.85)],
                stops: const [0.25, 0.5, 1],
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsetsDirectional.all(AppSpacing.xl),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                Eyebrow(context.localized(slide.eyebrow), onDark: true),
                const SizedBox(height: AppSpacing.md),
                // Flexible: at large text sizes the title gives up lines before the
                // button is pushed off the photo.
                Flexible(
                  child: Semantics(
                    header: true,
                    child: Text(
                      context.localized(slide.title),
                      style: context.textStyles.headline.copyWith(color: onPhoto),
                      maxLines: 4,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ),
                const SizedBox(height: AppSpacing.xl),
                PrimaryButton(label: context.l10n.requestPlanCta, onDark: true, onPressed: onPlan),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

/// The price guide entry: published prices only, before VAT.
class PricingEntry extends StatelessWidget {
  const PricingEntry({super.key});

  @override
  Widget build(BuildContext context) {
    final l10n = context.l10n;
    return DecoratedBox(
      decoration: BoxDecoration(color: context.colors.surfaceWarm, borderRadius: BorderRadius.circular(AppRadius.lg)),
      child: Padding(
        padding: const EdgeInsetsDirectional.all(AppSpacing.xl),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Icon(AppIcons.pricing),
            const SizedBox(height: AppSpacing.md),
            Text(l10n.homePricingTitle, style: context.textStyles.title),
            const SizedBox(height: AppSpacing.xs),
            Text(
              l10n.homePricingBody,
              style: context.textStyles.bodySmall.copyWith(color: context.colors.textSecondary),
            ),
            const SizedBox(height: AppSpacing.md),
            SecondaryButton(
              label: l10n.homePricingCta,
              showArrow: true,
              onPressed: () => context.go(AppRoutes.priceGuide),
            ),
          ],
        ),
      ),
    );
  }
}

/// "Why Bait Al Ebdaa": the website's studio facts on an ink band.
class WhyBand extends StatelessWidget {
  const WhyBand({required this.facts, super.key});

  final List<StudioFact> facts;

  @override
  Widget build(BuildContext context) {
    final gutter = AppSpacing.gutter(AppWindowSize.of(context));
    const ink = AppColors.splashBackground;
    final paper = AppColors.dark.textPrimary;
    final muted = AppColors.dark.textSecondary;
    return ColoredBox(
      color: ink,
      child: Padding(
        padding: EdgeInsetsDirectional.symmetric(horizontal: gutter, vertical: AppSpacing.section),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Eyebrow(context.l10n.homeWhyEyebrow, onDark: true),
            const SizedBox(height: AppSpacing.xl),
            for (final fact in facts)
              MergeSemantics(
                child: DecoratedBox(
                  decoration: BoxDecoration(
                    border: BorderDirectional(top: BorderSide(color: paper.withValues(alpha: 0.2))),
                  ),
                  child: Padding(
                    padding: const EdgeInsetsDirectional.symmetric(vertical: AppSpacing.md),
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Expanded(
                          flex: 2,
                          child: Text(
                            context.localized(fact.value),
                            style: context.textStyles.figure.copyWith(color: AppColors.dark.brandAccent),
                          ),
                        ),
                        const SizedBox(width: AppSpacing.md),
                        Expanded(
                          flex: 3,
                          child: Text(
                            context.localized(fact.label),
                            style: context.textStyles.bodySmall.copyWith(color: muted),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}

/// The website's four-stage process.
class ProcessSteps extends StatelessWidget {
  const ProcessSteps({required this.steps, super.key});

  final List<ProcessStep> steps;

  @override
  Widget build(BuildContext context) {
    final languageCode = Localizations.localeOf(context).languageCode;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SectionHeader(eyebrow: context.l10n.homeProcessEyebrow),
        const SizedBox(height: AppSpacing.md),
        for (final (index, step) in steps.indexed)
          MergeSemantics(
            child: Padding(
              padding: const EdgeInsetsDirectional.only(bottom: AppSpacing.md),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(
                    width: AppSpacing.xxxl,
                    child: Text(
                      formatIndex(index + 1, languageCode),
                      style: context.textStyles.figure.copyWith(color: context.colors.brandAccentStrong),
                    ),
                  ),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(context.localized(step.title), style: context.textStyles.subtitle),
                        Text(
                          context.localized(step.body),
                          style: context.textStyles.bodySmall.copyWith(color: context.colors.textSecondary),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
      ],
    );
  }
}

/// One real client review, in the client's words; a translation is marked as one.
class ReviewQuote extends StatelessWidget {
  const ReviewQuote({required this.review, super.key});

  final Review review;

  @override
  Widget build(BuildContext context) {
    final translated = review.originalLang != Localizations.localeOf(context).languageCode;
    final secondary = context.colors.textSecondary;
    final company = review.company;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SectionHeader(eyebrow: context.l10n.homeReviewEyebrow),
        const SizedBox(height: AppSpacing.md),
        Text(context.l10n.reviewQuoted(context.localized(review.text)), style: context.textStyles.body),
        const SizedBox(height: AppSpacing.sm),
        Text([review.name, ?company].join(' · '), style: context.textStyles.label),
        if (translated)
          Text(context.l10n.reviewTranslated, style: context.textStyles.caption.copyWith(color: secondary)),
      ],
    );
  }
}

/// The AI assistant, introduced in the website widget's own words.
class AskAliCard extends StatelessWidget {
  const AskAliCard({required this.copy, super.key});

  final AssistantCopy copy;

  @override
  Widget build(BuildContext context) => DecoratedBox(
    decoration: BoxDecoration(
      border: Border.all(color: context.colors.borderControl),
      borderRadius: BorderRadius.circular(AppRadius.lg),
    ),
    child: Padding(
      padding: const EdgeInsetsDirectional.all(AppSpacing.xl),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(AppIcons.assistant, color: context.colors.brandAccentStrong),
              const SizedBox(width: AppSpacing.sm),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(context.localized(copy.name), style: context.textStyles.title),
                    Text(
                      context.localized(copy.subtitle),
                      style: context.textStyles.caption.copyWith(color: context.colors.textSecondary),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: AppSpacing.md),
          Text(context.localized(copy.intro), style: context.textStyles.bodySmall),
          const SizedBox(height: AppSpacing.md),
          SecondaryButton(
            label: context.l10n.homeAskAliCta,
            showArrow: true,
            onPressed: () => context.push(AppRoutes.assistant),
          ),
        ],
      ),
    ),
  );
}
