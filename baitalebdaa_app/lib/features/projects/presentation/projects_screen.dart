import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../app/router/routes.dart';
import '../../../design_system/components/brand/brand_logo.dart';
import '../../../design_system/components/feedback/state_views.dart';
import '../../../design_system/theme/context_extensions.dart';
import '../../../design_system/tokens/app_icons.dart';
import '../../../design_system/tokens/app_layout_tokens.dart';
import '../../content/domain/content_models.dart';
import '../../content/presentation/content_builder.dart';
import '../../saved/data/saved_items.dart';
import '../domain/project_browse.dart';
import 'project_grid_card.dart';

/// The owner-confirmed projects as a filterable photo grid (owner's design, 26 Oct 2026):
/// search, sort, filter chips, saved projects, and one featured project between the rows.
class ProjectsScreen extends ConsumerStatefulWidget {
  const ProjectsScreen({super.key});

  /// The project shown large between the rows of the unfiltered list.
  static const featuredSlug = 'palm-jumeirah-penthouse';

  /// Cards before the featured banner.
  static const cardsBeforeFeatured = 4;

  @override
  ConsumerState<ProjectsScreen> createState() => _ProjectsScreenState();
}

class _ProjectsScreenState extends ConsumerState<ProjectsScreen> {
  final _search = TextEditingController();
  var _filter = ProjectFilter.all;
  var _sort = ProjectSort.recent;
  var _searching = false;

  @override
  void dispose() {
    _search.dispose();
    super.dispose();
  }

  void _showAll() => setState(() {
    _filter = ProjectFilter.all;
    _search.clear();
    _searching = false;
  });

  @override
  Widget build(BuildContext context) => Scaffold(
    body: SafeArea(
      bottom: false,
      child: ContentBuilder(
        builder: (context, content) {
          final saved = ref.watch(savedProjectsProvider);
          final languageCode = Localizations.localeOf(context).languageCode;
          final results = browseProjects(
            content.projects,
            filter: _filter,
            sort: _sort,
            saved: saved,
            query: _search.text,
            languageCode: languageCode,
          );
          // The featured banner belongs to the plain, unfiltered list.
          final featured = _filter == ProjectFilter.all && _search.text.trim().isEmpty
              ? results.where((p) => p.slug == ProjectsScreen.featuredSlug).firstOrNull
              : null;
          final cards = [
            for (final p in results)
              if (p != featured) p,
          ];
          final gutter = AppSpacing.gutter(AppWindowSize.of(context));
          final columns = AppWindowSize.of(context) == AppWindowSize.compact ? 2 : 3;
          final split = featured == null ? cards.length : cards.length.clamp(0, ProjectsScreen.cardsBeforeFeatured);

          return CustomScrollView(
            slivers: [
              SliverPadding(
                padding: EdgeInsetsDirectional.fromSTEB(gutter, AppSpacing.sm, gutter, 0),
                sliver: SliverList.list(
                  children: [
                    _Header(
                      onSearch: () => setState(() => _searching = !_searching),
                      onFilter: () => _openFilterSheet(content.projects, saved, languageCode),
                      searching: _searching,
                    ),
                    if (_searching) ...[
                      const SizedBox(height: AppSpacing.sm),
                      _SearchField(
                        controller: _search,
                        onChanged: (_) => setState(() {}),
                        onClose: () => setState(() {
                          _search.clear();
                          _searching = false;
                        }),
                      ),
                    ],
                    const SizedBox(height: AppSpacing.lg),
                    _TitleRow(sort: _sort, onSort: (sort) => setState(() => _sort = sort)),
                    const SizedBox(height: AppSpacing.md),
                  ],
                ),
              ),
              SliverToBoxAdapter(
                child: _FilterChips(
                  selected: _filter,
                  padding: gutter,
                  showSaved: saved.isNotEmpty || _filter == ProjectFilter.saved,
                  onSelected: (filter) => setState(() => _filter = filter),
                ),
              ),
              SliverPadding(
                padding: EdgeInsetsDirectional.fromSTEB(gutter, AppSpacing.lg, gutter, AppSpacing.section),
                sliver: results.isEmpty
                    ? SliverToBoxAdapter(
                        child: EmptyState(
                          title: context.l10n.projectsEmptyTitle,
                          body: _filter == ProjectFilter.saved ? context.l10n.projectsEmptySaved : null,
                          actionLabel: context.l10n.projectsShowAll,
                          onAction: _showAll,
                        ),
                      )
                    : SliverList.list(
                        children: [
                          _CardRows(projects: cards.sublist(0, split), columns: columns, saved: saved),
                          if (featured != null) ...[
                            const SizedBox(height: AppSpacing.md),
                            FeaturedProjectBanner(
                              project: featured,
                              saved: saved.contains(featured.slug),
                              onOpen: () => context.go(AppRoutes.project(featured.slug)),
                              onToggleSaved: () => ref.read(savedProjectsProvider.notifier).toggle(featured.slug),
                            ),
                            const SizedBox(height: AppSpacing.md),
                            _CardRows(projects: cards.sublist(split), columns: columns, saved: saved),
                          ],
                        ],
                      ),
              ),
            ],
          );
        },
      ),
    ),
  );

  Future<void> _openFilterSheet(List<Project> projects, Set<String> saved, String languageCode) async {
    int count(ProjectFilter filter) => browseProjects(
      projects,
      filter: filter,
      sort: _sort,
      saved: saved,
      query: '',
      languageCode: languageCode,
    ).length;
    final choice = await showModalBottomSheet<ProjectFilter>(
      context: context,
      showDragHandle: true,
      builder: (context) => SafeArea(
        child: ListView(
          shrinkWrap: true,
          padding: const EdgeInsetsDirectional.fromSTEB(AppSpacing.lg, 0, AppSpacing.lg, AppSpacing.lg),
          children: [
            Text(context.l10n.projectsFilterTooltip, style: context.textStyles.title),
            const SizedBox(height: AppSpacing.sm),
            for (final filter in ProjectFilter.values)
              ListTile(
                title: Text(filterLabel(context, filter)),
                subtitle: Text(context.l10n.projectsCount(count(filter))),
                trailing: filter == _filter ? Icon(AppIcons.selected, color: context.colors.brandPrimary) : null,
                selected: filter == _filter,
                onTap: () => Navigator.of(context).pop(filter),
              ),
          ],
        ),
      ),
    );
    if (choice != null && mounted) setState(() => _filter = choice);
  }
}

String filterLabel(BuildContext context, ProjectFilter filter) {
  final l10n = context.l10n;
  return switch (filter) {
    ProjectFilter.all => l10n.projectsFilterAll,
    ProjectFilter.villas => l10n.projectsFilterVillas,
    ProjectFilter.apartments => l10n.projectsFilterApartments,
    ProjectFilter.offices => l10n.projectsFilterOffices,
    ProjectFilter.joinery => l10n.projectsFilterJoinery,
    ProjectFilter.saved => l10n.projectsFilterSaved,
  };
}

/// Logo at the start; search and filter at the end.
class _Header extends StatelessWidget {
  const _Header({required this.onSearch, required this.onFilter, required this.searching});

  final VoidCallback onSearch;
  final VoidCallback onFilter;
  final bool searching;

  static const double _logoWidth = 150;

  @override
  Widget build(BuildContext context) => Row(
    children: [
      const BrandLogo(width: _logoWidth),
      const Spacer(),
      IconButton(
        icon: const Icon(AppIcons.search),
        tooltip: context.l10n.projectsSearchTooltip,
        isSelected: searching,
        onPressed: onSearch,
      ),
      IconButton(icon: const Icon(AppIcons.filter), tooltip: context.l10n.projectsFilterTooltip, onPressed: onFilter),
    ],
  );
}

class _SearchField extends StatelessWidget {
  const _SearchField({required this.controller, required this.onChanged, required this.onClose});

  final TextEditingController controller;
  final ValueChanged<String> onChanged;
  final VoidCallback onClose;

  @override
  Widget build(BuildContext context) => TextField(
    controller: controller,
    autofocus: true,
    onChanged: onChanged,
    textInputAction: TextInputAction.search,
    decoration: InputDecoration(
      hintText: context.l10n.projectsSearchHint,
      prefixIcon: const Icon(AppIcons.search),
      suffixIcon: IconButton(
        icon: const Icon(AppIcons.close),
        tooltip: context.l10n.projectsCloseSearch,
        onPressed: onClose,
      ),
    ),
  );
}

/// The large serif title, with the sort menu at the end.
class _TitleRow extends StatelessWidget {
  const _TitleRow({required this.sort, required this.onSort});

  final ProjectSort sort;
  final ValueChanged<ProjectSort> onSort;

  @override
  Widget build(BuildContext context) {
    final l10n = context.l10n;
    String label(ProjectSort s) => s == ProjectSort.recent ? l10n.projectsSortRecent : l10n.projectsSortAlphabetical;
    return Row(
      children: [
        Expanded(
          child: Semantics(header: true, child: Text(l10n.projectsTitle, style: context.textStyles.display)),
        ),
        Flexible(
          child: PopupMenuButton<ProjectSort>(
            tooltip: l10n.projectsSortTooltip,
            initialValue: sort,
            onSelected: onSort,
            itemBuilder: (context) => [
              for (final s in ProjectSort.values)
                CheckedPopupMenuItem(value: s, checked: s == sort, child: Text(label(s))),
            ],
            child: ConstrainedBox(
              constraints: const BoxConstraints(minHeight: kMinTouchTarget),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Flexible(
                    child: Text(
                      label(sort),
                      style: context.textStyles.bodySmall,
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
      ],
    );
  }
}

/// Pills that scroll sideways: the selected one in the brand green.
class _FilterChips extends StatelessWidget {
  const _FilterChips({
    required this.selected,
    required this.padding,
    required this.showSaved,
    required this.onSelected,
  });

  final ProjectFilter selected;
  final double padding;
  final bool showSaved;
  final ValueChanged<ProjectFilter> onSelected;

  @override
  Widget build(BuildContext context) {
    final colors = context.colors;
    final filters = [
      for (final f in ProjectFilter.values)
        if (f != ProjectFilter.saved || showSaved) f,
    ];
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      padding: EdgeInsetsDirectional.symmetric(horizontal: padding),
      child: Row(
        children: [
          for (final (index, filter) in filters.indexed) ...[
            if (index > 0) const SizedBox(width: AppSpacing.sm),
            Semantics(
              button: true,
              selected: filter == selected,
              child: Material(
                color: filter == selected ? colors.brandPrimary : colors.surfaceWarm,
                shape: const StadiumBorder(),
                clipBehavior: Clip.antiAlias,
                child: InkWell(
                  onTap: () => onSelected(filter),
                  child: ConstrainedBox(
                    constraints: const BoxConstraints(minHeight: kMinTouchTarget, minWidth: 72),
                    child: Padding(
                      padding: const EdgeInsetsDirectional.symmetric(horizontal: AppSpacing.lg),
                      child: Center(
                        widthFactor: 1,
                        child: Text(
                          filterLabel(context, filter),
                          style: context.textStyles.bodySmall.copyWith(
                            color: filter == selected ? colors.onBrandPrimary : colors.textPrimary,
                            fontWeight: filter == selected ? FontWeight.w600 : FontWeight.w400,
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }
}

/// Cards in rows that size to their own content, so names never clip at large text sizes.
class _CardRows extends ConsumerWidget {
  const _CardRows({required this.projects, required this.columns, required this.saved});

  final List<Project> projects;
  final int columns;
  final Set<String> saved;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final rows = (projects.length / columns).ceil();
    return Column(
      children: [
        for (var row = 0; row < rows; row++) ...[
          if (row > 0) const SizedBox(height: AppSpacing.md),
          IntrinsicHeight(
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                for (var column = 0; column < columns; column++) ...[
                  if (column > 0) const SizedBox(width: AppSpacing.md),
                  Expanded(
                    child: switch (row * columns + column) {
                      final i when i < projects.length => ProjectGridCard(
                        project: projects[i],
                        saved: saved.contains(projects[i].slug),
                        onOpen: () => context.go(AppRoutes.project(projects[i].slug)),
                        onToggleSaved: () => ref.read(savedProjectsProvider.notifier).toggle(projects[i].slug),
                      ),
                      _ => const SizedBox.shrink(),
                    },
                  ),
                ],
              ],
            ),
          ),
        ],
      ],
    );
  }
}
