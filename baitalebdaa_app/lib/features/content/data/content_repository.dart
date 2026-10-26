import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/failure/failure.dart';
import '../domain/content_models.dart';

/// Loads the public content snapshot. Today that is the bundled file generated from the
/// website; Phase W adds the website's read-only endpoint in front of it, with this
/// bundle as the offline fallback.
class ContentRepository {
  ContentRepository(this._bundle);

  static const assetPath = 'assets/content/content.json';

  /// The snapshot layout this build understands. tool/sync_content.mjs writes the same number.
  static const supportedSchemaVersion = 1;

  final AssetBundle _bundle;

  Future<ContentSnapshot> load() async {
    final String raw;
    try {
      raw = await _bundle.loadString(assetPath);
    } on FlutterError catch (error) {
      throw DataFormatFailure('content snapshot missing: ${error.message}');
    }
    return parse(raw);
  }

  static ContentSnapshot parse(String raw) {
    try {
      final json = jsonDecode(raw) as Map<String, Object?>;
      final version = json['schemaVersion'];
      if (version != supportedSchemaVersion) {
        throw DataFormatFailure('content schema $version, expected $supportedSchemaVersion');
      }
      return ContentSnapshot.fromJson(json);
    } on DataFormatFailure {
      rethrow;
    } on Object catch (error) {
      throw DataFormatFailure('content snapshot unreadable: $error');
    }
  }
}

final contentRepositoryProvider = Provider<ContentRepository>((ref) => ContentRepository(rootBundle));

/// The public content. Loaded once and kept for the app's lifetime; bootstrap warms it
/// before the first frame so screens rarely see the loading state.
final contentSnapshotProvider = FutureProvider<ContentSnapshot>(
  (ref) => ref.watch(contentRepositoryProvider).load(),
  // A bad bundled file will not fix itself; fail once and show the fatal state.
  retry: (_, _) => null,
);
