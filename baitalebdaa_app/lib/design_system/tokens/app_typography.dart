import 'package:flutter/material.dart';

/// Latin page titles and featured headlines use Cormorant Garamond (owner's design, 26 Oct
/// 2026), smaller headings Manrope and everything else DM Sans; Arabic uses Tajawal
/// throughout, as on the website. Arabic gets larger sizes, looser line heights and no
/// letter-spacing: the tight Latin tracking would break Arabic joining.
enum AppScript {
  latin,
  arabic;

  static AppScript of(Locale locale) => locale.languageCode == 'ar' ? arabic : latin;
}

abstract final class AppFonts {
  static const cormorant = 'CormorantGaramond';
  static const manrope = 'Manrope';
  static const dmSans = 'DMSans';
  static const tajawal = 'Tajawal';
}

/// Named text roles (Phase 1 doc, Design deliverable section 7). Material's [TextTheme] is
/// derived from these so built-in widgets match.
@immutable
class AppTextStyles extends ThemeExtension<AppTextStyles> {
  const AppTextStyles({
    required this.display,
    required this.headline,
    required this.title,
    required this.subtitle,
    required this.body,
    required this.bodySmall,
    required this.label,
    required this.eyebrow,
    required this.caption,
    required this.figure,
    required this.script,
  });

  factory AppTextStyles.forScript(AppScript script, Color color) => switch (script) {
    AppScript.latin => AppTextStyles(
      script: script,
      // Cormorant has a small x-height, so it runs larger than the sans sizes it replaced.
      display: _latin(AppFonts.cormorant, 600, 46, 48, -0.01, color),
      headline: _latin(AppFonts.cormorant, 600, 32, 36, 0, color),
      title: _latin(AppFonts.manrope, 500, 22, 28, -0.02, color),
      subtitle: _latin(AppFonts.dmSans, 600, 17, 24, 0, color),
      body: _latin(AppFonts.dmSans, 400, 17, 26, 0, color),
      bodySmall: _latin(AppFonts.dmSans, 400, 15, 22, 0, color),
      label: _latin(AppFonts.dmSans, 600, 15, 20, 0, color),
      eyebrow: _latin(AppFonts.dmSans, 600, 12, 16, 0.16, color),
      caption: _latin(AppFonts.dmSans, 400, 13, 18, 0, color),
      figure: _latin(AppFonts.manrope, 500, 22, 28, -0.01, color).copyWith(fontFeatures: _tabular),
    ),
    AppScript.arabic => AppTextStyles(
      script: script,
      display: _arabic(700, 40, 52, color),
      headline: _arabic(700, 28, 38, color),
      title: _arabic(700, 22, 32, color),
      subtitle: _arabic(500, 18, 28, color),
      body: _arabic(400, 18, 30, color),
      bodySmall: _arabic(400, 16, 26, color),
      label: _arabic(700, 16, 22, color),
      eyebrow: _arabic(700, 13, 18, color),
      caption: _arabic(400, 14, 20, color),
      figure: _arabic(700, 22, 30, color).copyWith(fontFeatures: _tabular),
    ),
  };

  final TextStyle display;
  final TextStyle headline;
  final TextStyle title;
  final TextStyle subtitle;
  final TextStyle body;
  final TextStyle bodySmall;
  final TextStyle label;

  /// Section labels. Latin eyebrows are upper-cased by the Eyebrow widget; Arabic has no case.
  final TextStyle eyebrow;

  /// The smallest text in the app. Nothing goes below this.
  final TextStyle caption;

  /// Prices and sizes, with tabular figures so columns of numbers align.
  final TextStyle figure;
  final AppScript script;

  TextTheme toTextTheme() => TextTheme(
    displayLarge: display,
    displayMedium: display,
    displaySmall: display,
    headlineLarge: headline,
    headlineMedium: headline,
    headlineSmall: headline,
    titleLarge: title,
    titleMedium: subtitle,
    titleSmall: label,
    bodyLarge: body,
    bodyMedium: bodySmall,
    bodySmall: caption,
    labelLarge: label,
    labelMedium: caption,
    labelSmall: caption,
  );

  @override
  AppTextStyles copyWith({AppScript? script}) =>
      script == null || script == this.script ? this : AppTextStyles.forScript(script, body.color ?? Colors.black);

  @override
  AppTextStyles lerp(AppTextStyles? other, double t) {
    if (other == null || other.script != script) return t < 0.5 ? this : (other ?? this);
    TextStyle mix(TextStyle a, TextStyle b) => TextStyle.lerp(a, b, t)!;
    return AppTextStyles(
      script: script,
      display: mix(display, other.display),
      headline: mix(headline, other.headline),
      title: mix(title, other.title),
      subtitle: mix(subtitle, other.subtitle),
      body: mix(body, other.body),
      bodySmall: mix(bodySmall, other.bodySmall),
      label: mix(label, other.label),
      eyebrow: mix(eyebrow, other.eyebrow),
      caption: mix(caption, other.caption),
      figure: mix(figure, other.figure),
    );
  }
}

const _tabular = [FontFeature.tabularFigures()];

TextStyle _latin(String family, int weight, double size, double lineHeight, double trackingEm, Color color) =>
    TextStyle(
      fontFamily: family,
      // Arabic words inside Latin UI (the language switch, a client's name) render in Tajawal.
      fontFamilyFallback: const [AppFonts.tajawal],
      fontWeight: FontWeight.values.firstWhere((w) => w.value == weight),
      fontSize: size,
      height: lineHeight / size,
      letterSpacing: trackingEm * size,
      color: color,
    );

TextStyle _arabic(int weight, double size, double lineHeight, Color color) => TextStyle(
  fontFamily: AppFonts.tajawal,
  fontFamilyFallback: const [AppFonts.dmSans],
  fontWeight: FontWeight.values.firstWhere((w) => w.value == weight),
  fontSize: size,
  height: lineHeight / size,
  letterSpacing: 0,
  color: color,
);
