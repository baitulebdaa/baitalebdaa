import 'dart:async';
import 'dart:math';

import '../failure/failure.dart';
import '../platform/auth_gateway.dart';

/// In-memory auth for development and tests, with Firebase's rules for the errors the UI
/// handles. Accounts and the session are lost when the app restarts.
class FakeAuthGateway implements AuthGateway {
  FakeAuthGateway({AppUser? initialUser, Random? random}) : _user = initialUser, _random = random ?? Random();

  final Random _random;
  final _changes = StreamController<AppUser?>.broadcast();
  final Map<String, ({String password, AppUser user})> _accounts = {};
  AppUser? _user;

  /// Firebase's own minimum; the app asks for more (see AuthValidation).
  static const _minimumPassword = 6;

  @override
  Stream<AppUser?> authStateChanges() async* {
    yield _user;
    yield* _changes.stream;
  }

  @override
  AppUser? get currentUser => _user;

  @override
  Future<AppUser> signInWithEmail({required String email, required String password}) async {
    final account = _accounts[email.trim().toLowerCase()];
    if (account == null || account.password != password) throw const AuthFailure(AuthError.invalidCredentials);
    _set(account.user);
    return account.user;
  }

  /// Signs in a sample account for the provider, the same one every time.
  @override
  Future<AppUser?> signInWithProvider(SocialProvider provider) async {
    final email = '${provider.name}.customer@example.ae';
    final account = _accounts[email] ??= (
      password: '',
      user: AppUser(uid: _newUid(), isAnonymous: false, email: email, displayName: 'Sara Ahmed'),
    );
    _set(account.user);
    return account.user;
  }

  @override
  Future<AppUser> createAccount({required String name, required String email, required String password}) async {
    final key = email.trim().toLowerCase();
    if (_accounts.containsKey(key)) throw const AuthFailure(AuthError.emailInUse);
    if (password.length < _minimumPassword) throw const AuthFailure(AuthError.weakPassword);
    final user = AppUser(uid: _newUid(), isAnonymous: false, email: key, displayName: name.trim());
    _accounts[key] = (password: password, user: user);
    _set(user);
    return user;
  }

  @override
  Future<void> sendPasswordReset(String email) async {}

  @override
  Future<AppUser> ensureSignedIn() async {
    final existing = _user;
    if (existing != null) return existing;
    final guest = AppUser(uid: _newUid(), isAnonymous: true);
    _set(guest);
    return guest;
  }

  @override
  Future<void> signOut() async => _set(null);

  @override
  Future<void> deleteAccount() async {
    final email = _user?.email;
    if (email != null) _accounts.remove(email);
    _set(null);
  }

  String _newUid() => 'fake-${_random.nextInt(1 << 32).toRadixString(36)}';

  void _set(AppUser? user) {
    _user = user;
    _changes.add(user);
  }

  Future<void> dispose() => _changes.close();
}
