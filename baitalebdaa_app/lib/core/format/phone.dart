/// +971582621717 → "+971 58 262 1717", the grouping the website shows. Other numbers are
/// returned unchanged.
String formatPhone(String e164) {
  final uae = RegExp(r'^\+971(\d{2})(\d{3})(\d{4})$').firstMatch(e164);
  return uae == null ? e164 : '+971 ${uae[1]} ${uae[2]} ${uae[3]}';
}
