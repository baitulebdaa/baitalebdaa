import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../design_system/theme/context_extensions.dart';
import '../../design_system/tokens/app_icons.dart';
import '../../design_system/tokens/app_layout_tokens.dart';

/// Five tabs (owner decision, 18 Oct 2026): Home · Services · Projects · Book · Profile.
/// Book is the strongest action, so its icon sits in an ink circle. Tab bar on phones,
/// navigation rail on tablets; re-selecting the current tab returns it to its root.
class AppShell extends StatelessWidget {
  const AppShell({required this.shell, super.key});

  final StatefulNavigationShell shell;

  static const _bookIndex = 3;

  void _select(int index) => shell.goBranch(index, initialLocation: index == shell.currentIndex);

  @override
  Widget build(BuildContext context) {
    final l10n = context.l10n;
    final tabs = [
      (icon: AppIcons.home, label: l10n.tabHome),
      (icon: AppIcons.services, label: l10n.tabServices),
      (icon: AppIcons.projects, label: l10n.tabProjects),
      (icon: AppIcons.book, label: l10n.tabBook),
      (icon: AppIcons.account, label: l10n.tabProfile),
    ];
    Widget iconFor(int index) => index == _bookIndex ? const _BookIcon() : Icon(tabs[index].icon);

    if (AppWindowSize.of(context) == AppWindowSize.expanded) {
      return Scaffold(
        body: Row(
          children: [
            SafeArea(
              child: NavigationRail(
                selectedIndex: shell.currentIndex,
                onDestinationSelected: _select,
                destinations: [
                  for (final (index, tab) in tabs.indexed)
                    NavigationRailDestination(icon: iconFor(index), label: Text(tab.label)),
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
      bottomNavigationBar: DecoratedBox(
        decoration: BoxDecoration(
          border: BorderDirectional(top: BorderSide(color: context.colors.borderSubtle)),
        ),
        child: NavigationBar(
          selectedIndex: shell.currentIndex,
          onDestinationSelected: _select,
          destinations: [
            for (final (index, tab) in tabs.indexed) NavigationDestination(icon: iconFor(index), label: tab.label),
          ],
        ),
      ),
    );
  }
}

class _BookIcon extends StatelessWidget {
  const _BookIcon();

  static const double _diameter = 40;

  @override
  Widget build(BuildContext context) => DecoratedBox(
    decoration: BoxDecoration(color: context.colors.brandPrimary, shape: BoxShape.circle),
    child: SizedBox.square(
      dimension: _diameter,
      child: Icon(AppIcons.book, color: context.colors.onBrandPrimary, size: AppIcons.sizeSmall),
    ),
  );
}
