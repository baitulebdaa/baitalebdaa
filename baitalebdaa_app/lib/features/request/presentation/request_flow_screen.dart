import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../app/router/routes.dart';
import '../../../core/platform/analytics.dart';
import '../../../design_system/components/feedback/state_views.dart';
import '../../../design_system/components/navigation/app_header.dart';
import '../../../design_system/theme/context_extensions.dart';
import '../../../design_system/tokens/app_icons.dart';
import '../../../design_system/tokens/app_layout_tokens.dart';
import '../../content/domain/content_models.dart';
import '../../content/presentation/content_builder.dart';
import '../domain/request_draft.dart';
import '../domain/request_options.dart';
import '../domain/request_validation.dart';
import 'request_controllers.dart';
import 'review_and_received.dart';
import 'steps/choice_steps.dart';
import 'steps/input_steps.dart';
import 'steps/step_parts.dart';

/// The consultation request (owner's design, 26 Oct 2026): a few screens of numbered
/// questions under a step tracker, then review, then "Request received". Full screen above
/// the tabs. Every answer is saved as it is given, so closing the app or this screen, or
/// "Save Draft", never loses anything.
class RequestFlowScreen extends ConsumerWidget {
  const RequestFlowScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) => ContentBuilder(
    builder: (context, content) {
      final draft = ref.watch(draftProvider);
      final flow = ref.watch(requestFlowProvider);

      if (flow.stage == FlowStage.received && flow.submitted != null) {
        return PopScope(
          canPop: false,
          onPopInvokedWithResult: (didPop, _) {
            if (!didPop) context.go(AppRoutes.home);
          },
          child: Scaffold(
            body: SafeArea(
              child: ReceivedView(request: flow.submitted!, content: content),
            ),
          ),
        );
      }
      if (draft == null) return const _NoDraft();

      final reviewing = flow.stage == FlowStage.review;
      final step = RequestStep.values[draft.stepIndex.clamp(0, RequestStep.values.length - 1)];
      final page = RequestPage.of(step);
      // Tracker positions: the question screens, then Review, then Complete.
      final position = reviewing ? RequestPage.values.length : page.index;
      Future<void> back() async {
        final moved = await ref.read(requestFlowProvider.notifier).back();
        if (!moved && context.mounted) await confirmLeave(context, ref);
      }

      return PopScope(
        canPop: false,
        onPopInvokedWithResult: (didPop, _) async {
          if (!didPop) await back();
        },
        child: Scaffold(
          appBar: AppTopBar(
            leading: AppBarButton(
              icon: AppIcons.back,
              tooltip: MaterialLocalizations.of(context).backButtonTooltip,
              onPressed: back,
            ),
            title: context.l10n.requestFlowTitle,
            bottom: _StepTracker(position: position),
          ),
          body: Column(
            children: [
              Expanded(
                child: AnimatedSwitcher(
                  duration: AppMotion.of(context).standard,
                  switchInCurve: AppMotion.curve,
                  child: KeyedSubtree(
                    key: ValueKey(reviewing ? 'review' : page.name),
                    child: reviewing
                        ? ReviewView(draft: draft, content: content, state: flow)
                        : _PageContent(page: page, draft: draft, content: content, showIssues: flow.showIssues),
                  ),
                ),
              ),
              if (!reviewing) _PageBar(returnToReview: flow.returnToReview),
            ],
          ),
        ),
      );
    },
  );
}

/// Where the customer is: done screens ticked, the current one filled green, the rest
/// numbered, with a line joining them.
class _StepTracker extends StatelessWidget implements PreferredSizeWidget {
  const _StepTracker({required this.position});

  /// Index into the question screens, then Review, then Complete.
  final int position;

  @override
  Size get preferredSize => const Size.fromHeight(84);

  @override
  Widget build(BuildContext context) {
    final l10n = context.l10n;
    final colors = context.colors;
    final styles = context.textStyles;
    final labels = [
      l10n.requestPageRequirements,
      l10n.requestPageDetails,
      l10n.requestPageConsultation,
      l10n.requestPageContact,
      l10n.requestPageReview,
      l10n.requestPageComplete,
    ];
    const dot = 26.0;
    return Semantics(
      label: l10n.requestProgress(position + 1, labels.length, labels[position]),
      excludeSemantics: true,
      child: Padding(
        padding: const EdgeInsetsDirectional.symmetric(horizontal: AppSpacing.sm),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            for (final (i, label) in labels.indexed)
              Expanded(
                child: Column(
                  children: [
                    Row(
                      children: [
                        Expanded(
                          child: i == 0
                              ? const SizedBox.shrink()
                              : Divider(
                                  thickness: 1.5,
                                  color: i <= position ? colors.brandPrimary : colors.borderSubtle,
                                ),
                        ),
                        DecoratedBox(
                          decoration: ShapeDecoration(
                            color: i <= position ? colors.brandPrimary : colors.surfacePrimary,
                            shape: CircleBorder(
                              side: BorderSide(color: i <= position ? colors.brandPrimary : colors.borderControl),
                            ),
                          ),
                          child: SizedBox.square(
                            dimension: dot,
                            child: Center(
                              child: i < position
                                  ? Icon(AppIcons.selected, size: 16, color: colors.onBrandPrimary)
                                  : Text(
                                      '${i + 1}',
                                      style: styles.caption.copyWith(
                                        color: i == position ? colors.onBrandPrimary : colors.textSecondary,
                                        fontWeight: FontWeight.w600,
                                      ),
                                    ),
                            ),
                          ),
                        ),
                        Expanded(
                          child: i == labels.length - 1
                              ? const SizedBox.shrink()
                              : Divider(
                                  thickness: 1.5,
                                  color: i < position ? colors.brandPrimary : colors.borderSubtle,
                                ),
                        ),
                      ],
                    ),
                    const SizedBox(height: AppSpacing.xxs),
                    Text(
                      label,
                      style: styles.caption.copyWith(
                        fontSize: 11,
                        color: i == position ? colors.textPrimary : colors.textSecondary,
                        fontWeight: i == position ? FontWeight.w600 : FontWeight.w400,
                      ),
                      textAlign: TextAlign.center,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ],
                ),
              ),
          ],
        ),
      ),
    );
  }
}

/// One screen of the request: its questions as numbered sections, and on the first screen
/// how photos are shared and when the time is confirmed.
class _PageContent extends StatelessWidget {
  const _PageContent({required this.page, required this.draft, required this.content, required this.showIssues});

  final RequestPage page;
  final RequestDraft draft;
  final ContentSnapshot content;
  final bool showIssues;

  String _sectionName(BuildContext context, RequestStep step) {
    final l10n = context.l10n;
    return switch (step) {
      RequestStep.services => l10n.requestSectionService,
      RequestStep.property => l10n.requestSectionProperty,
      RequestStep.location => l10n.requestSectionEmirate,
      RequestStep.size => l10n.requestSectionSize,
      RequestStep.stage => l10n.requestSectionStage,
      RequestStep.budget => l10n.requestSectionBudget,
      RequestStep.details => l10n.requestSectionDetails,
      RequestStep.consultation => l10n.requestSectionConsultation,
      RequestStep.time => l10n.requestSectionTime,
      RequestStep.contact => l10n.requestSectionContact,
    };
  }

  Widget _step(RequestStep step) => switch (step) {
    RequestStep.services => ServicesStep(draft: draft, content: content, showIssues: showIssues),
    RequestStep.property => PropertyStep(draft: draft),
    RequestStep.location => LocationStep(draft: draft, content: content, showIssues: showIssues),
    RequestStep.size => SizeStep(draft: draft, showIssues: showIssues),
    RequestStep.stage => StageStep(draft: draft),
    RequestStep.budget => BudgetStep(draft: draft, content: content, showIssues: showIssues),
    RequestStep.details => DetailsStep(draft: draft, showIssues: showIssues),
    RequestStep.consultation => ConsultationStep(draft: draft, showIssues: showIssues),
    RequestStep.time => TimeStep(draft: draft, content: content),
    RequestStep.contact => ContactStep(draft: draft, showIssues: showIssues),
  };

  @override
  Widget build(BuildContext context) {
    final l10n = context.l10n;
    final gutter = AppSpacing.gutter(AppWindowSize.of(context));
    final sections = [
      for (final (i, step) in page.steps.indexed)
        RequestSection(number: i + 1, name: _sectionName(context, step), optional: step.isOptional, child: _step(step)),
      if (page == RequestPage.requirements)
        RequestSection(
          number: page.steps.length + 1,
          name: l10n.requestSectionPhotos,
          optional: true,
          // No uploads on the free Firebase plan (owner decision, 18 Oct 2026): photos and
          // plans go on WhatsApp after sending, with the request number.
          child: StepBody(
            title: l10n.receivedPhotos,
            children: [
              RequestInfoCard(icon: AppIcons.whatsapp, title: l10n.consultWhatsapp, body: l10n.requestPhotosBody),
            ],
          ),
        ),
    ];
    return ListView(
      padding: EdgeInsetsDirectional.fromSTEB(gutter, AppSpacing.lg, gutter, AppSpacing.xxl),
      children: [
        for (final (i, section) in sections.indexed) ...[if (i > 0) const SizedBox(height: AppSpacing.xxl), section],
        if (page == RequestPage.requirements) ...[
          const SizedBox(height: AppSpacing.xl),
          RequestInfoCard(icon: AppIcons.calendar, title: l10n.requestTimeInfoTitle, body: l10n.requestTimeInfoBody),
        ],
      ],
    );
  }
}

/// Continue (to the next screen or review) and Save Draft. It sits in the body, not the
/// scaffold's bottom bar, so it stays above the keyboard.
class _PageBar extends ConsumerWidget {
  const _PageBar({required this.returnToReview});

  final bool returnToReview;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = context.l10n;
    final controller = ref.read(requestFlowProvider.notifier);
    final gutter = AppSpacing.gutter(AppWindowSize.of(context));
    final isLast = controller.page == RequestPage.values.last;
    return ColoredBox(
      color: context.colors.surfacePrimary,
      child: SafeArea(
        top: false,
        child: Padding(
          padding: EdgeInsetsDirectional.fromSTEB(gutter, AppSpacing.sm, gutter, AppSpacing.xs),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              FilledButton(
                onPressed: controller.next,
                style: FilledButton.styleFrom(
                  shape: const StadiumBorder(),
                  minimumSize: const Size.fromHeight(56),
                  textStyle: context.textStyles.headline.copyWith(fontSize: 22),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Flexible(
                      child: Text(
                        returnToReview || isLast ? l10n.reviewTitle : l10n.requestContinue,
                        textAlign: TextAlign.center,
                      ),
                    ),
                    const SizedBox(width: AppSpacing.sm),
                    const Icon(AppIcons.proceed),
                  ],
                ),
              ),
              TextButton(
                // Answers are already saved as they are given; this only leaves.
                onPressed: () {
                  ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(l10n.requestDraftSaved)));
                  if (context.canPop()) {
                    context.pop();
                  } else {
                    context.go(AppRoutes.home);
                  }
                },
                style: TextButton.styleFrom(
                  foregroundColor: context.colors.brandPrimary,
                  textStyle: context.textStyles.headline.copyWith(fontSize: 18, decoration: TextDecoration.none),
                ),
                child: Text(l10n.requestSaveDraft),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _NoDraft extends ConsumerWidget {
  const _NoDraft();

  @override
  Widget build(BuildContext context, WidgetRef ref) => Scaffold(
    appBar: const AppTopBar(),
    body: EmptyState(
      title: context.l10n.requestPlanCta,
      actionLabel: context.l10n.requestStartNew,
      onAction: () => ref.read(draftProvider.notifier).start(entry: RequestEntry.home),
    ),
  );
}

enum _LeaveChoice { keep, saveAndExit, discard }

/// Leaving keeps the draft by default; discarding is an explicit, separate choice.
Future<void> confirmLeave(BuildContext context, WidgetRef ref) async {
  final l10n = context.l10n;
  final choice = await showDialog<_LeaveChoice>(
    context: context,
    builder: (context) => AlertDialog(
      title: Text(l10n.requestLeaveTitle),
      content: Text(l10n.requestLeaveBody),
      actions: [
        TextButton(onPressed: () => Navigator.pop(context, _LeaveChoice.discard), child: Text(l10n.requestDiscard)),
        TextButton(onPressed: () => Navigator.pop(context, _LeaveChoice.keep), child: Text(l10n.requestKeepEditing)),
        TextButton(
          onPressed: () => Navigator.pop(context, _LeaveChoice.saveAndExit),
          child: Text(l10n.requestSaveAndExit),
        ),
      ],
    ),
  );
  if (choice == null || choice == _LeaveChoice.keep) return;
  if (choice == _LeaveChoice.discard) await ref.read(draftProvider.notifier).clear();
  if (!context.mounted) return;
  if (context.canPop()) {
    context.pop();
  } else {
    context.go(AppRoutes.home);
  }
}

enum _StartChoice { resume, startNew }

/// Opens the request flow from anywhere. With an unfinished request, the customer chooses
/// to continue it or start again; "resume" entries continue it directly.
Future<void> openRequestFlow(
  BuildContext context,
  WidgetRef ref, {
  required RequestEntry entry,
  List<String> serviceIds = const [],
  PropertyType? propertyType,
  ConsultationType? consultationType,
}) async {
  final existing = ref.read(draftProvider);
  if (existing != null) {
    var choice = _StartChoice.resume;
    if (entry != RequestEntry.resume) {
      final l10n = context.l10n;
      final picked = await showDialog<_StartChoice>(
        context: context,
        builder: (context) => AlertDialog(
          title: Text(l10n.requestReplaceTitle),
          content: Text(l10n.requestReplaceBody),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context, _StartChoice.startNew),
              child: Text(l10n.requestStartNew),
            ),
            TextButton(onPressed: () => Navigator.pop(context, _StartChoice.resume), child: Text(l10n.requestResume)),
          ],
        ),
      );
      if (picked == null) return;
      choice = picked;
    }
    if (choice == _StartChoice.resume) {
      if (context.mounted) await context.push(AppRoutes.request);
      return;
    }
  }
  await ref
      .read(draftProvider.notifier)
      .start(serviceIds: serviceIds, propertyType: propertyType, consultationType: consultationType, entry: entry);
  if (context.mounted) await context.push(AppRoutes.request);
}
