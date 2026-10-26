import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../../app/router/routes.dart';
import '../../../core/platform/auth_gateway.dart';
import '../../../design_system/components/brand/brand_logo.dart';
import '../../../design_system/components/feedback/failure_message.dart';
import '../../../design_system/components/navigation/app_header.dart';
import '../../../design_system/theme/context_extensions.dart';
import '../../../design_system/tokens/app_icons.dart';
import '../../../design_system/tokens/app_layout_tokens.dart';
import '../../content/data/content_repository.dart';
import '../domain/auth_validation.dart';
import 'sign_in_controller.dart';

/// Log in, sign up, or reset a password (owner's design, 26 Oct 2026). Opened from Profile
/// or when sending a request; never at launch, so it can always be closed.
///
/// Log in: a photo across the top under a rounded sheet with the wordmark, title, email and
/// password, then Google and Apple. Sign up: wordmark, a rounded photo, a large title, name,
/// email, phone and password, and agreement to the website's terms. Reset uses the log-in
/// layout with the email field only.
class SignInScreen extends ConsumerStatefulWidget {
  const SignInScreen({super.key, this.returnTo});

  /// In-app path to continue to afterwards (already checked by the router), or null for Home.
  final String? returnTo;

  /// A real living room from the website (the design's render is not one of ours).
  static const photo = 'assets/images/living-room-curved-sofa-wood-slat-wall.webp';

  @override
  ConsumerState<SignInScreen> createState() => _SignInScreenState();
}

class _SignInScreenState extends ConsumerState<SignInScreen> {
  final _formKey = GlobalKey<FormState>();
  final _name = TextEditingController();
  final _email = TextEditingController();
  final _phone = TextEditingController();
  final _password = TextEditingController();
  late final _termsLink = TapGestureRecognizer()..onTap = () => _openSitePage('terms-and-conditions');
  late final _privacyLink = TapGestureRecognizer()..onTap = () => _openSitePage('privacy-policy');
  bool _obscurePassword = true;
  bool _agreed = false;

  /// Fields are checked when the user first submits, then as they correct them.
  bool _attempted = false;

  @override
  void initState() {
    super.initState();
    // Opened by a link while already signed in: nothing to do here.
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted && (ref.read(authStateProvider).value?.hasAccount ?? false)) _close();
    });
  }

  @override
  void dispose() {
    _name.dispose();
    _email.dispose();
    _phone.dispose();
    _password.dispose();
    _termsLink.dispose();
    _privacyLink.dispose();
    super.dispose();
  }

  void _setMode(SignInMode mode) {
    setState(() => _attempted = false);
    _formKey.currentState?.reset();
    ref.read(signInControllerProvider.notifier).setMode(mode);
  }

  Future<void> _submit() async {
    setState(() => _attempted = true);
    final register = ref.read(signInControllerProvider).mode == SignInMode.register;
    final valid = _formKey.currentState?.validate() ?? false;
    if (!valid || (register && !_agreed)) return;
    FocusScope.of(context).unfocus();
    await ref
        .read(signInControllerProvider.notifier)
        .submit(name: _name.text, email: _email.text, password: _password.text, phone: _phone.text);
  }

  void _close() {
    if (context.canPop()) {
      context.pop();
    } else {
      context.go(widget.returnTo ?? AppRoutes.home);
    }
  }

  Future<void> _openSitePage(String page) async {
    final site = ref.read(contentSnapshotProvider).value?.business.siteUrl;
    if (site == null) return;
    final languageCode = Localizations.localeOf(context).languageCode;
    await launchUrl(Uri.parse('$site/$languageCode/$page'), mode: LaunchMode.inAppBrowserView);
  }

  String? _issue(FieldIssue? issue) {
    final l10n = context.l10n;
    return switch (issue) {
      null => null,
      FieldIssue.required => l10n.validationRequired,
      FieldIssue.invalidEmail => l10n.validationEmail,
      FieldIssue.passwordTooShort => l10n.validationPasswordShort(AuthValidation.minPasswordLength),
      FieldIssue.nameTooLong => l10n.validationNameLong(AuthValidation.maxNameLength),
      FieldIssue.invalidPhone => l10n.issuePhoneInvalid,
    };
  }

  @override
  Widget build(BuildContext context) {
    // Signing in or creating an account returns to where the customer came from: Profile,
    // or the request they were sending (its answers are kept).
    ref.listen(authStateProvider, (previous, next) {
      final wasSignedIn = previous?.value?.hasAccount ?? false;
      if (!wasSignedIn && (next.value?.hasAccount ?? false)) _close();
    });
    final mode = ref.watch(signInControllerProvider.select((state) => state.mode));
    final form = Form(
      key: _formKey,
      autovalidateMode: _attempted ? AutovalidateMode.onUserInteraction : AutovalidateMode.disabled,
      child: AutofillGroup(child: mode == SignInMode.register ? _registerBody() : _logInBody(mode)),
    );
    return PopScope(
      // Back from sign-up or reset returns to log in first.
      canPop: mode == SignInMode.signIn,
      onPopInvokedWithResult: (didPop, _) {
        if (!didPop) _setMode(SignInMode.signIn);
      },
      child: Scaffold(
        body: mode == SignInMode.register
            ? _RegisterLayout(onClose: _close, child: form)
            : _LogInLayout(onClose: _close, child: form),
      ),
    );
  }

  /// Log in or reset: centred, under the wordmark.
  Widget _logInBody(SignInMode mode) {
    final l10n = context.l10n;
    final state = ref.watch(signInControllerProvider);
    final reset = mode == SignInMode.reset;
    final resetSentTo = state.resetSentTo;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        const Center(child: BrandLockup(width: 190, centered: true)),
        const SizedBox(height: AppSpacing.xl),
        _Title(text: reset ? l10n.resetTitle : l10n.authLoginTitle, centered: true),
        const SizedBox(height: AppSpacing.xs),
        _Intro(text: reset ? l10n.resetIntro : l10n.authLoginIntro, centered: true),
        const SizedBox(height: AppSpacing.xl),
        _emailField(helper: false, last: reset),
        if (!reset) ...[
          const SizedBox(height: AppSpacing.md),
          _passwordField(register: false),
          Align(
            alignment: AlignmentDirectional.centerEnd,
            child: TextButton(
              onPressed: () => _setMode(SignInMode.reset),
              style: TextButton.styleFrom(foregroundColor: context.colors.brandPrimary),
              child: Text(l10n.authForgot),
            ),
          ),
        ],
        if (state.error case final error?) _Message(text: failureMessage(context, error), isError: true),
        if (resetSentTo != null) _Message(text: l10n.resetSent(resetSentTo), isError: false),
        const SizedBox(height: AppSpacing.md),
        _MainButton(
          label: reset ? l10n.actionSendResetLink : l10n.authLogIn,
          busy: state.isSubmitting,
          onPressed: _submit,
        ),
        if (reset)
          Center(
            child: TextButton(
              onPressed: () => _setMode(SignInMode.signIn),
              style: TextButton.styleFrom(foregroundColor: context.colors.brandPrimary),
              child: Text(l10n.linkBackToSignIn),
            ),
          )
        else ...[
          const SizedBox(height: AppSpacing.xl),
          _SocialButtons(busy: state.isSubmitting),
          const SizedBox(height: AppSpacing.md),
          _SwitchLink(
            question: l10n.authNoAccount,
            action: l10n.authSignUp,
            onPressed: () => _setMode(SignInMode.register),
          ),
        ],
      ],
    );
  }

  /// Sign up: aligned to the start, every field with a line of help under it.
  Widget _registerBody() {
    final l10n = context.l10n;
    final state = ref.watch(signInControllerProvider);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        _Title(text: l10n.authRegisterTitle, centered: false),
        const SizedBox(height: AppSpacing.xs),
        _Intro(text: l10n.authRegisterIntro, centered: false),
        const SizedBox(height: AppSpacing.xl),
        TextFormField(
          controller: _name,
          decoration: _fieldDecoration(
            context,
            label: l10n.authFullName,
            icon: const Icon(AppIcons.account),
            helper: l10n.authFullNameHelp,
          ),
          textInputAction: TextInputAction.next,
          textCapitalization: TextCapitalization.words,
          autofillHints: const [AutofillHints.name],
          validator: (value) => _issue(AuthValidation.name(value ?? '')),
        ),
        const SizedBox(height: AppSpacing.sm),
        _emailField(helper: true, last: false),
        const SizedBox(height: AppSpacing.sm),
        // The example number fills the box, so screen readers get the field's name here.
        Semantics(
          label: l10n.authPhone,
          child: TextFormField(
            controller: _phone,
            decoration: _fieldDecoration(
              context,
              label: l10n.authPhone,
              hint: l10n.authPhoneExample,
              icon: const _PhonePrefix(),
              helper: l10n.authPhoneHelp,
            ),
            keyboardType: TextInputType.phone,
            textInputAction: TextInputAction.next,
            autofillHints: const [AutofillHints.telephoneNumber],
            validator: (value) => _issue(AuthValidation.phone(value ?? '')),
          ),
        ),
        const SizedBox(height: AppSpacing.sm),
        _passwordField(register: true),
        const SizedBox(height: AppSpacing.md),
        _terms(),
        if (state.error case final error?) _Message(text: failureMessage(context, error), isError: true),
        const SizedBox(height: AppSpacing.lg),
        _MainButton(label: l10n.authCreateAccount, busy: state.isSubmitting, onPressed: _submit),
        const SizedBox(height: AppSpacing.xl),
        _SocialButtons(busy: state.isSubmitting),
        const SizedBox(height: AppSpacing.md),
        _SwitchLink(
          question: l10n.authHaveAccount,
          action: l10n.authLogIn,
          underline: true,
          onPressed: () => _setMode(SignInMode.signIn),
        ),
      ],
    );
  }

  Widget _emailField({required bool helper, required bool last}) => TextFormField(
    controller: _email,
    decoration: _fieldDecoration(
      context,
      label: context.l10n.authEmail,
      icon: const Icon(AppIcons.email),
      helper: helper ? context.l10n.authEmailHelp : null,
    ),
    keyboardType: TextInputType.emailAddress,
    textInputAction: last ? TextInputAction.done : TextInputAction.next,
    autocorrect: false,
    autofillHints: const [AutofillHints.email],
    validator: (value) => _issue(AuthValidation.email(value ?? '')),
    onFieldSubmitted: last ? (_) => _submit() : null,
  );

  Widget _passwordField({required bool register}) {
    final l10n = context.l10n;
    return TextFormField(
      controller: _password,
      obscureText: _obscurePassword,
      decoration: _fieldDecoration(
        context,
        label: l10n.fieldPassword,
        icon: const Icon(AppIcons.password),
        helper: register ? l10n.authPasswordHelp(AuthValidation.minPasswordLength) : null,
        suffix: Padding(
          padding: const EdgeInsetsDirectional.only(end: AppSpacing.xs),
          child: IconButton(
            // Crossed out while hidden, as in the design.
            icon: Icon(_obscurePassword ? AppIcons.hide : AppIcons.show),
            tooltip: _obscurePassword ? l10n.passwordShow : l10n.passwordHide,
            onPressed: () => setState(() => _obscurePassword = !_obscurePassword),
          ),
        ),
      ),
      textInputAction: TextInputAction.done,
      autofillHints: [if (register) AutofillHints.newPassword else AutofillHints.password],
      validator: (value) =>
          _issue(register ? AuthValidation.newPassword(value ?? '') : AuthValidation.password(value ?? '')),
      onFieldSubmitted: (_) => _submit(),
    );
  }

  /// "I agree to the Terms of Service and Privacy Policy", both linked to the website.
  Widget _terms() {
    final l10n = context.l10n;
    final colors = context.colors;
    final styles = context.textStyles;
    // The sentence is translated whole; the two names are cut out and made into links.
    const termsMark = '\u0001';
    const privacyMark = '\u0002';
    final sentence = l10n.authAgree(termsMark, privacyMark);
    final linkStyle = TextStyle(color: colors.textPrimary, decoration: TextDecoration.underline);
    final spans = <InlineSpan>[];
    var rest = sentence;
    while (rest.isNotEmpty) {
      final next = [
        rest.indexOf(termsMark),
        rest.indexOf(privacyMark),
      ].where((i) => i >= 0).fold<int?>(null, (lowest, i) => lowest == null || i < lowest ? i : lowest);
      if (next == null) {
        spans.add(TextSpan(text: rest));
        break;
      }
      if (next > 0) spans.add(TextSpan(text: rest.substring(0, next)));
      final terms = rest[next] == termsMark;
      spans.add(
        TextSpan(
          text: terms ? l10n.authTerms : l10n.authPrivacy,
          style: linkStyle,
          recognizer: terms ? _termsLink : _privacyLink,
        ),
      );
      rest = rest.substring(next + 1);
    }
    final missing = _attempted && !_agreed;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            SizedBox.square(
              dimension: 32,
              child: Checkbox(
                value: _agreed,
                onChanged: (value) => setState(() => _agreed = value ?? false),
                activeColor: colors.brandPrimary,
                checkColor: colors.onBrandPrimary,
                side: BorderSide(color: missing ? colors.error : colors.borderControl, width: 1.5),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(6)),
                semanticLabel: l10n.authAgree(l10n.authTerms, l10n.authPrivacy),
              ),
            ),
            const SizedBox(width: AppSpacing.sm),
            Expanded(
              child: GestureDetector(
                onTap: () => setState(() => _agreed = !_agreed),
                child: Text.rich(
                  TextSpan(children: spans),
                  style: styles.bodySmall.copyWith(color: colors.textSecondary),
                ),
              ),
            ),
          ],
        ),
        if (missing)
          Padding(
            padding: const EdgeInsetsDirectional.only(top: AppSpacing.xxs, start: AppSpacing.xxs),
            child: Semantics(
              liveRegion: true,
              child: Text(l10n.authAgreeRequired, style: styles.caption.copyWith(color: colors.error)),
            ),
          ),
      ],
    );
  }
}

/// A field as in the design: a soft white box with an icon, its name inside until typed
/// in (or [hint], an example, in place of the name), and a line of help under it.
InputDecoration _fieldDecoration(
  BuildContext context, {
  required String label,
  required Widget icon,
  String? hint,
  String? helper,
  Widget? suffix,
}) {
  final colors = context.colors;
  OutlineInputBorder border(Color color, [double width = 1]) => OutlineInputBorder(
    borderRadius: BorderRadius.circular(14),
    borderSide: BorderSide(color: color, width: width),
  );
  return InputDecoration(
    labelText: hint == null ? label : null,
    hintText: hint,
    floatingLabelBehavior: FloatingLabelBehavior.never,
    helperText: helper,
    filled: true,
    fillColor: colors.surfaceSecondary,
    contentPadding: const EdgeInsetsDirectional.symmetric(horizontal: AppSpacing.md, vertical: 20),
    prefixIcon: Padding(
      padding: const EdgeInsetsDirectional.only(start: AppSpacing.lg, end: AppSpacing.md),
      child: IconTheme.merge(
        data: IconThemeData(color: colors.textPrimary),
        child: icon,
      ),
    ),
    prefixIconConstraints: const BoxConstraints(minHeight: 48),
    suffixIcon: suffix,
    labelStyle: context.textStyles.body.copyWith(color: colors.textTertiary),
    hintStyle: context.textStyles.body.copyWith(color: colors.textTertiary),
    helperStyle: context.textStyles.caption.copyWith(color: colors.textSecondary),
    helperMaxLines: 2,
    errorMaxLines: 3,
    border: border(colors.borderSubtle),
    enabledBorder: border(colors.borderSubtle),
    focusedBorder: border(colors.brandPrimary, 1.5),
    errorBorder: border(colors.error),
    focusedErrorBorder: border(colors.error, 1.5),
  );
}

/// The phone field's lead: a phone, then the UAE flag, each after a thin rule. The
/// number's name is read from [_fieldDecoration]'s hint, so these are decorative.
class _PhonePrefix extends StatelessWidget {
  const _PhonePrefix();

  @override
  Widget build(BuildContext context) {
    final rule = SizedBox(
      height: 28,
      child: VerticalDivider(width: AppSpacing.xl, thickness: 1, color: context.colors.borderSubtle),
    );
    return ExcludeSemantics(
      child: Row(mainAxisSize: MainAxisSize.min, children: [const Icon(AppIcons.phone), rule, const _UaeFlag(), rule]),
    );
  }
}

/// The UAE flag: a red band at the hoist, then green, white and black stripes. Flags do
/// not mirror, so it is always drawn left to right.
class _UaeFlag extends StatelessWidget {
  const _UaeFlag();

  @override
  Widget build(BuildContext context) => Directionality(
    textDirection: TextDirection.ltr,
    child: ClipRRect(
      borderRadius: BorderRadius.circular(2),
      child: const SizedBox(
        width: 30,
        height: 20,
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            SizedBox(width: 8, child: ColoredBox(color: Color(0xFFEF3340))),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Expanded(child: ColoredBox(color: Color(0xFF009639))),
                  Expanded(child: ColoredBox(color: Color(0xFFFFFFFF))),
                  Expanded(child: ColoredBox(color: Color(0xFF000000))),
                ],
              ),
            ),
          ],
        ),
      ),
    ),
  );
}

/// Log in: the photo fills the top, and a rounded sheet slides up over its lower edge.
class _LogInLayout extends StatelessWidget {
  const _LogInLayout({required this.onClose, required this.child});

  final VoidCallback onClose;
  final Widget child;

  static const double _overlap = 28;

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.sizeOf(context);
    final padding = MediaQuery.paddingOf(context);
    final gutter = AppSpacing.gutter(AppWindowSize.of(context));
    final photoHeight = (size.height * 0.34).clamp(220.0, 360.0);
    return Stack(
      children: [
        SingleChildScrollView(
          child: Stack(
            children: [
              SizedBox(
                width: double.infinity,
                height: photoHeight,
                child: const _Photo(alignment: Alignment(0, 0.25)),
              ),
              Padding(
                padding: EdgeInsetsDirectional.only(top: photoHeight - _overlap),
                child: DecoratedBox(
                  decoration: BoxDecoration(
                    color: context.colors.surfacePrimary,
                    borderRadius: const BorderRadius.vertical(top: Radius.circular(_overlap)),
                  ),
                  child: Center(
                    child: ConstrainedBox(
                      constraints: const BoxConstraints(maxWidth: AppSpacing.readingWidth),
                      child: Padding(
                        padding: EdgeInsetsDirectional.fromSTEB(
                          gutter,
                          AppSpacing.xxl,
                          gutter,
                          AppSpacing.xl + padding.bottom,
                        ),
                        child: child,
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
        PositionedDirectional(
          top: padding.top + AppSpacing.xs,
          end: gutter - AppSpacing.xs,
          child: AppBarButton(
            icon: AppIcons.close,
            tooltip: MaterialLocalizations.of(context).closeButtonTooltip,
            onPressed: onClose,
            onPhoto: true,
          ),
        ),
      ],
    );
  }
}

/// Sign up: the wordmark and close on one line, a rounded photo, then the form.
class _RegisterLayout extends StatelessWidget {
  const _RegisterLayout({required this.onClose, required this.child});

  final VoidCallback onClose;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    final gutter = AppSpacing.gutter(AppWindowSize.of(context));
    return SafeArea(
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: AppSpacing.readingWidth),
          child: ListView(
            padding: const EdgeInsetsDirectional.only(top: AppSpacing.md, bottom: AppSpacing.xl),
            children: [
              Padding(
                padding: EdgeInsetsDirectional.only(start: gutter, end: gutter - AppSpacing.xs),
                child: Row(
                  children: [
                    const BrandLockup(width: 170),
                    const Spacer(),
                    AppBarButton(
                      icon: AppIcons.close,
                      tooltip: MaterialLocalizations.of(context).closeButtonTooltip,
                      onPressed: onClose,
                    ),
                  ],
                ),
              ),
              const SizedBox(height: AppSpacing.md),
              // The photo runs wider than the form, as in the design.
              Padding(
                padding: const EdgeInsetsDirectional.symmetric(horizontal: AppSpacing.sm),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(22),
                  child: const AspectRatio(aspectRatio: 2.4, child: _Photo(alignment: Alignment(0, 0.2))),
                ),
              ),
              const SizedBox(height: AppSpacing.xl),
              Padding(
                padding: EdgeInsetsDirectional.symmetric(horizontal: gutter),
                child: child,
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _Photo extends StatelessWidget {
  const _Photo({required this.alignment});

  final Alignment alignment;

  @override
  Widget build(BuildContext context) => ColoredBox(
    color: context.colors.surfaceWarm,
    child: LayoutBuilder(
      builder: (context, constraints) => Image.asset(
        SignInScreen.photo,
        width: double.infinity,
        height: double.infinity,
        fit: BoxFit.cover,
        alignment: alignment,
        cacheWidth: (constraints.maxWidth * MediaQuery.devicePixelRatioOf(context)).round(),
        excludeFromSemantics: true,
        errorBuilder: (context, error, stack) => const SizedBox.shrink(),
      ),
    ),
  );
}

class _Title extends StatelessWidget {
  const _Title({required this.text, required this.centered});

  final String text;
  final bool centered;

  @override
  Widget build(BuildContext context) => Semantics(
    header: true,
    child: Text(
      text,
      textAlign: centered ? TextAlign.center : TextAlign.start,
      style: context.textStyles.display.copyWith(fontSize: context.isArabic ? 38 : 50, height: 1.05),
    ),
  );
}

class _Intro extends StatelessWidget {
  const _Intro({required this.text, required this.centered});

  final String text;
  final bool centered;

  @override
  Widget build(BuildContext context) => Text(
    text,
    textAlign: centered ? TextAlign.center : TextAlign.start,
    style: context.textStyles.body.copyWith(color: context.colors.textSecondary),
  );
}

/// The green button: a serif label and an arrow, or a spinner while working.
class _MainButton extends StatelessWidget {
  const _MainButton({required this.label, required this.busy, required this.onPressed});

  final String label;
  final bool busy;
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    final colors = context.colors;
    return FilledButton(
      onPressed: busy ? null : onPressed,
      style: FilledButton.styleFrom(
        backgroundColor: colors.brandPrimary,
        foregroundColor: colors.onBrandPrimary,
        disabledBackgroundColor: colors.brandPrimary.withValues(alpha: 0.7),
        minimumSize: const Size.fromHeight(62),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18)),
        textStyle: context.textStyles.headline.copyWith(fontSize: context.isArabic ? 20 : 26),
      ),
      child: busy
          ? SizedBox.square(
              dimension: 22,
              child: CircularProgressIndicator(strokeWidth: 2.5, color: colors.onBrandPrimary),
            )
          : Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Flexible(child: Text(label, textAlign: TextAlign.center)),
                const SizedBox(width: AppSpacing.md),
                const Icon(AppIcons.proceed),
              ],
            ),
    );
  }
}

/// "Or continue with", then Google and Apple side by side.
class _SocialButtons extends ConsumerWidget {
  const _SocialButtons({required this.busy});

  final bool busy;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = context.l10n;
    final colors = context.colors;
    void go(SocialProvider provider) => ref.read(signInControllerProvider.notifier).continueWith(provider);
    final rule = Expanded(child: Divider(color: colors.borderSubtle, thickness: 1));
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Row(
          children: [
            rule,
            Padding(
              padding: const EdgeInsetsDirectional.symmetric(horizontal: AppSpacing.md),
              child: Text(l10n.authOr, style: context.textStyles.bodySmall.copyWith(color: colors.textSecondary)),
            ),
            rule,
          ],
        ),
        const SizedBox(height: AppSpacing.md),
        Row(
          children: [
            Expanded(
              child: _SocialButton(
                label: l10n.authGoogle,
                mark: const _GoogleMark(),
                onPressed: busy ? null : () => go(SocialProvider.google),
              ),
            ),
            const SizedBox(width: AppSpacing.sm),
            Expanded(
              child: _SocialButton(
                label: l10n.authApple,
                mark: Icon(AppIcons.apple, size: 26, color: colors.textPrimary),
                onPressed: busy ? null : () => go(SocialProvider.apple),
              ),
            ),
          ],
        ),
      ],
    );
  }
}

class _SocialButton extends StatelessWidget {
  const _SocialButton({required this.label, required this.mark, required this.onPressed});

  final String label;
  final Widget mark;
  final VoidCallback? onPressed;

  @override
  Widget build(BuildContext context) {
    final colors = context.colors;
    return OutlinedButton(
      onPressed: onPressed,
      style: OutlinedButton.styleFrom(
        backgroundColor: colors.surfaceSecondary,
        foregroundColor: colors.textPrimary,
        minimumSize: const Size.fromHeight(56),
        padding: const EdgeInsetsDirectional.symmetric(horizontal: AppSpacing.sm),
        side: BorderSide(color: colors.borderSubtle),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          ExcludeSemantics(
            child: SizedBox.square(dimension: 24, child: Center(child: mark)),
          ),
          const SizedBox(width: AppSpacing.sm),
          Flexible(
            child: FittedBox(
              fit: BoxFit.scaleDown,
              child: Text(label, maxLines: 1, style: context.textStyles.label.copyWith(fontWeight: FontWeight.w500)),
            ),
          ),
        ],
      ),
    );
  }
}

/// Google's four-colour "G", drawn so no image asset is needed.
class _GoogleMark extends StatelessWidget {
  const _GoogleMark();

  @override
  Widget build(BuildContext context) => const CustomPaint(size: Size.square(22), painter: _GoogleMarkPainter());
}

class _GoogleMarkPainter extends CustomPainter {
  const _GoogleMarkPainter();

  static const _blue = Color(0xFF4285F4);
  static const _green = Color(0xFF34A853);
  static const _yellow = Color(0xFFFBBC05);
  static const _red = Color(0xFFEA4335);

  @override
  void paint(Canvas canvas, Size size) {
    final stroke = size.width * 0.2;
    final center = size.center(Offset.zero);
    final radius = (size.width - stroke) / 2;
    final rect = Rect.fromCircle(center: center, radius: radius);
    Paint paint(Color color) => Paint()
      ..color = color
      ..style = PaintingStyle.stroke
      ..strokeWidth = stroke;
    double degrees(double value) => value * 3.141592653589793 / 180;
    // Clockwise from the bar at three o'clock; the opening is at the top right.
    canvas
      ..drawArc(rect, degrees(0), degrees(45), false, paint(_blue))
      ..drawArc(rect, degrees(45), degrees(90), false, paint(_green))
      ..drawArc(rect, degrees(135), degrees(80), false, paint(_yellow))
      ..drawArc(rect, degrees(215), degrees(100), false, paint(_red))
      ..drawRect(Rect.fromLTWH(center.dx, center.dy - stroke / 2, radius + stroke / 2, stroke), Paint()..color = _blue);
  }

  @override
  bool shouldRepaint(_GoogleMarkPainter oldDelegate) => false;
}

/// "Don't have an account? Sign Up" and its reverse.
class _SwitchLink extends StatelessWidget {
  const _SwitchLink({required this.question, required this.action, required this.onPressed, this.underline = false});

  final String question;
  final String action;
  final VoidCallback onPressed;
  final bool underline;

  @override
  Widget build(BuildContext context) {
    final colors = context.colors;
    final styles = context.textStyles;
    return Wrap(
      alignment: WrapAlignment.center,
      crossAxisAlignment: WrapCrossAlignment.center,
      children: [
        Text(question, style: styles.bodySmall.copyWith(color: colors.textSecondary)),
        TextButton(
          onPressed: onPressed,
          style: TextButton.styleFrom(
            foregroundColor: underline ? colors.textPrimary : colors.brandPrimary,
            padding: const EdgeInsetsDirectional.symmetric(horizontal: AppSpacing.xs),
            textStyle: styles.label.copyWith(decoration: underline ? TextDecoration.underline : TextDecoration.none),
          ),
          child: Text(action),
        ),
      ],
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
