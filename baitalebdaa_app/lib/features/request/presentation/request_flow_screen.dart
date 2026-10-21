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
import '../domain/request_draft.dart';
import '../domain/request_options.dart';
import '../domain/request_validation.dart';
import 'request_controllers.dart';
import 'review_and_received.dart';
import 'steps/choice_steps.dart';
import 'steps/input_steps.dart';

/// The consultation request: one question per screen, then review, then "Request
/// received". Full screen above the tabs. Every answer is saved as it is given, so closing
/// the app or this screen never loses anything.
class RequestFlowScreen extends ConsumerWidget {
  const RequestFlowScreen({super.key});

  static int get _total => RequestStep.values.length;

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
      final step = RequestStep.values[draft.stepIndex.clamp(0, _total - 1)];
      return PopScope(
        canPop: false,
        onPopInvokedWithResult: (didPop, _) async {
          if (didPop) return;
          final moved = await ref.read(requestFlowProvider.notifier).back();
          if (!moved && context.mounted) await confirmLeave(context, ref);
        },
        child: Scaffold(
          appBar: AppTopBar(
            leading: AppBarButton(
              icon: AppIcons.close,
              tooltip: MaterialLocalizations.of(context).closeButtonTooltip,
              onPressed: () => confirmLeave(context, ref),
            ),
            title: reviewing ? context.l10n.reviewTitle : context.l10n.requestStepCount(step.index + 1, _total),
            bottom: PreferredSize(
              preferredSize: const Size.fromHeight(2),
              child: Semantics(
                label: context.l10n.requestStepCount(step.index + 1, _total),
                child: LinearProgressIndicator(value: reviewing ? 1 : (step.index + 1) / _total, minHeight: 2),
              ),
            ),
          ),
          body: Column(
            children: [
              Expanded(
                child: AnimatedSwitcher(
                  duration: AppMotion.of(context).standard,
                  switchInCurve: AppMotion.curve,
                  child: KeyedSubtree(
                    key: ValueKey(reviewing ? 'review' : step.name),
                    child: reviewing
                        ? ReviewView(draft: draft, content: content, state: flow)
                        : _StepContent(step: step, draft: draft, content: content, showIssues: flow.showIssues),
                  ),
                ),
              ),
              if (!reviewing) _StepBar(step: step, returnToReview: flow.returnToReview),
            ],
          ),
        ),
      );
    },
  );
}

class _StepContent extends StatelessWidget {
  const _StepContent({required this.step, required this.draft, required this.content, required this.showIssues});

  final RequestStep step;
  final RequestDraft draft;
  final ContentSnapshot content;
  final bool showIssues;

  @override
  Widget build(BuildContext context) => switch (step) {
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
}

/// Back, Skip (optional steps only) and Continue. It sits in the body, not the scaffold's
/// bottom bar, so it stays above the keyboard.
class _StepBar extends ConsumerWidget {
  const _StepBar({required this.step, required this.returnToReview});

  final RequestStep step;
  final bool returnToReview;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = context.l10n;
    final controller = ref.read(requestFlowProvider.notifier);
    final gutter = AppSpacing.gutter(AppWindowSize.of(context));
    final isLast = step.index == RequestStep.values.length - 1;
    return DecoratedBox(
      decoration: BoxDecoration(
        color: context.colors.surfacePrimary,
        border: BorderDirectional(top: BorderSide(color: context.colors.borderSubtle)),
      ),
      child: SafeArea(
        top: false,
        child: Padding(
          padding: EdgeInsetsDirectional.fromSTEB(gutter, AppSpacing.sm, gutter, AppSpacing.sm),
          child: Row(
            children: [
              if (step.index > 0 && !returnToReview)
                TextButton(onPressed: controller.back, child: Text(l10n.requestBack)),
              const Spacer(),
              if (step.isOptional && !returnToReview)
                Padding(
                  padding: const EdgeInsetsDirectional.only(end: AppSpacing.sm),
                  child: TextButton(onPressed: controller.skip, child: Text(l10n.requestSkip)),
                ),
              // Flexible: a long label wraps instead of pushing the row off screen.
              Flexible(
                child: PrimaryButton(
                  label: returnToReview || isLast ? l10n.reviewTitle : l10n.requestContinue,
                  onPressed: controller.next,
                ),
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
