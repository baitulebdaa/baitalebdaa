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
      (icon: AppIcons.home, selected: AppIcons.homeSelected, label: l10n.tabHome),
      (icon: AppIcons.services, selected: AppIcons.servicesSelected, label: l10n.tabServices),
      (icon: AppIcons.projects, selected: AppIcons.projectsSelected, label: l10n.tabProjects),
      (icon: AppIcons.book, selected: AppIcons.book, label: l10n.tabBook),
      (icon: AppIcons.account, selected: AppIcons.accountSelected, label: l10n.tabProfile),
    ];
    // Every icon sits in the same square slot as Book's circle, so all five labels line up.
    Widget iconFor(int index, {bool selected = false}) => _IconSlot(
      child: index == _bookIndex ? const _BookIcon() : Icon(selected ? tabs[index].selected : tabs[index].icon),
    );

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
                    NavigationRailDestination(
                      icon: iconFor(index),
                      selectedIcon: iconFor(index, selected: true),
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
      bottomNavigationBar: DecoratedBox(
        decoration: BoxDecoration(
          border: BorderDirectional(top: BorderSide(color: context.colors.borderSubtle)),
        ),
        child: NavigationBar(
          selectedIndex: shell.currentIndex,
          onDestinationSelected: _select,
          destinations: [
            for (final (index, tab) in tabs.indexed)
              NavigationDestination(
                icon: iconFor(index),
                selectedIcon: iconFor(index, selected: true),
                label: tab.label,
              ),
          ],
        ),
      ),
    );
  }
}

/// The square every tab icon is centred in: Book's circle, and the same box for the others.
const double _slot = 36;

class _IconSlot extends StatelessWidget {
  const _IconSlot({required this.child});

  final Widget child;

  @override
  Widget build(BuildContext context) => SizedBox.square(
    dimension: _slot,
    child: Center(child: child),
  );
}

class _BookIcon extends StatelessWidget {
  const _BookIcon();

  static const double _diameter = _slot;

  @override
  Widget build(BuildContext context) => DecoratedBox(
    decoration: BoxDecoration(color: context.colors.brandPrimary, shape: BoxShape.circle),
    child: SizedBox.square(
      dimension: _diameter,
      child: Icon(AppIcons.book, color: context.colors.onBrandPrimary, size: AppIcons.sizeSmall),
    ),
  );
}
