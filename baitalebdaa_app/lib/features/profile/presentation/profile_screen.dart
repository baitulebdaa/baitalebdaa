import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../../app/router/routes.dart';
import '../../../core/platform/auth_gateway.dart';
import '../../../design_system/components/feedback/failure_message.dart';
import '../../../design_system/theme/context_extensions.dart';
import '../../../design_system/tokens/app_colors.dart';
import '../../../design_system/tokens/app_icons.dart';
import '../../../design_system/tokens/app_layout_tokens.dart';
import '../../../design_system/tokens/app_typography.dart';
import '../../auth/data/account_phone.dart';
import '../../auth/data/profile_photo.dart';
import '../../auth/domain/auth_validation.dart';
import '../../auth/presentation/sign_in_controller.dart';
import '../../content/domain/content_models.dart';
import '../../content/presentation/content_builder.dart';
import '../../home/presentation/home_screen.dart';
import '../../request/data/request_repository.dart';
import '../../request/domain/consultation_request.dart';
import '../../request/domain/request_validation.dart';
import '../../settings/domain/app_settings.dart';
import '../../settings/presentation/settings_controller.dart';
import '../../support/presentation/contact_actions.dart';

/// Profile (owner's design, 26 Oct 2026): the Home top bar, a photo header with who you
/// are (or the way to sign in), counts of open requests and booked consultations, then
/// rows for requests, saved items, photos, language, notifications, support, the
/// website's policies and the account.
class ProfileScreen extends ConsumerWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = context.l10n;
    final user = ref.watch(authStateProvider).value;
    final account = user != null && user.hasAccount ? user : null;
    return Scaffold(
      body: SafeArea(
        bottom: false,
        child: ContentBuilder(
          builder: (context, content) {
            final gutter = AppSpacing.gutter(AppWindowSize.of(context));
            final languageCode = Localizations.localeOf(context).languageCode;
            final requests = ref.watch(myRequestsProvider).value ?? const <ConsultationRequest>[];
            final active = requests.where((r) => !r.status.isFinal).length;
            final scheduled = requests.where((r) => r.status == RequestStatus.scheduled).length;
            Widget website(String page) => _Row(
              icon: page == 'privacy-policy' ? AppIcons.privacy : AppIcons.legal,
              title: page == 'privacy-policy' ? l10n.profilePrivacy : l10n.profileTerms,
              body: page == 'privacy-policy' ? l10n.profilePrivacyBody : l10n.profileTermsBody,
              onTap: () => launchUrl(
                Uri.parse('${content.business.siteUrl}/$languageCode/$page'),
                mode: LaunchMode.inAppBrowserView,
              ),
            );
            return ListView(
              padding: const EdgeInsetsDirectional.only(bottom: AppSpacing.section),
              children: [
                Padding(
                  padding: EdgeInsetsDirectional.fromSTEB(gutter, AppSpacing.xs, gutter - AppSpacing.xs, AppSpacing.sm),
                  child: HomeTopBar(emirates: content.business.emirates),
                ),
                _ProfileHeader(account: account),
                // The sheet rises over the photo's lower edge, as in the design.
                Transform.translate(
                  offset: const Offset(0, -_ProfileHeader.overlap),
                  child: DecoratedBox(
                    decoration: BoxDecoration(
                      color: context.colors.surfacePrimary,
                      borderRadius: const BorderRadius.vertical(top: Radius.circular(_ProfileHeader.overlap)),
                    ),
                    child: Padding(
                      padding: EdgeInsetsDirectional.fromSTEB(gutter, AppSpacing.lg, gutter, 0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.stretch,
                        children: [
                          IntrinsicHeight(
                            child: Row(
                              crossAxisAlignment: CrossAxisAlignment.stretch,
                              children: [
                                Expanded(
                                  child: _StatCard(
                                    count: active,
                                    title: l10n.profileActiveRequests,
                                    body: l10n.profileInProgress,
                                    icon: AppIcons.requests,
                                    tint: context.colors.surfaceWarm,
                                    onTap: () => context.go(AppRoutes.myRequests),
                                  ),
                                ),
                                const SizedBox(width: AppSpacing.sm),
                                Expanded(
                                  child: _StatCard(
                                    count: scheduled,
                                    title: l10n.profileScheduled,
                                    body: l10n.profileUpcoming,
                                    icon: AppIcons.calendar,
                                    tint: context.colors.brandAccent.withValues(alpha: 0.35),
                                    onTap: () => context.go(AppRoutes.myRequests),
                                  ),
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(height: AppSpacing.md),
                          _Group(
                            children: [
                              _Row(
                                icon: AppIcons.requests,
                                title: l10n.profileMyRequests,
                                body: l10n.profileMyRequestsBody,
                                onTap: () => context.go(AppRoutes.myRequests),
                              ),
                              _Row(
                                icon: AppIcons.save,
                                title: l10n.profileSavedProjects,
                                body: l10n.profileSavedBody,
                                onTap: () => context.go(AppRoutes.saved),
                              ),
                              // The design's "Uploaded Files": photos and plans are shared
                              // on WhatsApp (no file storage on the free Firebase plan).
                              _Row(
                                icon: AppIcons.attachment,
                                title: l10n.profilePhotos,
                                body: l10n.profilePhotosBody,
                                external: true,
                                onTap: () => openWhatsApp(
                                  context,
                                  ref,
                                  content.business,
                                  screen: AppRoutes.profile,
                                  message: l10n.profilePhotosMessage,
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: AppSpacing.md),
                          _Group(
                            children: [
                              _Row(
                                icon: AppIcons.globe,
                                title: l10n.profileLanguage,
                                body: l10n.profileLanguageBody,
                                onTap: () => _chooseLanguage(context, ref),
                              ),
                            ],
                          ),
                          const SizedBox(height: AppSpacing.md),
                          _Group(
                            children: [
                              _Row(
                                icon: AppIcons.notifications,
                                title: l10n.profileNotifications,
                                body: l10n.profileNotificationsBody,
                                onTap: () => context.go(AppRoutes.settings),
                              ),
                              _Row(
                                icon: AppIcons.whatsapp,
                                title: l10n.profileWhatsapp,
                                body: l10n.profileWhatsappBody,
                                external: true,
                                onTap: () => openWhatsApp(context, ref, content.business, screen: AppRoutes.profile),
                              ),
                            ],
                          ),
                          const SizedBox(height: AppSpacing.md),
                          _Group(children: [website('privacy-policy'), website('terms-and-conditions')]),
                          if (account != null) ...[
                            const SizedBox(height: AppSpacing.md),
                            _Group(
                              children: [
                                _Row(
                                  icon: AppIcons.signOut,
                                  title: l10n.accountSignOut,
                                  body: l10n.profileSignOutBody,
                                  onTap: () => ref.read(sessionActionsProvider).signOut(),
                                ),
                              ],
                            ),
                            const SizedBox(height: AppSpacing.lg),
                            _DeleteAccount(onPressed: () => _confirmDelete(context, ref, content.business)),
                          ],
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            );
          },
        ),
      ),
    );
  }

  Future<void> _chooseLanguage(BuildContext context, WidgetRef ref) async {
    final l10n = context.l10n;
    final controller = ref.read(settingsControllerProvider.notifier);
    final current = ref.read(settingsControllerProvider).language;
    final picked = await showModalBottomSheet<AppLanguage>(
      context: context,
      showDragHandle: true,
      builder: (context) => SafeArea(
        child: RadioGroup<AppLanguage>(
          groupValue: current,
          onChanged: (language) => Navigator.pop(context, language),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Padding(
                padding: const EdgeInsetsDirectional.fromSTEB(AppSpacing.lg, 0, AppSpacing.lg, AppSpacing.xs),
                child: Text(l10n.profileLanguage, style: context.textStyles.title),
              ),
              RadioListTile(value: AppLanguage.system, title: Text(l10n.settingsLanguageSystem)),
              // Each language is named in itself, so it can be found from either one.
              RadioListTile(value: AppLanguage.en, title: Text(l10n.languageEnglish)),
              RadioListTile(value: AppLanguage.ar, title: Text(l10n.languageArabic)),
            ],
          ),
        ),
      ),
    );
    if (picked != null) await controller.setLanguage(picked);
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

/// A real living room from the website, darkened at the start where the words sit: the
/// customer's initials, name, email and phone with Edit Profile, or a welcome and the way
/// to sign in. There is no photo upload (no file storage), so the circle shows initials.
class _ProfileHeader extends ConsumerWidget {
  const _ProfileHeader({required this.account});

  final AppUser? account;

  static const photo = 'assets/images/modern-living-room-beige-sofa-curtain-wall-panels.webp';
  static const double overlap = 24;
  static const Color _onDark = Color(0xFFFFFFFF);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = context.l10n;
    final styles = context.textStyles;
    final account = this.account;
    final phone = account == null ? null : ref.watch(accountPhoneProvider).value;
    final name = account?.displayName?.trim();
    final email = account?.email;
    final details = styles.bodySmall.copyWith(color: _onDark.withValues(alpha: 0.92));
    final title = styles.headline.copyWith(color: _onDark, fontSize: styles.script == AppScript.latin ? 32 : 26);
    return ClipRRect(
      borderRadius: const BorderRadius.vertical(top: Radius.circular(overlap)),
      child: Stack(
        children: [
          Positioned.fill(
            child: Image.asset(
              photo,
              fit: BoxFit.cover,
              excludeFromSemantics: true,
              errorBuilder: (context, error, stack) => ColoredBox(color: context.colors.surfaceWarm),
            ),
          ),
          Positioned.fill(
            child: DecoratedBox(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: AlignmentDirectional.centerStart,
                  end: AlignmentDirectional.centerEnd,
                  colors: [
                    AppColors.splashBackground.withValues(alpha: 0.78),
                    AppColors.splashBackground.withValues(alpha: 0.5),
                    AppColors.splashBackground.withValues(alpha: 0.15),
                  ],
                ),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsetsDirectional.fromSTEB(
              AppSpacing.lg,
              AppSpacing.xl,
              AppSpacing.lg,
              AppSpacing.xl + overlap,
            ),
            child: Row(
              children: [
                _Avatar(name: name ?? email ?? '', account: account),
                const SizedBox(width: AppSpacing.lg),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Semantics(
                        header: true,
                        child: Text(
                          account == null ? l10n.profileGuestTitle : (name?.isNotEmpty ?? false ? name! : email ?? ''),
                          style: title,
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                      const SizedBox(height: AppSpacing.xs),
                      if (account == null)
                        Text(l10n.profileGuestBody, style: details)
                      else ...[
                        if (email != null) _Detail(icon: AppIcons.email, text: email, style: details),
                        if (phone != null) _Detail(icon: AppIcons.phone, text: _displayPhone(phone), style: details),
                        if (!account.emailVerified)
                          Padding(
                            padding: const EdgeInsetsDirectional.only(top: AppSpacing.xxs),
                            child: Text(
                              l10n.accountVerifyEmail,
                              style: styles.caption.copyWith(color: _onDark.withValues(alpha: 0.8)),
                            ),
                          ),
                      ],
                      const SizedBox(height: AppSpacing.md),
                      OutlinedButton.icon(
                        onPressed: account == null
                            ? () => context.push(
                                Uri(path: AppRoutes.signIn, queryParameters: {'from': AppRoutes.profile}).toString(),
                              )
                            : () => _editProfile(context, ref, account, phone),
                        icon: Icon(account == null ? AppIcons.account : AppIcons.edit, size: AppIcons.sizeSmall),
                        label: Text(account == null ? l10n.accountSignInCta : l10n.profileEditProfile),
                        style: OutlinedButton.styleFrom(
                          foregroundColor: _onDark,
                          side: const BorderSide(color: _onDark, width: 1.2),
                          shape: const StadiumBorder(),
                          minimumSize: const Size(0, kMinTouchTarget),
                          padding: const EdgeInsetsDirectional.symmetric(horizontal: AppSpacing.lg),
                        ),
                      ),
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

  /// "+971501234567" → "+971 50 123 4567".
  static String _displayPhone(String e164) {
    final uae = RegExp(r'^\+971(\d{2})(\d{3})(\d{4})$').firstMatch(e164);
    return uae == null ? e164 : '+971 ${uae[1]} ${uae[2]} ${uae[3]}';
  }

  Future<void> _editProfile(BuildContext context, WidgetRef ref, AppUser account, String? phone) async {
    final saved = await showModalBottomSheet<bool>(
      context: context,
      isScrollControlled: true,
      showDragHandle: true,
      builder: (context) => _EditProfileSheet(name: account.displayName ?? '', phone: phone ?? ''),
    );
    if ((saved ?? false) && context.mounted) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(context.l10n.profileSaved)));
    }
  }
}

/// The round photo: the customer's own picture (kept on this phone) or their initials,
/// with a camera button to change it once signed in.
class _Avatar extends ConsumerWidget {
  const _Avatar({required this.name, required this.account});

  final String name;
  final AppUser? account;

  static const double _size = 104;
  static const Color _white = Color(0xFFFFFFFF);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final account = this.account;
    final photo = account == null ? null : ref.watch(profilePhotoProvider).value;
    final words = name.split(RegExp(r'[\s@.]+')).where((w) => w.isNotEmpty).toList();
    final initials = words.take(2).map((w) => w.characters.first.toUpperCase()).join();
    final pixels = (_size * MediaQuery.devicePixelRatioOf(context)).round();
    return SizedBox.square(
      dimension: _size,
      child: Stack(
        clipBehavior: Clip.none,
        children: [
          ExcludeSemantics(
            child: Container(
              width: _size,
              height: _size,
              alignment: Alignment.center,
              clipBehavior: Clip.antiAlias,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: context.colors.brandPrimary,
                border: Border.all(color: _white, width: 3),
              ),
              child: photo != null
                  ? Image.file(photo, width: _size, height: _size, fit: BoxFit.cover, cacheWidth: pixels)
                  : initials.isEmpty
                  ? const Icon(AppIcons.account, size: 40, color: _white)
                  : Text(initials, style: context.textStyles.headline.copyWith(color: _white, fontSize: 38)),
            ),
          ),
          if (account != null && ProfilePhotoStore.supported)
            PositionedDirectional(
              end: -2,
              bottom: 2,
              child: Material(
                color: _white,
                shape: const CircleBorder(),
                elevation: 2,
                child: IconButton(
                  tooltip: context.l10n.profilePhotoChange,
                  iconSize: 20,
                  constraints: const BoxConstraints.tightFor(width: 40, height: 40),
                  padding: EdgeInsets.zero,
                  color: AppColors.splashBackground,
                  icon: const Icon(AppIcons.camera),
                  onPressed: () => _changePhoto(context, ref, account, hasPhoto: photo != null),
                ),
              ),
            ),
        ],
      ),
    );
  }

  Future<void> _changePhoto(BuildContext context, WidgetRef ref, AppUser account, {required bool hasPhoto}) async {
    final store = ref.read(profilePhotoStoreProvider);
    var remove = false;
    if (hasPhoto) {
      final l10n = context.l10n;
      final choice = await showModalBottomSheet<bool>(
        context: context,
        showDragHandle: true,
        builder: (context) => SafeArea(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              ListTile(
                leading: const Icon(AppIcons.camera),
                title: Text(l10n.profilePhotoChoose),
                onTap: () => Navigator.pop(context, false),
              ),
              ListTile(
                leading: Icon(AppIcons.delete, color: context.colors.error),
                title: Text(l10n.profilePhotoRemove, style: TextStyle(color: context.colors.error)),
                onTap: () => Navigator.pop(context, true),
              ),
              Padding(
                padding: const EdgeInsetsDirectional.fromSTEB(AppSpacing.lg, 0, AppSpacing.lg, AppSpacing.md),
                child: Text(
                  l10n.profilePhotoNote,
                  style: context.textStyles.caption.copyWith(color: context.colors.textSecondary),
                ),
              ),
            ],
          ),
        ),
      );
      if (choice == null) return;
      remove = choice;
    }
    if (remove) {
      await store.clear(account.uid);
    } else if (!await store.pick(account.uid)) {
      return;
    }
    ref.invalidate(profilePhotoProvider);
  }
}

class _Detail extends StatelessWidget {
  const _Detail({required this.icon, required this.text, required this.style});

  final IconData icon;
  final String text;
  final TextStyle style;

  @override
  Widget build(BuildContext context) => Padding(
    padding: const EdgeInsetsDirectional.only(top: AppSpacing.xxs),
    child: Row(
      children: [
        Icon(icon, size: 16, color: style.color),
        const SizedBox(width: AppSpacing.xs),
        Expanded(
          child: Text(text, style: style, maxLines: 1, overflow: TextOverflow.ellipsis),
        ),
      ],
    ),
  );
}

/// Change the account's name and the number kept on this device for requests.
class _EditProfileSheet extends ConsumerStatefulWidget {
  const _EditProfileSheet({required this.name, required this.phone});

  final String name;
  final String phone;

  @override
  ConsumerState<_EditProfileSheet> createState() => _EditProfileSheetState();
}

class _EditProfileSheetState extends ConsumerState<_EditProfileSheet> {
  final _formKey = GlobalKey<FormState>();
  late final _name = TextEditingController(text: widget.name);
  late final _phone = TextEditingController(text: widget.phone);
  bool _saving = false;
  Object? _error;

  @override
  void dispose() {
    _name.dispose();
    _phone.dispose();
    super.dispose();
  }

  String? _issue(FieldIssue? issue) {
    final l10n = context.l10n;
    return switch (issue) {
      null => null,
      FieldIssue.required => l10n.validationRequired,
      FieldIssue.nameTooLong => l10n.validationNameLong(AuthValidation.maxNameLength),
      FieldIssue.invalidPhone => l10n.issuePhoneInvalid,
      FieldIssue.invalidEmail || FieldIssue.passwordTooShort => null,
    };
  }

  Future<void> _save() async {
    if (!(_formKey.currentState?.validate() ?? false)) return;
    setState(() {
      _saving = true;
      _error = null;
    });
    try {
      if (_name.text.trim() != widget.name.trim()) {
        await ref.read(authGatewayProvider).updateDisplayName(_name.text);
      }
      final store = ref.read(accountPhoneStoreProvider);
      final phone = normalizePhone(_phone.text);
      if (phone != null) {
        await store.save(phone);
      } else {
        await store.clear();
      }
      ref.invalidate(accountPhoneProvider);
      if (mounted) Navigator.pop(context, true);
    } on Object catch (error) {
      if (mounted) {
        setState(() {
          _saving = false;
          _error = error;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final l10n = context.l10n;
    final error = _error;
    return Padding(
      padding: EdgeInsetsDirectional.fromSTEB(
        AppSpacing.lg,
        0,
        AppSpacing.lg,
        AppSpacing.lg + MediaQuery.viewInsetsOf(context).bottom,
      ),
      child: Form(
        key: _formKey,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(l10n.profileEditProfile, style: context.textStyles.title),
            const SizedBox(height: AppSpacing.lg),
            TextFormField(
              controller: _name,
              decoration: InputDecoration(labelText: l10n.authFullName),
              textCapitalization: TextCapitalization.words,
              textInputAction: TextInputAction.next,
              autofillHints: const [AutofillHints.name],
              validator: (value) => _issue(AuthValidation.name(value ?? '')),
            ),
            const SizedBox(height: AppSpacing.md),
            TextFormField(
              controller: _phone,
              decoration: InputDecoration(labelText: l10n.authPhone, hintText: l10n.authPhoneExample),
              keyboardType: TextInputType.phone,
              autofillHints: const [AutofillHints.telephoneNumber],
              validator: (value) => _issue(AuthValidation.phone(value ?? '')),
              onFieldSubmitted: (_) => _save(),
            ),
            if (error != null) ...[
              const SizedBox(height: AppSpacing.sm),
              Text(
                failureMessage(context, error),
                style: context.textStyles.bodySmall.copyWith(color: context.colors.error),
              ),
            ],
            const SizedBox(height: AppSpacing.lg),
            FilledButton(
              onPressed: _saving ? null : _save,
              style: FilledButton.styleFrom(shape: const StadiumBorder(), minimumSize: const Size.fromHeight(52)),
              child: Text(l10n.profileSave),
            ),
          ],
        ),
      ),
    );
  }
}

/// A count with its name, e.g. "2 Active Requests · In progress".
class _StatCard extends StatelessWidget {
  const _StatCard({
    required this.count,
    required this.title,
    required this.body,
    required this.icon,
    required this.tint,
    required this.onTap,
  });

  final int count;
  final String title;
  final String body;
  final IconData icon;
  final Color tint;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final colors = context.colors;
    final styles = context.textStyles;
    return Material(
      color: colors.surfaceSecondary,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(14),
        side: BorderSide(color: colors.borderSubtle),
      ),
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: onTap,
        child: MergeSemantics(
          child: Padding(
            padding: const EdgeInsetsDirectional.all(AppSpacing.sm),
            child: Row(
              children: [
                DecoratedBox(
                  decoration: BoxDecoration(color: tint, shape: BoxShape.circle),
                  child: SizedBox.square(
                    dimension: 40,
                    child: Icon(icon, size: AppIcons.sizeSmall, color: colors.textPrimary),
                  ),
                ),
                const SizedBox(width: AppSpacing.xs),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('$count', style: styles.headline.copyWith(fontSize: 26, height: 1)),
                      Text(
                        title,
                        style: styles.caption.copyWith(color: colors.textPrimary, fontWeight: FontWeight.w600),
                      ),
                      Text(body, style: styles.caption.copyWith(color: colors.textSecondary, fontSize: 12)),
                    ],
                  ),
                ),
                // The chevron in a small outlined circle, as in the design.
                DecoratedBox(
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    border: Border.all(color: colors.borderControl),
                  ),
                  child: SizedBox.square(
                    dimension: 28,
                    child: Icon(AppIcons.forward, size: 14, color: colors.textPrimary),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

/// Rows on one soft card, split by hairlines.
class _Group extends StatelessWidget {
  const _Group({required this.children});

  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    final colors = context.colors;
    return Material(
      color: colors.surfaceSecondary,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(14),
        side: BorderSide(color: colors.borderSubtle),
      ),
      clipBehavior: Clip.antiAlias,
      child: Column(
        children: [
          for (final (i, child) in children.indexed) ...[
            if (i > 0) Divider(height: 1, indent: AppSpacing.md, endIndent: AppSpacing.md, color: colors.borderSubtle),
            child,
          ],
        ],
      ),
    );
  }
}

class _Row extends StatelessWidget {
  const _Row({required this.icon, required this.title, required this.body, required this.onTap, this.external = false});

  final IconData icon;
  final String title;
  final String body;
  final VoidCallback onTap;

  /// Opens outside the app (WhatsApp): an arrow out instead of a chevron.
  final bool external;

  @override
  Widget build(BuildContext context) {
    final colors = context.colors;
    return InkWell(
      onTap: onTap,
      child: MergeSemantics(
        child: Padding(
          padding: const EdgeInsetsDirectional.fromSTEB(AppSpacing.md, AppSpacing.sm, AppSpacing.sm, AppSpacing.sm),
          child: Row(
            children: [
              Icon(icon, color: colors.textPrimary),
              const SizedBox(width: AppSpacing.md),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(title, style: context.textStyles.subtitle.copyWith(fontWeight: FontWeight.w500)),
                    Text(body, style: context.textStyles.caption.copyWith(color: colors.textSecondary)),
                  ],
                ),
              ),
              const SizedBox(width: AppSpacing.xs),
              Icon(
                external ? AppIcons.external : AppIcons.forward,
                size: AppIcons.sizeSmall,
                color: colors.textSecondary,
              ),
            ],
          ),
        ),
      ),
    );
  }
}

/// "Delete Account" in red, centred between two hairlines.
class _DeleteAccount extends StatelessWidget {
  const _DeleteAccount({required this.onPressed});

  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    final colors = context.colors;
    final rule = Expanded(child: Divider(color: colors.borderSubtle));
    return Row(
      children: [
        rule,
        TextButton.icon(
          onPressed: onPressed,
          icon: const Icon(AppIcons.delete, size: AppIcons.sizeSmall),
          label: Text(context.l10n.profileDelete),
          style: TextButton.styleFrom(foregroundColor: colors.error),
        ),
        rule,
      ],
    );
  }
}
