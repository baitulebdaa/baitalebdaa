import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../../app/router/routes.dart';
import '../../../design_system/components/buttons/app_buttons.dart';
import '../../../design_system/components/feedback/failure_message.dart';
import '../../../design_system/theme/context_extensions.dart';
import '../../../design_system/tokens/app_icons.dart';
import '../../../design_system/tokens/app_layout_tokens.dart';
import '../../content/domain/content_models.dart';
import '../../support/presentation/contact_actions.dart';
import '../domain/consultation_request.dart';
import '../domain/request_draft.dart';
import 'request_controllers.dart';
import 'request_labels.dart';
import 'request_summary.dart';

/// Every answer on one screen, each section editable, then Send. Sending needs an account,
/// so guests see "Sign in to send" here; their answers stay saved while they sign in.
class ReviewView extends ConsumerWidget {
  const ReviewView({required this.draft, required this.content, required this.state, super.key});

  final RequestDraft draft;
  final ContentSnapshot content;
  final RequestFlowState state;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = context.l10n;
    final controller = ref.read(requestFlowProvider.notifier);
    final canSend = ref.watch(canSendProvider);
    final gutter = AppSpacing.gutter(AppWindowSize.of(context));
    final error = state.submitError;
    final languageCode = Localizations.localeOf(context).languageCode;
    return ListView(
      padding: EdgeInsetsDirectional.fromSTEB(gutter, AppSpacing.xl, gutter, AppSpacing.xxl),
      children: [
        Semantics(header: true, child: Text(l10n.reviewTitle, style: context.textStyles.headline)),
        const SizedBox(height: AppSpacing.md),
        RequestSummary(draft: draft, content: content, onEdit: controller.edit),
        const SizedBox(height: AppSpacing.xl),
        Text(l10n.reviewPrivacy, style: context.textStyles.caption.copyWith(color: context.colors.textSecondary)),
        Align(
          alignment: AlignmentDirectional.centerStart,
          child: TextButton(
            onPressed: () => launchUrl(
              Uri.parse('${content.business.siteUrl}/$languageCode/privacy-policy'),
              mode: LaunchMode.inAppBrowserView,
            ),
            child: Text(l10n.reviewPrivacyLink),
          ),
        ),
        if (error != null && canSend) _SendError(error: error),
        const SizedBox(height: AppSpacing.md),
        if (canSend)
          PrimaryButton(
            label: l10n.reviewSend,
            isLoading: state.isSubmitting,
            onPressed: () => controller.submit(languageCode: languageCode),
          )
        else ...[
          Text(l10n.reviewSignInNote, style: context.textStyles.bodySmall),
          const SizedBox(height: AppSpacing.md),
          PrimaryButton(
            label: l10n.reviewSignInToSend,
            onPressed: () =>
                context.push(Uri(path: AppRoutes.signIn, queryParameters: {'from': AppRoutes.request}).toString()),
          ),
        ],
      ],
    );
  }
}

class _SendError extends StatelessWidget {
  const _SendError({required this.error});

  final Object error;

  @override
  Widget build(BuildContext context) {
    final color = context.colors.error;
    return Semantics(
      liveRegion: true,
      child: Padding(
        padding: const EdgeInsetsDirectional.only(top: AppSpacing.md),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Icon(AppIcons.error, size: AppIcons.sizeSmall, color: color),
            const SizedBox(width: AppSpacing.xs),
            Expanded(
              child: Text(
                '${failureMessage(context, error)} ${context.l10n.requestSendFailed}',
                style: context.textStyles.bodySmall.copyWith(color: color),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

/// After sending: "Project request received" (never "booking confirmed"), the reference and
/// status, what happens next, and the ways to follow up. Photos go via WhatsApp because the
/// free Firebase plan has no file storage.
class ReceivedView extends ConsumerWidget {
  const ReceivedView({required this.request, required this.content, super.key});

  final ConsultationRequest request;
  final ContentSnapshot content;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = context.l10n;
    final gutter = AppSpacing.gutter(AppWindowSize.of(context));
    final steps = [l10n.receivedNext1, l10n.receivedNext2, l10n.receivedNext3];
    return ListView(
      padding: EdgeInsetsDirectional.fromSTEB(gutter, AppSpacing.hero, gutter, AppSpacing.xxl),
      children: [
        Icon(AppIcons.selected, size: AppSpacing.hero, color: context.colors.success),
        const SizedBox(height: AppSpacing.md),
        Semantics(
          header: true,
          liveRegion: true,
          child: Text(l10n.receivedTitle, style: context.textStyles.headline, textAlign: TextAlign.center),
        ),
        const SizedBox(height: AppSpacing.xs),
        Text(l10n.receivedReference(request.reference), style: context.textStyles.figure, textAlign: TextAlign.center),
        Text(
          l10n.receivedStatus(context.statusLabel(request.status)),
          style: context.textStyles.bodySmall.copyWith(color: context.colors.textSecondary),
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: AppSpacing.xxl),
        Text(l10n.receivedNextTitle, style: context.textStyles.title),
        const SizedBox(height: AppSpacing.sm),
        for (final (index, step) in steps.indexed)
          Padding(
            padding: const EdgeInsetsDirectional.only(bottom: AppSpacing.sm),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(
                  width: AppSpacing.xxl,
                  child: Text('${index + 1}', style: context.textStyles.label),
                ),
                Expanded(child: Text(step, style: context.textStyles.bodySmall)),
              ],
            ),
          ),
        const SizedBox(height: AppSpacing.xl),
        PrimaryButton(
          label: l10n.receivedViewRequest,
          onPressed: () => context.go(AppRoutes.requestDetail(request.id)),
        ),
        const SizedBox(height: AppSpacing.sm),
        SecondaryButton(
          label: l10n.receivedPhotos,
          onPressed: () => openWhatsApp(
            context,
            ref,
            content.business,
            screen: AppRoutes.request,
            message: l10n.receivedPhotosMessage(request.reference),
          ),
        ),
        const SizedBox(height: AppSpacing.md),
        Center(
          child: TextButton(onPressed: () => context.go(AppRoutes.home), child: Text(l10n.receivedDone)),
        ),
      ],
    );
  }
}
