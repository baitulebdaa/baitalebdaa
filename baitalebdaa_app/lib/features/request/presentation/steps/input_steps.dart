import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';

import '../../../../design_system/components/forms/option_tile.dart';
import '../../../../design_system/theme/context_extensions.dart';
import '../../../../design_system/tokens/app_icons.dart';
import '../../../../design_system/tokens/app_layout_tokens.dart';
import '../../../content/domain/content_models.dart';
import '../../domain/request_draft.dart';
import '../../domain/request_options.dart';
import '../../domain/request_validation.dart';
import '../request_controllers.dart';
import '../request_labels.dart';
import 'step_parts.dart';

void _update(WidgetRef ref, RequestDraft Function(RequestDraft) change) =>
    ref.read(draftProvider.notifier).update(change);

String? _issue(BuildContext context, bool show, Set<RequestIssue> issues, RequestIssue issue) =>
    show && issues.contains(issue) ? context.issueLabel(issue) : null;

/// Step 3: emirate (all seven, owner-confirmed coverage) and an optional area.
class LocationStep extends ConsumerWidget {
  const LocationStep({required this.draft, required this.content, required this.showIssues, super.key});

  final RequestDraft draft;
  final ContentSnapshot content;
  final bool showIssues;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final issues = validateStep(RequestStep.location, draft);
    return StepBody(
      title: context.l10n.stepLocationTitle,
      help: context.l10n.stepLocationHelp,
      children: [
        if (showIssues && issues.contains(RequestIssue.chooseEmirate))
          const StepIssues(issues: {RequestIssue.chooseEmirate}),
        LayoutBuilder(
          builder: (context, constraints) {
            final tileWidth = (constraints.maxWidth - AppSpacing.sm) / 2;
            return Wrap(
              spacing: AppSpacing.sm,
              runSpacing: AppSpacing.sm,
              children: [
                for (final emirate in content.business.emirates)
                  SizedBox(
                    width: tileWidth,
                    child: OptionTile(
                      label: context.localized(emirate.name),
                      selected: draft.emirateId == emirate.id,
                      onTap: () => _update(ref, (d) => d.copyWith(emirateId: emirate.id)),
                    ),
                  ),
              ],
            );
          },
        ),
        const SizedBox(height: AppSpacing.sm),
        TextFormField(
          initialValue: draft.area,
          decoration: InputDecoration(
            labelText: context.l10n.fieldOptional(context.l10n.stepLocationArea),
            hintText: context.l10n.stepLocationAreaHint,
            errorText: _issue(context, showIssues, issues, RequestIssue.areaTooLong),
          ),
          textInputAction: TextInputAction.done,
          textCapitalization: TextCapitalization.words,
          onChanged: (value) => _update(ref, (d) => d.copyWith(area: value)),
        ),
      ],
    );
  }
}

/// Step 4 (optional): approximate size, in sq ft or sq m, or "not sure".
class SizeStep extends ConsumerWidget {
  const SizeStep({required this.draft, required this.showIssues, super.key});

  final RequestDraft draft;
  final bool showIssues;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final issues = validateStep(RequestStep.size, draft);
    return StepBody(
      title: context.l10n.stepSizeTitle,
      help: context.l10n.stepSizeHelp,
      children: [
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: TextFormField(
                initialValue: draft.sizeValue?.toString() ?? '',
                enabled: !draft.sizeUnknown,
                decoration: InputDecoration(
                  labelText: context.l10n.stepSizeLabel,
                  errorText: _issue(context, showIssues, issues, RequestIssue.sizeInvalid),
                ),
                keyboardType: TextInputType.number,
                inputFormatters: [FilteringTextInputFormatter.digitsOnly, LengthLimitingTextInputFormatter(7)],
                onChanged: (value) => _update(ref, (d) => d.copyWith(sizeValue: int.tryParse(value))),
              ),
            ),
            const SizedBox(width: AppSpacing.sm),
            SegmentedButton<AreaUnit>(
              segments: [
                for (final unit in AreaUnit.values) ButtonSegment(value: unit, label: Text(context.unitLabel(unit))),
              ],
              selected: {draft.sizeUnit},
              showSelectedIcon: false,
              onSelectionChanged: draft.sizeUnknown
                  ? null
                  : (selection) => _update(ref, (d) => d.copyWith(sizeUnit: selection.first)),
            ),
          ],
        ),
        OptionTile(
          label: context.l10n.stepSizeNotSure,
          selected: draft.sizeUnknown,
          onTap: () => _update(ref, (d) => d.copyWith(sizeUnknown: !d.sizeUnknown)),
        ),
      ],
    );
  }
}

/// Step 5 (optional): a budget, with the website's published starting price for the chosen
/// service as context. No invented ranges.
class BudgetStep extends ConsumerWidget {
  const BudgetStep({required this.draft, required this.content, required this.showIssues, super.key});

  final RequestDraft draft;
  final ContentSnapshot content;
  final bool showIssues;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final issues = validateStep(RequestStep.budget, draft);
    final priced = [
      for (final id in draft.serviceIds)
        if (content.service(id) case final service?)
          if (content.startingPrice(service) case final price?) (service: service, price: price),
    ].firstOrNull;
    return StepBody(
      title: context.l10n.stepBudgetTitle,
      help: context.l10n.stepBudgetHelp,
      children: [
        if (priced != null) _PublishedPrice(service: priced.service, price: priced.price),
        TextFormField(
          initialValue: draft.budgetAed?.toString() ?? '',
          enabled: !draft.budgetToDiscuss,
          decoration: InputDecoration(
            labelText: context.l10n.stepBudgetLabel,
            errorText: _issue(context, showIssues, issues, RequestIssue.budgetInvalid),
          ),
          keyboardType: TextInputType.number,
          inputFormatters: [FilteringTextInputFormatter.digitsOnly, LengthLimitingTextInputFormatter(9)],
          onChanged: (value) => _update(ref, (d) => d.copyWith(budgetAed: int.tryParse(value))),
        ),
        OptionTile(
          label: context.l10n.stepBudgetDiscuss,
          selected: draft.budgetToDiscuss,
          onTap: () => _update(ref, (d) => d.copyWith(budgetToDiscuss: !d.budgetToDiscuss)),
        ),
      ],
    );
  }
}

class _PublishedPrice extends StatelessWidget {
  const _PublishedPrice({required this.service, required this.price});

  final Service service;
  final PriceItem price;

  @override
  Widget build(BuildContext context) => DecoratedBox(
    decoration: BoxDecoration(color: context.colors.surfaceWarm, borderRadius: BorderRadius.circular(AppRadius.md)),
    child: Padding(
      padding: const EdgeInsetsDirectional.all(AppSpacing.md),
      child: MergeSemantics(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              context.l10n.stepBudgetPublished,
              style: context.textStyles.caption.copyWith(color: context.colors.textSecondary),
            ),
            const SizedBox(height: AppSpacing.xxs),
            Text(context.localized(service.name), style: context.textStyles.subtitle),
            Text(context.localized(price.display), style: context.textStyles.bodySmall),
          ],
        ),
      ),
    ),
  );
}

/// Step 8 (optional): a preferred day and time of day, clearly labelled as a preference.
/// Days the business is closed (from the website's published hours) cannot be chosen.
class TimeStep extends ConsumerWidget {
  const TimeStep({required this.draft, required this.content, super.key});

  final RequestDraft draft;
  final ContentSnapshot content;

  static const _weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  static String _iso(DateTime d) =>
      '${d.year.toString().padLeft(4, '0')}-${d.month.toString().padLeft(2, '0')}-${d.day.toString().padLeft(2, '0')}';

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final today = DateUtils.dateOnly(DateTime.now());
    final openDays = content.business.hours.days.toSet();
    final days = [for (var i = 1; i <= RequestLimits.preferredDays; i++) today.add(Duration(days: i))];
    final enabled = !draft.timeFlexible;
    return StepBody(
      title: context.l10n.stepTimeTitle,
      children: [
        _Notice(text: context.l10n.stepTimeNotice),
        StepLabel(context.l10n.stepTimeDay),
        SizedBox(
          // Grows with the user's text size, so the chips never clip their labels.
          height: MediaQuery.textScalerOf(context).scale(_DayChip.baseHeight),
          child: ListView.separated(
            scrollDirection: Axis.horizontal,
            itemCount: days.length,
            separatorBuilder: (context, index) => const SizedBox(width: AppSpacing.xs),
            itemBuilder: (context, index) {
              final day = days[index];
              final iso = _iso(day);
              return _DayChip(
                day: day,
                selected: draft.preferredDate == iso,
                enabled: enabled && openDays.contains(_weekdays[day.weekday - 1]),
                onTap: () => _update(ref, (d) => d.copyWith(preferredDate: iso)),
              );
            },
          ),
        ),
        StepLabel(context.l10n.stepTimeOfDay),
        for (final window in TimeWindow.values)
          OptionTile(
            label: context.windowLabel(window),
            selected: draft.preferredWindow == window,
            enabled: enabled,
            onTap: () => _update(ref, (d) => d.copyWith(preferredWindow: window)),
          ),
        OptionTile(
          label: context.l10n.stepTimeFlexible,
          selected: draft.timeFlexible,
          onTap: () => _update(ref, (d) => d.copyWith(timeFlexible: !d.timeFlexible)),
        ),
      ],
    );
  }
}

/// One day in the preferred-day strip: weekday, date and month stacked, so a narrow chip
/// never wraps. Closed days (from the website's opening hours) are shown but disabled.
class _DayChip extends StatelessWidget {
  const _DayChip({required this.day, required this.selected, required this.enabled, required this.onTap});

  static const double baseHeight = 84;
  static const double width = 64;

  final DateTime day;
  final bool selected;
  final bool enabled;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final colors = context.colors;
    final code = Localizations.localeOf(context).languageCode;
    final ink = enabled ? colors.textPrimary : colors.textTertiary;
    return Semantics(
      button: true,
      selected: selected,
      enabled: enabled,
      label: context.shortDate(day),
      excludeSemantics: true,
      child: Material(
        color: selected ? colors.surfaceWarm : colors.surfacePrimary,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(AppRadius.md),
          side: BorderSide(
            color: selected ? colors.brandAccentStrong : (enabled ? colors.borderControl : colors.borderSubtle),
            width: selected ? 2 : 1,
          ),
        ),
        clipBehavior: Clip.antiAlias,
        child: InkWell(
          onTap: enabled ? onTap : null,
          child: SizedBox(
            width: MediaQuery.textScalerOf(context).scale(width),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(DateFormat.E(code).format(day), style: context.textStyles.caption.copyWith(color: ink)),
                Text('${day.day}', style: context.textStyles.figure.copyWith(color: ink)),
                Text(DateFormat.MMM(code).format(day), style: context.textStyles.caption.copyWith(color: ink)),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _Notice extends StatelessWidget {
  const _Notice({required this.text});

  final String text;

  @override
  Widget build(BuildContext context) => DecoratedBox(
    decoration: BoxDecoration(
      border: Border.all(color: context.colors.borderControl),
      borderRadius: BorderRadius.circular(AppRadius.md),
    ),
    child: Padding(
      padding: const EdgeInsetsDirectional.all(AppSpacing.md),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(AppIcons.info, size: AppIcons.sizeSmall, color: context.colors.textSecondary),
          const SizedBox(width: AppSpacing.xs),
          Expanded(child: Text(text, style: context.textStyles.bodySmall)),
        ],
      ),
    ),
  );
}

/// Step 9: how to reach the customer. Name and mobile are required; prefilled for accounts.
class ContactStep extends ConsumerWidget {
  const ContactStep({required this.draft, required this.showIssues, super.key});

  final RequestDraft draft;
  final bool showIssues;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = context.l10n;
    final issues = validateStep(RequestStep.contact, draft);
    String? nameIssue() =>
        _issue(context, showIssues, issues, RequestIssue.nameRequired) ??
        _issue(context, showIssues, issues, RequestIssue.nameTooLong);
    return StepBody(
      title: l10n.stepContactTitle,
      children: [
        TextFormField(
          initialValue: draft.name,
          decoration: InputDecoration(labelText: l10n.fieldName, errorText: nameIssue()),
          textInputAction: TextInputAction.next,
          textCapitalization: TextCapitalization.words,
          autofillHints: const [AutofillHints.name],
          onChanged: (value) => _update(ref, (d) => d.copyWith(name: value)),
        ),
        TextFormField(
          initialValue: draft.phone,
          decoration: InputDecoration(
            labelText: l10n.stepContactPhone,
            helperText: l10n.stepContactPhoneHelp,
            errorText: _issue(context, showIssues, issues, RequestIssue.phoneInvalid),
            errorMaxLines: 2,
          ),
          keyboardType: TextInputType.phone,
          textInputAction: TextInputAction.next,
          autofillHints: const [AutofillHints.telephoneNumber],
          onChanged: (value) => _update(ref, (d) => d.copyWith(phone: value)),
        ),
        TextFormField(
          initialValue: draft.email,
          decoration: InputDecoration(
            labelText: l10n.stepContactEmail,
            errorText: _issue(context, showIssues, issues, RequestIssue.emailInvalid),
          ),
          keyboardType: TextInputType.emailAddress,
          textInputAction: TextInputAction.next,
          autocorrect: false,
          autofillHints: const [AutofillHints.email],
          onChanged: (value) => _update(ref, (d) => d.copyWith(email: value)),
        ),
      ],
    );
  }
}

/// Step 7 (optional): free text about the project.
class DetailsStep extends ConsumerWidget {
  const DetailsStep({required this.draft, required this.showIssues, super.key});

  final RequestDraft draft;
  final bool showIssues;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final issues = validateStep(RequestStep.details, draft);
    return StepBody(
      title: context.l10n.stepDetailsTitle,
      help: context.l10n.stepDetailsHelp,
      children: [
        TextFormField(
          initialValue: draft.note,
          decoration: InputDecoration(
            labelText: context.l10n.fieldOptional(context.l10n.stepDetailsLabel),
            alignLabelWithHint: true,
            errorText: _issue(context, showIssues, issues, RequestIssue.noteTooLong),
          ),
          minLines: 5,
          maxLines: 10,
          maxLength: RequestLimits.maxNote,
          textCapitalization: TextCapitalization.sentences,
          onChanged: (value) => _update(ref, (d) => d.copyWith(note: value)),
        ),
      ],
    );
  }
}
