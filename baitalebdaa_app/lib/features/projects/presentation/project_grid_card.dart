import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../../app/router/routes.dart';
import '../../../design_system/components/media/bundled_photo.dart';
import '../../../design_system/theme/context_extensions.dart';
import '../../../design_system/tokens/app_colors.dart';
import '../../../design_system/tokens/app_icons.dart';
import '../../../design_system/tokens/app_layout_tokens.dart';
import '../../../design_system/tokens/app_typography.dart';
import '../../content/domain/content_models.dart';
import '../domain/project_browse.dart';

const double _cardRadius = 16;

/// The height of [lines] lines of [style] at the user's text size.
double _linesHeight(BuildContext context, TextStyle style, int lines) =>
    MediaQuery.textScalerOf(context).scale(style.fontSize!) * (style.height ?? 1.2) * lines;

/// Project cards in a sideways row (Home, service pages): the same cards as the Projects
/// tab, at a fixed width, in a row as tall as a card at the user's text size.
class ProjectCardRow extends StatelessWidget {
  const ProjectCardRow({
    required this.projects,
    required this.saved,
    required this.onToggleSaved,
    super.key,
    this.inset = true,
  });

  final List<Project> projects;
  final Set<String> saved;
  final ValueChanged<String> onToggleSaved;

  /// Whether the row starts at the page gutter (false inside an already padded column).
  final bool inset;

  static const double _cardWidth = 240;

  @override
  Widget build(BuildContext context) {
    final gutter = inset ? AppSpacing.gutter(AppWindowSize.of(context)) : 0.0;
    final styles = context.textStyles;
    final textHeight =
        AppSpacing.sm +
        _linesHeight(context, styles.label, 2) +
        AppSpacing.xxs +
        _linesHeight(context, styles.caption, 2) +
        AppSpacing.md;
    return Padding(
      padding: const EdgeInsetsDirectional.only(top: AppSpacing.md),
      child: SizedBox(
        height: _cardWidth * 3 / 4 + textHeight + AppSpacing.sm,
        child: ListView.separated(
          scrollDirection: Axis.horizontal,
          clipBehavior: inset ? Clip.hardEdge : Clip.none,
          padding: EdgeInsetsDirectional.fromSTEB(gutter, 0, gutter, AppSpacing.sm),
          itemCount: projects.length,
          separatorBuilder: (context, index) => const SizedBox(width: AppSpacing.md),
          itemBuilder: (context, index) => SizedBox(
            width: _cardWidth,
            child: ProjectGridCard(
              project: projects[index],
              saved: saved.contains(projects[index].slug),
              onOpen: () => context.go(AppRoutes.project(projects[index].slug)),
              onToggleSaved: () => onToggleSaved(projects[index].slug),
            ),
          ),
        ),
      ),
    );
  }
}

String kindLabel(BuildContext context, ProjectKind kind) => switch (kind) {
  ProjectKind.villa => context.l10n.projectKindVilla,
  ProjectKind.apartment => context.l10n.projectKindApartment,
  ProjectKind.office => context.l10n.projectKindCommercial,
  ProjectKind.residential => context.l10n.projectKindResidential,
};

/// A project in the Projects grid: photo with its kind and a save heart, then its name,
/// what was done, and an arrow. The whole card opens the project; the heart only saves.
class ProjectGridCard extends StatelessWidget {
  const ProjectGridCard({
    required this.project,
    required this.saved,
    required this.onOpen,
    required this.onToggleSaved,
    super.key,
  });

  final Project project;
  final bool saved;
  final VoidCallback onOpen;
  final VoidCallback onToggleSaved;

  @override
  Widget build(BuildContext context) {
    final colors = context.colors;
    final styles = context.textStyles;
    return Stack(
      children: [
        Positioned.fill(
          child: DecoratedBox(
            decoration: BoxDecoration(
              color: colors.surfaceSecondary,
              borderRadius: BorderRadius.circular(_cardRadius),
              boxShadow: [
                BoxShadow(
                  color: AppColors.splashBackground.withValues(alpha: 0.08),
                  blurRadius: 16,
                  offset: const Offset(0, 4),
                ),
              ],
            ),
          ),
        ),
        MergeSemantics(
          child: Material(
            type: MaterialType.transparency,
            borderRadius: BorderRadius.circular(_cardRadius),
            clipBehavior: Clip.antiAlias,
            child: InkWell(
              onTap: onOpen,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Stack(
                    children: [
                      Hero(
                        tag: 'project-cover-${project.slug}',
                        child: BundledPhoto(image: project.cover, aspectRatio: 4 / 3, semanticLabel: ''),
                      ),
                      PositionedDirectional(
                        top: AppSpacing.sm,
                        start: AppSpacing.sm,
                        child: KindPill(label: kindLabel(context, projectKind(project))),
                      ),
                    ],
                  ),
                  Expanded(
                    child: Padding(
                      padding: const EdgeInsetsDirectional.fromSTEB(
                        AppSpacing.md,
                        AppSpacing.sm,
                        AppSpacing.sm,
                        AppSpacing.md,
                      ),
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  context.localized(project.title),
                                  style: styles.label,
                                  maxLines: 2,
                                  overflow: TextOverflow.ellipsis,
                                ),
                                const SizedBox(height: AppSpacing.xxs),
                                Text(
                                  context.localized(project.subtitle),
                                  style: styles.caption.copyWith(color: colors.textSecondary),
                                  maxLines: 2,
                                  overflow: TextOverflow.ellipsis,
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(width: AppSpacing.xs),
                          const ExcludeSemantics(child: _ArrowCircle()),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
        PositionedDirectional(
          top: AppSpacing.xxs,
          end: AppSpacing.xxs,
          child: SaveHeart(saved: saved, onPressed: onToggleSaved),
        ),
      ],
    );
  }
}

/// The large featured project: deep green panel at the start, the photo fading in at the
/// end. It keeps its colours in dark mode, like the Home hero over its photo.
class FeaturedProjectBanner extends StatelessWidget {
  const FeaturedProjectBanner({
    required this.project,
    required this.saved,
    required this.onOpen,
    required this.onToggleSaved,
    super.key,
  });

  final Project project;
  final bool saved;
  final VoidCallback onOpen;
  final VoidCallback onToggleSaved;

  static const Color _green = Color(0xFF173F33);
  static const Color _onGreen = Color(0xFFFFFFFF);

  @override
  Widget build(BuildContext context) {
    final styles = context.textStyles;
    final latin = styles.script == AppScript.latin;
    final eyebrow = context.l10n.projectsFeatured;
    return ClipRRect(
      borderRadius: BorderRadius.circular(_cardRadius),
      child: ColoredBox(
        color: _green,
        child: Stack(
          children: [
            // The photo fills the end 60% and fades into the green panel.
            PositionedDirectional(
              top: 0,
              bottom: 0,
              end: 0,
              width: MediaQuery.sizeOf(context).width * 0.6,
              child: Stack(
                fit: StackFit.expand,
                children: [
                  Hero(
                    tag: 'project-cover-${project.slug}',
                    child: BundledPhoto(image: project.cover, aspectRatio: 1, semanticLabel: ''),
                  ),
                  DecoratedBox(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: AlignmentDirectional.centerStart,
                        end: AlignmentDirectional.centerEnd,
                        colors: [_green, _green.withValues(alpha: 0.55), _green.withValues(alpha: 0)],
                        stops: const [0, 0.35, 0.8],
                      ),
                    ),
                  ),
                ],
              ),
            ),
            MergeSemantics(
              child: Material(
                type: MaterialType.transparency,
                child: InkWell(
                  onTap: onOpen,
                  child: Padding(
                    padding: const EdgeInsetsDirectional.fromSTEB(
                      AppSpacing.xl,
                      AppSpacing.xl,
                      AppSpacing.xxxl,
                      AppSpacing.xl,
                    ),
                    child: FractionallySizedBox(
                      widthFactor: 0.72,
                      alignment: AlignmentDirectional.centerStart,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Row(
                            children: [
                              Flexible(
                                child: Text(
                                  latin ? eyebrow.toUpperCase() : eyebrow,
                                  style: styles.eyebrow.copyWith(color: _onGreen.withValues(alpha: 0.85)),
                                ),
                              ),
                              const SizedBox(width: AppSpacing.sm),
                              SizedBox(width: 28, height: 1, child: ColoredBox(color: _onGreen.withValues(alpha: 0.7))),
                            ],
                          ),
                          const SizedBox(height: AppSpacing.sm),
                          Text(context.localized(project.title), style: styles.headline.copyWith(color: _onGreen)),
                          const SizedBox(height: AppSpacing.xs),
                          Text(
                            context.localized(project.subtitle),
                            style: styles.bodySmall.copyWith(color: _onGreen.withValues(alpha: 0.88)),
                          ),
                          const SizedBox(height: AppSpacing.lg),
                          DecoratedBox(
                            decoration: ShapeDecoration(
                              color: Color.lerp(_green, _onGreen, 0.14),
                              shape: const StadiumBorder(),
                            ),
                            child: Padding(
                              padding: const EdgeInsetsDirectional.symmetric(
                                horizontal: AppSpacing.lg,
                                vertical: AppSpacing.sm,
                              ),
                              child: Row(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  Text(context.l10n.projectsViewProject, style: styles.label.copyWith(color: _onGreen)),
                                  const SizedBox(width: AppSpacing.xs),
                                  const Icon(AppIcons.proceed, color: _onGreen, size: AppIcons.sizeSmall),
                                ],
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ),
            PositionedDirectional(
              top: AppSpacing.xxs,
              end: AppSpacing.xxs,
              child: SaveHeart(saved: saved, onPressed: onToggleSaved),
            ),
          ],
        ),
      ),
    );
  }
}

/// The project's kind on its photo, in small capitals on dark glass.
class KindPill extends StatelessWidget {
  const KindPill({required this.label, super.key});

  final String label;

  @override
  Widget build(BuildContext context) {
    final styles = context.textStyles;
    final latin = styles.script == AppScript.latin;
    return DecoratedBox(
      decoration: ShapeDecoration(
        color: AppColors.splashBackground.withValues(alpha: 0.55),
        shape: const StadiumBorder(),
      ),
      child: Padding(
        padding: const EdgeInsetsDirectional.symmetric(horizontal: AppSpacing.sm, vertical: AppSpacing.xxs),
        child: Text(
          latin ? label.toUpperCase() : label,
          style: styles.eyebrow.copyWith(color: AppColors.dark.textPrimary),
        ),
      ),
    );
  }
}

/// Saves or unsaves a project. White on the photo, with a soft shadow so it reads on any image.
class SaveHeart extends StatelessWidget {
  const SaveHeart({required this.saved, required this.onPressed, super.key});

  final bool saved;
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) => IconButton(
    onPressed: onPressed,
    tooltip: saved ? context.l10n.projectsUnsave : context.l10n.projectsSave,
    isSelected: saved,
    icon: Icon(
      saved ? AppIcons.saved : AppIcons.save,
      color: AppColors.dark.textPrimary,
      shadows: [Shadow(color: AppColors.splashBackground.withValues(alpha: 0.5), blurRadius: 8)],
    ),
  );
}

/// The round arrow at the end of a card: a visual cue, the card itself is the target.
class _ArrowCircle extends StatelessWidget {
  const _ArrowCircle();

  static const double _size = 36;

  @override
  Widget build(BuildContext context) => DecoratedBox(
    decoration: ShapeDecoration(
      shape: CircleBorder(side: BorderSide(color: context.colors.borderSubtle)),
    ),
    child: SizedBox.square(
      dimension: _size,
      child: Icon(AppIcons.proceed, size: AppIcons.sizeSmall, color: context.colors.textPrimary),
    ),
  );
}
