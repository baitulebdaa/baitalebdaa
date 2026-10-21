// Fails CI when code breaks rules the analyzer cannot check:
//
//  1. RTL safety: layout must use start/end, never left/right, so Arabic mirrors correctly.
//  2. No hard-coded user-facing text in screens: every string goes through the ARB files.
//  3. One header: screens use AppScrollView, AppPhotoSliverHeader or AppTopBar
//     (design_system/components/navigation/app_header.dart), never AppBar or SliverAppBar.
//
//   dart run tool/check_conventions.dart
//
// A line can opt out with a trailing `// convention-ok: <reason>`; the reason is required
// so every exception is explained where it lives.
import 'dart:io';

final _rtlRules = <RegExp, String>{
  RegExp(r'EdgeInsets\.only\([^)]*\b(left|right):'): 'use EdgeInsetsDirectional.only(start:/end:)',
  RegExp(r'EdgeInsets\.fromLTRB\('): 'use EdgeInsetsDirectional.fromSTEB',
  RegExp(r'Alignment\.(centerLeft|centerRight|topLeft|topRight|bottomLeft|bottomRight)\b'):
      'use AlignmentDirectional.centerStart/End etc.',
  RegExp(r'TextAlign\.(left|right)\b'): 'use TextAlign.start/end',
  RegExp(r'\bPositioned\([^)]*\b(left|right):'): 'use PositionedDirectional(start:/end:)',
  RegExp(r'\bBorder\(\s*(left|right):'): 'use BorderDirectional(start:/end:)',
  RegExp(r'BorderRadius\.only\([^)]*\b(topLeft|topRight|bottomLeft|bottomRight):'):
      'use BorderRadiusDirectional.only(topStart:...)',
};

// A string literal containing a letter, passed straight to a widget that shows it.
final _literalText = RegExp(
  r'''(\bText\(\s*|\b(title|label|tooltip|semanticsLabel|hintText|labelText|helperText|actionLabel|message):\s*)(const\s+)?['"][^'"]*[A-Za-z؀-ۿ]''',
);

// Material's own bars, which only the shared header may build.
final _rawAppBar = RegExp(r'\b(AppBar|SliverAppBar)(\.(large|medium))?\(');
const _headerFile = 'lib/design_system/components/navigation/app_header.dart';

const _optOut = '// convention-ok:';

bool _isGenerated(String path) =>
    path.endsWith('.g.dart') || path.endsWith('.freezed.dart') || path.contains('app_localizations');

void main() {
  final problems = <String>[];
  final files = Directory('lib')
      .listSync(recursive: true)
      .whereType<File>()
      .where((file) => file.path.endsWith('.dart') && !_isGenerated(file.path));

  for (final file in files) {
    final path = file.path.replaceAll(r'\', '/');
    final isPresentation =
        path.contains('/presentation/') || path.contains('/design_system/components/') || path.contains('/app/router/');
    final lines = file.readAsLinesSync();
    for (var i = 0; i < lines.length; i++) {
      final line = lines[i];
      if (line.trimLeft().startsWith('//')) continue;
      if (line.contains(_optOut)) {
        if (line.split(_optOut).last.trim().isEmpty) problems.add('$path:${i + 1}: convention-ok needs a reason');
        continue;
      }
      for (final MapEntry(key: pattern, value: fix) in _rtlRules.entries) {
        if (pattern.hasMatch(line)) problems.add('$path:${i + 1}: not RTL-safe, $fix');
      }
      if (_rawAppBar.hasMatch(line) && !path.endsWith(_headerFile)) {
        problems.add('$path:${i + 1}: use AppScrollView, AppPhotoSliverHeader or AppTopBar from app_header.dart');
      }
      // Interpolations (`${...}`, `$name`) are code, not text: only letters left once they
      // are removed count as hard-coded wording.
      final wording = line.replaceAll(RegExp(r'\$\{[^}]*\}'), '').replaceAll(RegExp(r'\$[A-Za-z_]\w*'), '');
      if (isPresentation && _literalText.hasMatch(wording)) {
        problems.add('$path:${i + 1}: hard-coded user-facing text, add it to lib/app/l10n/app_en.arb');
      }
    }
  }

  if (problems.isEmpty) {
    stdout.writeln('check_conventions: OK');
    return;
  }
  problems.forEach(stderr.writeln);
  stderr.writeln('check_conventions: ${problems.length} problem(s)');
  exitCode = 1;
}
