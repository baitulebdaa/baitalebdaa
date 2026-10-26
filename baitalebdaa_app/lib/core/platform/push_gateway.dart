import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

enum PushPermission { notDetermined, granted, denied, unsupported }

/// A notification the user tapped. [route] is an app path such as
/// `/account/requests/abc123`; the router applies its usual guards to it.
@immutable
class OpenedPush {
  const OpenedPush({required this.route, required this.kind});

  final String route;
  final String kind;
}

/// Push notifications boundary (Firebase Cloud Messaging from Phase 6). Permission is
/// requested only after a first successful submit, never at launch.
abstract interface class PushGateway {
  Future<PushPermission> permission();

  Future<PushPermission> requestPermission();

  /// Device token for this installation; emits again when it rotates.
  Stream<String> tokenChanges();

  Stream<OpenedPush> openedPushes();
}

class UnconfiguredPushGateway implements PushGateway {
  const UnconfiguredPushGateway();

  @override
  Future<PushPermission> permission() async => PushPermission.unsupported;

  @override
  Future<PushPermission> requestPermission() async => PushPermission.unsupported;

  @override
  Stream<String> tokenChanges() => const Stream<String>.empty();

  @override
  Stream<OpenedPush> openedPushes() => const Stream<OpenedPush>.empty();
}

final pushGatewayProvider = Provider<PushGateway>((ref) => const UnconfiguredPushGateway());
