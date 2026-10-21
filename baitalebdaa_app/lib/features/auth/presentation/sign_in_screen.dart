import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../app/router/routes.dart';
import '../../../core/platform/auth_gateway.dart';
import '../../../design_system/components/brand/brand_logo.dart';
import '../../../design_system/components/buttons/app_buttons.dart';
import '../../../design_system/components/feedback/failure_message.dart';
import '../../../design_system/components/navigation/app_header.dart';
import '../../../design_system/theme/context_extensions.dart';
import '../../../design_system/tokens/app_icons.dart';
import '../../../design_system/tokens/app_layout_tokens.dart';
import '../../settings/domain/app_settings.dart';
import '../../settings/presentation/settings_controller.dart';
import '../domain/auth_validation.dart';
import 'sign_in_controller.dart';

/// Sign in, create an account, or reset a password. Opened from Profile or when sending a
/// request; never at launch, so it can always be closed.
class SignInScreen extends ConsumerStatefulWidget {
  const SignInScreen({super.key, this.returnTo});

  /// In-app path to continue to afterwards (already checked by the router), or null for Home.
  final String? returnTo;

  @override
  ConsumerState<SignInScreen> createState() => _SignInScreenState();
}

class _SignInScreenState extends ConsumerState<SignInScreen> {
  final _formKey = GlobalKey<FormState>();
  final _name = TextEditingController();
  final _email = TextEditingController();
  final _password = TextEditingController();
  bool _obscurePassword = true;

  /// Fields are checked when the user first submits, then as they correct them.
  bool _attempted = false;

  @override
  void dispose() {
    _name.dispose();
    _email.dispose();
    _password.dispose();
    super.dispose();
  }

  void _setMode(SignInMode mode) {
    setState(() => _attempted = false);
    _formKey.currentState?.reset();
    ref.read(signInControllerProvider.notifier).setMode(mode);
  }

  Future<void> _submit() async {
    setState(() => _attempted = true);
    if (!(_formKey.currentState?.validate() ?? false)) return;
    FocusScope.of(context).unfocus();
    await ref
        .read(signInControllerProvider.notifier)
        .submit(name: _name.text, email: _email.text, password: _password.text);
  }

  void _close() {
    if (context.canPop()) {
      context.pop();
    } else {
      context.go(widget.returnTo ?? AppRoutes.home);
    }
  }

  String? _issue(FieldIssue? issue) {
    final l10n = context.l10n;
    return switch (issue) {
      null => null,
      FieldIssue.required => l10n.validationRequired,
      FieldIssue.invalidEmail => l10n.validationEmail,
      FieldIssue.passwordTooShort => l10n.validationPasswordShort(AuthValidation.minPasswordLength),
      FieldIssue.nameTooLong => l10n.validationNameLong(AuthValidation.maxNameLength),
    };
  }

  @override
  void initState() {
    super.initState();
    // Opened by a link while already signed in: nothing to do here.
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted && (ref.read(authStateProvider).value?.hasAccount ?? false)) _close();
    });
  }

  @override
  Widget build(BuildContext context) {
    // Signing in or creating an account returns to where the customer came from: Profile,
    // or the request they were sending (its answers are kept).
    ref.listen(authStateProvider, (previous, next) {
      final wasSignedIn = previous?.value?.hasAccount ?? false;
      if (!wasSignedIn && (next.value?.hasAccount ?? false)) _close();
    });
    final l10n = context.l10n;
    final state = ref.watch(signInControllerProvider);
    final mode = state.mode;
    final gutter = AppSpacing.gutter(AppWindowSize.of(context));
    final (title, intro, action) = switch (mode) {
      SignInMode.signIn => (l10n.signInTitle, l10n.signInIntro, l10n.actionSignIn),
      SignInMode.register => (l10n.registerTitle, l10n.registerIntro, l10n.actionCreateAccount),
      SignInMode.reset => (l10n.resetTitle, l10n.resetIntro, l10n.actionSendResetLink),
    };
    final error = state.error;
    final resetSentTo = state.resetSentTo;

    return Scaffold(
      body: SafeArea(
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: AppSpacing.readingWidth),
            child: ListView(
              padding: EdgeInsetsDirectional.fromSTEB(gutter, AppSpacing.md, gutter, AppSpacing.xxl),
              children: [
                Row(
                  children: [
                    const BrandLogo(),
                    const Spacer(),
                    const _LanguageSwitch(),
                    AppBarButton(
                      icon: AppIcons.close,
                      tooltip: MaterialLocalizations.of(context).closeButtonTooltip,
                      onPressed: _close,
                    ),
                  ],
                ),
                const SizedBox(height: AppSpacing.hero),
                Semantics(header: true, child: Text(title, style: context.textStyles.headline)),
                const SizedBox(height: AppSpacing.xs),
                Text(intro, style: context.textStyles.bodySmall.copyWith(color: context.colors.textSecondary)),
                const SizedBox(height: AppSpacing.xxl),
                Form(
                  key: _formKey,
                  autovalidateMode: _attempted ? AutovalidateMode.onUserInteraction : AutovalidateMode.disabled,
                  child: AutofillGroup(
                    child: Column(
                      children: [
                        if (mode == SignInMode.register) ...[
                          TextFormField(
                            controller: _name,
                            decoration: InputDecoration(labelText: l10n.fieldName),
                            textInputAction: TextInputAction.next,
                            textCapitalization: TextCapitalization.words,
                            autofillHints: const [AutofillHints.name],
                            validator: (value) => _issue(AuthValidation.name(value ?? '')),
                          ),
                          const SizedBox(height: AppSpacing.md),
                        ],
                        TextFormField(
                          controller: _email,
                          decoration: InputDecoration(labelText: l10n.fieldEmail),
                          keyboardType: TextInputType.emailAddress,
                          textInputAction: mode == SignInMode.reset ? TextInputAction.done : TextInputAction.next,
                          autocorrect: false,
                          autofillHints: const [AutofillHints.email],
                          validator: (value) => _issue(AuthValidation.email(value ?? '')),
                          onFieldSubmitted: mode == SignInMode.reset ? (_) => _submit() : null,
                        ),
                        if (mode != SignInMode.reset) ...[
                          const SizedBox(height: AppSpacing.md),
                          TextFormField(
                            controller: _password,
                            obscureText: _obscurePassword,
                            decoration: InputDecoration(
                              labelText: l10n.fieldPassword,
                              helperText: mode == SignInMode.register
                                  ? l10n.passwordHint(AuthValidation.minPasswordLength)
                                  : null,
                              suffixIcon: IconButton(
                                icon: Icon(_obscurePassword ? AppIcons.show : AppIcons.hide),
                                tooltip: _obscurePassword ? l10n.passwordShow : l10n.passwordHide,
                                onPressed: () => setState(() => _obscurePassword = !_obscurePassword),
                              ),
                            ),
                            textInputAction: TextInputAction.done,
                            autofillHints: [
                              if (mode == SignInMode.register) AutofillHints.newPassword else AutofillHints.password,
                            ],
                            validator: (value) => _issue(
                              mode == SignInMode.register
                                  ? AuthValidation.newPassword(value ?? '')
                                  : AuthValidation.password(value ?? ''),
                            ),
                            onFieldSubmitted: (_) => _submit(),
                          ),
                        ],
                      ],
                    ),
                  ),
                ),
                if (mode == SignInMode.signIn)
                  Align(
                    alignment: AlignmentDirectional.centerEnd,
                    child: TextButton(
                      onPressed: () => _setMode(SignInMode.reset),
                      child: Text(l10n.linkForgotPassword),
                    ),
                  ),
                if (error != null) _Message(text: failureMessage(context, error), isError: true),
                if (resetSentTo != null) _Message(text: l10n.resetSent(resetSentTo), isError: false),
                const SizedBox(height: AppSpacing.md),
                PrimaryButton(label: action, isLoading: state.isSubmitting, onPressed: _submit),
                const SizedBox(height: AppSpacing.xs),
                Center(
                  child: switch (mode) {
                    SignInMode.signIn => TextButton(
                      onPressed: () => _setMode(SignInMode.register),
                      child: Text(l10n.linkToRegister),
                    ),
                    SignInMode.register => TextButton(
                      onPressed: () => _setMode(SignInMode.signIn),
                      child: Text(l10n.linkToSignIn),
                    ),
                    SignInMode.reset => TextButton(
                      onPressed: () => _setMode(SignInMode.signIn),
                      child: Text(l10n.linkBackToSignIn),
                    ),
                  },
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

/// Switches straight to the other language, named in itself, so it can be found from
/// either one before signing in.
class _LanguageSwitch extends ConsumerWidget {
  const _LanguageSwitch();

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final toArabic = !context.isArabic;
    return TextButton(
      onPressed: () =>
          ref.read(settingsControllerProvider.notifier).setLanguage(toArabic ? AppLanguage.ar : AppLanguage.en),
      child: Text(toArabic ? context.l10n.languageArabic : context.l10n.languageEnglish),
    );
  }
}

class _Message extends StatelessWidget {
  const _Message({required this.text, required this.isError});

  final String text;
  final bool isError;

  @override
  Widget build(BuildContext context) {
    final color = isError ? context.colors.error : context.colors.success;
    return Padding(
      padding: const EdgeInsetsDirectional.only(top: AppSpacing.md),
      child: Semantics(
        liveRegion: true,
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Icon(isError ? AppIcons.error : AppIcons.selected, color: color, size: AppIcons.sizeSmall),
            const SizedBox(width: AppSpacing.xs),
            Expanded(
              child: Text(text, style: context.textStyles.bodySmall.copyWith(color: color)),
            ),
          ],
        ),
      ),
    );
  }
}
