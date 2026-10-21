import 'package:flutter/material.dart';

import '../../../design_system/theme/context_extensions.dart';
import '../../../design_system/tokens/app_layout_tokens.dart';
import '../../content/domain/content_models.dart';
import '../domain/request_draft.dart';
import '../domain/request_validation.dart';
import 'request_labels.dart';

/// A request's answers as labelled sections, on the review screen (with Edit) and on the
/// request detail screen (read-only).
class RequestSummary extends StatelessWidget {
  const RequestSummary({required this.draft, required this.content, super.key, this.onEdit});

  final RequestDraft draft;
  final ContentSnapshot content;

  /// When set, each section shows an Edit button that reopens its step.
  final ValueChanged<RequestStep>? onEdit;

  @override
  Widget build(BuildContext context) {
    final l10n = context.l10n;
    final notGiven = l10n.reviewNotGiven;
    final size = draft.sizeUnknown || draft.sizeValue == null
        ? notGiven
        : '${draft.sizeValue} ${context.unitLabel(draft.sizeUnit)}';
    final budget = draft.budgetToDiscuss || draft.budgetAed == null ? notGiven : formatAed(draft.budgetAed!);
    final location = [
      context.emirateLabel(draft.emirateId, content),
      if (draft.area.trim().isNotEmpty) draft.area.trim(),
    ].join(context.isArabic ? '، ' : ', ');
    final consultation = draft.consultationType;
    final contact = [
      draft.name.trim(),
      normalizePhone(draft.phone) ?? draft.phone,
      if (draft.email.trim().isNotEmpty) draft.email.trim(),
    ].where((line) => line.isNotEmpty).join('\n');

    final sections = <(RequestStep, String, String, String?)>[
      (RequestStep.services, l10n.reviewServices, context.servicesLabel(draft.serviceIds, content), null),
      (
        RequestStep.property,
        l10n.reviewProperty,
        draft.propertyType == null ? notGiven : context.propertyLabel(draft.propertyType!),
        null,
      ),
      (RequestStep.location, l10n.reviewLocation, location, null),
      (RequestStep.size, l10n.reviewSize, size, null),
      (RequestStep.stage, l10n.reviewStage, draft.stage == null ? notGiven : context.stageLabel(draft.stage!), null),
      (RequestStep.budget, l10n.reviewBudget, budget, null),
      (RequestStep.details, l10n.reviewDetails, draft.note.trim().isEmpty ? notGiven : draft.note.trim(), null),
      (
        RequestStep.consultation,
        l10n.reviewConsultation,
        consultation == null ? notGiven : context.consultationLabel(consultation).$1,
        null,
      ),
      (RequestStep.time, l10n.reviewTime, context.preferredTimeLabel(draft), l10n.reviewPreferenceNote),
      (RequestStep.contact, l10n.reviewContact, contact, null),
    ];

    return Column(
      children: [
        for (final (step, title, value, note) in sections)
          _Section(title: title, value: value, note: note, onEdit: onEdit == null ? null : () => onEdit!(step)),
      ],
    );
  }
}

class _Section extends StatelessWidget {
  const _Section({required this.title, required this.value, this.note, this.onEdit});

  final String title;
  final String value;
  final String? note;
  final VoidCallback? onEdit;

  @override
  Widget build(BuildContext context) {
    final note = this.note;
    final secondary = context.colors.textSecondary;
    return DecoratedBox(
      decoration: BoxDecoration(
        border: BorderDirectional(bottom: BorderSide(color: context.colors.borderSubtle)),
      ),
      child: Padding(
        padding: const EdgeInsetsDirectional.symmetric(vertical: AppSpacing.sm),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: MergeSemantics(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(title, style: context.textStyles.caption.copyWith(color: secondary)),
                    const SizedBox(height: AppSpacing.xxs),
                    Text(value, style: context.textStyles.bodySmall),
                    if (note != null) ...[
                      const SizedBox(height: AppSpacing.xxs),
                      Text(note, style: context.textStyles.caption.copyWith(color: secondary)),
                    ],
                  ],
                ),
              ),
            ),
            if (onEdit != null)
              TextButton(
                onPressed: onEdit,
                child: Semantics(label: context.l10n.reviewEditSection(title), child: Text(context.l10n.reviewEdit)),
              ),
          ],
        ),
      ),
    );
  }
}
