import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../design_system/theme/app_theme.dart';
import '../design_system/tokens/app_typography.dart';
import '../features/settings/presentation/settings_controller.dart';
import 'l10n/app_localizations.dart';
import 'router/app_router.dart';

class BaitAlEbdaaApp extends ConsumerWidget {
  const BaitAlEbdaaApp({super.key});

  static const fallbackLocale = Locale('en');

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final settings = ref.watch(settingsControllerProvider);
    return MaterialApp.router(
      routerConfig: ref.watch(routerProvider),
      onGenerateTitle: (context) => AppLocalizations.of(context).appTitle,
      restorationScopeId: 'app',
      debugShowCheckedModeBanner: false,
      locale: settings.language.locale,
      supportedLocales: AppLocalizations.supportedLocales,
      localizationsDelegates: AppLocalizations.localizationsDelegates,
      localeListResolutionCallback: resolveLocale,
      themeMode: settings.themeMode,
      theme: AppTheme.build(brightness: Brightness.light, script: AppScript.latin),
      darkTheme: AppTheme.build(brightness: Brightness.dark, script: AppScript.latin),
      // The theme depends on the resolved language (Tajawal for Arabic), which is only
      // known below Localizations, so the script-specific theme is applied here.
      builder: (context, child) {
        final script = AppScript.of(Localizations.localeOf(context));
        if (script == AppScript.latin) return child!;
        return Theme(
          data: AppTheme.build(brightness: Theme.of(context).brightness, script: script),
          child: child!,
        );
      },
    );
  }

  /// First device language the app supports, matched by language code (ar-AE → ar);
  /// English otherwise. Flutter's default would fall back to the first supported locale,
  /// which is Arabic only because of alphabetical order.
  static Locale resolveLocale(List<Locale>? preferred, Iterable<Locale> supported) {
    for (final locale in preferred ?? const <Locale>[]) {
      for (final candidate in supported) {
        if (candidate.languageCode == locale.languageCode) return candidate;
      }
    }
    return fallbackLocale;
  }
}
