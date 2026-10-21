import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_riverpod/misc.dart' show Override;

import '../core/fakes/debug_analytics_sink.dart';
import '../core/fakes/fake_assistant_gateway.dart';
import '../core/fakes/fake_auth_gateway.dart';
import '../core/fakes/fake_file_uploader.dart';
import '../core/fakes/fake_push_gateway.dart';
import '../core/fakes/fake_request_repository.dart';
import '../core/firebase/firebase_auth_gateway.dart';
import '../core/firebase/firestore_request_repository.dart';
import '../core/platform/analytics.dart';
import '../core/platform/auth_gateway.dart';
import '../core/platform/file_uploader.dart';
import '../core/platform/push_gateway.dart';
import '../features/assistant/data/assistant_gateway.dart';
import '../features/request/data/request_repository.dart';
import 'environment.dart';

/// Chooses the implementation behind each platform boundary.
///
/// Sign-in uses Firebase whenever it started; otherwise dev builds get in-memory fakes and
/// other builds keep each provider's safe "not configured" default, so browsing works and
/// anything needing the backend offers WhatsApp or phone instead. Uploads, push and the
/// assistant move to Firebase as each is built.
List<Override> platformOverrides(AppEnvironment environment, {required bool firebaseReady}) => [
  if (firebaseReady) ...[
    authGatewayProvider.overrideWithValue(FirebaseAuthGateway(FirebaseAuth.instance)),
    requestRepositoryProvider.overrideWithValue(FirestoreRequestRepository(FirebaseFirestore.instance)),
  ] else if (environment.useFakeBackend) ...[
    authGatewayProvider.overrideWith((ref) {
      final gateway = FakeAuthGateway();
      ref.onDispose(gateway.dispose);
      return gateway;
    }),
    requestRepositoryProvider.overrideWith((ref) {
      final repository = FakeRequestRepository();
      ref.onDispose(repository.dispose);
      return repository;
    }),
  ],
  if (environment.useFakeBackend) ...[
    fileUploaderProvider.overrideWithValue(FakeFileUploader()),
    pushGatewayProvider.overrideWith((ref) {
      final gateway = FakePushGateway();
      ref.onDispose(gateway.dispose);
      return gateway;
    }),
    analyticsSinkProvider.overrideWithValue(DebugAnalyticsSink()),
    assistantGatewayProvider.overrideWithValue(FakeAssistantGateway()),
  ],
];
