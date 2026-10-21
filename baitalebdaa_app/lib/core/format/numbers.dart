import 'package:intl/intl.dart';

/// Numbers in the app use Western digits in both languages, matching the website
/// (src/lib/pricing.js formats with "en-AE" for Arabic pages too). Decorative counters
/// such as "01" are the one exception and follow the website's Arabic-Indic style.
final NumberFormat _percent = NumberFormat.percentPattern('en');

/// 0.05 → "5%".
String formatPercent(double fraction) => _percent.format(fraction);

const _arabicIndic = '٠١٢٣٤٥٦٧٨٩';

/// Decorative counter: 1 → "01", or "٠١" in Arabic, as the website's formatIndex()
/// (src/lib/format.js) does, so numbered lists read naturally on an Arabic page.
String formatIndex(int n, String languageCode) {
  final padded = n.toString().padLeft(2, '0');
  return languageCode == 'ar'
      ? padded.replaceAllMapped(RegExp('[0-9]'), (m) => _arabicIndic[int.parse(m[0]!)])
      : padded;
}
