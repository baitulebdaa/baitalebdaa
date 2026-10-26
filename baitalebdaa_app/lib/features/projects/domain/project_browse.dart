import '../../content/domain/content_models.dart';

/// What a project is, for its card label and the Projects filters. Derived from the
/// website's own data (sector, title, services), so a new project sorts itself.
enum ProjectKind { villa, apartment, office, residential }

ProjectKind projectKind(Project project) {
  final title = project.title.en.toLowerCase();
  if (project.sector.en.toLowerCase() == 'commercial') return ProjectKind.office;
  if (title.contains('villa')) return ProjectKind.villa;
  if (title.contains('penthouse') || title.contains('apartment')) return ProjectKind.apartment;
  return ProjectKind.residential;
}

/// Projects whose services include made-to-measure joinery.
bool isJoineryProject(Project project) =>
    project.relatedServiceIds.any((id) => id == 'joinery' || id == 'custom-wardrobes');

/// The chips above the Projects grid.
enum ProjectFilter { all, villas, apartments, offices, joinery, saved }

enum ProjectSort { recent, alphabetical }

/// The projects to show: filter, then search, then sort. "Most recent" is by year, newest
/// first; projects from the same year keep the website's order.
List<Project> browseProjects(
  List<Project> projects, {
  required ProjectFilter filter,
  required ProjectSort sort,
  required Set<String> saved,
  required String query,
  required String languageCode,
}) {
  bool matchesFilter(Project p) => switch (filter) {
    ProjectFilter.all => true,
    ProjectFilter.villas => projectKind(p) == ProjectKind.villa,
    ProjectFilter.apartments => projectKind(p) == ProjectKind.apartment,
    ProjectFilter.offices => projectKind(p) == ProjectKind.office,
    ProjectFilter.joinery => isJoineryProject(p),
    ProjectFilter.saved => saved.contains(p.slug),
  };
  final words = query.trim().toLowerCase().split(RegExp(r'\s+')).where((w) => w.isNotEmpty).toList();
  bool matchesQuery(Project p) {
    if (words.isEmpty) return true;
    final haystack = [
      p.title,
      p.place,
      p.subtitle,
      p.service,
      p.sector,
    ].map((text) => text.resolve(languageCode).toLowerCase()).join(' ');
    return words.every(haystack.contains);
  }

  int year(Project p) => int.tryParse(p.year) ?? 0;
  final indexed = projects.indexed.where((e) => matchesFilter(e.$2) && matchesQuery(e.$2)).toList()
    ..sort((a, b) {
      final byKey = switch (sort) {
        ProjectSort.recent => year(b.$2).compareTo(year(a.$2)),
        ProjectSort.alphabetical => a.$2.title.resolve(languageCode).compareTo(b.$2.title.resolve(languageCode)),
      };
      return byKey != 0 ? byKey : a.$1.compareTo(b.$1);
    });
  return [for (final (_, project) in indexed) project];
}
