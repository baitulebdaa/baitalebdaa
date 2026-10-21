import 'dart:convert';
import 'dart:math';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../domain/request_draft.dart';

/// Keeps the unfinished request on this device only, so closing the app never loses
/// answers. One draft at a time.
class DraftStore {
  DraftStore(this._preferences);

  static const _key = 'request.draft.v1';
  final SharedPreferencesAsync _preferences;

  /// The saved draft, or null if there is none or it cannot be read (an unreadable draft
  /// is dropped rather than blocking the flow).
  Future<RequestDraft?> load() async {
    final raw = await _preferences.getString(_key);
    if (raw == null) return null;
    try {
      return RequestDraft.fromJson(jsonDecode(raw) as Map<String, Object?>);
    } on Object {
      await clear();
      return null;
    }
  }

  Future<void> save(RequestDraft draft) => _preferences.setString(_key, jsonEncode(draft.toJson()));

  Future<void> clear() => _preferences.remove(_key);
}

/// Letters and digits that cannot be misread on the phone (no 0/O, 1/I/L).
const _safeAlphabet = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';

/// A new draft id: 20 characters from [_safeAlphabet]. It becomes the request's document
/// id, and its first five characters its reference, so a retried send keeps both.
String newDraftId([Random? random]) {
  final source = random ?? Random.secure();
  return List.generate(20, (_) => _safeAlphabet[source.nextInt(_safeAlphabet.length)]).join();
}

/// "BAE-7K3Q9" for draft id "7K3Q9…".
String referenceFor(String draftId) => 'BAE-${draftId.substring(0, 5)}';

final draftStoreProvider = Provider<DraftStore>((ref) => DraftStore(SharedPreferencesAsync()));

/// The draft read before the first frame, so Home can offer "Continue your request"
/// immediately. Overridden in bootstrap.
final initialDraftProvider = Provider<RequestDraft?>((ref) => null);
