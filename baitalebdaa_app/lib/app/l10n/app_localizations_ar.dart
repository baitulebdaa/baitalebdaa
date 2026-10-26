// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for Arabic (`ar`).
class AppLocalizationsAr extends AppLocalizations {
  AppLocalizationsAr([String locale = 'ar']) : super(locale);

  @override
  String get appTitle => 'بيت الإبداع';

  @override
  String get tabHome => 'الرئيسية';

  @override
  String get tabServices => 'الخدمات';

  @override
  String get homeProjectsEyebrow => 'مشاريع مختارة';

  @override
  String get homeSeeAllProjects => 'عرض جميع المشاريع';

  @override
  String get servicesTitle => 'الخدمات';

  @override
  String get servicesQuotedAfterSurvey => 'يُسعَّر بعد معاينة مجانية للموقع';

  @override
  String servicesVatNote(String rate) {
    return 'الأسعار غير شاملة ضريبة القيمة المضافة بنسبة $rate.';
  }

  @override
  String get projectsTitle => 'المشاريع';

  @override
  String projectMeta(String sector, String year) {
    return '$sector · $year';
  }

  @override
  String get assistantYou => 'أنت';

  @override
  String contactWhatsAppFailed(String phone) {
    return 'تعذّر فتح واتساب. يمكنك الاتصال بنا على $phone.';
  }

  @override
  String get accountEmptyTitle => 'لا توجد طلبات بعد';

  @override
  String get accountEmptyBody => 'عندما تطلب استشارة، يمكنك متابعتها من هنا.';

  @override
  String get settingsTitle => 'الإعدادات';

  @override
  String get settingsLanguage => 'اللغة';

  @override
  String get settingsLanguageSystem => 'لغة الجهاز';

  @override
  String get languageEnglish => 'English';

  @override
  String get languageArabic => 'العربية';

  @override
  String get settingsAppearance => 'المظهر';

  @override
  String get appearanceSystem => 'حسب الجهاز';

  @override
  String get appearanceLight => 'فاتح';

  @override
  String get appearanceDark => 'داكن';

  @override
  String get errorTitle => 'حدث خطأ ما';

  @override
  String get actionRetry => 'حاول مرة أخرى';

  @override
  String get actionGoHome => 'الذهاب إلى الرئيسية';

  @override
  String get notFoundTitle => 'هذه الصفحة غير متاحة';

  @override
  String get notFoundBody => 'قد يكون الرابط قديماً.';

  @override
  String get failureOffline => 'أنت غير متصل بالإنترنت. تحقّق من الاتصال وحاول مرة أخرى.';

  @override
  String get failureTimeout => 'يستغرق هذا وقتاً أطول من المعتاد. حاول مرة أخرى.';

  @override
  String get failureUnauthorised => 'يُرجى تسجيل الدخول مرة أخرى.';

  @override
  String get failureNotFound => 'لم نتمكن من العثور على ذلك.';

  @override
  String get failureRateLimited => 'محاولات كثيرة. يُرجى الانتظار قليلاً ثم المحاولة مجدداً.';

  @override
  String get failureValidation => 'بعض البيانات تحتاج إلى مراجعة.';

  @override
  String get failureServer => 'حدث خطأ من جهتنا. حاول مرة أخرى بعد قليل.';

  @override
  String get failureUnavailable => 'هذه الخدمة غير متاحة الآن. يمكنك التواصل معنا عبر واتساب أو الهاتف.';

  @override
  String get failureDataFormat => 'يحتاج التطبيق إلى تحديث لعرض هذا المحتوى.';

  @override
  String get failureUnknown => 'حدث خطأ ما. حاول مرة أخرى.';

  @override
  String get signInTitle => 'تسجيل الدخول';

  @override
  String get signInIntro => 'سجّل الدخول لطلب الاستشارات ومتابعتها في مكان واحد.';

  @override
  String get registerTitle => 'أنشئ حسابك';

  @override
  String get registerIntro => 'أنشئ حساباً لطلب الاستشارات ومتابعة تقدّمها.';

  @override
  String get resetTitle => 'إعادة تعيين كلمة المرور';

  @override
  String get resetIntro => 'أدخل بريدك الإلكتروني وسنرسل لك رابطاً لتعيين كلمة مرور جديدة.';

  @override
  String get fieldName => 'الاسم الكامل';

  @override
  String get fieldEmail => 'البريد الإلكتروني';

  @override
  String get fieldPassword => 'كلمة المرور';

  @override
  String passwordHint(int min) {
    return '$min أحرف على الأقل';
  }

  @override
  String get passwordShow => 'إظهار كلمة المرور';

  @override
  String get passwordHide => 'إخفاء كلمة المرور';

  @override
  String get actionSignIn => 'تسجيل الدخول';

  @override
  String get actionCreateAccount => 'إنشاء حساب';

  @override
  String get actionSendResetLink => 'إرسال رابط إعادة التعيين';

  @override
  String get linkForgotPassword => 'نسيت كلمة المرور؟';

  @override
  String get linkToRegister => 'جديد هنا؟ أنشئ حساباً';

  @override
  String get linkToSignIn => 'لديك حساب بالفعل؟ سجّل الدخول';

  @override
  String get linkBackToSignIn => 'العودة إلى تسجيل الدخول';

  @override
  String resetSent(String email) {
    return 'إذا كان هناك حساب مرتبط بـ $email، فقد أرسلنا رابطاً لإعادة تعيين كلمة المرور.';
  }

  @override
  String get validationRequired => 'مطلوب';

  @override
  String get validationEmail => 'أدخل بريداً إلكترونياً صحيحاً';

  @override
  String validationPasswordShort(int min) {
    return 'استخدم $min أحرف على الأقل';
  }

  @override
  String validationNameLong(int max) {
    return 'استخدم $max حرفاً أو أقل';
  }

  @override
  String get authErrorInvalidCredentials => 'البريد الإلكتروني أو كلمة المرور غير صحيحة.';

  @override
  String get authErrorEmailInUse => 'يوجد حساب بهذا البريد الإلكتروني بالفعل. سجّل الدخول بدلاً من ذلك.';

  @override
  String get authErrorWeakPassword => 'اختر كلمة مرور أقوى.';

  @override
  String get authErrorInvalidEmail => 'أدخل بريداً إلكترونياً صحيحاً.';

  @override
  String get authErrorTooManyAttempts => 'محاولات كثيرة. يُرجى الانتظار بضع دقائق ثم المحاولة مجدداً.';

  @override
  String get authErrorUserDisabled => 'تم تعطيل هذا الحساب. يُرجى التواصل معنا.';

  @override
  String get authErrorMethodDisabled => 'طريقة تسجيل الدخول هذه غير متاحة حالياً.';

  @override
  String get accountSignInCta => 'سجّل الدخول أو أنشئ حساباً';

  @override
  String get accountSignOut => 'تسجيل الخروج';

  @override
  String get accountVerifyEmail => 'تحقّق من بريدك الوارد لتأكيد عنوان بريدك الإلكتروني.';

  @override
  String get requestPlanCta => 'خطّط لمشروعك';

  @override
  String requestContinueDraft(int step, int total) {
    return 'تابع طلبك · الخطوة $step من $total';
  }

  @override
  String requestStepCount(int step, int total) {
    return 'الخطوة $step من $total';
  }

  @override
  String get requestContinue => 'متابعة';

  @override
  String get requestBack => 'رجوع';

  @override
  String get requestSkip => 'تخطٍّ';

  @override
  String get requestOptional => 'اختياري';

  @override
  String get requestLeaveTitle => 'مغادرة طلبك؟';

  @override
  String get requestLeaveBody => 'إجاباتك محفوظة على هذا الهاتف، ويمكنك المتابعة لاحقاً.';

  @override
  String get requestKeepEditing => 'متابعة التعديل';

  @override
  String get requestSaveAndExit => 'حفظ وخروج';

  @override
  String get requestDiscard => 'تجاهل الطلب';

  @override
  String get requestReplaceTitle => 'بدء طلب جديد؟';

  @override
  String get requestReplaceBody => 'لديك طلب غير مكتمل، وبدء طلب جديد سيحلّ محله.';

  @override
  String get requestResume => 'متابعة الطلب';

  @override
  String get requestStartNew => 'بدء طلب جديد';

  @override
  String get stepServicesTitle => 'بماذا يمكننا مساعدتك؟';

  @override
  String stepServicesHelp(int max) {
    return 'اختر حتى $max.';
  }

  @override
  String get stepServicesNotSure => 'لست متأكداً بعد';

  @override
  String get stepPropertyTitle => 'ما نوع المساحة؟';

  @override
  String get stepLocationTitle => 'أين يقع المشروع؟';

  @override
  String get stepLocationHelp => 'نعمل في جميع الإمارات السبع بالسعر نفسه.';

  @override
  String get stepLocationArea => 'المنطقة أو المجمّع';

  @override
  String get stepLocationAreaHint => 'مثال: دبي هيلز إستيت';

  @override
  String get stepSizeTitle => 'ما المساحة التقريبية؟';

  @override
  String get stepSizeHelp => 'يكفي تقدير تقريبي.';

  @override
  String get stepSizeLabel => 'المساحة';

  @override
  String get stepSizeNotSure => 'لست متأكداً';

  @override
  String get unitSqft => 'قدم مربع';

  @override
  String get unitSqm => 'متر مربع';

  @override
  String get stepBudgetTitle => 'هل لديك ميزانية تقريبية؟';

  @override
  String get stepBudgetHelp => 'يساعدنا ذلك على اقتراح التشطيبات المناسبة.';

  @override
  String get stepBudgetLabel => 'الميزانية (درهم)';

  @override
  String get stepBudgetDiscuss => 'أفضّل مناقشتها';

  @override
  String get stepBudgetPublished => 'سعر البداية المنشور';

  @override
  String get stepStageTitle => 'في أي مرحلة مشروعك؟';

  @override
  String get stepConsultationTitle => 'كيف تفضّل التواصل؟';

  @override
  String get stepTimeTitle => 'ما الوقت المناسب لك؟';

  @override
  String get stepTimeNotice => 'هذا وقت مفضّل فقط، وسيؤكد فريقنا الموعد معك.';

  @override
  String get stepTimeDay => 'اليوم';

  @override
  String get stepTimeOfDay => 'الفترة';

  @override
  String get stepTimeFlexible => 'أنا مرن في الوقت';

  @override
  String get stepContactTitle => 'كيف يمكننا التواصل معك؟';

  @override
  String get stepContactPhone => 'رقم الجوال';

  @override
  String get stepContactPhoneHelp => 'يمكن أن تبدأ الأرقام الإماراتية بـ 05';

  @override
  String get stepContactEmail => 'البريد الإلكتروني (اختياري)';

  @override
  String get stepContactNote => 'هل هناك ما يجب أن نعرفه؟ (اختياري)';

  @override
  String get propertyVilla => 'فيلا';

  @override
  String get propertyTownhouse => 'تاون هاوس';

  @override
  String get propertyApartment => 'شقة';

  @override
  String get propertyPenthouse => 'بنتهاوس';

  @override
  String get propertyOffice => 'مكتب';

  @override
  String get propertyRestaurant => 'مطعم أو مقهى';

  @override
  String get propertyRetail => 'محل تجاري';

  @override
  String get propertyOther => 'أخرى';

  @override
  String get stageExploring => 'أستكشف الأفكار';

  @override
  String get stageNeedDesign => 'أحتاج إلى تصميم';

  @override
  String get stageHaveDrawings => 'لديّ مخططات جاهزة';

  @override
  String get stageReadyForFitOut => 'جاهز للتجهيز';

  @override
  String get stageRenovating => 'أجدّد مساحة قائمة';

  @override
  String get stageJoineryOnly => 'أعمال نجارة فقط';

  @override
  String get consultPhone => 'مكالمة هاتفية';

  @override
  String get consultPhoneHelp => 'نتصل بك لمناقشة مشروعك';

  @override
  String get consultWhatsapp => 'واتساب';

  @override
  String get consultWhatsappHelp => 'تحدّث مع فريقنا عبر واتساب';

  @override
  String get consultSiteSurvey => 'معاينة مجانية للموقع';

  @override
  String get consultSiteSurveyHelp => 'نزورك ونقيس ونقدّم المشورة';

  @override
  String get consultFactoryVisit => 'زيارة المصنع';

  @override
  String get consultFactoryVisitHelp => 'تعرّف على مصنع النجارة في عجمان';

  @override
  String get windowMorning => 'صباحاً';

  @override
  String get windowAfternoon => 'بعد الظهر';

  @override
  String get windowEvening => 'مساءً';

  @override
  String get issueChooseService => 'اختر خدمة واحدة على الأقل.';

  @override
  String get issueChooseEmirate => 'اختر الإمارة.';

  @override
  String issueTooLong(int max) {
    return 'استخدم $max حرفاً أو أقل.';
  }

  @override
  String get issueSizeInvalid => 'أدخل مساحة أكبر من صفر.';

  @override
  String get issueBudgetInvalid => 'أدخل مبلغاً أكبر من صفر.';

  @override
  String get issueChooseConsultation => 'اختر طريقة التواصل.';

  @override
  String get issuePhoneInvalid => 'أدخل رقم جوال، مثل 050 123 4567 أو 900123 7700 44+.';

  @override
  String get reviewTitle => 'راجع طلبك';

  @override
  String get reviewEdit => 'تعديل';

  @override
  String get reviewSend => 'إرسال الطلب';

  @override
  String get reviewServices => 'الخدمات';

  @override
  String get reviewProperty => 'نوع المساحة';

  @override
  String get reviewLocation => 'الموقع';

  @override
  String get reviewSize => 'المساحة التقريبية';

  @override
  String get reviewBudget => 'الميزانية';

  @override
  String get reviewStage => 'المرحلة';

  @override
  String get reviewConsultation => 'طريقة التواصل';

  @override
  String get reviewTime => 'الوقت المفضّل';

  @override
  String get reviewContact => 'بيانات التواصل';

  @override
  String get reviewNotGiven => 'غير محدد';

  @override
  String get reviewPreferenceNote => 'وقت مفضّل، لم يُؤكَّد بعد';

  @override
  String get reviewPrivacy => 'بإرسال الطلب، فإنك توافق على سياسة الخصوصية.';

  @override
  String get reviewPrivacyLink => 'اقرأ سياسة الخصوصية';

  @override
  String get requestNeedsAccount => 'يُرجى تسجيل الدخول أو إنشاء حساب لإرسال طلبك.';

  @override
  String get requestSendFailed => 'طلبك محفوظ على هذا الهاتف. حاول مرة أخرى، أو تواصل معنا عبر واتساب.';

  @override
  String get receivedTitle => 'تم استلام طلب مشروعك';

  @override
  String receivedReference(String reference) {
    return 'الرقم المرجعي $reference';
  }

  @override
  String get receivedNextTitle => 'الخطوات التالية';

  @override
  String get receivedNext1 => 'يراجع فريقنا طلبك.';

  @override
  String get receivedNext2 => 'نتواصل معك للاتفاق على موعد.';

  @override
  String get receivedNext3 => 'نتحدث هاتفياً أو عبر واتساب أو في موقعك، حسب الاتفاق.';

  @override
  String get receivedPhotos => 'شارك الصور أو المخططات عبر واتساب';

  @override
  String receivedPhotosMessage(String reference) {
    return 'مرحباً! أرسلت الطلب $reference من تطبيق بيت الإبداع، وهذه صور المساحة.';
  }

  @override
  String get receivedDone => 'تم';

  @override
  String get myRequestsTitle => 'طلباتي';

  @override
  String get myRequestsNew => 'طلب جديد';

  @override
  String requestDetailTitle(String reference) {
    return 'الطلب $reference';
  }

  @override
  String requestSentOn(String date) {
    return 'أُرسل في $date';
  }

  @override
  String get statusSubmitted => 'تم استلام الطلب';

  @override
  String get statusInReview => 'قيد المراجعة';

  @override
  String get statusActionRequired => 'نحتاج إلى معلومة منك';

  @override
  String get statusContacted => 'تواصلنا معك';

  @override
  String get statusScheduled => 'تم تأكيد الموعد';

  @override
  String get statusRescheduleRequested => 'بانتظار موعد جديد';

  @override
  String get statusCompleted => 'اكتملت الاستشارة';

  @override
  String get statusCancelled => 'أُلغي';

  @override
  String get servicesRequestCta => 'اطلب معاينة مجانية للموقع';

  @override
  String get tabProjects => 'المشاريع';

  @override
  String get tabBook => 'احجز';

  @override
  String get tabProfile => 'حسابي';

  @override
  String get homeGreetingMorning => 'صباح الخير';

  @override
  String get homeGreetingAfternoon => 'مساء الخير';

  @override
  String get homeGreetingEvening => 'مساء الخير';

  @override
  String homeGreetingName(String greeting, String name) {
    return '$greeting، $name';
  }

  @override
  String get homeWelcome => 'أهلاً بك';

  @override
  String get homeProfileTooltip => 'الحساب';

  @override
  String get homeServicesEyebrow => 'خدماتنا';

  @override
  String get homeSeeAllServices => 'عرض جميع الخدمات';

  @override
  String get homePlanningTitle => 'ماذا تخطّط؟';

  @override
  String get planningVilla => 'فيلا';

  @override
  String get planningApartment => 'شقة';

  @override
  String get planningOffice => 'مكتب';

  @override
  String get planningRestaurant => 'مطعم';

  @override
  String get planningRetail => 'محل تجاري';

  @override
  String get planningJoinery => 'نجارة وخزائن';

  @override
  String get homePricingTitle => 'أسعار معلنة';

  @override
  String get homePricingBody =>
      'أسعار البداية لخدماتنا، غير شاملة الضريبة. يُقدَّم عرض السعر بعد معاينة مجانية للموقع.';

  @override
  String get homePricingCta => 'عرض دليل الأسعار';

  @override
  String get homeWhyEyebrow => 'لماذا بيت الإبداع';

  @override
  String get homeProcessEyebrow => 'كيف نعمل';

  @override
  String get homeReviewEyebrow => 'آراء عملائنا';

  @override
  String get reviewTranslated => 'مترجم';

  @override
  String get homeAskAliCta => 'اطرح سؤالاً';

  @override
  String get homeCtaTitle => 'ابدأ بمعاينة مجانية للموقع';

  @override
  String get homeCtaBody => 'نزورك ونقيس ونقدّم المشورة، ثم نقدّم عرض السعر بعد المعاينة.';

  @override
  String get homeCtaButton => 'احجز معاينة مجانية';

  @override
  String get homeLatestRequest => 'أحدث طلباتك';

  @override
  String get contactCall => 'اتصال';

  @override
  String get contactWhatsApp => 'واتساب';

  @override
  String get contactEmail => 'البريد';

  @override
  String get serviceIncluded => 'ما يشمله';

  @override
  String get serviceFaqs => 'أسئلة شائعة';

  @override
  String get serviceProjects => 'مشاريع ذات صلة';

  @override
  String get servicePrices => 'الأسعار المعلنة';

  @override
  String get serviceRelatedPrices => 'أسعار بداية ذات صلة';

  @override
  String get priceGuideTitle => 'دليل الأسعار';

  @override
  String get projectLocation => 'الموقع';

  @override
  String get projectSize => 'المساحة';

  @override
  String get projectYear => 'السنة';

  @override
  String get projectService => 'الخدمة';

  @override
  String get projectScope => 'نطاق العمل';

  @override
  String get projectStory => 'عن المشروع';

  @override
  String get projectPlanSimilar => 'خطّط لمشروع مشابه';

  @override
  String projectPhotoLabel(String title, int index, int total) {
    return '$title، الصورة $index من $total';
  }

  @override
  String get bookTitle => 'خطّط لمشروعك';

  @override
  String get bookIntro => 'أخبرنا عن مساحتك في خطوات قصيرة. الخدمة مجانية ودون أي التزام.';

  @override
  String get bookStepsTitle => 'كيف تتم العملية';

  @override
  String get bookStep1 => 'أجب عن بعض الأسئلة القصيرة حول مساحتك.';

  @override
  String get bookStep2 => 'يراجع فريقنا طلبك ويتواصل معك.';

  @override
  String get bookStep3 => 'نلتقي هاتفياً أو عبر واتساب أو في موقعك لمعاينة مجانية.';

  @override
  String get bookStart => 'ابدأ طلباً';

  @override
  String get profileSupport => 'الدعم';

  @override
  String get profileLegal => 'الشؤون القانونية';

  @override
  String get profilePrivacy => 'سياسة الخصوصية';

  @override
  String get profileTerms => 'الشروط والأحكام';

  @override
  String get profileDelete => 'حذف الحساب';

  @override
  String get deleteTitle => 'حذف حسابك؟';

  @override
  String get deleteBody =>
      'سيؤدي هذا إلى حذف بيانات تسجيل الدخول. تبقى الطلبات التي أرسلتها لدى فريقنا لمتابعتها، ويمكنك التواصل معنا لحذفها.';

  @override
  String get deleteConfirm => 'حذف الحساب';

  @override
  String get authErrorRecentLogin => 'لحمايتك، سجّل الدخول مرة أخرى ثم احذف حسابك.';

  @override
  String get reviewSignInToSend => 'سجّل الدخول للإرسال';

  @override
  String get reviewSignInNote => 'سجّل الدخول أو أنشئ حساباً لإرسال طلبك ومتابعته من أي هاتف. إجاباتك محفوظة.';

  @override
  String get receivedViewRequest => 'عرض الطلب';

  @override
  String receivedStatus(String status) {
    return 'الحالة: $status';
  }

  @override
  String get timelineTitle => 'مراحل الطلب';

  @override
  String get detailNeedHelp => 'هل تحتاج إلى مساعدة بخصوص هذا الطلب؟';

  @override
  String get myRequestsActive => 'قيد المتابعة';

  @override
  String get myRequestsPast => 'السابقة';

  @override
  String get stepDetailsTitle => 'أخبرنا عن مشروعك';

  @override
  String get stepDetailsHelp => 'أي معلومة تساعدنا على التحضير: الغرف، الطراز، التوقيت.';

  @override
  String get stepDetailsLabel => 'تفاصيل المشروع';

  @override
  String get reviewDetails => 'تفاصيل المشروع';

  @override
  String get stageOther => 'أخرى';

  @override
  String get propertyCommercial => 'مساحة تجارية';

  @override
  String heroSlideLabel(int index, int total) {
    return 'الشريحة $index من $total';
  }

  @override
  String reviewQuoted(String text) {
    return '«$text»';
  }

  @override
  String reviewEditSection(String section) {
    return 'تعديل $section';
  }

  @override
  String fieldOptional(String label) {
    return '$label (اختياري)';
  }

  @override
  String get servicesHeaderSubtitle => 'التصميم والتنفيذ وأعمال النجارة، وكلها تبدأ بمعاينة مجانية للموقع.';

  @override
  String get projectsHeaderSubtitle => 'منازل ومقار عمل صممناها ونفذناها، مع الصور ونطاق العمل كاملاً.';

  @override
  String get bookEyebrow => 'استشارة مجانية';

  @override
  String get projectsFilterAll => 'الكل';

  @override
  String get projectsFilterVillas => 'فلل';

  @override
  String get projectsFilterApartments => 'شقق';

  @override
  String get projectsFilterOffices => 'مكاتب';

  @override
  String get projectsFilterJoinery => 'نجارة';

  @override
  String get projectsFilterSaved => 'المحفوظة';

  @override
  String get projectKindVilla => 'فيلا';

  @override
  String get projectKindApartment => 'شقة';

  @override
  String get projectKindCommercial => 'تجاري';

  @override
  String get projectKindResidential => 'سكني';

  @override
  String get projectsSortRecent => 'الأحدث';

  @override
  String get projectsSortAlphabetical => 'أبجدياً';

  @override
  String get projectsSortTooltip => 'ترتيب المشاريع';

  @override
  String get projectsFilterTooltip => 'تصفية المشاريع';

  @override
  String get projectsSearchTooltip => 'البحث في المشاريع';

  @override
  String get projectsSearchHint => 'ابحث بالاسم أو المنطقة';

  @override
  String get projectsCloseSearch => 'إغلاق البحث';

  @override
  String get projectsSave => 'حفظ المشروع';

  @override
  String get projectsUnsave => 'إزالة من المحفوظة';

  @override
  String get projectsFeatured => 'مشروع مميز';

  @override
  String get projectsViewProject => 'عرض المشروع';

  @override
  String get projectsEmptyTitle => 'لا توجد مشاريع مطابقة';

  @override
  String get projectsEmptySaved => 'اضغط على القلب في أي مشروع للاحتفاظ به هنا.';

  @override
  String get projectsShowAll => 'عرض كل المشاريع';

  @override
  String projectsCount(int count) {
    String _temp0 = intl.Intl.pluralLogic(
      count,
      locale: localeName,
      other: '$count مشروع',
      many: '$count مشروعاً',
      few: '$count مشاريع',
      two: 'مشروعان',
      one: 'مشروع واحد',
      zero: 'لا مشاريع',
    );
    return '$_temp0';
  }

  @override
  String get homeServicesHeading => 'خدماتنا';

  @override
  String get homeFeaturedProjects => 'مشاريع مختارة';

  @override
  String get homeViewAll => 'عرض الكل';

  @override
  String get homeHeroCta => 'ابدأ الآن';

  @override
  String get homeEstimateTitle => 'تعرّف على السعر التقديري لمشروعك';

  @override
  String get homeEstimateBody =>
      'أسعار ابتدائية منشورة، قبل ضريبة القيمة المضافة. يأتي عرض السعر بعد معاينة مجانية للموقع.';

  @override
  String get homeEstimateCta => 'عرض الأسعار الابتدائية';

  @override
  String get homeWhyTitle => 'لماذا بيت الإبداع';

  @override
  String get homeWhyTagline => 'أكثر من مساحات، قيمة تدوم';

  @override
  String get homeSearchTooltip => 'البحث في الخدمات والمشاريع';

  @override
  String get homeRequestsTooltip => 'طلباتي';

  @override
  String get homeRequestsActiveTooltip => 'طلباتي، طلب قيد المتابعة';

  @override
  String get homeEmirateTooltip => 'اختر إمارتك';

  @override
  String get homeEmirateAll => 'الإمارات';

  @override
  String get homeEmirateAllOption => 'كل الإمارات';

  @override
  String get homeEmirateSheetBody =>
      'نعمل في جميع الإمارات السبع بالأسعار نفسها. تُضاف إمارتك تلقائياً عند بدء طلب جديد.';

  @override
  String get searchHint => 'ابحث في الخدمات والمشاريع';

  @override
  String get searchServices => 'الخدمات';

  @override
  String get searchProjects => 'المشاريع';

  @override
  String get searchEmpty => 'لا توجد نتائج مطابقة';

  @override
  String get serviceDetailsTitle => 'تفاصيل الخدمة';

  @override
  String get serviceSave => 'حفظ الخدمة';

  @override
  String get serviceUnsave => 'إزالة من المحفوظة';

  @override
  String get serviceShare => 'مشاركة';

  @override
  String serviceShareText(String service, String url) {
    return '$service من بيت الإبداع: $url';
  }

  @override
  String get serviceFactSurvey => 'معاينة مجانية للموقع';

  @override
  String get serviceFactEmirates => 'جميع الإمارات السبع';

  @override
  String get serviceFactFactory => 'مصنع نجارة خاص';

  @override
  String get serviceStartingFrom => 'السعر الابتدائي';

  @override
  String get serviceShowLess => 'عرض أقل';

  @override
  String get serviceHowItWorks => 'كيف نعمل';

  @override
  String get serviceRequestConsultation => 'اطلب استشارة';

  @override
  String get profileSavedTitle => 'المحفوظة';

  @override
  String get requestFlowTitle => 'خطّط لمشروعك';

  @override
  String get requestPageRequirements => 'متطلباتك';

  @override
  String get requestPageDetails => 'التفاصيل';

  @override
  String get requestPageConsultation => 'الاستشارة';

  @override
  String get requestPageContact => 'التواصل';

  @override
  String get requestPageReview => 'المراجعة';

  @override
  String get requestPageComplete => 'الإرسال';

  @override
  String requestProgress(int current, int total, String name) {
    return 'الخطوة $current من $total: $name';
  }

  @override
  String get requestSectionService => 'الخدمة';

  @override
  String get requestSectionProperty => 'نوع العقار';

  @override
  String get requestSectionEmirate => 'الإمارة';

  @override
  String get requestSectionSize => 'المساحة التقريبية';

  @override
  String get requestSectionBudget => 'الميزانية';

  @override
  String get requestSectionStage => 'مرحلة المشروع';

  @override
  String get requestSectionDetails => 'تفاصيل المشروع';

  @override
  String get requestSectionConsultation => 'الاستشارة';

  @override
  String get requestSectionTime => 'الوقت المفضل';

  @override
  String get requestSectionContact => 'بياناتك';

  @override
  String get requestSectionPhotos => 'الصور / المخططات';

  @override
  String get requestPhotosBody =>
      'بعد إرسال طلبك، شارك الصور أو المخططات أو صور الإلهام عبر واتساب، وسيُضاف رقم طلبك تلقائياً.';

  @override
  String get requestTimeInfoTitle => 'سيتم تأكيد الوقت والتاريخ المفضلين لاحقاً';

  @override
  String get requestTimeInfoBody => 'سيتواصل فريقنا معك لتحديد موعد الاستشارة في الوقت الذي يناسبك.';

  @override
  String get requestSaveDraft => 'حفظ المسودة';

  @override
  String get requestDraftSaved => 'تم حفظ المسودة. يمكنك المتابعة في أي وقت من الرئيسية أو احجز.';

  @override
  String get myRequestTitle => 'طلبي';

  @override
  String get myRequestSubtitle => 'تابع تقدّم طلب استشارة مشروعك.';

  @override
  String get myRequestId => 'رقم الطلب';

  @override
  String get myRequestCopy => 'نسخ رقم الطلب';

  @override
  String get myRequestCopied => 'تم نسخ رقم الطلب';

  @override
  String get myRequestConsultation => 'الاستشارة المفضلة';

  @override
  String get myRequestPreferredDate => 'التاريخ المفضل';

  @override
  String get myRequestPreferredTime => 'الوقت المفضل';

  @override
  String get myRequestPhotos => 'الصور والمخططات';

  @override
  String get myRequestPhotosBody => 'أرسل الصور أو المخططات عبر واتساب، وسيُضاف رقم طلبك تلقائياً.';

  @override
  String get myRequestHelpBody => 'فريقنا هنا لمساعدتك في أي سؤال عن طلبك.';

  @override
  String get authLoginTitle => 'مرحبًا بعودتك';

  @override
  String get authLoginIntro => 'سجّل الدخول لمتابعة تخطيط مساحاتك وتنفيذها في أنحاء الإمارات.';

  @override
  String get authRegisterTitle => 'أنشئ حسابك';

  @override
  String get authRegisterIntro => 'انضم إلى بيت الإبداع وابدأ التخطيط لمساحة أحلامك مع فريق خبرائنا.';

  @override
  String get authLogIn => 'تسجيل الدخول';

  @override
  String get authCreateAccount => 'إنشاء حساب';

  @override
  String get authFullName => 'الاسم الكامل';

  @override
  String get authFullNameHelp => 'اكتب اسمك الكامل';

  @override
  String get authEmail => 'البريد الإلكتروني';

  @override
  String get authEmailHelp => 'اكتب بريدك الإلكتروني';

  @override
  String get authPhone => 'رقم الهاتف';

  @override
  String get authPhoneExample => '+971 50 123 4567';

  @override
  String get authPhoneHelp => 'اكتب رقم هاتفك';

  @override
  String authPasswordHelp(int min) {
    return 'أنشئ كلمة مرور قوية ($min أحرف على الأقل)';
  }

  @override
  String authAgree(String terms, String privacy) {
    return 'أوافق على $terms و$privacy';
  }

  @override
  String get authTerms => 'شروط الخدمة';

  @override
  String get authPrivacy => 'سياسة الخصوصية';

  @override
  String get authAgreeRequired => 'يرجى الموافقة على شروط الخدمة وسياسة الخصوصية.';

  @override
  String get authOr => 'أو تابع باستخدام';

  @override
  String get authGoogle => 'المتابعة باستخدام Google';

  @override
  String get authApple => 'المتابعة باستخدام Apple';

  @override
  String get authNoAccount => 'ليس لديك حساب؟';

  @override
  String get authSignUp => 'إنشاء حساب';

  @override
  String get authHaveAccount => 'لديك حساب بالفعل؟';

  @override
  String get authForgot => 'نسيت كلمة المرور؟';

  @override
  String get splashTagline => 'نصمّم مساحات استثنائية في أنحاء الإمارات.';

  @override
  String get brandServicesLine => 'تصميم داخلي | تشطيب | نجارة';

  @override
  String get profileEditProfile => 'تعديل الملف الشخصي';

  @override
  String get profileSave => 'حفظ';

  @override
  String get profileSaved => 'تم تحديث الملف الشخصي.';

  @override
  String get profileGuestTitle => 'مرحباً';

  @override
  String get profileGuestBody => 'سجّل الدخول لمتابعة طلباتك وحفظ بياناتك.';

  @override
  String get profileActiveRequests => 'طلبات نشطة';

  @override
  String get profileInProgress => 'قيد التنفيذ';

  @override
  String get profileScheduled => 'استشارة مجدولة';

  @override
  String get profileUpcoming => 'قادمة';

  @override
  String get profileMyRequests => 'طلباتي';

  @override
  String get profileMyRequestsBody => 'تابع استفسارات مشروعك وطلباتك';

  @override
  String get profileSavedProjects => 'المشاريع المحفوظة';

  @override
  String get profileSavedBody => 'مشاريعك المفضلة ومصادر إلهامك';

  @override
  String get profilePhotos => 'الصور والمخططات';

  @override
  String get profilePhotosBody => 'شارك المخططات والمراجع والمستندات عبر واتساب';

  @override
  String get profilePhotosMessage => 'مرحباً! أرغب بمشاركة صور ومخططات مشروعي.';

  @override
  String get profileLanguage => 'اللغة المفضلة';

  @override
  String get profileLanguageBody => 'English / العربية';

  @override
  String get profileNotifications => 'الإشعارات';

  @override
  String get profileNotificationsBody => 'إدارة الإشعارات والتفضيلات';

  @override
  String get profileWhatsapp => 'الدعم عبر واتساب';

  @override
  String get profileWhatsappBody => 'احصل على مساعدة فورية من فريقنا';

  @override
  String get profilePrivacyBody => 'كيف نحمي معلوماتك';

  @override
  String get profileTermsBody => 'شروط الخدمة لدينا';

  @override
  String get profileSignOutBody => 'تسجيل الخروج من حسابك';

  @override
  String get savedEmpty => 'لا يوجد شيء محفوظ بعد. اضغط على القلب في مشروع أو على الإشارة المرجعية في خدمة.';

  @override
  String get notificationsOn => 'الإشعارات مفعّلة. سنخبرك عند تغيّر حالة طلبك.';

  @override
  String get notificationsOff => 'فعّل الإشعارات لتعرف عند تغيّر حالة طلبك.';

  @override
  String get notificationsAllow => 'السماح بالإشعارات';

  @override
  String get notificationsUnavailable =>
      'الإشعارات غير متاحة على هذا الجهاز بعد. سنبقيك على اطلاع عبر واتساب أو الهاتف أو البريد الإلكتروني.';

  @override
  String get profilePhotoChange => 'تغيير صورة الملف الشخصي';

  @override
  String get profilePhotoChoose => 'اختيار صورة';

  @override
  String get profilePhotoRemove => 'إزالة الصورة';

  @override
  String get profilePhotoNote => 'تبقى صورتك على هذا الهاتف فقط.';
}
