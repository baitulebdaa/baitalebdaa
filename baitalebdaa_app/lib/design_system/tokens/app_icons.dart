import 'package:flutter/widgets.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

/// The app's icon vocabulary, from Lucide: the same outline set the website uses.
/// Screens name icons by meaning; this file decides the glyph. Directional icons use
/// Lucide's `Dir` variants, which mirror automatically in Arabic.
abstract final class AppIcons {
  static const IconData home = LucideIcons.house;
  static const IconData services = LucideIcons.layoutGrid;
  static const IconData projects = LucideIcons.images;
  static const IconData assistant = LucideIcons.sparkles;
  static const IconData send = LucideIcons.sendHorizontalDir;
  static const IconData startOver = LucideIcons.rotateCcw;
  static const IconData account = LucideIcons.userRound;
  static const IconData book = LucideIcons.calendarPlus;
  static const IconData pricing = LucideIcons.tag;
  static const IconData survey = LucideIcons.ruler;
  static const IconData legal = LucideIcons.scrollText;
  static const IconData delete = LucideIcons.trash2;
  static const IconData external = LucideIcons.externalLinkDir;
  static const IconData location = LucideIcons.mapPin;
  static const IconData time = LucideIcons.clock;
  static const IconData guarantee = LucideIcons.shieldCheck;

  // "What are you planning?" choices.
  static const IconData villa = LucideIcons.house;
  static const IconData apartment = LucideIcons.building2;
  static const IconData office = LucideIcons.briefcase;
  static const IconData restaurant = LucideIcons.utensils;
  static const IconData retail = LucideIcons.store;
  static const IconData joinery = LucideIcons.armchair;
  static const IconData settings = LucideIcons.settings;
  static const IconData language = LucideIcons.languages;
  static const IconData appearance = LucideIcons.sunMoon;

  static const IconData forward = LucideIcons.chevronRightDir;
  static const IconData back = LucideIcons.chevronLeftDir;
  static const IconData proceed = LucideIcons.arrowRightDir;

  static const IconData phone = LucideIcons.phone;
  static const IconData whatsapp = LucideIcons.messageCircle;
  static const IconData email = LucideIcons.mail;

  static const IconData selected = LucideIcons.check;
  static const IconData close = LucideIcons.x;
  static const IconData show = LucideIcons.eye;
  static const IconData hide = LucideIcons.eyeOff;
  static const IconData signOut = LucideIcons.logOutDir;
  static const IconData info = LucideIcons.info;
  static const IconData error = LucideIcons.circleAlert;
  static const IconData offline = LucideIcons.wifiOff;
  static const IconData retry = LucideIcons.refreshCw;

  static const double size = 24;
  static const double sizeSmall = 20;
}
