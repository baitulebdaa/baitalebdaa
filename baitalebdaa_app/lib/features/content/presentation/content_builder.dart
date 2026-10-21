import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../design_system/components/feedback/state_views.dart';
import '../data/content_repository.dart';
import '../domain/content_models.dart';

/// Gives a screen the content snapshot, with the shared loading and error states.
/// Bootstrap preloads the snapshot, so the loading state is rarely seen.
class ContentBuilder extends ConsumerWidget {
  const ContentBuilder({required this.builder, super.key});

  final Widget Function(BuildContext context, ContentSnapshot content) builder;

  @override
  Widget build(BuildContext context, WidgetRef ref) => switch (ref.watch(contentSnapshotProvider)) {
    AsyncData(:final value) => builder(context, value),
    AsyncError(:final error) => ErrorState(error: error, onRetry: () => ref.invalidate(contentSnapshotProvider)),
    _ => const Center(child: CircularProgressIndicator()),
  };
}
