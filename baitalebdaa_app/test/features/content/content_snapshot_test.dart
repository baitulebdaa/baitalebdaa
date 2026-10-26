import 'dart:io';

import 'package:baitalebdaa_app/core/failure/failure.dart';
import 'package:baitalebdaa_app/features/content/data/content_repository.dart';
import 'package:baitalebdaa_app/features/content/domain/content_models.dart';
import 'package:flutter_test/flutter_test.dart';

import '../../helpers/test_app.dart';

/// Guards the contract between tool/sync_content.mjs and the app. If the website changes
/// shape, these fail before a customer sees a blank price or a missing project.
void main() {
  final content = realSnapshot;

  test('carries the website catalogue', () {
    expect(content.services, hasLength(17));
    expect(content.projects, hasLength(6), reason: 'only owner-confirmed projects are exported');
    expect(content.business.emirates.map((e) => e.id), hasLength(7));
    expect(content.reviews, isNotEmpty);
  });

  test('every service price reference resolves to a published price', () {
    for (final service in content.services) {
      final starting = service.startingItemId;
      if (starting != null) expect(content.priceItem(starting), isNotNull, reason: service.slug);
      for (final id in service.pricing?.itemIds ?? const <String>[]) {
        expect(content.priceItem(id), isNotNull, reason: '${service.slug} → $id');
      }
    }
  });

  test('a starting price is only ever a direct, priced item', () {
    for (final service in content.services) {
      final item = content.startingPrice(service);
      if (item == null) continue;
      expect(service.pricing?.direct, isTrue, reason: service.slug);
      expect(item.priceType, anyOf(PriceType.from, PriceType.range), reason: service.slug);
    }
  });

  test('every price has display text in both languages', () {
    for (final item in content.pricing.groups.expand((group) => group.items)) {
      expect(item.display.en, isNotEmpty, reason: item.id);
      expect(item.display.ar, isNotEmpty, reason: item.id);
      if (item.priceType == PriceType.from || item.priceType == PriceType.range) {
        expect(item.display.en, contains(content.pricing.currency), reason: item.id);
      }
    }
  });

  test('project images are absolute website URLs', () {
    for (final image in content.projects.expand((project) => project.images)) {
      expect(Uri.parse(image.url).isAbsolute, isTrue, reason: image.url);
      expect(image.url, startsWith(content.business.siteUrl));
    }
  });

  test('every bundled photo exists in the app assets and comes from the website', () {
    final images = [
      for (final slide in content.heroSlides) slide.image,
      for (final service in content.services) service.image,
      for (final project in content.projects) project.cover,
    ];
    expect(content.heroSlides, hasLength(3), reason: 'the website hero has three slides');
    for (final image in images) {
      expect(File(image.asset).existsSync(), isTrue, reason: image.asset);
      expect(image.asset, endsWith('.webp'));
      expect(image.url, startsWith(content.business.siteUrl));
    }
  });

  test('every service carries its website summary, inclusions and FAQs in both languages', () {
    for (final service in content.services) {
      final detail = service.detail;
      expect(service.summary.en, isNotEmpty, reason: service.slug);
      expect(detail.summary.en, isNotEmpty, reason: service.slug);
      expect(detail.summary.ar, isNotEmpty, reason: service.slug);
      expect(detail.included.en, hasLength(detail.included.ar.length), reason: service.slug);
      for (final faq in detail.faqs) {
        expect(faq.question.ar, isNotEmpty, reason: service.slug);
        expect(faq.answer.ar, isNotEmpty, reason: service.slug);
      }
    }
  });

  test("project service links point at real services, so 'Plan a similar project' prefills", () {
    for (final project in content.projects) {
      expect(project.relatedServiceIds, isNotEmpty, reason: project.slug);
      for (final slug in project.relatedServiceIds) {
        expect(content.service(slug), isNotNull, reason: '${project.slug} → $slug');
      }
    }
  });

  test('contact facts are well-formed', () {
    final business = content.business;
    expect(business.phone, matches(RegExp(r'^\+\d{8,15}$')));
    expect(business.whatsapp, business.phone.substring(1));
    expect(business.email, contains('@'));
    expect(business.hours.opens, matches(RegExp(r'^\d{2}:\d{2}$')));
  });

  group('ContentRepository.parse', () {
    test('rejects an unsupported schema version', () {
      expect(() => ContentRepository.parse('{"schemaVersion": 99}'), throwsA(isA<DataFormatFailure>()));
    });

    test('rejects malformed JSON as a data-format failure', () {
      expect(() => ContentRepository.parse('not json'), throwsA(isA<DataFormatFailure>()));
      expect(() => ContentRepository.parse('{"schemaVersion": 1}'), throwsA(isA<DataFormatFailure>()));
    });
  });
}
