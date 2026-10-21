// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'request_draft.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$RequestDraft {

/// Also the Firestore document id, so a retried send cannot create a second request.
 String get draftId; List<String> get serviceIds; PropertyType? get propertyType; String? get emirateId; String get area; int? get sizeValue; AreaUnit get sizeUnit; bool get sizeUnknown; int? get budgetAed; bool get budgetToDiscuss; ProjectStage? get stage; ConsultationType? get consultationType;/// Calendar day in Asia/Dubai, `YYYY-MM-DD`.
 String? get preferredDate; TimeWindow? get preferredWindow; bool get timeFlexible; String get name; String get phone; String get email; String get note;/// Index of the step the customer was on, so an unfinished request resumes there.
 int get stepIndex;
/// Create a copy of RequestDraft
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$RequestDraftCopyWith<RequestDraft> get copyWith => _$RequestDraftCopyWithImpl<RequestDraft>(this as RequestDraft, _$identity);

  /// Serializes this RequestDraft to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is RequestDraft&&(identical(other.draftId, draftId) || other.draftId == draftId)&&const DeepCollectionEquality().equals(other.serviceIds, serviceIds)&&(identical(other.propertyType, propertyType) || other.propertyType == propertyType)&&(identical(other.emirateId, emirateId) || other.emirateId == emirateId)&&(identical(other.area, area) || other.area == area)&&(identical(other.sizeValue, sizeValue) || other.sizeValue == sizeValue)&&(identical(other.sizeUnit, sizeUnit) || other.sizeUnit == sizeUnit)&&(identical(other.sizeUnknown, sizeUnknown) || other.sizeUnknown == sizeUnknown)&&(identical(other.budgetAed, budgetAed) || other.budgetAed == budgetAed)&&(identical(other.budgetToDiscuss, budgetToDiscuss) || other.budgetToDiscuss == budgetToDiscuss)&&(identical(other.stage, stage) || other.stage == stage)&&(identical(other.consultationType, consultationType) || other.consultationType == consultationType)&&(identical(other.preferredDate, preferredDate) || other.preferredDate == preferredDate)&&(identical(other.preferredWindow, preferredWindow) || other.preferredWindow == preferredWindow)&&(identical(other.timeFlexible, timeFlexible) || other.timeFlexible == timeFlexible)&&(identical(other.name, name) || other.name == name)&&(identical(other.phone, phone) || other.phone == phone)&&(identical(other.email, email) || other.email == email)&&(identical(other.note, note) || other.note == note)&&(identical(other.stepIndex, stepIndex) || other.stepIndex == stepIndex));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hashAll([runtimeType,draftId,const DeepCollectionEquality().hash(serviceIds),propertyType,emirateId,area,sizeValue,sizeUnit,sizeUnknown,budgetAed,budgetToDiscuss,stage,consultationType,preferredDate,preferredWindow,timeFlexible,name,phone,email,note,stepIndex]);

@override
String toString() {
  return 'RequestDraft(draftId: $draftId, serviceIds: $serviceIds, propertyType: $propertyType, emirateId: $emirateId, area: $area, sizeValue: $sizeValue, sizeUnit: $sizeUnit, sizeUnknown: $sizeUnknown, budgetAed: $budgetAed, budgetToDiscuss: $budgetToDiscuss, stage: $stage, consultationType: $consultationType, preferredDate: $preferredDate, preferredWindow: $preferredWindow, timeFlexible: $timeFlexible, name: $name, phone: $phone, email: $email, note: $note, stepIndex: $stepIndex)';
}


}

/// @nodoc
abstract mixin class $RequestDraftCopyWith<$Res>  {
  factory $RequestDraftCopyWith(RequestDraft value, $Res Function(RequestDraft) _then) = _$RequestDraftCopyWithImpl;
@useResult
$Res call({
 String draftId, List<String> serviceIds, PropertyType? propertyType, String? emirateId, String area, int? sizeValue, AreaUnit sizeUnit, bool sizeUnknown, int? budgetAed, bool budgetToDiscuss, ProjectStage? stage, ConsultationType? consultationType, String? preferredDate, TimeWindow? preferredWindow, bool timeFlexible, String name, String phone, String email, String note, int stepIndex
});




}
/// @nodoc
class _$RequestDraftCopyWithImpl<$Res>
    implements $RequestDraftCopyWith<$Res> {
  _$RequestDraftCopyWithImpl(this._self, this._then);

  final RequestDraft _self;
  final $Res Function(RequestDraft) _then;

/// Create a copy of RequestDraft
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? draftId = null,Object? serviceIds = null,Object? propertyType = freezed,Object? emirateId = freezed,Object? area = null,Object? sizeValue = freezed,Object? sizeUnit = null,Object? sizeUnknown = null,Object? budgetAed = freezed,Object? budgetToDiscuss = null,Object? stage = freezed,Object? consultationType = freezed,Object? preferredDate = freezed,Object? preferredWindow = freezed,Object? timeFlexible = null,Object? name = null,Object? phone = null,Object? email = null,Object? note = null,Object? stepIndex = null,}) {
  return _then(_self.copyWith(
draftId: null == draftId ? _self.draftId : draftId // ignore: cast_nullable_to_non_nullable
as String,serviceIds: null == serviceIds ? _self.serviceIds : serviceIds // ignore: cast_nullable_to_non_nullable
as List<String>,propertyType: freezed == propertyType ? _self.propertyType : propertyType // ignore: cast_nullable_to_non_nullable
as PropertyType?,emirateId: freezed == emirateId ? _self.emirateId : emirateId // ignore: cast_nullable_to_non_nullable
as String?,area: null == area ? _self.area : area // ignore: cast_nullable_to_non_nullable
as String,sizeValue: freezed == sizeValue ? _self.sizeValue : sizeValue // ignore: cast_nullable_to_non_nullable
as int?,sizeUnit: null == sizeUnit ? _self.sizeUnit : sizeUnit // ignore: cast_nullable_to_non_nullable
as AreaUnit,sizeUnknown: null == sizeUnknown ? _self.sizeUnknown : sizeUnknown // ignore: cast_nullable_to_non_nullable
as bool,budgetAed: freezed == budgetAed ? _self.budgetAed : budgetAed // ignore: cast_nullable_to_non_nullable
as int?,budgetToDiscuss: null == budgetToDiscuss ? _self.budgetToDiscuss : budgetToDiscuss // ignore: cast_nullable_to_non_nullable
as bool,stage: freezed == stage ? _self.stage : stage // ignore: cast_nullable_to_non_nullable
as ProjectStage?,consultationType: freezed == consultationType ? _self.consultationType : consultationType // ignore: cast_nullable_to_non_nullable
as ConsultationType?,preferredDate: freezed == preferredDate ? _self.preferredDate : preferredDate // ignore: cast_nullable_to_non_nullable
as String?,preferredWindow: freezed == preferredWindow ? _self.preferredWindow : preferredWindow // ignore: cast_nullable_to_non_nullable
as TimeWindow?,timeFlexible: null == timeFlexible ? _self.timeFlexible : timeFlexible // ignore: cast_nullable_to_non_nullable
as bool,name: null == name ? _self.name : name // ignore: cast_nullable_to_non_nullable
as String,phone: null == phone ? _self.phone : phone // ignore: cast_nullable_to_non_nullable
as String,email: null == email ? _self.email : email // ignore: cast_nullable_to_non_nullable
as String,note: null == note ? _self.note : note // ignore: cast_nullable_to_non_nullable
as String,stepIndex: null == stepIndex ? _self.stepIndex : stepIndex // ignore: cast_nullable_to_non_nullable
as int,
  ));
}

}


/// Adds pattern-matching-related methods to [RequestDraft].
extension RequestDraftPatterns on RequestDraft {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _RequestDraft value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _RequestDraft() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _RequestDraft value)  $default,){
final _that = this;
switch (_that) {
case _RequestDraft():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _RequestDraft value)?  $default,){
final _that = this;
switch (_that) {
case _RequestDraft() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String draftId,  List<String> serviceIds,  PropertyType? propertyType,  String? emirateId,  String area,  int? sizeValue,  AreaUnit sizeUnit,  bool sizeUnknown,  int? budgetAed,  bool budgetToDiscuss,  ProjectStage? stage,  ConsultationType? consultationType,  String? preferredDate,  TimeWindow? preferredWindow,  bool timeFlexible,  String name,  String phone,  String email,  String note,  int stepIndex)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _RequestDraft() when $default != null:
return $default(_that.draftId,_that.serviceIds,_that.propertyType,_that.emirateId,_that.area,_that.sizeValue,_that.sizeUnit,_that.sizeUnknown,_that.budgetAed,_that.budgetToDiscuss,_that.stage,_that.consultationType,_that.preferredDate,_that.preferredWindow,_that.timeFlexible,_that.name,_that.phone,_that.email,_that.note,_that.stepIndex);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String draftId,  List<String> serviceIds,  PropertyType? propertyType,  String? emirateId,  String area,  int? sizeValue,  AreaUnit sizeUnit,  bool sizeUnknown,  int? budgetAed,  bool budgetToDiscuss,  ProjectStage? stage,  ConsultationType? consultationType,  String? preferredDate,  TimeWindow? preferredWindow,  bool timeFlexible,  String name,  String phone,  String email,  String note,  int stepIndex)  $default,) {final _that = this;
switch (_that) {
case _RequestDraft():
return $default(_that.draftId,_that.serviceIds,_that.propertyType,_that.emirateId,_that.area,_that.sizeValue,_that.sizeUnit,_that.sizeUnknown,_that.budgetAed,_that.budgetToDiscuss,_that.stage,_that.consultationType,_that.preferredDate,_that.preferredWindow,_that.timeFlexible,_that.name,_that.phone,_that.email,_that.note,_that.stepIndex);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String draftId,  List<String> serviceIds,  PropertyType? propertyType,  String? emirateId,  String area,  int? sizeValue,  AreaUnit sizeUnit,  bool sizeUnknown,  int? budgetAed,  bool budgetToDiscuss,  ProjectStage? stage,  ConsultationType? consultationType,  String? preferredDate,  TimeWindow? preferredWindow,  bool timeFlexible,  String name,  String phone,  String email,  String note,  int stepIndex)?  $default,) {final _that = this;
switch (_that) {
case _RequestDraft() when $default != null:
return $default(_that.draftId,_that.serviceIds,_that.propertyType,_that.emirateId,_that.area,_that.sizeValue,_that.sizeUnit,_that.sizeUnknown,_that.budgetAed,_that.budgetToDiscuss,_that.stage,_that.consultationType,_that.preferredDate,_that.preferredWindow,_that.timeFlexible,_that.name,_that.phone,_that.email,_that.note,_that.stepIndex);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _RequestDraft implements RequestDraft {
  const _RequestDraft({required this.draftId, final  List<String> serviceIds = const <String>[], this.propertyType, this.emirateId, this.area = '', this.sizeValue, this.sizeUnit = AreaUnit.sqft, this.sizeUnknown = false, this.budgetAed, this.budgetToDiscuss = false, this.stage, this.consultationType, this.preferredDate, this.preferredWindow, this.timeFlexible = false, this.name = '', this.phone = '', this.email = '', this.note = '', this.stepIndex = 0}): _serviceIds = serviceIds;
  factory _RequestDraft.fromJson(Map<String, dynamic> json) => _$RequestDraftFromJson(json);

/// Also the Firestore document id, so a retried send cannot create a second request.
@override final  String draftId;
 final  List<String> _serviceIds;
@override@JsonKey() List<String> get serviceIds {
  if (_serviceIds is EqualUnmodifiableListView) return _serviceIds;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_serviceIds);
}

@override final  PropertyType? propertyType;
@override final  String? emirateId;
@override@JsonKey() final  String area;
@override final  int? sizeValue;
@override@JsonKey() final  AreaUnit sizeUnit;
@override@JsonKey() final  bool sizeUnknown;
@override final  int? budgetAed;
@override@JsonKey() final  bool budgetToDiscuss;
@override final  ProjectStage? stage;
@override final  ConsultationType? consultationType;
/// Calendar day in Asia/Dubai, `YYYY-MM-DD`.
@override final  String? preferredDate;
@override final  TimeWindow? preferredWindow;
@override@JsonKey() final  bool timeFlexible;
@override@JsonKey() final  String name;
@override@JsonKey() final  String phone;
@override@JsonKey() final  String email;
@override@JsonKey() final  String note;
/// Index of the step the customer was on, so an unfinished request resumes there.
@override@JsonKey() final  int stepIndex;

/// Create a copy of RequestDraft
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$RequestDraftCopyWith<_RequestDraft> get copyWith => __$RequestDraftCopyWithImpl<_RequestDraft>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$RequestDraftToJson(this, );
}

@override
bool operator ==(Object other) {
  return identical(this, other) || (other.runtimeType == runtimeType&&other is _RequestDraft&&(identical(other.draftId, draftId) || other.draftId == draftId)&&const DeepCollectionEquality().equals(other._serviceIds, _serviceIds)&&(identical(other.propertyType, propertyType) || other.propertyType == propertyType)&&(identical(other.emirateId, emirateId) || other.emirateId == emirateId)&&(identical(other.area, area) || other.area == area)&&(identical(other.sizeValue, sizeValue) || other.sizeValue == sizeValue)&&(identical(other.sizeUnit, sizeUnit) || other.sizeUnit == sizeUnit)&&(identical(other.sizeUnknown, sizeUnknown) || other.sizeUnknown == sizeUnknown)&&(identical(other.budgetAed, budgetAed) || other.budgetAed == budgetAed)&&(identical(other.budgetToDiscuss, budgetToDiscuss) || other.budgetToDiscuss == budgetToDiscuss)&&(identical(other.stage, stage) || other.stage == stage)&&(identical(other.consultationType, consultationType) || other.consultationType == consultationType)&&(identical(other.preferredDate, preferredDate) || other.preferredDate == preferredDate)&&(identical(other.preferredWindow, preferredWindow) || other.preferredWindow == preferredWindow)&&(identical(other.timeFlexible, timeFlexible) || other.timeFlexible == timeFlexible)&&(identical(other.name, name) || other.name == name)&&(identical(other.phone, phone) || other.phone == phone)&&(identical(other.email, email) || other.email == email)&&(identical(other.note, note) || other.note == note)&&(identical(other.stepIndex, stepIndex) || other.stepIndex == stepIndex));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode => Object.hashAll([runtimeType,draftId,const DeepCollectionEquality().hash(_serviceIds),propertyType,emirateId,area,sizeValue,sizeUnit,sizeUnknown,budgetAed,budgetToDiscuss,stage,consultationType,preferredDate,preferredWindow,timeFlexible,name,phone,email,note,stepIndex]);

@override
String toString() {
  return 'RequestDraft(draftId: $draftId, serviceIds: $serviceIds, propertyType: $propertyType, emirateId: $emirateId, area: $area, sizeValue: $sizeValue, sizeUnit: $sizeUnit, sizeUnknown: $sizeUnknown, budgetAed: $budgetAed, budgetToDiscuss: $budgetToDiscuss, stage: $stage, consultationType: $consultationType, preferredDate: $preferredDate, preferredWindow: $preferredWindow, timeFlexible: $timeFlexible, name: $name, phone: $phone, email: $email, note: $note, stepIndex: $stepIndex)';
}


}

/// @nodoc
abstract mixin class _$RequestDraftCopyWith<$Res> implements $RequestDraftCopyWith<$Res> {
  factory _$RequestDraftCopyWith(_RequestDraft value, $Res Function(_RequestDraft) _then) = __$RequestDraftCopyWithImpl;
@override @useResult
$Res call({
 String draftId, List<String> serviceIds, PropertyType? propertyType, String? emirateId, String area, int? sizeValue, AreaUnit sizeUnit, bool sizeUnknown, int? budgetAed, bool budgetToDiscuss, ProjectStage? stage, ConsultationType? consultationType, String? preferredDate, TimeWindow? preferredWindow, bool timeFlexible, String name, String phone, String email, String note, int stepIndex
});




}
/// @nodoc
class __$RequestDraftCopyWithImpl<$Res>
    implements _$RequestDraftCopyWith<$Res> {
  __$RequestDraftCopyWithImpl(this._self, this._then);

  final _RequestDraft _self;
  final $Res Function(_RequestDraft) _then;

/// Create a copy of RequestDraft
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? draftId = null,Object? serviceIds = null,Object? propertyType = freezed,Object? emirateId = freezed,Object? area = null,Object? sizeValue = freezed,Object? sizeUnit = null,Object? sizeUnknown = null,Object? budgetAed = freezed,Object? budgetToDiscuss = null,Object? stage = freezed,Object? consultationType = freezed,Object? preferredDate = freezed,Object? preferredWindow = freezed,Object? timeFlexible = null,Object? name = null,Object? phone = null,Object? email = null,Object? note = null,Object? stepIndex = null,}) {
  return _then(_RequestDraft(
draftId: null == draftId ? _self.draftId : draftId // ignore: cast_nullable_to_non_nullable
as String,serviceIds: null == serviceIds ? _self._serviceIds : serviceIds // ignore: cast_nullable_to_non_nullable
as List<String>,propertyType: freezed == propertyType ? _self.propertyType : propertyType // ignore: cast_nullable_to_non_nullable
as PropertyType?,emirateId: freezed == emirateId ? _self.emirateId : emirateId // ignore: cast_nullable_to_non_nullable
as String?,area: null == area ? _self.area : area // ignore: cast_nullable_to_non_nullable
as String,sizeValue: freezed == sizeValue ? _self.sizeValue : sizeValue // ignore: cast_nullable_to_non_nullable
as int?,sizeUnit: null == sizeUnit ? _self.sizeUnit : sizeUnit // ignore: cast_nullable_to_non_nullable
as AreaUnit,sizeUnknown: null == sizeUnknown ? _self.sizeUnknown : sizeUnknown // ignore: cast_nullable_to_non_nullable
as bool,budgetAed: freezed == budgetAed ? _self.budgetAed : budgetAed // ignore: cast_nullable_to_non_nullable
as int?,budgetToDiscuss: null == budgetToDiscuss ? _self.budgetToDiscuss : budgetToDiscuss // ignore: cast_nullable_to_non_nullable
as bool,stage: freezed == stage ? _self.stage : stage // ignore: cast_nullable_to_non_nullable
as ProjectStage?,consultationType: freezed == consultationType ? _self.consultationType : consultationType // ignore: cast_nullable_to_non_nullable
as ConsultationType?,preferredDate: freezed == preferredDate ? _self.preferredDate : preferredDate // ignore: cast_nullable_to_non_nullable
as String?,preferredWindow: freezed == preferredWindow ? _self.preferredWindow : preferredWindow // ignore: cast_nullable_to_non_nullable
as TimeWindow?,timeFlexible: null == timeFlexible ? _self.timeFlexible : timeFlexible // ignore: cast_nullable_to_non_nullable
as bool,name: null == name ? _self.name : name // ignore: cast_nullable_to_non_nullable
as String,phone: null == phone ? _self.phone : phone // ignore: cast_nullable_to_non_nullable
as String,email: null == email ? _self.email : email // ignore: cast_nullable_to_non_nullable
as String,note: null == note ? _self.note : note // ignore: cast_nullable_to_non_nullable
as String,stepIndex: null == stepIndex ? _self.stepIndex : stepIndex // ignore: cast_nullable_to_non_nullable
as int,
  ));
}


}

// dart format on
