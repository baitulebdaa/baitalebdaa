import 'dart:async';

import '../../features/request/data/draft_store.dart';
import '../../features/request/data/request_repository.dart';
import '../../features/request/domain/consultation_request.dart';
import '../../features/request/domain/request_draft.dart';

/// In-memory requests for development and tests. Like Firestore, sending the same draft
/// twice returns the first request instead of creating a second.
class FakeRequestRepository implements RequestRepository {
  FakeRequestRepository({this.delay = const Duration(milliseconds: 400)});

  final Duration delay;
  final Map<String, ({String ownerUid, ConsultationRequest request})> _requests = {};
  final _changes = StreamController<void>.broadcast();

  List<ConsultationRequest> get all => [for (final entry in _requests.values) entry.request];

  @override
  Future<ConsultationRequest> submit({
    required RequestDraft draft,
    required String ownerUid,
    required String languageCode,
  }) async {
    await Future<void>.delayed(delay);
    final existing = _requests[draft.draftId];
    if (existing != null) return existing.request;
    final request = ConsultationRequest(
      id: draft.draftId,
      reference: referenceFor(draft.draftId),
      status: RequestStatus.submitted,
      createdAt: DateTime.now(),
      details: draft,
    );
    _requests[draft.draftId] = (ownerUid: ownerUid, request: request);
    _changes.add(null);
    return request;
  }

  /// Stands in for a staff member changing a status in the console.
  void setStatus(String id, RequestStatus status) {
    final entry = _requests[id];
    if (entry == null) return;
    final r = entry.request;
    _requests[id] = (
      ownerUid: entry.ownerUid,
      request: ConsultationRequest(
        id: r.id,
        reference: r.reference,
        status: status,
        createdAt: r.createdAt,
        details: r.details,
      ),
    );
    _changes.add(null);
  }

  @override
  Stream<List<ConsultationRequest>> watchMine(String ownerUid) async* {
    List<ConsultationRequest> mine() => [
      for (final entry in _requests.values)
        if (entry.ownerUid == ownerUid) entry.request,
    ]..sort((a, b) => b.createdAt!.compareTo(a.createdAt!));
    yield mine();
    await for (final _ in _changes.stream) {
      yield mine();
    }
  }

  Future<void> dispose() => _changes.close();
}
