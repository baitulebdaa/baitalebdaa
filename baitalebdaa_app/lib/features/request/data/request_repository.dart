import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/failure/failure.dart';
import '../../../core/platform/auth_gateway.dart';
import '../domain/consultation_request.dart';
import '../domain/request_draft.dart';

/// Where consultation requests are sent and read back.
///
/// On the free Firebase plan there are no Cloud Functions, so requests are written
/// straight to Firestore and the security rules (firebase/firestore.rules) do the
/// server-side checking: a customer can only create a request in their own name, in the
/// `submitted` state, with valid fields, and can read only their own requests.
abstract interface class RequestRepository {
  /// Sends [draft] as [ownerUid]. Safe to retry: the draft id is the document id, so a
  /// second attempt returns the request the first one created. Errors with a [Failure].
  Future<ConsultationRequest> submit({
    required RequestDraft draft,
    required String ownerUid,
    required String languageCode,
  });

  /// The owner's requests, newest first, updating live as staff change their status.
  Stream<List<ConsultationRequest>> watchMine(String ownerUid);
}

class UnconfiguredRequestRepository implements RequestRepository {
  const UnconfiguredRequestRepository();

  @override
  Future<ConsultationRequest> submit({
    required RequestDraft draft,
    required String ownerUid,
    required String languageCode,
  }) => Future<ConsultationRequest>.error(const UnavailableFailure());

  @override
  Stream<List<ConsultationRequest>> watchMine(String ownerUid) => Stream.value(const []);
}

final requestRepositoryProvider = Provider<RequestRepository>((ref) => const UnconfiguredRequestRepository());

/// The signed-in user's requests (accounts and silent guests alike); empty when signed out.
final myRequestsProvider = StreamProvider<List<ConsultationRequest>>((ref) {
  final user = ref.watch(authStateProvider).value;
  if (user == null) return Stream.value(const []);
  return ref.watch(requestRepositoryProvider).watchMine(user.uid);
});
