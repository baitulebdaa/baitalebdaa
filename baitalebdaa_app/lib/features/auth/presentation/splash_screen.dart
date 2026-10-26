import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../../../design_system/components/brand/brand_logo.dart';
import '../../../design_system/theme/context_extensions.dart';
import '../../../design_system/tokens/app_colors.dart';
import '../../../design_system/tokens/app_layout_tokens.dart';

/// The launch screen (owner's design, 26 Oct 2026): one of the studio's own living rooms,
/// darkened, with the wordmark, a brass rule, the promise and a spinner. It fades in over
/// the native launch screen's ink and stays until the sign-in state is known and
/// [splashMinimum] has passed; the router then moves on to Home.
class SplashScreen extends StatelessWidget {
  const SplashScreen({super.key});

  /// A real project photo from the website (the design's render is not one of ours).
  static const photo = 'assets/images/luxury-living-room-chandelier-wall-panelling.webp';

  @override
  Widget build(BuildContext context) {
    const white = Color(0xFFFFFFFF);
    final size = MediaQuery.sizeOf(context);
    final pixels = MediaQuery.devicePixelRatioOf(context);
    return AnnotatedRegion<SystemUiOverlayStyle>(
      value: SystemUiOverlayStyle.light,
      child: ColoredBox(
        color: AppColors.splashBackground,
        child: Stack(
          fit: StackFit.expand,
          children: [
            Image.asset(
              photo,
              fit: BoxFit.cover,
              cacheWidth: (size.width * pixels).round(),
              excludeFromSemantics: true,
              frameBuilder: (context, child, frame, wasSynchronouslyLoaded) => AnimatedOpacity(
                opacity: wasSynchronouslyLoaded || frame != null ? 1 : 0,
                duration: AppMotion.of(context).standard,
                child: child,
              ),
              errorBuilder: (context, error, stack) => const SizedBox.shrink(),
            ),
            // Darker at the top and bottom, so the words and spinner read on any photo.
            DecoratedBox(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [
                    AppColors.splashBackground.withValues(alpha: 0.72),
                    AppColors.splashBackground.withValues(alpha: 0.5),
                    AppColors.splashBackground.withValues(alpha: 0.3),
                    AppColors.splashBackground.withValues(alpha: 0.6),
                  ],
                  stops: const [0, 0.45, 0.7, 1],
                ),
              ),
            ),
            SafeArea(
              child: Padding(
                padding: const EdgeInsetsDirectional.symmetric(horizontal: AppSpacing.xxl),
                child: Column(
                  children: [
                    const Spacer(flex: 5),
                    const BrandLockup(width: 230, onDark: true, centered: true),
                    const SizedBox(height: AppSpacing.xxl),
                    const SizedBox(width: 44, height: 1.5, child: ColoredBox(color: AppColors.splashAccent)),
                    const SizedBox(height: AppSpacing.xxl),
                    Text(
                      context.l10n.splashTagline,
                      textAlign: TextAlign.center,
                      style: context.textStyles.headline.copyWith(color: white, fontSize: 28, height: 1.25),
                    ),
                    const Spacer(flex: 7),
                    SizedBox.square(
                      dimension: 34,
                      child: CircularProgressIndicator(
                        strokeWidth: 2.5,
                        color: AppColors.splashAccent,
                        backgroundColor: white.withValues(alpha: 0.18),
                      ),
                    ),
                    const SizedBox(height: AppSpacing.section),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

/// How long the launch screen shows at least, so its photo is seen rather than flashed.
const splashMinimum = Duration(milliseconds: 1400);
