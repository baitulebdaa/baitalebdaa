import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// The emirate the visitor picked on Home ("UAE" until they pick one), kept on this
/// device. It only prefills a new request's emirate: prices and the free site survey are
/// the same in every emirate.
class PreferredEmirateStore {
  PreferredEmirateStore(this._preferences);

  static const _key = 'home.emirate.v1';
  final SharedPreferencesAsync _preferences;

  Future<String?> load() => _preferences.getString(_key);

  Future<void> save(String? emirateId) =>
      emirateId == null ? _preferences.remove(_key) : _preferences.setString(_key, emirateId);
}

final preferredEmirateStoreProvider = Provider<PreferredEmirateStore>(
  (ref) => PreferredEmirateStore(SharedPreferencesAsync()),
);

/// The picked emirate's id (website emirate ids), or null for the whole UAE.
class PreferredEmirateController extends Notifier<String?> {
  late Future<void> _loaded;

  @override
  String? build() {
    _loaded = ref.read(preferredEmirateStoreProvider).load().then((id) => state = id, onError: (Object _) {});
    return null;
  }

  Future<void> choose(String? emirateId) async {
    // A choice made before the stored one has loaded must not be overwritten by it.
    await _loaded;
    state = emirateId;
    await ref.read(preferredEmirateStoreProvider).save(emirateId);
  }
}

final preferredEmirateProvider = NotifierProvider<PreferredEmirateController, String?>(PreferredEmirateController.new);
