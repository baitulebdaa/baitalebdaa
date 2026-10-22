import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../app/router/routes.dart';
import '../../../core/platform/analytics.dart';
import '../../../design_system/components/buttons/app_buttons.dart';
import '../../../design_system/components/feedback/state_views.dart';
import '../../../design_system/components/media/bundled_photo.dart';
import '../../../design_system/components/media/network_photo.dart';
import '../../../design_system/components/navigation/app_header.dart';
import '../../../design_system/components/typography/section_header.dart';
import '../../../design_system/theme/context_extensions.dart';
import '../../../design_system/tokens/app_layout_tokens.dart';
import '../../content/domain/content_models.dart';
import '../../content/presentation/content_builder.dart';
import '../../request/presentation/request_flow_screen.dart';

/// One real project: cover, key facts, story, photos, scope and the services behind it,
/// ending with "Plan a similar project".
class ProjectDetailScreen extends ConsumerStatefulWidget {
  const ProjectDetailScreen({required this.slug, super.key});

  final String slug;

  @override
  ConsumerState<ProjectDetailScreen> createState() => _ProjectDetailScreenState();
}

class _ProjectDetailScreenState extends ConsumerState<ProjectDetailScreen> {
  @override
  void initState() {
    super.initState();
    unawaited(
      ref.read(analyticsSinkProvider).log(ProjectViewed(projectId: widget.slug, source: ContentSource.projects)),
    );
  }

  @override
  Widget build(BuildContext context) => ContentBuilder(
    builder: (context, content) {
      final project = content.project(widget.slug);
      if (project == null) {
        return Scaffold(
          appBar: const AppTopBar(),
          body: EmptyState(title: context.l10n.notFoundTitle, body: context.l10n.notFoundBody),
        );
      }
      final gutter = AppSpacing.gutter(AppWindowSize.of(context));
      return Scaffold(
        body: _ProjectBody(project: project, content: content),
        bottomNavigationBar: DecoratedBox(
          decoration: BoxDecoration(
            color: context.colors.surfacePrimary,
            border: BorderDirectional(top: BorderSide(color: context.colors.borderSubtle)),
          ),
          child: SafeArea(
            top: false,
            child: Padding(
              padding: EdgeInsetsDirectional.fromSTEB(gutter, AppSpacing.sm, gutter, AppSpacing.sm),
              child: PrimaryButton(
                label: context.l10n.projectPlanSimilar,
                onPressed: () => openRequestFlow(
                  context,
                  ref,
                  entry: RequestEntry.project,
                  serviceIds: project.relatedServiceIds.take(3).toList(),
                ),
              ),
            ),
          ),
        ),
      );
    },
  );
}

class _ProjectBody extends StatelessWidget {
  const _ProjectBody({required this.project, required this.content});

  final Project project;
  final ContentSnapshot content;

  @override
  Widget build(BuildContext context) {
    final l10n = context.l10n;
    final gutter = AppSpacing.gutter(AppWindowSize.of(context));
    final secondary = context.colors.textSecondary;
    final title = context.localized(project.title);
    final story = context.localized(project.description).split('\n\n');
    final facts = [
      (l10n.projectLocation, context.localized(project.location)),
      (l10n.projectSize, context.localized(project.size)),
      (l10n.projectYear, project.year),
      (l10n.projectService, context.localized(project.service)),
    ];
    final services = [for (final slug in project.relatedServiceIds) ?content.service(slug)];

    return CustomScrollView(
      slivers: [
        AppPhotoSliverHeader(
          aspectRatio: 1,
          title: title,
          photo: Hero(
            tag: 'project-cover-${project.slug}',
            child: BundledPhoto(image: project.cover, aspectRatio: 1, semanticLabel: ''),
          ),
        ),
        SliverPadding(
          padding: EdgeInsetsDirectional.fromSTEB(gutter, AppSpacing.xl, gutter, AppSpacing.section),
          sliver: SliverList.list(
            children: [
              Text(
                l10n.projectMeta(context.localized(project.sector), project.year),
                style: context.textStyles.caption.copyWith(color: secondary),
              ),
              const SizedBox(height: AppSpacing.xxs),
              Semantics(header: true, child: Text(title, style: context.textStyles.headline)),
              const SizedBox(height: AppSpacing.xl),
              for (final (label, value) in facts)
                MergeSemantics(
                  child: DecoratedBox(
                    decoration: BoxDecoration(
                      border: BorderDirectional(top: BorderSide(color: context.colors.borderSubtle)),
                    ),
                    child: Padding(
                      padding: const EdgeInsetsDirectional.symmetric(vertical: AppSpacing.sm),
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Expanded(
                            flex: 2,
                            child: Text(label, style: context.textStyles.caption.copyWith(color: secondary)),
                          ),
                          Expanded(flex: 5, child: Text(value, style: context.textStyles.bodySmall)),
                        ],
                      ),
                    ),
                  ),
                ),
              const SizedBox(height: AppSpacing.xxl),
              SectionHeader(eyebrow: l10n.projectStory),
              const SizedBox(height: AppSpacing.md),
              for (final paragraph in story) ...[
                Text(paragraph, style: context.textStyles.body),
                const SizedBox(height: AppSpacing.md),
              ],
              const SizedBox(height: AppSpacing.md),
              _PhotoStrip(project: project, title: title),
              const SizedBox(height: AppSpacing.xxl),
              SectionHeader(eyebrow: l10n.projectScope),
              const SizedBox(height: AppSpacing.md),
              for (final (index, item) in context.localizedList(project.scope).indexed)
                Padding(
                  padding: const EdgeInsetsDirectional.only(bottom: AppSpacing.sm),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      SizedBox(
                        width: AppSpacing.xxl,
                        child: Text(
                          (index + 1).toString().padLeft(2, '0'),
                          style: context.textStyles.caption.copyWith(color: secondary),
                        ),
                      ),
                      Expanded(child: Text(item, style: context.textStyles.bodySmall)),
                    ],
                  ),
                ),
              if (services.isNotEmpty) ...[
                const SizedBox(height: AppSpacing.xxl),
                SectionHeader(eyebrow: l10n.reviewServices),
                const SizedBox(height: AppSpacing.md),
                Wrap(
                  spacing: AppSpacing.xs,
                  runSpacing: AppSpacing.xs,
                  children: [
                    for (final service in services)
                      ActionChip(
                        label: Text(context.localized(service.name)),
                        shape: const StadiumBorder(),
                        side: BorderSide(color: context.colors.borderControl),
                        backgroundColor: context.colors.surfacePrimary,
                        onPressed: () => context.go(AppRoutes.service(service.slug)),
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

class _PhotoStrip extends StatelessWidget {
  const _PhotoStrip({required this.project, required this.title});

  final Project project;
  final String title;

  static const double _height = 120;

  @override
  Widget build(BuildContext context) {
    final images = project.images;
    return SizedBox(
      height: _height,
      child: ListView.separated(
        scrollDirection: Axis.horizontal,
        itemCount: images.length,
        separatorBuilder: (context, index) => const SizedBox(width: AppSpacing.xs),
        itemBuilder: (context, index) => ClipRRect(
          borderRadius: BorderRadius.circular(AppRadius.md),
          child: SizedBox(
            width: _height * 1.25,
            child: Material(
              child: InkWell(
                onTap: () => context.push(AppRoutes.gallery(project.slug, index)),
                child: NetworkPhoto(url: images[index].url, semanticLabel: photoLabel(context, project, index)),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

/// The website's alt text, or "<title>, photo n of m" as the website does without it.
String photoLabel(BuildContext context, Project project, int index) {
  final alt = project.images[index].alt;
  return alt != null
      ? context.localized(alt)
      : context.l10n.projectPhotoLabel(context.localized(project.title), index + 1, project.images.length);
}
