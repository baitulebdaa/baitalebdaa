import 'dart:io';
import 'dart:math';

import 'package:baitalebdaa_app/core/firebase/firestore_request_repository.dart';
import 'package:baitalebdaa_app/features/request/data/draft_store.dart';
import 'package:baitalebdaa_app/features/request/domain/consultation_request.dart';
import 'package:baitalebdaa_app/features/request/domain/request_draft.dart';
import 'package:baitalebdaa_app/features/request/domain/request_options.dart';
import 'package:baitalebdaa_app/features/request/domain/request_validation.dart';
import 'package:flutter_test/flutter_test.dart';

import '../../helpers/test_app.dart';

const _complete = RequestDraft(
  draftId: 'K7Q9ZABCDEFGHJKMNPQR',
  serviceIds: ['interior-design'],
  emirateId: 'dubai',
  consultationType: ConsultationType.phone,
  name: 'Sara Ahmed',
  phone: '050 123 4567',
);

/// The quoted list that follows [marker] in the security rules.
List<String> _rulesList(String rules, String marker) {
  final start = rules.indexOf(marker);
  expect(start, isNot(-1), reason: marker);
  final open = rules.indexOf('[', start);
  final close = rules.indexOf(']', open);
  return RegExp("'([^']+)'").allMatches(rules.substring(open, close)).map((m) => m.group(1)!).toList();
}

void main() {
  group('normalizePhone', () {
    test('UAE numbers typed locally or with a code become E.164', () {
      expect(normalizePhone('050 123 4567'), '+971501234567');
      expect(normalizePhone('0501234567'), '+971501234567');
      expect(normalizePhone('971501234567'), '+971501234567');
      expect(normalizePhone('00971 50 123 4567'), '+971501234567');
      expect(normalizePhone('+971 (50) 123-4567'), '+971501234567');
    });

    test('other countries keep their code; nonsense is refused', () {
      expect(normalizePhone('+44 7700 900123'), '+447700900123');
      expect(normalizePhone(''), isNull);
      expect(normalizePhone('12345'), isNull);
      expect(normalizePhone('call me'), isNull);
    });
  });

  group('toggleService', () {
    test('adds and removes', () {
      expect(toggleService(const [], 'a'), ['a']);
      expect(toggleService(const ['a', 'b'], 'a'), ['b']);
    });

    test('caps at three services', () {
      expect(toggleService(const ['a', 'b', 'c'], 'd'), ['a', 'b', 'c']);
    });

    test('"not sure" stands alone', () {
      expect(toggleService(const ['a', 'b'], kServiceNotSure), [kServiceNotSure]);
      expect(toggleService(const [kServiceNotSure], 'a'), ['a']);
    });
  });

  group('validateStep', () {
    test('a complete request has no issues', () {
      expect(firstIncompleteStep(_complete), isNull);
    });

    test('only services, location, consultation and contact are required', () {
      const empty = RequestDraft(draftId: 'x');
      final required = [
        for (final step in RequestStep.values)
          if (validateStep(step, empty).isNotEmpty) step,
      ];
      expect(required, [RequestStep.services, RequestStep.location, RequestStep.consultation, RequestStep.contact]);
      expect(required.where((step) => step.isOptional), isEmpty);
    });

    test('contact needs a name and a phone number; email is optional but checked', () {
      expect(validateStep(RequestStep.contact, _complete.copyWith(phone: '123')), {RequestIssue.phoneInvalid});
      expect(validateStep(RequestStep.contact, _complete.copyWith(name: '  ')), {RequestIssue.nameRequired});
      expect(validateStep(RequestStep.contact, _complete.copyWith(email: 'sara@')), {RequestIssue.emailInvalid});
      expect(validateStep(RequestStep.contact, _complete.copyWith(email: 'sara@example.ae')), isEmpty);
    });

    test('numbers must be positive and within range; the note is capped', () {
      expect(validateStep(RequestStep.size, _complete.copyWith(sizeValue: 0)), {RequestIssue.sizeInvalid});
      expect(validateStep(RequestStep.budget, _complete.copyWith(budgetAed: -1)), {RequestIssue.budgetInvalid});
      expect(validateStep(RequestStep.details, _complete.copyWith(note: 'x' * (RequestLimits.maxNote + 1))), {
        RequestIssue.noteTooLong,
      });
    });
  });

  group('reference', () {
    test('ids use the unambiguous alphabet the security rules accept', () {
      final id = newDraftId(Random(1));
      expect(id, matches(RegExp(r'^[2-9A-HJKMNP-Z]{20}$')));
      expect(referenceFor(id), 'BAE-${id.substring(0, 5)}');
    });
  });

  group('status', () {
    test('only staff can confirm an appointment', () {
      expect(canTransition(RequestStatus.inReview, RequestStatus.scheduled, RequestActor.staff), isTrue);
      for (final from in RequestStatus.values) {
        expect(canTransition(from, RequestStatus.scheduled, RequestActor.customer), isFalse, reason: from.name);
      }
    });

    test('finished requests stay finished', () {
      for (final to in RequestStatus.values) {
        for (final actor in RequestActor.values) {
          expect(canTransition(RequestStatus.completed, to, actor), isFalse);
          expect(canTransition(RequestStatus.cancelled, to, actor), isFalse);
        }
      }
    });

    test('an unknown status from a newer staff tool reads as received', () {
      expect(RequestStatus.parse('somethingNew'), RequestStatus.submitted);
    });
  });

  group('Firestore document matches the security rules', () {
    final rules = File('firebase/firestore.rules').readAsStringSync();
    final doc = FirestoreRequestRepository.toFirestore(_complete, ownerUid: 'u1', languageCode: 'en');

    test('field names', () {
      expect(doc.keys.toSet(), _rulesList(rules, 'd.keys().hasOnly(').toSet());
      expect(doc.keys, containsAll(_rulesList(rules, 'd.keys().hasAll(')));
      expect((doc['contact']! as Map).keys.toSet(), _rulesList(rules, 'c.keys().hasOnly(').toSet());
    });

    test('allowed values', () {
      expect(_rulesList(rules, "optionalChoice(d, 'propertyType'"), PropertyType.values.map((v) => v.name));
      expect(_rulesList(rules, "optionalChoice(d, 'stage'"), ProjectStage.values.map((v) => v.name));
      expect(_rulesList(rules, 'd.consultationType in'), ConsultationType.values.map((v) => v.name));
      expect(_rulesList(rules, "optionalChoice(d, 'preferredWindow'"), TimeWindow.values.map((v) => v.name));
      expect(_rulesList(rules, 'd.emirateId in'), realSnapshot.business.emirates.map((e) => e.id));
    });

    test('values', () {
      expect(doc['status'], 'submitted');
      expect(doc['reference'], 'BAE-K7Q9Z');
      expect(doc['schemaVersion'], FirestoreRequestRepository.schemaVersion);
      expect((doc['contact']! as Map)['phone'], '+971501234567');
      expect(doc['note'], isNull, reason: 'empty text is stored as null, not ""');
    });
  });
}
