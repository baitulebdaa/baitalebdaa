import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// What the visitor saved with a heart or bookmark, kept on this device only (no account
/// needed): project slugs and service slugs, each under its own key.
final savedItemsPreferencesProvider = Provider<SharedPreferencesAsync>((ref) => SharedPreferencesAsync());

/// One saved list. Empty until loaded; an unreadable list counts as empty.
class SavedItemsController extends Notifier<Set<String>> {
  SavedItemsController(this._key);

  final String _key;
  late Future<void> _loaded;

  @override
  Set<String> build() {
    _loaded = ref
        .read(savedItemsPreferencesProvider)
        .getStringList(_key)
        .then((slugs) => state = {...?slugs}, onError: (Object _) {});
    return const {};
  }

  Future<void> toggle(String slug) async {
    // A tap before the saved list has loaded must not be undone when it arrives.
    await _loaded;
    state = state.contains(slug) ? ({...state}..remove(slug)) : {...state, slug};
    await ref.read(savedItemsPreferencesProvider).setStringList(_key, state.toList());
  }
}

final savedProjectsProvider = NotifierProvider<SavedItemsController, Set<String>>(
  () => SavedItemsController('projects.saved.v1'),
);

final savedServicesProvider = NotifierProvider<SavedItemsController, Set<String>>(
  () => SavedItemsController('services.saved.v1'),
);
