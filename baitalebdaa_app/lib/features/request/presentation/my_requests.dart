import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../app/router/routes.dart';
import '../../../core/platform/analytics.dart';
import '../../../design_system/components/buttons/app_buttons.dart';
import '../../../design_system/components/feedback/state_views.dart';
import '../../../design_system/components/media/bundled_photo.dart';
import '../../../design_system/components/navigation/app_header.dart';
import '../../../design_system/theme/context_extensions.dart';
import '../../../design_system/tokens/app_icons.dart';
import '../../../design_system/tokens/app_layout_tokens.dart';
import '../../content/domain/content_models.dart';
import '../../content/presentation/content_builder.dart';
import '../../support/data/contact_launcher.dart';
import '../../support/presentation/contact_actions.dart';
import '../data/request_repository.dart';
import '../domain/consultation_request.dart';
import '../domain/request_draft.dart';
import 'request_flow_screen.dart';
import 'request_labels.dart';

/// My Requests, opened from Profile: every sent request with its live status.
class MyRequestsScreen extends StatelessWidget {
  const MyRequestsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final gutter = AppSpacing.gutter(AppWindowSize.of(context));
    return Scaffold(
      body: AppScrollView(
        title: context.l10n.profileMyRequests,
        slivers: [
          SliverPadding(
            padding: EdgeInsetsDirectional.fromSTEB(gutter, 0, gutter, AppSpacing.section),
            sliver: const SliverToBoxAdapter(child: MyRequestsSection()),
          ),
        ],
      ),
    );
  }
}

/// The list of sent requests, with their live status.
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

/// One sent request (owner's design, 26 Oct 2026): its reference, status and what was
/// asked for, where it is on its way, the consultation the customer asked for, how to send
/// photos and how to reach the team. Read-only: staff move the status.
class RequestDetailScreen extends ConsumerWidget {
  const RequestDetailScreen({required this.requestId, super.key});

  final String requestId;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final requests = ref.watch(myRequestsProvider);
    final request = requests.value?.where((r) => r.id == requestId).firstOrNull;
    final gutter = AppSpacing.gutter(AppWindowSize.of(context));
    final l10n = context.l10n;
    return Scaffold(
      body: SafeArea(
        bottom: false,
        child: switch (requests) {
          AsyncError(:final error) => ErrorState(error: error, onRetry: () => ref.invalidate(myRequestsProvider)),
          _ when request == null && requests.isLoading => const Center(child: CircularProgressIndicator()),
          _ when request == null => EmptyState(title: l10n.notFoundTitle),
          _ => ContentBuilder(
            builder: (context, content) => ListView(
              padding: EdgeInsetsDirectional.fromSTEB(gutter, AppSpacing.xs, gutter, AppSpacing.section),
              children: [
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    if (AppBackButton.shownIn(context)) ...[
                      const Padding(
                        padding: EdgeInsetsDirectional.only(top: AppSpacing.xxs),
                        child: AppBackButton(),
                      ),
                      const SizedBox(width: AppSpacing.xs),
                    ],
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Semantics(header: true, child: Text(l10n.myRequestTitle, style: context.textStyles.display)),
                          Text(
                            l10n.myRequestSubtitle,
                            style: context.textStyles.bodySmall.copyWith(color: context.colors.textSecondary),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: AppSpacing.xl),
                _RequestCard(request: request, content: content),
                const SizedBox(height: AppSpacing.xl),
                StatusTracker(status: request.status, submittedAt: request.createdAt),
                const SizedBox(height: AppSpacing.xl),
                _ConsultationCard(draft: request.details),
                const SizedBox(height: AppSpacing.md),
                _IconCard(
                  icon: AppIcons.photos,
                  title: l10n.myRequestPhotos,
                  body: l10n.myRequestPhotosBody,
                  child: SecondaryButton(
                    label: l10n.receivedPhotos,
                    onPressed: () => openWhatsApp(
                      context,
                      ref,
                      content.business,
                      screen: AppRoutes.profile,
                      message: l10n.receivedPhotosMessage(request.reference),
                    ),
                  ),
                ),
                const SizedBox(height: AppSpacing.md),
                _IconCard(
                  icon: AppIcons.support,
                  title: l10n.detailNeedHelp,
                  body: l10n.myRequestHelpBody,
                  child: Row(
                    children: [
                      Expanded(
                        child: FilledButton.icon(
                          icon: const Icon(AppIcons.phone, size: AppIcons.sizeSmall),
                          label: Text(l10n.contactCall),
                          style: FilledButton.styleFrom(shape: const StadiumBorder(), minimumSize: const Size(0, 52)),
                          onPressed: () =>
                              ref.read(contactLauncherProvider).call(content.business, screen: AppRoutes.profile),
                        ),
                      ),
                      const SizedBox(width: AppSpacing.sm),
                      Expanded(
                        child: OutlinedButton.icon(
                          icon: const Icon(AppIcons.whatsapp, size: AppIcons.sizeSmall),
                          label: Text(l10n.contactWhatsApp),
                          style: OutlinedButton.styleFrom(shape: const StadiumBorder(), minimumSize: const Size(0, 52)),
                          onPressed: () => openWhatsApp(context, ref, content.business, screen: AppRoutes.profile),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        },
      ),
    );
  }
}

/// The request at a glance: its reference (copyable), status, services, place and note,
/// with the first service's photo fading in at the end.
class _RequestCard extends StatelessWidget {
  const _RequestCard({required this.request, required this.content});

  final ConsultationRequest request;
  final ContentSnapshot content;

  @override
  Widget build(BuildContext context) {
    final l10n = context.l10n;
    final colors = context.colors;
    final styles = context.textStyles;
    final draft = request.details;
    final photo = [for (final id in draft.serviceIds) ?content.service(id)].firstOrNull?.image;
    final place = [
      context.emirateLabel(draft.emirateId, content),
      if (draft.area.trim().isNotEmpty) draft.area.trim(),
    ].join(context.isArabic ? '، ' : ', ');
    final note = draft.note.trim();
    final surface = colors.surfaceSecondary;
    return ClipRRect(
      borderRadius: BorderRadius.circular(18),
      child: ColoredBox(
        color: surface,
        child: Stack(
          children: [
            if (photo != null)
              PositionedDirectional(
                top: 0,
                bottom: 0,
                end: 0,
                width: MediaQuery.sizeOf(context).width * 0.42,
                child: Stack(
                  fit: StackFit.expand,
                  children: [
                    BundledPhoto(image: photo, aspectRatio: 1, semanticLabel: ''),
                    DecoratedBox(
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          begin: AlignmentDirectional.centerStart,
                          end: AlignmentDirectional.centerEnd,
                          colors: [surface, surface.withValues(alpha: 0.3), surface.withValues(alpha: 0)],
                          stops: const [0, 0.4, 1],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            Padding(
              padding: const EdgeInsetsDirectional.all(AppSpacing.lg),
              child: FractionallySizedBox(
                widthFactor: photo == null ? 1 : 0.66,
                alignment: AlignmentDirectional.centerStart,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(l10n.myRequestId, style: styles.caption.copyWith(color: colors.textSecondary)),
                    Row(
                      children: [
                        Flexible(child: Text('#${request.reference}', style: styles.title)),
                        IconButton(
                          icon: const Icon(AppIcons.copy, size: AppIcons.sizeSmall),
                          tooltip: l10n.myRequestCopy,
                          onPressed: () async {
                            final messenger = ScaffoldMessenger.of(context);
                            await Clipboard.setData(ClipboardData(text: request.reference));
                            messenger.showSnackBar(SnackBar(content: Text(l10n.myRequestCopied)));
                          },
                        ),
                      ],
                    ),
                    const SizedBox(height: AppSpacing.xs),
                    StatusPill(status: request.status),
                    const SizedBox(height: AppSpacing.md),
                    Text(context.servicesLabel(draft.serviceIds, content), style: styles.headline),
                    const SizedBox(height: AppSpacing.xs),
                    Row(
                      children: [
                        Icon(AppIcons.location, size: AppIcons.sizeSmall, color: colors.textSecondary),
                        const SizedBox(width: AppSpacing.xs),
                        Expanded(child: Text(place, style: styles.bodySmall)),
                      ],
                    ),
                    if (note.isNotEmpty) ...[
                      const SizedBox(height: AppSpacing.sm),
                      Text(
                        note,
                        style: styles.bodySmall.copyWith(color: colors.textSecondary),
                        maxLines: 3,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ],
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

/// The status in a soft pill with a clock, coloured by state; the words carry the meaning.
class StatusPill extends StatelessWidget {
  const StatusPill({required this.status, super.key});

  final RequestStatus status;

  @override
  Widget build(BuildContext context) {
    final colors = context.colors;
    return DecoratedBox(
      decoration: ShapeDecoration(color: colors.surfaceWarm, shape: const StadiumBorder()),
      child: Padding(
        padding: const EdgeInsetsDirectional.symmetric(horizontal: AppSpacing.md, vertical: AppSpacing.xs),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(AppIcons.time, size: 16, color: colors.textPrimary),
            const SizedBox(width: AppSpacing.xs),
            Flexible(child: StatusBadge(status: status)),
          ],
        ),
      ),
    );
  }
}

/// Where the request is: received, in review, contacted, scheduled, completed. Only the
/// send date is known, so it is the only date shown. A request waiting on the customer or
/// on a new time, or cancelled, is named under the tracker.
class StatusTracker extends StatelessWidget {
  const StatusTracker({required this.status, required this.submittedAt, super.key});

  final RequestStatus status;
  final DateTime? submittedAt;

  static const _path = [
    RequestStatus.submitted,
    RequestStatus.inReview,
    RequestStatus.contacted,
    RequestStatus.scheduled,
    RequestStatus.completed,
  ];

  static const _icons = [AppIcons.selected, AppIcons.time, AppIcons.phone, AppIcons.calendar, AppIcons.selected];

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
    final styles = context.textStyles;
    final reached = _reached(status);
    final offPath = !_path.contains(status);
    final submittedAt = this.submittedAt;
    const dot = 44.0;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            for (final (i, step) in _path.indexed)
              Expanded(
                child: Semantics(
                  label: context.statusLabel(step),
                  checked: i <= reached,
                  excludeSemantics: true,
                  child: Column(
                    children: [
                      Row(
                        children: [
                          Expanded(
                            child: i == 0
                                ? const SizedBox.shrink()
                                : Divider(color: i <= reached ? colors.brandPrimary : colors.borderControl),
                          ),
                          DecoratedBox(
                            decoration: ShapeDecoration(
                              color: i <= reached ? colors.brandPrimary : colors.surfacePrimary,
                              shape: CircleBorder(
                                side: BorderSide(
                                  color: i == reached
                                      ? colors.brandAccent
                                      : (i < reached ? colors.brandPrimary : colors.borderControl),
                                  width: i == reached ? 3 : 1,
                                ),
                              ),
                            ),
                            child: SizedBox.square(
                              dimension: dot,
                              child: Icon(
                                i < reached ? AppIcons.selected : _icons[i],
                                size: 20,
                                color: i <= reached ? colors.onBrandPrimary : colors.textPrimary,
                              ),
                            ),
                          ),
                          Expanded(
                            child: i == _path.length - 1
                                ? const SizedBox.shrink()
                                : Divider(color: i < reached ? colors.brandPrimary : colors.borderControl),
                          ),
                        ],
                      ),
                      const SizedBox(height: AppSpacing.xs),
                      Text(
                        context.statusLabel(step),
                        style: styles.caption.copyWith(
                          color: colors.textPrimary,
                          fontWeight: i == reached ? FontWeight.w600 : FontWeight.w400,
                        ),
                        textAlign: TextAlign.center,
                      ),
                      Text(
                        i == 0 && submittedAt != null ? context.shortDate(submittedAt) : '—',
                        style: styles.caption.copyWith(color: colors.textSecondary),
                        textAlign: TextAlign.center,
                      ),
                    ],
                  ),
                ),
              ),
          ],
        ),
        if (offPath) ...[const SizedBox(height: AppSpacing.sm), StatusPill(status: status)],
      ],
    );
  }
}

/// The consultation the customer asked for: their preferred day and time, and the way.
class _ConsultationCard extends StatelessWidget {
  const _ConsultationCard({required this.draft});

  final RequestDraft draft;

  @override
  Widget build(BuildContext context) {
    final l10n = context.l10n;
    final colors = context.colors;
    final styles = context.textStyles;
    final date = DateTime.tryParse(draft.preferredDate ?? '');
    final window = draft.preferredWindow;
    final type = draft.consultationType;
    String dateText() =>
        draft.timeFlexible ? l10n.stepTimeFlexible : (date == null ? l10n.reviewNotGiven : context.shortDate(date));
    String timeText() => draft.timeFlexible
        ? l10n.stepTimeFlexible
        : (window == null ? l10n.reviewNotGiven : context.windowLabel(window));
    return _IconCard(
      icon: AppIcons.calendar,
      title: l10n.myRequestConsultation,
      child: DecoratedBox(
        decoration: BoxDecoration(color: colors.surfaceWarm, borderRadius: BorderRadius.circular(14)),
        child: Padding(
          padding: const EdgeInsetsDirectional.all(AppSpacing.md),
          child: IntrinsicHeight(
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Expanded(
                  child: MergeSemantics(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(l10n.myRequestPreferredDate, style: styles.caption.copyWith(color: colors.textSecondary)),
                        Text(dateText(), style: styles.label),
                      ],
                    ),
                  ),
                ),
                VerticalDivider(color: colors.borderControl, width: AppSpacing.xl),
                Expanded(
                  child: MergeSemantics(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(l10n.myRequestPreferredTime, style: styles.caption.copyWith(color: colors.textSecondary)),
                        Text(timeText(), style: styles.label),
                        if (type != null)
                          Text(
                            context.consultationLabel(type).$1,
                            style: styles.caption.copyWith(color: colors.textSecondary),
                          ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

/// A white card with an icon in a soft circle beside a serif title, then its content.
class _IconCard extends StatelessWidget {
  const _IconCard({required this.icon, required this.title, required this.child, this.body});

  final IconData icon;
  final String title;
  final String? body;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    final colors = context.colors;
    final body = this.body;
    return DecoratedBox(
      decoration: BoxDecoration(color: colors.surfaceSecondary, borderRadius: BorderRadius.circular(18)),
      child: Padding(
        padding: const EdgeInsetsDirectional.all(AppSpacing.md),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            DecoratedBox(
              decoration: BoxDecoration(color: colors.surfaceWarm, shape: BoxShape.circle),
              child: SizedBox.square(dimension: 48, child: Icon(icon, color: colors.textPrimary)),
            ),
            const SizedBox(width: AppSpacing.md),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Semantics(
                    header: true,
                    child: Text(title, style: context.textStyles.headline.copyWith(fontSize: 24)),
                  ),
                  if (body != null)
                    Text(body, style: context.textStyles.bodySmall.copyWith(color: colors.textSecondary)),
                  const SizedBox(height: AppSpacing.md),
                  child,
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
