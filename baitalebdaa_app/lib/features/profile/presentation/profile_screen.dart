import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../../app/router/routes.dart';
import '../../../core/platform/auth_gateway.dart';
import '../../../design_system/components/buttons/app_buttons.dart';
import '../../../design_system/components/feedback/failure_message.dart';
import '../../../design_system/components/navigation/app_header.dart';
import '../../../design_system/components/typography/section_header.dart';
import '../../../design_system/theme/context_extensions.dart';
import '../../../design_system/tokens/app_icons.dart';
import '../../../design_system/tokens/app_layout_tokens.dart';
import '../../auth/presentation/sign_in_controller.dart';
import '../../content/domain/content_models.dart';
import '../../content/presentation/content_builder.dart';
import '../../request/presentation/my_requests.dart';
import '../../support/presentation/contact_actions.dart';

/// Kept minimal: who you are (or the way to sign in), your requests, support, settings,
/// the website's policies, and account actions.
class ProfileScreen extends ConsumerWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = context.l10n;
    final user = ref.watch(authStateProvider).value;
    final signedIn = user != null && user.hasAccount;
    return Scaffold(
      body: ContentBuilder(
        builder: (context, content) {
          final gutter = AppSpacing.gutter(AppWindowSize.of(context));
          final languageCode = Localizations.localeOf(context).languageCode;
          return AppScrollView(
            title: l10n.tabProfile,
            slivers: [
              SliverPadding(
                padding: EdgeInsetsDirectional.fromSTEB(gutter, 0, gutter, AppSpacing.section),
                sliver: SliverList.list(
                  children: [
                    if (signedIn) _Identity(user: user) else const _SignInPrompt(),
                    const SizedBox(height: AppSpacing.xxl),
                    const MyRequestsSection(),
                    const SizedBox(height: AppSpacing.xxl),
                    SectionHeader(eyebrow: l10n.profileSupport),
                    const SizedBox(height: AppSpacing.md),
                    ContactRow(business: content.business, screen: AppRoutes.profile),
                    ListTile(
                      leading: const Icon(AppIcons.email),
                      title: Text(content.business.email),
                      onTap: () => launchUrl(Uri(scheme: 'mailto', path: content.business.email)),
                    ),
                    const SizedBox(height: AppSpacing.xl),
                    const Divider(),
                    ListTile(
                      leading: const Icon(AppIcons.settings),
                      title: Text(l10n.settingsTitle),
                      trailing: const Icon(AppIcons.forward),
                      onTap: () => context.go(AppRoutes.settings),
                    ),
                    _WebsiteLink(
                      label: l10n.profilePrivacy,
                      url: '${content.business.siteUrl}/$languageCode/privacy-policy',
                    ),
                    _WebsiteLink(
                      label: l10n.profileTerms,
                      url: '${content.business.siteUrl}/$languageCode/terms-and-conditions',
                    ),
                    if (signedIn) ...[
                      const Divider(),
                      ListTile(
                        leading: const Icon(AppIcons.signOut),
                        title: Text(l10n.accountSignOut),
                        onTap: () => ref.read(sessionActionsProvider).signOut(),
                      ),
                      ListTile(
                        leading: Icon(AppIcons.delete, color: context.colors.error),
                        title: Text(l10n.profileDelete, style: TextStyle(color: context.colors.error)),
                        onTap: () => _confirmDelete(context, ref, content.business),
                      ),
                    ],
                  ],
                ),
              ),
            ],
          );
        },
      ),
    );
  }

  Future<void> _confirmDelete(BuildContext context, WidgetRef ref, BusinessFacts business) async {
    final l10n = context.l10n;
    final messenger = ScaffoldMessenger.of(context);
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(l10n.deleteTitle),
        content: Text(l10n.deleteBody),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: Text(MaterialLocalizations.of(context).cancelButtonLabel),
          ),
          TextButton(
            onPressed: () => Navigator.pop(context, true),
            child: Text(l10n.deleteConfirm, style: TextStyle(color: context.colors.error)),
          ),
        ],
      ),
    );
    if (confirmed != true || !context.mounted) return;
    try {
      await ref.read(sessionActionsProvider).deleteAccount();
    } on Object catch (error) {
      if (context.mounted) messenger.showSnackBar(SnackBar(content: Text(failureMessage(context, error))));
    }
  }
}

class _Identity extends StatelessWidget {
  const _Identity({required this.user});

  final AppUser user;

  @override
  Widget build(BuildContext context) {
    final name = user.displayName;
    final email = user.email;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (name != null && name.isNotEmpty) Text(name, style: context.textStyles.title),
        if (email != null)
          Text(email, style: context.textStyles.bodySmall.copyWith(color: context.colors.textSecondary)),
        if (!user.emailVerified) ...[
          const SizedBox(height: AppSpacing.sm),
          Row(
            children: [
              Icon(AppIcons.email, size: AppIcons.sizeSmall, color: context.colors.warning),
              const SizedBox(width: AppSpacing.xs),
              Expanded(
                child: Text(
                  context.l10n.accountVerifyEmail,
                  style: context.textStyles.caption.copyWith(color: context.colors.warning),
                ),
              ),
            ],
          ),
        ],
      ],
    );
  }
}

class _SignInPrompt extends StatelessWidget {
  const _SignInPrompt();

  @override
  Widget build(BuildContext context) => Align(
    alignment: AlignmentDirectional.centerStart,
    child: PrimaryButton(
      label: context.l10n.accountSignInCta,
      onPressed: () =>
          context.push(Uri(path: AppRoutes.signIn, queryParameters: {'from': AppRoutes.profile}).toString()),
    ),
  );
}

class _WebsiteLink extends StatelessWidget {
  const _WebsiteLink({required this.label, required this.url});

  final String label;
  final String url;

  @override
  Widget build(BuildContext context) => ListTile(
    leading: const Icon(AppIcons.legal),
    title: Text(label),
    trailing: const Icon(AppIcons.external),
    onTap: () => launchUrl(Uri.parse(url), mode: LaunchMode.inAppBrowserView),
  );
}
