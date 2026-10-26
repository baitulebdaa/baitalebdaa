/// Route paths. Screens navigate with these constants and helpers, never string literals.
///
/// Five tabs (owner decision, 18 Oct 2026): Home · Services · Projects · Book · Profile.
abstract final class AppRoutes {
  /// Launch screen; moves on to Home once the auth state is known.
  static const splash = '/';
  static const signIn = '/sign-in';

  /// Full-screen flows above the tabs.
  static const request = '/request';
  static const assistant = '/assistant';
  static const search = '/search';

  // Tab roots.
  static const home = '/home';
  static const services = '/services';
  static const projects = '/projects';
  static const book = '/book';
  static const profile = '/profile';

  static const priceGuide = '/services/pricing';
  static const settings = '/profile/settings';
  static const myRequests = '/profile/requests';
  static const saved = '/profile/saved';

  static String service(String slug) => '$services/${Uri.encodeComponent(slug)}';
  static String project(String slug) => '$projects/${Uri.encodeComponent(slug)}';
  static String gallery(String slug, int index) => '${project(slug)}/gallery/$index';
  static String requestDetail(String id) => '$profile/requests/${Uri.encodeComponent(id)}';

  /// Child segments of the tab roots.
  static const priceGuideSegment = 'pricing';
  static const serviceSegment = ':slug';
  static const projectSegment = ':slug';
  static const gallerySegment = 'gallery/:index';
  static const settingsSegment = 'settings';
  static const requestsSegment = 'requests';
  static const requestDetailSegment = ':id';
  static const savedSegment = 'saved';
}
