import 'package:collection/collection.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

import 'localized.dart';

part 'content_models.freezed.dart';
part 'content_models.g.dart';

/// Everything public the app shows, generated from the website's source by
/// tool/sync_content.mjs. The website stays the source of truth; nothing here is edited
/// by hand or duplicated in Firebase.
@freezed
abstract class ContentSnapshot with _$ContentSnapshot {
  const factory ContentSnapshot({
    required int schemaVersion,
    required List<HeroSlide> heroSlides,
    required AssistantCopy assistant,
    required BusinessFacts business,
    required List<Service> services,
    required Pricing pricing,
    required List<Project> projects,
    required List<ProcessStep> process,
    required List<Review> reviews,
  }) = _ContentSnapshot;

  const ContentSnapshot._();

  factory ContentSnapshot.fromJson(Map<String, Object?> json) => _$ContentSnapshotFromJson(json);

  /// The website's main positioning statement (its first hero slide).
  HeroSlide get hero => heroSlides.first;

  PriceItem? priceItem(String id) =>
      pricing.groups.expand((group) => group.items).firstWhereOrNull((item) => item.id == id);

  Service? service(String slug) => services.firstWhereOrNull((service) => service.slug == slug);

  Project? project(String slug) => projects.firstWhereOrNull((project) => project.slug == slug);

  /// Real projects that used [serviceSlug].
  List<Project> projectsFor(String serviceSlug) =>
      projects.where((project) => project.relatedServiceIds.contains(serviceSlug)).toList();

  /// The service's own published starting price, or null when the website publishes none
  /// for it (it is then "quoted after a free site survey").
  PriceItem? startingPrice(Service service) {
    final id = service.startingItemId;
    return id == null ? null : priceItem(id);
  }
}

/// A photo the app bundles (phone-sized WebP generated from the website's own image), with
/// the website URL of the original.
@freezed
abstract class BundledImage with _$BundledImage {
  const factory BundledImage({
    required String asset,
    required String url,

    /// Descriptive alt text where the website has one.
    required LocalizedText? alt,
  }) = _BundledImage;

  factory BundledImage.fromJson(Map<String, Object?> json) => _$BundledImageFromJson(json);
}

/// One of the website's hero slides, shown as a Home banner.
@freezed
abstract class HeroSlide with _$HeroSlide {
  const factory HeroSlide({
    required LocalizedText eyebrow,
    required LocalizedText title,
    required LocalizedText body,
    required BundledImage image,
  }) = _HeroSlide;

  factory HeroSlide.fromJson(Map<String, Object?> json) => _$HeroSlideFromJson(json);
}

/// The website's "Ask Ali" assistant wording, so the app's assistant introduces itself and
/// states its limits exactly as the website does.
@freezed
abstract class AssistantCopy with _$AssistantCopy {
  const factory AssistantCopy({
    required LocalizedText name,
    required LocalizedText subtitle,
    required LocalizedText intro,
    required LocalizedList starters,
    required LocalizedText placeholder,
    required LocalizedText inputLabel,
    required LocalizedText send,
    required LocalizedText startOver,
    required LocalizedText typing,
    required LocalizedText unavailable,

    /// "AI can make mistakes. For a confirmed quote," followed by [disclaimerLink].
    required LocalizedText disclaimer,
    required LocalizedText disclaimerLink,
  }) = _AssistantCopy;

  factory AssistantCopy.fromJson(Map<String, Object?> json) => _$AssistantCopyFromJson(json);
}

@freezed
abstract class BusinessFacts with _$BusinessFacts {
  const factory BusinessFacts({
    required LocalizedText name,

    /// E.164, e.g. +971582621717.
    required String phone,

    /// Digits only, for wa.me links.
    required String whatsapp,
    required String email,
    required LocalizedText address,
    required OpeningHours hours,
    required List<Emirate> emirates,

    /// A neutral opening message for WhatsApp. It never carries the user's details.
    required LocalizedText whatsappMessage,
    required List<StudioFact> studioFacts,
    required List<SocialProfile> socialProfiles,
    required String siteUrl,
  }) = _BusinessFacts;

  factory BusinessFacts.fromJson(Map<String, Object?> json) => _$BusinessFactsFromJson(json);
}

@freezed
abstract class OpeningHours with _$OpeningHours {
  const factory OpeningHours({
    /// Lower-case English weekday names, e.g. `monday`.
    required List<String> days,

    /// 24-hour `HH:mm`, Asia/Dubai.
    required String opens,
    required String closes,
    required LocalizedText label,
  }) = _OpeningHours;

  factory OpeningHours.fromJson(Map<String, Object?> json) => _$OpeningHoursFromJson(json);
}

@freezed
abstract class Emirate with _$Emirate {
  const factory Emirate({required String id, required LocalizedText name}) = _Emirate;

  factory Emirate.fromJson(Map<String, Object?> json) => _$EmirateFromJson(json);
}

@freezed
abstract class StudioFact with _$StudioFact {
  const factory StudioFact({required LocalizedText value, required LocalizedText label}) = _StudioFact;

  factory StudioFact.fromJson(Map<String, Object?> json) => _$StudioFactFromJson(json);
}

@freezed
abstract class SocialProfile with _$SocialProfile {
  const factory SocialProfile({required String network, required String url}) = _SocialProfile;

  factory SocialProfile.fromJson(Map<String, Object?> json) => _$SocialProfileFromJson(json);
}

@freezed
abstract class Service with _$Service {
  const factory Service({
    /// The website's slug; also the `serviceId` stored on consultation requests.
    required String slug,
    required LocalizedText name,

    /// The website's one-line description of the service.
    required LocalizedText summary,

    /// The website's photo for this service.
    required BundledImage image,

    /// The website service page's own summary, inclusions and FAQs.
    required ServiceDetail detail,

    /// Published prices that relate to this service, or null when none are published.
    required ServicePricing? pricing,
    required String? startingItemId,
  }) = _Service;

  factory Service.fromJson(Map<String, Object?> json) => _$ServiceFromJson(json);
}

@freezed
abstract class ServiceDetail with _$ServiceDetail {
  const factory ServiceDetail({
    required LocalizedText summary,
    required LocalizedList included,
    required List<Faq> faqs,
  }) = _ServiceDetail;

  factory ServiceDetail.fromJson(Map<String, Object?> json) => _$ServiceDetailFromJson(json);
}

@freezed
abstract class Faq with _$Faq {
  const factory Faq({required LocalizedText question, required LocalizedText answer}) = _Faq;

  factory Faq.fromJson(Map<String, Object?> json) => _$FaqFromJson(json);
}

@freezed
abstract class ServicePricing with _$ServicePricing {
  const factory ServicePricing({
    /// True when the items are this service's own prices; false when they are related
    /// prices for part of the work, which must never be shown as the service's price.
    required bool direct,
    required List<String> itemIds,
  }) = _ServicePricing;

  factory ServicePricing.fromJson(Map<String, Object?> json) => _$ServicePricingFromJson(json);
}

@freezed
abstract class Pricing with _$Pricing {
  const factory Pricing({
    required String currency,
    required bool vatInclusive,
    required double vatRate,
    required LocalizedText disclaimer,
    required List<PriceGroup> groups,
  }) = _Pricing;

  factory Pricing.fromJson(Map<String, Object?> json) => _$PricingFromJson(json);
}

@freezed
abstract class PriceGroup with _$PriceGroup {
  const factory PriceGroup({
    required String id,
    required LocalizedText kicker,
    required LocalizedText title,
    required LocalizedText subtitle,
    required List<PriceItem> items,
  }) = _PriceGroup;

  factory PriceGroup.fromJson(Map<String, Object?> json) => _$PriceGroupFromJson(json);
}

enum PriceType { from, range, custom, free }

enum PriceUnit { linearMetre, sqft }

@freezed
abstract class PriceItem with _$PriceItem {
  const factory PriceItem({
    required String id,
    required PriceType priceType,
    required num? min,
    required num? max,
    required PriceUnit? unit,
    required bool plus,
    required bool additional,
    required LocalizedText name,

    /// Formatted by the website's own formatPrice(), e.g. "From AED 1,800 / linear metre".
    required LocalizedText display,
  }) = _PriceItem;

  factory PriceItem.fromJson(Map<String, Object?> json) => _$PriceItemFromJson(json);
}

@freezed
abstract class Project with _$Project {
  const factory Project({
    required String slug,
    required LocalizedText title,
    required LocalizedText place,
    required LocalizedText subtitle,
    required LocalizedText description,
    required LocalizedText location,
    required LocalizedText sector,
    required LocalizedText size,
    required String year,
    required LocalizedText service,
    required LocalizedList scope,
    required BundledImage cover,

    /// Services this project used, as website service slugs.
    required List<String> relatedServiceIds,
    required List<ProjectImage> images,
  }) = _Project;

  factory Project.fromJson(Map<String, Object?> json) => _$ProjectFromJson(json);
}

@freezed
abstract class ProjectImage with _$ProjectImage {
  const factory ProjectImage({
    required String url,

    /// Descriptive alt text where the website has one; otherwise null and screens fall
    /// back to "{project title}, photo n of m", as the website does.
    required LocalizedText? alt,
  }) = _ProjectImage;

  factory ProjectImage.fromJson(Map<String, Object?> json) => _$ProjectImageFromJson(json);
}

@freezed
abstract class ProcessStep with _$ProcessStep {
  const factory ProcessStep({required LocalizedText title, required LocalizedText body, required LocalizedText where}) =
      _ProcessStep;

  factory ProcessStep.fromJson(Map<String, Object?> json) => _$ProcessStepFromJson(json);
}

/// A real review, published with the client's permission. Rating, date and source appear
/// only when the client gave them.
@freezed
abstract class Review with _$Review {
  const factory Review({
    required String id,
    required String name,
    required String? company,
    required int? rating,
    required String? date,
    required String? source,
    required String? sourceUrl,

    /// The language the client wrote in; the other side is a labelled translation.
    required String originalLang,
    required LocalizedText text,
  }) = _Review;

  factory Review.fromJson(Map<String, Object?> json) => _$ReviewFromJson(json);
}
