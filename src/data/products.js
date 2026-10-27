// The six product collections (owner confirmed on 26 Oct 2026 that the studio supplies all
// six). Each has a detail page at /[lang]/products/[slug]. The text only describes what the
// collection covers, in the owner's own card wording: no brands, prices, specifications or
// projects that haven't been confirmed. Photos are the website's own.
//
// Pages are noindex until the owner has reviewed this text (see the page's metadata).

export const PRODUCTS = [
  {
    slug: "doors-windows",
    photo: "/assets/hero-penthouse.jpg",
    gallery: [
      "/assets/glass-door-wardrobe-matte-handles.jpeg",
      "/assets/corner-wardrobe-glass-doors-black-handles.jpeg",
      "/assets/living-room-tv-unit-floating-shelves-curtains.jpeg",
    ],
    icon: "door",
    services: ["fit-out", "villa-renovation"],
    en: {
      title: "Door & Window",
      subtitle: "Aluminum, glass, and wooden systems built to last",
      intro:
        "Doors and windows set how a room feels: the light it gets, how quiet it is and how it opens to the outside. We supply and install aluminum, glass and wooden systems as part of your project, chosen and measured with the rest of the design.",
      offerings: [
        ["Aluminum systems", "Sliding and hinged doors and windows in aluminum frames."],
        ["Glass", "Glass doors, partitions and panels for bright, open rooms."],
        ["Wooden doors", "Interior doors finished to match your joinery and wall panels."],
        ["Measured on site", "Every opening is measured at your site before anything is made or ordered."],
      ],
    },
    ar: {
      title: "الأبواب والنوافذ",
      subtitle: "أنظمة ألمنيوم وزجاج وخشب مصممة لتدوم",
      intro:
        "تحدد الأبواب والنوافذ إحساس الغرفة: كمية الضوء، والهدوء، وانفتاحها على الخارج. نوفّر ونركّب أنظمة الألمنيوم والزجاج والخشب ضمن مشروعك، ونختارها ونقيسها مع بقية التصميم.",
      offerings: [
        ["أنظمة الألمنيوم", "أبواب ونوافذ منزلقة ومفصلية بإطارات من الألمنيوم."],
        ["الزجاج", "أبواب وفواصل وألواح زجاجية لغرف مشرقة ومفتوحة."],
        ["الأبواب الخشبية", "أبواب داخلية بتشطيبات تتناسق مع النجارة والألواح الجدارية."],
        ["قياس في الموقع", "نقيس كل فتحة في موقعك قبل تصنيع أو طلب أي شيء."],
      ],
    },
  },
  {
    slug: "surface-materials",
    photo: "/assets/luxury-living-room-stone-tv-wall-fireplace.jpeg",
    gallery: [
      "/assets/travertine-tv-wall-linear-fireplace.jpeg",
      "/assets/minimalist-living-room-fluted-wall-panel-cove-lighting.jpeg",
      "/assets/tv-wall-marble-panel-bedroom-divider.jpeg",
    ],
    icon: "surface",
    services: ["interior-design", "villa-renovation"],
    en: {
      title: "Surface Materials",
      subtitle: "Stone, tile, wall panels and decorative finishes",
      intro:
        "Floors, walls and feature surfaces carry most of a room's character. We select and install stone, tile, wall panels and decorative finishes that suit your design and how the space is used.",
      offerings: [
        ["Stone", "Stone for feature walls, TV walls, floors and counters."],
        ["Tile", "Floor and wall tiles for living areas, kitchens and bathrooms."],
        ["Wall panels", "Fluted, slatted and flat wall panels, made to fit each wall."],
        ["Decorative finishes", "Finishes that tie the materials of a room together."],
      ],
    },
    ar: {
      title: "مواد الأسطح",
      subtitle: "حجر وبلاط وألواح جدارية وتشطيبات زخرفية",
      intro:
        "تحمل الأرضيات والجدران والأسطح المميزة معظم طابع الغرفة. نختار ونركّب الحجر والبلاط والألواح الجدارية والتشطيبات الزخرفية بما يناسب تصميمك واستخدام المساحة.",
      offerings: [
        ["الحجر", "حجر للجدران المميزة وجدران التلفاز والأرضيات والأسطح."],
        ["البلاط", "بلاط للأرضيات والجدران في المعيشة والمطابخ والحمامات."],
        ["الألواح الجدارية", "ألواح مضلّعة وشرائحية ومسطحة مصنوعة على مقاس كل جدار."],
        ["التشطيبات الزخرفية", "تشطيبات تجمع مواد الغرفة في تصميم متناسق."],
      ],
    },
  },
  {
    slug: "lighting",
    photo: "/assets/modern-dining-room-pendant-lights-oak-table.jpeg",
    gallery: [
      "/assets/luxury-lounge-feature-wall-led-sconces.jpeg",
      "/assets/contemporary-living-room-wall-panelling-track-lighting.jpeg",
      "/assets/luxury-living-room-chandelier-wall-panelling.jpeg",
    ],
    icon: "lighting",
    services: ["interior-design", "fit-out"],
    en: {
      title: "Lighting Solution",
      subtitle: "Architectural and decorative lighting design",
      intro:
        "Good lighting is planned with the design, not added at the end. We plan architectural lighting built into ceilings, walls and joinery, and choose decorative lights that finish each room.",
      offerings: [
        ["Architectural lighting", "Cove, track and recessed lighting planned into ceilings and walls."],
        ["Joinery lighting", "LED lighting built into shelves, wardrobes and display units."],
        ["Decorative lights", "Pendants, chandeliers and wall lights chosen for each room."],
        ["Lighting plan", "Where each light goes, decided at the design stage."],
      ],
    },
    ar: {
      title: "حلول الإضاءة",
      subtitle: "تصميم إضاءة معمارية وزخرفية",
      intro:
        "الإضاءة الجيدة تُخطَّط مع التصميم ولا تُضاف في النهاية. نخطط الإضاءة المعمارية المدمجة في الأسقف والجدران والنجارة، ونختار وحدات إضاءة زخرفية تكمل كل غرفة.",
      offerings: [
        ["الإضاءة المعمارية", "إضاءة مخفية وعلى مسارات ومدمجة ضمن الأسقف والجدران."],
        ["إضاءة النجارة", "إضاءة LED مدمجة في الرفوف والخزائن ووحدات العرض."],
        ["الإضاءة الزخرفية", "إضاءات معلقة وثريات وإضاءات جدارية لكل غرفة."],
        ["مخطط الإضاءة", "تحديد مكان كل إضاءة في مرحلة التصميم."],
      ],
    },
  },
  {
    slug: "fixed-furniture",
    photo: "/assets/walk-in-closet-island-led-ceiling.jpeg",
    gallery: [
      "/assets/l-shaped-walk-in-closet-led-drawers.jpeg",
      "/assets/built-in-wardrobe-study-desk-wood-shelves.jpeg",
      "/assets/tv-wall-unit-led-display-shelves.jpeg",
    ],
    icon: "joinery",
    services: ["joinery", "custom-wardrobes", "kitchen-design"],
    en: {
      title: "Fixed Furniture",
      subtitle: "Custom cabinetry, wardrobes and built-in fixed furniture",
      intro:
        "Built-in furniture is made for one space only. We design and make cabinetry, wardrobes and built-in units in our own Ajman joinery factory, then install them on site.",
      offerings: [
        ["Wardrobes and walk-in closets", "Made to the room, with the inside planned around what you keep."],
        ["Kitchen cabinetry", "Kitchen units made to your layout."],
        ["TV and wall units", "Media walls, shelving and display units."],
        ["Made in our own factory", "Produced in our Ajman joinery factory and installed by our team."],
      ],
    },
    ar: {
      title: "الأثاث الثابت",
      subtitle: "خزائن مطبخ وخزائن ملابس وأثاث مدمج حسب الطلب",
      intro:
        "الأثاث المدمج يُصنع لمساحة واحدة فقط. نصمم ونصنع الخزائن ووحدات الأثاث المدمجة في مصنع النجارة الخاص بنا في عجمان، ثم نركّبها في الموقع.",
      offerings: [
        ["خزائن الملابس وغرف الملابس", "مصنوعة على مقاس الغرفة، مع تخطيط داخلي يناسب ما تحفظه."],
        ["خزائن المطبخ", "وحدات مطبخ مصنوعة حسب مخططك."],
        ["وحدات التلفاز والجدران", "جدران تلفاز ورفوف ووحدات عرض."],
        ["من مصنعنا", "تُصنع في مصنع النجارة الخاص بنا في عجمان ويركّبها فريقنا."],
      ],
    },
  },
  {
    slug: "movable-furniture",
    photo: "/assets/dining-table.jpeg",
    gallery: [
      "/assets/living-room-curved-sofa-wood-slat-wall.jpeg",
      "/assets/living-room-wood-slat-wall-lounge-seating.jpeg",
      "/assets/modern-living-room-beige-sofa-curtain-wall-panels.jpeg",
    ],
    icon: "furniture",
    services: ["residential-interior-design", "interior-design"],
    en: {
      title: "Movable Furniture",
      subtitle: "Custom furniture and furniture matching solutions",
      intro:
        "Sofas, tables and chairs finish a room. We make custom pieces and match furniture to your design, so the furniture and the built-in work look like one scheme.",
      offerings: [
        ["Custom furniture", "Sofas, tables and seating made to your sizes and finishes."],
        ["Furniture matching", "Pieces chosen to match the design, colours and materials."],
        ["Dining and living", "Dining tables, chairs, sofas and side tables."],
        ["One scheme", "Planned with the joinery and finishes at the design stage."],
      ],
    },
    ar: {
      title: "الأثاث المتنقل",
      subtitle: "أثاث حسب الطلب وحلول تنسيق الأثاث",
      intro:
        "الأرائك والطاولات والكراسي تكمل الغرفة. نصنع قطعاً حسب الطلب وننسّق الأثاث مع تصميمك، ليبدو الأثاث والأعمال المدمجة كتصميم واحد.",
      offerings: [
        ["أثاث حسب الطلب", "أرائك وطاولات ومقاعد بمقاساتك وتشطيباتك."],
        ["تنسيق الأثاث", "قطع مختارة تتناسق مع التصميم والألوان والمواد."],
        ["الطعام والمعيشة", "طاولات طعام وكراسٍ وأرائك وطاولات جانبية."],
        ["تصميم واحد", "يُخطَّط مع النجارة والتشطيبات في مرحلة التصميم."],
      ],
    },
  },
  {
    slug: "soft-furnishings",
    photo: "/assets/curtains-6.jpeg",
    gallery: ["/assets/curtains-1.jpeg", "/assets/curtains-3.jpeg", "/assets/somfy-curtains.jpg"],
    icon: "curtains",
    services: ["interior-design", "residential-interior-design"],
    en: {
      title: "Soft Furnishings & Decoration",
      subtitle: "Rugs, curtains, artwork, décor, and accessories",
      intro:
        "Soft furnishings and décor make a finished room feel lived in. We supply curtains, including Somfy motorized curtains, along with rugs, artwork and accessories chosen for your design.",
      offerings: [
        ["Curtains", "Sheer, blackout and layered curtains, manual or Somfy motorized."],
        ["Rugs", "Rugs sized and chosen for each room."],
        ["Artwork and décor", "Art and décor that complete the design."],
        ["Accessories", "The finishing pieces that pull a room together."],
      ],
    },
    ar: {
      title: "المفروشات والديكور",
      subtitle: "سجاد وستائر وأعمال فنية وديكور وإكسسوارات",
      intro:
        "المفروشات والديكور تجعل الغرفة المكتملة مريحة للعيش. نوفّر الستائر، ومنها ستائر سومفي الآلية، إلى جانب السجاد والأعمال الفنية والإكسسوارات المختارة لتصميمك.",
      offerings: [
        ["الستائر", "ستائر شفافة وعازلة ومتعددة الطبقات، يدوية أو آلية من سومفي."],
        ["السجاد", "سجاد بمقاسات مختارة لكل غرفة."],
        ["الأعمال الفنية والديكور", "أعمال فنية وديكور تكمل التصميم."],
        ["الإكسسوارات", "اللمسات الأخيرة التي تجمع الغرفة."],
      ],
    },
  },
];

export const productBySlug = (slug) => PRODUCTS.find((product) => product.slug === slug) || null;
