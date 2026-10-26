import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/platform/push_gateway.dart';
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
                SectionHeader(eyebrow: l10n.profileNotifications),
                const _Notifications(),
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

/// Whether request updates can arrive as notifications, and the way to allow them. Until
/// push is set up, it says how updates arrive instead.
class _Notifications extends ConsumerStatefulWidget {
  const _Notifications();

  @override
  ConsumerState<_Notifications> createState() => _NotificationsState();
}

class _NotificationsState extends ConsumerState<_Notifications> {
  late Future<PushPermission> _permission = ref.read(pushGatewayProvider).permission();

  @override
  Widget build(BuildContext context) {
    final l10n = context.l10n;
    return FutureBuilder<PushPermission>(
      future: _permission,
      builder: (context, snapshot) {
        final permission = snapshot.data;
        if (permission == null) return const SizedBox(height: kMinInteractiveDimension);
        final text = switch (permission) {
          PushPermission.granted => l10n.notificationsOn,
          PushPermission.unsupported => l10n.notificationsUnavailable,
          PushPermission.notDetermined || PushPermission.denied => l10n.notificationsOff,
        };
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(text, style: context.textStyles.bodySmall.copyWith(color: context.colors.textSecondary)),
            if (permission == PushPermission.notDetermined || permission == PushPermission.denied)
              TextButton(
                onPressed: () => setState(() => _permission = ref.read(pushGatewayProvider).requestPermission()),
                child: Text(l10n.notificationsAllow),
              ),
          ],
        );
      },
    );
  }
}
