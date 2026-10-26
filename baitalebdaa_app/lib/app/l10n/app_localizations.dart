import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:intl/intl.dart' as intl;

import 'app_localizations_ar.dart';
import 'app_localizations_en.dart';

// ignore_for_file: type=lint

/// Callers can lookup localized strings with an instance of AppLocalizations
/// returned by `AppLocalizations.of(context)`.
///
/// Applications need to include `AppLocalizations.delegate()` in their app's
/// `localizationDelegates` list, and the locales they support in the app's
/// `supportedLocales` list. For example:
///
/// ```dart
/// import 'l10n/app_localizations.dart';
///
/// return MaterialApp(
///   localizationsDelegates: AppLocalizations.localizationsDelegates,
///   supportedLocales: AppLocalizations.supportedLocales,
///   home: MyApplicationHome(),
/// );
/// ```
///
/// ## Update pubspec.yaml
///
/// Please make sure to update your pubspec.yaml to include the following
/// packages:
///
/// ```yaml
/// dependencies:
///   # Internationalization support.
///   flutter_localizations:
///     sdk: flutter
///   intl: any # Use the pinned version from flutter_localizations
///
///   # Rest of dependencies
/// ```
///
/// ## iOS Applications
///
/// iOS applications define key application metadata, including supported
/// locales, in an Info.plist file that is built into the application bundle.
/// To configure the locales supported by your app, you’ll need to edit this
/// file.
///
/// First, open your project’s ios/Runner.xcworkspace Xcode workspace file.
/// Then, in the Project Navigator, open the Info.plist file under the Runner
/// project’s Runner folder.
///
/// Next, select the Information Property List item, select Add Item from the
/// Editor menu, then select Localizations from the pop-up menu.
///
/// Select and expand the newly-created Localizations item then, for each
/// locale your application supports, add a new item and select the locale
/// you wish to add from the pop-up menu in the Value field. This list should
/// be consistent with the languages listed in the AppLocalizations.supportedLocales
/// property.
abstract class AppLocalizations {
  AppLocalizations(String locale) : localeName = intl.Intl.canonicalizedLocale(locale.toString());

  final String localeName;

  static AppLocalizations of(BuildContext context) {
    return Localizations.of<AppLocalizations>(context, AppLocalizations)!;
  }

  static const LocalizationsDelegate<AppLocalizations> delegate = _AppLocalizationsDelegate();

  /// A list of this localizations delegate along with the default localizations
  /// delegates.
  ///
  /// Returns a list of localizations delegates containing this delegate along with
  /// GlobalMaterialLocalizations.delegate, GlobalCupertinoLocalizations.delegate,
  /// and GlobalWidgetsLocalizations.delegate.
  ///
  /// Additional delegates can be added by appending to this list in
  /// MaterialApp. This list does not have to be used at all if a custom list
  /// of delegates is preferred or required.
  static const List<LocalizationsDelegate<dynamic>> localizationsDelegates = <LocalizationsDelegate<dynamic>>[
    delegate,
    GlobalMaterialLocalizations.delegate,
    GlobalCupertinoLocalizations.delegate,
    GlobalWidgetsLocalizations.delegate,
  ];

  /// A list of this localizations delegate's supported locales.
  static const List<Locale> supportedLocales = <Locale>[Locale('ar'), Locale('en')];

  /// App name in the task switcher and window title.
  ///
  /// In en, this message translates to:
  /// **'Bait Al Ebdaa'**
  String get appTitle;

  /// Bottom tab label for the Home screen.
  ///
  /// In en, this message translates to:
  /// **'Home'**
  String get tabHome;

  /// Bottom tab label for the services catalogue.
  ///
  /// In en, this message translates to:
  /// **'Services'**
  String get tabServices;

  /// Section label above the project list on Home.
  ///
  /// In en, this message translates to:
  /// **'Selected projects'**
  String get homeProjectsEyebrow;

  /// Link from Home to the full project portfolio.
  ///
  /// In en, this message translates to:
  /// **'See all projects'**
  String get homeSeeAllProjects;

  /// Title of the services catalogue screen.
  ///
  /// In en, this message translates to:
  /// **'Services'**
  String get servicesTitle;

  /// Shown instead of a price for services with no published starting price.
  ///
  /// In en, this message translates to:
  /// **'Quoted after a free site survey'**
  String get servicesQuotedAfterSurvey;

  /// Note under published prices. rate is the formatted VAT rate, e.g. 5%.
  ///
  /// In en, this message translates to:
  /// **'Prices exclude {rate} VAT.'**
  String servicesVatNote(String rate);

  /// Title of the project portfolio screen.
  ///
  /// In en, this message translates to:
  /// **'Projects'**
  String get projectsTitle;

  /// Small label above a project name: its sector and completion year.
  ///
  /// In en, this message translates to:
  /// **'{sector} · {year}'**
  String projectMeta(String sector, String year);

  /// Screen-reader label for the user's own messages in the assistant chat.
  ///
  /// In en, this message translates to:
  /// **'You'**
  String get assistantYou;

  /// Shown when no app can open the WhatsApp link.
  ///
  /// In en, this message translates to:
  /// **'Couldn\'t open WhatsApp. You can call us on {phone}.'**
  String contactWhatsAppFailed(String phone);

  /// Profile tab when the customer has never sent a consultation request.
  ///
  /// In en, this message translates to:
  /// **'No requests yet'**
  String get accountEmptyTitle;

  /// Explains what will appear in the Profile tab.
  ///
  /// In en, this message translates to:
  /// **'When you request a consultation, you can follow it here.'**
  String get accountEmptyBody;

  /// Title of the Settings screen.
  ///
  /// In en, this message translates to:
  /// **'Settings'**
  String get settingsTitle;

  /// Settings section for the app language.
  ///
  /// In en, this message translates to:
  /// **'Language'**
  String get settingsLanguage;

  /// Language option that follows the phone's language.
  ///
  /// In en, this message translates to:
  /// **'Device language'**
  String get settingsLanguageSystem;

  /// Name of the English language, always written in English.
  ///
  /// In en, this message translates to:
  /// **'English'**
  String get languageEnglish;

  /// Name of the Arabic language, always written in Arabic.
  ///
  /// In en, this message translates to:
  /// **'العربية'**
  String get languageArabic;

  /// Settings section for light or dark mode.
  ///
  /// In en, this message translates to:
  /// **'Appearance'**
  String get settingsAppearance;

  /// Appearance option that follows the phone's light or dark setting.
  ///
  /// In en, this message translates to:
  /// **'Match device'**
  String get appearanceSystem;

  /// Light appearance option.
  ///
  /// In en, this message translates to:
  /// **'Light'**
  String get appearanceLight;

  /// Dark appearance option.
  ///
  /// In en, this message translates to:
  /// **'Dark'**
  String get appearanceDark;

  /// Heading of a full-screen error.
  ///
  /// In en, this message translates to:
  /// **'Something went wrong'**
  String get errorTitle;

  /// Button that retries a failed action.
  ///
  /// In en, this message translates to:
  /// **'Try again'**
  String get actionRetry;

  /// Button that returns to the Home tab.
  ///
  /// In en, this message translates to:
  /// **'Go to Home'**
  String get actionGoHome;

  /// Heading when a link points to a screen that does not exist.
  ///
  /// In en, this message translates to:
  /// **'This page isn\'t available'**
  String get notFoundTitle;

  /// Explanation under notFoundTitle.
  ///
  /// In en, this message translates to:
  /// **'The link may be out of date.'**
  String get notFoundBody;

  /// Error when there is no internet connection.
  ///
  /// In en, this message translates to:
  /// **'You\'re offline. Check your connection and try again.'**
  String get failureOffline;

  /// Error when a request times out.
  ///
  /// In en, this message translates to:
  /// **'This is taking longer than usual. Please try again.'**
  String get failureTimeout;

  /// Error when the session has expired.
  ///
  /// In en, this message translates to:
  /// **'Please sign in again.'**
  String get failureUnauthorised;

  /// Error when requested content does not exist.
  ///
  /// In en, this message translates to:
  /// **'We couldn\'t find that.'**
  String get failureNotFound;

  /// Error when the server limits repeated requests.
  ///
  /// In en, this message translates to:
  /// **'Too many attempts. Please wait a moment and try again.'**
  String get failureRateLimited;

  /// Error when the server rejects form input.
  ///
  /// In en, this message translates to:
  /// **'Some details need checking.'**
  String get failureValidation;

  /// Error for server faults.
  ///
  /// In en, this message translates to:
  /// **'Something went wrong on our side. Please try again shortly.'**
  String get failureServer;

  /// Error when the backend is not configured or switched off.
  ///
  /// In en, this message translates to:
  /// **'This isn\'t available right now. You can reach us on WhatsApp or by phone.'**
  String get failureUnavailable;

  /// Error when bundled or downloaded content cannot be read.
  ///
  /// In en, this message translates to:
  /// **'The app needs an update to show this.'**
  String get failureDataFormat;

  /// Fallback error message.
  ///
  /// In en, this message translates to:
  /// **'Something went wrong. Please try again.'**
  String get failureUnknown;

  /// Heading of the sign-in screen.
  ///
  /// In en, this message translates to:
  /// **'Sign in'**
  String get signInTitle;

  /// Line under the sign-in heading.
  ///
  /// In en, this message translates to:
  /// **'Sign in to request consultations and follow them in one place.'**
  String get signInIntro;

  /// Heading when creating an account.
  ///
  /// In en, this message translates to:
  /// **'Create your account'**
  String get registerTitle;

  /// Line under the create-account heading.
  ///
  /// In en, this message translates to:
  /// **'Create an account to request consultations and follow their progress.'**
  String get registerIntro;

  /// Heading when resetting a password.
  ///
  /// In en, this message translates to:
  /// **'Reset your password'**
  String get resetTitle;

  /// Line under the reset-password heading.
  ///
  /// In en, this message translates to:
  /// **'Enter your email and we\'ll send you a link to set a new password.'**
  String get resetIntro;

  /// Name field label.
  ///
  /// In en, this message translates to:
  /// **'Full name'**
  String get fieldName;

  /// Email field label.
  ///
  /// In en, this message translates to:
  /// **'Email'**
  String get fieldEmail;

  /// Password field label.
  ///
  /// In en, this message translates to:
  /// **'Password'**
  String get fieldPassword;

  /// Helper under the new-password field.
  ///
  /// In en, this message translates to:
  /// **'At least {min} characters'**
  String passwordHint(int min);

  /// Tooltip of the button that reveals the password.
  ///
  /// In en, this message translates to:
  /// **'Show password'**
  String get passwordShow;

  /// Tooltip of the button that hides the password.
  ///
  /// In en, this message translates to:
  /// **'Hide password'**
  String get passwordHide;

  /// Primary button on the sign-in form.
  ///
  /// In en, this message translates to:
  /// **'Sign in'**
  String get actionSignIn;

  /// Primary button on the create-account form.
  ///
  /// In en, this message translates to:
  /// **'Create account'**
  String get actionCreateAccount;

  /// Primary button on the reset-password form.
  ///
  /// In en, this message translates to:
  /// **'Send reset link'**
  String get actionSendResetLink;

  /// Link to the reset-password form.
  ///
  /// In en, this message translates to:
  /// **'Forgot password?'**
  String get linkForgotPassword;

  /// Link from sign-in to create an account.
  ///
  /// In en, this message translates to:
  /// **'New here? Create an account'**
  String get linkToRegister;

  /// Link from create-account to sign-in.
  ///
  /// In en, this message translates to:
  /// **'Already have an account? Sign in'**
  String get linkToSignIn;

  /// Link from reset-password back to sign-in.
  ///
  /// In en, this message translates to:
  /// **'Back to sign in'**
  String get linkBackToSignIn;

  /// Confirmation after requesting a reset link. Worded so it never reveals whether the email has an account.
  ///
  /// In en, this message translates to:
  /// **'If an account exists for {email}, we\'ve sent a link to reset the password.'**
  String resetSent(String email);

  /// Error under an empty required field.
  ///
  /// In en, this message translates to:
  /// **'Required'**
  String get validationRequired;

  /// Error under a malformed email.
  ///
  /// In en, this message translates to:
  /// **'Enter a valid email address'**
  String get validationEmail;

  /// Error under a too-short new password.
  ///
  /// In en, this message translates to:
  /// **'Use at least {min} characters'**
  String validationPasswordShort(int min);

  /// Error under a too-long name.
  ///
  /// In en, this message translates to:
  /// **'Use {max} characters or fewer'**
  String validationNameLong(int max);

  /// Sign-in refused. Never says which of the two is wrong.
  ///
  /// In en, this message translates to:
  /// **'The email or password isn\'t right.'**
  String get authErrorInvalidCredentials;

  /// Create-account refused because the email is taken.
  ///
  /// In en, this message translates to:
  /// **'An account with this email already exists. Sign in instead.'**
  String get authErrorEmailInUse;

  /// Create-account refused: password too weak.
  ///
  /// In en, this message translates to:
  /// **'Choose a stronger password.'**
  String get authErrorWeakPassword;

  /// Server rejected the email format.
  ///
  /// In en, this message translates to:
  /// **'Enter a valid email address.'**
  String get authErrorInvalidEmail;

  /// Sign-in temporarily blocked.
  ///
  /// In en, this message translates to:
  /// **'Too many attempts. Please wait a few minutes and try again.'**
  String get authErrorTooManyAttempts;

  /// Account disabled by the business.
  ///
  /// In en, this message translates to:
  /// **'This account has been disabled. Please contact us.'**
  String get authErrorUserDisabled;

  /// Email sign-in is switched off in Firebase.
  ///
  /// In en, this message translates to:
  /// **'This sign-in option isn\'t available right now.'**
  String get authErrorMethodDisabled;

  /// Profile tab button for guests.
  ///
  /// In en, this message translates to:
  /// **'Sign in or create an account'**
  String get accountSignInCta;

  /// Profile tab button for signed-in users.
  ///
  /// In en, this message translates to:
  /// **'Sign out'**
  String get accountSignOut;

  /// Shown until the user's email is verified.
  ///
  /// In en, this message translates to:
  /// **'Check your inbox to verify your email address.'**
  String get accountVerifyEmail;

  /// Main call to action that starts a consultation request.
  ///
  /// In en, this message translates to:
  /// **'Plan your project'**
  String get requestPlanCta;

  /// Home card shown while an unfinished request exists.
  ///
  /// In en, this message translates to:
  /// **'Continue your request · step {step} of {total}'**
  String requestContinueDraft(int step, int total);

  /// Step counter at the top of the request flow.
  ///
  /// In en, this message translates to:
  /// **'Step {step} of {total}'**
  String requestStepCount(int step, int total);

  /// Button that moves to the next step.
  ///
  /// In en, this message translates to:
  /// **'Continue'**
  String get requestContinue;

  /// Button that moves to the previous step.
  ///
  /// In en, this message translates to:
  /// **'Back'**
  String get requestBack;

  /// Button that skips an optional step.
  ///
  /// In en, this message translates to:
  /// **'Skip'**
  String get requestSkip;

  /// Marks an optional step or field.
  ///
  /// In en, this message translates to:
  /// **'Optional'**
  String get requestOptional;

  /// Dialog title when closing the request flow.
  ///
  /// In en, this message translates to:
  /// **'Leave your request?'**
  String get requestLeaveTitle;

  /// Dialog body when closing the request flow.
  ///
  /// In en, this message translates to:
  /// **'Your answers are saved on this phone. You can continue later.'**
  String get requestLeaveBody;

  /// Dialog action that stays in the flow.
  ///
  /// In en, this message translates to:
  /// **'Keep editing'**
  String get requestKeepEditing;

  /// Dialog action that leaves and keeps the draft.
  ///
  /// In en, this message translates to:
  /// **'Save and exit'**
  String get requestSaveAndExit;

  /// Dialog action that deletes the draft.
  ///
  /// In en, this message translates to:
  /// **'Discard request'**
  String get requestDiscard;

  /// Dialog title when an unfinished request exists.
  ///
  /// In en, this message translates to:
  /// **'Start a new request?'**
  String get requestReplaceTitle;

  /// Dialog body when an unfinished request exists.
  ///
  /// In en, this message translates to:
  /// **'You have an unfinished request. Starting a new one will replace it.'**
  String get requestReplaceBody;

  /// Dialog action that resumes the unfinished request.
  ///
  /// In en, this message translates to:
  /// **'Continue it'**
  String get requestResume;

  /// Dialog action that replaces the unfinished request.
  ///
  /// In en, this message translates to:
  /// **'Start new'**
  String get requestStartNew;

  /// Question on the services step.
  ///
  /// In en, this message translates to:
  /// **'What can we help with?'**
  String get stepServicesTitle;

  /// Help line on the services step.
  ///
  /// In en, this message translates to:
  /// **'Choose up to {max}.'**
  String stepServicesHelp(int max);

  /// Services option for undecided customers.
  ///
  /// In en, this message translates to:
  /// **'Not sure yet'**
  String get stepServicesNotSure;

  /// Question on the property step.
  ///
  /// In en, this message translates to:
  /// **'What kind of space is it?'**
  String get stepPropertyTitle;

  /// Question on the location step.
  ///
  /// In en, this message translates to:
  /// **'Where is the project?'**
  String get stepLocationTitle;

  /// Help line on the location step; owner-confirmed coverage.
  ///
  /// In en, this message translates to:
  /// **'We work in all seven emirates, at the same price.'**
  String get stepLocationHelp;

  /// Area field label.
  ///
  /// In en, this message translates to:
  /// **'Area or community'**
  String get stepLocationArea;

  /// Area field hint.
  ///
  /// In en, this message translates to:
  /// **'e.g. Dubai Hills Estate'**
  String get stepLocationAreaHint;

  /// Question on the size step.
  ///
  /// In en, this message translates to:
  /// **'Roughly how big is the space?'**
  String get stepSizeTitle;

  /// Help line on the size step.
  ///
  /// In en, this message translates to:
  /// **'An estimate is fine.'**
  String get stepSizeHelp;

  /// Size field label.
  ///
  /// In en, this message translates to:
  /// **'Size'**
  String get stepSizeLabel;

  /// Size option when the size is unknown.
  ///
  /// In en, this message translates to:
  /// **'Not sure'**
  String get stepSizeNotSure;

  /// Square feet unit.
  ///
  /// In en, this message translates to:
  /// **'sq ft'**
  String get unitSqft;

  /// Square metres unit.
  ///
  /// In en, this message translates to:
  /// **'sq m'**
  String get unitSqm;

  /// Question on the budget step.
  ///
  /// In en, this message translates to:
  /// **'Do you have a budget in mind?'**
  String get stepBudgetTitle;

  /// Help line on the budget step.
  ///
  /// In en, this message translates to:
  /// **'It helps us suggest the right finishes.'**
  String get stepBudgetHelp;

  /// Budget field label.
  ///
  /// In en, this message translates to:
  /// **'Budget (AED)'**
  String get stepBudgetLabel;

  /// Budget option to skip giving an amount.
  ///
  /// In en, this message translates to:
  /// **'I\'d rather discuss it'**
  String get stepBudgetDiscuss;

  /// Label above the website's starting price on the budget step.
  ///
  /// In en, this message translates to:
  /// **'Published starting price'**
  String get stepBudgetPublished;

  /// Question on the stage step.
  ///
  /// In en, this message translates to:
  /// **'Where are you in the project?'**
  String get stepStageTitle;

  /// Question on the consultation step.
  ///
  /// In en, this message translates to:
  /// **'How would you like to talk?'**
  String get stepConsultationTitle;

  /// Question on the time step.
  ///
  /// In en, this message translates to:
  /// **'When suits you?'**
  String get stepTimeTitle;

  /// Always-visible note: a preferred time is not a booking.
  ///
  /// In en, this message translates to:
  /// **'This is a preference. Our team will confirm a time with you.'**
  String get stepTimeNotice;

  /// Label above the day choices.
  ///
  /// In en, this message translates to:
  /// **'Day'**
  String get stepTimeDay;

  /// Label above the time-of-day choices.
  ///
  /// In en, this message translates to:
  /// **'Time of day'**
  String get stepTimeOfDay;

  /// Option for no time preference.
  ///
  /// In en, this message translates to:
  /// **'I\'m flexible'**
  String get stepTimeFlexible;

  /// Question on the contact step.
  ///
  /// In en, this message translates to:
  /// **'How can we reach you?'**
  String get stepContactTitle;

  /// Phone field label.
  ///
  /// In en, this message translates to:
  /// **'Mobile number'**
  String get stepContactPhone;

  /// Helper under the phone field.
  ///
  /// In en, this message translates to:
  /// **'UAE numbers can start with 05'**
  String get stepContactPhoneHelp;

  /// Email field label on the contact step.
  ///
  /// In en, this message translates to:
  /// **'Email (optional)'**
  String get stepContactEmail;

  /// Note field label.
  ///
  /// In en, this message translates to:
  /// **'Anything else we should know? (optional)'**
  String get stepContactNote;

  /// Property type.
  ///
  /// In en, this message translates to:
  /// **'Villa'**
  String get propertyVilla;

  /// Property type.
  ///
  /// In en, this message translates to:
  /// **'Townhouse'**
  String get propertyTownhouse;

  /// Property type.
  ///
  /// In en, this message translates to:
  /// **'Apartment'**
  String get propertyApartment;

  /// Property type.
  ///
  /// In en, this message translates to:
  /// **'Penthouse'**
  String get propertyPenthouse;

  /// Property type.
  ///
  /// In en, this message translates to:
  /// **'Office'**
  String get propertyOffice;

  /// Property type.
  ///
  /// In en, this message translates to:
  /// **'Restaurant or café'**
  String get propertyRestaurant;

  /// Property type.
  ///
  /// In en, this message translates to:
  /// **'Shop'**
  String get propertyRetail;

  /// Property type.
  ///
  /// In en, this message translates to:
  /// **'Other'**
  String get propertyOther;

  /// Project stage.
  ///
  /// In en, this message translates to:
  /// **'Exploring ideas'**
  String get stageExploring;

  /// Project stage.
  ///
  /// In en, this message translates to:
  /// **'I need a design'**
  String get stageNeedDesign;

  /// Project stage.
  ///
  /// In en, this message translates to:
  /// **'I already have drawings'**
  String get stageHaveDrawings;

  /// Project stage.
  ///
  /// In en, this message translates to:
  /// **'Ready for fit-out'**
  String get stageReadyForFitOut;

  /// Project stage.
  ///
  /// In en, this message translates to:
  /// **'Renovating an existing space'**
  String get stageRenovating;

  /// Project stage.
  ///
  /// In en, this message translates to:
  /// **'Joinery only'**
  String get stageJoineryOnly;

  /// Consultation type.
  ///
  /// In en, this message translates to:
  /// **'Phone call'**
  String get consultPhone;

  /// Consultation type description.
  ///
  /// In en, this message translates to:
  /// **'We call you to talk it through'**
  String get consultPhoneHelp;

  /// Consultation type.
  ///
  /// In en, this message translates to:
  /// **'WhatsApp'**
  String get consultWhatsapp;

  /// Consultation type description.
  ///
  /// In en, this message translates to:
  /// **'Chat with our team on WhatsApp'**
  String get consultWhatsappHelp;

  /// Consultation type.
  ///
  /// In en, this message translates to:
  /// **'Free site survey'**
  String get consultSiteSurvey;

  /// Consultation type description.
  ///
  /// In en, this message translates to:
  /// **'We visit, measure and advise'**
  String get consultSiteSurveyHelp;

  /// Consultation type.
  ///
  /// In en, this message translates to:
  /// **'Factory visit'**
  String get consultFactoryVisit;

  /// Consultation type description.
  ///
  /// In en, this message translates to:
  /// **'See our joinery factory in Ajman'**
  String get consultFactoryVisitHelp;

  /// Time of day.
  ///
  /// In en, this message translates to:
  /// **'Morning'**
  String get windowMorning;

  /// Time of day.
  ///
  /// In en, this message translates to:
  /// **'Afternoon'**
  String get windowAfternoon;

  /// Time of day.
  ///
  /// In en, this message translates to:
  /// **'Evening'**
  String get windowEvening;

  /// Validation on the services step.
  ///
  /// In en, this message translates to:
  /// **'Choose at least one service.'**
  String get issueChooseService;

  /// Validation on the location step.
  ///
  /// In en, this message translates to:
  /// **'Choose the emirate.'**
  String get issueChooseEmirate;

  /// Validation for long text.
  ///
  /// In en, this message translates to:
  /// **'Use {max} characters or fewer.'**
  String issueTooLong(int max);

  /// Validation on the size step.
  ///
  /// In en, this message translates to:
  /// **'Enter a size greater than zero.'**
  String get issueSizeInvalid;

  /// Validation on the budget step.
  ///
  /// In en, this message translates to:
  /// **'Enter an amount greater than zero.'**
  String get issueBudgetInvalid;

  /// Validation on the consultation step.
  ///
  /// In en, this message translates to:
  /// **'Choose how you\'d like to talk.'**
  String get issueChooseConsultation;

  /// Validation for the phone field.
  ///
  /// In en, this message translates to:
  /// **'Enter a mobile number, e.g. 050 123 4567 or +44 7700 900123.'**
  String get issuePhoneInvalid;

  /// Heading of the review screen.
  ///
  /// In en, this message translates to:
  /// **'Review your request'**
  String get reviewTitle;

  /// Button that edits one section of the request.
  ///
  /// In en, this message translates to:
  /// **'Edit'**
  String get reviewEdit;

  /// Button that sends the request.
  ///
  /// In en, this message translates to:
  /// **'Send request'**
  String get reviewSend;

  /// Review section.
  ///
  /// In en, this message translates to:
  /// **'Services'**
  String get reviewServices;

  /// Review section.
  ///
  /// In en, this message translates to:
  /// **'Space'**
  String get reviewProperty;

  /// Review section.
  ///
  /// In en, this message translates to:
  /// **'Location'**
  String get reviewLocation;

  /// Review section.
  ///
  /// In en, this message translates to:
  /// **'Size'**
  String get reviewSize;

  /// Review section.
  ///
  /// In en, this message translates to:
  /// **'Budget'**
  String get reviewBudget;

  /// Review section.
  ///
  /// In en, this message translates to:
  /// **'Stage'**
  String get reviewStage;

  /// Review section.
  ///
  /// In en, this message translates to:
  /// **'Consultation'**
  String get reviewConsultation;

  /// Review section.
  ///
  /// In en, this message translates to:
  /// **'Preferred time'**
  String get reviewTime;

  /// Review section.
  ///
  /// In en, this message translates to:
  /// **'Contact'**
  String get reviewContact;

  /// Shown for skipped answers.
  ///
  /// In en, this message translates to:
  /// **'Not given'**
  String get reviewNotGiven;

  /// Under the preferred time on review.
  ///
  /// In en, this message translates to:
  /// **'A preference, not yet confirmed'**
  String get reviewPreferenceNote;

  /// Consent line above the send button.
  ///
  /// In en, this message translates to:
  /// **'By sending, you agree to our privacy policy.'**
  String get reviewPrivacy;

  /// Link to the website privacy policy.
  ///
  /// In en, this message translates to:
  /// **'Read the privacy policy'**
  String get reviewPrivacyLink;

  /// Shown when guest sending is not available.
  ///
  /// In en, this message translates to:
  /// **'Please sign in or create an account to send your request.'**
  String get requestNeedsAccount;

  /// Shown under the error when sending fails.
  ///
  /// In en, this message translates to:
  /// **'Your request is saved on this phone. Please try again, or contact us on WhatsApp.'**
  String get requestSendFailed;

  /// Heading after sending. Never 'booking confirmed'.
  ///
  /// In en, this message translates to:
  /// **'Project request received'**
  String get receivedTitle;

  /// Reference code line.
  ///
  /// In en, this message translates to:
  /// **'Reference {reference}'**
  String receivedReference(String reference);

  /// Heading of the next-steps list.
  ///
  /// In en, this message translates to:
  /// **'What happens next'**
  String get receivedNextTitle;

  /// Next step 1.
  ///
  /// In en, this message translates to:
  /// **'Our team reviews your request.'**
  String get receivedNext1;

  /// Next step 2.
  ///
  /// In en, this message translates to:
  /// **'We contact you to agree a time.'**
  String get receivedNext2;

  /// Next step 3.
  ///
  /// In en, this message translates to:
  /// **'We talk by phone, on WhatsApp or at your site, as agreed.'**
  String get receivedNext3;

  /// Button to share photos after sending.
  ///
  /// In en, this message translates to:
  /// **'Share photos or plans on WhatsApp'**
  String get receivedPhotos;

  /// WhatsApp text the customer can edit before sending; contains only the reference.
  ///
  /// In en, this message translates to:
  /// **'Hello! I sent request {reference} in the Bait Al Ebdaa app. Here are photos of my space.'**
  String receivedPhotosMessage(String reference);

  /// Button that closes the confirmation.
  ///
  /// In en, this message translates to:
  /// **'Done'**
  String get receivedDone;

  /// Account section with the customer's requests.
  ///
  /// In en, this message translates to:
  /// **'My requests'**
  String get myRequestsTitle;

  /// Button to start another request.
  ///
  /// In en, this message translates to:
  /// **'New request'**
  String get myRequestsNew;

  /// Request detail screen title.
  ///
  /// In en, this message translates to:
  /// **'Request {reference}'**
  String requestDetailTitle(String reference);

  /// Date a request was sent.
  ///
  /// In en, this message translates to:
  /// **'Sent {date}'**
  String requestSentOn(String date);

  /// Request status.
  ///
  /// In en, this message translates to:
  /// **'Request received'**
  String get statusSubmitted;

  /// Request status.
  ///
  /// In en, this message translates to:
  /// **'Being reviewed'**
  String get statusInReview;

  /// Request status.
  ///
  /// In en, this message translates to:
  /// **'We need a detail from you'**
  String get statusActionRequired;

  /// Request status.
  ///
  /// In en, this message translates to:
  /// **'We\'ve been in touch'**
  String get statusContacted;

  /// Request status. The only confirmed state.
  ///
  /// In en, this message translates to:
  /// **'Appointment confirmed'**
  String get statusScheduled;

  /// Request status.
  ///
  /// In en, this message translates to:
  /// **'Waiting for a new time'**
  String get statusRescheduleRequested;

  /// Request status.
  ///
  /// In en, this message translates to:
  /// **'Consultation completed'**
  String get statusCompleted;

  /// Request status.
  ///
  /// In en, this message translates to:
  /// **'Cancelled'**
  String get statusCancelled;

  /// Button on a service that starts a request for it.
  ///
  /// In en, this message translates to:
  /// **'Request a free site survey'**
  String get servicesRequestCta;

  /// Bottom tab label for the project portfolio.
  ///
  /// In en, this message translates to:
  /// **'Projects'**
  String get tabProjects;

  /// Bottom tab label for planning and booking a consultation; the strongest action.
  ///
  /// In en, this message translates to:
  /// **'Book'**
  String get tabBook;

  /// Bottom tab label for the customer's profile and requests.
  ///
  /// In en, this message translates to:
  /// **'Profile'**
  String get tabProfile;

  /// Greeting before noon.
  ///
  /// In en, this message translates to:
  /// **'Good morning'**
  String get homeGreetingMorning;

  /// Greeting from noon to 5 PM.
  ///
  /// In en, this message translates to:
  /// **'Good afternoon'**
  String get homeGreetingAfternoon;

  /// Greeting after 5 PM.
  ///
  /// In en, this message translates to:
  /// **'Good evening'**
  String get homeGreetingEvening;

  /// Greeting with the customer's first name.
  ///
  /// In en, this message translates to:
  /// **'{greeting}, {name}'**
  String homeGreetingName(String greeting, String name);

  /// Greeting for guests.
  ///
  /// In en, this message translates to:
  /// **'Welcome'**
  String get homeWelcome;

  /// Tooltip of the profile button on Home.
  ///
  /// In en, this message translates to:
  /// **'Profile'**
  String get homeProfileTooltip;

  /// Section label for services on Home.
  ///
  /// In en, this message translates to:
  /// **'Our services'**
  String get homeServicesEyebrow;

  /// Link from Home to the services tab.
  ///
  /// In en, this message translates to:
  /// **'See all services'**
  String get homeSeeAllServices;

  /// Heading of the quick-start choices on Home.
  ///
  /// In en, this message translates to:
  /// **'What are you planning?'**
  String get homePlanningTitle;

  /// Quick-start choice.
  ///
  /// In en, this message translates to:
  /// **'Villa'**
  String get planningVilla;

  /// Quick-start choice.
  ///
  /// In en, this message translates to:
  /// **'Apartment'**
  String get planningApartment;

  /// Quick-start choice.
  ///
  /// In en, this message translates to:
  /// **'Office'**
  String get planningOffice;

  /// Quick-start choice.
  ///
  /// In en, this message translates to:
  /// **'Restaurant'**
  String get planningRestaurant;

  /// Quick-start choice.
  ///
  /// In en, this message translates to:
  /// **'Retail'**
  String get planningRetail;

  /// Quick-start choice.
  ///
  /// In en, this message translates to:
  /// **'Joinery & wardrobes'**
  String get planningJoinery;

  /// Heading of the pricing entry on Home.
  ///
  /// In en, this message translates to:
  /// **'Prices, published'**
  String get homePricingTitle;

  /// Body of the pricing entry on Home.
  ///
  /// In en, this message translates to:
  /// **'Starting prices for our services, before VAT. Your quotation follows a free site survey.'**
  String get homePricingBody;

  /// Button to the price guide.
  ///
  /// In en, this message translates to:
  /// **'See the price guide'**
  String get homePricingCta;

  /// Section label above the studio facts.
  ///
  /// In en, this message translates to:
  /// **'Why Bait Al Ebdaa'**
  String get homeWhyEyebrow;

  /// Section label above the process steps.
  ///
  /// In en, this message translates to:
  /// **'How it works'**
  String get homeProcessEyebrow;

  /// Section label above a client review.
  ///
  /// In en, this message translates to:
  /// **'What clients say'**
  String get homeReviewEyebrow;

  /// Marks a review shown in translation.
  ///
  /// In en, this message translates to:
  /// **'Translated'**
  String get reviewTranslated;

  /// Button that opens the AI assistant from Home.
  ///
  /// In en, this message translates to:
  /// **'Ask a question'**
  String get homeAskAliCta;

  /// Heading of the closing booking banner.
  ///
  /// In en, this message translates to:
  /// **'Start with a free site survey'**
  String get homeCtaTitle;

  /// Body of the closing booking banner.
  ///
  /// In en, this message translates to:
  /// **'We visit, measure and advise. Your quotation follows the survey.'**
  String get homeCtaBody;

  /// Button in the closing booking banner.
  ///
  /// In en, this message translates to:
  /// **'Book a free site survey'**
  String get homeCtaButton;

  /// Label above the latest request card.
  ///
  /// In en, this message translates to:
  /// **'Your latest request'**
  String get homeLatestRequest;

  /// Quick contact: phone.
  ///
  /// In en, this message translates to:
  /// **'Call'**
  String get contactCall;

  /// Quick contact: WhatsApp.
  ///
  /// In en, this message translates to:
  /// **'WhatsApp'**
  String get contactWhatsApp;

  /// Quick contact: email.
  ///
  /// In en, this message translates to:
  /// **'Email'**
  String get contactEmail;

  /// Heading of the service inclusions.
  ///
  /// In en, this message translates to:
  /// **'What\'s included'**
  String get serviceIncluded;

  /// Heading of the service FAQs.
  ///
  /// In en, this message translates to:
  /// **'Questions'**
  String get serviceFaqs;

  /// Heading of real projects that used the service.
  ///
  /// In en, this message translates to:
  /// **'Related projects'**
  String get serviceProjects;

  /// Heading of the service's own published prices.
  ///
  /// In en, this message translates to:
  /// **'Published prices'**
  String get servicePrices;

  /// Heading of prices for parts of the service, never the price of the whole service.
  ///
  /// In en, this message translates to:
  /// **'Related starting prices'**
  String get serviceRelatedPrices;

  /// Title of the price guide screen.
  ///
  /// In en, this message translates to:
  /// **'Price guide'**
  String get priceGuideTitle;

  /// Project fact label.
  ///
  /// In en, this message translates to:
  /// **'Location'**
  String get projectLocation;

  /// Project fact label.
  ///
  /// In en, this message translates to:
  /// **'Size'**
  String get projectSize;

  /// Project fact label.
  ///
  /// In en, this message translates to:
  /// **'Year'**
  String get projectYear;

  /// Project fact label.
  ///
  /// In en, this message translates to:
  /// **'Service'**
  String get projectService;

  /// Heading of the project scope list.
  ///
  /// In en, this message translates to:
  /// **'Scope of work'**
  String get projectScope;

  /// Heading of the project description.
  ///
  /// In en, this message translates to:
  /// **'About the project'**
  String get projectStory;

  /// Button that starts a request based on a project.
  ///
  /// In en, this message translates to:
  /// **'Plan a similar project'**
  String get projectPlanSimilar;

  /// Screen-reader label for project photos without their own alt text.
  ///
  /// In en, this message translates to:
  /// **'{title}, photo {index} of {total}'**
  String projectPhotoLabel(String title, int index, int total);

  /// Title of the Book tab.
  ///
  /// In en, this message translates to:
  /// **'Plan your project'**
  String get bookTitle;

  /// Intro of the Book tab.
  ///
  /// In en, this message translates to:
  /// **'Tell us about your space in a few short steps. It\'s free, with no obligation.'**
  String get bookIntro;

  /// Heading of the request steps on the Book tab.
  ///
  /// In en, this message translates to:
  /// **'How it works'**
  String get bookStepsTitle;

  /// Book tab step 1.
  ///
  /// In en, this message translates to:
  /// **'Answer a few short questions about your space.'**
  String get bookStep1;

  /// Book tab step 2.
  ///
  /// In en, this message translates to:
  /// **'Our team reviews your request and contacts you.'**
  String get bookStep2;

  /// Book tab step 3.
  ///
  /// In en, this message translates to:
  /// **'We meet by phone, on WhatsApp or at your site for a free survey.'**
  String get bookStep3;

  /// Primary button on the Book tab.
  ///
  /// In en, this message translates to:
  /// **'Start a request'**
  String get bookStart;

  /// Profile section with contact options.
  ///
  /// In en, this message translates to:
  /// **'Support'**
  String get profileSupport;

  /// Profile section with policies.
  ///
  /// In en, this message translates to:
  /// **'Legal'**
  String get profileLegal;

  /// Link to the website privacy policy.
  ///
  /// In en, this message translates to:
  /// **'Privacy policy'**
  String get profilePrivacy;

  /// Link to the website terms.
  ///
  /// In en, this message translates to:
  /// **'Terms and conditions'**
  String get profileTerms;

  /// Profile action that deletes the account.
  ///
  /// In en, this message translates to:
  /// **'Delete account'**
  String get profileDelete;

  /// Delete-account dialog title.
  ///
  /// In en, this message translates to:
  /// **'Delete your account?'**
  String get deleteTitle;

  /// Delete-account dialog body; states plainly what is and is not deleted.
  ///
  /// In en, this message translates to:
  /// **'This deletes your sign-in. Requests you already sent stay with our team so we can follow up; contact us if you want them removed.'**
  String get deleteBody;

  /// Delete-account confirm button.
  ///
  /// In en, this message translates to:
  /// **'Delete account'**
  String get deleteConfirm;

  /// Shown when Firebase needs a fresh sign-in to delete the account.
  ///
  /// In en, this message translates to:
  /// **'For your security, sign in again, then delete your account.'**
  String get authErrorRecentLogin;

  /// Review button for guests; sending needs an account.
  ///
  /// In en, this message translates to:
  /// **'Sign in to send'**
  String get reviewSignInToSend;

  /// Explains why sign-in is needed at review.
  ///
  /// In en, this message translates to:
  /// **'Sign in or create an account to send your request and follow it from any phone. Your answers are kept.'**
  String get reviewSignInNote;

  /// Button on the confirmation screen.
  ///
  /// In en, this message translates to:
  /// **'View request'**
  String get receivedViewRequest;

  /// Current status line on the confirmation screen.
  ///
  /// In en, this message translates to:
  /// **'Status: {status}'**
  String receivedStatus(String status);

  /// Heading of the request progress timeline.
  ///
  /// In en, this message translates to:
  /// **'Progress'**
  String get timelineTitle;

  /// Support heading on request detail.
  ///
  /// In en, this message translates to:
  /// **'Need help with this request?'**
  String get detailNeedHelp;

  /// Group of open requests.
  ///
  /// In en, this message translates to:
  /// **'Active'**
  String get myRequestsActive;

  /// Group of completed or cancelled requests.
  ///
  /// In en, this message translates to:
  /// **'Past'**
  String get myRequestsPast;

  /// Question on the project-details step.
  ///
  /// In en, this message translates to:
  /// **'Tell us about your project'**
  String get stepDetailsTitle;

  /// Help line on the project-details step.
  ///
  /// In en, this message translates to:
  /// **'Anything that helps us prepare: rooms, style, timing.'**
  String get stepDetailsHelp;

  /// Label of the project-details field.
  ///
  /// In en, this message translates to:
  /// **'Project details'**
  String get stepDetailsLabel;

  /// Review section for the project notes.
  ///
  /// In en, this message translates to:
  /// **'Project details'**
  String get reviewDetails;

  /// Project stage.
  ///
  /// In en, this message translates to:
  /// **'Other'**
  String get stageOther;

  /// Property type.
  ///
  /// In en, this message translates to:
  /// **'Commercial space'**
  String get propertyCommercial;

  /// Screen-reader label for the Home banner position.
  ///
  /// In en, this message translates to:
  /// **'Slide {index} of {total}'**
  String heroSlideLabel(int index, int total);

  /// A client's review in quotation marks suited to the language.
  ///
  /// In en, this message translates to:
  /// **'“{text}”'**
  String reviewQuoted(String text);

  /// Screen-reader label of a review section's Edit button.
  ///
  /// In en, this message translates to:
  /// **'Edit {section}'**
  String reviewEditSection(String section);

  /// A form label marked optional.
  ///
  /// In en, this message translates to:
  /// **'{label} (optional)'**
  String fieldOptional(String label);

  /// Line under the Services page title.
  ///
  /// In en, this message translates to:
  /// **'Design, fit-out and joinery, each starting with a free site survey.'**
  String get servicesHeaderSubtitle;

  /// Line under the Projects page title.
  ///
  /// In en, this message translates to:
  /// **'Homes and workplaces we\'ve designed and fitted out, with photos and the full scope of work.'**
  String get projectsHeaderSubtitle;

  /// Small label above the Book page title.
  ///
  /// In en, this message translates to:
  /// **'Free consultation'**
  String get bookEyebrow;

  /// Projects filter chip: every project.
  ///
  /// In en, this message translates to:
  /// **'All'**
  String get projectsFilterAll;

  /// Projects filter chip.
  ///
  /// In en, this message translates to:
  /// **'Villas'**
  String get projectsFilterVillas;

  /// Projects filter chip.
  ///
  /// In en, this message translates to:
  /// **'Apartments'**
  String get projectsFilterApartments;

  /// Projects filter chip.
  ///
  /// In en, this message translates to:
  /// **'Offices'**
  String get projectsFilterOffices;

  /// Projects filter chip: projects with made-to-measure joinery.
  ///
  /// In en, this message translates to:
  /// **'Joinery'**
  String get projectsFilterJoinery;

  /// Projects filter chip: projects the visitor saved with the heart.
  ///
  /// In en, this message translates to:
  /// **'Saved'**
  String get projectsFilterSaved;

  /// Label on a project photo.
  ///
  /// In en, this message translates to:
  /// **'Villa'**
  String get projectKindVilla;

  /// Label on a project photo.
  ///
  /// In en, this message translates to:
  /// **'Apartment'**
  String get projectKindApartment;

  /// Label on a project photo (offices).
  ///
  /// In en, this message translates to:
  /// **'Commercial'**
  String get projectKindCommercial;

  /// Label on a project photo.
  ///
  /// In en, this message translates to:
  /// **'Residential'**
  String get projectKindResidential;

  /// Sort order: newest projects first.
  ///
  /// In en, this message translates to:
  /// **'Most Recent'**
  String get projectsSortRecent;

  /// Sort order: by project name.
  ///
  /// In en, this message translates to:
  /// **'A–Z'**
  String get projectsSortAlphabetical;

  /// Tooltip of the sort menu.
  ///
  /// In en, this message translates to:
  /// **'Sort projects'**
  String get projectsSortTooltip;

  /// Tooltip of the filter button and title of its sheet.
  ///
  /// In en, this message translates to:
  /// **'Filter projects'**
  String get projectsFilterTooltip;

  /// Tooltip of the search button.
  ///
  /// In en, this message translates to:
  /// **'Search projects'**
  String get projectsSearchTooltip;

  /// Hint in the projects search field.
  ///
  /// In en, this message translates to:
  /// **'Search by name or area'**
  String get projectsSearchHint;

  /// Tooltip that closes the search field.
  ///
  /// In en, this message translates to:
  /// **'Close search'**
  String get projectsCloseSearch;

  /// Heart button, not yet saved.
  ///
  /// In en, this message translates to:
  /// **'Save project'**
  String get projectsSave;

  /// Heart button, already saved.
  ///
  /// In en, this message translates to:
  /// **'Remove from saved'**
  String get projectsUnsave;

  /// Label on the large featured project banner.
  ///
  /// In en, this message translates to:
  /// **'Featured project'**
  String get projectsFeatured;

  /// Button on the featured project banner.
  ///
  /// In en, this message translates to:
  /// **'View Project'**
  String get projectsViewProject;

  /// Empty state when filters or search find nothing.
  ///
  /// In en, this message translates to:
  /// **'No projects match'**
  String get projectsEmptyTitle;

  /// Empty state of the Saved filter.
  ///
  /// In en, this message translates to:
  /// **'Tap the heart on a project to keep it here.'**
  String get projectsEmptySaved;

  /// Button that clears filters and search.
  ///
  /// In en, this message translates to:
  /// **'Show all projects'**
  String get projectsShowAll;

  /// Number of projects next to a filter in the filter sheet.
  ///
  /// In en, this message translates to:
  /// **'{count, plural, =1{1 project} other{{count} projects}}'**
  String projectsCount(int count);

  /// Home section title.
  ///
  /// In en, this message translates to:
  /// **'Our Services'**
  String get homeServicesHeading;

  /// Home section title.
  ///
  /// In en, this message translates to:
  /// **'Featured Projects'**
  String get homeFeaturedProjects;

  /// Link at the end of a Home section title.
  ///
  /// In en, this message translates to:
  /// **'View All'**
  String get homeViewAll;

  /// Button on the Home banner; starts a consultation request.
  ///
  /// In en, this message translates to:
  /// **'Get Started'**
  String get homeHeroCta;

  /// Home price banner title.
  ///
  /// In en, this message translates to:
  /// **'Get an Estimated Price for Your Project'**
  String get homeEstimateTitle;

  /// Home price banner text.
  ///
  /// In en, this message translates to:
  /// **'Published starting prices, before VAT. Your quotation follows a free site survey.'**
  String get homeEstimateBody;

  /// Home price banner button; opens the price guide.
  ///
  /// In en, this message translates to:
  /// **'See Starting Prices'**
  String get homeEstimateCta;

  /// Home section title.
  ///
  /// In en, this message translates to:
  /// **'Why Bait Al Ebdaa'**
  String get homeWhyTitle;

  /// Short line next to the Why title.
  ///
  /// In en, this message translates to:
  /// **'More Than Spaces, Lasting Value'**
  String get homeWhyTagline;

  /// Home header search button.
  ///
  /// In en, this message translates to:
  /// **'Search services and projects'**
  String get homeSearchTooltip;

  /// Home header bell; opens the request list on Profile.
  ///
  /// In en, this message translates to:
  /// **'My requests'**
  String get homeRequestsTooltip;

  /// Home header bell when a request is still open.
  ///
  /// In en, this message translates to:
  /// **'My requests, one in progress'**
  String get homeRequestsActiveTooltip;

  /// Home header emirate picker.
  ///
  /// In en, this message translates to:
  /// **'Choose your emirate'**
  String get homeEmirateTooltip;

  /// Emirate picker value when no emirate is chosen.
  ///
  /// In en, this message translates to:
  /// **'UAE'**
  String get homeEmirateAll;

  /// Emirate picker option for no particular emirate.
  ///
  /// In en, this message translates to:
  /// **'All of the UAE'**
  String get homeEmirateAllOption;

  /// Emirate picker explanation.
  ///
  /// In en, this message translates to:
  /// **'We work in all seven emirates at the same prices. Your choice is filled in when you start a request.'**
  String get homeEmirateSheetBody;

  /// Search field hint.
  ///
  /// In en, this message translates to:
  /// **'Search services and projects'**
  String get searchHint;

  /// Search results group.
  ///
  /// In en, this message translates to:
  /// **'Services'**
  String get searchServices;

  /// Search results group.
  ///
  /// In en, this message translates to:
  /// **'Projects'**
  String get searchProjects;

  /// Search with no results.
  ///
  /// In en, this message translates to:
  /// **'Nothing matches your search'**
  String get searchEmpty;

  /// Title of the service page bar.
  ///
  /// In en, this message translates to:
  /// **'Service Details'**
  String get serviceDetailsTitle;

  /// Bookmark button, not yet saved.
  ///
  /// In en, this message translates to:
  /// **'Save service'**
  String get serviceSave;

  /// Bookmark button, already saved.
  ///
  /// In en, this message translates to:
  /// **'Remove from saved'**
  String get serviceUnsave;

  /// Share button on the service page.
  ///
  /// In en, this message translates to:
  /// **'Share'**
  String get serviceShare;

  /// Text shared from a service page.
  ///
  /// In en, this message translates to:
  /// **'{service} by Bait Al Ebdaa: {url}'**
  String serviceShareText(String service, String url);

  /// Service fact chip.
  ///
  /// In en, this message translates to:
  /// **'Free site survey'**
  String get serviceFactSurvey;

  /// Service fact chip.
  ///
  /// In en, this message translates to:
  /// **'All seven emirates'**
  String get serviceFactEmirates;

  /// Service fact chip: the in-house factory in Ajman.
  ///
  /// In en, this message translates to:
  /// **'Own joinery factory'**
  String get serviceFactFactory;

  /// Label above a service starting price.
  ///
  /// In en, this message translates to:
  /// **'Starting price'**
  String get serviceStartingFrom;

  /// Collapses the full list of inclusions.
  ///
  /// In en, this message translates to:
  /// **'Show Less'**
  String get serviceShowLess;

  /// Service page section title: the four stages.
  ///
  /// In en, this message translates to:
  /// **'How It Works'**
  String get serviceHowItWorks;

  /// Sticky button on the service page; starts a free site survey request.
  ///
  /// In en, this message translates to:
  /// **'Request Consultation'**
  String get serviceRequestConsultation;

  /// Profile section listing saved services and projects.
  ///
  /// In en, this message translates to:
  /// **'Saved'**
  String get profileSavedTitle;

  /// Title of the request screens.
  ///
  /// In en, this message translates to:
  /// **'Plan Your Project'**
  String get requestFlowTitle;

  /// Request progress step label.
  ///
  /// In en, this message translates to:
  /// **'Your Requirements'**
  String get requestPageRequirements;

  /// Request progress step label.
  ///
  /// In en, this message translates to:
  /// **'Details'**
  String get requestPageDetails;

  /// Request progress step label.
  ///
  /// In en, this message translates to:
  /// **'Consultation'**
  String get requestPageConsultation;

  /// Request progress step label.
  ///
  /// In en, this message translates to:
  /// **'Contact'**
  String get requestPageContact;

  /// Request progress step label.
  ///
  /// In en, this message translates to:
  /// **'Review'**
  String get requestPageReview;

  /// Request progress step label.
  ///
  /// In en, this message translates to:
  /// **'Complete'**
  String get requestPageComplete;

  /// Screen reader text for the request progress.
  ///
  /// In en, this message translates to:
  /// **'Step {current} of {total}: {name}'**
  String requestProgress(int current, int total, String name);

  /// Numbered section on the request screen.
  ///
  /// In en, this message translates to:
  /// **'Service'**
  String get requestSectionService;

  /// Numbered section on the request screen.
  ///
  /// In en, this message translates to:
  /// **'Property Type'**
  String get requestSectionProperty;

  /// Numbered section on the request screen.
  ///
  /// In en, this message translates to:
  /// **'Emirate'**
  String get requestSectionEmirate;

  /// Numbered section on the request screen.
  ///
  /// In en, this message translates to:
  /// **'Approximate Size'**
  String get requestSectionSize;

  /// Numbered section on the request screen.
  ///
  /// In en, this message translates to:
  /// **'Budget'**
  String get requestSectionBudget;

  /// Numbered section on the request screen.
  ///
  /// In en, this message translates to:
  /// **'Project Stage'**
  String get requestSectionStage;

  /// Numbered section on the request screen.
  ///
  /// In en, this message translates to:
  /// **'Project Details'**
  String get requestSectionDetails;

  /// Numbered section on the request screen.
  ///
  /// In en, this message translates to:
  /// **'Consultation'**
  String get requestSectionConsultation;

  /// Numbered section on the request screen.
  ///
  /// In en, this message translates to:
  /// **'Preferred Time'**
  String get requestSectionTime;

  /// Numbered section on the request screen.
  ///
  /// In en, this message translates to:
  /// **'Your Details'**
  String get requestSectionContact;

  /// Numbered section on the request screen.
  ///
  /// In en, this message translates to:
  /// **'Photos / Floor Plans'**
  String get requestSectionPhotos;

  /// Photos section: they are shared on WhatsApp after sending.
  ///
  /// In en, this message translates to:
  /// **'After you send your request, share photos, floor plans or inspiration images on WhatsApp. Your request number is added for you.'**
  String get requestPhotosBody;

  /// Info card on the request screen.
  ///
  /// In en, this message translates to:
  /// **'Preferred time and date will be confirmed later'**
  String get requestTimeInfoTitle;

  /// Info card on the request screen.
  ///
  /// In en, this message translates to:
  /// **'Our team will get in touch to schedule a consultation at your convenience.'**
  String get requestTimeInfoBody;

  /// Leaves the request; the answers stay on the device.
  ///
  /// In en, this message translates to:
  /// **'Save Draft'**
  String get requestSaveDraft;

  /// Shown after Save Draft.
  ///
  /// In en, this message translates to:
  /// **'Draft saved. Continue any time from Home or Book.'**
  String get requestDraftSaved;

  /// Title of a sent request.
  ///
  /// In en, this message translates to:
  /// **'My Request'**
  String get myRequestTitle;

  /// Line under the request title.
  ///
  /// In en, this message translates to:
  /// **'Track the progress of your project consultation request.'**
  String get myRequestSubtitle;

  /// Label above the request reference.
  ///
  /// In en, this message translates to:
  /// **'Request ID'**
  String get myRequestId;

  /// Copy button tooltip.
  ///
  /// In en, this message translates to:
  /// **'Copy request ID'**
  String get myRequestCopy;

  /// Shown after copying the reference.
  ///
  /// In en, this message translates to:
  /// **'Request ID copied'**
  String get myRequestCopied;

  /// Card title: the time and way the customer asked for.
  ///
  /// In en, this message translates to:
  /// **'Preferred Consultation'**
  String get myRequestConsultation;

  /// Label in the consultation card.
  ///
  /// In en, this message translates to:
  /// **'Preferred Date'**
  String get myRequestPreferredDate;

  /// Label in the consultation card.
  ///
  /// In en, this message translates to:
  /// **'Preferred Time'**
  String get myRequestPreferredTime;

  /// Card title: how to send photos and plans.
  ///
  /// In en, this message translates to:
  /// **'Photos & Plans'**
  String get myRequestPhotos;

  /// Photos card text.
  ///
  /// In en, this message translates to:
  /// **'Send photos or floor plans on WhatsApp; your request number is added for you.'**
  String get myRequestPhotosBody;

  /// Need help card text.
  ///
  /// In en, this message translates to:
  /// **'Our team is here to support you with any questions about your request.'**
  String get myRequestHelpBody;

  /// Log-in screen title.
  ///
  /// In en, this message translates to:
  /// **'Welcome Back'**
  String get authLoginTitle;

  /// Line under the log-in title.
  ///
  /// In en, this message translates to:
  /// **'Log in to continue planning and building exceptional spaces across the UAE.'**
  String get authLoginIntro;

  /// Sign-up screen title.
  ///
  /// In en, this message translates to:
  /// **'Create Your Account'**
  String get authRegisterTitle;

  /// Line under the sign-up title.
  ///
  /// In en, this message translates to:
  /// **'Join Bait Al Ebdaa and start planning your dream space with our expert team.'**
  String get authRegisterIntro;

  /// Log-in button and link.
  ///
  /// In en, this message translates to:
  /// **'Log In'**
  String get authLogIn;

  /// Sign-up button.
  ///
  /// In en, this message translates to:
  /// **'Create Account'**
  String get authCreateAccount;

  /// Name field.
  ///
  /// In en, this message translates to:
  /// **'Full Name'**
  String get authFullName;

  /// Under the name field.
  ///
  /// In en, this message translates to:
  /// **'Enter your full name'**
  String get authFullNameHelp;

  /// Email field.
  ///
  /// In en, this message translates to:
  /// **'Email Address'**
  String get authEmail;

  /// Under the email field on sign-up.
  ///
  /// In en, this message translates to:
  /// **'Enter your email address'**
  String get authEmailHelp;

  /// Phone field on sign-up.
  ///
  /// In en, this message translates to:
  /// **'Phone Number'**
  String get authPhone;

  /// Example number shown in the empty phone field.
  ///
  /// In en, this message translates to:
  /// **'+971 50 123 4567'**
  String get authPhoneExample;

  /// Under the phone field.
  ///
  /// In en, this message translates to:
  /// **'Enter your phone number'**
  String get authPhoneHelp;

  /// Under the password field on sign-up.
  ///
  /// In en, this message translates to:
  /// **'Create a strong password (min. {min} characters)'**
  String authPasswordHelp(int min);

  /// Terms checkbox; the placeholders become links.
  ///
  /// In en, this message translates to:
  /// **'I agree to the {terms} and {privacy}'**
  String authAgree(String terms, String privacy);

  /// Link to the website's terms.
  ///
  /// In en, this message translates to:
  /// **'Terms of Service'**
  String get authTerms;

  /// Link to the website's privacy policy.
  ///
  /// In en, this message translates to:
  /// **'Privacy Policy'**
  String get authPrivacy;

  /// Shown when creating an account without ticking the box.
  ///
  /// In en, this message translates to:
  /// **'Please agree to the Terms of Service and Privacy Policy.'**
  String get authAgreeRequired;

  /// Divider above Google and Apple.
  ///
  /// In en, this message translates to:
  /// **'Or continue with'**
  String get authOr;

  /// Google sign-in button.
  ///
  /// In en, this message translates to:
  /// **'Continue with Google'**
  String get authGoogle;

  /// Apple sign-in button.
  ///
  /// In en, this message translates to:
  /// **'Continue with Apple'**
  String get authApple;

  /// Before the Sign Up link.
  ///
  /// In en, this message translates to:
  /// **'Don\'t have an account?'**
  String get authNoAccount;

  /// Link to the sign-up screen.
  ///
  /// In en, this message translates to:
  /// **'Sign Up'**
  String get authSignUp;

  /// Before the Log In link.
  ///
  /// In en, this message translates to:
  /// **'Already have an account?'**
  String get authHaveAccount;

  /// Link to reset the password.
  ///
  /// In en, this message translates to:
  /// **'Forgot Password?'**
  String get authForgot;

  /// Line on the launch screen.
  ///
  /// In en, this message translates to:
  /// **'Designing exceptional spaces across the UAE.'**
  String get splashTagline;

  /// Small line under the wordmark.
  ///
  /// In en, this message translates to:
  /// **'INTERIORS | FIT-OUT | JOINERY'**
  String get brandServicesLine;
}

class _AppLocalizationsDelegate extends LocalizationsDelegate<AppLocalizations> {
  const _AppLocalizationsDelegate();

  @override
  Future<AppLocalizations> load(Locale locale) {
    return SynchronousFuture<AppLocalizations>(lookupAppLocalizations(locale));
  }

  @override
  bool isSupported(Locale locale) => <String>['ar', 'en'].contains(locale.languageCode);

  @override
  bool shouldReload(_AppLocalizationsDelegate old) => false;
}

AppLocalizations lookupAppLocalizations(Locale locale) {
  // Lookup logic when only language code is specified.
  switch (locale.languageCode) {
    case 'ar':
      return AppLocalizationsAr();
    case 'en':
      return AppLocalizationsEn();
  }

  throw FlutterError(
    'AppLocalizations.delegate failed to load unsupported locale "$locale". This is likely '
    'an issue with the localizations generation tool. Please file an issue '
    'on GitHub with a reproducible sample app and the gen-l10n configuration '
    'that was used.',
  );
}
