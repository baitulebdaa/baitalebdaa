import 'package:flutter/widgets.dart';

/// Spacing scale on a 4-point base. Layout code uses these names, never raw numbers.
abstract final class AppSpacing {
  static const double xxs = 4;
  static const double xs = 8;
  static const double sm = 12;
  static const double md = 16;
  static const double lg = 20;
  static const double xl = 24;
  static const double xxl = 32;
  static const double xxxl = 40;
  static const double section = 56;
  static const double hero = 72;

  /// Screen side gutter per window size; the website uses 20 at phone width.
  static double gutter(AppWindowSize size) => switch (size) {
    AppWindowSize.compact => lg,
    AppWindowSize.medium => xl,
    AppWindowSize.expanded => xxl,
  };

  /// Longest comfortable line of reading text on tablets.
  static const double readingWidth = 640;
}

abstract final class AppRadius {
  static const double sm = 4;
  static const double md = 8;
  static const double lg = 14;

  /// The website's outline button corner (`border-radius: 15px 0`): rounded at the start
  /// of the top edge and the end of the bottom edge, mirrored in Arabic. Primary actions only.
  static const signature = BorderRadiusDirectional.only(topStart: Radius.circular(15), bottomEnd: Radius.circular(15));
}

/// One shadow in the whole app, for bottom sheets and sticky action bars. Everything else
/// is layered with hairlines and photography.
abstract final class AppElevation {
  static List<BoxShadow> sheet(Color ink) => [
    BoxShadow(color: ink.withValues(alpha: 0.08), offset: const Offset(0, 8), blurRadius: 24),
  ];
}

/// Motion tokens. [AppMotion.of] returns zero durations when the platform asks for reduced
/// motion, so every animation built on these respects it automatically.
@immutable
class AppMotion {
  const AppMotion._(this.quick, this.standard, this.emphasis);

  static const _full = AppMotion._(
    Duration(milliseconds: 120),
    Duration(milliseconds: 240),
    Duration(milliseconds: 400),
  );
  static const _reduced = AppMotion._(Duration.zero, Duration.zero, Duration.zero);

  static AppMotion of(BuildContext context) => MediaQuery.disableAnimationsOf(context) ? _reduced : _full;

  /// Presses, selection ticks.
  final Duration quick;

  /// Step and page changes, image fade-in, progress fill.
  final Duration standard;

  /// The success mark and the Home hero reveal. Nothing in the app runs longer.
  final Duration emphasis;

  static const Curve curve = Curves.easeOutCubic;

  /// The website's reveal curve, `cubic-bezier(.2,.7,.2,1)`.
  static const Curve reveal = Cubic(0.2, 0.7, 0.2, 1);
}

enum AppWindowSize {
  /// Phones: one column, bottom tab bar.
  compact,

  /// Large phones and unfolded foldables: two-column grids.
  medium,

  /// Tablets: navigation rail, list and detail side by side.
  expanded;

  static AppWindowSize fromWidth(double width) => width >= 840
      ? expanded
      : width >= 600
      ? medium
      : compact;

  static AppWindowSize of(BuildContext context) => fromWidth(MediaQuery.sizeOf(context).width);
}

/// Minimum touch target for anything tappable (above Apple's 44 pt).
const double kMinTouchTarget = 48;
