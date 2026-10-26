import 'package:flutter/material.dart';

import '../tokens/app_colors.dart';
import '../tokens/app_layout_tokens.dart';
import '../tokens/app_typography.dart';

/// Builds the Material theme from tokens. Light and dark are two token sets through the
/// same code path; Latin and Arabic differ only in their text styles.
abstract final class AppTheme {
  static final _cache = <(Brightness, AppScript), ThemeData>{};

  /// Themes are immutable, so each of the four combinations is built once.
  static ThemeData build({required Brightness brightness, required AppScript script}) =>
      _cache.putIfAbsent((brightness, script), () => _build(brightness, script));

  static ThemeData _build(Brightness brightness, AppScript script) {
    final colors = brightness == Brightness.dark ? AppColors.dark : AppColors.light;
    final text = AppTextStyles.forScript(script, colors.textPrimary);
    final scheme = ColorScheme(
      brightness: brightness,
      primary: colors.brandPrimary,
      onPrimary: colors.onBrandPrimary,
      secondary: colors.brandAccentStrong,
      onSecondary: colors.surfacePrimary,
      error: colors.error,
      onError: colors.surfacePrimary,
      surface: colors.surfacePrimary,
      onSurface: colors.textPrimary,
      onSurfaceVariant: colors.textSecondary,
      surfaceContainerLowest: colors.surfaceSecondary,
      surfaceContainerLow: colors.surfaceSecondary,
      surfaceContainer: colors.surfaceSecondary,
      surfaceContainerHigh: colors.surfaceWarm,
      surfaceContainerHighest: colors.surfaceWarm,
      outline: colors.borderControl,
      outlineVariant: colors.borderSubtle,
      inverseSurface: colors.surfaceInverse,
      onInverseSurface: colors.textOnInverse,
      shadow: colors.scrim,
      scrim: colors.scrim,
    );
    final textTheme = text.toTextTheme();
    const buttonSize = Size(kMinTouchTarget * 2, kMinTouchTarget);
    const buttonPadding = EdgeInsetsDirectional.symmetric(horizontal: AppSpacing.xl, vertical: AppSpacing.sm);
    const signatureShape = RoundedRectangleBorder(borderRadius: AppRadius.signature);

    return ThemeData(
      useMaterial3: true,
      brightness: brightness,
      colorScheme: scheme,
      scaffoldBackgroundColor: colors.surfacePrimary,
      canvasColor: colors.surfacePrimary,
      textTheme: textTheme,
      fontFamily: text.body.fontFamily,
      extensions: [colors, text],
      materialTapTargetSize: MaterialTapTargetSize.padded,
      splashFactory: InkRipple.splashFactory,
      highlightColor: Colors.transparent,
      dividerTheme: DividerThemeData(color: colors.borderSubtle, thickness: 1, space: 1),
      iconTheme: IconThemeData(color: colors.textPrimary, size: 24),
      appBarTheme: AppBarTheme(
        backgroundColor: colors.surfacePrimary,
        foregroundColor: colors.textPrimary,
        surfaceTintColor: Colors.transparent,
        elevation: 0,
        scrolledUnderElevation: 0,
        centerTitle: false,
        titleTextStyle: text.title,
      ),
      navigationRailTheme: NavigationRailThemeData(
        backgroundColor: colors.surfacePrimary,
        indicatorColor: Colors.transparent,
        selectedIconTheme: IconThemeData(color: colors.brandPrimary),
        unselectedIconTheme: IconThemeData(color: colors.textSecondary),
        selectedLabelTextStyle: text.caption.copyWith(color: colors.brandPrimary, fontWeight: FontWeight.w600),
        unselectedLabelTextStyle: text.caption.copyWith(color: colors.textSecondary),
        labelType: NavigationRailLabelType.all,
      ),
      filledButtonTheme: FilledButtonThemeData(
        style: FilledButton.styleFrom(
          backgroundColor: colors.brandPrimary,
          foregroundColor: colors.onBrandPrimary,
          disabledBackgroundColor: colors.surfaceWarm,
          disabledForegroundColor: colors.textTertiary,
          minimumSize: buttonSize,
          padding: buttonPadding,
          shape: signatureShape,
          textStyle: text.label,
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: colors.textPrimary,
          side: BorderSide(color: colors.textPrimary),
          minimumSize: buttonSize,
          padding: buttonPadding,
          shape: signatureShape,
          textStyle: text.label,
        ),
      ),
      textButtonTheme: TextButtonThemeData(
        style: TextButton.styleFrom(
          foregroundColor: colors.textPrimary,
          minimumSize: const Size(kMinTouchTarget, kMinTouchTarget),
          // Text links line up with the text around them; the 48 dp minimum keeps the target.
          padding: EdgeInsetsDirectional.zero,
          textStyle: text.label.copyWith(decoration: TextDecoration.underline),
        ),
      ),
      listTileTheme: ListTileThemeData(
        iconColor: colors.textPrimary,
        textColor: colors.textPrimary,
        titleTextStyle: text.subtitle,
        subtitleTextStyle: text.bodySmall.copyWith(color: colors.textSecondary),
        minVerticalPadding: AppSpacing.sm,
        contentPadding: EdgeInsetsDirectional.zero,
      ),
      radioTheme: RadioThemeData(
        fillColor: WidgetStateProperty.resolveWith(
          (states) => states.contains(WidgetState.selected) ? colors.brandPrimary : colors.borderControl,
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(AppRadius.md),
          borderSide: BorderSide(color: colors.borderControl),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(AppRadius.md),
          borderSide: BorderSide(color: colors.borderControl),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(AppRadius.md),
          borderSide: BorderSide(color: colors.brandPrimary, width: 2),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(AppRadius.md),
          borderSide: BorderSide(color: colors.error),
        ),
        labelStyle: text.bodySmall.copyWith(color: colors.textSecondary),
        hintStyle: text.body.copyWith(color: colors.textTertiary),
        errorStyle: text.caption.copyWith(color: colors.error),
      ),
      focusColor: colors.brandPrimary.withValues(alpha: 0.16),
      progressIndicatorTheme: ProgressIndicatorThemeData(
        color: colors.brandPrimary,
        linearTrackColor: colors.surfaceWarm,
      ),
      snackBarTheme: SnackBarThemeData(
        backgroundColor: colors.surfaceInverse,
        contentTextStyle: text.bodySmall.copyWith(color: colors.textOnInverse),
        behavior: SnackBarBehavior.floating,
      ),
    );
  }
}
