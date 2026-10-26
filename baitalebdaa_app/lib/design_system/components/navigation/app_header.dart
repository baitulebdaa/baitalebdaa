import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../../theme/context_extensions.dart';
import '../../tokens/app_colors.dart';
import '../../tokens/app_icons.dart';
import '../../tokens/app_layout_tokens.dart';
import '../../tokens/app_typography.dart';
import '../typography/eyebrow.dart';

/// The app's one header, in three forms that share the same bar, buttons and type:
///
/// - [AppScrollView]: a scrolling page whose large editorial title (eyebrow, title, one
///   line under it) scrolls away under a slim pinned bar, which then shows the title and a
///   hairline. For tab roots and other scrolling pages.
/// - [AppPhotoSliverHeader]: a full-width photo that collapses into the same slim bar. For
///   service and project pages.
/// - [AppTopBar]: the slim bar on its own, for screens that do not scroll as a whole.
///
/// Back appears by itself on pushed screens and never on a tab's root.

const double _barHeight = 56;
const double _buttonSize = 40;

/// Horizontal padding that lines a button's visible circle up with the page gutter (the
/// button's 48 px touch target is 4 px wider on each side).
double _barInset(BuildContext context) => AppSpacing.gutter(AppWindowSize.of(context)) - AppSpacing.xxs;

/// A round icon button for headers: back, close and page actions. 40 px circle, 48 px touch
/// target. [onPhoto] gives it a dark glass look that stays legible on any photo.
class AppBarButton extends StatelessWidget {
  const AppBarButton({
    required this.icon,
    required this.tooltip,
    required this.onPressed,
    super.key,
    this.onPhoto = false,
  });

  final IconData icon;
  final String tooltip;
  final VoidCallback? onPressed;
  final bool onPhoto;

  @override
  Widget build(BuildContext context) {
    final colors = context.colors;
    // Plain icons on the page (owner's design, 26 Oct 2026); dark glass circles on photos.
    final glyph = Icon(icon, size: onPhoto ? AppIcons.sizeSmall : AppIcons.size);
    return IconButton(
      // Iconsax has no plain ×, so close is its plus turned 45°.
      icon: icon == AppIcons.close ? Transform.rotate(angle: pi / 4, child: glyph) : glyph,
      tooltip: tooltip,
      onPressed: onPressed,
      style: IconButton.styleFrom(
        fixedSize: const Size.square(_buttonSize),
        minimumSize: const Size.square(_buttonSize),
        tapTargetSize: MaterialTapTargetSize.padded,
        backgroundColor: onPhoto ? AppColors.splashBackground.withValues(alpha: 0.45) : Colors.transparent,
        foregroundColor: onPhoto ? AppColors.dark.textPrimary : colors.textPrimary,
      ),
    );
  }
}

/// Back on a pushed screen (close on a full-screen dialog); nothing on a tab's root.
class AppBackButton extends StatelessWidget {
  const AppBackButton({super.key, this.onPhoto = false});

  final bool onPhoto;

  /// Whether the current screen has somewhere to go back to.
  static bool shownIn(BuildContext context) => ModalRoute.of(context)?.impliesAppBarDismissal ?? false;

  @override
  Widget build(BuildContext context) {
    if (!shownIn(context)) return const SizedBox.shrink();
    final route = ModalRoute.of(context);
    final close = route is PageRoute && route.fullscreenDialog;
    final labels = MaterialLocalizations.of(context);
    return AppBarButton(
      icon: close ? AppIcons.close : AppIcons.back,
      tooltip: close ? labels.closeButtonTooltip : labels.backButtonTooltip,
      onPressed: () => Navigator.maybePop(context),
      onPhoto: onPhoto,
    );
  }
}

/// The slim bar's contents: leading button, title (and optional subtitle), actions.
class _BarRow extends StatelessWidget {
  const _BarRow({required this.leading, required this.title, required this.actions, this.subtitle});

  final Widget? leading;
  final Widget? title;
  final Widget? subtitle;
  final List<Widget> actions;

  @override
  Widget build(BuildContext context) {
    final leading = this.leading;
    final title = this.title;
    final subtitle = this.subtitle;
    return Padding(
      padding: EdgeInsetsDirectional.symmetric(horizontal: _barInset(context)),
      child: Row(
        children: [
          if (leading != null) ...[leading, const SizedBox(width: AppSpacing.xxs)],
          Expanded(
            child: Padding(
              padding: EdgeInsetsDirectional.only(start: leading == null ? AppSpacing.xxs : 0),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [?title, ?subtitle],
              ),
            ),
          ),
          for (final action in actions) ...[const SizedBox(width: AppSpacing.xxs), action],
        ],
      ),
    );
  }
}

/// A one-line bar title.
class _BarTitle extends StatelessWidget {
  const _BarTitle(this.text);

  final String text;

  // Latin titles in the serif (owner's design, 26 Oct 2026); Arabic keeps Tajawal.
  @override
  Widget build(BuildContext context) {
    final styles = context.textStyles;
    final style = styles.script == AppScript.latin
        ? styles.headline.copyWith(fontSize: 26, height: 1.15)
        : styles.subtitle;
    return Text(text, style: style, maxLines: 1, overflow: TextOverflow.ellipsis);
  }
}

/// The hairline under the bar, shown once content scrolls beneath it.
class _Hairline extends StatelessWidget implements PreferredSizeWidget {
  const _Hairline({required this.visible});

  final bool visible;

  @override
  Size get preferredSize => const Size.fromHeight(1);

  @override
  Widget build(BuildContext context) => AnimatedOpacity(
    opacity: visible ? 1 : 0,
    duration: AppMotion.of(context).quick,
    child: SizedBox(
      height: 1,
      width: double.infinity,
      child: ColoredBox(color: context.colors.borderSubtle),
    ),
  );
}

/// A scrolling page with the large editorial header: eyebrow, title and one line under it,
/// which scroll away under a slim bar pinned for the whole page. The bar then shows the
/// title and a hairline. Use it in place of a [CustomScrollView].
class AppScrollView extends StatefulWidget {
  const AppScrollView({
    required this.title,
    required this.slivers,
    super.key,
    this.eyebrow,
    this.subtitle,
    this.actions = const [],
  });

  final String title;

  /// The website-style section label above the title.
  final String? eyebrow;

  /// One or two lines that say what the page holds.
  final String? subtitle;

  /// [AppBarButton]s at the end of the bar.
  final List<Widget> actions;

  /// The page's content, below the header.
  final List<Widget> slivers;

  @override
  State<AppScrollView> createState() => _AppScrollViewState();
}

class _AppScrollViewState extends State<AppScrollView> {
  final _blockKey = GlobalKey();
  final _titleKey = GlobalKey();
  final _collapsed = ValueNotifier(false);

  @override
  void dispose() {
    _collapsed.dispose();
    super.dispose();
  }

  /// Collapsed once the large title has scrolled under the bar.
  bool _onScroll(ScrollNotification notification) {
    if (notification.depth != 0) return false;
    final block = _blockKey.currentContext?.findRenderObject() as RenderBox?;
    final title = _titleKey.currentContext?.findRenderObject() as RenderBox?;
    if (block == null || title == null || !block.hasSize || !title.hasSize) return false;
    final titleBottom = title.localToGlobal(Offset(0, title.size.height), ancestor: block).dy;
    _collapsed.value = notification.metrics.pixels >= titleBottom;
    return false;
  }

  @override
  Widget build(BuildContext context) {
    final styles = context.textStyles;
    final eyebrow = widget.eyebrow;
    final subtitle = widget.subtitle;
    final gutter = AppSpacing.gutter(AppWindowSize.of(context));
    final quick = AppMotion.of(context).quick;
    return NotificationListener<ScrollNotification>(
      onNotification: _onScroll,
      child: CustomScrollView(
        slivers: [
          ValueListenableBuilder(
            valueListenable: _collapsed,
            builder: (context, isCollapsed, _) => SliverAppBar(
              pinned: true,
              automaticallyImplyLeading: false,
              titleSpacing: 0,
              title: _BarRow(
                leading: AppBackButton.shownIn(context) ? const AppBackButton() : null,
                // The large title below is the page's heading; this copy is visual only.
                title: ExcludeSemantics(
                  child: AnimatedSwitcher(
                    duration: quick,
                    child: isCollapsed ? _BarTitle(widget.title) : const SizedBox.shrink(),
                  ),
                ),
                actions: widget.actions,
              ),
              bottom: _Hairline(visible: isCollapsed),
            ),
          ),
          SliverToBoxAdapter(
            child: Padding(
              key: _blockKey,
              padding: EdgeInsetsDirectional.fromSTEB(gutter, 0, gutter, AppSpacing.xl),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  if (eyebrow != null) ...[Eyebrow(eyebrow), const SizedBox(height: AppSpacing.md)],
                  Semantics(
                    key: _titleKey,
                    header: true,
                    child: Text(widget.title, style: styles.display),
                  ),
                  if (subtitle != null) ...[
                    const SizedBox(height: AppSpacing.sm),
                    ConstrainedBox(
                      constraints: const BoxConstraints(maxWidth: AppSpacing.readingWidth),
                      child: Text(subtitle, style: styles.body.copyWith(color: context.colors.textSecondary)),
                    ),
                  ],
                ],
              ),
            ),
          ),
          ...widget.slivers,
        ],
      ),
    );
  }
}

/// A full-width photo that collapses into the slim bar, which then shows [title]. Put it
/// first in a [CustomScrollView]; the page shows its own large title below the photo.
class AppPhotoSliverHeader extends StatelessWidget {
  const AppPhotoSliverHeader({
    required this.photo,
    required this.title,
    required this.aspectRatio,
    super.key,
    this.actions = const [],
  });

  /// The photo, already sized to fill (for example a [BundledPhoto] inside a [Hero]).
  final Widget photo;
  final String title;

  /// Width / height of the expanded photo.
  final double aspectRatio;

  /// [AppBarButton]s at the end of the bar; give them `onPhoto: true` while expanded.
  final List<Widget> actions;

  @override
  Widget build(BuildContext context) {
    final media = MediaQuery.of(context);
    final expanded = media.size.width / aspectRatio;
    return SliverAppBar(
      pinned: true,
      automaticallyImplyLeading: false,
      expandedHeight: expanded,
      // The bar, buttons and title are drawn by the flexible space below, which knows how
      // far the header has collapsed from its own height.
      flexibleSpace: LayoutBuilder(
        builder: (context, constraints) => _PhotoHeaderSpace(
          photo: photo,
          title: title,
          actions: actions,
          height: constraints.maxHeight,
          expandedHeight: expanded + media.padding.top,
          collapsedHeight: _barHeight + media.padding.top,
        ),
      ),
    );
  }
}

class _PhotoHeaderSpace extends StatelessWidget {
  const _PhotoHeaderSpace({
    required this.photo,
    required this.title,
    required this.actions,
    required this.height,
    required this.expandedHeight,
    required this.collapsedHeight,
  });

  final Widget photo;
  final String title;
  final List<Widget> actions;
  final double height;
  final double expandedHeight;
  final double collapsedHeight;

  @override
  Widget build(BuildContext context) {
    // 1 when fully open, 0 when only the bar is left.
    final open = ((height - collapsedHeight) / (expandedHeight - collapsedHeight)).clamp(0.0, 1.0);
    // The bar turns solid a little before the photo is gone, so the title never sits on a
    // sliver of photo.
    final collapsed = open < 0.12;
    final top = MediaQuery.paddingOf(context).top;
    final quick = AppMotion.of(context).quick;
    const ink = AppColors.splashBackground;
    return AnnotatedRegion<SystemUiOverlayStyle>(
      // Light status bar icons over the photo; the theme's own once the bar is plain.
      value: collapsed
          ? (Theme.of(context).brightness == Brightness.dark ? SystemUiOverlayStyle.light : SystemUiOverlayStyle.dark)
          : SystemUiOverlayStyle.light,
      child: Stack(
        fit: StackFit.expand,
        children: [
          // The photo keeps its full size and slides up at half speed as the header closes.
          PositionedDirectional(
            top: -(expandedHeight - height) / 2,
            start: 0,
            end: 0,
            height: expandedHeight,
            child: Stack(
              fit: StackFit.expand,
              children: [
                photo,
                // A soft shade at the top keeps the status bar and buttons legible on bright photos.
                DecoratedBox(
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                      stops: const [0, 0.35],
                      colors: [ink.withValues(alpha: 0.45), ink.withValues(alpha: 0)],
                    ),
                  ),
                ),
              ],
            ),
          ),
          AnimatedOpacity(
            opacity: collapsed ? 1 : 0,
            duration: quick,
            child: ColoredBox(color: context.colors.surfacePrimary),
          ),
          PositionedDirectional(
            top: top,
            start: 0,
            end: 0,
            height: _barHeight,
            child: _BarRow(
              leading: AppBackButton.shownIn(context) ? AppBackButton(onPhoto: !collapsed) : null,
              // The page's large title below the photo is its heading; this copy is visual only.
              title: ExcludeSemantics(
                child: AnimatedSwitcher(duration: quick, child: collapsed ? _BarTitle(title) : const SizedBox.shrink()),
              ),
              actions: actions,
            ),
          ),
          PositionedDirectional(bottom: 0, start: 0, end: 0, child: _Hairline(visible: collapsed)),
        ],
      ),
    );
  }
}

/// The slim bar on its own, for a [Scaffold.appBar].
class AppTopBar extends StatelessWidget implements PreferredSizeWidget {
  const AppTopBar({super.key, this.title, this.subtitle, this.leading, this.actions = const [], this.bottom});

  final String? title;
  final String? subtitle;

  /// Replaces the automatic back button, for example with a close button that asks first.
  final Widget? leading;
  final List<Widget> actions;

  /// Shown under the bar instead of the hairline, for example a progress indicator.
  final PreferredSizeWidget? bottom;

  @override
  Size get preferredSize => Size.fromHeight(_barHeight + (bottom?.preferredSize.height ?? 1));

  @override
  Widget build(BuildContext context) {
    final title = this.title;
    final subtitle = this.subtitle;
    return AppBar(
      automaticallyImplyLeading: false,
      toolbarHeight: _barHeight,
      titleSpacing: 0,
      title: _BarRow(
        leading: leading ?? (AppBackButton.shownIn(context) ? const AppBackButton() : null),
        title: title == null ? null : Semantics(header: true, child: _BarTitle(title)),
        subtitle: subtitle == null
            ? null
            : Text(
                subtitle,
                style: context.textStyles.caption.copyWith(color: context.colors.textSecondary),
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
        actions: actions,
      ),
      bottom: bottom ?? const _Hairline(visible: true),
    );
  }
}
