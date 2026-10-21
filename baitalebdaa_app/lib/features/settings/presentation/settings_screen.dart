import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../design_system/components/navigation/app_header.dart';
import '../../../design_system/components/typography/section_header.dart';
import '../../../design_system/theme/context_extensions.dart';
import '../../../design_system/tokens/app_layout_tokens.dart';
import '../domain/app_settings.dart';
import 'settings_controller.dart';

class SettingsScreen extends ConsumerWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = context.l10n;
    final settings = ref.watch(settingsControllerProvider);
    final controller = ref.read(settingsControllerProvider.notifier);
    final gutter = AppSpacing.gutter(AppWindowSize.of(context));

    return Scaffold(
      body: AppScrollView(
        title: l10n.settingsTitle,
        slivers: [
          SliverPadding(
            padding: EdgeInsetsDirectional.fromSTEB(gutter, 0, gutter, AppSpacing.section),
            sliver: SliverList.list(
              children: [
                SectionHeader(eyebrow: l10n.settingsLanguage),
                RadioGroup<AppLanguage>(
                  groupValue: settings.language,
                  onChanged: (language) {
                    if (language != null) controller.setLanguage(language);
                  },
                  child: Column(
                    children: [
                      RadioListTile(value: AppLanguage.system, title: Text(l10n.settingsLanguageSystem)),
                      // Each language is named in itself, so it can be found from either UI. No
                      // textDirection override: it would also flip the label's alignment, and the
                      // bidi algorithm already renders a one-word name correctly.
                      RadioListTile(value: AppLanguage.en, title: Text(l10n.languageEnglish)),
                      RadioListTile(value: AppLanguage.ar, title: Text(l10n.languageArabic)),
                    ],
                  ),
                ),
                const SizedBox(height: AppSpacing.xxl),
                SectionHeader(eyebrow: l10n.settingsAppearance),
                RadioGroup<ThemeMode>(
                  groupValue: settings.themeMode,
                  onChanged: (mode) {
                    if (mode != null) controller.setThemeMode(mode);
                  },
                  child: Column(
                    children: [
                      RadioListTile(value: ThemeMode.system, title: Text(l10n.appearanceSystem)),
                      RadioListTile(value: ThemeMode.light, title: Text(l10n.appearanceLight)),
                      RadioListTile(value: ThemeMode.dark, title: Text(l10n.appearanceDark)),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
