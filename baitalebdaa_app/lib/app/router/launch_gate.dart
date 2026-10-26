import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../core/platform/auth_gateway.dart';
import '../../features/auth/presentation/splash_screen.dart';
import 'routes.dart';

/// Where launch and sign-in lead (owner decision, 18 Oct 2026: splash, then Home; no sign-in
/// at launch, so everyone can browse and start a request).
///
/// - On the splash: wait for the auth state and, while [holding], the splash's short
///   minimum (owner's photo splash, 26 Oct 2026), then go to Home.
/// - Everywhere else: no redirect. Deep links open directly, account or not.
///
/// Sign-in is pushed above the screen that opened it, so it closes itself once signed in
/// (a router redirect would replace the whole stack and lose that screen).
String? launchRedirect({required Uri uri, required AsyncValue<AppUser?> auth, bool holding = false}) =>
    switch (uri.path) {
      AppRoutes.splash => holding || (auth.isLoading && !auth.hasValue) ? null : AppRoutes.home,
      _ => null,
    };

/// Completes once the splash has shown for [splashMinimum].
final splashHoldProvider = FutureProvider<void>((ref) => Future<void>.delayed(splashMinimum));

/// Accepts only in-app paths, so a crafted link cannot send the user elsewhere after
/// signing in, or loop back to the splash or sign-in screens.
String? safeReturnPath(String? from) {
  if (from == null || !from.startsWith('/') || from.startsWith('//')) return null;
  final path = Uri.tryParse(from)?.path;
  if (path == null || path == AppRoutes.splash || path == AppRoutes.signIn) return null;
  return from;
}
