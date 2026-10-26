// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'content_models.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$ContentSnapshot {

 int get schemaVersion; List<HeroSlide> get heroSlides; AssistantCopy get assistant; BusinessFacts get business; List<Service> get services; Pricing get pricing; List<Project> get projects; List<ProcessStep> get process; List<Review> get reviews;
/// Create a copy of ContentSnapshot
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$ContentSnapshotCopyWith<ContentSnapshot> get copyWith => _$ContentSnapshotCopyWithImpl<ContentSnapshot>(this as ContentSnapshot, _$identity);

  /// Serializes this ContentSnapshot to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is ContentSnapshot&&(identical(other.schemaVersion, schemaVersion) || other.schemaVersion == schemaVersion)&&const DeepCollectionEquality().equals(other.heroSlides, heroSlides)&&(identical(other.assistant, assistant) || other.assistant == assistant)&&(identical(other.business, business) || other.business == business)&&const DeepCollectionEquality().equals(other.services, services)&&(identical(other.pricing, pricing) || other.pricing == pricing)&&const DeepCollectionEquality().equals(other.projects, projects)&&const DeepCollectionEquality().equals(other.process, process)&&const DeepCollectionEquality().equals(other.reviews, reviews));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,schemaVersion,const DeepCollectionEquality().hash(heroSlides),assistant,business,const DeepCollectionEquality().hash(services),pricing,const DeepCollectionEquality().hash(projects),const DeepCollectionEquality().hash(process),const DeepCollectionEquality().hash(reviews));

@override
String toString() {
  return 'ContentSnapshot(schemaVersion: $schemaVersion, heroSlides: $heroSlides, assistant: $assistant, business: $business, services: $services, pricing: $pricing, projects: $projects, process: $process, reviews: $reviews)';
}


}

/// @nodoc
abstract mixin class $ContentSnapshotCopyWith<$Res>  {
  factory $ContentSnapshotCopyWith(ContentSnapshot value, $Res Function(ContentSnapshot) _then) = _$ContentSnapshotCopyWithImpl;
@useResult
$Res call({
 int schemaVersion, List<HeroSlide> heroSlides, AssistantCopy assistant, BusinessFacts business, List<Service> services, Pricing pricing, List<Project> projects, List<ProcessStep> process, List<Review> reviews
});


$AssistantCopyCopyWith<$Res> get assistant;$BusinessFactsCopyWith<$Res> get business;$PricingCopyWith<$Res> get pricing;

}
/// @nodoc
class _$ContentSnapshotCopyWithImpl<$Res>
    implements $ContentSnapshotCopyWith<$Res> {
  _$ContentSnapshotCopyWithImpl(this._self, this._then);

  final ContentSnapshot _self;
  final $Res Function(ContentSnapshot) _then;

/// Create a copy of ContentSnapshot
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? schemaVersion = null,Object? heroSlides = null,Object? assistant = null,Object? business = null,Object? services = null,Object? pricing = null,Object? projects = null,Object? process = null,Object? reviews = null,}) {
  return _then(_self.copyWith(
schemaVersion: null == schemaVersion ? _self.schemaVersion : schemaVersion // ignore: cast_nullable_to_non_nullable
as int,heroSlides: null == heroSlides ? _self.heroSlides : heroSlides // ignore: cast_nullable_to_non_nullable
as List<HeroSlide>,assistant: null == assistant ? _self.assistant : assistant // ignore: cast_nullable_to_non_nullable
as AssistantCopy,business: null == business ? _self.business : business // ignore: cast_nullable_to_non_nullable
as BusinessFacts,services: null == services ? _self.services : services // ignore: cast_nullable_to_non_nullable
as List<Service>,pricing: null == pricing ? _self.pricing : pricing // ignore: cast_nullable_to_non_nullable
as Pricing,projects: null == projects ? _self.projects : projects // ignore: cast_nullable_to_non_nullable
as List<Project>,process: null == process ? _self.process : process // ignore: cast_nullable_to_non_nullable
as List<ProcessStep>,reviews: null == reviews ? _self.reviews : reviews // ignore: cast_nullable_to_non_nullable
as List<Review>,
  ));
}
/// Create a copy of ContentSnapshot
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$AssistantCopyCopyWith<$Res> get assistant {
  
  return $AssistantCopyCopyWith<$Res>(_self.assistant, (value) {
    return _then(_self.copyWith(assistant: value));
  });
}/// Create a copy of ContentSnapshot
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$BusinessFactsCopyWith<$Res> get business {
  
  return $BusinessFactsCopyWith<$Res>(_self.business, (value) {
    return _then(_self.copyWith(business: value));
  });
}/// Create a copy of ContentSnapshot
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$PricingCopyWith<$Res> get pricing {
  
  return $PricingCopyWith<$Res>(_self.pricing, (value) {
    return _then(_self.copyWith(pricing: value));
  });
}
}


/// Adds pattern-matching-related methods to [ContentSnapshot].
extension ContentSnapshotPatterns on ContentSnapshot {
/// A variant of `map` that fallback to returning `orElse`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _ContentSnapshot value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _ContentSnapshot() when $default != null:
return $default(_that);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// Callbacks receives the raw object, upcasted.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case final Subclass2 value:
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _ContentSnapshot value)  $default,){
final _that = this;
switch (_that) {
case _ContentSnapshot():
return $default(_that);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `map` that fallback to returning `null`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _ContentSnapshot value)?  $default,){
final _that = this;
switch (_that) {
case _ContentSnapshot() when $default != null:
return $default(_that);case _:
  return null;

}
}
/// A variant of `when` that fallback to an `orElse` callback.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( int schemaVersion,  List<HeroSlide> heroSlides,  AssistantCopy assistant,  BusinessFacts business,  List<Service> services,  Pricing pricing,  List<Project> projects,  List<ProcessStep> process,  List<Review> reviews)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _ContentSnapshot() when $default != null:
return $default(_that.schemaVersion,_that.heroSlides,_that.assistant,_that.business,_that.services,_that.pricing,_that.projects,_that.process,_that.reviews);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// As opposed to `map`, this offers destructuring.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case Subclass2(:final field2):
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( int schemaVersion,  List<HeroSlide> heroSlides,  AssistantCopy assistant,  BusinessFacts business,  List<Service> services,  Pricing pricing,  List<Project> projects,  List<ProcessStep> process,  List<Review> reviews)  $default,) {final _that = this;
switch (_that) {
case _ContentSnapshot():
return $default(_that.schemaVersion,_that.heroSlides,_that.assistant,_that.business,_that.services,_that.pricing,_that.projects,_that.process,_that.reviews);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `when` that fallback to returning `null`
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( int schemaVersion,  List<HeroSlide> heroSlides,  AssistantCopy assistant,  BusinessFacts business,  List<Service> services,  Pricing pricing,  List<Project> projects,  List<ProcessStep> process,  List<Review> reviews)?  $default,) {final _that = this;
switch (_that) {
case _ContentSnapshot() when $default != null:
return $default(_that.schemaVersion,_that.heroSlides,_that.assistant,_that.business,_that.services,_that.pricing,_that.projects,_that.process,_that.reviews);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _ContentSnapshot extends ContentSnapshot {
  const _ContentSnapshot({required this.schemaVersion, required final  List<HeroSlide> heroSlides, required this.assistant, required this.business, required final  List<Service> services, required this.pricing, required final  List<Project> projects, required final  List<ProcessStep> process, required final  List<Review> reviews}): _heroSlides = heroSlides,_services = services,_projects = projects,_process = process,_reviews = reviews,super._();
  factory _ContentSnapshot.fromJson(Map<String, dynamic> json) => _$ContentSnapshotFromJson(json);

@override final  int schemaVersion;
 final  List<HeroSlide> _heroSlides;
@override List<HeroSlide> get heroSlides {
  if (_heroSlides is EqualUnmodifiableListView) return _heroSlides;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_heroSlides);
}

@override final  AssistantCopy assistant;
@override final  BusinessFacts business;
 final  List<Service> _services;
@override List<Service> get services {
  if (_services is EqualUnmodifiableListView) return _services;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_services);
}

@override final  Pricing pricing;
 final  List<Project> _projects;
@override List<Project> get projects {
  if (_projects is EqualUnmodifiableListView) return _projects;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_projects);
}

 final  List<ProcessStep> _process;
@override List<ProcessStep> get process {
  if (_process is EqualUnmodifiableListView) return _process;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_process);
}

 final  List<Review> _reviews;
@override List<Review> get reviews {
  if (_reviews is EqualUnmodifiableListView) return _reviews;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_reviews);
}


/// Create a copy of ContentSnapshot
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$ContentSnapshotCopyWith<_ContentSnapshot> get copyWith => __$ContentSnapshotCopyWithImpl<_ContentSnapshot>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$ContentSnapshotToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _ContentSnapshot&&(identical(other.schemaVersion, schemaVersion) || other.schemaVersion == schemaVersion)&&const DeepCollectionEquality().equals(other._heroSlides, _heroSlides)&&(identical(other.assistant, assistant) || other.assistant == assistant)&&(identical(other.business, business) || other.business == business)&&const DeepCollectionEquality().equals(other._services, _services)&&(identical(other.pricing, pricing) || other.pricing == pricing)&&const DeepCollectionEquality().equals(other._projects, _projects)&&const DeepCollectionEquality().equals(other._process, _process)&&const DeepCollectionEquality().equals(other._reviews, _reviews));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,schemaVersion,const DeepCollectionEquality().hash(_heroSlides),assistant,business,const DeepCollectionEquality().hash(_services),pricing,const DeepCollectionEquality().hash(_projects),const DeepCollectionEquality().hash(_process),const DeepCollectionEquality().hash(_reviews));

@override
String toString() {
  return 'ContentSnapshot(schemaVersion: $schemaVersion, heroSlides: $heroSlides, assistant: $assistant, business: $business, services: $services, pricing: $pricing, projects: $projects, process: $process, reviews: $reviews)';
}


}

/// @nodoc
abstract mixin class _$ContentSnapshotCopyWith<$Res> implements $ContentSnapshotCopyWith<$Res> {
  factory _$ContentSnapshotCopyWith(_ContentSnapshot value, $Res Function(_ContentSnapshot) _then) = __$ContentSnapshotCopyWithImpl;
@override @useResult
$Res call({
 int schemaVersion, List<HeroSlide> heroSlides, AssistantCopy assistant, BusinessFacts business, List<Service> services, Pricing pricing, List<Project> projects, List<ProcessStep> process, List<Review> reviews
});


@override $AssistantCopyCopyWith<$Res> get assistant;@override $BusinessFactsCopyWith<$Res> get business;@override $PricingCopyWith<$Res> get pricing;

}
/// @nodoc
class __$ContentSnapshotCopyWithImpl<$Res>
    implements _$ContentSnapshotCopyWith<$Res> {
  __$ContentSnapshotCopyWithImpl(this._self, this._then);

  final _ContentSnapshot _self;
  final $Res Function(_ContentSnapshot) _then;

/// Create a copy of ContentSnapshot
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? schemaVersion = null,Object? heroSlides = null,Object? assistant = null,Object? business = null,Object? services = null,Object? pricing = null,Object? projects = null,Object? process = null,Object? reviews = null,}) {
  return _then(_ContentSnapshot(
schemaVersion: null == schemaVersion ? _self.schemaVersion : schemaVersion // ignore: cast_nullable_to_non_nullable
as int,heroSlides: null == heroSlides ? _self._heroSlides : heroSlides // ignore: cast_nullable_to_non_nullable
as List<HeroSlide>,assistant: null == assistant ? _self.assistant : assistant // ignore: cast_nullable_to_non_nullable
as AssistantCopy,business: null == business ? _self.business : business // ignore: cast_nullable_to_non_nullable
as BusinessFacts,services: null == services ? _self._services : services // ignore: cast_nullable_to_non_nullable
as List<Service>,pricing: null == pricing ? _self.pricing : pricing // ignore: cast_nullable_to_non_nullable
as Pricing,projects: null == projects ? _self._projects : projects // ignore: cast_nullable_to_non_nullable
as List<Project>,process: null == process ? _self._process : process // ignore: cast_nullable_to_non_nullable
as List<ProcessStep>,reviews: null == reviews ? _self._reviews : reviews // ignore: cast_nullable_to_non_nullable
as List<Review>,
  ));
}

/// Create a copy of ContentSnapshot
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$AssistantCopyCopyWith<$Res> get assistant {
  
  return $AssistantCopyCopyWith<$Res>(_self.assistant, (value) {
    return _then(_self.copyWith(assistant: value));
  });
}/// Create a copy of ContentSnapshot
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$BusinessFactsCopyWith<$Res> get business {
  
  return $BusinessFactsCopyWith<$Res>(_self.business, (value) {
    return _then(_self.copyWith(business: value));
  });
}/// Create a copy of ContentSnapshot
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$PricingCopyWith<$Res> get pricing {
  
  return $PricingCopyWith<$Res>(_self.pricing, (value) {
    return _then(_self.copyWith(pricing: value));
  });
}
}


/// @nodoc
mixin _$BundledImage {

 String get asset; String get url;/// Descriptive alt text where the website has one.
 LocalizedText? get alt;
/// Create a copy of BundledImage
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$BundledImageCopyWith<BundledImage> get copyWith => _$BundledImageCopyWithImpl<BundledImage>(this as BundledImage, _$identity);

  /// Serializes this BundledImage to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is BundledImage&&(identical(other.asset, asset) || other.asset == asset)&&(identical(other.url, url) || other.url == url)&&(identical(other.alt, alt) || other.alt == alt));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,asset,url,alt);

@override
String toString() {
  return 'BundledImage(asset: $asset, url: $url, alt: $alt)';
}


}

/// @nodoc
abstract mixin class $BundledImageCopyWith<$Res>  {
  factory $BundledImageCopyWith(BundledImage value, $Res Function(BundledImage) _then) = _$BundledImageCopyWithImpl;
@useResult
$Res call({
 String asset, String url, LocalizedText? alt
});


$LocalizedTextCopyWith<$Res>? get alt;

}
/// @nodoc
class _$BundledImageCopyWithImpl<$Res>
    implements $BundledImageCopyWith<$Res> {
  _$BundledImageCopyWithImpl(this._self, this._then);

  final BundledImage _self;
  final $Res Function(BundledImage) _then;

/// Create a copy of BundledImage
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? asset = null,Object? url = null,Object? alt = freezed,}) {
  return _then(_self.copyWith(
asset: null == asset ? _self.asset : asset // ignore: cast_nullable_to_non_nullable
as String,url: null == url ? _self.url : url // ignore: cast_nullable_to_non_nullable
as String,alt: freezed == alt ? _self.alt : alt // ignore: cast_nullable_to_non_nullable
as LocalizedText?,
  ));
}
/// Create a copy of BundledImage
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res>? get alt {
    if (_self.alt == null) {
    return null;
  }

  return $LocalizedTextCopyWith<$Res>(_self.alt!, (value) {
    return _then(_self.copyWith(alt: value));
  });
}
}


/// Adds pattern-matching-related methods to [BundledImage].
extension BundledImagePatterns on BundledImage {
/// A variant of `map` that fallback to returning `orElse`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _BundledImage value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _BundledImage() when $default != null:
return $default(_that);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// Callbacks receives the raw object, upcasted.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case final Subclass2 value:
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _BundledImage value)  $default,){
final _that = this;
switch (_that) {
case _BundledImage():
return $default(_that);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `map` that fallback to returning `null`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _BundledImage value)?  $default,){
final _that = this;
switch (_that) {
case _BundledImage() when $default != null:
return $default(_that);case _:
  return null;

}
}
/// A variant of `when` that fallback to an `orElse` callback.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String asset,  String url,  LocalizedText? alt)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _BundledImage() when $default != null:
return $default(_that.asset,_that.url,_that.alt);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// As opposed to `map`, this offers destructuring.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case Subclass2(:final field2):
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String asset,  String url,  LocalizedText? alt)  $default,) {final _that = this;
switch (_that) {
case _BundledImage():
return $default(_that.asset,_that.url,_that.alt);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `when` that fallback to returning `null`
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String asset,  String url,  LocalizedText? alt)?  $default,) {final _that = this;
switch (_that) {
case _BundledImage() when $default != null:
return $default(_that.asset,_that.url,_that.alt);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _BundledImage implements BundledImage {
  const _BundledImage({required this.asset, required this.url, required this.alt});
  factory _BundledImage.fromJson(Map<String, dynamic> json) => _$BundledImageFromJson(json);

@override final  String asset;
@override final  String url;
/// Descriptive alt text where the website has one.
@override final  LocalizedText? alt;

/// Create a copy of BundledImage
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$BundledImageCopyWith<_BundledImage> get copyWith => __$BundledImageCopyWithImpl<_BundledImage>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$BundledImageToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _BundledImage&&(identical(other.asset, asset) || other.asset == asset)&&(identical(other.url, url) || other.url == url)&&(identical(other.alt, alt) || other.alt == alt));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,asset,url,alt);

@override
String toString() {
  return 'BundledImage(asset: $asset, url: $url, alt: $alt)';
}


}

/// @nodoc
abstract mixin class _$BundledImageCopyWith<$Res> implements $BundledImageCopyWith<$Res> {
  factory _$BundledImageCopyWith(_BundledImage value, $Res Function(_BundledImage) _then) = __$BundledImageCopyWithImpl;
@override @useResult
$Res call({
 String asset, String url, LocalizedText? alt
});


@override $LocalizedTextCopyWith<$Res>? get alt;

}
/// @nodoc
class __$BundledImageCopyWithImpl<$Res>
    implements _$BundledImageCopyWith<$Res> {
  __$BundledImageCopyWithImpl(this._self, this._then);

  final _BundledImage _self;
  final $Res Function(_BundledImage) _then;

/// Create a copy of BundledImage
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? asset = null,Object? url = null,Object? alt = freezed,}) {
  return _then(_BundledImage(
asset: null == asset ? _self.asset : asset // ignore: cast_nullable_to_non_nullable
as String,url: null == url ? _self.url : url // ignore: cast_nullable_to_non_nullable
as String,alt: freezed == alt ? _self.alt : alt // ignore: cast_nullable_to_non_nullable
as LocalizedText?,
  ));
}

/// Create a copy of BundledImage
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res>? get alt {
    if (_self.alt == null) {
    return null;
  }

  return $LocalizedTextCopyWith<$Res>(_self.alt!, (value) {
    return _then(_self.copyWith(alt: value));
  });
}
}


/// @nodoc
mixin _$HeroSlide {

 LocalizedText get eyebrow; LocalizedText get title; LocalizedText get body; BundledImage get image;
/// Create a copy of HeroSlide
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$HeroSlideCopyWith<HeroSlide> get copyWith => _$HeroSlideCopyWithImpl<HeroSlide>(this as HeroSlide, _$identity);

  /// Serializes this HeroSlide to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is HeroSlide&&(identical(other.eyebrow, eyebrow) || other.eyebrow == eyebrow)&&(identical(other.title, title) || other.title == title)&&(identical(other.body, body) || other.body == body)&&(identical(other.image, image) || other.image == image));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,eyebrow,title,body,image);

@override
String toString() {
  return 'HeroSlide(eyebrow: $eyebrow, title: $title, body: $body, image: $image)';
}


}

/// @nodoc
abstract mixin class $HeroSlideCopyWith<$Res>  {
  factory $HeroSlideCopyWith(HeroSlide value, $Res Function(HeroSlide) _then) = _$HeroSlideCopyWithImpl;
@useResult
$Res call({
 LocalizedText eyebrow, LocalizedText title, LocalizedText body, BundledImage image
});


$LocalizedTextCopyWith<$Res> get eyebrow;$LocalizedTextCopyWith<$Res> get title;$LocalizedTextCopyWith<$Res> get body;$BundledImageCopyWith<$Res> get image;

}
/// @nodoc
class _$HeroSlideCopyWithImpl<$Res>
    implements $HeroSlideCopyWith<$Res> {
  _$HeroSlideCopyWithImpl(this._self, this._then);

  final HeroSlide _self;
  final $Res Function(HeroSlide) _then;

/// Create a copy of HeroSlide
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? eyebrow = null,Object? title = null,Object? body = null,Object? image = null,}) {
  return _then(_self.copyWith(
eyebrow: null == eyebrow ? _self.eyebrow : eyebrow // ignore: cast_nullable_to_non_nullable
as LocalizedText,title: null == title ? _self.title : title // ignore: cast_nullable_to_non_nullable
as LocalizedText,body: null == body ? _self.body : body // ignore: cast_nullable_to_non_nullable
as LocalizedText,image: null == image ? _self.image : image // ignore: cast_nullable_to_non_nullable
as BundledImage,
  ));
}
/// Create a copy of HeroSlide
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get eyebrow {
  
  return $LocalizedTextCopyWith<$Res>(_self.eyebrow, (value) {
    return _then(_self.copyWith(eyebrow: value));
  });
}/// Create a copy of HeroSlide
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get title {
  
  return $LocalizedTextCopyWith<$Res>(_self.title, (value) {
    return _then(_self.copyWith(title: value));
  });
}/// Create a copy of HeroSlide
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get body {
  
  return $LocalizedTextCopyWith<$Res>(_self.body, (value) {
    return _then(_self.copyWith(body: value));
  });
}/// Create a copy of HeroSlide
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$BundledImageCopyWith<$Res> get image {
  
  return $BundledImageCopyWith<$Res>(_self.image, (value) {
    return _then(_self.copyWith(image: value));
  });
}
}


/// Adds pattern-matching-related methods to [HeroSlide].
extension HeroSlidePatterns on HeroSlide {
/// A variant of `map` that fallback to returning `orElse`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _HeroSlide value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _HeroSlide() when $default != null:
return $default(_that);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// Callbacks receives the raw object, upcasted.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case final Subclass2 value:
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _HeroSlide value)  $default,){
final _that = this;
switch (_that) {
case _HeroSlide():
return $default(_that);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `map` that fallback to returning `null`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _HeroSlide value)?  $default,){
final _that = this;
switch (_that) {
case _HeroSlide() when $default != null:
return $default(_that);case _:
  return null;

}
}
/// A variant of `when` that fallback to an `orElse` callback.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( LocalizedText eyebrow,  LocalizedText title,  LocalizedText body,  BundledImage image)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _HeroSlide() when $default != null:
return $default(_that.eyebrow,_that.title,_that.body,_that.image);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// As opposed to `map`, this offers destructuring.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case Subclass2(:final field2):
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( LocalizedText eyebrow,  LocalizedText title,  LocalizedText body,  BundledImage image)  $default,) {final _that = this;
switch (_that) {
case _HeroSlide():
return $default(_that.eyebrow,_that.title,_that.body,_that.image);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `when` that fallback to returning `null`
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( LocalizedText eyebrow,  LocalizedText title,  LocalizedText body,  BundledImage image)?  $default,) {final _that = this;
switch (_that) {
case _HeroSlide() when $default != null:
return $default(_that.eyebrow,_that.title,_that.body,_that.image);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _HeroSlide implements HeroSlide {
  const _HeroSlide({required this.eyebrow, required this.title, required this.body, required this.image});
  factory _HeroSlide.fromJson(Map<String, dynamic> json) => _$HeroSlideFromJson(json);

@override final  LocalizedText eyebrow;
@override final  LocalizedText title;
@override final  LocalizedText body;
@override final  BundledImage image;

/// Create a copy of HeroSlide
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$HeroSlideCopyWith<_HeroSlide> get copyWith => __$HeroSlideCopyWithImpl<_HeroSlide>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$HeroSlideToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _HeroSlide&&(identical(other.eyebrow, eyebrow) || other.eyebrow == eyebrow)&&(identical(other.title, title) || other.title == title)&&(identical(other.body, body) || other.body == body)&&(identical(other.image, image) || other.image == image));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,eyebrow,title,body,image);

@override
String toString() {
  return 'HeroSlide(eyebrow: $eyebrow, title: $title, body: $body, image: $image)';
}


}

/// @nodoc
abstract mixin class _$HeroSlideCopyWith<$Res> implements $HeroSlideCopyWith<$Res> {
  factory _$HeroSlideCopyWith(_HeroSlide value, $Res Function(_HeroSlide) _then) = __$HeroSlideCopyWithImpl;
@override @useResult
$Res call({
 LocalizedText eyebrow, LocalizedText title, LocalizedText body, BundledImage image
});


@override $LocalizedTextCopyWith<$Res> get eyebrow;@override $LocalizedTextCopyWith<$Res> get title;@override $LocalizedTextCopyWith<$Res> get body;@override $BundledImageCopyWith<$Res> get image;

}
/// @nodoc
class __$HeroSlideCopyWithImpl<$Res>
    implements _$HeroSlideCopyWith<$Res> {
  __$HeroSlideCopyWithImpl(this._self, this._then);

  final _HeroSlide _self;
  final $Res Function(_HeroSlide) _then;

/// Create a copy of HeroSlide
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? eyebrow = null,Object? title = null,Object? body = null,Object? image = null,}) {
  return _then(_HeroSlide(
eyebrow: null == eyebrow ? _self.eyebrow : eyebrow // ignore: cast_nullable_to_non_nullable
as LocalizedText,title: null == title ? _self.title : title // ignore: cast_nullable_to_non_nullable
as LocalizedText,body: null == body ? _self.body : body // ignore: cast_nullable_to_non_nullable
as LocalizedText,image: null == image ? _self.image : image // ignore: cast_nullable_to_non_nullable
as BundledImage,
  ));
}

/// Create a copy of HeroSlide
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get eyebrow {
  
  return $LocalizedTextCopyWith<$Res>(_self.eyebrow, (value) {
    return _then(_self.copyWith(eyebrow: value));
  });
}/// Create a copy of HeroSlide
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get title {
  
  return $LocalizedTextCopyWith<$Res>(_self.title, (value) {
    return _then(_self.copyWith(title: value));
  });
}/// Create a copy of HeroSlide
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get body {
  
  return $LocalizedTextCopyWith<$Res>(_self.body, (value) {
    return _then(_self.copyWith(body: value));
  });
}/// Create a copy of HeroSlide
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$BundledImageCopyWith<$Res> get image {
  
  return $BundledImageCopyWith<$Res>(_self.image, (value) {
    return _then(_self.copyWith(image: value));
  });
}
}


/// @nodoc
mixin _$AssistantCopy {

 LocalizedText get name; LocalizedText get subtitle; LocalizedText get intro; LocalizedList get starters; LocalizedText get placeholder; LocalizedText get inputLabel; LocalizedText get send; LocalizedText get startOver; LocalizedText get typing; LocalizedText get unavailable;/// "AI can make mistakes. For a confirmed quote," followed by [disclaimerLink].
 LocalizedText get disclaimer; LocalizedText get disclaimerLink;
/// Create a copy of AssistantCopy
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$AssistantCopyCopyWith<AssistantCopy> get copyWith => _$AssistantCopyCopyWithImpl<AssistantCopy>(this as AssistantCopy, _$identity);

  /// Serializes this AssistantCopy to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is AssistantCopy&&(identical(other.name, name) || other.name == name)&&(identical(other.subtitle, subtitle) || other.subtitle == subtitle)&&(identical(other.intro, intro) || other.intro == intro)&&(identical(other.starters, starters) || other.starters == starters)&&(identical(other.placeholder, placeholder) || other.placeholder == placeholder)&&(identical(other.inputLabel, inputLabel) || other.inputLabel == inputLabel)&&(identical(other.send, send) || other.send == send)&&(identical(other.startOver, startOver) || other.startOver == startOver)&&(identical(other.typing, typing) || other.typing == typing)&&(identical(other.unavailable, unavailable) || other.unavailable == unavailable)&&(identical(other.disclaimer, disclaimer) || other.disclaimer == disclaimer)&&(identical(other.disclaimerLink, disclaimerLink) || other.disclaimerLink == disclaimerLink));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,name,subtitle,intro,starters,placeholder,inputLabel,send,startOver,typing,unavailable,disclaimer,disclaimerLink);

@override
String toString() {
  return 'AssistantCopy(name: $name, subtitle: $subtitle, intro: $intro, starters: $starters, placeholder: $placeholder, inputLabel: $inputLabel, send: $send, startOver: $startOver, typing: $typing, unavailable: $unavailable, disclaimer: $disclaimer, disclaimerLink: $disclaimerLink)';
}


}

/// @nodoc
abstract mixin class $AssistantCopyCopyWith<$Res>  {
  factory $AssistantCopyCopyWith(AssistantCopy value, $Res Function(AssistantCopy) _then) = _$AssistantCopyCopyWithImpl;
@useResult
$Res call({
 LocalizedText name, LocalizedText subtitle, LocalizedText intro, LocalizedList starters, LocalizedText placeholder, LocalizedText inputLabel, LocalizedText send, LocalizedText startOver, LocalizedText typing, LocalizedText unavailable, LocalizedText disclaimer, LocalizedText disclaimerLink
});


$LocalizedTextCopyWith<$Res> get name;$LocalizedTextCopyWith<$Res> get subtitle;$LocalizedTextCopyWith<$Res> get intro;$LocalizedListCopyWith<$Res> get starters;$LocalizedTextCopyWith<$Res> get placeholder;$LocalizedTextCopyWith<$Res> get inputLabel;$LocalizedTextCopyWith<$Res> get send;$LocalizedTextCopyWith<$Res> get startOver;$LocalizedTextCopyWith<$Res> get typing;$LocalizedTextCopyWith<$Res> get unavailable;$LocalizedTextCopyWith<$Res> get disclaimer;$LocalizedTextCopyWith<$Res> get disclaimerLink;

}
/// @nodoc
class _$AssistantCopyCopyWithImpl<$Res>
    implements $AssistantCopyCopyWith<$Res> {
  _$AssistantCopyCopyWithImpl(this._self, this._then);

  final AssistantCopy _self;
  final $Res Function(AssistantCopy) _then;

/// Create a copy of AssistantCopy
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? name = null,Object? subtitle = null,Object? intro = null,Object? starters = null,Object? placeholder = null,Object? inputLabel = null,Object? send = null,Object? startOver = null,Object? typing = null,Object? unavailable = null,Object? disclaimer = null,Object? disclaimerLink = null,}) {
  return _then(_self.copyWith(
name: null == name ? _self.name : name // ignore: cast_nullable_to_non_nullable
as LocalizedText,subtitle: null == subtitle ? _self.subtitle : subtitle // ignore: cast_nullable_to_non_nullable
as LocalizedText,intro: null == intro ? _self.intro : intro // ignore: cast_nullable_to_non_nullable
as LocalizedText,starters: null == starters ? _self.starters : starters // ignore: cast_nullable_to_non_nullable
as LocalizedList,placeholder: null == placeholder ? _self.placeholder : placeholder // ignore: cast_nullable_to_non_nullable
as LocalizedText,inputLabel: null == inputLabel ? _self.inputLabel : inputLabel // ignore: cast_nullable_to_non_nullable
as LocalizedText,send: null == send ? _self.send : send // ignore: cast_nullable_to_non_nullable
as LocalizedText,startOver: null == startOver ? _self.startOver : startOver // ignore: cast_nullable_to_non_nullable
as LocalizedText,typing: null == typing ? _self.typing : typing // ignore: cast_nullable_to_non_nullable
as LocalizedText,unavailable: null == unavailable ? _self.unavailable : unavailable // ignore: cast_nullable_to_non_nullable
as LocalizedText,disclaimer: null == disclaimer ? _self.disclaimer : disclaimer // ignore: cast_nullable_to_non_nullable
as LocalizedText,disclaimerLink: null == disclaimerLink ? _self.disclaimerLink : disclaimerLink // ignore: cast_nullable_to_non_nullable
as LocalizedText,
  ));
}
/// Create a copy of AssistantCopy
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get name {
  
  return $LocalizedTextCopyWith<$Res>(_self.name, (value) {
    return _then(_self.copyWith(name: value));
  });
}/// Create a copy of AssistantCopy
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get subtitle {
  
  return $LocalizedTextCopyWith<$Res>(_self.subtitle, (value) {
    return _then(_self.copyWith(subtitle: value));
  });
}/// Create a copy of AssistantCopy
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get intro {
  
  return $LocalizedTextCopyWith<$Res>(_self.intro, (value) {
    return _then(_self.copyWith(intro: value));
  });
}/// Create a copy of AssistantCopy
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedListCopyWith<$Res> get starters {
  
  return $LocalizedListCopyWith<$Res>(_self.starters, (value) {
    return _then(_self.copyWith(starters: value));
  });
}/// Create a copy of AssistantCopy
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get placeholder {
  
  return $LocalizedTextCopyWith<$Res>(_self.placeholder, (value) {
    return _then(_self.copyWith(placeholder: value));
  });
}/// Create a copy of AssistantCopy
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get inputLabel {
  
  return $LocalizedTextCopyWith<$Res>(_self.inputLabel, (value) {
    return _then(_self.copyWith(inputLabel: value));
  });
}/// Create a copy of AssistantCopy
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get send {
  
  return $LocalizedTextCopyWith<$Res>(_self.send, (value) {
    return _then(_self.copyWith(send: value));
  });
}/// Create a copy of AssistantCopy
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get startOver {
  
  return $LocalizedTextCopyWith<$Res>(_self.startOver, (value) {
    return _then(_self.copyWith(startOver: value));
  });
}/// Create a copy of AssistantCopy
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get typing {
  
  return $LocalizedTextCopyWith<$Res>(_self.typing, (value) {
    return _then(_self.copyWith(typing: value));
  });
}/// Create a copy of AssistantCopy
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get unavailable {
  
  return $LocalizedTextCopyWith<$Res>(_self.unavailable, (value) {
    return _then(_self.copyWith(unavailable: value));
  });
}/// Create a copy of AssistantCopy
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get disclaimer {
  
  return $LocalizedTextCopyWith<$Res>(_self.disclaimer, (value) {
    return _then(_self.copyWith(disclaimer: value));
  });
}/// Create a copy of AssistantCopy
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get disclaimerLink {
  
  return $LocalizedTextCopyWith<$Res>(_self.disclaimerLink, (value) {
    return _then(_self.copyWith(disclaimerLink: value));
  });
}
}


/// Adds pattern-matching-related methods to [AssistantCopy].
extension AssistantCopyPatterns on AssistantCopy {
/// A variant of `map` that fallback to returning `orElse`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _AssistantCopy value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _AssistantCopy() when $default != null:
return $default(_that);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// Callbacks receives the raw object, upcasted.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case final Subclass2 value:
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _AssistantCopy value)  $default,){
final _that = this;
switch (_that) {
case _AssistantCopy():
return $default(_that);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `map` that fallback to returning `null`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _AssistantCopy value)?  $default,){
final _that = this;
switch (_that) {
case _AssistantCopy() when $default != null:
return $default(_that);case _:
  return null;

}
}
/// A variant of `when` that fallback to an `orElse` callback.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( LocalizedText name,  LocalizedText subtitle,  LocalizedText intro,  LocalizedList starters,  LocalizedText placeholder,  LocalizedText inputLabel,  LocalizedText send,  LocalizedText startOver,  LocalizedText typing,  LocalizedText unavailable,  LocalizedText disclaimer,  LocalizedText disclaimerLink)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _AssistantCopy() when $default != null:
return $default(_that.name,_that.subtitle,_that.intro,_that.starters,_that.placeholder,_that.inputLabel,_that.send,_that.startOver,_that.typing,_that.unavailable,_that.disclaimer,_that.disclaimerLink);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// As opposed to `map`, this offers destructuring.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case Subclass2(:final field2):
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( LocalizedText name,  LocalizedText subtitle,  LocalizedText intro,  LocalizedList starters,  LocalizedText placeholder,  LocalizedText inputLabel,  LocalizedText send,  LocalizedText startOver,  LocalizedText typing,  LocalizedText unavailable,  LocalizedText disclaimer,  LocalizedText disclaimerLink)  $default,) {final _that = this;
switch (_that) {
case _AssistantCopy():
return $default(_that.name,_that.subtitle,_that.intro,_that.starters,_that.placeholder,_that.inputLabel,_that.send,_that.startOver,_that.typing,_that.unavailable,_that.disclaimer,_that.disclaimerLink);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `when` that fallback to returning `null`
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( LocalizedText name,  LocalizedText subtitle,  LocalizedText intro,  LocalizedList starters,  LocalizedText placeholder,  LocalizedText inputLabel,  LocalizedText send,  LocalizedText startOver,  LocalizedText typing,  LocalizedText unavailable,  LocalizedText disclaimer,  LocalizedText disclaimerLink)?  $default,) {final _that = this;
switch (_that) {
case _AssistantCopy() when $default != null:
return $default(_that.name,_that.subtitle,_that.intro,_that.starters,_that.placeholder,_that.inputLabel,_that.send,_that.startOver,_that.typing,_that.unavailable,_that.disclaimer,_that.disclaimerLink);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _AssistantCopy implements AssistantCopy {
  const _AssistantCopy({required this.name, required this.subtitle, required this.intro, required this.starters, required this.placeholder, required this.inputLabel, required this.send, required this.startOver, required this.typing, required this.unavailable, required this.disclaimer, required this.disclaimerLink});
  factory _AssistantCopy.fromJson(Map<String, dynamic> json) => _$AssistantCopyFromJson(json);

@override final  LocalizedText name;
@override final  LocalizedText subtitle;
@override final  LocalizedText intro;
@override final  LocalizedList starters;
@override final  LocalizedText placeholder;
@override final  LocalizedText inputLabel;
@override final  LocalizedText send;
@override final  LocalizedText startOver;
@override final  LocalizedText typing;
@override final  LocalizedText unavailable;
/// "AI can make mistakes. For a confirmed quote," followed by [disclaimerLink].
@override final  LocalizedText disclaimer;
@override final  LocalizedText disclaimerLink;

/// Create a copy of AssistantCopy
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$AssistantCopyCopyWith<_AssistantCopy> get copyWith => __$AssistantCopyCopyWithImpl<_AssistantCopy>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$AssistantCopyToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _AssistantCopy&&(identical(other.name, name) || other.name == name)&&(identical(other.subtitle, subtitle) || other.subtitle == subtitle)&&(identical(other.intro, intro) || other.intro == intro)&&(identical(other.starters, starters) || other.starters == starters)&&(identical(other.placeholder, placeholder) || other.placeholder == placeholder)&&(identical(other.inputLabel, inputLabel) || other.inputLabel == inputLabel)&&(identical(other.send, send) || other.send == send)&&(identical(other.startOver, startOver) || other.startOver == startOver)&&(identical(other.typing, typing) || other.typing == typing)&&(identical(other.unavailable, unavailable) || other.unavailable == unavailable)&&(identical(other.disclaimer, disclaimer) || other.disclaimer == disclaimer)&&(identical(other.disclaimerLink, disclaimerLink) || other.disclaimerLink == disclaimerLink));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,name,subtitle,intro,starters,placeholder,inputLabel,send,startOver,typing,unavailable,disclaimer,disclaimerLink);

@override
String toString() {
  return 'AssistantCopy(name: $name, subtitle: $subtitle, intro: $intro, starters: $starters, placeholder: $placeholder, inputLabel: $inputLabel, send: $send, startOver: $startOver, typing: $typing, unavailable: $unavailable, disclaimer: $disclaimer, disclaimerLink: $disclaimerLink)';
}


}

/// @nodoc
abstract mixin class _$AssistantCopyCopyWith<$Res> implements $AssistantCopyCopyWith<$Res> {
  factory _$AssistantCopyCopyWith(_AssistantCopy value, $Res Function(_AssistantCopy) _then) = __$AssistantCopyCopyWithImpl;
@override @useResult
$Res call({
 LocalizedText name, LocalizedText subtitle, LocalizedText intro, LocalizedList starters, LocalizedText placeholder, LocalizedText inputLabel, LocalizedText send, LocalizedText startOver, LocalizedText typing, LocalizedText unavailable, LocalizedText disclaimer, LocalizedText disclaimerLink
});


@override $LocalizedTextCopyWith<$Res> get name;@override $LocalizedTextCopyWith<$Res> get subtitle;@override $LocalizedTextCopyWith<$Res> get intro;@override $LocalizedListCopyWith<$Res> get starters;@override $LocalizedTextCopyWith<$Res> get placeholder;@override $LocalizedTextCopyWith<$Res> get inputLabel;@override $LocalizedTextCopyWith<$Res> get send;@override $LocalizedTextCopyWith<$Res> get startOver;@override $LocalizedTextCopyWith<$Res> get typing;@override $LocalizedTextCopyWith<$Res> get unavailable;@override $LocalizedTextCopyWith<$Res> get disclaimer;@override $LocalizedTextCopyWith<$Res> get disclaimerLink;

}
/// @nodoc
class __$AssistantCopyCopyWithImpl<$Res>
    implements _$AssistantCopyCopyWith<$Res> {
  __$AssistantCopyCopyWithImpl(this._self, this._then);

  final _AssistantCopy _self;
  final $Res Function(_AssistantCopy) _then;

/// Create a copy of AssistantCopy
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? name = null,Object? subtitle = null,Object? intro = null,Object? starters = null,Object? placeholder = null,Object? inputLabel = null,Object? send = null,Object? startOver = null,Object? typing = null,Object? unavailable = null,Object? disclaimer = null,Object? disclaimerLink = null,}) {
  return _then(_AssistantCopy(
name: null == name ? _self.name : name // ignore: cast_nullable_to_non_nullable
as LocalizedText,subtitle: null == subtitle ? _self.subtitle : subtitle // ignore: cast_nullable_to_non_nullable
as LocalizedText,intro: null == intro ? _self.intro : intro // ignore: cast_nullable_to_non_nullable
as LocalizedText,starters: null == starters ? _self.starters : starters // ignore: cast_nullable_to_non_nullable
as LocalizedList,placeholder: null == placeholder ? _self.placeholder : placeholder // ignore: cast_nullable_to_non_nullable
as LocalizedText,inputLabel: null == inputLabel ? _self.inputLabel : inputLabel // ignore: cast_nullable_to_non_nullable
as LocalizedText,send: null == send ? _self.send : send // ignore: cast_nullable_to_non_nullable
as LocalizedText,startOver: null == startOver ? _self.startOver : startOver // ignore: cast_nullable_to_non_nullable
as LocalizedText,typing: null == typing ? _self.typing : typing // ignore: cast_nullable_to_non_nullable
as LocalizedText,unavailable: null == unavailable ? _self.unavailable : unavailable // ignore: cast_nullable_to_non_nullable
as LocalizedText,disclaimer: null == disclaimer ? _self.disclaimer : disclaimer // ignore: cast_nullable_to_non_nullable
as LocalizedText,disclaimerLink: null == disclaimerLink ? _self.disclaimerLink : disclaimerLink // ignore: cast_nullable_to_non_nullable
as LocalizedText,
  ));
}

/// Create a copy of AssistantCopy
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get name {
  
  return $LocalizedTextCopyWith<$Res>(_self.name, (value) {
    return _then(_self.copyWith(name: value));
  });
}/// Create a copy of AssistantCopy
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get subtitle {
  
  return $LocalizedTextCopyWith<$Res>(_self.subtitle, (value) {
    return _then(_self.copyWith(subtitle: value));
  });
}/// Create a copy of AssistantCopy
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get intro {
  
  return $LocalizedTextCopyWith<$Res>(_self.intro, (value) {
    return _then(_self.copyWith(intro: value));
  });
}/// Create a copy of AssistantCopy
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedListCopyWith<$Res> get starters {
  
  return $LocalizedListCopyWith<$Res>(_self.starters, (value) {
    return _then(_self.copyWith(starters: value));
  });
}/// Create a copy of AssistantCopy
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get placeholder {
  
  return $LocalizedTextCopyWith<$Res>(_self.placeholder, (value) {
    return _then(_self.copyWith(placeholder: value));
  });
}/// Create a copy of AssistantCopy
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get inputLabel {
  
  return $LocalizedTextCopyWith<$Res>(_self.inputLabel, (value) {
    return _then(_self.copyWith(inputLabel: value));
  });
}/// Create a copy of AssistantCopy
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get send {
  
  return $LocalizedTextCopyWith<$Res>(_self.send, (value) {
    return _then(_self.copyWith(send: value));
  });
}/// Create a copy of AssistantCopy
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get startOver {
  
  return $LocalizedTextCopyWith<$Res>(_self.startOver, (value) {
    return _then(_self.copyWith(startOver: value));
  });
}/// Create a copy of AssistantCopy
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get typing {
  
  return $LocalizedTextCopyWith<$Res>(_self.typing, (value) {
    return _then(_self.copyWith(typing: value));
  });
}/// Create a copy of AssistantCopy
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get unavailable {
  
  return $LocalizedTextCopyWith<$Res>(_self.unavailable, (value) {
    return _then(_self.copyWith(unavailable: value));
  });
}/// Create a copy of AssistantCopy
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get disclaimer {
  
  return $LocalizedTextCopyWith<$Res>(_self.disclaimer, (value) {
    return _then(_self.copyWith(disclaimer: value));
  });
}/// Create a copy of AssistantCopy
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get disclaimerLink {
  
  return $LocalizedTextCopyWith<$Res>(_self.disclaimerLink, (value) {
    return _then(_self.copyWith(disclaimerLink: value));
  });
}
}


/// @nodoc
mixin _$BusinessFacts {

 LocalizedText get name;/// E.164, e.g. +971582621717.
 String get phone;/// Digits only, for wa.me links.
 String get whatsapp; String get email; LocalizedText get address; OpeningHours get hours; List<Emirate> get emirates;/// A neutral opening message for WhatsApp. It never carries the user's details.
 LocalizedText get whatsappMessage; List<StudioFact> get studioFacts; List<SocialProfile> get socialProfiles; String get siteUrl;
/// Create a copy of BusinessFacts
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$BusinessFactsCopyWith<BusinessFacts> get copyWith => _$BusinessFactsCopyWithImpl<BusinessFacts>(this as BusinessFacts, _$identity);

  /// Serializes this BusinessFacts to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is BusinessFacts&&(identical(other.name, name) || other.name == name)&&(identical(other.phone, phone) || other.phone == phone)&&(identical(other.whatsapp, whatsapp) || other.whatsapp == whatsapp)&&(identical(other.email, email) || other.email == email)&&(identical(other.address, address) || other.address == address)&&(identical(other.hours, hours) || other.hours == hours)&&const DeepCollectionEquality().equals(other.emirates, emirates)&&(identical(other.whatsappMessage, whatsappMessage) || other.whatsappMessage == whatsappMessage)&&const DeepCollectionEquality().equals(other.studioFacts, studioFacts)&&const DeepCollectionEquality().equals(other.socialProfiles, socialProfiles)&&(identical(other.siteUrl, siteUrl) || other.siteUrl == siteUrl));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,name,phone,whatsapp,email,address,hours,const DeepCollectionEquality().hash(emirates),whatsappMessage,const DeepCollectionEquality().hash(studioFacts),const DeepCollectionEquality().hash(socialProfiles),siteUrl);

@override
String toString() {
  return 'BusinessFacts(name: $name, phone: $phone, whatsapp: $whatsapp, email: $email, address: $address, hours: $hours, emirates: $emirates, whatsappMessage: $whatsappMessage, studioFacts: $studioFacts, socialProfiles: $socialProfiles, siteUrl: $siteUrl)';
}


}

/// @nodoc
abstract mixin class $BusinessFactsCopyWith<$Res>  {
  factory $BusinessFactsCopyWith(BusinessFacts value, $Res Function(BusinessFacts) _then) = _$BusinessFactsCopyWithImpl;
@useResult
$Res call({
 LocalizedText name, String phone, String whatsapp, String email, LocalizedText address, OpeningHours hours, List<Emirate> emirates, LocalizedText whatsappMessage, List<StudioFact> studioFacts, List<SocialProfile> socialProfiles, String siteUrl
});


$LocalizedTextCopyWith<$Res> get name;$LocalizedTextCopyWith<$Res> get address;$OpeningHoursCopyWith<$Res> get hours;$LocalizedTextCopyWith<$Res> get whatsappMessage;

}
/// @nodoc
class _$BusinessFactsCopyWithImpl<$Res>
    implements $BusinessFactsCopyWith<$Res> {
  _$BusinessFactsCopyWithImpl(this._self, this._then);

  final BusinessFacts _self;
  final $Res Function(BusinessFacts) _then;

/// Create a copy of BusinessFacts
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? name = null,Object? phone = null,Object? whatsapp = null,Object? email = null,Object? address = null,Object? hours = null,Object? emirates = null,Object? whatsappMessage = null,Object? studioFacts = null,Object? socialProfiles = null,Object? siteUrl = null,}) {
  return _then(_self.copyWith(
name: null == name ? _self.name : name // ignore: cast_nullable_to_non_nullable
as LocalizedText,phone: null == phone ? _self.phone : phone // ignore: cast_nullable_to_non_nullable
as String,whatsapp: null == whatsapp ? _self.whatsapp : whatsapp // ignore: cast_nullable_to_non_nullable
as String,email: null == email ? _self.email : email // ignore: cast_nullable_to_non_nullable
as String,address: null == address ? _self.address : address // ignore: cast_nullable_to_non_nullable
as LocalizedText,hours: null == hours ? _self.hours : hours // ignore: cast_nullable_to_non_nullable
as OpeningHours,emirates: null == emirates ? _self.emirates : emirates // ignore: cast_nullable_to_non_nullable
as List<Emirate>,whatsappMessage: null == whatsappMessage ? _self.whatsappMessage : whatsappMessage // ignore: cast_nullable_to_non_nullable
as LocalizedText,studioFacts: null == studioFacts ? _self.studioFacts : studioFacts // ignore: cast_nullable_to_non_nullable
as List<StudioFact>,socialProfiles: null == socialProfiles ? _self.socialProfiles : socialProfiles // ignore: cast_nullable_to_non_nullable
as List<SocialProfile>,siteUrl: null == siteUrl ? _self.siteUrl : siteUrl // ignore: cast_nullable_to_non_nullable
as String,
  ));
}
/// Create a copy of BusinessFacts
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get name {
  
  return $LocalizedTextCopyWith<$Res>(_self.name, (value) {
    return _then(_self.copyWith(name: value));
  });
}/// Create a copy of BusinessFacts
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get address {
  
  return $LocalizedTextCopyWith<$Res>(_self.address, (value) {
    return _then(_self.copyWith(address: value));
  });
}/// Create a copy of BusinessFacts
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$OpeningHoursCopyWith<$Res> get hours {
  
  return $OpeningHoursCopyWith<$Res>(_self.hours, (value) {
    return _then(_self.copyWith(hours: value));
  });
}/// Create a copy of BusinessFacts
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get whatsappMessage {
  
  return $LocalizedTextCopyWith<$Res>(_self.whatsappMessage, (value) {
    return _then(_self.copyWith(whatsappMessage: value));
  });
}
}


/// Adds pattern-matching-related methods to [BusinessFacts].
extension BusinessFactsPatterns on BusinessFacts {
/// A variant of `map` that fallback to returning `orElse`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _BusinessFacts value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _BusinessFacts() when $default != null:
return $default(_that);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// Callbacks receives the raw object, upcasted.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case final Subclass2 value:
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _BusinessFacts value)  $default,){
final _that = this;
switch (_that) {
case _BusinessFacts():
return $default(_that);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `map` that fallback to returning `null`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _BusinessFacts value)?  $default,){
final _that = this;
switch (_that) {
case _BusinessFacts() when $default != null:
return $default(_that);case _:
  return null;

}
}
/// A variant of `when` that fallback to an `orElse` callback.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( LocalizedText name,  String phone,  String whatsapp,  String email,  LocalizedText address,  OpeningHours hours,  List<Emirate> emirates,  LocalizedText whatsappMessage,  List<StudioFact> studioFacts,  List<SocialProfile> socialProfiles,  String siteUrl)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _BusinessFacts() when $default != null:
return $default(_that.name,_that.phone,_that.whatsapp,_that.email,_that.address,_that.hours,_that.emirates,_that.whatsappMessage,_that.studioFacts,_that.socialProfiles,_that.siteUrl);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// As opposed to `map`, this offers destructuring.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case Subclass2(:final field2):
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( LocalizedText name,  String phone,  String whatsapp,  String email,  LocalizedText address,  OpeningHours hours,  List<Emirate> emirates,  LocalizedText whatsappMessage,  List<StudioFact> studioFacts,  List<SocialProfile> socialProfiles,  String siteUrl)  $default,) {final _that = this;
switch (_that) {
case _BusinessFacts():
return $default(_that.name,_that.phone,_that.whatsapp,_that.email,_that.address,_that.hours,_that.emirates,_that.whatsappMessage,_that.studioFacts,_that.socialProfiles,_that.siteUrl);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `when` that fallback to returning `null`
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( LocalizedText name,  String phone,  String whatsapp,  String email,  LocalizedText address,  OpeningHours hours,  List<Emirate> emirates,  LocalizedText whatsappMessage,  List<StudioFact> studioFacts,  List<SocialProfile> socialProfiles,  String siteUrl)?  $default,) {final _that = this;
switch (_that) {
case _BusinessFacts() when $default != null:
return $default(_that.name,_that.phone,_that.whatsapp,_that.email,_that.address,_that.hours,_that.emirates,_that.whatsappMessage,_that.studioFacts,_that.socialProfiles,_that.siteUrl);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _BusinessFacts implements BusinessFacts {
  const _BusinessFacts({required this.name, required this.phone, required this.whatsapp, required this.email, required this.address, required this.hours, required final  List<Emirate> emirates, required this.whatsappMessage, required final  List<StudioFact> studioFacts, required final  List<SocialProfile> socialProfiles, required this.siteUrl}): _emirates = emirates,_studioFacts = studioFacts,_socialProfiles = socialProfiles;
  factory _BusinessFacts.fromJson(Map<String, dynamic> json) => _$BusinessFactsFromJson(json);

@override final  LocalizedText name;
/// E.164, e.g. +971582621717.
@override final  String phone;
/// Digits only, for wa.me links.
@override final  String whatsapp;
@override final  String email;
@override final  LocalizedText address;
@override final  OpeningHours hours;
 final  List<Emirate> _emirates;
@override List<Emirate> get emirates {
  if (_emirates is EqualUnmodifiableListView) return _emirates;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_emirates);
}

/// A neutral opening message for WhatsApp. It never carries the user's details.
@override final  LocalizedText whatsappMessage;
 final  List<StudioFact> _studioFacts;
@override List<StudioFact> get studioFacts {
  if (_studioFacts is EqualUnmodifiableListView) return _studioFacts;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_studioFacts);
}

 final  List<SocialProfile> _socialProfiles;
@override List<SocialProfile> get socialProfiles {
  if (_socialProfiles is EqualUnmodifiableListView) return _socialProfiles;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_socialProfiles);
}

@override final  String siteUrl;

/// Create a copy of BusinessFacts
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$BusinessFactsCopyWith<_BusinessFacts> get copyWith => __$BusinessFactsCopyWithImpl<_BusinessFacts>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$BusinessFactsToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _BusinessFacts&&(identical(other.name, name) || other.name == name)&&(identical(other.phone, phone) || other.phone == phone)&&(identical(other.whatsapp, whatsapp) || other.whatsapp == whatsapp)&&(identical(other.email, email) || other.email == email)&&(identical(other.address, address) || other.address == address)&&(identical(other.hours, hours) || other.hours == hours)&&const DeepCollectionEquality().equals(other._emirates, _emirates)&&(identical(other.whatsappMessage, whatsappMessage) || other.whatsappMessage == whatsappMessage)&&const DeepCollectionEquality().equals(other._studioFacts, _studioFacts)&&const DeepCollectionEquality().equals(other._socialProfiles, _socialProfiles)&&(identical(other.siteUrl, siteUrl) || other.siteUrl == siteUrl));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,name,phone,whatsapp,email,address,hours,const DeepCollectionEquality().hash(_emirates),whatsappMessage,const DeepCollectionEquality().hash(_studioFacts),const DeepCollectionEquality().hash(_socialProfiles),siteUrl);

@override
String toString() {
  return 'BusinessFacts(name: $name, phone: $phone, whatsapp: $whatsapp, email: $email, address: $address, hours: $hours, emirates: $emirates, whatsappMessage: $whatsappMessage, studioFacts: $studioFacts, socialProfiles: $socialProfiles, siteUrl: $siteUrl)';
}


}

/// @nodoc
abstract mixin class _$BusinessFactsCopyWith<$Res> implements $BusinessFactsCopyWith<$Res> {
  factory _$BusinessFactsCopyWith(_BusinessFacts value, $Res Function(_BusinessFacts) _then) = __$BusinessFactsCopyWithImpl;
@override @useResult
$Res call({
 LocalizedText name, String phone, String whatsapp, String email, LocalizedText address, OpeningHours hours, List<Emirate> emirates, LocalizedText whatsappMessage, List<StudioFact> studioFacts, List<SocialProfile> socialProfiles, String siteUrl
});


@override $LocalizedTextCopyWith<$Res> get name;@override $LocalizedTextCopyWith<$Res> get address;@override $OpeningHoursCopyWith<$Res> get hours;@override $LocalizedTextCopyWith<$Res> get whatsappMessage;

}
/// @nodoc
class __$BusinessFactsCopyWithImpl<$Res>
    implements _$BusinessFactsCopyWith<$Res> {
  __$BusinessFactsCopyWithImpl(this._self, this._then);

  final _BusinessFacts _self;
  final $Res Function(_BusinessFacts) _then;

/// Create a copy of BusinessFacts
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? name = null,Object? phone = null,Object? whatsapp = null,Object? email = null,Object? address = null,Object? hours = null,Object? emirates = null,Object? whatsappMessage = null,Object? studioFacts = null,Object? socialProfiles = null,Object? siteUrl = null,}) {
  return _then(_BusinessFacts(
name: null == name ? _self.name : name // ignore: cast_nullable_to_non_nullable
as LocalizedText,phone: null == phone ? _self.phone : phone // ignore: cast_nullable_to_non_nullable
as String,whatsapp: null == whatsapp ? _self.whatsapp : whatsapp // ignore: cast_nullable_to_non_nullable
as String,email: null == email ? _self.email : email // ignore: cast_nullable_to_non_nullable
as String,address: null == address ? _self.address : address // ignore: cast_nullable_to_non_nullable
as LocalizedText,hours: null == hours ? _self.hours : hours // ignore: cast_nullable_to_non_nullable
as OpeningHours,emirates: null == emirates ? _self._emirates : emirates // ignore: cast_nullable_to_non_nullable
as List<Emirate>,whatsappMessage: null == whatsappMessage ? _self.whatsappMessage : whatsappMessage // ignore: cast_nullable_to_non_nullable
as LocalizedText,studioFacts: null == studioFacts ? _self._studioFacts : studioFacts // ignore: cast_nullable_to_non_nullable
as List<StudioFact>,socialProfiles: null == socialProfiles ? _self._socialProfiles : socialProfiles // ignore: cast_nullable_to_non_nullable
as List<SocialProfile>,siteUrl: null == siteUrl ? _self.siteUrl : siteUrl // ignore: cast_nullable_to_non_nullable
as String,
  ));
}

/// Create a copy of BusinessFacts
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get name {
  
  return $LocalizedTextCopyWith<$Res>(_self.name, (value) {
    return _then(_self.copyWith(name: value));
  });
}/// Create a copy of BusinessFacts
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get address {
  
  return $LocalizedTextCopyWith<$Res>(_self.address, (value) {
    return _then(_self.copyWith(address: value));
  });
}/// Create a copy of BusinessFacts
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$OpeningHoursCopyWith<$Res> get hours {
  
  return $OpeningHoursCopyWith<$Res>(_self.hours, (value) {
    return _then(_self.copyWith(hours: value));
  });
}/// Create a copy of BusinessFacts
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get whatsappMessage {
  
  return $LocalizedTextCopyWith<$Res>(_self.whatsappMessage, (value) {
    return _then(_self.copyWith(whatsappMessage: value));
  });
}
}


/// @nodoc
mixin _$OpeningHours {

/// Lower-case English weekday names, e.g. `monday`.
 List<String> get days;/// 24-hour `HH:mm`, Asia/Dubai.
 String get opens; String get closes; LocalizedText get label;
/// Create a copy of OpeningHours
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$OpeningHoursCopyWith<OpeningHours> get copyWith => _$OpeningHoursCopyWithImpl<OpeningHours>(this as OpeningHours, _$identity);

  /// Serializes this OpeningHours to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is OpeningHours&&const DeepCollectionEquality().equals(other.days, days)&&(identical(other.opens, opens) || other.opens == opens)&&(identical(other.closes, closes) || other.closes == closes)&&(identical(other.label, label) || other.label == label));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,const DeepCollectionEquality().hash(days),opens,closes,label);

@override
String toString() {
  return 'OpeningHours(days: $days, opens: $opens, closes: $closes, label: $label)';
}


}

/// @nodoc
abstract mixin class $OpeningHoursCopyWith<$Res>  {
  factory $OpeningHoursCopyWith(OpeningHours value, $Res Function(OpeningHours) _then) = _$OpeningHoursCopyWithImpl;
@useResult
$Res call({
 List<String> days, String opens, String closes, LocalizedText label
});


$LocalizedTextCopyWith<$Res> get label;

}
/// @nodoc
class _$OpeningHoursCopyWithImpl<$Res>
    implements $OpeningHoursCopyWith<$Res> {
  _$OpeningHoursCopyWithImpl(this._self, this._then);

  final OpeningHours _self;
  final $Res Function(OpeningHours) _then;

/// Create a copy of OpeningHours
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? days = null,Object? opens = null,Object? closes = null,Object? label = null,}) {
  return _then(_self.copyWith(
days: null == days ? _self.days : days // ignore: cast_nullable_to_non_nullable
as List<String>,opens: null == opens ? _self.opens : opens // ignore: cast_nullable_to_non_nullable
as String,closes: null == closes ? _self.closes : closes // ignore: cast_nullable_to_non_nullable
as String,label: null == label ? _self.label : label // ignore: cast_nullable_to_non_nullable
as LocalizedText,
  ));
}
/// Create a copy of OpeningHours
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get label {
  
  return $LocalizedTextCopyWith<$Res>(_self.label, (value) {
    return _then(_self.copyWith(label: value));
  });
}
}


/// Adds pattern-matching-related methods to [OpeningHours].
extension OpeningHoursPatterns on OpeningHours {
/// A variant of `map` that fallback to returning `orElse`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _OpeningHours value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _OpeningHours() when $default != null:
return $default(_that);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// Callbacks receives the raw object, upcasted.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case final Subclass2 value:
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _OpeningHours value)  $default,){
final _that = this;
switch (_that) {
case _OpeningHours():
return $default(_that);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `map` that fallback to returning `null`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _OpeningHours value)?  $default,){
final _that = this;
switch (_that) {
case _OpeningHours() when $default != null:
return $default(_that);case _:
  return null;

}
}
/// A variant of `when` that fallback to an `orElse` callback.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( List<String> days,  String opens,  String closes,  LocalizedText label)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _OpeningHours() when $default != null:
return $default(_that.days,_that.opens,_that.closes,_that.label);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// As opposed to `map`, this offers destructuring.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case Subclass2(:final field2):
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( List<String> days,  String opens,  String closes,  LocalizedText label)  $default,) {final _that = this;
switch (_that) {
case _OpeningHours():
return $default(_that.days,_that.opens,_that.closes,_that.label);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `when` that fallback to returning `null`
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( List<String> days,  String opens,  String closes,  LocalizedText label)?  $default,) {final _that = this;
switch (_that) {
case _OpeningHours() when $default != null:
return $default(_that.days,_that.opens,_that.closes,_that.label);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _OpeningHours implements OpeningHours {
  const _OpeningHours({required final  List<String> days, required this.opens, required this.closes, required this.label}): _days = days;
  factory _OpeningHours.fromJson(Map<String, dynamic> json) => _$OpeningHoursFromJson(json);

/// Lower-case English weekday names, e.g. `monday`.
 final  List<String> _days;
/// Lower-case English weekday names, e.g. `monday`.
@override List<String> get days {
  if (_days is EqualUnmodifiableListView) return _days;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_days);
}

/// 24-hour `HH:mm`, Asia/Dubai.
@override final  String opens;
@override final  String closes;
@override final  LocalizedText label;

/// Create a copy of OpeningHours
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$OpeningHoursCopyWith<_OpeningHours> get copyWith => __$OpeningHoursCopyWithImpl<_OpeningHours>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$OpeningHoursToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _OpeningHours&&const DeepCollectionEquality().equals(other._days, _days)&&(identical(other.opens, opens) || other.opens == opens)&&(identical(other.closes, closes) || other.closes == closes)&&(identical(other.label, label) || other.label == label));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,const DeepCollectionEquality().hash(_days),opens,closes,label);

@override
String toString() {
  return 'OpeningHours(days: $days, opens: $opens, closes: $closes, label: $label)';
}


}

/// @nodoc
abstract mixin class _$OpeningHoursCopyWith<$Res> implements $OpeningHoursCopyWith<$Res> {
  factory _$OpeningHoursCopyWith(_OpeningHours value, $Res Function(_OpeningHours) _then) = __$OpeningHoursCopyWithImpl;
@override @useResult
$Res call({
 List<String> days, String opens, String closes, LocalizedText label
});


@override $LocalizedTextCopyWith<$Res> get label;

}
/// @nodoc
class __$OpeningHoursCopyWithImpl<$Res>
    implements _$OpeningHoursCopyWith<$Res> {
  __$OpeningHoursCopyWithImpl(this._self, this._then);

  final _OpeningHours _self;
  final $Res Function(_OpeningHours) _then;

/// Create a copy of OpeningHours
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? days = null,Object? opens = null,Object? closes = null,Object? label = null,}) {
  return _then(_OpeningHours(
days: null == days ? _self._days : days // ignore: cast_nullable_to_non_nullable
as List<String>,opens: null == opens ? _self.opens : opens // ignore: cast_nullable_to_non_nullable
as String,closes: null == closes ? _self.closes : closes // ignore: cast_nullable_to_non_nullable
as String,label: null == label ? _self.label : label // ignore: cast_nullable_to_non_nullable
as LocalizedText,
  ));
}

/// Create a copy of OpeningHours
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get label {
  
  return $LocalizedTextCopyWith<$Res>(_self.label, (value) {
    return _then(_self.copyWith(label: value));
  });
}
}


/// @nodoc
mixin _$Emirate {

 String get id; LocalizedText get name;
/// Create a copy of Emirate
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$EmirateCopyWith<Emirate> get copyWith => _$EmirateCopyWithImpl<Emirate>(this as Emirate, _$identity);

  /// Serializes this Emirate to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is Emirate&&(identical(other.id, id) || other.id == id)&&(identical(other.name, name) || other.name == name));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,name);

@override
String toString() {
  return 'Emirate(id: $id, name: $name)';
}


}

/// @nodoc
abstract mixin class $EmirateCopyWith<$Res>  {
  factory $EmirateCopyWith(Emirate value, $Res Function(Emirate) _then) = _$EmirateCopyWithImpl;
@useResult
$Res call({
 String id, LocalizedText name
});


$LocalizedTextCopyWith<$Res> get name;

}
/// @nodoc
class _$EmirateCopyWithImpl<$Res>
    implements $EmirateCopyWith<$Res> {
  _$EmirateCopyWithImpl(this._self, this._then);

  final Emirate _self;
  final $Res Function(Emirate) _then;

/// Create a copy of Emirate
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? name = null,}) {
  return _then(_self.copyWith(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,name: null == name ? _self.name : name // ignore: cast_nullable_to_non_nullable
as LocalizedText,
  ));
}
/// Create a copy of Emirate
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get name {
  
  return $LocalizedTextCopyWith<$Res>(_self.name, (value) {
    return _then(_self.copyWith(name: value));
  });
}
}


/// Adds pattern-matching-related methods to [Emirate].
extension EmiratePatterns on Emirate {
/// A variant of `map` that fallback to returning `orElse`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _Emirate value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _Emirate() when $default != null:
return $default(_that);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// Callbacks receives the raw object, upcasted.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case final Subclass2 value:
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _Emirate value)  $default,){
final _that = this;
switch (_that) {
case _Emirate():
return $default(_that);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `map` that fallback to returning `null`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _Emirate value)?  $default,){
final _that = this;
switch (_that) {
case _Emirate() when $default != null:
return $default(_that);case _:
  return null;

}
}
/// A variant of `when` that fallback to an `orElse` callback.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String id,  LocalizedText name)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _Emirate() when $default != null:
return $default(_that.id,_that.name);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// As opposed to `map`, this offers destructuring.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case Subclass2(:final field2):
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String id,  LocalizedText name)  $default,) {final _that = this;
switch (_that) {
case _Emirate():
return $default(_that.id,_that.name);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `when` that fallback to returning `null`
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String id,  LocalizedText name)?  $default,) {final _that = this;
switch (_that) {
case _Emirate() when $default != null:
return $default(_that.id,_that.name);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _Emirate implements Emirate {
  const _Emirate({required this.id, required this.name});
  factory _Emirate.fromJson(Map<String, dynamic> json) => _$EmirateFromJson(json);

@override final  String id;
@override final  LocalizedText name;

/// Create a copy of Emirate
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$EmirateCopyWith<_Emirate> get copyWith => __$EmirateCopyWithImpl<_Emirate>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$EmirateToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _Emirate&&(identical(other.id, id) || other.id == id)&&(identical(other.name, name) || other.name == name));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,name);

@override
String toString() {
  return 'Emirate(id: $id, name: $name)';
}


}

/// @nodoc
abstract mixin class _$EmirateCopyWith<$Res> implements $EmirateCopyWith<$Res> {
  factory _$EmirateCopyWith(_Emirate value, $Res Function(_Emirate) _then) = __$EmirateCopyWithImpl;
@override @useResult
$Res call({
 String id, LocalizedText name
});


@override $LocalizedTextCopyWith<$Res> get name;

}
/// @nodoc
class __$EmirateCopyWithImpl<$Res>
    implements _$EmirateCopyWith<$Res> {
  __$EmirateCopyWithImpl(this._self, this._then);

  final _Emirate _self;
  final $Res Function(_Emirate) _then;

/// Create a copy of Emirate
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? name = null,}) {
  return _then(_Emirate(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,name: null == name ? _self.name : name // ignore: cast_nullable_to_non_nullable
as LocalizedText,
  ));
}

/// Create a copy of Emirate
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get name {
  
  return $LocalizedTextCopyWith<$Res>(_self.name, (value) {
    return _then(_self.copyWith(name: value));
  });
}
}


/// @nodoc
mixin _$StudioFact {

 LocalizedText get value; LocalizedText get label;
/// Create a copy of StudioFact
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$StudioFactCopyWith<StudioFact> get copyWith => _$StudioFactCopyWithImpl<StudioFact>(this as StudioFact, _$identity);

  /// Serializes this StudioFact to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is StudioFact&&(identical(other.value, value) || other.value == value)&&(identical(other.label, label) || other.label == label));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,value,label);

@override
String toString() {
  return 'StudioFact(value: $value, label: $label)';
}


}

/// @nodoc
abstract mixin class $StudioFactCopyWith<$Res>  {
  factory $StudioFactCopyWith(StudioFact value, $Res Function(StudioFact) _then) = _$StudioFactCopyWithImpl;
@useResult
$Res call({
 LocalizedText value, LocalizedText label
});


$LocalizedTextCopyWith<$Res> get value;$LocalizedTextCopyWith<$Res> get label;

}
/// @nodoc
class _$StudioFactCopyWithImpl<$Res>
    implements $StudioFactCopyWith<$Res> {
  _$StudioFactCopyWithImpl(this._self, this._then);

  final StudioFact _self;
  final $Res Function(StudioFact) _then;

/// Create a copy of StudioFact
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? value = null,Object? label = null,}) {
  return _then(_self.copyWith(
value: null == value ? _self.value : value // ignore: cast_nullable_to_non_nullable
as LocalizedText,label: null == label ? _self.label : label // ignore: cast_nullable_to_non_nullable
as LocalizedText,
  ));
}
/// Create a copy of StudioFact
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get value {
  
  return $LocalizedTextCopyWith<$Res>(_self.value, (value) {
    return _then(_self.copyWith(value: value));
  });
}/// Create a copy of StudioFact
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get label {
  
  return $LocalizedTextCopyWith<$Res>(_self.label, (value) {
    return _then(_self.copyWith(label: value));
  });
}
}


/// Adds pattern-matching-related methods to [StudioFact].
extension StudioFactPatterns on StudioFact {
/// A variant of `map` that fallback to returning `orElse`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _StudioFact value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _StudioFact() when $default != null:
return $default(_that);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// Callbacks receives the raw object, upcasted.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case final Subclass2 value:
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _StudioFact value)  $default,){
final _that = this;
switch (_that) {
case _StudioFact():
return $default(_that);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `map` that fallback to returning `null`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _StudioFact value)?  $default,){
final _that = this;
switch (_that) {
case _StudioFact() when $default != null:
return $default(_that);case _:
  return null;

}
}
/// A variant of `when` that fallback to an `orElse` callback.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( LocalizedText value,  LocalizedText label)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _StudioFact() when $default != null:
return $default(_that.value,_that.label);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// As opposed to `map`, this offers destructuring.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case Subclass2(:final field2):
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( LocalizedText value,  LocalizedText label)  $default,) {final _that = this;
switch (_that) {
case _StudioFact():
return $default(_that.value,_that.label);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `when` that fallback to returning `null`
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( LocalizedText value,  LocalizedText label)?  $default,) {final _that = this;
switch (_that) {
case _StudioFact() when $default != null:
return $default(_that.value,_that.label);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _StudioFact implements StudioFact {
  const _StudioFact({required this.value, required this.label});
  factory _StudioFact.fromJson(Map<String, dynamic> json) => _$StudioFactFromJson(json);

@override final  LocalizedText value;
@override final  LocalizedText label;

/// Create a copy of StudioFact
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$StudioFactCopyWith<_StudioFact> get copyWith => __$StudioFactCopyWithImpl<_StudioFact>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$StudioFactToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _StudioFact&&(identical(other.value, value) || other.value == value)&&(identical(other.label, label) || other.label == label));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,value,label);

@override
String toString() {
  return 'StudioFact(value: $value, label: $label)';
}


}

/// @nodoc
abstract mixin class _$StudioFactCopyWith<$Res> implements $StudioFactCopyWith<$Res> {
  factory _$StudioFactCopyWith(_StudioFact value, $Res Function(_StudioFact) _then) = __$StudioFactCopyWithImpl;
@override @useResult
$Res call({
 LocalizedText value, LocalizedText label
});


@override $LocalizedTextCopyWith<$Res> get value;@override $LocalizedTextCopyWith<$Res> get label;

}
/// @nodoc
class __$StudioFactCopyWithImpl<$Res>
    implements _$StudioFactCopyWith<$Res> {
  __$StudioFactCopyWithImpl(this._self, this._then);

  final _StudioFact _self;
  final $Res Function(_StudioFact) _then;

/// Create a copy of StudioFact
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? value = null,Object? label = null,}) {
  return _then(_StudioFact(
value: null == value ? _self.value : value // ignore: cast_nullable_to_non_nullable
as LocalizedText,label: null == label ? _self.label : label // ignore: cast_nullable_to_non_nullable
as LocalizedText,
  ));
}

/// Create a copy of StudioFact
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get value {
  
  return $LocalizedTextCopyWith<$Res>(_self.value, (value) {
    return _then(_self.copyWith(value: value));
  });
}/// Create a copy of StudioFact
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get label {
  
  return $LocalizedTextCopyWith<$Res>(_self.label, (value) {
    return _then(_self.copyWith(label: value));
  });
}
}


/// @nodoc
mixin _$SocialProfile {

 String get network; String get url;
/// Create a copy of SocialProfile
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$SocialProfileCopyWith<SocialProfile> get copyWith => _$SocialProfileCopyWithImpl<SocialProfile>(this as SocialProfile, _$identity);

  /// Serializes this SocialProfile to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is SocialProfile&&(identical(other.network, network) || other.network == network)&&(identical(other.url, url) || other.url == url));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,network,url);

@override
String toString() {
  return 'SocialProfile(network: $network, url: $url)';
}


}

/// @nodoc
abstract mixin class $SocialProfileCopyWith<$Res>  {
  factory $SocialProfileCopyWith(SocialProfile value, $Res Function(SocialProfile) _then) = _$SocialProfileCopyWithImpl;
@useResult
$Res call({
 String network, String url
});




}
/// @nodoc
class _$SocialProfileCopyWithImpl<$Res>
    implements $SocialProfileCopyWith<$Res> {
  _$SocialProfileCopyWithImpl(this._self, this._then);

  final SocialProfile _self;
  final $Res Function(SocialProfile) _then;

/// Create a copy of SocialProfile
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? network = null,Object? url = null,}) {
  return _then(_self.copyWith(
network: null == network ? _self.network : network // ignore: cast_nullable_to_non_nullable
as String,url: null == url ? _self.url : url // ignore: cast_nullable_to_non_nullable
as String,
  ));
}

}


/// Adds pattern-matching-related methods to [SocialProfile].
extension SocialProfilePatterns on SocialProfile {
/// A variant of `map` that fallback to returning `orElse`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _SocialProfile value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _SocialProfile() when $default != null:
return $default(_that);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// Callbacks receives the raw object, upcasted.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case final Subclass2 value:
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _SocialProfile value)  $default,){
final _that = this;
switch (_that) {
case _SocialProfile():
return $default(_that);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `map` that fallback to returning `null`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _SocialProfile value)?  $default,){
final _that = this;
switch (_that) {
case _SocialProfile() when $default != null:
return $default(_that);case _:
  return null;

}
}
/// A variant of `when` that fallback to an `orElse` callback.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String network,  String url)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _SocialProfile() when $default != null:
return $default(_that.network,_that.url);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// As opposed to `map`, this offers destructuring.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case Subclass2(:final field2):
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String network,  String url)  $default,) {final _that = this;
switch (_that) {
case _SocialProfile():
return $default(_that.network,_that.url);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `when` that fallback to returning `null`
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String network,  String url)?  $default,) {final _that = this;
switch (_that) {
case _SocialProfile() when $default != null:
return $default(_that.network,_that.url);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _SocialProfile implements SocialProfile {
  const _SocialProfile({required this.network, required this.url});
  factory _SocialProfile.fromJson(Map<String, dynamic> json) => _$SocialProfileFromJson(json);

@override final  String network;
@override final  String url;

/// Create a copy of SocialProfile
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$SocialProfileCopyWith<_SocialProfile> get copyWith => __$SocialProfileCopyWithImpl<_SocialProfile>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$SocialProfileToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _SocialProfile&&(identical(other.network, network) || other.network == network)&&(identical(other.url, url) || other.url == url));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,network,url);

@override
String toString() {
  return 'SocialProfile(network: $network, url: $url)';
}


}

/// @nodoc
abstract mixin class _$SocialProfileCopyWith<$Res> implements $SocialProfileCopyWith<$Res> {
  factory _$SocialProfileCopyWith(_SocialProfile value, $Res Function(_SocialProfile) _then) = __$SocialProfileCopyWithImpl;
@override @useResult
$Res call({
 String network, String url
});




}
/// @nodoc
class __$SocialProfileCopyWithImpl<$Res>
    implements _$SocialProfileCopyWith<$Res> {
  __$SocialProfileCopyWithImpl(this._self, this._then);

  final _SocialProfile _self;
  final $Res Function(_SocialProfile) _then;

/// Create a copy of SocialProfile
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? network = null,Object? url = null,}) {
  return _then(_SocialProfile(
network: null == network ? _self.network : network // ignore: cast_nullable_to_non_nullable
as String,url: null == url ? _self.url : url // ignore: cast_nullable_to_non_nullable
as String,
  ));
}


}


/// @nodoc
mixin _$Service {

/// The website's slug; also the `serviceId` stored on consultation requests.
 String get slug; LocalizedText get name;/// The website's one-line description of the service.
 LocalizedText get summary;/// The website's photo for this service.
 BundledImage get image;/// The website service page's own summary, inclusions and FAQs.
 ServiceDetail get detail;/// Published prices that relate to this service, or null when none are published.
 ServicePricing? get pricing; String? get startingItemId;
/// Create a copy of Service
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$ServiceCopyWith<Service> get copyWith => _$ServiceCopyWithImpl<Service>(this as Service, _$identity);

  /// Serializes this Service to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is Service&&(identical(other.slug, slug) || other.slug == slug)&&(identical(other.name, name) || other.name == name)&&(identical(other.summary, summary) || other.summary == summary)&&(identical(other.image, image) || other.image == image)&&(identical(other.detail, detail) || other.detail == detail)&&(identical(other.pricing, pricing) || other.pricing == pricing)&&(identical(other.startingItemId, startingItemId) || other.startingItemId == startingItemId));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,slug,name,summary,image,detail,pricing,startingItemId);

@override
String toString() {
  return 'Service(slug: $slug, name: $name, summary: $summary, image: $image, detail: $detail, pricing: $pricing, startingItemId: $startingItemId)';
}


}

/// @nodoc
abstract mixin class $ServiceCopyWith<$Res>  {
  factory $ServiceCopyWith(Service value, $Res Function(Service) _then) = _$ServiceCopyWithImpl;
@useResult
$Res call({
 String slug, LocalizedText name, LocalizedText summary, BundledImage image, ServiceDetail detail, ServicePricing? pricing, String? startingItemId
});


$LocalizedTextCopyWith<$Res> get name;$LocalizedTextCopyWith<$Res> get summary;$BundledImageCopyWith<$Res> get image;$ServiceDetailCopyWith<$Res> get detail;$ServicePricingCopyWith<$Res>? get pricing;

}
/// @nodoc
class _$ServiceCopyWithImpl<$Res>
    implements $ServiceCopyWith<$Res> {
  _$ServiceCopyWithImpl(this._self, this._then);

  final Service _self;
  final $Res Function(Service) _then;

/// Create a copy of Service
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? slug = null,Object? name = null,Object? summary = null,Object? image = null,Object? detail = null,Object? pricing = freezed,Object? startingItemId = freezed,}) {
  return _then(_self.copyWith(
slug: null == slug ? _self.slug : slug // ignore: cast_nullable_to_non_nullable
as String,name: null == name ? _self.name : name // ignore: cast_nullable_to_non_nullable
as LocalizedText,summary: null == summary ? _self.summary : summary // ignore: cast_nullable_to_non_nullable
as LocalizedText,image: null == image ? _self.image : image // ignore: cast_nullable_to_non_nullable
as BundledImage,detail: null == detail ? _self.detail : detail // ignore: cast_nullable_to_non_nullable
as ServiceDetail,pricing: freezed == pricing ? _self.pricing : pricing // ignore: cast_nullable_to_non_nullable
as ServicePricing?,startingItemId: freezed == startingItemId ? _self.startingItemId : startingItemId // ignore: cast_nullable_to_non_nullable
as String?,
  ));
}
/// Create a copy of Service
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get name {
  
  return $LocalizedTextCopyWith<$Res>(_self.name, (value) {
    return _then(_self.copyWith(name: value));
  });
}/// Create a copy of Service
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get summary {
  
  return $LocalizedTextCopyWith<$Res>(_self.summary, (value) {
    return _then(_self.copyWith(summary: value));
  });
}/// Create a copy of Service
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$BundledImageCopyWith<$Res> get image {
  
  return $BundledImageCopyWith<$Res>(_self.image, (value) {
    return _then(_self.copyWith(image: value));
  });
}/// Create a copy of Service
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$ServiceDetailCopyWith<$Res> get detail {
  
  return $ServiceDetailCopyWith<$Res>(_self.detail, (value) {
    return _then(_self.copyWith(detail: value));
  });
}/// Create a copy of Service
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$ServicePricingCopyWith<$Res>? get pricing {
    if (_self.pricing == null) {
    return null;
  }

  return $ServicePricingCopyWith<$Res>(_self.pricing!, (value) {
    return _then(_self.copyWith(pricing: value));
  });
}
}


/// Adds pattern-matching-related methods to [Service].
extension ServicePatterns on Service {
/// A variant of `map` that fallback to returning `orElse`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _Service value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _Service() when $default != null:
return $default(_that);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// Callbacks receives the raw object, upcasted.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case final Subclass2 value:
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _Service value)  $default,){
final _that = this;
switch (_that) {
case _Service():
return $default(_that);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `map` that fallback to returning `null`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _Service value)?  $default,){
final _that = this;
switch (_that) {
case _Service() when $default != null:
return $default(_that);case _:
  return null;

}
}
/// A variant of `when` that fallback to an `orElse` callback.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String slug,  LocalizedText name,  LocalizedText summary,  BundledImage image,  ServiceDetail detail,  ServicePricing? pricing,  String? startingItemId)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _Service() when $default != null:
return $default(_that.slug,_that.name,_that.summary,_that.image,_that.detail,_that.pricing,_that.startingItemId);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// As opposed to `map`, this offers destructuring.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case Subclass2(:final field2):
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String slug,  LocalizedText name,  LocalizedText summary,  BundledImage image,  ServiceDetail detail,  ServicePricing? pricing,  String? startingItemId)  $default,) {final _that = this;
switch (_that) {
case _Service():
return $default(_that.slug,_that.name,_that.summary,_that.image,_that.detail,_that.pricing,_that.startingItemId);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `when` that fallback to returning `null`
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String slug,  LocalizedText name,  LocalizedText summary,  BundledImage image,  ServiceDetail detail,  ServicePricing? pricing,  String? startingItemId)?  $default,) {final _that = this;
switch (_that) {
case _Service() when $default != null:
return $default(_that.slug,_that.name,_that.summary,_that.image,_that.detail,_that.pricing,_that.startingItemId);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _Service implements Service {
  const _Service({required this.slug, required this.name, required this.summary, required this.image, required this.detail, required this.pricing, required this.startingItemId});
  factory _Service.fromJson(Map<String, dynamic> json) => _$ServiceFromJson(json);

/// The website's slug; also the `serviceId` stored on consultation requests.
@override final  String slug;
@override final  LocalizedText name;
/// The website's one-line description of the service.
@override final  LocalizedText summary;
/// The website's photo for this service.
@override final  BundledImage image;
/// The website service page's own summary, inclusions and FAQs.
@override final  ServiceDetail detail;
/// Published prices that relate to this service, or null when none are published.
@override final  ServicePricing? pricing;
@override final  String? startingItemId;

/// Create a copy of Service
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$ServiceCopyWith<_Service> get copyWith => __$ServiceCopyWithImpl<_Service>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$ServiceToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _Service&&(identical(other.slug, slug) || other.slug == slug)&&(identical(other.name, name) || other.name == name)&&(identical(other.summary, summary) || other.summary == summary)&&(identical(other.image, image) || other.image == image)&&(identical(other.detail, detail) || other.detail == detail)&&(identical(other.pricing, pricing) || other.pricing == pricing)&&(identical(other.startingItemId, startingItemId) || other.startingItemId == startingItemId));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,slug,name,summary,image,detail,pricing,startingItemId);

@override
String toString() {
  return 'Service(slug: $slug, name: $name, summary: $summary, image: $image, detail: $detail, pricing: $pricing, startingItemId: $startingItemId)';
}


}

/// @nodoc
abstract mixin class _$ServiceCopyWith<$Res> implements $ServiceCopyWith<$Res> {
  factory _$ServiceCopyWith(_Service value, $Res Function(_Service) _then) = __$ServiceCopyWithImpl;
@override @useResult
$Res call({
 String slug, LocalizedText name, LocalizedText summary, BundledImage image, ServiceDetail detail, ServicePricing? pricing, String? startingItemId
});


@override $LocalizedTextCopyWith<$Res> get name;@override $LocalizedTextCopyWith<$Res> get summary;@override $BundledImageCopyWith<$Res> get image;@override $ServiceDetailCopyWith<$Res> get detail;@override $ServicePricingCopyWith<$Res>? get pricing;

}
/// @nodoc
class __$ServiceCopyWithImpl<$Res>
    implements _$ServiceCopyWith<$Res> {
  __$ServiceCopyWithImpl(this._self, this._then);

  final _Service _self;
  final $Res Function(_Service) _then;

/// Create a copy of Service
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? slug = null,Object? name = null,Object? summary = null,Object? image = null,Object? detail = null,Object? pricing = freezed,Object? startingItemId = freezed,}) {
  return _then(_Service(
slug: null == slug ? _self.slug : slug // ignore: cast_nullable_to_non_nullable
as String,name: null == name ? _self.name : name // ignore: cast_nullable_to_non_nullable
as LocalizedText,summary: null == summary ? _self.summary : summary // ignore: cast_nullable_to_non_nullable
as LocalizedText,image: null == image ? _self.image : image // ignore: cast_nullable_to_non_nullable
as BundledImage,detail: null == detail ? _self.detail : detail // ignore: cast_nullable_to_non_nullable
as ServiceDetail,pricing: freezed == pricing ? _self.pricing : pricing // ignore: cast_nullable_to_non_nullable
as ServicePricing?,startingItemId: freezed == startingItemId ? _self.startingItemId : startingItemId // ignore: cast_nullable_to_non_nullable
as String?,
  ));
}

/// Create a copy of Service
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get name {
  
  return $LocalizedTextCopyWith<$Res>(_self.name, (value) {
    return _then(_self.copyWith(name: value));
  });
}/// Create a copy of Service
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get summary {
  
  return $LocalizedTextCopyWith<$Res>(_self.summary, (value) {
    return _then(_self.copyWith(summary: value));
  });
}/// Create a copy of Service
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$BundledImageCopyWith<$Res> get image {
  
  return $BundledImageCopyWith<$Res>(_self.image, (value) {
    return _then(_self.copyWith(image: value));
  });
}/// Create a copy of Service
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$ServiceDetailCopyWith<$Res> get detail {
  
  return $ServiceDetailCopyWith<$Res>(_self.detail, (value) {
    return _then(_self.copyWith(detail: value));
  });
}/// Create a copy of Service
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$ServicePricingCopyWith<$Res>? get pricing {
    if (_self.pricing == null) {
    return null;
  }

  return $ServicePricingCopyWith<$Res>(_self.pricing!, (value) {
    return _then(_self.copyWith(pricing: value));
  });
}
}


/// @nodoc
mixin _$ServiceDetail {

 LocalizedText get summary; LocalizedList get included; List<Faq> get faqs;
/// Create a copy of ServiceDetail
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$ServiceDetailCopyWith<ServiceDetail> get copyWith => _$ServiceDetailCopyWithImpl<ServiceDetail>(this as ServiceDetail, _$identity);

  /// Serializes this ServiceDetail to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is ServiceDetail&&(identical(other.summary, summary) || other.summary == summary)&&(identical(other.included, included) || other.included == included)&&const DeepCollectionEquality().equals(other.faqs, faqs));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,summary,included,const DeepCollectionEquality().hash(faqs));

@override
String toString() {
  return 'ServiceDetail(summary: $summary, included: $included, faqs: $faqs)';
}


}

/// @nodoc
abstract mixin class $ServiceDetailCopyWith<$Res>  {
  factory $ServiceDetailCopyWith(ServiceDetail value, $Res Function(ServiceDetail) _then) = _$ServiceDetailCopyWithImpl;
@useResult
$Res call({
 LocalizedText summary, LocalizedList included, List<Faq> faqs
});


$LocalizedTextCopyWith<$Res> get summary;$LocalizedListCopyWith<$Res> get included;

}
/// @nodoc
class _$ServiceDetailCopyWithImpl<$Res>
    implements $ServiceDetailCopyWith<$Res> {
  _$ServiceDetailCopyWithImpl(this._self, this._then);

  final ServiceDetail _self;
  final $Res Function(ServiceDetail) _then;

/// Create a copy of ServiceDetail
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? summary = null,Object? included = null,Object? faqs = null,}) {
  return _then(_self.copyWith(
summary: null == summary ? _self.summary : summary // ignore: cast_nullable_to_non_nullable
as LocalizedText,included: null == included ? _self.included : included // ignore: cast_nullable_to_non_nullable
as LocalizedList,faqs: null == faqs ? _self.faqs : faqs // ignore: cast_nullable_to_non_nullable
as List<Faq>,
  ));
}
/// Create a copy of ServiceDetail
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get summary {
  
  return $LocalizedTextCopyWith<$Res>(_self.summary, (value) {
    return _then(_self.copyWith(summary: value));
  });
}/// Create a copy of ServiceDetail
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedListCopyWith<$Res> get included {
  
  return $LocalizedListCopyWith<$Res>(_self.included, (value) {
    return _then(_self.copyWith(included: value));
  });
}
}


/// Adds pattern-matching-related methods to [ServiceDetail].
extension ServiceDetailPatterns on ServiceDetail {
/// A variant of `map` that fallback to returning `orElse`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _ServiceDetail value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _ServiceDetail() when $default != null:
return $default(_that);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// Callbacks receives the raw object, upcasted.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case final Subclass2 value:
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _ServiceDetail value)  $default,){
final _that = this;
switch (_that) {
case _ServiceDetail():
return $default(_that);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `map` that fallback to returning `null`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _ServiceDetail value)?  $default,){
final _that = this;
switch (_that) {
case _ServiceDetail() when $default != null:
return $default(_that);case _:
  return null;

}
}
/// A variant of `when` that fallback to an `orElse` callback.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( LocalizedText summary,  LocalizedList included,  List<Faq> faqs)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _ServiceDetail() when $default != null:
return $default(_that.summary,_that.included,_that.faqs);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// As opposed to `map`, this offers destructuring.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case Subclass2(:final field2):
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( LocalizedText summary,  LocalizedList included,  List<Faq> faqs)  $default,) {final _that = this;
switch (_that) {
case _ServiceDetail():
return $default(_that.summary,_that.included,_that.faqs);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `when` that fallback to returning `null`
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( LocalizedText summary,  LocalizedList included,  List<Faq> faqs)?  $default,) {final _that = this;
switch (_that) {
case _ServiceDetail() when $default != null:
return $default(_that.summary,_that.included,_that.faqs);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _ServiceDetail implements ServiceDetail {
  const _ServiceDetail({required this.summary, required this.included, required final  List<Faq> faqs}): _faqs = faqs;
  factory _ServiceDetail.fromJson(Map<String, dynamic> json) => _$ServiceDetailFromJson(json);

@override final  LocalizedText summary;
@override final  LocalizedList included;
 final  List<Faq> _faqs;
@override List<Faq> get faqs {
  if (_faqs is EqualUnmodifiableListView) return _faqs;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_faqs);
}


/// Create a copy of ServiceDetail
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$ServiceDetailCopyWith<_ServiceDetail> get copyWith => __$ServiceDetailCopyWithImpl<_ServiceDetail>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$ServiceDetailToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _ServiceDetail&&(identical(other.summary, summary) || other.summary == summary)&&(identical(other.included, included) || other.included == included)&&const DeepCollectionEquality().equals(other._faqs, _faqs));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,summary,included,const DeepCollectionEquality().hash(_faqs));

@override
String toString() {
  return 'ServiceDetail(summary: $summary, included: $included, faqs: $faqs)';
}


}

/// @nodoc
abstract mixin class _$ServiceDetailCopyWith<$Res> implements $ServiceDetailCopyWith<$Res> {
  factory _$ServiceDetailCopyWith(_ServiceDetail value, $Res Function(_ServiceDetail) _then) = __$ServiceDetailCopyWithImpl;
@override @useResult
$Res call({
 LocalizedText summary, LocalizedList included, List<Faq> faqs
});


@override $LocalizedTextCopyWith<$Res> get summary;@override $LocalizedListCopyWith<$Res> get included;

}
/// @nodoc
class __$ServiceDetailCopyWithImpl<$Res>
    implements _$ServiceDetailCopyWith<$Res> {
  __$ServiceDetailCopyWithImpl(this._self, this._then);

  final _ServiceDetail _self;
  final $Res Function(_ServiceDetail) _then;

/// Create a copy of ServiceDetail
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? summary = null,Object? included = null,Object? faqs = null,}) {
  return _then(_ServiceDetail(
summary: null == summary ? _self.summary : summary // ignore: cast_nullable_to_non_nullable
as LocalizedText,included: null == included ? _self.included : included // ignore: cast_nullable_to_non_nullable
as LocalizedList,faqs: null == faqs ? _self._faqs : faqs // ignore: cast_nullable_to_non_nullable
as List<Faq>,
  ));
}

/// Create a copy of ServiceDetail
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get summary {
  
  return $LocalizedTextCopyWith<$Res>(_self.summary, (value) {
    return _then(_self.copyWith(summary: value));
  });
}/// Create a copy of ServiceDetail
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedListCopyWith<$Res> get included {
  
  return $LocalizedListCopyWith<$Res>(_self.included, (value) {
    return _then(_self.copyWith(included: value));
  });
}
}


/// @nodoc
mixin _$Faq {

 LocalizedText get question; LocalizedText get answer;
/// Create a copy of Faq
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$FaqCopyWith<Faq> get copyWith => _$FaqCopyWithImpl<Faq>(this as Faq, _$identity);

  /// Serializes this Faq to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is Faq&&(identical(other.question, question) || other.question == question)&&(identical(other.answer, answer) || other.answer == answer));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,question,answer);

@override
String toString() {
  return 'Faq(question: $question, answer: $answer)';
}


}

/// @nodoc
abstract mixin class $FaqCopyWith<$Res>  {
  factory $FaqCopyWith(Faq value, $Res Function(Faq) _then) = _$FaqCopyWithImpl;
@useResult
$Res call({
 LocalizedText question, LocalizedText answer
});


$LocalizedTextCopyWith<$Res> get question;$LocalizedTextCopyWith<$Res> get answer;

}
/// @nodoc
class _$FaqCopyWithImpl<$Res>
    implements $FaqCopyWith<$Res> {
  _$FaqCopyWithImpl(this._self, this._then);

  final Faq _self;
  final $Res Function(Faq) _then;

/// Create a copy of Faq
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? question = null,Object? answer = null,}) {
  return _then(_self.copyWith(
question: null == question ? _self.question : question // ignore: cast_nullable_to_non_nullable
as LocalizedText,answer: null == answer ? _self.answer : answer // ignore: cast_nullable_to_non_nullable
as LocalizedText,
  ));
}
/// Create a copy of Faq
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get question {
  
  return $LocalizedTextCopyWith<$Res>(_self.question, (value) {
    return _then(_self.copyWith(question: value));
  });
}/// Create a copy of Faq
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get answer {
  
  return $LocalizedTextCopyWith<$Res>(_self.answer, (value) {
    return _then(_self.copyWith(answer: value));
  });
}
}


/// Adds pattern-matching-related methods to [Faq].
extension FaqPatterns on Faq {
/// A variant of `map` that fallback to returning `orElse`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _Faq value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _Faq() when $default != null:
return $default(_that);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// Callbacks receives the raw object, upcasted.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case final Subclass2 value:
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _Faq value)  $default,){
final _that = this;
switch (_that) {
case _Faq():
return $default(_that);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `map` that fallback to returning `null`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _Faq value)?  $default,){
final _that = this;
switch (_that) {
case _Faq() when $default != null:
return $default(_that);case _:
  return null;

}
}
/// A variant of `when` that fallback to an `orElse` callback.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( LocalizedText question,  LocalizedText answer)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _Faq() when $default != null:
return $default(_that.question,_that.answer);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// As opposed to `map`, this offers destructuring.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case Subclass2(:final field2):
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( LocalizedText question,  LocalizedText answer)  $default,) {final _that = this;
switch (_that) {
case _Faq():
return $default(_that.question,_that.answer);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `when` that fallback to returning `null`
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( LocalizedText question,  LocalizedText answer)?  $default,) {final _that = this;
switch (_that) {
case _Faq() when $default != null:
return $default(_that.question,_that.answer);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _Faq implements Faq {
  const _Faq({required this.question, required this.answer});
  factory _Faq.fromJson(Map<String, dynamic> json) => _$FaqFromJson(json);

@override final  LocalizedText question;
@override final  LocalizedText answer;

/// Create a copy of Faq
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$FaqCopyWith<_Faq> get copyWith => __$FaqCopyWithImpl<_Faq>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$FaqToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _Faq&&(identical(other.question, question) || other.question == question)&&(identical(other.answer, answer) || other.answer == answer));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,question,answer);

@override
String toString() {
  return 'Faq(question: $question, answer: $answer)';
}


}

/// @nodoc
abstract mixin class _$FaqCopyWith<$Res> implements $FaqCopyWith<$Res> {
  factory _$FaqCopyWith(_Faq value, $Res Function(_Faq) _then) = __$FaqCopyWithImpl;
@override @useResult
$Res call({
 LocalizedText question, LocalizedText answer
});


@override $LocalizedTextCopyWith<$Res> get question;@override $LocalizedTextCopyWith<$Res> get answer;

}
/// @nodoc
class __$FaqCopyWithImpl<$Res>
    implements _$FaqCopyWith<$Res> {
  __$FaqCopyWithImpl(this._self, this._then);

  final _Faq _self;
  final $Res Function(_Faq) _then;

/// Create a copy of Faq
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? question = null,Object? answer = null,}) {
  return _then(_Faq(
question: null == question ? _self.question : question // ignore: cast_nullable_to_non_nullable
as LocalizedText,answer: null == answer ? _self.answer : answer // ignore: cast_nullable_to_non_nullable
as LocalizedText,
  ));
}

/// Create a copy of Faq
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get question {
  
  return $LocalizedTextCopyWith<$Res>(_self.question, (value) {
    return _then(_self.copyWith(question: value));
  });
}/// Create a copy of Faq
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get answer {
  
  return $LocalizedTextCopyWith<$Res>(_self.answer, (value) {
    return _then(_self.copyWith(answer: value));
  });
}
}


/// @nodoc
mixin _$ServicePricing {

/// True when the items are this service's own prices; false when they are related
/// prices for part of the work, which must never be shown as the service's price.
 bool get direct; List<String> get itemIds;
/// Create a copy of ServicePricing
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$ServicePricingCopyWith<ServicePricing> get copyWith => _$ServicePricingCopyWithImpl<ServicePricing>(this as ServicePricing, _$identity);

  /// Serializes this ServicePricing to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is ServicePricing&&(identical(other.direct, direct) || other.direct == direct)&&const DeepCollectionEquality().equals(other.itemIds, itemIds));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,direct,const DeepCollectionEquality().hash(itemIds));

@override
String toString() {
  return 'ServicePricing(direct: $direct, itemIds: $itemIds)';
}


}

/// @nodoc
abstract mixin class $ServicePricingCopyWith<$Res>  {
  factory $ServicePricingCopyWith(ServicePricing value, $Res Function(ServicePricing) _then) = _$ServicePricingCopyWithImpl;
@useResult
$Res call({
 bool direct, List<String> itemIds
});




}
/// @nodoc
class _$ServicePricingCopyWithImpl<$Res>
    implements $ServicePricingCopyWith<$Res> {
  _$ServicePricingCopyWithImpl(this._self, this._then);

  final ServicePricing _self;
  final $Res Function(ServicePricing) _then;

/// Create a copy of ServicePricing
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? direct = null,Object? itemIds = null,}) {
  return _then(_self.copyWith(
direct: null == direct ? _self.direct : direct // ignore: cast_nullable_to_non_nullable
as bool,itemIds: null == itemIds ? _self.itemIds : itemIds // ignore: cast_nullable_to_non_nullable
as List<String>,
  ));
}

}


/// Adds pattern-matching-related methods to [ServicePricing].
extension ServicePricingPatterns on ServicePricing {
/// A variant of `map` that fallback to returning `orElse`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _ServicePricing value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _ServicePricing() when $default != null:
return $default(_that);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// Callbacks receives the raw object, upcasted.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case final Subclass2 value:
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _ServicePricing value)  $default,){
final _that = this;
switch (_that) {
case _ServicePricing():
return $default(_that);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `map` that fallback to returning `null`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _ServicePricing value)?  $default,){
final _that = this;
switch (_that) {
case _ServicePricing() when $default != null:
return $default(_that);case _:
  return null;

}
}
/// A variant of `when` that fallback to an `orElse` callback.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( bool direct,  List<String> itemIds)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _ServicePricing() when $default != null:
return $default(_that.direct,_that.itemIds);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// As opposed to `map`, this offers destructuring.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case Subclass2(:final field2):
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( bool direct,  List<String> itemIds)  $default,) {final _that = this;
switch (_that) {
case _ServicePricing():
return $default(_that.direct,_that.itemIds);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `when` that fallback to returning `null`
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( bool direct,  List<String> itemIds)?  $default,) {final _that = this;
switch (_that) {
case _ServicePricing() when $default != null:
return $default(_that.direct,_that.itemIds);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _ServicePricing implements ServicePricing {
  const _ServicePricing({required this.direct, required final  List<String> itemIds}): _itemIds = itemIds;
  factory _ServicePricing.fromJson(Map<String, dynamic> json) => _$ServicePricingFromJson(json);

/// True when the items are this service's own prices; false when they are related
/// prices for part of the work, which must never be shown as the service's price.
@override final  bool direct;
 final  List<String> _itemIds;
@override List<String> get itemIds {
  if (_itemIds is EqualUnmodifiableListView) return _itemIds;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_itemIds);
}


/// Create a copy of ServicePricing
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$ServicePricingCopyWith<_ServicePricing> get copyWith => __$ServicePricingCopyWithImpl<_ServicePricing>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$ServicePricingToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _ServicePricing&&(identical(other.direct, direct) || other.direct == direct)&&const DeepCollectionEquality().equals(other._itemIds, _itemIds));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,direct,const DeepCollectionEquality().hash(_itemIds));

@override
String toString() {
  return 'ServicePricing(direct: $direct, itemIds: $itemIds)';
}


}

/// @nodoc
abstract mixin class _$ServicePricingCopyWith<$Res> implements $ServicePricingCopyWith<$Res> {
  factory _$ServicePricingCopyWith(_ServicePricing value, $Res Function(_ServicePricing) _then) = __$ServicePricingCopyWithImpl;
@override @useResult
$Res call({
 bool direct, List<String> itemIds
});




}
/// @nodoc
class __$ServicePricingCopyWithImpl<$Res>
    implements _$ServicePricingCopyWith<$Res> {
  __$ServicePricingCopyWithImpl(this._self, this._then);

  final _ServicePricing _self;
  final $Res Function(_ServicePricing) _then;

/// Create a copy of ServicePricing
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? direct = null,Object? itemIds = null,}) {
  return _then(_ServicePricing(
direct: null == direct ? _self.direct : direct // ignore: cast_nullable_to_non_nullable
as bool,itemIds: null == itemIds ? _self._itemIds : itemIds // ignore: cast_nullable_to_non_nullable
as List<String>,
  ));
}


}


/// @nodoc
mixin _$Pricing {

 String get currency; bool get vatInclusive; double get vatRate; LocalizedText get disclaimer; List<PriceGroup> get groups;
/// Create a copy of Pricing
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$PricingCopyWith<Pricing> get copyWith => _$PricingCopyWithImpl<Pricing>(this as Pricing, _$identity);

  /// Serializes this Pricing to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is Pricing&&(identical(other.currency, currency) || other.currency == currency)&&(identical(other.vatInclusive, vatInclusive) || other.vatInclusive == vatInclusive)&&(identical(other.vatRate, vatRate) || other.vatRate == vatRate)&&(identical(other.disclaimer, disclaimer) || other.disclaimer == disclaimer)&&const DeepCollectionEquality().equals(other.groups, groups));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,currency,vatInclusive,vatRate,disclaimer,const DeepCollectionEquality().hash(groups));

@override
String toString() {
  return 'Pricing(currency: $currency, vatInclusive: $vatInclusive, vatRate: $vatRate, disclaimer: $disclaimer, groups: $groups)';
}


}

/// @nodoc
abstract mixin class $PricingCopyWith<$Res>  {
  factory $PricingCopyWith(Pricing value, $Res Function(Pricing) _then) = _$PricingCopyWithImpl;
@useResult
$Res call({
 String currency, bool vatInclusive, double vatRate, LocalizedText disclaimer, List<PriceGroup> groups
});


$LocalizedTextCopyWith<$Res> get disclaimer;

}
/// @nodoc
class _$PricingCopyWithImpl<$Res>
    implements $PricingCopyWith<$Res> {
  _$PricingCopyWithImpl(this._self, this._then);

  final Pricing _self;
  final $Res Function(Pricing) _then;

/// Create a copy of Pricing
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? currency = null,Object? vatInclusive = null,Object? vatRate = null,Object? disclaimer = null,Object? groups = null,}) {
  return _then(_self.copyWith(
currency: null == currency ? _self.currency : currency // ignore: cast_nullable_to_non_nullable
as String,vatInclusive: null == vatInclusive ? _self.vatInclusive : vatInclusive // ignore: cast_nullable_to_non_nullable
as bool,vatRate: null == vatRate ? _self.vatRate : vatRate // ignore: cast_nullable_to_non_nullable
as double,disclaimer: null == disclaimer ? _self.disclaimer : disclaimer // ignore: cast_nullable_to_non_nullable
as LocalizedText,groups: null == groups ? _self.groups : groups // ignore: cast_nullable_to_non_nullable
as List<PriceGroup>,
  ));
}
/// Create a copy of Pricing
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get disclaimer {
  
  return $LocalizedTextCopyWith<$Res>(_self.disclaimer, (value) {
    return _then(_self.copyWith(disclaimer: value));
  });
}
}


/// Adds pattern-matching-related methods to [Pricing].
extension PricingPatterns on Pricing {
/// A variant of `map` that fallback to returning `orElse`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _Pricing value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _Pricing() when $default != null:
return $default(_that);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// Callbacks receives the raw object, upcasted.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case final Subclass2 value:
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _Pricing value)  $default,){
final _that = this;
switch (_that) {
case _Pricing():
return $default(_that);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `map` that fallback to returning `null`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _Pricing value)?  $default,){
final _that = this;
switch (_that) {
case _Pricing() when $default != null:
return $default(_that);case _:
  return null;

}
}
/// A variant of `when` that fallback to an `orElse` callback.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String currency,  bool vatInclusive,  double vatRate,  LocalizedText disclaimer,  List<PriceGroup> groups)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _Pricing() when $default != null:
return $default(_that.currency,_that.vatInclusive,_that.vatRate,_that.disclaimer,_that.groups);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// As opposed to `map`, this offers destructuring.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case Subclass2(:final field2):
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String currency,  bool vatInclusive,  double vatRate,  LocalizedText disclaimer,  List<PriceGroup> groups)  $default,) {final _that = this;
switch (_that) {
case _Pricing():
return $default(_that.currency,_that.vatInclusive,_that.vatRate,_that.disclaimer,_that.groups);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `when` that fallback to returning `null`
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String currency,  bool vatInclusive,  double vatRate,  LocalizedText disclaimer,  List<PriceGroup> groups)?  $default,) {final _that = this;
switch (_that) {
case _Pricing() when $default != null:
return $default(_that.currency,_that.vatInclusive,_that.vatRate,_that.disclaimer,_that.groups);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _Pricing implements Pricing {
  const _Pricing({required this.currency, required this.vatInclusive, required this.vatRate, required this.disclaimer, required final  List<PriceGroup> groups}): _groups = groups;
  factory _Pricing.fromJson(Map<String, dynamic> json) => _$PricingFromJson(json);

@override final  String currency;
@override final  bool vatInclusive;
@override final  double vatRate;
@override final  LocalizedText disclaimer;
 final  List<PriceGroup> _groups;
@override List<PriceGroup> get groups {
  if (_groups is EqualUnmodifiableListView) return _groups;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_groups);
}


/// Create a copy of Pricing
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$PricingCopyWith<_Pricing> get copyWith => __$PricingCopyWithImpl<_Pricing>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$PricingToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _Pricing&&(identical(other.currency, currency) || other.currency == currency)&&(identical(other.vatInclusive, vatInclusive) || other.vatInclusive == vatInclusive)&&(identical(other.vatRate, vatRate) || other.vatRate == vatRate)&&(identical(other.disclaimer, disclaimer) || other.disclaimer == disclaimer)&&const DeepCollectionEquality().equals(other._groups, _groups));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,currency,vatInclusive,vatRate,disclaimer,const DeepCollectionEquality().hash(_groups));

@override
String toString() {
  return 'Pricing(currency: $currency, vatInclusive: $vatInclusive, vatRate: $vatRate, disclaimer: $disclaimer, groups: $groups)';
}


}

/// @nodoc
abstract mixin class _$PricingCopyWith<$Res> implements $PricingCopyWith<$Res> {
  factory _$PricingCopyWith(_Pricing value, $Res Function(_Pricing) _then) = __$PricingCopyWithImpl;
@override @useResult
$Res call({
 String currency, bool vatInclusive, double vatRate, LocalizedText disclaimer, List<PriceGroup> groups
});


@override $LocalizedTextCopyWith<$Res> get disclaimer;

}
/// @nodoc
class __$PricingCopyWithImpl<$Res>
    implements _$PricingCopyWith<$Res> {
  __$PricingCopyWithImpl(this._self, this._then);

  final _Pricing _self;
  final $Res Function(_Pricing) _then;

/// Create a copy of Pricing
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? currency = null,Object? vatInclusive = null,Object? vatRate = null,Object? disclaimer = null,Object? groups = null,}) {
  return _then(_Pricing(
currency: null == currency ? _self.currency : currency // ignore: cast_nullable_to_non_nullable
as String,vatInclusive: null == vatInclusive ? _self.vatInclusive : vatInclusive // ignore: cast_nullable_to_non_nullable
as bool,vatRate: null == vatRate ? _self.vatRate : vatRate // ignore: cast_nullable_to_non_nullable
as double,disclaimer: null == disclaimer ? _self.disclaimer : disclaimer // ignore: cast_nullable_to_non_nullable
as LocalizedText,groups: null == groups ? _self._groups : groups // ignore: cast_nullable_to_non_nullable
as List<PriceGroup>,
  ));
}

/// Create a copy of Pricing
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get disclaimer {
  
  return $LocalizedTextCopyWith<$Res>(_self.disclaimer, (value) {
    return _then(_self.copyWith(disclaimer: value));
  });
}
}


/// @nodoc
mixin _$PriceGroup {

 String get id; LocalizedText get kicker; LocalizedText get title; LocalizedText get subtitle; List<PriceItem> get items;
/// Create a copy of PriceGroup
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$PriceGroupCopyWith<PriceGroup> get copyWith => _$PriceGroupCopyWithImpl<PriceGroup>(this as PriceGroup, _$identity);

  /// Serializes this PriceGroup to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is PriceGroup&&(identical(other.id, id) || other.id == id)&&(identical(other.kicker, kicker) || other.kicker == kicker)&&(identical(other.title, title) || other.title == title)&&(identical(other.subtitle, subtitle) || other.subtitle == subtitle)&&const DeepCollectionEquality().equals(other.items, items));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,kicker,title,subtitle,const DeepCollectionEquality().hash(items));

@override
String toString() {
  return 'PriceGroup(id: $id, kicker: $kicker, title: $title, subtitle: $subtitle, items: $items)';
}


}

/// @nodoc
abstract mixin class $PriceGroupCopyWith<$Res>  {
  factory $PriceGroupCopyWith(PriceGroup value, $Res Function(PriceGroup) _then) = _$PriceGroupCopyWithImpl;
@useResult
$Res call({
 String id, LocalizedText kicker, LocalizedText title, LocalizedText subtitle, List<PriceItem> items
});


$LocalizedTextCopyWith<$Res> get kicker;$LocalizedTextCopyWith<$Res> get title;$LocalizedTextCopyWith<$Res> get subtitle;

}
/// @nodoc
class _$PriceGroupCopyWithImpl<$Res>
    implements $PriceGroupCopyWith<$Res> {
  _$PriceGroupCopyWithImpl(this._self, this._then);

  final PriceGroup _self;
  final $Res Function(PriceGroup) _then;

/// Create a copy of PriceGroup
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? kicker = null,Object? title = null,Object? subtitle = null,Object? items = null,}) {
  return _then(_self.copyWith(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,kicker: null == kicker ? _self.kicker : kicker // ignore: cast_nullable_to_non_nullable
as LocalizedText,title: null == title ? _self.title : title // ignore: cast_nullable_to_non_nullable
as LocalizedText,subtitle: null == subtitle ? _self.subtitle : subtitle // ignore: cast_nullable_to_non_nullable
as LocalizedText,items: null == items ? _self.items : items // ignore: cast_nullable_to_non_nullable
as List<PriceItem>,
  ));
}
/// Create a copy of PriceGroup
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get kicker {
  
  return $LocalizedTextCopyWith<$Res>(_self.kicker, (value) {
    return _then(_self.copyWith(kicker: value));
  });
}/// Create a copy of PriceGroup
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get title {
  
  return $LocalizedTextCopyWith<$Res>(_self.title, (value) {
    return _then(_self.copyWith(title: value));
  });
}/// Create a copy of PriceGroup
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get subtitle {
  
  return $LocalizedTextCopyWith<$Res>(_self.subtitle, (value) {
    return _then(_self.copyWith(subtitle: value));
  });
}
}


/// Adds pattern-matching-related methods to [PriceGroup].
extension PriceGroupPatterns on PriceGroup {
/// A variant of `map` that fallback to returning `orElse`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _PriceGroup value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _PriceGroup() when $default != null:
return $default(_that);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// Callbacks receives the raw object, upcasted.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case final Subclass2 value:
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _PriceGroup value)  $default,){
final _that = this;
switch (_that) {
case _PriceGroup():
return $default(_that);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `map` that fallback to returning `null`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _PriceGroup value)?  $default,){
final _that = this;
switch (_that) {
case _PriceGroup() when $default != null:
return $default(_that);case _:
  return null;

}
}
/// A variant of `when` that fallback to an `orElse` callback.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String id,  LocalizedText kicker,  LocalizedText title,  LocalizedText subtitle,  List<PriceItem> items)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _PriceGroup() when $default != null:
return $default(_that.id,_that.kicker,_that.title,_that.subtitle,_that.items);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// As opposed to `map`, this offers destructuring.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case Subclass2(:final field2):
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String id,  LocalizedText kicker,  LocalizedText title,  LocalizedText subtitle,  List<PriceItem> items)  $default,) {final _that = this;
switch (_that) {
case _PriceGroup():
return $default(_that.id,_that.kicker,_that.title,_that.subtitle,_that.items);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `when` that fallback to returning `null`
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String id,  LocalizedText kicker,  LocalizedText title,  LocalizedText subtitle,  List<PriceItem> items)?  $default,) {final _that = this;
switch (_that) {
case _PriceGroup() when $default != null:
return $default(_that.id,_that.kicker,_that.title,_that.subtitle,_that.items);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _PriceGroup implements PriceGroup {
  const _PriceGroup({required this.id, required this.kicker, required this.title, required this.subtitle, required final  List<PriceItem> items}): _items = items;
  factory _PriceGroup.fromJson(Map<String, dynamic> json) => _$PriceGroupFromJson(json);

@override final  String id;
@override final  LocalizedText kicker;
@override final  LocalizedText title;
@override final  LocalizedText subtitle;
 final  List<PriceItem> _items;
@override List<PriceItem> get items {
  if (_items is EqualUnmodifiableListView) return _items;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_items);
}


/// Create a copy of PriceGroup
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$PriceGroupCopyWith<_PriceGroup> get copyWith => __$PriceGroupCopyWithImpl<_PriceGroup>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$PriceGroupToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _PriceGroup&&(identical(other.id, id) || other.id == id)&&(identical(other.kicker, kicker) || other.kicker == kicker)&&(identical(other.title, title) || other.title == title)&&(identical(other.subtitle, subtitle) || other.subtitle == subtitle)&&const DeepCollectionEquality().equals(other._items, _items));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,kicker,title,subtitle,const DeepCollectionEquality().hash(_items));

@override
String toString() {
  return 'PriceGroup(id: $id, kicker: $kicker, title: $title, subtitle: $subtitle, items: $items)';
}


}

/// @nodoc
abstract mixin class _$PriceGroupCopyWith<$Res> implements $PriceGroupCopyWith<$Res> {
  factory _$PriceGroupCopyWith(_PriceGroup value, $Res Function(_PriceGroup) _then) = __$PriceGroupCopyWithImpl;
@override @useResult
$Res call({
 String id, LocalizedText kicker, LocalizedText title, LocalizedText subtitle, List<PriceItem> items
});


@override $LocalizedTextCopyWith<$Res> get kicker;@override $LocalizedTextCopyWith<$Res> get title;@override $LocalizedTextCopyWith<$Res> get subtitle;

}
/// @nodoc
class __$PriceGroupCopyWithImpl<$Res>
    implements _$PriceGroupCopyWith<$Res> {
  __$PriceGroupCopyWithImpl(this._self, this._then);

  final _PriceGroup _self;
  final $Res Function(_PriceGroup) _then;

/// Create a copy of PriceGroup
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? kicker = null,Object? title = null,Object? subtitle = null,Object? items = null,}) {
  return _then(_PriceGroup(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,kicker: null == kicker ? _self.kicker : kicker // ignore: cast_nullable_to_non_nullable
as LocalizedText,title: null == title ? _self.title : title // ignore: cast_nullable_to_non_nullable
as LocalizedText,subtitle: null == subtitle ? _self.subtitle : subtitle // ignore: cast_nullable_to_non_nullable
as LocalizedText,items: null == items ? _self._items : items // ignore: cast_nullable_to_non_nullable
as List<PriceItem>,
  ));
}

/// Create a copy of PriceGroup
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get kicker {
  
  return $LocalizedTextCopyWith<$Res>(_self.kicker, (value) {
    return _then(_self.copyWith(kicker: value));
  });
}/// Create a copy of PriceGroup
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get title {
  
  return $LocalizedTextCopyWith<$Res>(_self.title, (value) {
    return _then(_self.copyWith(title: value));
  });
}/// Create a copy of PriceGroup
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get subtitle {
  
  return $LocalizedTextCopyWith<$Res>(_self.subtitle, (value) {
    return _then(_self.copyWith(subtitle: value));
  });
}
}


/// @nodoc
mixin _$PriceItem {

 String get id; PriceType get priceType; num? get min; num? get max; PriceUnit? get unit; bool get plus; bool get additional; LocalizedText get name;/// Formatted by the website's own formatPrice(), e.g. "From AED 1,800 / linear metre".
 LocalizedText get display;
/// Create a copy of PriceItem
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$PriceItemCopyWith<PriceItem> get copyWith => _$PriceItemCopyWithImpl<PriceItem>(this as PriceItem, _$identity);

  /// Serializes this PriceItem to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is PriceItem&&(identical(other.id, id) || other.id == id)&&(identical(other.priceType, priceType) || other.priceType == priceType)&&(identical(other.min, min) || other.min == min)&&(identical(other.max, max) || other.max == max)&&(identical(other.unit, unit) || other.unit == unit)&&(identical(other.plus, plus) || other.plus == plus)&&(identical(other.additional, additional) || other.additional == additional)&&(identical(other.name, name) || other.name == name)&&(identical(other.display, display) || other.display == display));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,priceType,min,max,unit,plus,additional,name,display);

@override
String toString() {
  return 'PriceItem(id: $id, priceType: $priceType, min: $min, max: $max, unit: $unit, plus: $plus, additional: $additional, name: $name, display: $display)';
}


}

/// @nodoc
abstract mixin class $PriceItemCopyWith<$Res>  {
  factory $PriceItemCopyWith(PriceItem value, $Res Function(PriceItem) _then) = _$PriceItemCopyWithImpl;
@useResult
$Res call({
 String id, PriceType priceType, num? min, num? max, PriceUnit? unit, bool plus, bool additional, LocalizedText name, LocalizedText display
});


$LocalizedTextCopyWith<$Res> get name;$LocalizedTextCopyWith<$Res> get display;

}
/// @nodoc
class _$PriceItemCopyWithImpl<$Res>
    implements $PriceItemCopyWith<$Res> {
  _$PriceItemCopyWithImpl(this._self, this._then);

  final PriceItem _self;
  final $Res Function(PriceItem) _then;

/// Create a copy of PriceItem
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? priceType = null,Object? min = freezed,Object? max = freezed,Object? unit = freezed,Object? plus = null,Object? additional = null,Object? name = null,Object? display = null,}) {
  return _then(_self.copyWith(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,priceType: null == priceType ? _self.priceType : priceType // ignore: cast_nullable_to_non_nullable
as PriceType,min: freezed == min ? _self.min : min // ignore: cast_nullable_to_non_nullable
as num?,max: freezed == max ? _self.max : max // ignore: cast_nullable_to_non_nullable
as num?,unit: freezed == unit ? _self.unit : unit // ignore: cast_nullable_to_non_nullable
as PriceUnit?,plus: null == plus ? _self.plus : plus // ignore: cast_nullable_to_non_nullable
as bool,additional: null == additional ? _self.additional : additional // ignore: cast_nullable_to_non_nullable
as bool,name: null == name ? _self.name : name // ignore: cast_nullable_to_non_nullable
as LocalizedText,display: null == display ? _self.display : display // ignore: cast_nullable_to_non_nullable
as LocalizedText,
  ));
}
/// Create a copy of PriceItem
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get name {
  
  return $LocalizedTextCopyWith<$Res>(_self.name, (value) {
    return _then(_self.copyWith(name: value));
  });
}/// Create a copy of PriceItem
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get display {
  
  return $LocalizedTextCopyWith<$Res>(_self.display, (value) {
    return _then(_self.copyWith(display: value));
  });
}
}


/// Adds pattern-matching-related methods to [PriceItem].
extension PriceItemPatterns on PriceItem {
/// A variant of `map` that fallback to returning `orElse`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _PriceItem value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _PriceItem() when $default != null:
return $default(_that);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// Callbacks receives the raw object, upcasted.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case final Subclass2 value:
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _PriceItem value)  $default,){
final _that = this;
switch (_that) {
case _PriceItem():
return $default(_that);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `map` that fallback to returning `null`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _PriceItem value)?  $default,){
final _that = this;
switch (_that) {
case _PriceItem() when $default != null:
return $default(_that);case _:
  return null;

}
}
/// A variant of `when` that fallback to an `orElse` callback.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String id,  PriceType priceType,  num? min,  num? max,  PriceUnit? unit,  bool plus,  bool additional,  LocalizedText name,  LocalizedText display)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _PriceItem() when $default != null:
return $default(_that.id,_that.priceType,_that.min,_that.max,_that.unit,_that.plus,_that.additional,_that.name,_that.display);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// As opposed to `map`, this offers destructuring.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case Subclass2(:final field2):
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String id,  PriceType priceType,  num? min,  num? max,  PriceUnit? unit,  bool plus,  bool additional,  LocalizedText name,  LocalizedText display)  $default,) {final _that = this;
switch (_that) {
case _PriceItem():
return $default(_that.id,_that.priceType,_that.min,_that.max,_that.unit,_that.plus,_that.additional,_that.name,_that.display);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `when` that fallback to returning `null`
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String id,  PriceType priceType,  num? min,  num? max,  PriceUnit? unit,  bool plus,  bool additional,  LocalizedText name,  LocalizedText display)?  $default,) {final _that = this;
switch (_that) {
case _PriceItem() when $default != null:
return $default(_that.id,_that.priceType,_that.min,_that.max,_that.unit,_that.plus,_that.additional,_that.name,_that.display);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _PriceItem implements PriceItem {
  const _PriceItem({required this.id, required this.priceType, required this.min, required this.max, required this.unit, required this.plus, required this.additional, required this.name, required this.display});
  factory _PriceItem.fromJson(Map<String, dynamic> json) => _$PriceItemFromJson(json);

@override final  String id;
@override final  PriceType priceType;
@override final  num? min;
@override final  num? max;
@override final  PriceUnit? unit;
@override final  bool plus;
@override final  bool additional;
@override final  LocalizedText name;
/// Formatted by the website's own formatPrice(), e.g. "From AED 1,800 / linear metre".
@override final  LocalizedText display;

/// Create a copy of PriceItem
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$PriceItemCopyWith<_PriceItem> get copyWith => __$PriceItemCopyWithImpl<_PriceItem>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$PriceItemToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _PriceItem&&(identical(other.id, id) || other.id == id)&&(identical(other.priceType, priceType) || other.priceType == priceType)&&(identical(other.min, min) || other.min == min)&&(identical(other.max, max) || other.max == max)&&(identical(other.unit, unit) || other.unit == unit)&&(identical(other.plus, plus) || other.plus == plus)&&(identical(other.additional, additional) || other.additional == additional)&&(identical(other.name, name) || other.name == name)&&(identical(other.display, display) || other.display == display));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,priceType,min,max,unit,plus,additional,name,display);

@override
String toString() {
  return 'PriceItem(id: $id, priceType: $priceType, min: $min, max: $max, unit: $unit, plus: $plus, additional: $additional, name: $name, display: $display)';
}


}

/// @nodoc
abstract mixin class _$PriceItemCopyWith<$Res> implements $PriceItemCopyWith<$Res> {
  factory _$PriceItemCopyWith(_PriceItem value, $Res Function(_PriceItem) _then) = __$PriceItemCopyWithImpl;
@override @useResult
$Res call({
 String id, PriceType priceType, num? min, num? max, PriceUnit? unit, bool plus, bool additional, LocalizedText name, LocalizedText display
});


@override $LocalizedTextCopyWith<$Res> get name;@override $LocalizedTextCopyWith<$Res> get display;

}
/// @nodoc
class __$PriceItemCopyWithImpl<$Res>
    implements _$PriceItemCopyWith<$Res> {
  __$PriceItemCopyWithImpl(this._self, this._then);

  final _PriceItem _self;
  final $Res Function(_PriceItem) _then;

/// Create a copy of PriceItem
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? priceType = null,Object? min = freezed,Object? max = freezed,Object? unit = freezed,Object? plus = null,Object? additional = null,Object? name = null,Object? display = null,}) {
  return _then(_PriceItem(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,priceType: null == priceType ? _self.priceType : priceType // ignore: cast_nullable_to_non_nullable
as PriceType,min: freezed == min ? _self.min : min // ignore: cast_nullable_to_non_nullable
as num?,max: freezed == max ? _self.max : max // ignore: cast_nullable_to_non_nullable
as num?,unit: freezed == unit ? _self.unit : unit // ignore: cast_nullable_to_non_nullable
as PriceUnit?,plus: null == plus ? _self.plus : plus // ignore: cast_nullable_to_non_nullable
as bool,additional: null == additional ? _self.additional : additional // ignore: cast_nullable_to_non_nullable
as bool,name: null == name ? _self.name : name // ignore: cast_nullable_to_non_nullable
as LocalizedText,display: null == display ? _self.display : display // ignore: cast_nullable_to_non_nullable
as LocalizedText,
  ));
}

/// Create a copy of PriceItem
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get name {
  
  return $LocalizedTextCopyWith<$Res>(_self.name, (value) {
    return _then(_self.copyWith(name: value));
  });
}/// Create a copy of PriceItem
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get display {
  
  return $LocalizedTextCopyWith<$Res>(_self.display, (value) {
    return _then(_self.copyWith(display: value));
  });
}
}


/// @nodoc
mixin _$Project {

 String get slug; LocalizedText get title; LocalizedText get place; LocalizedText get subtitle; LocalizedText get description; LocalizedText get location; LocalizedText get sector; LocalizedText get size; String get year; LocalizedText get service; LocalizedList get scope; BundledImage get cover;/// Services this project used, as website service slugs.
 List<String> get relatedServiceIds; List<ProjectImage> get images;
/// Create a copy of Project
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$ProjectCopyWith<Project> get copyWith => _$ProjectCopyWithImpl<Project>(this as Project, _$identity);

  /// Serializes this Project to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is Project&&(identical(other.slug, slug) || other.slug == slug)&&(identical(other.title, title) || other.title == title)&&(identical(other.place, place) || other.place == place)&&(identical(other.subtitle, subtitle) || other.subtitle == subtitle)&&(identical(other.description, description) || other.description == description)&&(identical(other.location, location) || other.location == location)&&(identical(other.sector, sector) || other.sector == sector)&&(identical(other.size, size) || other.size == size)&&(identical(other.year, year) || other.year == year)&&(identical(other.service, service) || other.service == service)&&(identical(other.scope, scope) || other.scope == scope)&&(identical(other.cover, cover) || other.cover == cover)&&const DeepCollectionEquality().equals(other.relatedServiceIds, relatedServiceIds)&&const DeepCollectionEquality().equals(other.images, images));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,slug,title,place,subtitle,description,location,sector,size,year,service,scope,cover,const DeepCollectionEquality().hash(relatedServiceIds),const DeepCollectionEquality().hash(images));

@override
String toString() {
  return 'Project(slug: $slug, title: $title, place: $place, subtitle: $subtitle, description: $description, location: $location, sector: $sector, size: $size, year: $year, service: $service, scope: $scope, cover: $cover, relatedServiceIds: $relatedServiceIds, images: $images)';
}


}

/// @nodoc
abstract mixin class $ProjectCopyWith<$Res>  {
  factory $ProjectCopyWith(Project value, $Res Function(Project) _then) = _$ProjectCopyWithImpl;
@useResult
$Res call({
 String slug, LocalizedText title, LocalizedText place, LocalizedText subtitle, LocalizedText description, LocalizedText location, LocalizedText sector, LocalizedText size, String year, LocalizedText service, LocalizedList scope, BundledImage cover, List<String> relatedServiceIds, List<ProjectImage> images
});


$LocalizedTextCopyWith<$Res> get title;$LocalizedTextCopyWith<$Res> get place;$LocalizedTextCopyWith<$Res> get subtitle;$LocalizedTextCopyWith<$Res> get description;$LocalizedTextCopyWith<$Res> get location;$LocalizedTextCopyWith<$Res> get sector;$LocalizedTextCopyWith<$Res> get size;$LocalizedTextCopyWith<$Res> get service;$LocalizedListCopyWith<$Res> get scope;$BundledImageCopyWith<$Res> get cover;

}
/// @nodoc
class _$ProjectCopyWithImpl<$Res>
    implements $ProjectCopyWith<$Res> {
  _$ProjectCopyWithImpl(this._self, this._then);

  final Project _self;
  final $Res Function(Project) _then;

/// Create a copy of Project
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? slug = null,Object? title = null,Object? place = null,Object? subtitle = null,Object? description = null,Object? location = null,Object? sector = null,Object? size = null,Object? year = null,Object? service = null,Object? scope = null,Object? cover = null,Object? relatedServiceIds = null,Object? images = null,}) {
  return _then(_self.copyWith(
slug: null == slug ? _self.slug : slug // ignore: cast_nullable_to_non_nullable
as String,title: null == title ? _self.title : title // ignore: cast_nullable_to_non_nullable
as LocalizedText,place: null == place ? _self.place : place // ignore: cast_nullable_to_non_nullable
as LocalizedText,subtitle: null == subtitle ? _self.subtitle : subtitle // ignore: cast_nullable_to_non_nullable
as LocalizedText,description: null == description ? _self.description : description // ignore: cast_nullable_to_non_nullable
as LocalizedText,location: null == location ? _self.location : location // ignore: cast_nullable_to_non_nullable
as LocalizedText,sector: null == sector ? _self.sector : sector // ignore: cast_nullable_to_non_nullable
as LocalizedText,size: null == size ? _self.size : size // ignore: cast_nullable_to_non_nullable
as LocalizedText,year: null == year ? _self.year : year // ignore: cast_nullable_to_non_nullable
as String,service: null == service ? _self.service : service // ignore: cast_nullable_to_non_nullable
as LocalizedText,scope: null == scope ? _self.scope : scope // ignore: cast_nullable_to_non_nullable
as LocalizedList,cover: null == cover ? _self.cover : cover // ignore: cast_nullable_to_non_nullable
as BundledImage,relatedServiceIds: null == relatedServiceIds ? _self.relatedServiceIds : relatedServiceIds // ignore: cast_nullable_to_non_nullable
as List<String>,images: null == images ? _self.images : images // ignore: cast_nullable_to_non_nullable
as List<ProjectImage>,
  ));
}
/// Create a copy of Project
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get title {
  
  return $LocalizedTextCopyWith<$Res>(_self.title, (value) {
    return _then(_self.copyWith(title: value));
  });
}/// Create a copy of Project
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get place {
  
  return $LocalizedTextCopyWith<$Res>(_self.place, (value) {
    return _then(_self.copyWith(place: value));
  });
}/// Create a copy of Project
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get subtitle {
  
  return $LocalizedTextCopyWith<$Res>(_self.subtitle, (value) {
    return _then(_self.copyWith(subtitle: value));
  });
}/// Create a copy of Project
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get description {
  
  return $LocalizedTextCopyWith<$Res>(_self.description, (value) {
    return _then(_self.copyWith(description: value));
  });
}/// Create a copy of Project
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get location {
  
  return $LocalizedTextCopyWith<$Res>(_self.location, (value) {
    return _then(_self.copyWith(location: value));
  });
}/// Create a copy of Project
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get sector {
  
  return $LocalizedTextCopyWith<$Res>(_self.sector, (value) {
    return _then(_self.copyWith(sector: value));
  });
}/// Create a copy of Project
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get size {
  
  return $LocalizedTextCopyWith<$Res>(_self.size, (value) {
    return _then(_self.copyWith(size: value));
  });
}/// Create a copy of Project
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get service {
  
  return $LocalizedTextCopyWith<$Res>(_self.service, (value) {
    return _then(_self.copyWith(service: value));
  });
}/// Create a copy of Project
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedListCopyWith<$Res> get scope {
  
  return $LocalizedListCopyWith<$Res>(_self.scope, (value) {
    return _then(_self.copyWith(scope: value));
  });
}/// Create a copy of Project
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$BundledImageCopyWith<$Res> get cover {
  
  return $BundledImageCopyWith<$Res>(_self.cover, (value) {
    return _then(_self.copyWith(cover: value));
  });
}
}


/// Adds pattern-matching-related methods to [Project].
extension ProjectPatterns on Project {
/// A variant of `map` that fallback to returning `orElse`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _Project value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _Project() when $default != null:
return $default(_that);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// Callbacks receives the raw object, upcasted.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case final Subclass2 value:
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _Project value)  $default,){
final _that = this;
switch (_that) {
case _Project():
return $default(_that);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `map` that fallback to returning `null`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _Project value)?  $default,){
final _that = this;
switch (_that) {
case _Project() when $default != null:
return $default(_that);case _:
  return null;

}
}
/// A variant of `when` that fallback to an `orElse` callback.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String slug,  LocalizedText title,  LocalizedText place,  LocalizedText subtitle,  LocalizedText description,  LocalizedText location,  LocalizedText sector,  LocalizedText size,  String year,  LocalizedText service,  LocalizedList scope,  BundledImage cover,  List<String> relatedServiceIds,  List<ProjectImage> images)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _Project() when $default != null:
return $default(_that.slug,_that.title,_that.place,_that.subtitle,_that.description,_that.location,_that.sector,_that.size,_that.year,_that.service,_that.scope,_that.cover,_that.relatedServiceIds,_that.images);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// As opposed to `map`, this offers destructuring.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case Subclass2(:final field2):
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String slug,  LocalizedText title,  LocalizedText place,  LocalizedText subtitle,  LocalizedText description,  LocalizedText location,  LocalizedText sector,  LocalizedText size,  String year,  LocalizedText service,  LocalizedList scope,  BundledImage cover,  List<String> relatedServiceIds,  List<ProjectImage> images)  $default,) {final _that = this;
switch (_that) {
case _Project():
return $default(_that.slug,_that.title,_that.place,_that.subtitle,_that.description,_that.location,_that.sector,_that.size,_that.year,_that.service,_that.scope,_that.cover,_that.relatedServiceIds,_that.images);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `when` that fallback to returning `null`
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String slug,  LocalizedText title,  LocalizedText place,  LocalizedText subtitle,  LocalizedText description,  LocalizedText location,  LocalizedText sector,  LocalizedText size,  String year,  LocalizedText service,  LocalizedList scope,  BundledImage cover,  List<String> relatedServiceIds,  List<ProjectImage> images)?  $default,) {final _that = this;
switch (_that) {
case _Project() when $default != null:
return $default(_that.slug,_that.title,_that.place,_that.subtitle,_that.description,_that.location,_that.sector,_that.size,_that.year,_that.service,_that.scope,_that.cover,_that.relatedServiceIds,_that.images);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _Project implements Project {
  const _Project({required this.slug, required this.title, required this.place, required this.subtitle, required this.description, required this.location, required this.sector, required this.size, required this.year, required this.service, required this.scope, required this.cover, required final  List<String> relatedServiceIds, required final  List<ProjectImage> images}): _relatedServiceIds = relatedServiceIds,_images = images;
  factory _Project.fromJson(Map<String, dynamic> json) => _$ProjectFromJson(json);

@override final  String slug;
@override final  LocalizedText title;
@override final  LocalizedText place;
@override final  LocalizedText subtitle;
@override final  LocalizedText description;
@override final  LocalizedText location;
@override final  LocalizedText sector;
@override final  LocalizedText size;
@override final  String year;
@override final  LocalizedText service;
@override final  LocalizedList scope;
@override final  BundledImage cover;
/// Services this project used, as website service slugs.
 final  List<String> _relatedServiceIds;
/// Services this project used, as website service slugs.
@override List<String> get relatedServiceIds {
  if (_relatedServiceIds is EqualUnmodifiableListView) return _relatedServiceIds;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_relatedServiceIds);
}

 final  List<ProjectImage> _images;
@override List<ProjectImage> get images {
  if (_images is EqualUnmodifiableListView) return _images;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_images);
}


/// Create a copy of Project
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$ProjectCopyWith<_Project> get copyWith => __$ProjectCopyWithImpl<_Project>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$ProjectToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _Project&&(identical(other.slug, slug) || other.slug == slug)&&(identical(other.title, title) || other.title == title)&&(identical(other.place, place) || other.place == place)&&(identical(other.subtitle, subtitle) || other.subtitle == subtitle)&&(identical(other.description, description) || other.description == description)&&(identical(other.location, location) || other.location == location)&&(identical(other.sector, sector) || other.sector == sector)&&(identical(other.size, size) || other.size == size)&&(identical(other.year, year) || other.year == year)&&(identical(other.service, service) || other.service == service)&&(identical(other.scope, scope) || other.scope == scope)&&(identical(other.cover, cover) || other.cover == cover)&&const DeepCollectionEquality().equals(other._relatedServiceIds, _relatedServiceIds)&&const DeepCollectionEquality().equals(other._images, _images));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,slug,title,place,subtitle,description,location,sector,size,year,service,scope,cover,const DeepCollectionEquality().hash(_relatedServiceIds),const DeepCollectionEquality().hash(_images));

@override
String toString() {
  return 'Project(slug: $slug, title: $title, place: $place, subtitle: $subtitle, description: $description, location: $location, sector: $sector, size: $size, year: $year, service: $service, scope: $scope, cover: $cover, relatedServiceIds: $relatedServiceIds, images: $images)';
}


}

/// @nodoc
abstract mixin class _$ProjectCopyWith<$Res> implements $ProjectCopyWith<$Res> {
  factory _$ProjectCopyWith(_Project value, $Res Function(_Project) _then) = __$ProjectCopyWithImpl;
@override @useResult
$Res call({
 String slug, LocalizedText title, LocalizedText place, LocalizedText subtitle, LocalizedText description, LocalizedText location, LocalizedText sector, LocalizedText size, String year, LocalizedText service, LocalizedList scope, BundledImage cover, List<String> relatedServiceIds, List<ProjectImage> images
});


@override $LocalizedTextCopyWith<$Res> get title;@override $LocalizedTextCopyWith<$Res> get place;@override $LocalizedTextCopyWith<$Res> get subtitle;@override $LocalizedTextCopyWith<$Res> get description;@override $LocalizedTextCopyWith<$Res> get location;@override $LocalizedTextCopyWith<$Res> get sector;@override $LocalizedTextCopyWith<$Res> get size;@override $LocalizedTextCopyWith<$Res> get service;@override $LocalizedListCopyWith<$Res> get scope;@override $BundledImageCopyWith<$Res> get cover;

}
/// @nodoc
class __$ProjectCopyWithImpl<$Res>
    implements _$ProjectCopyWith<$Res> {
  __$ProjectCopyWithImpl(this._self, this._then);

  final _Project _self;
  final $Res Function(_Project) _then;

/// Create a copy of Project
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? slug = null,Object? title = null,Object? place = null,Object? subtitle = null,Object? description = null,Object? location = null,Object? sector = null,Object? size = null,Object? year = null,Object? service = null,Object? scope = null,Object? cover = null,Object? relatedServiceIds = null,Object? images = null,}) {
  return _then(_Project(
slug: null == slug ? _self.slug : slug // ignore: cast_nullable_to_non_nullable
as String,title: null == title ? _self.title : title // ignore: cast_nullable_to_non_nullable
as LocalizedText,place: null == place ? _self.place : place // ignore: cast_nullable_to_non_nullable
as LocalizedText,subtitle: null == subtitle ? _self.subtitle : subtitle // ignore: cast_nullable_to_non_nullable
as LocalizedText,description: null == description ? _self.description : description // ignore: cast_nullable_to_non_nullable
as LocalizedText,location: null == location ? _self.location : location // ignore: cast_nullable_to_non_nullable
as LocalizedText,sector: null == sector ? _self.sector : sector // ignore: cast_nullable_to_non_nullable
as LocalizedText,size: null == size ? _self.size : size // ignore: cast_nullable_to_non_nullable
as LocalizedText,year: null == year ? _self.year : year // ignore: cast_nullable_to_non_nullable
as String,service: null == service ? _self.service : service // ignore: cast_nullable_to_non_nullable
as LocalizedText,scope: null == scope ? _self.scope : scope // ignore: cast_nullable_to_non_nullable
as LocalizedList,cover: null == cover ? _self.cover : cover // ignore: cast_nullable_to_non_nullable
as BundledImage,relatedServiceIds: null == relatedServiceIds ? _self._relatedServiceIds : relatedServiceIds // ignore: cast_nullable_to_non_nullable
as List<String>,images: null == images ? _self._images : images // ignore: cast_nullable_to_non_nullable
as List<ProjectImage>,
  ));
}

/// Create a copy of Project
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get title {
  
  return $LocalizedTextCopyWith<$Res>(_self.title, (value) {
    return _then(_self.copyWith(title: value));
  });
}/// Create a copy of Project
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get place {
  
  return $LocalizedTextCopyWith<$Res>(_self.place, (value) {
    return _then(_self.copyWith(place: value));
  });
}/// Create a copy of Project
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get subtitle {
  
  return $LocalizedTextCopyWith<$Res>(_self.subtitle, (value) {
    return _then(_self.copyWith(subtitle: value));
  });
}/// Create a copy of Project
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get description {
  
  return $LocalizedTextCopyWith<$Res>(_self.description, (value) {
    return _then(_self.copyWith(description: value));
  });
}/// Create a copy of Project
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get location {
  
  return $LocalizedTextCopyWith<$Res>(_self.location, (value) {
    return _then(_self.copyWith(location: value));
  });
}/// Create a copy of Project
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get sector {
  
  return $LocalizedTextCopyWith<$Res>(_self.sector, (value) {
    return _then(_self.copyWith(sector: value));
  });
}/// Create a copy of Project
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get size {
  
  return $LocalizedTextCopyWith<$Res>(_self.size, (value) {
    return _then(_self.copyWith(size: value));
  });
}/// Create a copy of Project
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get service {
  
  return $LocalizedTextCopyWith<$Res>(_self.service, (value) {
    return _then(_self.copyWith(service: value));
  });
}/// Create a copy of Project
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedListCopyWith<$Res> get scope {
  
  return $LocalizedListCopyWith<$Res>(_self.scope, (value) {
    return _then(_self.copyWith(scope: value));
  });
}/// Create a copy of Project
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$BundledImageCopyWith<$Res> get cover {
  
  return $BundledImageCopyWith<$Res>(_self.cover, (value) {
    return _then(_self.copyWith(cover: value));
  });
}
}


/// @nodoc
mixin _$ProjectImage {

 String get url;/// Descriptive alt text where the website has one; otherwise null and screens fall
/// back to "{project title}, photo n of m", as the website does.
 LocalizedText? get alt;
/// Create a copy of ProjectImage
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$ProjectImageCopyWith<ProjectImage> get copyWith => _$ProjectImageCopyWithImpl<ProjectImage>(this as ProjectImage, _$identity);

  /// Serializes this ProjectImage to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is ProjectImage&&(identical(other.url, url) || other.url == url)&&(identical(other.alt, alt) || other.alt == alt));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,url,alt);

@override
String toString() {
  return 'ProjectImage(url: $url, alt: $alt)';
}


}

/// @nodoc
abstract mixin class $ProjectImageCopyWith<$Res>  {
  factory $ProjectImageCopyWith(ProjectImage value, $Res Function(ProjectImage) _then) = _$ProjectImageCopyWithImpl;
@useResult
$Res call({
 String url, LocalizedText? alt
});


$LocalizedTextCopyWith<$Res>? get alt;

}
/// @nodoc
class _$ProjectImageCopyWithImpl<$Res>
    implements $ProjectImageCopyWith<$Res> {
  _$ProjectImageCopyWithImpl(this._self, this._then);

  final ProjectImage _self;
  final $Res Function(ProjectImage) _then;

/// Create a copy of ProjectImage
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? url = null,Object? alt = freezed,}) {
  return _then(_self.copyWith(
url: null == url ? _self.url : url // ignore: cast_nullable_to_non_nullable
as String,alt: freezed == alt ? _self.alt : alt // ignore: cast_nullable_to_non_nullable
as LocalizedText?,
  ));
}
/// Create a copy of ProjectImage
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res>? get alt {
    if (_self.alt == null) {
    return null;
  }

  return $LocalizedTextCopyWith<$Res>(_self.alt!, (value) {
    return _then(_self.copyWith(alt: value));
  });
}
}


/// Adds pattern-matching-related methods to [ProjectImage].
extension ProjectImagePatterns on ProjectImage {
/// A variant of `map` that fallback to returning `orElse`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _ProjectImage value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _ProjectImage() when $default != null:
return $default(_that);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// Callbacks receives the raw object, upcasted.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case final Subclass2 value:
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _ProjectImage value)  $default,){
final _that = this;
switch (_that) {
case _ProjectImage():
return $default(_that);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `map` that fallback to returning `null`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _ProjectImage value)?  $default,){
final _that = this;
switch (_that) {
case _ProjectImage() when $default != null:
return $default(_that);case _:
  return null;

}
}
/// A variant of `when` that fallback to an `orElse` callback.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String url,  LocalizedText? alt)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _ProjectImage() when $default != null:
return $default(_that.url,_that.alt);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// As opposed to `map`, this offers destructuring.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case Subclass2(:final field2):
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String url,  LocalizedText? alt)  $default,) {final _that = this;
switch (_that) {
case _ProjectImage():
return $default(_that.url,_that.alt);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `when` that fallback to returning `null`
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String url,  LocalizedText? alt)?  $default,) {final _that = this;
switch (_that) {
case _ProjectImage() when $default != null:
return $default(_that.url,_that.alt);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _ProjectImage implements ProjectImage {
  const _ProjectImage({required this.url, required this.alt});
  factory _ProjectImage.fromJson(Map<String, dynamic> json) => _$ProjectImageFromJson(json);

@override final  String url;
/// Descriptive alt text where the website has one; otherwise null and screens fall
/// back to "{project title}, photo n of m", as the website does.
@override final  LocalizedText? alt;

/// Create a copy of ProjectImage
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$ProjectImageCopyWith<_ProjectImage> get copyWith => __$ProjectImageCopyWithImpl<_ProjectImage>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$ProjectImageToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _ProjectImage&&(identical(other.url, url) || other.url == url)&&(identical(other.alt, alt) || other.alt == alt));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,url,alt);

@override
String toString() {
  return 'ProjectImage(url: $url, alt: $alt)';
}


}

/// @nodoc
abstract mixin class _$ProjectImageCopyWith<$Res> implements $ProjectImageCopyWith<$Res> {
  factory _$ProjectImageCopyWith(_ProjectImage value, $Res Function(_ProjectImage) _then) = __$ProjectImageCopyWithImpl;
@override @useResult
$Res call({
 String url, LocalizedText? alt
});


@override $LocalizedTextCopyWith<$Res>? get alt;

}
/// @nodoc
class __$ProjectImageCopyWithImpl<$Res>
    implements _$ProjectImageCopyWith<$Res> {
  __$ProjectImageCopyWithImpl(this._self, this._then);

  final _ProjectImage _self;
  final $Res Function(_ProjectImage) _then;

/// Create a copy of ProjectImage
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? url = null,Object? alt = freezed,}) {
  return _then(_ProjectImage(
url: null == url ? _self.url : url // ignore: cast_nullable_to_non_nullable
as String,alt: freezed == alt ? _self.alt : alt // ignore: cast_nullable_to_non_nullable
as LocalizedText?,
  ));
}

/// Create a copy of ProjectImage
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res>? get alt {
    if (_self.alt == null) {
    return null;
  }

  return $LocalizedTextCopyWith<$Res>(_self.alt!, (value) {
    return _then(_self.copyWith(alt: value));
  });
}
}


/// @nodoc
mixin _$ProcessStep {

 LocalizedText get title; LocalizedText get body; LocalizedText get where;
/// Create a copy of ProcessStep
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$ProcessStepCopyWith<ProcessStep> get copyWith => _$ProcessStepCopyWithImpl<ProcessStep>(this as ProcessStep, _$identity);

  /// Serializes this ProcessStep to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is ProcessStep&&(identical(other.title, title) || other.title == title)&&(identical(other.body, body) || other.body == body)&&(identical(other.where, where) || other.where == where));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,title,body,where);

@override
String toString() {
  return 'ProcessStep(title: $title, body: $body, where: $where)';
}


}

/// @nodoc
abstract mixin class $ProcessStepCopyWith<$Res>  {
  factory $ProcessStepCopyWith(ProcessStep value, $Res Function(ProcessStep) _then) = _$ProcessStepCopyWithImpl;
@useResult
$Res call({
 LocalizedText title, LocalizedText body, LocalizedText where
});


$LocalizedTextCopyWith<$Res> get title;$LocalizedTextCopyWith<$Res> get body;$LocalizedTextCopyWith<$Res> get where;

}
/// @nodoc
class _$ProcessStepCopyWithImpl<$Res>
    implements $ProcessStepCopyWith<$Res> {
  _$ProcessStepCopyWithImpl(this._self, this._then);

  final ProcessStep _self;
  final $Res Function(ProcessStep) _then;

/// Create a copy of ProcessStep
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? title = null,Object? body = null,Object? where = null,}) {
  return _then(_self.copyWith(
title: null == title ? _self.title : title // ignore: cast_nullable_to_non_nullable
as LocalizedText,body: null == body ? _self.body : body // ignore: cast_nullable_to_non_nullable
as LocalizedText,where: null == where ? _self.where : where // ignore: cast_nullable_to_non_nullable
as LocalizedText,
  ));
}
/// Create a copy of ProcessStep
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get title {
  
  return $LocalizedTextCopyWith<$Res>(_self.title, (value) {
    return _then(_self.copyWith(title: value));
  });
}/// Create a copy of ProcessStep
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get body {
  
  return $LocalizedTextCopyWith<$Res>(_self.body, (value) {
    return _then(_self.copyWith(body: value));
  });
}/// Create a copy of ProcessStep
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get where {
  
  return $LocalizedTextCopyWith<$Res>(_self.where, (value) {
    return _then(_self.copyWith(where: value));
  });
}
}


/// Adds pattern-matching-related methods to [ProcessStep].
extension ProcessStepPatterns on ProcessStep {
/// A variant of `map` that fallback to returning `orElse`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _ProcessStep value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _ProcessStep() when $default != null:
return $default(_that);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// Callbacks receives the raw object, upcasted.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case final Subclass2 value:
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _ProcessStep value)  $default,){
final _that = this;
switch (_that) {
case _ProcessStep():
return $default(_that);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `map` that fallback to returning `null`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _ProcessStep value)?  $default,){
final _that = this;
switch (_that) {
case _ProcessStep() when $default != null:
return $default(_that);case _:
  return null;

}
}
/// A variant of `when` that fallback to an `orElse` callback.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( LocalizedText title,  LocalizedText body,  LocalizedText where)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _ProcessStep() when $default != null:
return $default(_that.title,_that.body,_that.where);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// As opposed to `map`, this offers destructuring.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case Subclass2(:final field2):
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( LocalizedText title,  LocalizedText body,  LocalizedText where)  $default,) {final _that = this;
switch (_that) {
case _ProcessStep():
return $default(_that.title,_that.body,_that.where);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `when` that fallback to returning `null`
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( LocalizedText title,  LocalizedText body,  LocalizedText where)?  $default,) {final _that = this;
switch (_that) {
case _ProcessStep() when $default != null:
return $default(_that.title,_that.body,_that.where);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _ProcessStep implements ProcessStep {
  const _ProcessStep({required this.title, required this.body, required this.where});
  factory _ProcessStep.fromJson(Map<String, dynamic> json) => _$ProcessStepFromJson(json);

@override final  LocalizedText title;
@override final  LocalizedText body;
@override final  LocalizedText where;

/// Create a copy of ProcessStep
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$ProcessStepCopyWith<_ProcessStep> get copyWith => __$ProcessStepCopyWithImpl<_ProcessStep>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$ProcessStepToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _ProcessStep&&(identical(other.title, title) || other.title == title)&&(identical(other.body, body) || other.body == body)&&(identical(other.where, where) || other.where == where));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,title,body,where);

@override
String toString() {
  return 'ProcessStep(title: $title, body: $body, where: $where)';
}


}

/// @nodoc
abstract mixin class _$ProcessStepCopyWith<$Res> implements $ProcessStepCopyWith<$Res> {
  factory _$ProcessStepCopyWith(_ProcessStep value, $Res Function(_ProcessStep) _then) = __$ProcessStepCopyWithImpl;
@override @useResult
$Res call({
 LocalizedText title, LocalizedText body, LocalizedText where
});


@override $LocalizedTextCopyWith<$Res> get title;@override $LocalizedTextCopyWith<$Res> get body;@override $LocalizedTextCopyWith<$Res> get where;

}
/// @nodoc
class __$ProcessStepCopyWithImpl<$Res>
    implements _$ProcessStepCopyWith<$Res> {
  __$ProcessStepCopyWithImpl(this._self, this._then);

  final _ProcessStep _self;
  final $Res Function(_ProcessStep) _then;

/// Create a copy of ProcessStep
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? title = null,Object? body = null,Object? where = null,}) {
  return _then(_ProcessStep(
title: null == title ? _self.title : title // ignore: cast_nullable_to_non_nullable
as LocalizedText,body: null == body ? _self.body : body // ignore: cast_nullable_to_non_nullable
as LocalizedText,where: null == where ? _self.where : where // ignore: cast_nullable_to_non_nullable
as LocalizedText,
  ));
}

/// Create a copy of ProcessStep
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get title {
  
  return $LocalizedTextCopyWith<$Res>(_self.title, (value) {
    return _then(_self.copyWith(title: value));
  });
}/// Create a copy of ProcessStep
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get body {
  
  return $LocalizedTextCopyWith<$Res>(_self.body, (value) {
    return _then(_self.copyWith(body: value));
  });
}/// Create a copy of ProcessStep
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get where {
  
  return $LocalizedTextCopyWith<$Res>(_self.where, (value) {
    return _then(_self.copyWith(where: value));
  });
}
}


/// @nodoc
mixin _$Review {

 String get id; String get name; String? get company; int? get rating; String? get date; String? get source; String? get sourceUrl;/// The language the client wrote in; the other side is a labelled translation.
 String get originalLang; LocalizedText get text;
/// Create a copy of Review
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$ReviewCopyWith<Review> get copyWith => _$ReviewCopyWithImpl<Review>(this as Review, _$identity);

  /// Serializes this Review to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is Review&&(identical(other.id, id) || other.id == id)&&(identical(other.name, name) || other.name == name)&&(identical(other.company, company) || other.company == company)&&(identical(other.rating, rating) || other.rating == rating)&&(identical(other.date, date) || other.date == date)&&(identical(other.source, source) || other.source == source)&&(identical(other.sourceUrl, sourceUrl) || other.sourceUrl == sourceUrl)&&(identical(other.originalLang, originalLang) || other.originalLang == originalLang)&&(identical(other.text, text) || other.text == text));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,name,company,rating,date,source,sourceUrl,originalLang,text);

@override
String toString() {
  return 'Review(id: $id, name: $name, company: $company, rating: $rating, date: $date, source: $source, sourceUrl: $sourceUrl, originalLang: $originalLang, text: $text)';
}


}

/// @nodoc
abstract mixin class $ReviewCopyWith<$Res>  {
  factory $ReviewCopyWith(Review value, $Res Function(Review) _then) = _$ReviewCopyWithImpl;
@useResult
$Res call({
 String id, String name, String? company, int? rating, String? date, String? source, String? sourceUrl, String originalLang, LocalizedText text
});


$LocalizedTextCopyWith<$Res> get text;

}
/// @nodoc
class _$ReviewCopyWithImpl<$Res>
    implements $ReviewCopyWith<$Res> {
  _$ReviewCopyWithImpl(this._self, this._then);

  final Review _self;
  final $Res Function(Review) _then;

/// Create a copy of Review
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? name = null,Object? company = freezed,Object? rating = freezed,Object? date = freezed,Object? source = freezed,Object? sourceUrl = freezed,Object? originalLang = null,Object? text = null,}) {
  return _then(_self.copyWith(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,name: null == name ? _self.name : name // ignore: cast_nullable_to_non_nullable
as String,company: freezed == company ? _self.company : company // ignore: cast_nullable_to_non_nullable
as String?,rating: freezed == rating ? _self.rating : rating // ignore: cast_nullable_to_non_nullable
as int?,date: freezed == date ? _self.date : date // ignore: cast_nullable_to_non_nullable
as String?,source: freezed == source ? _self.source : source // ignore: cast_nullable_to_non_nullable
as String?,sourceUrl: freezed == sourceUrl ? _self.sourceUrl : sourceUrl // ignore: cast_nullable_to_non_nullable
as String?,originalLang: null == originalLang ? _self.originalLang : originalLang // ignore: cast_nullable_to_non_nullable
as String,text: null == text ? _self.text : text // ignore: cast_nullable_to_non_nullable
as LocalizedText,
  ));
}
/// Create a copy of Review
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get text {
  
  return $LocalizedTextCopyWith<$Res>(_self.text, (value) {
    return _then(_self.copyWith(text: value));
  });
}
}


/// Adds pattern-matching-related methods to [Review].
extension ReviewPatterns on Review {
/// A variant of `map` that fallback to returning `orElse`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _Review value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _Review() when $default != null:
return $default(_that);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// Callbacks receives the raw object, upcasted.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case final Subclass2 value:
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _Review value)  $default,){
final _that = this;
switch (_that) {
case _Review():
return $default(_that);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `map` that fallback to returning `null`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _Review value)?  $default,){
final _that = this;
switch (_that) {
case _Review() when $default != null:
return $default(_that);case _:
  return null;

}
}
/// A variant of `when` that fallback to an `orElse` callback.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String id,  String name,  String? company,  int? rating,  String? date,  String? source,  String? sourceUrl,  String originalLang,  LocalizedText text)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _Review() when $default != null:
return $default(_that.id,_that.name,_that.company,_that.rating,_that.date,_that.source,_that.sourceUrl,_that.originalLang,_that.text);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// As opposed to `map`, this offers destructuring.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case Subclass2(:final field2):
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String id,  String name,  String? company,  int? rating,  String? date,  String? source,  String? sourceUrl,  String originalLang,  LocalizedText text)  $default,) {final _that = this;
switch (_that) {
case _Review():
return $default(_that.id,_that.name,_that.company,_that.rating,_that.date,_that.source,_that.sourceUrl,_that.originalLang,_that.text);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `when` that fallback to returning `null`
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String id,  String name,  String? company,  int? rating,  String? date,  String? source,  String? sourceUrl,  String originalLang,  LocalizedText text)?  $default,) {final _that = this;
switch (_that) {
case _Review() when $default != null:
return $default(_that.id,_that.name,_that.company,_that.rating,_that.date,_that.source,_that.sourceUrl,_that.originalLang,_that.text);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _Review implements Review {
  const _Review({required this.id, required this.name, required this.company, required this.rating, required this.date, required this.source, required this.sourceUrl, required this.originalLang, required this.text});
  factory _Review.fromJson(Map<String, dynamic> json) => _$ReviewFromJson(json);

@override final  String id;
@override final  String name;
@override final  String? company;
@override final  int? rating;
@override final  String? date;
@override final  String? source;
@override final  String? sourceUrl;
/// The language the client wrote in; the other side is a labelled translation.
@override final  String originalLang;
@override final  LocalizedText text;

/// Create a copy of Review
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$ReviewCopyWith<_Review> get copyWith => __$ReviewCopyWithImpl<_Review>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$ReviewToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _Review&&(identical(other.id, id) || other.id == id)&&(identical(other.name, name) || other.name == name)&&(identical(other.company, company) || other.company == company)&&(identical(other.rating, rating) || other.rating == rating)&&(identical(other.date, date) || other.date == date)&&(identical(other.source, source) || other.source == source)&&(identical(other.sourceUrl, sourceUrl) || other.sourceUrl == sourceUrl)&&(identical(other.originalLang, originalLang) || other.originalLang == originalLang)&&(identical(other.text, text) || other.text == text));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hash(runtimeType,id,name,company,rating,date,source,sourceUrl,originalLang,text);

@override
String toString() {
  return 'Review(id: $id, name: $name, company: $company, rating: $rating, date: $date, source: $source, sourceUrl: $sourceUrl, originalLang: $originalLang, text: $text)';
}


}

/// @nodoc
abstract mixin class _$ReviewCopyWith<$Res> implements $ReviewCopyWith<$Res> {
  factory _$ReviewCopyWith(_Review value, $Res Function(_Review) _then) = __$ReviewCopyWithImpl;
@override @useResult
$Res call({
 String id, String name, String? company, int? rating, String? date, String? source, String? sourceUrl, String originalLang, LocalizedText text
});


@override $LocalizedTextCopyWith<$Res> get text;

}
/// @nodoc
class __$ReviewCopyWithImpl<$Res>
    implements _$ReviewCopyWith<$Res> {
  __$ReviewCopyWithImpl(this._self, this._then);

  final _Review _self;
  final $Res Function(_Review) _then;

/// Create a copy of Review
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? name = null,Object? company = freezed,Object? rating = freezed,Object? date = freezed,Object? source = freezed,Object? sourceUrl = freezed,Object? originalLang = null,Object? text = null,}) {
  return _then(_Review(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,name: null == name ? _self.name : name // ignore: cast_nullable_to_non_nullable
as String,company: freezed == company ? _self.company : company // ignore: cast_nullable_to_non_nullable
as String?,rating: freezed == rating ? _self.rating : rating // ignore: cast_nullable_to_non_nullable
as int?,date: freezed == date ? _self.date : date // ignore: cast_nullable_to_non_nullable
as String?,source: freezed == source ? _self.source : source // ignore: cast_nullable_to_non_nullable
as String?,sourceUrl: freezed == sourceUrl ? _self.sourceUrl : sourceUrl // ignore: cast_nullable_to_non_nullable
as String?,originalLang: null == originalLang ? _self.originalLang : originalLang // ignore: cast_nullable_to_non_nullable
as String,text: null == text ? _self.text : text // ignore: cast_nullable_to_non_nullable
as LocalizedText,
  ));
}

/// Create a copy of Review
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$LocalizedTextCopyWith<$Res> get text {
  
  return $LocalizedTextCopyWith<$Res>(_self.text, (value) {
    return _then(_self.copyWith(text: value));
  });
}
}

// dart format on
