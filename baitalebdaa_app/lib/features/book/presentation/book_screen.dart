import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../app/router/routes.dart';
import '../../../core/platform/analytics.dart';
import '../../../design_system/components/buttons/app_buttons.dart';
import '../../../design_system/components/navigation/app_header.dart';
import '../../../design_system/components/typography/section_header.dart';
import '../../../design_system/theme/context_extensions.dart';
import '../../../design_system/tokens/app_layout_tokens.dart';
import '../../content/presentation/content_builder.dart';
import '../../request/presentation/request_entry_widgets.dart';
import '../../request/presentation/request_flow_screen.dart';
import '../../support/presentation/contact_actions.dart';

/// The Book tab: where planning starts. A real destination, not just a button: it shows the
/// unfinished request, quick starts, how the process works, and the latest request.
class BookScreen extends ConsumerWidget {
  const BookScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = context.l10n;
    return Scaffold(
      body: ContentBuilder(
        builder: (context, content) {
          final gutter = AppSpacing.gutter(AppWindowSize.of(context));
          final steps = [l10n.bookStep1, l10n.bookStep2, l10n.bookStep3];
          return AppScrollView(
            eyebrow: l10n.bookEyebrow,
            title: l10n.bookTitle,
            subtitle: l10n.bookIntro,
            slivers: [
              SliverPadding(
                padding: EdgeInsetsDirectional.fromSTEB(gutter, 0, gutter, AppSpacing.section),
                sliver: SliverList.list(
                  children: [
                    const ResumeDraftCard(),
                    const SizedBox(height: AppSpacing.md),
                    PrimaryButton(
                      label: l10n.bookStart,
                      onPressed: () => openRequestFlow(context, ref, entry: RequestEntry.book),
                    ),
                    const SizedBox(height: AppSpacing.section),
                    SectionHeader(eyebrow: l10n.homePlanningTitle),
                    const SizedBox(height: AppSpacing.md),
                    const PlanningChoices(entry: RequestEntry.book),
                    const SizedBox(height: AppSpacing.section),
                    SectionHeader(eyebrow: l10n.bookStepsTitle),
                    const SizedBox(height: AppSpacing.md),
                    for (final (index, step) in steps.indexed)
                      Padding(
                        padding: const EdgeInsetsDirectional.only(bottom: AppSpacing.md),
                        child: Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            SizedBox(
                              width: AppSpacing.xxl,
                              child: Text(
                                (index + 1).toString().padLeft(2, '0'),
                                style: context.textStyles.label.copyWith(color: context.colors.brandAccentStrong),
                              ),
                            ),
                            Expanded(child: Text(step, style: context.textStyles.bodySmall)),
                          ],
                        ),
                      ),
                    const SizedBox(height: AppSpacing.xl),
                    LatestRequestCard(content: content),
                    const SizedBox(height: AppSpacing.xl),
                    ContactRow(business: content.business, screen: AppRoutes.book),
                  ],
                ),
              ),
            ],
          );
        },
      ),
    );
  }
}
