import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../../app/router/routes.dart';
import '../../../design_system/components/feedback/state_views.dart';
import '../../../design_system/components/media/bundled_photo.dart';
import '../../../design_system/components/navigation/app_header.dart';
import '../../../design_system/components/typography/section_header.dart';
import '../../../design_system/theme/context_extensions.dart';
import '../../../design_system/tokens/app_icons.dart';
import '../../../design_system/tokens/app_layout_tokens.dart';
import '../../content/domain/content_models.dart';
import '../../content/presentation/content_builder.dart';

/// Search across the services and projects, from the Home header. Every word typed must
/// appear in the name, place or description, in the app's language.
class SearchScreen extends StatefulWidget {
  const SearchScreen({super.key});

  @override
  State<SearchScreen> createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen> {
  final _query = TextEditingController();

  @override
  void dispose() {
    _query.dispose();
    super.dispose();
  }

  bool _matches(List<String> words, List<String> fields) {
    final haystack = fields.join(' ').toLowerCase();
    return words.every(haystack.contains);
  }

  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppTopBar(title: context.l10n.homeSearchTooltip),
    body: ContentBuilder(
      builder: (context, content) {
        final gutter = AppSpacing.gutter(AppWindowSize.of(context));
        final words = _query.text.trim().toLowerCase().split(RegExp(r'\s+')).where((w) => w.isNotEmpty).toList();
        final services = words.isEmpty
            ? const <Service>[]
            : [
                for (final s in content.services)
                  if (_matches(words, [context.localized(s.name), context.localized(s.detail.summary)])) s,
              ];
        final projects = words.isEmpty
            ? const <Project>[]
            : [
                for (final p in content.projects)
                  if (_matches(words, [
                    context.localized(p.title),
                    context.localized(p.place),
                    context.localized(p.subtitle),
                    context.localized(p.service),
                  ]))
                    p,
              ];
        return ListView(
          padding: EdgeInsetsDirectional.fromSTEB(gutter, AppSpacing.md, gutter, AppSpacing.section),
          children: [
            TextField(
              controller: _query,
              autofocus: true,
              onChanged: (_) => setState(() {}),
              textInputAction: TextInputAction.search,
              decoration: InputDecoration(hintText: context.l10n.searchHint, prefixIcon: const Icon(AppIcons.search)),
            ),
            if (words.isNotEmpty && services.isEmpty && projects.isEmpty) EmptyState(title: context.l10n.searchEmpty),
            if (services.isNotEmpty) ...[
              const SizedBox(height: AppSpacing.xl),
              SectionHeader(eyebrow: context.l10n.searchServices),
              for (final s in services)
                _Result(
                  image: s.image,
                  title: context.localized(s.name),
                  subtitle: context.localized(s.detail.summary),
                  onTap: () => context.go(AppRoutes.service(s.slug)),
                ),
            ],
            if (projects.isNotEmpty) ...[
              const SizedBox(height: AppSpacing.xl),
              SectionHeader(eyebrow: context.l10n.searchProjects),
              for (final p in projects)
                _Result(
                  image: p.cover,
                  title: context.localized(p.title),
                  subtitle: context.localized(p.place),
                  onTap: () => context.go(AppRoutes.project(p.slug)),
                ),
            ],
          ],
        );
      },
    ),
  );
}

class _Result extends StatelessWidget {
  const _Result({required this.image, required this.title, required this.subtitle, required this.onTap});

  final BundledImage image;
  final String title;
  final String subtitle;
  final VoidCallback onTap;

  static const double _thumb = 56;

  @override
  Widget build(BuildContext context) => ListTile(
    onTap: onTap,
    leading: SizedBox.square(
      dimension: _thumb,
      child: BundledPhoto(
        image: image,
        aspectRatio: 1,
        borderRadius: BorderRadius.circular(AppRadius.md),
        semanticLabel: '',
      ),
    ),
    title: Text(title, maxLines: 2, overflow: TextOverflow.ellipsis),
    subtitle: Text(subtitle, maxLines: 1, overflow: TextOverflow.ellipsis),
    trailing: const Icon(AppIcons.forward, size: AppIcons.sizeSmall),
  );
}
