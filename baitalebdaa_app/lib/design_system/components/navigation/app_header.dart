import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../../theme/context_extensions.dart';
import '../../tokens/app_colors.dart';
import '../../tokens/app_icons.dart';
import '../../tokens/app_layout_tokens.dart';
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
    return IconButton(
      icon: Icon(icon, size: AppIcons.sizeSmall),
      tooltip: tooltip,
      onPressed: onPressed,
      style: IconButton.styleFrom(
        fixedSize: const Size.square(_buttonSize),
        minimumSize: const Size.square(_buttonSize),
        tapTargetSize: MaterialTapTargetSize.padded,
        backgroundColor: onPhoto ? AppColors.splashBackground.withValues(alpha: 0.45) : colors.surfacePrimary,
        foregroundColor: onPhoto ? AppColors.dark.textPrimary : colors.textPrimary,
        side: onPhoto ? BorderSide.none : BorderSide(color: colors.borderSubtle),
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

  @override
  Widget build(BuildContext context) =>
      Text(text, style: context.textStyles.subtitle, maxLines: 1, overflow: TextOverflow.ellipsis);
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

/// Tracks whether the page has scrolled past [threshold] pixels.
mixin _CollapseTracker<T extends StatefulWidget> on State<T> {
  final collapsed = ValueNotifier(false);
  ScrollPosition? _position;

  /// Scroll offset at which the header counts as collapsed, or null until laid out.
  double? get threshold;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    final position = Scrollable.maybeOf(context)?.position;
    if (position == _position) return;
    _position?.removeListener(updateCollapsed);
    _position = position?..addListener(updateCollapsed);
    WidgetsBinding.instance.addPostFrameCallback((_) => updateCollapsed());
  }

  void updateCollapsed() {
    final position = _position;
    final threshold = this.threshold;
    if (!mounted || position == null || threshold == null || !position.hasPixels) return;
    collapsed.value = position.pixels >= threshold;
  }

  @override
  void dispose() {
    _position?.removeListener(updateCollapsed);
    collapsed.dispose();
    super.dispose();
  }
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
class AppPhotoSliverHeader extends StatefulWidget {
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
  State<AppPhotoSliverHeader> createState() => _AppPhotoSliverHeaderState();
}

class _AppPhotoSliverHeaderState extends State<AppPhotoSliverHeader> with _CollapseTracker {
  double? _expandedHeight;
  double? _collapsedHeight;

  @override
  double? get threshold {
    final expanded = _expandedHeight;
    final collapsedHeight = _collapsedHeight;
    if (expanded == null || collapsedHeight == null) return null;
    return expanded - collapsedHeight - AppSpacing.xs;
  }

  @override
  Widget build(BuildContext context) {
    final media = MediaQuery.of(context);
    final expanded = media.size.width / widget.aspectRatio;
    _expandedHeight = expanded;
    _collapsedHeight = _barHeight + media.padding.top;
    const ink = AppColors.splashBackground;
    final quick = AppMotion.of(context).quick;
    return ValueListenableBuilder(
      valueListenable: collapsed,
      builder: (context, isCollapsed, _) => SliverAppBar(
        pinned: true,
        automaticallyImplyLeading: false,
        expandedHeight: expanded,
        titleSpacing: 0,
        // Light status bar icons over the photo; the theme's own once the bar is plain.
        systemOverlayStyle: isCollapsed ? null : SystemUiOverlayStyle.light,
        title: _BarRow(
          leading: AppBackButton.shownIn(context) ? AppBackButton(onPhoto: !isCollapsed) : null,
          title: ExcludeSemantics(
            child: AnimatedSwitcher(
              duration: quick,
              child: isCollapsed ? _BarTitle(widget.title) : const SizedBox.shrink(),
            ),
          ),
          actions: widget.actions,
        ),
        bottom: _Hairline(visible: isCollapsed),
        flexibleSpace: FlexibleSpaceBar(
          background: Stack(
            fit: StackFit.expand,
            children: [
              widget.photo,
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
