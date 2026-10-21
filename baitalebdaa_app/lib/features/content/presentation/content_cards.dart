import 'package:flutter/material.dart';

import '../../../design_system/components/media/bundled_photo.dart';
import '../../../design_system/theme/context_extensions.dart';
import '../../../design_system/tokens/app_layout_tokens.dart';
import '../domain/content_models.dart';

/// A service with its website photo, name and published starting price (or "quoted after
/// a free site survey" when none is published).
class ServiceCard extends StatelessWidget {
  const ServiceCard({required this.service, required this.content, required this.onTap, super.key});

  final Service service;
  final ContentSnapshot content;
  final VoidCallback onTap;

  /// Height of the text under the photo at the user's text size, for rows of fixed height.
  static double textHeight(BuildContext context) =>
      AppSpacing.sm +
      _linesHeight(context, context.textStyles.subtitle, 2) +
      AppSpacing.xxs +
      _linesHeight(context, context.textStyles.caption, 2);

  @override
  Widget build(BuildContext context) {
    final price = content.startingPrice(service);
    return MergeSemantics(
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(AppRadius.lg),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            BundledPhoto(
              image: service.image,
              aspectRatio: 4 / 5,
              borderRadius: BorderRadius.circular(AppRadius.lg),
              semanticLabel: '',
            ),
            const SizedBox(height: AppSpacing.sm),
            Text(
              context.localized(service.name),
              style: context.textStyles.subtitle,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
            ),
            const SizedBox(height: AppSpacing.xxs),
            Text(
              price == null ? context.l10n.servicesQuotedAfterSurvey : context.localized(price.display),
              style: context.textStyles.caption.copyWith(color: context.colors.textSecondary),
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
            ),
          ],
        ),
      ),
    );
  }
}

/// A real project with its cover photo, sector and year, title and place.
class ProjectCard extends StatelessWidget {
  const ProjectCard({required this.project, required this.onTap, super.key, this.aspectRatio = 4 / 5});

  final Project project;
  final VoidCallback onTap;
  final double aspectRatio;

  /// Height of the text under the photo at the user's text size, for rows of fixed height.
  static double textHeight(BuildContext context) =>
      AppSpacing.sm +
      _linesHeight(context, context.textStyles.caption, 2) +
      _linesHeight(context, context.textStyles.subtitle, 2);

  @override
  Widget build(BuildContext context) {
    final secondary = context.colors.textSecondary;
    return MergeSemantics(
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(AppRadius.lg),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Hero(
              tag: 'project-cover-${project.slug}',
              child: BundledPhoto(
                image: project.cover,
                aspectRatio: aspectRatio,
                borderRadius: BorderRadius.circular(AppRadius.lg),
                semanticLabel: '',
              ),
            ),
            const SizedBox(height: AppSpacing.sm),
            Text(
              context.l10n.projectMeta(context.localized(project.sector), project.year),
              style: context.textStyles.caption.copyWith(color: secondary),
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
            Text(
              context.localized(project.title),
              style: context.textStyles.subtitle,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
            ),
            Text(
              context.localized(project.place),
              style: context.textStyles.caption.copyWith(color: secondary),
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
          ],
        ),
      ),
    );
  }
}

/// [lines] lines of [style] at the user's text size, rounded up so a row never clips.
double _linesHeight(BuildContext context, TextStyle style, int lines) {
  final fontSize = style.fontSize ?? 14;
  return (MediaQuery.textScalerOf(context).scale(fontSize) * (style.height ?? 1.2) * lines).ceilToDouble();
}
