import 'package:flutter/material.dart';

import '../../app/l10n/app_localizations.dart';
import '../../features/content/domain/localized.dart';
import '../tokens/app_colors.dart';
import '../tokens/app_typography.dart';

extension AppContext on BuildContext {
  AppColors get colors => Theme.of(this).extension<AppColors>()!;

  AppTextStyles get textStyles => Theme.of(this).extension<AppTextStyles>()!;

  AppLocalizations get l10n => AppLocalizations.of(this);

  bool get isArabic => Localizations.localeOf(this).languageCode == 'ar';

  /// Picks the current language's side of website content.
  String localized(LocalizedText text) => text.resolve(Localizations.localeOf(this).languageCode);

  List<String> localizedList(LocalizedList list) => list.resolve(Localizations.localeOf(this).languageCode);
}
