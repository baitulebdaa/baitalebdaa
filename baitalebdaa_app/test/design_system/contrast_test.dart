import 'dart:math';

import 'package:baitalebdaa_app/design_system/tokens/app_colors.dart';
import 'package:flutter/painting.dart';
import 'package:flutter_test/flutter_test.dart';

/// WCAG 2.1 contrast ratio between two opaque colours.
double contrast(Color a, Color b) {
  double channel(double c) => c <= 0.03928 ? c / 12.92 : pow((c + 0.055) / 1.055, 2.4).toDouble();
  double luminance(Color c) => 0.2126 * channel(c.r) + 0.7152 * channel(c.g) + 0.0722 * channel(c.b);
  final la = luminance(a);
  final lb = luminance(b);
  return (max(la, lb) + 0.05) / (min(la, lb) + 0.05);
}

const _textAA = 4.5;
const _nonTextAA = 3.0;

void main() {
  for (final (name, c) in [('light', AppColors.light), ('dark', AppColors.dark)]) {
    group('$name palette', () {
      final surfaces = {'surfacePrimary': c.surfacePrimary, 'surfaceSecondary': c.surfaceSecondary};
      final texts = {
        'textPrimary': c.textPrimary,
        'textSecondary': c.textSecondary,
        'textTertiary': c.textTertiary,
        'brandAccentStrong': c.brandAccentStrong,
        'success': c.success,
        'warning': c.warning,
        'error': c.error,
      };

      for (final MapEntry(key: surfaceName, value: surface) in surfaces.entries) {
        for (final MapEntry(key: textName, value: text) in texts.entries) {
          test('$textName on $surfaceName meets AA for text', () {
            expect(contrast(text, surface), greaterThanOrEqualTo(_textAA));
          });
        }
        test('borderControl on $surfaceName meets AA for non-text', () {
          expect(contrast(c.borderControl, surface), greaterThanOrEqualTo(_nonTextAA));
        });
      }

      test('text on inverse and on the primary button meets AA', () {
        expect(contrast(c.textOnInverse, c.surfaceInverse), greaterThanOrEqualTo(_textAA));
        expect(contrast(c.onBrandPrimary, c.brandPrimary), greaterThanOrEqualTo(_textAA));
      });

      test('the WhatsApp icon colour meets AA on WhatsApp green', () {
        expect(contrast(c.onWhatsapp, c.whatsapp), greaterThanOrEqualTo(_nonTextAA));
      });
    });
  }

  test('sand stays off light surfaces: it fails there, which is why it is dark-only', () {
    expect(contrast(AppColors.light.brandAccent, AppColors.light.surfacePrimary), lessThan(_nonTextAA));
    expect(contrast(AppColors.light.brandAccent, AppColors.light.surfaceInverse), greaterThanOrEqualTo(_textAA));
  });
}
