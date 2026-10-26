import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

@immutable
class UploadLimits {
  const UploadLimits({required this.maxFiles, required this.maxImageMegabytes, required this.maxPdfMegabytes});

  final int maxFiles;
  final int maxImageMegabytes;
  final int maxPdfMegabytes;
}

/// Operational switches the business can change without a release (Remote Config from
/// Phase 6). Every value has a bundled default, so the app behaves sensibly when Remote
/// Config is unreachable or not configured.
@immutable
class RemoteSettingsValues {
  const RemoteSettingsValues({
    required this.bookingEnabled,
    required this.factoryVisitEnabled,
    required this.maintenanceMode,
    required this.minSupportedBuild,
    required this.uploadLimits,
    this.supportedEmirateIds,
    this.enabledServiceIds,
    this.supportPhoneOverride,
    this.whatsappOverride,
  });

  /// Defaults shipped in the app. The upload limits are the proposal from the Phase 1 doc
  /// and await business confirmation; the factory visit stays off until the business
  /// confirms it is an offered consultation type.
  static const defaults = RemoteSettingsValues(
    bookingEnabled: true,
    factoryVisitEnabled: false,
    maintenanceMode: false,
    minSupportedBuild: 0,
    uploadLimits: UploadLimits(maxFiles: 10, maxImageMegabytes: 15, maxPdfMegabytes: 20),
  );

  final bool bookingEnabled;
  final bool factoryVisitEnabled;
  final bool maintenanceMode;
  final int minSupportedBuild;
  final UploadLimits uploadLimits;

  /// `null` means "use the website snapshot" (all seven emirates / all services).
  final List<String>? supportedEmirateIds;
  final List<String>? enabledServiceIds;

  /// Emergency overrides only; `null` means "use the phone number from the website snapshot".
  final String? supportPhoneOverride;
  final String? whatsappOverride;
}

abstract interface class RemoteSettings {
  RemoteSettingsValues get current;

  Stream<RemoteSettingsValues> changes();

  Future<void> refresh();
}

class BundledRemoteSettings implements RemoteSettings {
  const BundledRemoteSettings();

  @override
  RemoteSettingsValues get current => RemoteSettingsValues.defaults;

  @override
  Stream<RemoteSettingsValues> changes() => const Stream<RemoteSettingsValues>.empty();

  @override
  Future<void> refresh() async {}
}

final remoteSettingsProvider = Provider<RemoteSettings>((ref) => const BundledRemoteSettings());

final remoteSettingsValuesProvider = StreamProvider<RemoteSettingsValues>((ref) async* {
  final settings = ref.watch(remoteSettingsProvider);
  yield settings.current;
  yield* settings.changes();
});
