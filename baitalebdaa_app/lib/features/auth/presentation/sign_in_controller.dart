import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/platform/auth_gateway.dart';
import '../../request/domain/request_validation.dart';
import '../data/account_phone.dart';
import '../data/profile_photo.dart';

enum SignInMode { signIn, register, reset }

@immutable
class SignInState {
  const SignInState({this.mode = SignInMode.signIn, this.isSubmitting = false, this.error, this.resetSentTo});

  final SignInMode mode;
  final bool isSubmitting;

  /// The last attempt's failure, shown under the form until the next attempt.
  final Object? error;

  /// Set after a reset link was requested, to confirm it without revealing whether the
  /// email has an account.
  final String? resetSentTo;
}

/// Drives the sign-in screen. Navigation after success is the router's job: it reacts to
/// the auth state, so this controller never pushes routes.
class SignInController extends Notifier<SignInState> {
  @override
  SignInState build() => const SignInState();

  void setMode(SignInMode mode) => state = SignInState(mode: mode);

  /// [phone] is only used when creating an account, and may be empty.
  Future<void> submit({
    required String name,
    required String email,
    required String password,
    String phone = '',
  }) async {
    if (state.isSubmitting) return;
    final mode = state.mode;
    state = SignInState(mode: mode, isSubmitting: true);
    final auth = ref.read(authGatewayProvider);
    try {
      switch (mode) {
        case SignInMode.signIn:
          await auth.signInWithEmail(email: email, password: password);
        case SignInMode.register:
          await auth.createAccount(name: name, email: email, password: password);
          if (normalizePhone(phone) case final e164?) await ref.read(accountPhoneStoreProvider).save(e164);
        case SignInMode.reset:
          await auth.sendPasswordReset(email);
      }
      if (!ref.mounted) return;
      state = SignInState(mode: mode, resetSentTo: mode == SignInMode.reset ? email.trim() : null);
    } on Object catch (error) {
      if (!ref.mounted) return;
      state = SignInState(mode: mode, error: error);
    }
  }

  /// Google or Apple. Closing their window is not an error: the form simply stays.
  Future<void> continueWith(SocialProvider provider) async {
    if (state.isSubmitting) return;
    final mode = state.mode;
    state = SignInState(mode: mode, isSubmitting: true);
    try {
      await ref.read(authGatewayProvider).signInWithProvider(provider);
      if (!ref.mounted) return;
      state = SignInState(mode: mode);
    } on Object catch (error) {
      if (!ref.mounted) return;
      state = SignInState(mode: mode, error: error);
    }
  }
}

final signInControllerProvider = NotifierProvider.autoDispose<SignInController, SignInState>(SignInController.new);

/// Session-level actions used by the profile screen.
class SessionActions {
  SessionActions(this._ref);

  final Ref _ref;

  Future<void> signOut() async {
    final uid = _ref.read(authGatewayProvider).currentUser?.uid;
    await _ref.read(authGatewayProvider).signOut();
    await _forgetDeviceDetails(uid);
  }

  /// Deletes the sign-in. Requests already sent stay with the team (the profile screen says
  /// so before asking); a stale session errors with an [AuthFailure] asking to sign in again.
  Future<void> deleteAccount() async {
    final uid = _ref.read(authGatewayProvider).currentUser?.uid;
    await _ref.read(authGatewayProvider).deleteAccount();
    await _forgetDeviceDetails(uid);
  }

  /// The number and photo kept on this phone for the account.
  Future<void> _forgetDeviceDetails(String? uid) async {
    await _ref.read(accountPhoneStoreProvider).clear();
    if (uid != null) await _ref.read(profilePhotoStoreProvider).clear(uid);
  }
}

final sessionActionsProvider = Provider<SessionActions>(SessionActions.new);
