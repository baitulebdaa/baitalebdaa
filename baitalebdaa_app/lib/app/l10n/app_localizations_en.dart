// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for English (`en`).
class AppLocalizationsEn extends AppLocalizations {
  AppLocalizationsEn([String locale = 'en']) : super(locale);

  @override
  String get appTitle => 'Bait Al Ebdaa';

  @override
  String get tabHome => 'Home';

  @override
  String get tabServices => 'Services';

  @override
  String get homeProjectsEyebrow => 'Selected projects';

  @override
  String get homeSeeAllProjects => 'See all projects';

  @override
  String get servicesTitle => 'Services';

  @override
  String get servicesQuotedAfterSurvey => 'Quoted after a free site survey';

  @override
  String servicesVatNote(String rate) {
    return 'Prices exclude $rate VAT.';
  }

  @override
  String get projectsTitle => 'Projects';

  @override
  String projectMeta(String sector, String year) {
    return '$sector · $year';
  }

  @override
  String get assistantYou => 'You';

  @override
  String contactWhatsAppFailed(String phone) {
    return 'Couldn\'t open WhatsApp. You can call us on $phone.';
  }

  @override
  String get accountEmptyTitle => 'No requests yet';

  @override
  String get accountEmptyBody => 'When you request a consultation, you can follow it here.';

  @override
  String get settingsTitle => 'Settings';

  @override
  String get settingsLanguage => 'Language';

  @override
  String get settingsLanguageSystem => 'Device language';

  @override
  String get languageEnglish => 'English';

  @override
  String get languageArabic => 'العربية';

  @override
  String get settingsAppearance => 'Appearance';

  @override
  String get appearanceSystem => 'Match device';

  @override
  String get appearanceLight => 'Light';

  @override
  String get appearanceDark => 'Dark';

  @override
  String get errorTitle => 'Something went wrong';

  @override
  String get actionRetry => 'Try again';

  @override
  String get actionGoHome => 'Go to Home';

  @override
  String get notFoundTitle => 'This page isn\'t available';

  @override
  String get notFoundBody => 'The link may be out of date.';

  @override
  String get failureOffline => 'You\'re offline. Check your connection and try again.';

  @override
  String get failureTimeout => 'This is taking longer than usual. Please try again.';

  @override
  String get failureUnauthorised => 'Please sign in again.';

  @override
  String get failureNotFound => 'We couldn\'t find that.';

  @override
  String get failureRateLimited => 'Too many attempts. Please wait a moment and try again.';

  @override
  String get failureValidation => 'Some details need checking.';

  @override
  String get failureServer => 'Something went wrong on our side. Please try again shortly.';

  @override
  String get failureUnavailable => 'This isn\'t available right now. You can reach us on WhatsApp or by phone.';

  @override
  String get failureDataFormat => 'The app needs an update to show this.';

  @override
  String get failureUnknown => 'Something went wrong. Please try again.';

  @override
  String get signInTitle => 'Sign in';

  @override
  String get signInIntro => 'Sign in to request consultations and follow them in one place.';

  @override
  String get registerTitle => 'Create your account';

  @override
  String get registerIntro => 'Create an account to request consultations and follow their progress.';

  @override
  String get resetTitle => 'Reset your password';

  @override
  String get resetIntro => 'Enter your email and we\'ll send you a link to set a new password.';

  @override
  String get fieldName => 'Full name';

  @override
  String get fieldEmail => 'Email';

  @override
  String get fieldPassword => 'Password';

  @override
  String passwordHint(int min) {
    return 'At least $min characters';
  }

  @override
  String get passwordShow => 'Show password';

  @override
  String get passwordHide => 'Hide password';

  @override
  String get actionSignIn => 'Sign in';

  @override
  String get actionCreateAccount => 'Create account';

  @override
  String get actionSendResetLink => 'Send reset link';

  @override
  String get linkForgotPassword => 'Forgot password?';

  @override
  String get linkToRegister => 'New here? Create an account';

  @override
  String get linkToSignIn => 'Already have an account? Sign in';

  @override
  String get linkBackToSignIn => 'Back to sign in';

  @override
  String resetSent(String email) {
    return 'If an account exists for $email, we\'ve sent a link to reset the password.';
  }

  @override
  String get validationRequired => 'Required';

  @override
  String get validationEmail => 'Enter a valid email address';

  @override
  String validationPasswordShort(int min) {
    return 'Use at least $min characters';
  }

  @override
  String validationNameLong(int max) {
    return 'Use $max characters or fewer';
  }

  @override
  String get authErrorInvalidCredentials => 'The email or password isn\'t right.';

  @override
  String get authErrorEmailInUse => 'An account with this email already exists. Sign in instead.';

  @override
  String get authErrorWeakPassword => 'Choose a stronger password.';

  @override
  String get authErrorInvalidEmail => 'Enter a valid email address.';

  @override
  String get authErrorTooManyAttempts => 'Too many attempts. Please wait a few minutes and try again.';

  @override
  String get authErrorUserDisabled => 'This account has been disabled. Please contact us.';

  @override
  String get authErrorMethodDisabled => 'Email sign-in isn\'t available right now.';

  @override
  String get accountSignInCta => 'Sign in or create an account';

  @override
  String get accountSignOut => 'Sign out';

  @override
  String get accountVerifyEmail => 'Check your inbox to verify your email address.';

  @override
  String get requestPlanCta => 'Plan your project';

  @override
  String requestContinueDraft(int step, int total) {
    return 'Continue your request · step $step of $total';
  }

  @override
  String requestStepCount(int step, int total) {
    return 'Step $step of $total';
  }

  @override
  String get requestContinue => 'Continue';

  @override
  String get requestBack => 'Back';

  @override
  String get requestSkip => 'Skip';

  @override
  String get requestOptional => 'Optional';

  @override
  String get requestLeaveTitle => 'Leave your request?';

  @override
  String get requestLeaveBody => 'Your answers are saved on this phone. You can continue later.';

  @override
  String get requestKeepEditing => 'Keep editing';

  @override
  String get requestSaveAndExit => 'Save and exit';

  @override
  String get requestDiscard => 'Discard request';

  @override
  String get requestReplaceTitle => 'Start a new request?';

  @override
  String get requestReplaceBody => 'You have an unfinished request. Starting a new one will replace it.';

  @override
  String get requestResume => 'Continue it';

  @override
  String get requestStartNew => 'Start new';

  @override
  String get stepServicesTitle => 'What can we help with?';

  @override
  String stepServicesHelp(int max) {
    return 'Choose up to $max.';
  }

  @override
  String get stepServicesNotSure => 'Not sure yet';

  @override
  String get stepPropertyTitle => 'What kind of space is it?';

  @override
  String get stepLocationTitle => 'Where is the project?';

  @override
  String get stepLocationHelp => 'We work in all seven emirates, at the same price.';

  @override
  String get stepLocationArea => 'Area or community';

  @override
  String get stepLocationAreaHint => 'e.g. Dubai Hills Estate';

  @override
  String get stepSizeTitle => 'Roughly how big is the space?';

  @override
  String get stepSizeHelp => 'An estimate is fine.';

  @override
  String get stepSizeLabel => 'Size';

  @override
  String get stepSizeNotSure => 'Not sure';

  @override
  String get unitSqft => 'sq ft';

  @override
  String get unitSqm => 'sq m';

  @override
  String get stepBudgetTitle => 'Do you have a budget in mind?';

  @override
  String get stepBudgetHelp => 'It helps us suggest the right finishes.';

  @override
  String get stepBudgetLabel => 'Budget (AED)';

  @override
  String get stepBudgetDiscuss => 'I\'d rather discuss it';

  @override
  String get stepBudgetPublished => 'Published starting price';

  @override
  String get stepStageTitle => 'Where are you in the project?';

  @override
  String get stepConsultationTitle => 'How would you like to talk?';

  @override
  String get stepTimeTitle => 'When suits you?';

  @override
  String get stepTimeNotice => 'This is a preference. Our team will confirm a time with you.';

  @override
  String get stepTimeDay => 'Day';

  @override
  String get stepTimeOfDay => 'Time of day';

  @override
  String get stepTimeFlexible => 'I\'m flexible';

  @override
  String get stepContactTitle => 'How can we reach you?';

  @override
  String get stepContactPhone => 'Mobile number';

  @override
  String get stepContactPhoneHelp => 'UAE numbers can start with 05';

  @override
  String get stepContactEmail => 'Email (optional)';

  @override
  String get stepContactNote => 'Anything else we should know? (optional)';

  @override
  String get propertyVilla => 'Villa';

  @override
  String get propertyTownhouse => 'Townhouse';

  @override
  String get propertyApartment => 'Apartment';

  @override
  String get propertyPenthouse => 'Penthouse';

  @override
  String get propertyOffice => 'Office';

  @override
  String get propertyRestaurant => 'Restaurant or café';

  @override
  String get propertyRetail => 'Shop';

  @override
  String get propertyOther => 'Other';

  @override
  String get stageExploring => 'Exploring ideas';

  @override
  String get stageNeedDesign => 'I need a design';

  @override
  String get stageHaveDrawings => 'I already have drawings';

  @override
  String get stageReadyForFitOut => 'Ready for fit-out';

  @override
  String get stageRenovating => 'Renovating an existing space';

  @override
  String get stageJoineryOnly => 'Joinery only';

  @override
  String get consultPhone => 'Phone call';

  @override
  String get consultPhoneHelp => 'We call you to talk it through';

  @override
  String get consultWhatsapp => 'WhatsApp';

  @override
  String get consultWhatsappHelp => 'Chat with our team on WhatsApp';

  @override
  String get consultSiteSurvey => 'Free site survey';

  @override
  String get consultSiteSurveyHelp => 'We visit, measure and advise';

  @override
  String get consultFactoryVisit => 'Factory visit';

  @override
  String get consultFactoryVisitHelp => 'See our joinery factory in Ajman';

  @override
  String get windowMorning => 'Morning';

  @override
  String get windowAfternoon => 'Afternoon';

  @override
  String get windowEvening => 'Evening';

  @override
  String get issueChooseService => 'Choose at least one service.';

  @override
  String get issueChooseEmirate => 'Choose the emirate.';

  @override
  String issueTooLong(int max) {
    return 'Use $max characters or fewer.';
  }

  @override
  String get issueSizeInvalid => 'Enter a size greater than zero.';

  @override
  String get issueBudgetInvalid => 'Enter an amount greater than zero.';

  @override
  String get issueChooseConsultation => 'Choose how you\'d like to talk.';

  @override
  String get issuePhoneInvalid => 'Enter a mobile number, e.g. 050 123 4567 or +44 7700 900123.';

  @override
  String get reviewTitle => 'Review your request';

  @override
  String get reviewEdit => 'Edit';

  @override
  String get reviewSend => 'Send request';

  @override
  String get reviewServices => 'Services';

  @override
  String get reviewProperty => 'Space';

  @override
  String get reviewLocation => 'Location';

  @override
  String get reviewSize => 'Size';

  @override
  String get reviewBudget => 'Budget';

  @override
  String get reviewStage => 'Stage';

  @override
  String get reviewConsultation => 'Consultation';

  @override
  String get reviewTime => 'Preferred time';

  @override
  String get reviewContact => 'Contact';

  @override
  String get reviewNotGiven => 'Not given';

  @override
  String get reviewPreferenceNote => 'A preference, not yet confirmed';

  @override
  String get reviewPrivacy => 'By sending, you agree to our privacy policy.';

  @override
  String get reviewPrivacyLink => 'Read the privacy policy';

  @override
  String get requestNeedsAccount => 'Please sign in or create an account to send your request.';

  @override
  String get requestSendFailed => 'Your request is saved on this phone. Please try again, or contact us on WhatsApp.';

  @override
  String get receivedTitle => 'Project request received';

  @override
  String receivedReference(String reference) {
    return 'Reference $reference';
  }

  @override
  String get receivedNextTitle => 'What happens next';

  @override
  String get receivedNext1 => 'Our team reviews your request.';

  @override
  String get receivedNext2 => 'We contact you to agree a time.';

  @override
  String get receivedNext3 => 'We talk by phone, on WhatsApp or at your site, as agreed.';

  @override
  String get receivedPhotos => 'Share photos or plans on WhatsApp';

  @override
  String receivedPhotosMessage(String reference) {
    return 'Hello! I sent request $reference in the Bait Al Ebdaa app. Here are photos of my space.';
  }

  @override
  String get receivedDone => 'Done';

  @override
  String get myRequestsTitle => 'My requests';

  @override
  String get myRequestsNew => 'New request';

  @override
  String requestDetailTitle(String reference) {
    return 'Request $reference';
  }

  @override
  String requestSentOn(String date) {
    return 'Sent $date';
  }

  @override
  String get statusSubmitted => 'Request received';

  @override
  String get statusInReview => 'Being reviewed';

  @override
  String get statusActionRequired => 'We need a detail from you';

  @override
  String get statusContacted => 'We\'ve been in touch';

  @override
  String get statusScheduled => 'Appointment confirmed';

  @override
  String get statusRescheduleRequested => 'Waiting for a new time';

  @override
  String get statusCompleted => 'Consultation completed';

  @override
  String get statusCancelled => 'Cancelled';

  @override
  String get servicesRequestCta => 'Request a free site survey';

  @override
  String get tabProjects => 'Projects';

  @override
  String get tabBook => 'Book';

  @override
  String get tabProfile => 'Profile';

  @override
  String get homeGreetingMorning => 'Good morning';

  @override
  String get homeGreetingAfternoon => 'Good afternoon';

  @override
  String get homeGreetingEvening => 'Good evening';

  @override
  String homeGreetingName(String greeting, String name) {
    return '$greeting, $name';
  }

  @override
  String get homeWelcome => 'Welcome';

  @override
  String get homeProfileTooltip => 'Profile';

  @override
  String get homeServicesEyebrow => 'Our services';

  @override
  String get homeSeeAllServices => 'See all services';

  @override
  String get homePlanningTitle => 'What are you planning?';

  @override
  String get planningVilla => 'Villa';

  @override
  String get planningApartment => 'Apartment';

  @override
  String get planningOffice => 'Office';

  @override
  String get planningRestaurant => 'Restaurant';

  @override
  String get planningRetail => 'Retail';

  @override
  String get planningJoinery => 'Joinery & wardrobes';

  @override
  String get homePricingTitle => 'Prices, published';

  @override
  String get homePricingBody =>
      'Starting prices for our services, before VAT. Your quotation follows a free site survey.';

  @override
  String get homePricingCta => 'See the price guide';

  @override
  String get homeWhyEyebrow => 'Why Bait Al Ebdaa';

  @override
  String get homeProcessEyebrow => 'How it works';

  @override
  String get homeReviewEyebrow => 'What clients say';

  @override
  String get reviewTranslated => 'Translated';

  @override
  String get homeAskAliCta => 'Ask a question';

  @override
  String get homeCtaTitle => 'Start with a free site survey';

  @override
  String get homeCtaBody => 'We visit, measure and advise. Your quotation follows the survey.';

  @override
  String get homeCtaButton => 'Book a free site survey';

  @override
  String get homeLatestRequest => 'Your latest request';

  @override
  String get contactCall => 'Call';

  @override
  String get contactWhatsApp => 'WhatsApp';

  @override
  String get contactEmail => 'Email';

  @override
  String get serviceIncluded => 'What\'s included';

  @override
  String get serviceFaqs => 'Questions';

  @override
  String get serviceProjects => 'Related projects';

  @override
  String get servicePrices => 'Published prices';

  @override
  String get serviceRelatedPrices => 'Related starting prices';

  @override
  String get priceGuideTitle => 'Price guide';

  @override
  String get projectLocation => 'Location';

  @override
  String get projectSize => 'Size';

  @override
  String get projectYear => 'Year';

  @override
  String get projectService => 'Service';

  @override
  String get projectScope => 'Scope of work';

  @override
  String get projectStory => 'About the project';

  @override
  String get projectPlanSimilar => 'Plan a similar project';

  @override
  String projectPhotoLabel(String title, int index, int total) {
    return '$title, photo $index of $total';
  }

  @override
  String get bookTitle => 'Plan your project';

  @override
  String get bookIntro => 'Tell us about your space in a few short steps. It\'s free, with no obligation.';

  @override
  String get bookStepsTitle => 'How it works';

  @override
  String get bookStep1 => 'Answer a few short questions about your space.';

  @override
  String get bookStep2 => 'Our team reviews your request and contacts you.';

  @override
  String get bookStep3 => 'We meet by phone, on WhatsApp or at your site for a free survey.';

  @override
  String get bookStart => 'Start a request';

  @override
  String get profileSupport => 'Support';

  @override
  String get profileLegal => 'Legal';

  @override
  String get profilePrivacy => 'Privacy policy';

  @override
  String get profileTerms => 'Terms and conditions';

  @override
  String get profileDelete => 'Delete account';

  @override
  String get deleteTitle => 'Delete your account?';

  @override
  String get deleteBody =>
      'This deletes your sign-in. Requests you already sent stay with our team so we can follow up; contact us if you want them removed.';

  @override
  String get deleteConfirm => 'Delete account';

  @override
  String get authErrorRecentLogin => 'For your security, sign in again, then delete your account.';

  @override
  String get reviewSignInToSend => 'Sign in to send';

  @override
  String get reviewSignInNote =>
      'Sign in or create an account to send your request and follow it from any phone. Your answers are kept.';

  @override
  String get receivedViewRequest => 'View request';

  @override
  String receivedStatus(String status) {
    return 'Status: $status';
  }

  @override
  String get timelineTitle => 'Progress';

  @override
  String get detailNeedHelp => 'Need help with this request?';

  @override
  String get myRequestsActive => 'Active';

  @override
  String get myRequestsPast => 'Past';

  @override
  String get stepDetailsTitle => 'Tell us about your project';

  @override
  String get stepDetailsHelp => 'Anything that helps us prepare: rooms, style, timing.';

  @override
  String get stepDetailsLabel => 'Project details';

  @override
  String get reviewDetails => 'Project details';

  @override
  String get stageOther => 'Other';

  @override
  String get propertyCommercial => 'Commercial space';

  @override
  String heroSlideLabel(int index, int total) {
    return 'Slide $index of $total';
  }

  @override
  String reviewQuoted(String text) {
    return '“$text”';
  }

  @override
  String reviewEditSection(String section) {
    return 'Edit $section';
  }

  @override
  String fieldOptional(String label) {
    return '$label (optional)';
  }

  @override
  String get servicesHeaderSubtitle => 'Design, fit-out and joinery, each starting with a free site survey.';

  @override
  String get projectsHeaderSubtitle =>
      'Homes and workplaces we\'ve designed and fitted out, with photos and the full scope of work.';

  @override
  String get bookEyebrow => 'Free consultation';
}
