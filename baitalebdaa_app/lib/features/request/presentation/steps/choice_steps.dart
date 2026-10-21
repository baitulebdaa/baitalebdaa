import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../core/platform/remote_settings.dart';
import '../../../../design_system/components/forms/option_tile.dart';
import '../../../../design_system/theme/context_extensions.dart';
import '../../../../design_system/tokens/app_layout_tokens.dart';
import '../../../content/domain/content_models.dart';
import '../../domain/request_draft.dart';
import '../../domain/request_options.dart';
import '../../domain/request_validation.dart';
import '../request_controllers.dart';
import '../request_labels.dart';
import 'step_parts.dart';

/// Step 1: up to three services from the website catalogue, or "not sure yet".
class ServicesStep extends ConsumerWidget {
  const ServicesStep({required this.draft, required this.content, required this.showIssues, super.key});

  final RequestDraft draft;
  final ContentSnapshot content;
  final bool showIssues;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    void toggle(String slug) =>
        ref.read(draftProvider.notifier).update((d) => d.copyWith(serviceIds: toggleService(d.serviceIds, slug)));
    final issues = validateStep(RequestStep.services, draft);
    return StepBody(
      title: context.l10n.stepServicesTitle,
      help: context.l10n.stepServicesHelp(kMaxServices),
      children: [
        if (showIssues) StepIssues(issues: issues),
        for (final service in content.services)
          OptionTile(
            label: context.localized(service.name),
            selected: draft.serviceIds.contains(service.slug),
            onTap: () => toggle(service.slug),
          ),
        OptionTile(
          label: context.l10n.stepServicesNotSure,
          selected: draft.serviceIds.contains(kServiceNotSure),
          onTap: () => toggle(kServiceNotSure),
        ),
      ],
    );
  }
}

/// Step 2 (optional): the kind of space.
class PropertyStep extends ConsumerWidget {
  const PropertyStep({required this.draft, super.key});

  final RequestDraft draft;

  @override
  Widget build(BuildContext context, WidgetRef ref) => StepBody(
    title: context.l10n.stepPropertyTitle,
    children: [
      for (final type in PropertyType.values)
        OptionTile(
          label: context.propertyLabel(type),
          selected: draft.propertyType == type,
          onTap: () => ref.read(draftProvider.notifier).update((d) => d.copyWith(propertyType: type)),
        ),
    ],
  );
}

/// Step 6 (optional): where the customer is in their project.
class StageStep extends ConsumerWidget {
  const StageStep({required this.draft, super.key});

  final RequestDraft draft;

  @override
  Widget build(BuildContext context, WidgetRef ref) => StepBody(
    title: context.l10n.stepStageTitle,
    children: [
      for (final stage in ProjectStage.values)
        OptionTile(
          label: context.stageLabel(stage),
          selected: draft.stage == stage,
          onTap: () => ref.read(draftProvider.notifier).update((d) => d.copyWith(stage: stage)),
        ),
    ],
  );
}

/// Step 7: how the first conversation happens. The factory visit appears only when remote
/// settings enable it, because the business has not yet confirmed it is offered.
class ConsultationStep extends ConsumerWidget {
  const ConsultationStep({required this.draft, required this.showIssues, super.key});

  final RequestDraft draft;
  final bool showIssues;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final settings = ref.watch(remoteSettingsValuesProvider).value ?? RemoteSettingsValues.defaults;
    final types = [
      for (final type in ConsultationType.values)
        if (type != ConsultationType.factoryVisit || settings.factoryVisitEnabled) type,
    ];
    return StepBody(
      title: context.l10n.stepConsultationTitle,
      children: [
        if (showIssues) StepIssues(issues: validateStep(RequestStep.consultation, draft)),
        for (final type in types)
          OptionTile(
            label: context.consultationLabel(type).$1,
            description: context.consultationLabel(type).$2,
            selected: draft.consultationType == type,
            onTap: () => ref.read(draftProvider.notifier).update((d) => d.copyWith(consultationType: type)),
          ),
      ],
    );
  }
}

/// Spacing between option tiles, shared by every choice step.
const double kOptionGap = AppSpacing.sm;
