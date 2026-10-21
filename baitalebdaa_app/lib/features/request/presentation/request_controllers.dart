import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/failure/failure.dart';
import '../../../core/platform/analytics.dart';
import '../../../core/platform/auth_gateway.dart';
import '../data/draft_store.dart';
import '../data/request_repository.dart';
import '../domain/consultation_request.dart';
import '../domain/request_draft.dart';
import '../domain/request_options.dart';
import '../domain/request_validation.dart';

/// The unfinished request, saved to the device after every change. Null when there is none.
class DraftController extends Notifier<RequestDraft?> {
  @override
  RequestDraft? build() {
    // Signing in part-way through (sending needs an account) fills in any contact details
    // still empty, without overwriting what the customer typed.
    ref.listen(authStateProvider, (previous, next) {
      final user = next.value;
      if (user == null || !user.hasAccount) return;
      final draft = state;
      if (draft == null) return;
      final name = draft.name.trim().isEmpty ? user.displayName : null;
      final email = draft.email.trim().isEmpty ? user.email : null;
      if (name != null || email != null) {
        update((d) => d.copyWith(name: name ?? d.name, email: email ?? d.email));
      }
    });
    return ref.watch(initialDraftProvider);
  }

  /// Starts a new draft, replacing any unfinished one. Contact details are prefilled from
  /// the signed-in account; the customer can still change them.
  Future<void> start({
    List<String> serviceIds = const [],
    PropertyType? propertyType,
    ConsultationType? consultationType,
    required RequestEntry entry,
  }) async {
    final user = ref.read(authGatewayProvider).currentUser;
    final account = user != null && user.hasAccount ? user : null;
    state = RequestDraft(
      draftId: newDraftId(),
      serviceIds: serviceIds,
      propertyType: propertyType,
      consultationType: consultationType,
      name: account?.displayName ?? '',
      email: account?.email ?? '',
    );
    await _save();
    await ref.read(analyticsSinkProvider).log(RequestStarted(entry: entry, prefilled: serviceIds.isNotEmpty));
  }

  Future<void> update(RequestDraft Function(RequestDraft draft) change) async {
    final current = state;
    if (current == null) return;
    state = change(current);
    await _save();
  }

  Future<void> clear() async {
    state = null;
    await ref.read(draftStoreProvider).clear();
  }

  Future<void> _save() async {
    final draft = state;
    if (draft != null) await ref.read(draftStoreProvider).save(draft);
  }
}

final draftProvider = NotifierProvider<DraftController, RequestDraft?>(DraftController.new);

enum FlowStage { steps, review, received }

@immutable
class RequestFlowState {
  const RequestFlowState({
    this.stage = FlowStage.steps,
    this.showIssues = false,
    this.returnToReview = false,
    this.isSubmitting = false,
    this.submitError,
    this.submitted,
  });

  final FlowStage stage;

  /// Set after Continue is pressed on a step with problems, so they are pointed out then
  /// and not while the customer is still typing.
  final bool showIssues;

  /// The step was opened from the review screen's Edit, so Continue goes back there.
  final bool returnToReview;
  final bool isSubmitting;
  final Object? submitError;
  final ConsultationRequest? submitted;

  RequestFlowState copyWith({
    FlowStage? stage,
    bool? showIssues,
    bool? returnToReview,
    bool? isSubmitting,
    Object? submitError,
    ConsultationRequest? submitted,
  }) => RequestFlowState(
    stage: stage ?? this.stage,
    showIssues: showIssues ?? this.showIssues,
    returnToReview: returnToReview ?? this.returnToReview,
    isSubmitting: isSubmitting ?? this.isSubmitting,
    submitError: submitError,
    submitted: submitted ?? this.submitted,
  );
}

/// Moves through the steps, review and sending. The answers themselves live in
/// [draftProvider], so leaving and coming back never loses them.
class RequestFlowController extends Notifier<RequestFlowState> {
  @override
  RequestFlowState build() => const RequestFlowState();

  RequestDraft? get _draft => ref.read(draftProvider);
  RequestStep get step => RequestStep.values[(_draft?.stepIndex ?? 0).clamp(0, RequestStep.values.length - 1)];

  Future<void> next({bool skipped = false}) async {
    final draft = _draft;
    if (draft == null) return;
    if (!skipped && validateStep(step, draft).isNotEmpty) {
      state = state.copyWith(showIssues: true);
      return;
    }
    unawaited(ref.read(analyticsSinkProvider).log(RequestStepCompleted(step: step, skipped: skipped)));
    final isLast = draft.stepIndex >= RequestStep.values.length - 1;
    if (state.returnToReview || isLast) {
      state = const RequestFlowState(stage: FlowStage.review);
      return;
    }
    await _goTo(draft.stepIndex + 1);
  }

  /// Skips an optional step, clearing anything half-entered on it.
  Future<void> skip() async {
    if (!step.isOptional) return;
    await ref
        .read(draftProvider.notifier)
        .update(
          (d) => switch (step) {
            RequestStep.property => d.copyWith(propertyType: null),
            RequestStep.size => d.copyWith(sizeValue: null, sizeUnknown: true),
            RequestStep.budget => d.copyWith(budgetAed: null, budgetToDiscuss: true),
            RequestStep.stage => d.copyWith(stage: null),
            RequestStep.details => d.copyWith(note: ''),
            RequestStep.time => d.copyWith(preferredDate: null, preferredWindow: null, timeFlexible: true),
            _ => d,
          },
        );
    await next(skipped: true);
  }

  /// Returns false when there is nowhere further back (the caller then offers to leave).
  Future<bool> back() async {
    if (state.stage == FlowStage.review) {
      state = const RequestFlowState();
      return true;
    }
    final draft = _draft;
    if (draft == null || draft.stepIndex == 0) return false;
    await _goTo(draft.stepIndex - 1);
    return true;
  }

  Future<void> edit(RequestStep target) async {
    await ref.read(draftProvider.notifier).update((d) => d.copyWith(stepIndex: target.index));
    state = const RequestFlowState(returnToReview: true);
  }

  Future<void> submit({required String languageCode}) async {
    final draft = _draft;
    if (draft == null || state.isSubmitting) return;
    final incomplete = firstIncompleteStep(draft);
    if (incomplete != null) {
      await ref.read(draftProvider.notifier).update((d) => d.copyWith(stepIndex: incomplete.index));
      state = const RequestFlowState(showIssues: true, returnToReview: true);
      return;
    }
    // Sending needs a real account (owner decision, 18 Oct 2026); the review screen offers
    // sign-in instead of Send, and the security rules refuse guest identities too.
    final owner = ref.read(authGatewayProvider).currentUser;
    if (owner == null || !owner.hasAccount) {
      state = state.copyWith(submitError: const UnauthorisedFailure());
      return;
    }
    state = state.copyWith(isSubmitting: true);
    try {
      final request = await ref
          .read(requestRepositoryProvider)
          .submit(draft: draft, ownerUid: owner.uid, languageCode: languageCode);
      await ref.read(draftProvider.notifier).clear();
      unawaited(
        ref
            .read(analyticsSinkProvider)
            .log(RequestSubmitted(serviceCount: draft.serviceIds.length, consultationType: draft.consultationType!)),
      );
      if (!ref.mounted) return;
      state = RequestFlowState(stage: FlowStage.received, submitted: request);
    } on Object catch (error) {
      if (!ref.mounted) return;
      state = state.copyWith(isSubmitting: false, submitError: error);
    }
  }

  Future<void> _goTo(int index) async {
    await ref.read(draftProvider.notifier).update((d) => d.copyWith(stepIndex: index));
    state = const RequestFlowState();
  }
}

final requestFlowProvider = NotifierProvider.autoDispose<RequestFlowController, RequestFlowState>(
  RequestFlowController.new,
);

/// Sending needs a signed-in account; the review screen shows sign-in instead of Send.
final canSendProvider = Provider<bool>((ref) => ref.watch(authStateProvider).value?.hasAccount ?? false);
