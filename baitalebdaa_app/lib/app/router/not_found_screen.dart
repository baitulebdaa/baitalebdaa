import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../design_system/components/feedback/state_views.dart';
import '../../design_system/theme/context_extensions.dart';
import 'routes.dart';

/// Shown for any link the app does not recognise, such as an outdated deep link.
class NotFoundScreen extends StatelessWidget {
  const NotFoundScreen({super.key});

  @override
  Widget build(BuildContext context) => Scaffold(
    body: SafeArea(
      child: EmptyState(
        title: context.l10n.notFoundTitle,
        body: context.l10n.notFoundBody,
        actionLabel: context.l10n.actionGoHome,
        onAction: () => context.go(AppRoutes.home),
      ),
    ),
  );
}
