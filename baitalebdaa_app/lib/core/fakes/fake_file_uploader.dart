import '../platform/file_uploader.dart';

/// Simulates an upload with real-looking progress so upload UI can be built and tested
/// without Firebase Storage. Nothing leaves the device.
class FakeFileUploader implements FileUploader {
  FakeFileUploader({
    this.simulatedBytes = 2 * 1024 * 1024,
    this.steps = 8,
    this.stepDelay = const Duration(milliseconds: 120),
  });

  final int simulatedBytes;
  final int steps;
  final Duration stepDelay;
  final Set<String> stored = {};

  @override
  Stream<UploadProgress> upload({
    required String localPath,
    required String storagePath,
    required String contentType,
  }) async* {
    for (var step = 1; step <= steps; step++) {
      await Future<void>.delayed(stepDelay);
      yield UploadProgress(bytesSent: simulatedBytes * step ~/ steps, totalBytes: simulatedBytes);
    }
    stored.add(storagePath);
  }

  @override
  Future<void> delete(String storagePath) async => stored.remove(storagePath);
}
