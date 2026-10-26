import 'dart:async';

import '../platform/push_gateway.dart';

/// Push permission that behaves like a real device: undecided until asked, then granted.
/// Tests can call [simulateOpen] to drive notification routing.
class FakePushGateway implements PushGateway {
  PushPermission _permission = PushPermission.notDetermined;
  final _opened = StreamController<OpenedPush>.broadcast();

  @override
  Future<PushPermission> permission() async => _permission;

  @override
  Future<PushPermission> requestPermission() async => _permission = PushPermission.granted;

  @override
  Stream<String> tokenChanges() => Stream<String>.value('fake-device-token');

  @override
  Stream<OpenedPush> openedPushes() => _opened.stream;

  void simulateOpen(OpenedPush push) => _opened.add(push);

  Future<void> dispose() => _opened.close();
}
