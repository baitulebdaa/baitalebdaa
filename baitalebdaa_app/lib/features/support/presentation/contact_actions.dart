import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/format/phone.dart';
import '../../../design_system/theme/context_extensions.dart';
import '../../../design_system/tokens/app_icons.dart';
import '../../../design_system/tokens/app_layout_tokens.dart';
import '../../content/domain/content_models.dart';
import '../data/contact_launcher.dart';

/// Opens WhatsApp; if no app can, tells the customer the number to call instead.
Future<void> openWhatsApp(
  BuildContext context,
  WidgetRef ref,
  BusinessFacts business, {
  required String screen,
  String? message,
}) async {
  final messenger = ScaffoldMessenger.of(context);
  final failed = context.l10n.contactWhatsAppFailed(formatPhone(business.phone));
  final opened = await ref
      .read(contactLauncherProvider)
      .openWhatsApp(
        business,
        languageCode: Localizations.localeOf(context).languageCode,
        screen: screen,
        message: message,
      );
  if (!opened) messenger.showSnackBar(SnackBar(content: Text(failed)));
}

/// Call and WhatsApp side by side: the two ways customers reach the team fastest.
class ContactRow extends ConsumerWidget {
  const ContactRow({required this.business, required this.screen, super.key});

  final BusinessFacts business;

  /// Route pattern for analytics, e.g. `/home`.
  final String screen;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = context.l10n;
    return Row(
      children: [
        Expanded(
          child: OutlinedButton.icon(
            icon: const Icon(AppIcons.phone, size: AppIcons.sizeSmall),
            label: Text(l10n.contactCall),
            onPressed: () => ref.read(contactLauncherProvider).call(business, screen: screen),
          ),
        ),
        const SizedBox(width: AppSpacing.sm),
        Expanded(
          child: OutlinedButton.icon(
            icon: const Icon(AppIcons.whatsapp, size: AppIcons.sizeSmall),
            label: Text(l10n.contactWhatsApp),
            onPressed: () => openWhatsApp(context, ref, business, screen: screen),
          ),
        ),
      ],
    );
  }
}
