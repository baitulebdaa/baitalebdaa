import 'package:flutter/widgets.dart';
import 'package:iconsax_flutter/iconsax_flutter.dart';

/// The app's icon vocabulary, from Iconsax (owner's choice, 21 Oct 2026), via the
/// `iconsax_flutter` package. Its `_copy` names are the linear style used everywhere; the
/// plain names are bold, used only for the selected tab. Screens name icons by meaning;
/// this file decides the glyph.
///
/// Iconsax has no mirrored variants, so directional icons repeat the code point with
/// `matchTextDirection`, which flips them in Arabic.
abstract final class AppIcons {
  static const String _font = 'FlutterIconsax';
  static const String _package = 'iconsax_flutter';

  // Tabs: linear when idle, bold when selected.
  static const IconData home = Iconsax.home_2_copy;
  static const IconData homeSelected = Iconsax.home_2;
  static const IconData services = Iconsax.category_copy;
  static const IconData servicesSelected = Iconsax.category;
  static const IconData projects = Iconsax.gallery_copy;
  static const IconData projectsSelected = Iconsax.gallery;
  static const IconData book = Iconsax.calendar_add_copy;
  static const IconData bookSelected = Iconsax.calendar_add;
  static const IconData account = Iconsax.user_copy;
  static const IconData accountSelected = Iconsax.user;

  static const IconData assistant = Iconsax.magic_star_copy;
  static const IconData send = IconData(
    0xef3e,
    fontFamily: _font,
    fontPackage: _package,
    matchTextDirection: true,
  ); // Iconsax.send_2_copy
  static const IconData startOver = Iconsax.rotate_left_copy;
  static const IconData pricing = Iconsax.tag_copy;
  static const IconData survey = Iconsax.ruler_copy;
  static const IconData legal = Iconsax.document_text_copy;
  static const IconData delete = Iconsax.trash_copy;
  static const IconData external = IconData(
    0xebc2,
    fontFamily: _font,
    fontPackage: _package,
    matchTextDirection: true,
  ); // Iconsax.export_3_copy
  static const IconData location = Iconsax.location_copy;
  static const IconData time = Iconsax.clock_copy;
  static const IconData guarantee = Iconsax.shield_tick_copy;

  // Projects: save, search, filter and sort.
  static const IconData save = Iconsax.heart_copy;
  static const IconData saved = Iconsax.heart;
  static const IconData search = Iconsax.search_normal_1_copy;
  static const IconData filter = Iconsax.setting_4_copy;
  static const IconData expand = Iconsax.arrow_down_1_copy;

  // Home header and the "Why Bait Al Ebdaa" facts.
  static const IconData notifications = Iconsax.notification_copy;
  static const IconData factory = Iconsax.buildings_copy;
  static const IconData quality = Iconsax.diamonds_copy;

  // Service page: bookmark, share, and the website's four process stages.
  static const IconData bookmark = Iconsax.archive_add_copy;
  static const IconData bookmarked = Iconsax.archive_tick;
  static const IconData share = Iconsax.export_1_copy;
  static const IconData stageDiscover = Iconsax.messages_2_copy;
  static const IconData stageVisualize = Iconsax.magicpen_copy;
  static const IconData stageApprove = Iconsax.tick_square_copy;
  static const IconData stageMake = Iconsax.setting_2_copy;

  // Request: the remaining property types, project stages and info cards.
  static const IconData townhouse = Iconsax.building_3_copy;
  static const IconData penthouse = Iconsax.building_copy;
  static const IconData commercial = Iconsax.buildings_2_copy;
  static const IconData other = Iconsax.more_copy;
  static const IconData exploring = Iconsax.lamp_on_copy;
  static const IconData designing = Iconsax.edit_2_copy;
  static const IconData renovating = Iconsax.brush_copy;
  static const IconData photos = Iconsax.gallery_add_copy;
  static const IconData calendar = Iconsax.calendar_copy;

  /// Bold tick in a circle, drawn on white: the badge on a chosen tile.
  static const IconData checkBadge = Iconsax.tick_circle;
  static const IconData copy = Iconsax.copy_copy;
  static const IconData support = Iconsax.headphone_copy;

  // "What are you planning?" choices.
  static const IconData villa = Iconsax.house_copy;
  static const IconData apartment = Iconsax.building_4_copy;
  static const IconData office = Iconsax.briefcase_copy;
  static const IconData restaurant = Iconsax.reserve_copy;
  static const IconData retail = Iconsax.shop_copy;
  static const IconData joinery = Iconsax.rulerpen_copy;

  static const IconData settings = Iconsax.setting_2_copy;
  static const IconData language = Iconsax.language_square_copy;

  // Profile rows (owner's design, 26 Oct 2026).
  static const IconData requests = Iconsax.document_text_1_copy;
  static const IconData attachment = Iconsax.paperclip_2_copy;
  static const IconData globe = Iconsax.global_copy;
  static const IconData privacy = Iconsax.shield_tick_copy;
  static const IconData edit = Iconsax.edit_2_copy;
  static const IconData appearance = Iconsax.sun_1_copy;

  static const IconData forward = IconData(
    0xe972,
    fontFamily: _font,
    fontPackage: _package,
    matchTextDirection: true,
  ); // Iconsax.arrow_right_3_copy
  static const IconData back = IconData(
    0xe96b,
    fontFamily: _font,
    fontPackage: _package,
    matchTextDirection: true,
  ); // Iconsax.arrow_left_copy
  static const IconData proceed = IconData(
    0xe96e,
    fontFamily: _font,
    fontPackage: _package,
    matchTextDirection: true,
  ); // Iconsax.arrow_right_1_copy

  static const IconData phone = Iconsax.call_copy;
  static const IconData whatsapp = Iconsax.message_copy;
  static const IconData email = Iconsax.sms_copy;

  static const IconData selected = Iconsax.tick_circle_copy;

  /// A plus; [AppBarButton] turns it 45° into ×, which Iconsax lacks.
  static const IconData close = Iconsax.add_copy;
  static const IconData show = Iconsax.eye_copy;
  static const IconData password = Iconsax.lock_copy;

  /// Apple's own mark, filled, for "Continue with Apple".
  static const IconData apple = Iconsax.apple;
  static const IconData hide = Iconsax.eye_slash_copy;
  static const IconData signOut = IconData(
    0xed3e,
    fontFamily: _font,
    fontPackage: _package,
    matchTextDirection: true,
  ); // Iconsax.logout_copy
  static const IconData info = Iconsax.info_circle_copy;
  static const IconData error = Iconsax.danger_copy;
  static const IconData offline = Iconsax.cloud_cross_copy;
  static const IconData retry = Iconsax.refresh_copy;

  static const double size = 24;
  static const double sizeSmall = 20;
}
