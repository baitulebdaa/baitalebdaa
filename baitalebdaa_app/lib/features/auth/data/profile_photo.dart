import 'dart:io';

import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:image_picker/image_picker.dart';
import 'package:path_provider/path_provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../../core/platform/auth_gateway.dart';

/// The profile photo (owner's design, 26 Oct 2026), kept on this phone only: the free
/// Firebase plan has no file storage, so it is never uploaded. One per account, removed on
/// sign-out or account deletion. Not offered on the web preview, which has no app folder.
class ProfilePhotoStore {
  ProfilePhotoStore(this._preferences);

  static const _prefix = 'account.photo.v1.';
  final SharedPreferencesAsync _preferences;

  static bool get supported => !kIsWeb;

  /// The saved photo's file, or null when there is none (or it was deleted).
  Future<File?> load(String uid) async {
    if (!supported) return null;
    final path = await _preferences.getString('$_prefix$uid');
    if (path == null) return null;
    final file = File(path);
    return file.existsSync() ? file : null;
  }

  /// Lets the customer pick a photo from the gallery and keeps a small copy. Returns false
  /// when they closed the picker.
  Future<bool> pick(String uid) async {
    final picked = await ImagePicker().pickImage(
      source: ImageSource.gallery,
      maxWidth: 600,
      maxHeight: 600,
      imageQuality: 85,
    );
    if (picked == null) return false;
    final folder = await getApplicationDocumentsDirectory();
    // A new name each time, so the image cache never shows the previous photo.
    final file = File('${folder.path}/profile_${uid}_${DateTime.now().millisecondsSinceEpoch}.jpg');
    await file.writeAsBytes(await picked.readAsBytes());
    await _deleteFile(uid);
    await _preferences.setString('$_prefix$uid', file.path);
    return true;
  }

  Future<void> clear(String uid) async {
    if (!supported) return;
    await _deleteFile(uid);
    await _preferences.remove('$_prefix$uid');
  }

  Future<void> _deleteFile(String uid) async {
    final old = await load(uid);
    if (old != null) await old.delete();
  }
}

final profilePhotoStoreProvider = Provider<ProfilePhotoStore>((ref) => ProfilePhotoStore(SharedPreferencesAsync()));

/// The signed-in account's photo, re-read when the account changes. Screens that change
/// it invalidate this.
final profilePhotoProvider = FutureProvider<File?>((ref) async {
  final user = ref.watch(authStateProvider).value;
  if (user == null || !user.hasAccount) return null;
  return ref.read(profilePhotoStoreProvider).load(user.uid);
});
