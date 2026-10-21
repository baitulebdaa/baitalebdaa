import 'dart:async';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/foundation.dart';

import '../../features/request/data/draft_store.dart';
import '../../features/request/data/request_repository.dart';
import '../../features/request/domain/consultation_request.dart';
import '../../features/request/domain/request_draft.dart';
import '../../features/request/domain/request_options.dart';
import '../../features/request/domain/request_validation.dart';
import '../failure/failure.dart';

/// [RequestRepository] on Cloud Firestore, collection `requests` (Phase 1 doc, section K).
/// The field list must match the `create` rule in firebase/firestore.rules exactly.
class FirestoreRequestRepository implements RequestRepository {
  FirestoreRequestRepository(this._firestore);

  final FirebaseFirestore _firestore;

  static const schemaVersion = 1;

  /// Firestore keeps an offline write queued and only completes it when the server
  /// confirms, so the screen stops waiting after this and says the request will send later.
  static const submitTimeout = Duration(seconds: 20);

  CollectionReference<Map<String, Object?>> get _requests => _firestore.collection('requests');

  @override
  Future<ConsultationRequest> submit({
    required RequestDraft draft,
    required String ownerUid,
    required String languageCode,
  }) async {
    final doc = _requests.doc(draft.draftId);
    try {
      await doc.set(toFirestore(draft, ownerUid: ownerUid, languageCode: languageCode)).timeout(submitTimeout);
    } on TimeoutException {
      throw const TimeoutFailure();
    } on FirebaseException catch (error) {
      // A retry after a lost acknowledgement hits the create-only rule. If the request is
      // already there in this owner's name, the first attempt succeeded.
      if (error.code == 'permission-denied') {
        final existing = await _readOwn(doc, ownerUid);
        if (existing != null) return existing;
      }
      throw failureFromFirestore(error);
    }
    return ConsultationRequest(
      id: draft.draftId,
      reference: referenceFor(draft.draftId),
      status: RequestStatus.submitted,
      createdAt: DateTime.now(),
      details: draft,
    );
  }

  @override
  Stream<List<ConsultationRequest>> watchMine(String ownerUid) => _requests
      .where('ownerUid', isEqualTo: ownerUid)
      .snapshots()
      .map((snapshot) {
        // Sorted here rather than in the query, so no composite index is needed.
        final requests = snapshot.docs.map((doc) => fromFirestore(doc.id, doc.data())).toList()
          ..sort((a, b) => (b.createdAt ?? DateTime(9999)).compareTo(a.createdAt ?? DateTime(9999)));
        return requests;
      })
      .transform(
        StreamTransformer.fromHandlers(
          handleError: (error, stack, sink) =>
              sink.addError(error is FirebaseException ? failureFromFirestore(error) : error, stack),
        ),
      );

  Future<ConsultationRequest?> _readOwn(DocumentReference<Map<String, Object?>> doc, String ownerUid) async {
    try {
      final snapshot = await doc.get();
      final data = snapshot.data();
      if (data == null || data['ownerUid'] != ownerUid) return null;
      return fromFirestore(snapshot.id, data);
    } on FirebaseException {
      return null;
    }
  }

  /// The document written for a new request. Only what the team needs; nothing derived.
  @visibleForTesting
  static Map<String, Object?> toFirestore(
    RequestDraft draft, {
    required String ownerUid,
    required String languageCode,
  }) {
    final sizeValue = draft.sizeUnknown ? null : draft.sizeValue;
    return {
      'schemaVersion': schemaVersion,
      'ownerUid': ownerUid,
      'reference': referenceFor(draft.draftId),
      'status': RequestStatus.submitted.name,
      'serviceIds': draft.serviceIds,
      'propertyType': draft.propertyType?.name,
      'emirateId': draft.emirateId,
      'area': draft.area.trim().isEmpty ? null : draft.area.trim(),
      'size': sizeValue == null ? null : {'value': sizeValue, 'unit': draft.sizeUnit.name},
      'budgetAed': draft.budgetToDiscuss ? null : draft.budgetAed,
      'stage': draft.stage?.name,
      'consultationType': draft.consultationType?.name,
      'preferredDate': draft.timeFlexible ? null : draft.preferredDate,
      'preferredWindow': draft.timeFlexible ? null : draft.preferredWindow?.name,
      'timeFlexible': draft.timeFlexible,
      'contact': {
        'name': draft.name.trim(),
        'phone': normalizePhone(draft.phone),
        'email': draft.email.trim().isEmpty ? null : draft.email.trim(),
      },
      'note': draft.note.trim().isEmpty ? null : draft.note.trim(),
      'locale': languageCode,
      'platform': defaultTargetPlatform.name,
      'createdAt': FieldValue.serverTimestamp(),
      'updatedAt': FieldValue.serverTimestamp(),
    };
  }

  @visibleForTesting
  static ConsultationRequest fromFirestore(String id, Map<String, Object?> data) {
    T? named<T extends Enum>(List<T> values, Object? name) => values.asNameMap()[name];
    final size = data['size'] as Map<String, Object?>?;
    final contact = (data['contact'] as Map<String, Object?>?) ?? const {};
    final created = data['createdAt'];
    return ConsultationRequest(
      id: id,
      reference: (data['reference'] as String?) ?? referenceFor(id),
      status: RequestStatus.parse(data['status']),
      createdAt: created is Timestamp ? created.toDate() : null,
      details: RequestDraft(
        draftId: id,
        serviceIds: [...?(data['serviceIds'] as List<Object?>?)?.whereType<String>()],
        propertyType: named(PropertyType.values, data['propertyType']),
        emirateId: data['emirateId'] as String?,
        area: (data['area'] as String?) ?? '',
        sizeValue: (size?['value'] as num?)?.toInt(),
        sizeUnit: named(AreaUnit.values, size?['unit']) ?? AreaUnit.sqft,
        sizeUnknown: size == null,
        budgetAed: (data['budgetAed'] as num?)?.toInt(),
        budgetToDiscuss: data['budgetAed'] == null,
        stage: named(ProjectStage.values, data['stage']),
        consultationType: named(ConsultationType.values, data['consultationType']),
        preferredDate: data['preferredDate'] as String?,
        preferredWindow: named(TimeWindow.values, data['preferredWindow']),
        timeFlexible: (data['timeFlexible'] as bool?) ?? false,
        name: (contact['name'] as String?) ?? '',
        phone: (contact['phone'] as String?) ?? '',
        email: (contact['email'] as String?) ?? '',
        note: (data['note'] as String?) ?? '',
      ),
    );
  }
}

/// Firestore error codes → [Failure].
Failure failureFromFirestore(FirebaseException error) => switch (error.code) {
  'unavailable' => const OfflineFailure(),
  'deadline-exceeded' => const TimeoutFailure(),
  'unauthenticated' => const UnauthorisedFailure(),
  // A missing database ("not-found") or rules that refuse the write mean the backend is
  // not ready for this build; the screen offers WhatsApp instead.
  'not-found' || 'permission-denied' || 'failed-precondition' => const UnavailableFailure(),
  'resource-exhausted' => const RateLimitedFailure(),
  _ => UnknownFailure('firestore/${error.code}'),
};
