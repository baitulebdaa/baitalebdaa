import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../app/router/routes.dart';
import '../../../design_system/components/media/bundled_photo.dart';
import '../../../design_system/components/typography/section_header.dart';
import '../../../design_system/theme/context_extensions.dart';
import '../../../design_system/tokens/app_icons.dart';
import '../../../design_system/tokens/app_layout_tokens.dart';
import '../../content/domain/content_models.dart';
import '../data/saved_items.dart';

/// The services bookmarked and projects hearted on this device, on Profile. Hidden until
/// something is saved; items no longer on the website are skipped.
class SavedSection extends ConsumerWidget {
  const SavedSection({required this.content, super.key});

  final ContentSnapshot content;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final savedServices = ref.watch(savedServicesProvider);
    final savedProjects = ref.watch(savedProjectsProvider);
    final services = [
      for (final s in content.services)
        if (savedServices.contains(s.slug)) s,
    ];
    final projects = [
      for (final p in content.projects)
        if (savedProjects.contains(p.slug)) p,
    ];
    if (services.isEmpty && projects.isEmpty) return const SizedBox.shrink();
    return Padding(
      padding: const EdgeInsetsDirectional.only(bottom: AppSpacing.xxl),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SectionHeader(eyebrow: context.l10n.profileSavedTitle),
          const SizedBox(height: AppSpacing.xs),
          for (final s in services)
            _SavedTile(
              image: s.image,
              title: context.localized(s.name),
              onTap: () => context.go(AppRoutes.service(s.slug)),
            ),
          for (final p in projects)
            _SavedTile(
              image: p.cover,
              title: context.localized(p.title),
              onTap: () => context.go(AppRoutes.project(p.slug)),
            ),
        ],
      ),
    );
  }
}

class _SavedTile extends StatelessWidget {
  const _SavedTile({required this.image, required this.title, required this.onTap});

  final BundledImage image;
  final String title;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) => ListTile(
    onTap: onTap,
    leading: SizedBox.square(
      dimension: 48,
      child: BundledPhoto(
        image: image,
        aspectRatio: 1,
        borderRadius: BorderRadius.circular(AppRadius.md),
        semanticLabel: '',
      ),
    ),
    title: Text(title, maxLines: 2, overflow: TextOverflow.ellipsis),
    trailing: const Icon(AppIcons.forward, size: AppIcons.sizeSmall),
  );
}
