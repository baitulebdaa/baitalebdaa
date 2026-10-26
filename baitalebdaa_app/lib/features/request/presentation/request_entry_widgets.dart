import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../app/router/routes.dart';
import '../../../core/platform/analytics.dart';
import '../../../design_system/theme/context_extensions.dart';
import '../../../design_system/tokens/app_icons.dart';
import '../../../design_system/tokens/app_layout_tokens.dart';
import '../../content/domain/content_models.dart';
import '../data/request_repository.dart';
import '../domain/request_options.dart';
import '../domain/request_validation.dart';
import 'my_requests.dart';
import 'request_controllers.dart';
import 'request_flow_screen.dart';
import 'request_labels.dart';

/// "Continue your request · step n of 10", shown while an unfinished request exists.
class ResumeDraftCard extends ConsumerWidget {
  const ResumeDraftCard({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final draft = ref.watch(draftProvider);
    if (draft == null) return const SizedBox.shrink();
    // Counted in screens, as the request's step tracker shows them.
    final total = RequestPage.values.length;
    final step = RequestPage.of(RequestStep.values[draft.stepIndex.clamp(0, RequestStep.values.length - 1)]).index + 1;
    return _OutlinedCard(
      onTap: () => openRequestFlow(context, ref, entry: RequestEntry.resume),
      child: Row(
        children: [
          Icon(AppIcons.book, color: context.colors.brandPrimary),
          const SizedBox(width: AppSpacing.sm),
          Expanded(child: Text(context.l10n.requestContinueDraft(step, total), style: context.textStyles.subtitle)),
          const Icon(AppIcons.forward),
        ],
      ),
    );
  }
}

/// The customer's most recent request and its live status, for returning customers.
class LatestRequestCard extends ConsumerWidget {
  const LatestRequestCard({required this.content, super.key});

  final ContentSnapshot content;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final latest = ref.watch(myRequestsProvider).value?.firstOrNull;
    if (latest == null) return const SizedBox.shrink();
    return _OutlinedCard(
      onTap: () => context.go(AppRoutes.requestDetail(latest.id)),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  context.l10n.homeLatestRequest,
                  style: context.textStyles.caption.copyWith(color: context.colors.textSecondary),
                ),
                const SizedBox(height: AppSpacing.xxs),
                StatusBadge(status: latest.status),
                Text(
                  context.servicesLabel(latest.details.serviceIds, content),
                  style: context.textStyles.subtitle,
                  maxLines: 2,
                ),
                Text(latest.reference, style: context.textStyles.caption.copyWith(color: context.colors.textSecondary)),
              ],
            ),
          ),
          const Icon(AppIcons.forward),
        ],
      ),
    );
  }
}

/// "What are you planning?": six quick starts that prefill the request.
class PlanningChoices extends ConsumerWidget {
  const PlanningChoices({required this.entry, super.key});

  final RequestEntry entry;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = context.l10n;
    final choices = [
      (icon: AppIcons.villa, label: l10n.planningVilla, property: PropertyType.villa, service: null),
      (icon: AppIcons.apartment, label: l10n.planningApartment, property: PropertyType.apartment, service: null),
      (icon: AppIcons.office, label: l10n.planningOffice, property: PropertyType.office, service: null),
      (icon: AppIcons.restaurant, label: l10n.planningRestaurant, property: PropertyType.restaurant, service: null),
      (icon: AppIcons.retail, label: l10n.planningRetail, property: PropertyType.retail, service: null),
      (icon: AppIcons.joinery, label: l10n.planningJoinery, property: null, service: 'joinery'),
    ];
    final columns = AppWindowSize.of(context) == AppWindowSize.compact ? 3 : 6;
    return LayoutBuilder(
      builder: (context, constraints) {
        final width = (constraints.maxWidth - AppSpacing.sm * (columns - 1)) / columns;
        return Wrap(
          spacing: AppSpacing.sm,
          runSpacing: AppSpacing.sm,
          children: [
            for (final choice in choices)
              SizedBox(
                width: width,
                child: _PlanningTile(
                  icon: choice.icon,
                  label: choice.label,
                  onTap: () => openRequestFlow(
                    context,
                    ref,
                    entry: entry,
                    propertyType: choice.property,
                    serviceIds: [?choice.service],
                  ),
                ),
              ),
          ],
        );
      },
    );
  }
}

class _PlanningTile extends StatelessWidget {
  const _PlanningTile({required this.icon, required this.label, required this.onTap});

  final IconData icon;
  final String label;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) => Semantics(
    button: true,
    child: Material(
      color: context.colors.surfaceSecondary,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(AppRadius.md),
        side: BorderSide(color: context.colors.borderSubtle),
      ),
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsetsDirectional.symmetric(horizontal: AppSpacing.xs, vertical: AppSpacing.md),
          child: Column(
            children: [
              Icon(icon, color: context.colors.textPrimary),
              const SizedBox(height: AppSpacing.xs),
              Text(label, style: context.textStyles.caption, textAlign: TextAlign.center, maxLines: 2),
            ],
          ),
        ),
      ),
    ),
  );
}

class _OutlinedCard extends StatelessWidget {
  const _OutlinedCard({required this.onTap, required this.child});

  final VoidCallback onTap;
  final Widget child;

  @override
  Widget build(BuildContext context) => Material(
    color: context.colors.surfaceSecondary,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(AppRadius.md),
      side: BorderSide(color: context.colors.borderControl),
    ),
    clipBehavior: Clip.antiAlias,
    child: InkWell(
      onTap: onTap,
      child: Padding(padding: const EdgeInsetsDirectional.all(AppSpacing.md), child: child),
    ),
  );
}
