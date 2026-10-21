import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/platform/analytics.dart';
import '../../../design_system/components/media/network_photo.dart';
import '../../../design_system/components/navigation/app_header.dart';
import '../../../design_system/theme/context_extensions.dart';
import '../../../design_system/tokens/app_colors.dart';
import '../../../design_system/tokens/app_icons.dart';
import '../../../design_system/tokens/app_layout_tokens.dart';
import '../../content/presentation/content_builder.dart';
import 'project_detail_screen.dart';

/// Full-screen project photos on black: swipe between them, pinch to zoom, close to return.
class GalleryScreen extends ConsumerStatefulWidget {
  const GalleryScreen({required this.slug, required this.initialIndex, super.key});

  final String slug;
  final int initialIndex;

  @override
  ConsumerState<GalleryScreen> createState() => _GalleryScreenState();
}

class _GalleryScreenState extends ConsumerState<GalleryScreen> {
  late final PageController _pages = PageController(initialPage: widget.initialIndex);
  late int _index = widget.initialIndex;

  @override
  void initState() {
    super.initState();
    unawaited(ref.read(analyticsSinkProvider).log(ProjectGalleryOpened(projectId: widget.slug)));
  }

  @override
  void dispose() {
    _pages.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => AnnotatedRegion<SystemUiOverlayStyle>(
    value: SystemUiOverlayStyle.light,
    child: Scaffold(
      backgroundColor: AppColors.splashBackground,
      body: ContentBuilder(
        builder: (context, content) {
          final project = content.project(widget.slug);
          if (project == null || project.images.isEmpty) return const SizedBox.shrink();
          final total = project.images.length;
          return Stack(
            children: [
              PageView.builder(
                controller: _pages,
                itemCount: total,
                onPageChanged: (index) => setState(() => _index = index),
                itemBuilder: (context, index) => InteractiveViewer(
                  maxScale: 4,
                  child: Center(
                    child: NetworkPhoto(
                      url: project.images[index].url,
                      semanticLabel: photoLabel(context, project, index),
                      fit: BoxFit.contain,
                    ),
                  ),
                ),
              ),
              SafeArea(
                child: Padding(
                  padding: const EdgeInsetsDirectional.all(AppSpacing.xs),
                  child: Row(
                    children: [
                      AppBarButton(
                        icon: AppIcons.close,
                        tooltip: MaterialLocalizations.of(context).closeButtonTooltip,
                        onPressed: () => Navigator.of(context).maybePop(),
                        onPhoto: true,
                      ),
                      const Spacer(),
                      Padding(
                        padding: const EdgeInsetsDirectional.only(end: AppSpacing.md),
                        child: Text(
                          '${_index + 1} / $total',
                          style: context.textStyles.label.copyWith(color: AppColors.dark.textPrimary),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          );
        },
      ),
    ),
  );
}
