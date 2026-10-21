import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../failure/failure.dart';

@immutable
class UploadProgress {
  const UploadProgress({required this.bytesSent, required this.totalBytes});

  final int bytesSent;
  final int totalBytes;

  double get fraction => totalBytes == 0 ? 0 : bytesSent / totalBytes;
  bool get isComplete => totalBytes > 0 && bytesSent >= totalBytes;
}

/// Uploads one local file to a controlled storage path (see the Phase 1 doc, section L).
/// The stream reports real byte progress and completes when the upload is stored; it
/// errors with a [Failure] otherwise. Cancelling the subscription cancels the upload.
abstract interface class FileUploader {
  Stream<UploadProgress> upload({required String localPath, required String storagePath, required String contentType});

  Future<void> delete(String storagePath);
}

class UnconfiguredFileUploader implements FileUploader {
  const UnconfiguredFileUploader();

  @override
  Stream<UploadProgress> upload({
    required String localPath,
    required String storagePath,
    required String contentType,
  }) => Stream<UploadProgress>.error(const UnavailableFailure());

  @override
  Future<void> delete(String storagePath) => Future<void>.error(const UnavailableFailure());
}

final fileUploaderProvider = Provider<FileUploader>((ref) => const UnconfiguredFileUploader());
