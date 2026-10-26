import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../app/router/routes.dart';
import '../../../core/platform/analytics.dart';
import '../../../design_system/components/buttons/app_buttons.dart';
import '../../../design_system/components/media/bundled_photo.dart';
import '../../../design_system/components/typography/section_header.dart';
import '../../../design_system/theme/context_extensions.dart';
import '../../../design_system/tokens/app_colors.dart';
import '../../../design_system/tokens/app_icons.dart';
import '../../../design_system/tokens/app_layout_tokens.dart';
import '../../../design_system/tokens/app_typography.dart';
import '../../content/domain/content_models.dart';
import '../../request/presentation/request_flow_screen.dart';

// Home sections (owner's design, 26 Oct 2026): a photo banner, serif section titles, deep
// green panels. Text on photos and green panels keeps fixed light colours in dark mode.
const Color _deepGreen = Color(0xFF173F33);
const Color _onDark = Color(0xFFFFFFFF);
const double _panelRadius = 18;

/// A pill-shaped button for the photo and green panels: green on photos, white on green.
class _PillButton extends StatelessWidget {
  const _PillButton({required this.label, required this.onPressed, required this.background, required this.foreground});

  final String label;
  final VoidCallback onPressed;
  final Color background;
  final Color foreground;

  @override
  Widget build(BuildContext context) => FilledButton(
    onPressed: onPressed,
    style: FilledButton.styleFrom(
      backgroundColor: background,
      foregroundColor: foreground,
      shape: const StadiumBorder(),
      minimumSize: const Size(0, kMinTouchTarget),
      padding: const EdgeInsetsDirectional.symmetric(horizontal: AppSpacing.xl),
    ),
    child: Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Flexible(child: Text(label, textAlign: TextAlign.center)),
        const SizedBox(width: AppSpacing.sm),
        const Icon(AppIcons.proceed, size: AppIcons.sizeSmall),
      ],
    ),
  );
}

/// The website's hero slides as a swipeable photo banner, each ending in "Get Started"
/// (a consultation request). It never moves on its own: motion is the user's choice.
class HeroCarousel extends ConsumerStatefulWidget {
  const HeroCarousel({required this.slides, super.key});

  final List<HeroSlide> slides;

  @override
  ConsumerState<HeroCarousel> createState() => _HeroCarouselState();
}

class _HeroCarouselState extends ConsumerState<HeroCarousel> {
  final _pages = PageController();
  int _index = 0;

  static const double _minHeight = 420;
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
        // Tall enough for the eyebrow, title, text and button at the user's text size.
        final height = (constraints.maxWidth * 1.15).clamp(_minHeight, _maxHeight).toDouble();
        return ClipRRect(
          borderRadius: BorderRadius.circular(_panelRadius),
          child: SizedBox(
            height: height,
            child: Stack(
              children: [
                PageView.builder(
                  controller: _pages,
                  itemCount: slides.length,
                  onPageChanged: (index) => setState(() => _index = index),
                  itemBuilder: (context, index) => _HeroSlideView(
                    slide: slides[index],
                    onStart: () => openRequestFlow(context, ref, entry: RequestEntry.home),
                  ),
                ),
                PositionedDirectional(
                  end: AppSpacing.xl,
                  bottom: AppSpacing.lg,
                  child: Semantics(
                    label: context.l10n.heroSlideLabel(_index + 1, slides.length),
                    child: Row(
                      children: [
                        for (var i = 0; i < slides.length; i++)
                          AnimatedContainer(
                            duration: AppMotion.of(context).standard,
                            margin: const EdgeInsetsDirectional.only(start: AppSpacing.xxs),
                            width: AppSpacing.xl,
                            height: 3,
                            decoration: BoxDecoration(
                              color: _onDark.withValues(alpha: i == _index ? 0.95 : 0.35),
                              borderRadius: BorderRadius.circular(2),
                            ),
                          ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}

class _HeroSlideView extends StatelessWidget {
  const _HeroSlideView({required this.slide, required this.onStart});

  final HeroSlide slide;
  final VoidCallback onStart;

  @override
  Widget build(BuildContext context) {
    const scrim = AppColors.splashBackground;
    final styles = context.textStyles;
    final eyebrow = context.localized(slide.eyebrow);
    return Stack(
      fit: StackFit.expand,
      children: [
        BundledPhoto(image: slide.image, aspectRatio: 4 / 5, semanticLabel: ''),
        // Dark at the start, where the text sits, clearing towards the end of the photo;
        // keeps the copy at AA contrast on the lightest images.
        DecoratedBox(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: AlignmentDirectional.centerStart,
              end: AlignmentDirectional.centerEnd,
              colors: [scrim.withValues(alpha: 0.82), scrim.withValues(alpha: 0.55), scrim.withValues(alpha: 0.15)],
              stops: const [0, 0.55, 1],
            ),
          ),
        ),
        Padding(
          padding: const EdgeInsetsDirectional.fromSTEB(AppSpacing.xl, AppSpacing.xxl, AppSpacing.xl, AppSpacing.xxxl),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                styles.script == AppScript.latin ? eyebrow.toUpperCase() : eyebrow,
                style: styles.eyebrow.copyWith(color: _onDark.withValues(alpha: 0.85), letterSpacing: 2.4),
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
              const SizedBox(height: AppSpacing.md),
              // Flexible: at large text sizes the title gives up lines before the button
              // is pushed off the photo.
              Flexible(
                child: Semantics(
                  header: true,
                  child: Text(
                    context.localized(slide.title),
                    style: styles.display.copyWith(color: _onDark),
                    maxLines: 4,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
              ),
              const SizedBox(height: AppSpacing.md),
              Flexible(
                child: Text(
                  context.localized(slide.body),
                  style: styles.bodySmall.copyWith(color: _onDark.withValues(alpha: 0.9)),
                  maxLines: 3,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
              const Spacer(),
              _PillButton(
                label: context.l10n.homeHeroCta,
                onPressed: onStart,
                background: context.colors.brandPrimary,
                foreground: context.colors.onBrandPrimary,
              ),
            ],
          ),
        ),
      ],
    );
  }
}

/// A service in the Home row: a square photo with its name under it.
class HomeServiceTile extends StatelessWidget {
  const HomeServiceTile({required this.service, required this.onTap, super.key});

  final Service service;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) => MergeSemantics(
    child: InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(AppRadius.md),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          BundledPhoto(
            image: service.image,
            aspectRatio: 1,
            borderRadius: BorderRadius.circular(AppRadius.md),
            semanticLabel: '',
          ),
          const SizedBox(height: AppSpacing.xs),
          Text(
            context.localized(service.name),
            style: context.textStyles.caption.copyWith(color: context.colors.textPrimary, fontWeight: FontWeight.w600),
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
          ),
        ],
      ),
    ),
  );
}

/// The price guide entry: a deep green panel with a photo fading in at the end. Published
/// starting prices only, before VAT; the quotation follows a free site survey.
class EstimateBanner extends StatelessWidget {
  const EstimateBanner({required this.image, super.key});

  final BundledImage image;

  @override
  Widget build(BuildContext context) {
    final l10n = context.l10n;
    final styles = context.textStyles;
    return ClipRRect(
      borderRadius: BorderRadius.circular(_panelRadius),
      child: ColoredBox(
        color: _deepGreen,
        child: Stack(
          children: [
            PositionedDirectional(
              top: 0,
              bottom: 0,
              end: 0,
              width: MediaQuery.sizeOf(context).width * 0.5,
              child: Stack(
                fit: StackFit.expand,
                children: [
                  BundledPhoto(image: image, aspectRatio: 1, semanticLabel: ''),
                  DecoratedBox(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: AlignmentDirectional.centerStart,
                        end: AlignmentDirectional.centerEnd,
                        colors: [_deepGreen, _deepGreen.withValues(alpha: 0.6), _deepGreen.withValues(alpha: 0.15)],
                      ),
                    ),
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsetsDirectional.all(AppSpacing.xl),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  FractionallySizedBox(
                    widthFactor: 0.8,
                    alignment: AlignmentDirectional.centerStart,
                    child: Semantics(
                      header: true,
                      child: Text(l10n.homeEstimateTitle, style: styles.headline.copyWith(color: _onDark)),
                    ),
                  ),
                  const SizedBox(height: AppSpacing.xs),
                  FractionallySizedBox(
                    widthFactor: 0.8,
                    alignment: AlignmentDirectional.centerStart,
                    child: Text(
                      l10n.homeEstimateBody,
                      style: styles.caption.copyWith(color: _onDark.withValues(alpha: 0.88)),
                    ),
                  ),
                  const SizedBox(height: AppSpacing.lg),
                  _PillButton(
                    label: l10n.homeEstimateCta,
                    onPressed: () => context.go(AppRoutes.priceGuide),
                    background: _onDark,
                    foreground: AppColors.light.textPrimary,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

/// "Why Bait Al Ebdaa": the website's four studio facts, each under an icon in a soft circle.
class WhyGrid extends StatelessWidget {
  const WhyGrid({required this.facts, super.key});

  final List<StudioFact> facts;

  // In the website's order: factory, design-to-production control, all seven emirates,
  // workmanship guarantee.
  static const _icons = [AppIcons.factory, AppIcons.quality, AppIcons.location, AppIcons.guarantee];

  @override
  Widget build(BuildContext context) {
    final colors = context.colors;
    final styles = context.textStyles;
    final columns = AppWindowSize.of(context) == AppWindowSize.compact ? 2 : 4;
    final rows = (facts.length / columns).ceil();
    return Column(
      children: [
        for (var row = 0; row < rows; row++) ...[
          if (row > 0) const SizedBox(height: AppSpacing.xl),
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              for (var column = 0; column < columns; column++) ...[
                if (column > 0) const SizedBox(width: AppSpacing.md),
                Expanded(
                  child: switch (row * columns + column) {
                    final i when i < facts.length => MergeSemantics(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          DecoratedBox(
                            decoration: BoxDecoration(color: colors.surfaceWarm, shape: BoxShape.circle),
                            child: SizedBox.square(
                              dimension: 48,
                              child: Icon(_icons[i % _icons.length], color: colors.brandPrimary, size: 22),
                            ),
                          ),
                          const SizedBox(height: AppSpacing.sm),
                          Text(context.localized(facts[i].value), style: styles.label),
                          const SizedBox(height: AppSpacing.xxs),
                          Text(
                            context.localized(facts[i].label),
                            style: styles.caption.copyWith(color: colors.textSecondary),
                          ),
                        ],
                      ),
                    ),
                    _ => const SizedBox.shrink(),
                  },
                ),
              ],
            ],
          ),
        ],
      ],
    );
  }
}

/// A client's own words: the first review on the website.
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
              Icon(AppIcons.assistant, color: context.colors.brandPrimary),
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
