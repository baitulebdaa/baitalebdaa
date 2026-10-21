import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../app/router/routes.dart';
import '../../../core/platform/analytics.dart';
import '../../../design_system/components/buttons/app_buttons.dart';
import '../../../design_system/components/feedback/state_views.dart';
import '../../../design_system/components/navigation/app_header.dart';
import '../../../design_system/theme/context_extensions.dart';
import '../../../design_system/tokens/app_icons.dart';
import '../../../design_system/tokens/app_layout_tokens.dart';
import '../../content/domain/content_models.dart';
import '../../content/presentation/content_builder.dart';
import '../../support/presentation/contact_actions.dart';
import '../data/request_repository.dart';
import '../domain/consultation_request.dart';
import 'request_flow_screen.dart';
import 'request_labels.dart';
import 'request_summary.dart';

/// The Profile tab's list of sent requests, with their live status.
class MyRequestsSection extends ConsumerWidget {
  const MyRequestsSection({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = context.l10n;
    final requests = ref.watch(myRequestsProvider).value ?? const <ConsultationRequest>[];
    return ContentBuilder(
      builder: (context, content) => Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Semantics(
            header: true,
            child: Text(
              requests.isEmpty ? l10n.accountEmptyTitle : l10n.myRequestsTitle,
              style: context.textStyles.title,
            ),
          ),
          const SizedBox(height: AppSpacing.xs),
          if (requests.isEmpty)
            Text(
              l10n.accountEmptyBody,
              style: context.textStyles.bodySmall.copyWith(color: context.colors.textSecondary),
            )
          else
            for (final (label, group) in [
              (l10n.myRequestsActive, requests.where((r) => !r.status.isFinal).toList()),
              (l10n.myRequestsPast, requests.where((r) => r.status.isFinal).toList()),
            ])
              if (group.isNotEmpty) ...[
                const SizedBox(height: AppSpacing.sm),
                Text(label, style: context.textStyles.label.copyWith(color: context.colors.textSecondary)),
                for (final request in group) _RequestRow(request: request, content: content),
              ],
          const SizedBox(height: AppSpacing.md),
          SecondaryButton(
            label: requests.isEmpty ? l10n.requestPlanCta : l10n.myRequestsNew,
            onPressed: () => openRequestFlow(context, ref, entry: RequestEntry.profile),
          ),
        ],
      ),
    );
  }
}

class _RequestRow extends StatelessWidget {
  const _RequestRow({required this.request, required this.content});

  final ConsultationRequest request;
  final ContentSnapshot content;

  @override
  Widget build(BuildContext context) {
    final created = request.createdAt;
    return InkWell(
      onTap: () => context.go(AppRoutes.requestDetail(request.id)),
      child: DecoratedBox(
        decoration: BoxDecoration(
          border: BorderDirectional(bottom: BorderSide(color: context.colors.borderSubtle)),
        ),
        child: Padding(
          padding: const EdgeInsetsDirectional.symmetric(vertical: AppSpacing.sm),
          child: Row(
            children: [
              Expanded(
                child: MergeSemantics(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      StatusBadge(status: request.status),
                      const SizedBox(height: AppSpacing.xxs),
                      Text(
                        context.servicesLabel(request.details.serviceIds, content),
                        style: context.textStyles.subtitle,
                      ),
                      Text(
                        [
                          request.reference,
                          if (created != null) context.l10n.requestSentOn(context.shortDate(created)),
                        ].join(' · '),
                        style: context.textStyles.caption.copyWith(color: context.colors.textSecondary),
                      ),
                    ],
                  ),
                ),
              ),
              const Icon(AppIcons.forward),
            ],
          ),
        ),
      ),
    );
  }
}

/// A request's status in words with a matching colour. Colour is never the only signal.
class StatusBadge extends StatelessWidget {
  const StatusBadge({required this.status, super.key});

  final RequestStatus status;

  @override
  Widget build(BuildContext context) {
    final colors = context.colors;
    final color = switch (status) {
      RequestStatus.scheduled || RequestStatus.completed => colors.success,
      RequestStatus.actionRequired || RequestStatus.rescheduleRequested => colors.warning,
      RequestStatus.cancelled => colors.textTertiary,
      _ => colors.brandAccentStrong,
    };
    return Text(
      context.statusLabel(status),
      style: context.textStyles.caption.copyWith(color: color, fontWeight: FontWeight.w600),
    );
  }
}

/// One sent request: its status and everything that was sent, read-only.
class RequestDetailScreen extends ConsumerWidget {
  const RequestDetailScreen({required this.requestId, super.key});

  final String requestId;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final requests = ref.watch(myRequestsProvider);
    final request = requests.value?.where((r) => r.id == requestId).firstOrNull;
    final gutter = AppSpacing.gutter(AppWindowSize.of(context));
    return Scaffold(
      appBar: AppTopBar(title: request == null ? null : context.l10n.requestDetailTitle(request.reference)),
      body: switch (requests) {
        AsyncError(:final error) => ErrorState(error: error, onRetry: () => ref.invalidate(myRequestsProvider)),
        _ when request == null && requests.isLoading => const Center(child: CircularProgressIndicator()),
        _ when request == null => EmptyState(title: context.l10n.notFoundTitle),
        _ => ContentBuilder(
          builder: (context, content) => ListView(
            padding: EdgeInsetsDirectional.fromSTEB(gutter, AppSpacing.md, gutter, AppSpacing.section),
            children: [
              StatusBadge(status: request.status),
              if (request.createdAt case final created?)
                Text(
                  context.l10n.requestSentOn(context.shortDate(created)),
                  style: context.textStyles.caption.copyWith(color: context.colors.textSecondary),
                ),
              const SizedBox(height: AppSpacing.xl),
              Text(context.l10n.timelineTitle, style: context.textStyles.title),
              const SizedBox(height: AppSpacing.md),
              RequestTimeline(status: request.status),
              const SizedBox(height: AppSpacing.xl),
              RequestSummary(draft: request.details, content: content),
              const SizedBox(height: AppSpacing.xxl),
              Text(context.l10n.detailNeedHelp, style: context.textStyles.subtitle),
              const SizedBox(height: AppSpacing.sm),
              ContactRow(business: content.business, screen: AppRoutes.profile),
            ],
          ),
        ),
      },
    );
  }
}

/// The request's journey so far. Only staff move it past "received"; "appointment confirmed"
/// is reached only when they set a time. A request waiting on the customer or on a new time,
/// or cancelled, is shown on its own line under the step it reached.
class RequestTimeline extends StatelessWidget {
  const RequestTimeline({required this.status, super.key});

  final RequestStatus status;

  static const _path = [
    RequestStatus.submitted,
    RequestStatus.inReview,
    RequestStatus.contacted,
    RequestStatus.scheduled,
    RequestStatus.completed,
  ];

  /// Where each off-path status sits on the path.
  static int _reached(RequestStatus status) => switch (status) {
    RequestStatus.actionRequired => 1,
    RequestStatus.rescheduleRequested => 3,
    RequestStatus.cancelled => -1,
    _ => _path.indexOf(status),
  };

  @override
  Widget build(BuildContext context) {
    final colors = context.colors;
    final reached = _reached(status);
    final offPath = !_path.contains(status);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        for (final (index, step) in _path.indexed)
          Semantics(
            label: context.statusLabel(step),
            checked: index <= reached,
            excludeSemantics: true,
            child: Padding(
              padding: const EdgeInsetsDirectional.only(bottom: AppSpacing.sm),
              child: Row(
                children: [
                  Icon(
                    index <= reached ? AppIcons.selected : AppIcons.time,
                    size: AppIcons.sizeSmall,
                    color: index <= reached ? colors.success : colors.textTertiary,
                  ),
                  const SizedBox(width: AppSpacing.sm),
                  Expanded(
                    child: Text(
                      context.statusLabel(step),
                      style: context.textStyles.bodySmall.copyWith(
                        color: index <= reached ? colors.textPrimary : colors.textTertiary,
                        fontWeight: index == reached && !offPath ? FontWeight.w600 : null,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        if (offPath) StatusBadge(status: status),
      ],
    );
  }
}
