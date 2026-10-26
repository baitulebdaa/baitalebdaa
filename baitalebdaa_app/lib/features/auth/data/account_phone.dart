import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// The mobile number given when creating an account, kept on this device only (there is
/// no profile database on the free Firebase plan). It prefills new requests, and is
/// forgotten on sign-out or account deletion.
class AccountPhoneStore {
  AccountPhoneStore(this._preferences);

  static const _key = 'account.phone.v1';
  final SharedPreferencesAsync _preferences;

  /// The number in E.164, or null when none was given.
  Future<String?> load() => _preferences.getString(_key);

  Future<void> save(String e164) => _preferences.setString(_key, e164);

  Future<void> clear() => _preferences.remove(_key);
}

final accountPhoneStoreProvider = Provider<AccountPhoneStore>((ref) => AccountPhoneStore(SharedPreferencesAsync()));
