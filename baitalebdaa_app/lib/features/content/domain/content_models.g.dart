// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'content_models.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_ContentSnapshot _$ContentSnapshotFromJson(Map<String, dynamic> json) =>
    $checkedCreate('_ContentSnapshot', json, ($checkedConvert) {
      final val = _ContentSnapshot(
        schemaVersion: $checkedConvert('schemaVersion', (v) => (v as num).toInt()),
        heroSlides: $checkedConvert(
          'heroSlides',
          (v) => (v as List<dynamic>).map((e) => HeroSlide.fromJson(e as Map<String, dynamic>)).toList(),
        ),
        assistant: $checkedConvert('assistant', (v) => AssistantCopy.fromJson(v as Map<String, dynamic>)),
        business: $checkedConvert('business', (v) => BusinessFacts.fromJson(v as Map<String, dynamic>)),
        services: $checkedConvert(
          'services',
          (v) => (v as List<dynamic>).map((e) => Service.fromJson(e as Map<String, dynamic>)).toList(),
        ),
        pricing: $checkedConvert('pricing', (v) => Pricing.fromJson(v as Map<String, dynamic>)),
        projects: $checkedConvert(
          'projects',
          (v) => (v as List<dynamic>).map((e) => Project.fromJson(e as Map<String, dynamic>)).toList(),
        ),
        process: $checkedConvert(
          'process',
          (v) => (v as List<dynamic>).map((e) => ProcessStep.fromJson(e as Map<String, dynamic>)).toList(),
        ),
        reviews: $checkedConvert(
          'reviews',
          (v) => (v as List<dynamic>).map((e) => Review.fromJson(e as Map<String, dynamic>)).toList(),
        ),
      );
      return val;
    });

Map<String, dynamic> _$ContentSnapshotToJson(_ContentSnapshot instance) => <String, dynamic>{
  'schemaVersion': instance.schemaVersion,
  'heroSlides': instance.heroSlides.map((e) => e.toJson()).toList(),
  'assistant': instance.assistant.toJson(),
  'business': instance.business.toJson(),
  'services': instance.services.map((e) => e.toJson()).toList(),
  'pricing': instance.pricing.toJson(),
  'projects': instance.projects.map((e) => e.toJson()).toList(),
  'process': instance.process.map((e) => e.toJson()).toList(),
  'reviews': instance.reviews.map((e) => e.toJson()).toList(),
};

_BundledImage _$BundledImageFromJson(Map<String, dynamic> json) =>
    $checkedCreate('_BundledImage', json, ($checkedConvert) {
      final val = _BundledImage(
        asset: $checkedConvert('asset', (v) => v as String),
        url: $checkedConvert('url', (v) => v as String),
        alt: $checkedConvert('alt', (v) => v == null ? null : LocalizedText.fromJson(v as Map<String, dynamic>)),
      );
      return val;
    });

Map<String, dynamic> _$BundledImageToJson(_BundledImage instance) => <String, dynamic>{
  'asset': instance.asset,
  'url': instance.url,
  'alt': instance.alt?.toJson(),
};

_HeroSlide _$HeroSlideFromJson(Map<String, dynamic> json) => $checkedCreate('_HeroSlide', json, ($checkedConvert) {
  final val = _HeroSlide(
    eyebrow: $checkedConvert('eyebrow', (v) => LocalizedText.fromJson(v as Map<String, dynamic>)),
    title: $checkedConvert('title', (v) => LocalizedText.fromJson(v as Map<String, dynamic>)),
    body: $checkedConvert('body', (v) => LocalizedText.fromJson(v as Map<String, dynamic>)),
    image: $checkedConvert('image', (v) => BundledImage.fromJson(v as Map<String, dynamic>)),
  );
  return val;
});

Map<String, dynamic> _$HeroSlideToJson(_HeroSlide instance) => <String, dynamic>{
  'eyebrow': instance.eyebrow.toJson(),
  'title': instance.title.toJson(),
  'body': instance.body.toJson(),
  'image': instance.image.toJson(),
};

_AssistantCopy _$AssistantCopyFromJson(Map<String, dynamic> json) =>
    $checkedCreate('_AssistantCopy', json, ($checkedConvert) {
      final val = _AssistantCopy(
        name: $checkedConvert('name', (v) => LocalizedText.fromJson(v as Map<String, dynamic>)),
        subtitle: $checkedConvert('subtitle', (v) => LocalizedText.fromJson(v as Map<String, dynamic>)),
        intro: $checkedConvert('intro', (v) => LocalizedText.fromJson(v as Map<String, dynamic>)),
        starters: $checkedConvert('starters', (v) => LocalizedList.fromJson(v as Map<String, dynamic>)),
        placeholder: $checkedConvert('placeholder', (v) => LocalizedText.fromJson(v as Map<String, dynamic>)),
        inputLabel: $checkedConvert('inputLabel', (v) => LocalizedText.fromJson(v as Map<String, dynamic>)),
        send: $checkedConvert('send', (v) => LocalizedText.fromJson(v as Map<String, dynamic>)),
        startOver: $checkedConvert('startOver', (v) => LocalizedText.fromJson(v as Map<String, dynamic>)),
        typing: $checkedConvert('typing', (v) => LocalizedText.fromJson(v as Map<String, dynamic>)),
        unavailable: $checkedConvert('unavailable', (v) => LocalizedText.fromJson(v as Map<String, dynamic>)),
        disclaimer: $checkedConvert('disclaimer', (v) => LocalizedText.fromJson(v as Map<String, dynamic>)),
        disclaimerLink: $checkedConvert('disclaimerLink', (v) => LocalizedText.fromJson(v as Map<String, dynamic>)),
      );
      return val;
    });

Map<String, dynamic> _$AssistantCopyToJson(_AssistantCopy instance) => <String, dynamic>{
  'name': instance.name.toJson(),
  'subtitle': instance.subtitle.toJson(),
  'intro': instance.intro.toJson(),
  'starters': instance.starters.toJson(),
  'placeholder': instance.placeholder.toJson(),
  'inputLabel': instance.inputLabel.toJson(),
  'send': instance.send.toJson(),
  'startOver': instance.startOver.toJson(),
  'typing': instance.typing.toJson(),
  'unavailable': instance.unavailable.toJson(),
  'disclaimer': instance.disclaimer.toJson(),
  'disclaimerLink': instance.disclaimerLink.toJson(),
};

_BusinessFacts _$BusinessFactsFromJson(Map<String, dynamic> json) =>
    $checkedCreate('_BusinessFacts', json, ($checkedConvert) {
      final val = _BusinessFacts(
        name: $checkedConvert('name', (v) => LocalizedText.fromJson(v as Map<String, dynamic>)),
        phone: $checkedConvert('phone', (v) => v as String),
        whatsapp: $checkedConvert('whatsapp', (v) => v as String),
        email: $checkedConvert('email', (v) => v as String),
        address: $checkedConvert('address', (v) => LocalizedText.fromJson(v as Map<String, dynamic>)),
        hours: $checkedConvert('hours', (v) => OpeningHours.fromJson(v as Map<String, dynamic>)),
        emirates: $checkedConvert(
          'emirates',
          (v) => (v as List<dynamic>).map((e) => Emirate.fromJson(e as Map<String, dynamic>)).toList(),
        ),
        whatsappMessage: $checkedConvert('whatsappMessage', (v) => LocalizedText.fromJson(v as Map<String, dynamic>)),
        studioFacts: $checkedConvert(
          'studioFacts',
          (v) => (v as List<dynamic>).map((e) => StudioFact.fromJson(e as Map<String, dynamic>)).toList(),
        ),
        socialProfiles: $checkedConvert(
          'socialProfiles',
          (v) => (v as List<dynamic>).map((e) => SocialProfile.fromJson(e as Map<String, dynamic>)).toList(),
        ),
        siteUrl: $checkedConvert('siteUrl', (v) => v as String),
      );
      return val;
    });

Map<String, dynamic> _$BusinessFactsToJson(_BusinessFacts instance) => <String, dynamic>{
  'name': instance.name.toJson(),
  'phone': instance.phone,
  'whatsapp': instance.whatsapp,
  'email': instance.email,
  'address': instance.address.toJson(),
  'hours': instance.hours.toJson(),
  'emirates': instance.emirates.map((e) => e.toJson()).toList(),
  'whatsappMessage': instance.whatsappMessage.toJson(),
  'studioFacts': instance.studioFacts.map((e) => e.toJson()).toList(),
  'socialProfiles': instance.socialProfiles.map((e) => e.toJson()).toList(),
  'siteUrl': instance.siteUrl,
};

_OpeningHours _$OpeningHoursFromJson(Map<String, dynamic> json) =>
    $checkedCreate('_OpeningHours', json, ($checkedConvert) {
      final val = _OpeningHours(
        days: $checkedConvert('days', (v) => (v as List<dynamic>).map((e) => e as String).toList()),
        opens: $checkedConvert('opens', (v) => v as String),
        closes: $checkedConvert('closes', (v) => v as String),
        label: $checkedConvert('label', (v) => LocalizedText.fromJson(v as Map<String, dynamic>)),
      );
      return val;
    });

Map<String, dynamic> _$OpeningHoursToJson(_OpeningHours instance) => <String, dynamic>{
  'days': instance.days,
  'opens': instance.opens,
  'closes': instance.closes,
  'label': instance.label.toJson(),
};

_Emirate _$EmirateFromJson(Map<String, dynamic> json) => $checkedCreate('_Emirate', json, ($checkedConvert) {
  final val = _Emirate(
    id: $checkedConvert('id', (v) => v as String),
    name: $checkedConvert('name', (v) => LocalizedText.fromJson(v as Map<String, dynamic>)),
  );
  return val;
});

Map<String, dynamic> _$EmirateToJson(_Emirate instance) => <String, dynamic>{
  'id': instance.id,
  'name': instance.name.toJson(),
};

_StudioFact _$StudioFactFromJson(Map<String, dynamic> json) => $checkedCreate('_StudioFact', json, ($checkedConvert) {
  final val = _StudioFact(
    value: $checkedConvert('value', (v) => LocalizedText.fromJson(v as Map<String, dynamic>)),
    label: $checkedConvert('label', (v) => LocalizedText.fromJson(v as Map<String, dynamic>)),
  );
  return val;
});

Map<String, dynamic> _$StudioFactToJson(_StudioFact instance) => <String, dynamic>{
  'value': instance.value.toJson(),
  'label': instance.label.toJson(),
};

_SocialProfile _$SocialProfileFromJson(Map<String, dynamic> json) =>
    $checkedCreate('_SocialProfile', json, ($checkedConvert) {
      final val = _SocialProfile(
        network: $checkedConvert('network', (v) => v as String),
        url: $checkedConvert('url', (v) => v as String),
      );
      return val;
    });

Map<String, dynamic> _$SocialProfileToJson(_SocialProfile instance) => <String, dynamic>{
  'network': instance.network,
  'url': instance.url,
};

_Service _$ServiceFromJson(Map<String, dynamic> json) => $checkedCreate('_Service', json, ($checkedConvert) {
  final val = _Service(
    slug: $checkedConvert('slug', (v) => v as String),
    name: $checkedConvert('name', (v) => LocalizedText.fromJson(v as Map<String, dynamic>)),
    summary: $checkedConvert('summary', (v) => LocalizedText.fromJson(v as Map<String, dynamic>)),
    image: $checkedConvert('image', (v) => BundledImage.fromJson(v as Map<String, dynamic>)),
    detail: $checkedConvert('detail', (v) => ServiceDetail.fromJson(v as Map<String, dynamic>)),
    pricing: $checkedConvert('pricing', (v) => v == null ? null : ServicePricing.fromJson(v as Map<String, dynamic>)),
    startingItemId: $checkedConvert('startingItemId', (v) => v as String?),
  );
  return val;
});

Map<String, dynamic> _$ServiceToJson(_Service instance) => <String, dynamic>{
  'slug': instance.slug,
  'name': instance.name.toJson(),
  'summary': instance.summary.toJson(),
  'image': instance.image.toJson(),
  'detail': instance.detail.toJson(),
  'pricing': instance.pricing?.toJson(),
  'startingItemId': instance.startingItemId,
};

_ServiceDetail _$ServiceDetailFromJson(Map<String, dynamic> json) =>
    $checkedCreate('_ServiceDetail', json, ($checkedConvert) {
      final val = _ServiceDetail(
        summary: $checkedConvert('summary', (v) => LocalizedText.fromJson(v as Map<String, dynamic>)),
        included: $checkedConvert('included', (v) => LocalizedList.fromJson(v as Map<String, dynamic>)),
        faqs: $checkedConvert(
          'faqs',
          (v) => (v as List<dynamic>).map((e) => Faq.fromJson(e as Map<String, dynamic>)).toList(),
        ),
      );
      return val;
    });

Map<String, dynamic> _$ServiceDetailToJson(_ServiceDetail instance) => <String, dynamic>{
  'summary': instance.summary.toJson(),
  'included': instance.included.toJson(),
  'faqs': instance.faqs.map((e) => e.toJson()).toList(),
};

_Faq _$FaqFromJson(Map<String, dynamic> json) => $checkedCreate('_Faq', json, ($checkedConvert) {
  final val = _Faq(
    question: $checkedConvert('question', (v) => LocalizedText.fromJson(v as Map<String, dynamic>)),
    answer: $checkedConvert('answer', (v) => LocalizedText.fromJson(v as Map<String, dynamic>)),
  );
  return val;
});

Map<String, dynamic> _$FaqToJson(_Faq instance) => <String, dynamic>{
  'question': instance.question.toJson(),
  'answer': instance.answer.toJson(),
};

_ServicePricing _$ServicePricingFromJson(Map<String, dynamic> json) =>
    $checkedCreate('_ServicePricing', json, ($checkedConvert) {
      final val = _ServicePricing(
        direct: $checkedConvert('direct', (v) => v as bool),
        itemIds: $checkedConvert('itemIds', (v) => (v as List<dynamic>).map((e) => e as String).toList()),
      );
      return val;
    });

Map<String, dynamic> _$ServicePricingToJson(_ServicePricing instance) => <String, dynamic>{
  'direct': instance.direct,
  'itemIds': instance.itemIds,
};

_Pricing _$PricingFromJson(Map<String, dynamic> json) => $checkedCreate('_Pricing', json, ($checkedConvert) {
  final val = _Pricing(
    currency: $checkedConvert('currency', (v) => v as String),
    vatInclusive: $checkedConvert('vatInclusive', (v) => v as bool),
    vatRate: $checkedConvert('vatRate', (v) => (v as num).toDouble()),
    disclaimer: $checkedConvert('disclaimer', (v) => LocalizedText.fromJson(v as Map<String, dynamic>)),
    groups: $checkedConvert(
      'groups',
      (v) => (v as List<dynamic>).map((e) => PriceGroup.fromJson(e as Map<String, dynamic>)).toList(),
    ),
  );
  return val;
});

Map<String, dynamic> _$PricingToJson(_Pricing instance) => <String, dynamic>{
  'currency': instance.currency,
  'vatInclusive': instance.vatInclusive,
  'vatRate': instance.vatRate,
  'disclaimer': instance.disclaimer.toJson(),
  'groups': instance.groups.map((e) => e.toJson()).toList(),
};

_PriceGroup _$PriceGroupFromJson(Map<String, dynamic> json) => $checkedCreate('_PriceGroup', json, ($checkedConvert) {
  final val = _PriceGroup(
    id: $checkedConvert('id', (v) => v as String),
    kicker: $checkedConvert('kicker', (v) => LocalizedText.fromJson(v as Map<String, dynamic>)),
    title: $checkedConvert('title', (v) => LocalizedText.fromJson(v as Map<String, dynamic>)),
    subtitle: $checkedConvert('subtitle', (v) => LocalizedText.fromJson(v as Map<String, dynamic>)),
    items: $checkedConvert(
      'items',
      (v) => (v as List<dynamic>).map((e) => PriceItem.fromJson(e as Map<String, dynamic>)).toList(),
    ),
  );
  return val;
});

Map<String, dynamic> _$PriceGroupToJson(_PriceGroup instance) => <String, dynamic>{
  'id': instance.id,
  'kicker': instance.kicker.toJson(),
  'title': instance.title.toJson(),
  'subtitle': instance.subtitle.toJson(),
  'items': instance.items.map((e) => e.toJson()).toList(),
};

_PriceItem _$PriceItemFromJson(Map<String, dynamic> json) => $checkedCreate('_PriceItem', json, ($checkedConvert) {
  final val = _PriceItem(
    id: $checkedConvert('id', (v) => v as String),
    priceType: $checkedConvert('priceType', (v) => $enumDecode(_$PriceTypeEnumMap, v)),
    min: $checkedConvert('min', (v) => v as num?),
    max: $checkedConvert('max', (v) => v as num?),
    unit: $checkedConvert('unit', (v) => $enumDecodeNullable(_$PriceUnitEnumMap, v)),
    plus: $checkedConvert('plus', (v) => v as bool),
    additional: $checkedConvert('additional', (v) => v as bool),
    name: $checkedConvert('name', (v) => LocalizedText.fromJson(v as Map<String, dynamic>)),
    display: $checkedConvert('display', (v) => LocalizedText.fromJson(v as Map<String, dynamic>)),
  );
  return val;
});

Map<String, dynamic> _$PriceItemToJson(_PriceItem instance) => <String, dynamic>{
  'id': instance.id,
  'priceType': _$PriceTypeEnumMap[instance.priceType]!,
  'min': instance.min,
  'max': instance.max,
  'unit': _$PriceUnitEnumMap[instance.unit],
  'plus': instance.plus,
  'additional': instance.additional,
  'name': instance.name.toJson(),
  'display': instance.display.toJson(),
};

const _$PriceTypeEnumMap = {
  PriceType.from: 'from',
  PriceType.range: 'range',
  PriceType.custom: 'custom',
  PriceType.free: 'free',
};

const _$PriceUnitEnumMap = {PriceUnit.linearMetre: 'linearMetre', PriceUnit.sqft: 'sqft'};

_Project _$ProjectFromJson(Map<String, dynamic> json) => $checkedCreate('_Project', json, ($checkedConvert) {
  final val = _Project(
    slug: $checkedConvert('slug', (v) => v as String),
    title: $checkedConvert('title', (v) => LocalizedText.fromJson(v as Map<String, dynamic>)),
    place: $checkedConvert('place', (v) => LocalizedText.fromJson(v as Map<String, dynamic>)),
    subtitle: $checkedConvert('subtitle', (v) => LocalizedText.fromJson(v as Map<String, dynamic>)),
    description: $checkedConvert('description', (v) => LocalizedText.fromJson(v as Map<String, dynamic>)),
    location: $checkedConvert('location', (v) => LocalizedText.fromJson(v as Map<String, dynamic>)),
    sector: $checkedConvert('sector', (v) => LocalizedText.fromJson(v as Map<String, dynamic>)),
    size: $checkedConvert('size', (v) => LocalizedText.fromJson(v as Map<String, dynamic>)),
    year: $checkedConvert('year', (v) => v as String),
    service: $checkedConvert('service', (v) => LocalizedText.fromJson(v as Map<String, dynamic>)),
    scope: $checkedConvert('scope', (v) => LocalizedList.fromJson(v as Map<String, dynamic>)),
    cover: $checkedConvert('cover', (v) => BundledImage.fromJson(v as Map<String, dynamic>)),
    relatedServiceIds: $checkedConvert(
      'relatedServiceIds',
      (v) => (v as List<dynamic>).map((e) => e as String).toList(),
    ),
    images: $checkedConvert(
      'images',
      (v) => (v as List<dynamic>).map((e) => ProjectImage.fromJson(e as Map<String, dynamic>)).toList(),
    ),
  );
  return val;
});

Map<String, dynamic> _$ProjectToJson(_Project instance) => <String, dynamic>{
  'slug': instance.slug,
  'title': instance.title.toJson(),
  'place': instance.place.toJson(),
  'subtitle': instance.subtitle.toJson(),
  'description': instance.description.toJson(),
  'location': instance.location.toJson(),
  'sector': instance.sector.toJson(),
  'size': instance.size.toJson(),
  'year': instance.year,
  'service': instance.service.toJson(),
  'scope': instance.scope.toJson(),
  'cover': instance.cover.toJson(),
  'relatedServiceIds': instance.relatedServiceIds,
  'images': instance.images.map((e) => e.toJson()).toList(),
};

_ProjectImage _$ProjectImageFromJson(Map<String, dynamic> json) =>
    $checkedCreate('_ProjectImage', json, ($checkedConvert) {
      final val = _ProjectImage(
        url: $checkedConvert('url', (v) => v as String),
        alt: $checkedConvert('alt', (v) => v == null ? null : LocalizedText.fromJson(v as Map<String, dynamic>)),
      );
      return val;
    });

Map<String, dynamic> _$ProjectImageToJson(_ProjectImage instance) => <String, dynamic>{
  'url': instance.url,
  'alt': instance.alt?.toJson(),
};

_ProcessStep _$ProcessStepFromJson(Map<String, dynamic> json) =>
    $checkedCreate('_ProcessStep', json, ($checkedConvert) {
      final val = _ProcessStep(
        title: $checkedConvert('title', (v) => LocalizedText.fromJson(v as Map<String, dynamic>)),
        body: $checkedConvert('body', (v) => LocalizedText.fromJson(v as Map<String, dynamic>)),
        where: $checkedConvert('where', (v) => LocalizedText.fromJson(v as Map<String, dynamic>)),
      );
      return val;
    });

Map<String, dynamic> _$ProcessStepToJson(_ProcessStep instance) => <String, dynamic>{
  'title': instance.title.toJson(),
  'body': instance.body.toJson(),
  'where': instance.where.toJson(),
};

_Review _$ReviewFromJson(Map<String, dynamic> json) => $checkedCreate('_Review', json, ($checkedConvert) {
  final val = _Review(
    id: $checkedConvert('id', (v) => v as String),
    name: $checkedConvert('name', (v) => v as String),
    company: $checkedConvert('company', (v) => v as String?),
    rating: $checkedConvert('rating', (v) => (v as num?)?.toInt()),
    date: $checkedConvert('date', (v) => v as String?),
    source: $checkedConvert('source', (v) => v as String?),
    sourceUrl: $checkedConvert('sourceUrl', (v) => v as String?),
    originalLang: $checkedConvert('originalLang', (v) => v as String),
    text: $checkedConvert('text', (v) => LocalizedText.fromJson(v as Map<String, dynamic>)),
  );
  return val;
});

Map<String, dynamic> _$ReviewToJson(_Review instance) => <String, dynamic>{
  'id': instance.id,
  'name': instance.name,
  'company': instance.company,
  'rating': instance.rating,
  'date': instance.date,
  'source': instance.source,
  'sourceUrl': instance.sourceUrl,
  'originalLang': instance.originalLang,
  'text': instance.text.toJson(),
};
