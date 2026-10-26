import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../design_system/theme/context_extensions.dart';
import '../../design_system/tokens/app_icons.dart';
import '../../design_system/tokens/app_layout_tokens.dart';

/// Five tabs (owner decision, 18 Oct 2026): Home · Services · Projects · Book · Profile.
/// Tab bar on phones (owner's design, 26 Oct 2026: the selected tab is green, bold, with a
/// short line under its label), navigation rail on tablets. Re-selecting the current tab
/// returns it to its root.
class AppShell extends StatelessWidget {
  const AppShell({required this.shell, super.key});

  final StatefulNavigationShell shell;

  void _select(int index) => shell.goBranch(index, initialLocation: index == shell.currentIndex);

  @override
  Widget build(BuildContext context) {
    final l10n = context.l10n;
    final tabs = [
      (icon: AppIcons.home, selected: AppIcons.homeSelected, label: l10n.tabHome),
      (icon: AppIcons.services, selected: AppIcons.servicesSelected, label: l10n.tabServices),
      (icon: AppIcons.projects, selected: AppIcons.projectsSelected, label: l10n.tabProjects),
      (icon: AppIcons.book, selected: AppIcons.bookSelected, label: l10n.tabBook),
      (icon: AppIcons.account, selected: AppIcons.accountSelected, label: l10n.tabProfile),
    ];

    if (AppWindowSize.of(context) == AppWindowSize.expanded) {
      return Scaffold(
        body: Row(
          children: [
            SafeArea(
              child: NavigationRail(
                selectedIndex: shell.currentIndex,
                onDestinationSelected: _select,
                destinations: [
                  for (final tab in tabs)
                    NavigationRailDestination(
                      icon: Icon(tab.icon),
                      selectedIcon: Icon(tab.selected),
                      label: Text(tab.label),
                    ),
                ],
              ),
            ),
            const VerticalDivider(width: 1),
            Expanded(child: shell),
          ],
        ),
      );
    }

    return Scaffold(
      body: shell,
      bottomNavigationBar: AppTabBar(
        selectedIndex: shell.currentIndex,
        onSelected: _select,
        items: [for (final tab in tabs) AppTabItem(icon: tab.icon, selectedIcon: tab.selected, label: tab.label)],
      ),
    );
  }
}

/// One tab of [AppTabBar].
class AppTabItem {
  const AppTabItem({required this.icon, required this.selectedIcon, required this.label});

  final IconData icon;
  final IconData selectedIcon;
  final String label;
}

/// The phone tab bar: icon over label, the selected tab in the brand green with a short
/// line under its label. Each tab is a full-height 48 dp+ target.
class AppTabBar extends StatelessWidget {
  const AppTabBar({required this.items, required this.selectedIndex, required this.onSelected, super.key});

  final List<AppTabItem> items;
  final int selectedIndex;
  final ValueChanged<int> onSelected;

  static const double _height = 64;
  static const double _lineWidth = 24;

  @override
  Widget build(BuildContext context) {
    final colors = context.colors;
    final styles = context.textStyles;
    return DecoratedBox(
      decoration: BoxDecoration(
        color: colors.surfacePrimary,
        border: BorderDirectional(top: BorderSide(color: colors.borderSubtle)),
      ),
      child: SafeArea(
        top: false,
        child: ConstrainedBox(
          constraints: const BoxConstraints(minHeight: _height),
          child: Row(
            children: [
              for (final (index, item) in items.indexed)
                Expanded(
                  child: _Tab(
                    item: item,
                    selected: index == selectedIndex,
                    onTap: () => onSelected(index),
                    color: index == selectedIndex ? colors.brandPrimary : colors.textSecondary,
                    style: styles.caption.copyWith(
                      color: index == selectedIndex ? colors.brandPrimary : colors.textSecondary,
                      fontWeight: index == selectedIndex ? FontWeight.w600 : FontWeight.w400,
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

class _Tab extends StatelessWidget {
  const _Tab({
    required this.item,
    required this.selected,
    required this.onTap,
    required this.color,
    required this.style,
  });

  final AppTabItem item;
  final bool selected;
  final VoidCallback onTap;
  final Color color;
  final TextStyle style;

  @override
  Widget build(BuildContext context) => Semantics(
    button: true,
    selected: selected,
    label: item.label,
    excludeSemantics: true,
    child: InkWell(
      onTap: onTap,
      child: Padding(
        padding: const EdgeInsetsDirectional.symmetric(vertical: AppSpacing.xs),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(selected ? item.selectedIcon : item.icon, color: color, size: 24),
            const SizedBox(height: AppSpacing.xxs),
            Text(item.label, style: style, maxLines: 1, overflow: TextOverflow.ellipsis),
            const SizedBox(height: AppSpacing.xxs),
            AnimatedContainer(
              duration: AppMotion.of(context).quick,
              width: selected ? AppTabBar._lineWidth : 0,
              height: 2,
              decoration: BoxDecoration(color: color, borderRadius: BorderRadius.circular(1)),
            ),
          ],
        ),
      ),
    ),
  );
}
