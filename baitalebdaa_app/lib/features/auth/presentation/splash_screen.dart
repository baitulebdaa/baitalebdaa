import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../../../design_system/components/brand/brand_logo.dart';
import '../../../design_system/tokens/app_colors.dart';

/// The first Flutter frame. It looks exactly like the native launch screen (ink background,
/// white wordmark), and stays only until the sign-in state is known; the router then moves
/// on. There is no artificial delay.
class SplashScreen extends StatelessWidget {
  const SplashScreen({super.key});

  @override
  Widget build(BuildContext context) => const AnnotatedRegion<SystemUiOverlayStyle>(
    value: SystemUiOverlayStyle.light,
    child: ColoredBox(
      color: AppColors.splashBackground,
      child: Center(child: BrandLogo(width: BrandLogo.splashWidth, onDark: true)),
    ),
  );
}
