import 'package:flutter/material.dart';

/// Semantic colour tokens. Hex values appear only in this file; widgets read
/// `context.colors.textSecondary`, never a raw colour.
///
/// The palette is the website's (src/styles.css): ink #11110F, paper #F3F1EC, sand #D6C8B6.
/// `brandAccentStrong`, `borderControl` and the status colours are additions derived from
/// it so app states meet WCAG AA; they await business sign-off. test/design_system checks
/// every text pairing for contrast.
@immutable
class AppColors extends ThemeExtension<AppColors> {
  const AppColors({
    required this.surfacePrimary,
    required this.surfaceSecondary,
    required this.surfaceWarm,
    required this.surfaceInverse,
    required this.textPrimary,
    required this.textSecondary,
    required this.textTertiary,
    required this.textOnInverse,
    required this.brandPrimary,
    required this.onBrandPrimary,
    required this.brandAccent,
    required this.brandAccentStrong,
    required this.borderSubtle,
    required this.borderControl,
    required this.success,
    required this.warning,
    required this.error,
    required this.whatsapp,
    required this.onWhatsapp,
    required this.scrim,
  });

  /// The launch screen is ink in both themes; keep in step with `flutter_native_splash` in
  /// pubspec.yaml.
  static const Color splashBackground = Color(0xFF11110F);

  static const light = AppColors(
    surfacePrimary: Color(0xFFF3F1EC),
    surfaceSecondary: Color(0xFFFBFAF7),
    surfaceWarm: Color(0xFFEBE8E1),
    surfaceInverse: Color(0xFF11110F),
    textPrimary: Color(0xFF11110F),
    textSecondary: Color(0xFF5F5D58),
    textTertiary: Color(0xFF6B6963),
    textOnInverse: Color(0xFFF3F1EC),
    brandPrimary: Color(0xFF11110F),
    onBrandPrimary: Color(0xFFF3F1EC),
    brandAccent: Color(0xFFD6C8B6),
    brandAccentStrong: Color(0xFF7A6347),
    borderSubtle: Color(0x1F11110F),
    borderControl: Color(0xFF8A8780),
    success: Color(0xFF2E6B4F),
    warning: Color(0xFF8A5A00),
    error: Color(0xFFA3352B),
    whatsapp: Color(0xFF25D366),
    onWhatsapp: Color(0xFF11110F),
    scrim: Color(0xFF11110F),
  );

  static const dark = AppColors(
    surfacePrimary: Color(0xFF11110F),
    surfaceSecondary: Color(0xFF1A1A18),
    surfaceWarm: Color(0xFF22221F),
    surfaceInverse: Color(0xFFF3F1EC),
    textPrimary: Color(0xFFF3F1EC),
    textSecondary: Color(0xFFA6A39B),
    textTertiary: Color(0xFF8F8C84),
    textOnInverse: Color(0xFF11110F),
    brandPrimary: Color(0xFFF3F1EC),
    onBrandPrimary: Color(0xFF11110F),
    brandAccent: Color(0xFFD6C8B6),
    brandAccentStrong: Color(0xFFD6C8B6),
    borderSubtle: Color(0x24F3F1EC),
    borderControl: Color(0xFF8F8C84),
    success: Color(0xFF7FC3A0),
    warning: Color(0xFFE0B25C),
    error: Color(0xFFE08A80),
    whatsapp: Color(0xFF25D366),
    onWhatsapp: Color(0xFF11110F),
    scrim: Color(0xFF11110F),
  );

  final Color surfacePrimary;
  final Color surfaceSecondary;

  /// Image placeholders, selected tiles, skeletons.
  final Color surfaceWarm;
  final Color surfaceInverse;
  final Color textPrimary;
  final Color textSecondary;

  /// Metadata at 14 pt or larger only.
  final Color textTertiary;
  final Color textOnInverse;
  final Color brandPrimary;
  final Color onBrandPrimary;

  /// Sand. On dark surfaces only: on paper it has too little contrast to carry meaning.
  final Color brandAccent;

  /// Selected states, progress, links and focus rings on light surfaces.
  final Color brandAccentStrong;

  /// Decorative dividers.
  final Color borderSubtle;

  /// Outlines of inputs and selectable tiles (non-text contrast at least 3:1).
  final Color borderControl;
  final Color success;
  final Color warning;
  final Color error;
  final Color whatsapp;
  final Color onWhatsapp;

  /// Base of the gradient that keeps text on photography readable.
  final Color scrim;

  @override
  AppColors copyWith({
    Color? surfacePrimary,
    Color? surfaceSecondary,
    Color? surfaceWarm,
    Color? surfaceInverse,
    Color? textPrimary,
    Color? textSecondary,
    Color? textTertiary,
    Color? textOnInverse,
    Color? brandPrimary,
    Color? onBrandPrimary,
    Color? brandAccent,
    Color? brandAccentStrong,
    Color? borderSubtle,
    Color? borderControl,
    Color? success,
    Color? warning,
    Color? error,
    Color? whatsapp,
    Color? onWhatsapp,
    Color? scrim,
  }) => AppColors(
    surfacePrimary: surfacePrimary ?? this.surfacePrimary,
    surfaceSecondary: surfaceSecondary ?? this.surfaceSecondary,
    surfaceWarm: surfaceWarm ?? this.surfaceWarm,
    surfaceInverse: surfaceInverse ?? this.surfaceInverse,
    textPrimary: textPrimary ?? this.textPrimary,
    textSecondary: textSecondary ?? this.textSecondary,
    textTertiary: textTertiary ?? this.textTertiary,
    textOnInverse: textOnInverse ?? this.textOnInverse,
    brandPrimary: brandPrimary ?? this.brandPrimary,
    onBrandPrimary: onBrandPrimary ?? this.onBrandPrimary,
    brandAccent: brandAccent ?? this.brandAccent,
    brandAccentStrong: brandAccentStrong ?? this.brandAccentStrong,
    borderSubtle: borderSubtle ?? this.borderSubtle,
    borderControl: borderControl ?? this.borderControl,
    success: success ?? this.success,
    warning: warning ?? this.warning,
    error: error ?? this.error,
    whatsapp: whatsapp ?? this.whatsapp,
    onWhatsapp: onWhatsapp ?? this.onWhatsapp,
    scrim: scrim ?? this.scrim,
  );

  @override
  AppColors lerp(AppColors? other, double t) {
    if (other == null) return this;
    Color mix(Color a, Color b) => Color.lerp(a, b, t)!;
    return AppColors(
      surfacePrimary: mix(surfacePrimary, other.surfacePrimary),
      surfaceSecondary: mix(surfaceSecondary, other.surfaceSecondary),
      surfaceWarm: mix(surfaceWarm, other.surfaceWarm),
      surfaceInverse: mix(surfaceInverse, other.surfaceInverse),
      textPrimary: mix(textPrimary, other.textPrimary),
      textSecondary: mix(textSecondary, other.textSecondary),
      textTertiary: mix(textTertiary, other.textTertiary),
      textOnInverse: mix(textOnInverse, other.textOnInverse),
      brandPrimary: mix(brandPrimary, other.brandPrimary),
      onBrandPrimary: mix(onBrandPrimary, other.onBrandPrimary),
      brandAccent: mix(brandAccent, other.brandAccent),
      brandAccentStrong: mix(brandAccentStrong, other.brandAccentStrong),
      borderSubtle: mix(borderSubtle, other.borderSubtle),
      borderControl: mix(borderControl, other.borderControl),
      success: mix(success, other.success),
      warning: mix(warning, other.warning),
      error: mix(error, other.error),
      whatsapp: mix(whatsapp, other.whatsapp),
      onWhatsapp: mix(onWhatsapp, other.onWhatsapp),
      scrim: mix(scrim, other.scrim),
    );
  }
}
