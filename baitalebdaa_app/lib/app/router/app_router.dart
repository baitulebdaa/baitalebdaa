import 'dart:async';

import 'package:flutter/widgets.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/platform/analytics.dart';
import '../../core/platform/auth_gateway.dart';
import '../../features/assistant/presentation/assistant_screen.dart';
import '../../features/auth/presentation/sign_in_screen.dart';
import '../../features/auth/presentation/splash_screen.dart';
import '../../features/book/presentation/book_screen.dart';
import '../../features/home/presentation/home_screen.dart';
import '../../features/home/presentation/search_screen.dart';
import '../../features/profile/presentation/profile_screen.dart';
import '../../features/projects/presentation/gallery_screen.dart';
import '../../features/projects/presentation/project_detail_screen.dart';
import '../../features/projects/presentation/projects_screen.dart';
import '../../features/request/presentation/my_requests.dart';
import '../../features/request/presentation/request_flow_screen.dart';
import '../../features/saved/presentation/saved_section.dart';
import '../../features/services/presentation/price_guide_screen.dart';
import '../../features/services/presentation/service_detail_screen.dart';
import '../../features/services/presentation/services_screen.dart';
import '../../features/settings/presentation/settings_screen.dart';
import 'app_shell.dart';
import 'launch_gate.dart';
import 'not_found_screen.dart';
import 'routes.dart';

/// Five tab branches (Home · Services · Projects · Book · Profile), each with its own back
/// stack. Full-screen flows (the request, sign-in, Ask Ali, the photo gallery) sit on the
/// root navigator so they cover the tab bar.
final routerProvider = Provider<GoRouter>((ref) {
  final analytics = ref.watch(analyticsSinkProvider);
  final rootKey = GlobalKey<NavigatorState>();

  // The router is built once; auth changes re-run its redirect instead of rebuilding it,
  // which would throw away the user's place in every tab.
  final refresh = ValueNotifier<int>(0);
  ref
    ..listen(authStateProvider, (_, _) => refresh.value++)
    ..listen(splashHoldProvider, (_, _) => refresh.value++);

  final router = GoRouter(
    navigatorKey: rootKey,
    initialLocation: AppRoutes.splash,
    restorationScopeId: 'router',
    refreshListenable: refresh,
    redirect: (context, state) => launchRedirect(
      uri: state.uri,
      auth: ref.read(authStateProvider),
      holding: ref.read(splashHoldProvider).isLoading,
    ),
    errorBuilder: (context, state) => const NotFoundScreen(),
    routes: [
      GoRoute(path: AppRoutes.splash, builder: (context, state) => const SplashScreen()),
      GoRoute(path: AppRoutes.request, builder: (context, state) => const RequestFlowScreen()),
      GoRoute(path: AppRoutes.assistant, builder: (context, state) => const AssistantScreen()),
      GoRoute(path: AppRoutes.search, builder: (context, state) => const SearchScreen()),
      GoRoute(
        path: AppRoutes.signIn,
        builder: (context, state) => SignInScreen(returnTo: safeReturnPath(state.uri.queryParameters['from'])),
      ),
      StatefulShellRoute.indexedStack(
        restorationScopeId: 'tabs',
        builder: (context, state, shell) => AppShell(shell: shell),
        branches: [
          StatefulShellBranch(
            routes: [GoRoute(path: AppRoutes.home, builder: (context, state) => const HomeScreen())],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: AppRoutes.services,
                builder: (context, state) => const ServicesScreen(),
                routes: [
                  // Declared before ':slug' so "pricing" is never read as a service.
                  GoRoute(path: AppRoutes.priceGuideSegment, builder: (context, state) => const PriceGuideScreen()),
                  GoRoute(
                    path: AppRoutes.serviceSegment,
                    builder: (context, state) => ServiceDetailScreen(slug: state.pathParameters['slug']!),
                  ),
                ],
              ),
            ],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: AppRoutes.projects,
                builder: (context, state) => const ProjectsScreen(),
                routes: [
                  GoRoute(
                    path: AppRoutes.projectSegment,
                    builder: (context, state) => ProjectDetailScreen(slug: state.pathParameters['slug']!),
                    routes: [
                      GoRoute(
                        path: AppRoutes.gallerySegment,
                        parentNavigatorKey: rootKey,
                        builder: (context, state) => GalleryScreen(
                          slug: state.pathParameters['slug']!,
                          initialIndex: int.tryParse(state.pathParameters['index'] ?? '') ?? 0,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ],
          ),
          StatefulShellBranch(
            routes: [GoRoute(path: AppRoutes.book, builder: (context, state) => const BookScreen())],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: AppRoutes.profile,
                builder: (context, state) => const ProfileScreen(),
                routes: [
                  GoRoute(path: AppRoutes.settingsSegment, builder: (context, state) => const SettingsScreen()),
                  GoRoute(
                    path: AppRoutes.requestsSegment,
                    builder: (context, state) => const MyRequestsScreen(),
                    routes: [
                      GoRoute(
                        path: AppRoutes.requestDetailSegment,
                        builder: (context, state) => RequestDetailScreen(requestId: state.pathParameters['id']!),
                      ),
                    ],
                  ),
                  GoRoute(path: AppRoutes.savedSegment, builder: (context, state) => const SavedScreen()),
                ],
              ),
            ],
          ),
        ],
      ),
    ],
  );

  // Screen views are logged by route pattern (`/projects/:slug`), never the filled-in
  // path, so ids or other values in a URL can never reach analytics.
  String? lastPattern;
  void logScreenView() {
    final pattern = router.routerDelegate.currentConfiguration.fullPath;
    if (pattern.isEmpty || pattern == lastPattern) return;
    lastPattern = pattern;
    unawaited(analytics.logScreenView(pattern));
  }

  router.routerDelegate.addListener(logScreenView);
  ref.onDispose(() {
    router.routerDelegate.removeListener(logScreenView);
    router.dispose();
    refresh.dispose();
  });
  return router;
});
