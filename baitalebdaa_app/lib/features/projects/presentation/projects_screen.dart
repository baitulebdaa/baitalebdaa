import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../../app/router/routes.dart';
import '../../../design_system/components/navigation/app_header.dart';
import '../../../design_system/theme/context_extensions.dart';
import '../../../design_system/tokens/app_layout_tokens.dart';
import '../../content/presentation/content_builder.dart';
import '../../content/presentation/content_cards.dart';

/// The six owner-confirmed projects, photo first.
class ProjectsScreen extends StatelessWidget {
  const ProjectsScreen({super.key});

  @override
  Widget build(BuildContext context) => Scaffold(
    body: ContentBuilder(
      builder: (context, content) {
        final gutter = AppSpacing.gutter(AppWindowSize.of(context));
        return AppScrollView(
          eyebrow: context.l10n.homeProjectsEyebrow,
          title: context.l10n.projectsTitle,
          subtitle: context.l10n.projectsHeaderSubtitle,
          slivers: [
            SliverPadding(
              padding: EdgeInsetsDirectional.fromSTEB(gutter, 0, gutter, AppSpacing.section),
              sliver: SliverList.separated(
                itemCount: content.projects.length,
                separatorBuilder: (context, index) => const SizedBox(height: AppSpacing.xxl),
                itemBuilder: (context, index) {
                  final project = content.projects[index];
                  return ProjectCard(
                    project: project,
                    aspectRatio: 1,
                    onTap: () => context.go(AppRoutes.project(project.slug)),
                  );
                },
              ),
            ),
          ],
        );
      },
    ),
  );
}
