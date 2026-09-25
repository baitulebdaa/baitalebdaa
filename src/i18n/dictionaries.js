export const dictionaries = {
  en: {
    nav: {
      projects: "Projects",
      services: "Services",
      menu: "Menu",
      close: "Close",
      startProject: "WhatsApp Now",
      navigate: "Navigate",
      studio: "Studio",
      studioLocation: "Ajman, United Arab Emirates\nServing Dubai & Abu Dhabi",
      newEnquiries: "New enquiries",
      menuNote: "Design · Approvals · Fit-out · Joinery",
      contactInfo: "Contact Info",
      socialMedia: "Social Media",
      phoneLabel: "UAE",
      getFreeQuote: "Get Free Quote",
      media: "Media"
    },
    menuItems: ["Home", "Services", "Projects", "Process", "Pricing", "Contact"],
    hero: {
      slides: [
        { eyebrow: "Dubai · Abu Dhabi", title: "UAE Turnkey Fit-out & Custom Architectural Joinery", body: "From first sketch to final handover, we design, approve and manufacture singular spaces for modern Gulf living." },
        { eyebrow: "Workplace", title: "Executive Workplaces Designed with Quiet Authority & Flow", body: "High-performing workplaces shaped around your people, brand and commercial priorities." },
        { eyebrow: "Private residences", title: "Luxury Private Villas Resolved to the Last Detail", body: "Architecture, bespoke joinery and intelligent furnishing brought together by one accountable team." }
      ],
      viewWork: "View selected work"
    },
    servicesSection: {
      micro: "One team, end to end",
      title: "From imagination\nto installation.",
      lede: "A single, exacting team owns every decision—from the first photorealistic render to the final aligned drawer.",
      discuss: "Discuss your project",
      items: [
        { number: "01", title: "Design & 3D visualization", body: "Photorealistic CAD renders let you approve materials, lighting and spatial decisions before site work begins." },
        { number: "02", title: "Fit-out & approvals", body: "Detailed coordination, authority submissions, Dubai Municipality approvals and NOCs managed end to end." },
        { number: "03", title: "Bespoke manufacturing", body: "Custom kitchens, wardrobes, wall systems and furniture produced in our own 15,000 sq ft facility." }
      ]
    },
    studioSection: {
      micro: "Our studio",
      title: "Built here.\nFitted beautifully.",
      intro: "Our 15,000 sq ft manufacturing facility gives designers and makers the freedom to resolve custom details in-house—without compromising the concept on site.",
      seeHow: "See how we work",
      facts: [
        { strong: "15,000", span: "sq ft manufacturing facility" },
        { strong: "1:1", span: "design-to-production control" },
        { strong: "UAE", span: "Dubai & Abu Dhabi delivery" }
      ]
    },
    factorySection: {
      badge: "15,000 sq ft Manufacturing Facility",
      title: "Our In-House Joinery Factory",
      description: "Unlike contractors who outsource wood fabrication, Bait Al Ebdaa owns and operates a state-of-the-art 15,000 sq ft manufacturing facility in Ajman with 50+ master carpenters.",
      features: [
        { title: "German CNC Machinery", desc: "Sub-millimeter cutting accuracy" },
        { title: "European Walnut & Oak", desc: "Direct timber import from Italy" }
      ],
      cta: "Schedule Guided Factory Visit",
      captionLocation: "Jurf Industrial 2, Ajman",
      captionBadge: "Live Production"
    },
    sectorsSection: {
      micro: "Spaces we shape",
      title: "Designed around\nhow life unfolds.",
      explore: "Explore this sector",
      items: [
        { label: "Luxury villas", body: "Private homes composed around natural materials, generous proportions and the rituals of everyday life." },
        { label: "Executive offices", body: "Assured workplaces where acoustic comfort, brand presence and operational flow work as one." },
        { label: "Smart living", body: "Discreet Somfy motorized curtains and integrated controls designed into the architecture from day one." }
      ]
    },
    projectsSection: {
      micro: "Our Projects",
      title: "Transforming Spaces",
      viewAll: "View All Projects",
      // Placeholder/dummy entries below (added at owner's request, pending real project
      // details) carry a `slug` so their cards link to a real detail page instead of
      // looping back to this listing — see projectDetailPage.projects for the dummy
      // content, and [lang]/our-projects/[slug]/page.jsx, which noindexes them until
      // real data replaces the dummy content.
      items: [
        { title: "Dubai Hills Estate Luxury Villa", place: "Dubai Hills Estate, Dubai", subtitle: "Turnkey Fit-out & European Joinery", slug: "dubai-hills-estate-villa" },
        { title: "Palm Jumeirah Beachfront Penthouse", place: "Palm Jumeirah, Dubai", subtitle: "Somfy Motorized Drapes & Italian Panelling", slug: "palm-jumeirah-penthouse" },
        { title: "Downtown Dubai Tech HQ Office", place: "Downtown Dubai, Dubai", subtitle: "Commercial Fit-out & DM Approval", slug: "downtown-dubai-tech-hq" },
        { title: "Al Barari Eco-Villa Suite", place: "Al Barari, Dubai", subtitle: "Bespoke Walnut Wardrobes & Soft Furnishings", slug: "al-barari-eco-villa" },
        { title: "Saadiyat Island Villa Residence", place: "Saadiyat Island, Abu Dhabi", subtitle: "Full Turnkey Architecture & Joinery", slug: "saadiyat-island-villa" },
        { title: "Confidential Government Authority Headquarters", place: "Academic City, Dubai", subtitle: "Interior Fit-Out + MEP Works", slug: "government-authority" }
      ]
    },
    capabilitiesSection: {
      micro: "Expertise",
      title: "Built to Execute",
      items: [
        ["Architectural Joinery", "From complex acoustic panelling to bespoke hospitality millwork, our Ajman facility delivers flawless precision at scale."],
        ["Turnkey Fit-out", "End-to-end delivery of luxury interiors. We manage the MEP, civil works, and finishes so you can focus on your business."],
        ["FF&E Procurement", "Global sourcing networks that bring you exclusive materials and furnishings without the typical supply chain delays."]
      ]
    },
    comparisonSection: {
      micro: "Transparent Package Comparison",
      title: "Scope Packages & Features Matrix",
      featureLabel: "Fit-out Service Feature",
      standardLabel: "Standard Fit-out",
      vipLabel: "Bait Al Ebdaa VIP Turnkey",
      rows: [
        ["Photorealistic 3D Architectural Renders", "Basic 2D Floorplan", "99.4% Accuracy 3D Renders"],
        ["Dubai Municipality (DM NOC) Submissions", "Client Handled", "100% Managed by Bait Al Ebdaa"],
        ["15,000 sq ft Joinery Manufacturing", "Outsourced Subcontractors", "In-House Ajman German CNC Production"],
        ["Somfy Motorized Drapery Integration", "Manual Tracks Only", "Somfy Glydea Ultra Smart Motorization"],
        ["Workmanship Warranty Package", "1 Year Basic", "5-Year Complete Warranty"]
      ]
    },
    estimatorSection: {
      kicker: "Instant Cost Estimator",
      title: "Turnkey Investment Estimator Engine",
      subtitle: "Select your property size and scope to calculate your estimated turnkey fit-out investment in your chosen currency.",
      propertySize: "Property Size (sq ft)",
      scope: "Scope Selection",
      scopeOptions: ["Full Turnkey", "Factory Joinery", "Somfy Curtains"],
      location: "Emirate Location",
      locationOptions: ["Dubai (DM & DDA)", "Abu Dhabi (ADM & DCD)"],
      estimatedInvestment: "ESTIMATED INVESTMENT",
      calculatedValue: "Calculated Contract Value",
      inclusions: [
        "3D Architectural CAD Package",
        "100% Municipality NOC",
        "15k sqft Ajman Joinery Production",
        "5-Year Workmanship Guarantee"
      ],
      bookSurvey: "Book Survey & Formal Quote"
    },
    processSection: {
      micro: "A controlled journey",
      title: "Four stages.\nOne accountable team.",
      items: [
        ["Discover", "Site review, brief, priorities and investment alignment."],
        ["Visualize", "Plans, materials and photorealistic 3D CAD renders."],
        ["Approve", "Technical packages, Dubai Municipality and NOC coordination."],
        ["Make", "Joinery production, fit-out, installation and considered handover."]
      ]
    },
    faqSection: {
      kicker: "Got questions?",
      title: "Frequently Asked Questions",
      subtitle: "Everything you need to know about planning and delivering your interior project with Bait Al Ebdaa.",
      items: [
        {
          q: "Does Bait Al Ebdaa handle Dubai Municipality & Civil Defense approvals?",
          a: "Yes, absolutely. We take full ownership of the entire approvals process on your behalf. Our dedicated in-house compliance team meticulously manages all end-to-end NOC permits, complex structural drawings, and final completion certificates directly with Dubai Municipality (DM), Dubai Development Authority (DDA), Trakhees, Abu Dhabi Municipality (ADM), and Civil Defense, ensuring complete regulatory peace of mind and strict adherence to timelines."
        },
        {
          q: "What materials and wood types are used in your 15,000 sq ft Ajman factory?",
          a: "We exclusively source and utilize high-quality, sustainable materials tailored to luxury environments. This includes premium solid hardwoods, meticulously matched custom veneers, and resilient engineered woods sourced from trusted global suppliers. Our state-of-the-art Ajman manufacturing facility is fully equipped with advanced machinery to handle incredibly complex acoustic panelling and bespoke hospitality millwork, ensuring flawless precision, durability, and a truly premium finish."
        },
        {
          q: "Are motorized curtains compatible with smart home automation systems?",
          a: "Yes, our custom Somfy motorized curtains are engineered to integrate seamlessly with all major smart home automation ecosystems, including Lutron, Crestron, and KNX. This intelligent integration allows you to effortlessly control natural lighting, privacy, and ambiance throughout your property using intuitive smartphone applications, dedicated wall panels, or convenient voice commands, ultimately elevating both the comfort and the modern sophistication of your space."
        },
        {
          q: "What is the typical turnkey execution timeline for a villa in Dubai?",
          a: "A typical full turnkey execution for a luxury villa in Dubai generally ranges from three to six months. However, this timeline is highly dependent on the overall scope, spatial scale, and the specific, intricate customization requirements of your unique project. During the initial planning phase, we provide a highly detailed, transparent timeline that outlines every critical milestone from concept to final handover."
        },
        {
          q: "Is the initial site survey and 3D layout consultation free of charge?",
          a: "Yes, we proudly offer a complimentary initial site survey and a comprehensive in-person consultation to deeply understand your unique spatial requirements. Our experienced design experts will thoroughly discuss your vision, evaluate the site conditions, and provide a preliminary conceptual overview. Once we have aligned on the initial direction, we then proceed to develop the highly detailed, photorealistic 3D CAD rendering packages."
        }
      ]
    },
    furnitureMaintenancePage: {
      metaTitle: "Furniture Maintenance & Care Dubai | Bait Al Ebdaa",
      metaDescription: "Aftercare, repair and maintenance for custom joinery and furniture, backed by the same in-house Ajman factory and 5-year workmanship guarantee behind every Bait Al Ebdaa fit-out.",
      navTitle: "Furniture Maintenance & Care",
      pageTitle: "Furniture Maintenance & Care",
      kicker: "Aftercare",
      intro: "Custom joinery and furniture need periodic care to keep hinges, finishes and mechanisms working the way they did on handover day. Because we manufacture everything in-house at our Ajman factory, our aftercare team knows the exact materials, hardware and finishes used in your project — and any joinery we originally built is covered by our 5-year workmanship guarantee.",
      whatWeOffer: "What's Included",
      offeringsTitle: "Maintenance & Aftercare Services",
      offeringsSubtitle: "Practical upkeep for the joinery, furniture and fittings we manufacture and install — assessed on site before any work begins.",
      included: [
        "Hardware and mechanism servicing — hinges, soft-close drawer runners, wardrobe sliders and cabinet mechanisms adjusted or replaced",
        "Finish touch-ups — veneer, lacquer and paint finishes refreshed to match the original specification",
        "Motorized curtain and track servicing for Somfy-fitted installations",
        "Warranty-covered repairs on joinery originally manufactured by Bait Al Ebdaa",
        "On-site assessment and written condition report before any work is scoped",
        "Care guidance for owners — day-to-day upkeep that protects your warranty"
      ],
      faqHeading: "Furniture Maintenance: FAQs",
      faqs: [
        { q: "Do you maintain furniture you didn't originally manufacture?", a: "We assess this case by case during the site visit. We can generally service comparable custom joinery and fitted furniture, but priority and warranty coverage apply to pieces we manufactured ourselves." },
        { q: "Is maintenance covered under warranty?", a: "Joinery we manufacture and install carries our 5-year workmanship guarantee. Repairs falling under that guarantee are covered; general wear-and-tear servicing outside the warranty period is quoted after assessment." },
        { q: "What does a maintenance visit include?", a: "A technician inspects the piece on site, checks hardware and finishes, and provides a written report and scope before any repair work is carried out." },
        { q: "How do I book a maintenance visit?", a: "Send us your project details and location on WhatsApp or through the contact form, and we'll arrange a site assessment." }
      ],
      ctaTitle: "Book a Furniture Maintenance Assessment",
      relatedServices: "Related services",
      relatedJoinery: "Architectural joinery",
      relatedWardrobes: "Custom wardrobes"
    },
    aboutPage: {
      navTitle: "About Us",
      pageTitle: "About Bait Al Ebdaa",
      metaTitle: "About Us | Bait Al Ebdaa",
      metaDescription: "Bait Al Ebdaa is a turnkey interior design, fit-out and architectural joinery company based in Ajman, serving Dubai and Abu Dhabi with in-house manufacturing.",
      intro: "Bait Al Ebdaa is a turnkey interior design, fit-out and architectural joinery company serving Dubai and Abu Dhabi. We deliver villa and office interiors from initial concept through to final handover, with design, approvals, joinery manufacturing and installation coordinated by one accountable team rather than a chain of separate subcontractors.",
      sections: {
        whatWeDo: { title: "What We Do", body: "Our work covers interior design, turnkey fit-out, office fit-out, villa and apartment renovation, and custom architectural joinery — including bespoke wardrobes and kitchens. Each project is scoped, designed and quoted individually; nothing is templated." },
        manufacturing: { title: "In-House Manufacturing", body: "We operate a 15,000 sq ft joinery factory at Jurf Industrial 2, Ajman, equipped with CNC machinery and staffed by 50+ carpenters, using European timber and veneers. Producing joinery ourselves — rather than outsourcing it — is what lets us offer a 5-year workmanship guarantee on the pieces we manufacture and install." },
        serviceAreas: { title: "Service Areas", body: "We deliver projects across Dubai and Abu Dhabi. Our registered address and manufacturing facility are in Ajman." },
        approvals: { title: "Authority Approvals", body: "Our in-house compliance team manages submissions and follow-up with Dubai Municipality (DM), the Dubai Development Authority (DDA), Trakhees, Abu Dhabi Municipality (DMT) and Civil Defense directly, so clients aren't required to navigate authority paperwork themselves." },
        projects: { title: "Project Experience", body: "Recent work includes a confidential government authority headquarters in Dubai Academic City — a 50,500 sq ft interior fit-out and MEP project spanning three floors. See our projects page for details." },
      },
      companyDetailsTitle: "Company Details",
      companyDetails: {
        name: "Legal name",
        nameValue: "Bait Al Ebdaa",
        address: "Registered address",
        addressValue: "Showroom No. 052004009, Jurf Industrial 2, Ajman, UAE",
        phone: "Phone",
        email: "Email",
      },
      projectsCta: "View our projects",
      contactCta: "Get in touch",
    },
    privacyPolicyPage: {
      navTitle: "Privacy Policy",
      pageTitle: "Privacy Policy",
      metaTitle: "Privacy Policy | Bait Al Ebdaa",
      metaDescription: "How Bait Al Ebdaa collects, uses and protects the personal information submitted through our website forms and contact channels.",
      lastUpdated: "Last updated: 24 September 2026",
      intro: "This page explains what information Bait Al Ebdaa ('we', 'us') collects when you use www.baitalebdaa.com, and how we use it. We collect only what's needed to respond to your enquiry.",
      sections: [
        {
          title: "Information We Collect",
          body: "We collect information you submit directly through our contact form, quote request form and careers form: your name, email address, phone number, and any details you choose to share about your project, company or job application (including a CV file, for careers applications). We do not require you to create an account, and we do not collect payment information on this site.",
        },
        {
          title: "How We Use Your Information",
          body: "Form submissions are sent as an email directly to our team using Resend, a transactional email service that processes your message on our behalf in order to deliver it to us — Resend's own handling of that data is governed by Resend's privacy policy (resend.com/legal/privacy-policy), not this one. We use the information you submit only to respond to your enquiry, quote request or job application, and we do not sell, rent or share it with third parties for marketing purposes.",
        },
        {
          title: "WhatsApp",
          body: "WhatsApp buttons on this site open a chat in WhatsApp with a pre-filled message. This opens WhatsApp's own service, which has its own privacy policy; we do not control how WhatsApp itself handles your data. Any details you send us over WhatsApp are used the same way as a website enquiry: to respond to you.",
        },
        {
          title: "Cookies and Analytics",
          body: "This site does not currently set tracking or advertising cookies, and does not use browser local storage. If we enable Google Analytics in the future, this policy will be updated to describe the cookies it sets and how to opt out.",
        },
        {
          title: "Data Retention",
          body: "We retain enquiry and application emails only for as long as reasonably necessary for the purpose for which they were received and for legitimate business or legal requirements. You may contact us to request deletion of your personal information, subject to any retention we are required or permitted to maintain. We don't control, and haven't verified, how long Resend itself retains data while it's processing your message on our behalf — see Resend's privacy policy for that.",
        },
        {
          title: "Your Rights",
          body: "You can ask us at any time what information we hold about you, ask us to correct it, or request deletion of it, subject to any retention we are required or permitted to maintain, by emailing info@baitalebdaa.com.",
        },
        {
          title: "Contact",
          body: "Questions about this policy can be sent to info@baitalebdaa.com or Showroom No. 052004009, Jurf Industrial 2, Ajman, UAE.",
        },
      ],
      legalReviewNote: "This policy describes the site's actual current data handling and has not been reviewed by a lawyer. Confirm it meets any UAE PDPL or other regulatory requirements that apply to your business before relying on it.",
    },
    termsPage: {
      navTitle: "Terms & Conditions",
      pageTitle: "Terms & Conditions",
      metaTitle: "Terms & Conditions | Bait Al Ebdaa",
      metaDescription: "The terms governing use of the Bait Al Ebdaa website, including how quotes, the cost estimator and enquiry forms work.",
      lastUpdated: "Last updated: 25 September 2026",
      intro: "These terms govern your use of www.baitalebdaa.com ('the site'). By browsing the site or submitting a form, you agree to them. They cover the website only — a separate signed agreement governs any actual fit-out or joinery project.",
      sections: [
        {
          title: "Website Content",
          body: "Text, photography, renders, pricing tables and project descriptions on this site are provided for general information about Bait Al Ebdaa's services and are updated periodically. We take reasonable care to keep them accurate but do not guarantee that every figure or image reflects the current state of every project or price at all times.",
        },
        {
          title: "Pricing, the Cost Estimator & Quotations",
          body: "Prices shown on the Pricing page and figures produced by the on-site cost estimator are indicative starting guidance based on typical scope and size, not a binding quotation. A firm price is issued only after a site survey and is confirmed in a written quotation. Submitting a form, using the estimator or messaging us on WhatsApp is an enquiry, not an order — no project work begins, and no contract is formed, until both parties sign a project agreement setting out the final scope, price, payment schedule and timeline.",
        },
        {
          title: "Project Agreements",
          body: "Any fit-out, joinery or design project itself — including payment terms, delivery timelines, variations, cancellation and the workmanship warranty referenced on this site — is governed by that separate signed project agreement, not by these website terms. Where the two conflict for an active project, the signed agreement controls.",
        },
        {
          title: "Intellectual Property",
          body: "The site's design, text, photography and renders belong to Bait Al Ebdaa or are used under licence, and may not be reproduced without permission. Concept designs, renders or drawings prepared for a specific enquiry remain Bait Al Ebdaa's property unless the signed project agreement for that project states otherwise.",
        },
        {
          title: "Third-Party Services",
          body: "Form submissions are delivered using Resend, and WhatsApp buttons open Meta's WhatsApp service directly — each operates under its own terms and privacy policy, which we don't control. See our Privacy Policy for how we handle information you submit to us directly.",
        },
        {
          title: "Limitation of Liability",
          body: "The site and its content are provided \"as is\" for general guidance. To the extent permitted by UAE law, Bait Al Ebdaa is not liable for decisions made solely on the basis of indicative content on this site — including estimator output or displayed pricing — before a written quotation or signed project agreement is in place.",
        },
        {
          title: "Governing Law",
          body: "These terms are governed by the laws of the United Arab Emirates, and any dispute relating to the site falls under the jurisdiction of the courts of Ajman, UAE.",
        },
        {
          title: "Contact",
          body: "Questions about these terms can be sent to info@baitalebdaa.com or Showroom No. 052004009, Jurf Industrial 2, Ajman, UAE.",
        },
      ],
      legalReviewNote: "These terms describe the site's actual current setup and have not been reviewed by a lawyer. Have them reviewed against UAE consumer-protection and contract law before relying on them commercially.",
    },
    contactPage: {
      navTitle: "Contact Us",
      pageTitle: "Let's Talk About Your Project",
      metaTitle: "Contact Us | Bait Al Ebdaa",
      metaDescription: "Get in touch with Bait Al Ebdaa for interior design, turnkey fit-out and joinery projects across the UAE — request a quote, discuss procurement, or apply for a role."
    },
    pricingPage: {
      navTitle: "Pricing",
      pageTitle: "Clear Starting Prices. Bespoke Final Results.",
      metaTitle: "Interior Design & Fit-Out Prices Dubai | Bait Al Ebdaa",
      metaDescription: "Indicative fit-out, interior design, villa renovation and joinery cost in Dubai — plus starting prices for wardrobes, kitchen cabinets and Somfy curtains.",
      heroBody: "See indicative fit-out cost, joinery cost and interior design cost guidance for villas, offices and custom furniture in Dubai and Abu Dhabi. Every project is individually measured, specified and quoted.",
      heroPrimaryCta: "Get My Project Estimate",
      heroSecondaryCta: "Discuss on WhatsApp",
      heroTrust: "Complimentary initial consultation • Detailed scope • Transparent quotation",
      whatsappMessage: "Hello! I viewed your pricing page and would like an estimate for my project.",
      globalDisclaimer: "Displayed prices are starting estimates based on standard conditions and selected specifications. Final pricing is confirmed after measurements, scope review, material selection and technical assessment. Prices exclude 5% VAT, authority fees, specialist access and third-party charges unless specifically included in the quotation.",
      tableHeaders: { product: "Product / Service", price: "Starting Price" },
      items: {
        "curtain-pinch-sheer": "Pinch-pleat sheer curtains",
        "curtain-wave-sheer": "Wave sheer curtains",
        "curtain-pinch-blackout": "Pinch-pleat blackout curtains",
        "curtain-wave-blackout": "Wave blackout curtains",
        "curtain-pinch-layered": "Pinch-pleat layered curtains",
        "curtain-wave-layered": "Wave layered curtains",
        "somfy-sheer": "Somfy motorized sheer curtains",
        "somfy-blackout": "Somfy motorized blackout curtains",
        "somfy-layered": "Somfy motorized layered curtains",
        "somfy-hub": "Somfy smart hub / app integration",
        "somfy-remote": "Additional Somfy remote / channel",
        "wardrobe-laminate": "Laminate wardrobe",
        "wardrobe-lacquer": "Premium lacquer / veneer wardrobe",
        "wardrobe-luxury": "Luxury wardrobe with premium hardware",
        "media-basic": "Basic TV console / media wall",
        "media-led": "Media wall with storage and LED lighting",
        "media-stone": "Luxury stone-and-joinery media wall",
        "bed-headboard": "Custom upholstered bed / headboard",
        "dressing-table": "Dressing table / vanity",
        "sofa-3seat": "Custom three-seat sofa",
        "banquette": "Banquette / built-in seating",
        "kitchen-laminate": "Laminate kitchen joinery",
        "kitchen-lacquer": "Lacquer / veneer kitchen",
        "kitchen-premium": "Premium kitchen joinery",
        "design-consultation": "Initial consultation",
        "design-survey": "Site survey (within Dubai, subject to project suitability)",
        "design-single-room": "Single-room concept + photorealistic 3D",
        "design-apartment": "Apartment design package",
        "design-townhouse": "Townhouse design package",
        "design-villa": "Villa design package",
        "design-office": "Office design package",
        "design-drawings": "Detailed working drawings",
        "design-material-schedule": "Material specification schedule",
        "villa-selective": "Selective interior upgrade",
        "villa-townhouse": "Townhouse turnkey interiors",
        "villa-standard": "Standard villa fit-out",
        "villa-luxury": "Luxury villa fit-out",
        "villa-bespoke": "Fully bespoke villa interiors",
        "office-essential": "Essential office fit-out",
        "office-premium": "Premium office fit-out",
        "office-luxury": "Executive / luxury office fit-out",
        "approval-noc": "Landlord / community NOC coordination",
        "approval-dm": "Dubai Municipality approval support",
        "approval-office-package": "Complete office fit-out approval package",
        "approval-civil-defence": "Civil Defence / MEP / specialist authority coordination"
      },
      groups: {
        curtainsManual: {
          kicker: "Curtains",
          title: "Manual Curtains",
          subtitle: "Starting prices for a standard window up to approximately 2m × 3m. Final pricing depends on exact dimensions, fabric and finish selected.",
          cta: "Book Free Measurement"
        },
        curtainsSomfy: {
          kicker: "Somfy Automation",
          title: "Somfy Motorized Curtains",
          subtitle: "The indicated package can include a genuine Somfy motor, compatible motorized track, selected fabric range, professional installation, initial programming and applicable written product/workmanship warranty.",
          note: "Electrical points, concealed wiring, premium fabrics, specialist access and advanced smart-home integration are quoted separately.",
          cta: "Configure My Curtains"
        },
        joineryWardrobes: {
          kicker: "Custom Joinery",
          title: "Wardrobes",
          subtitle: "Custom wardrobes price per linear metre, manufactured in our own Ajman factory.",
          cta: "Estimate My Wardrobe"
        },
        joineryMedia: {
          kicker: "Custom Joinery",
          title: "Media Walls & Custom Furniture",
          subtitle: "Starting prices for bespoke media walls, beds, seating and other custom furniture in Dubai.",
          cta: "Share Wall Dimensions"
        },
        joineryKitchens: {
          kicker: "Custom Joinery",
          title: "Kitchens",
          subtitle: "Custom kitchen and kitchen cabinets priced per linear metre of kitchen joinery in Dubai.",
          cta: "Request Kitchen Estimate"
        },
        design: {
          kicker: "Design & 3D Visualization",
          title: "Design & Visualization Packages",
          subtitle: "Indicative interior design cost and interior design price ranges, from a complimentary initial consultation to full villa design packages, delivered with photorealistic 3D visuals before production begins.",
          note: "Eligible design fees may be credited toward the project when Bait Al Ebdaa is appointed for the complete fit-out, subject to contract value and agreed terms.",
          cta: "Book Design Consultation"
        },
        villa: {
          kicker: "Villa Interiors",
          title: "Villa & Residential Fit-Out",
          subtitle: "Indicative villa renovation cost and villa renovation price ranges for villa and residential interiors in Dubai.",
          note: "Final budgets depend on property condition, project size, structural or MEP changes, kitchens, bathrooms, joinery, furniture and finish level.",
          cta: "Plan My Villa Project"
        },
        office: {
          kicker: "Office Fit-Out",
          title: "Office Fit-Out Budget Ranges",
          subtitle: "Indicative office fit-out cost and office fit-out price ranges for commercial projects in Dubai.",
          note: "Budget ranges vary according to base-build condition, MEP scope, authority requirements, joinery, furniture, technology and selected finishes.",
          cta: "Request Fit-Out Budget"
        },
        approvals: {
          kicker: "Approvals",
          title: "Approvals & NOC Coordination",
          subtitle: "End-to-end coordination with landlords, communities and government authorities across the UAE.",
          note: "Authority, developer, consultant and statutory fees are charged separately at actual cost. Requirements and timelines remain subject to the relevant authority.",
          cta: "Discuss Approval Requirements"
        }
      },
      hardwareTitle: "Hardware is specified in three levels:",
      hardwareLevels: ["Standard soft-close hardware", "Premium — Häfele / Hettich or specified equivalent", "Luxury — Blum or specified equivalent"],
      joineryDisclaimer: "Final joinery pricing depends on dimensions, internal configuration, substrate, finish, hardware, accessories and installation conditions.",
      finalCta: {
        title: "Book a Complimentary Site Visit",
        body: "Receive measurements, material recommendations and a detailed quotation with no hidden scope items.",
        button: "Book a Site Visit"
      }
    },
    quoteModal: {
      title: "Get Your Free Quote",
      subtitle: "Bait Al Ebdaa // 24-Hour Response Guarantee",
      ratingLabel: "Official Google Rating",
      reviewsText: "4.9/5 (180+ Reviews)",
      fullName: "Full Name",
      fullNamePlaceholder: "e.g. Sheikh Mohammed Al Qasimi",
      email: "Email Address",
      emailPlaceholder: "e.g. client@domain.ae",
      phone: "UAE Phone Number",
      propertySize: "Property Size (sq ft)",
      serviceType: "Service Type",
      serviceOptions: ["Turnkey Fit-out (Civil+MEP)", "Custom Joinery Only", "Somfy Motorized Curtains", "All of the Above"],
      locationLabel: "Location Emirate",
      locationOptions: [
        "Dubai (DM, DDA, Trakhees permits)",
        "Abu Dhabi (ADM & DCD permits)",
        "Sharjah",
        "Ajman",
        "Ras Al Khaimah",
        "Fujairah",
        "Umm Al Quwain",
      ],
      descriptionLabel: "Project Description (Optional)",
      descriptionPlaceholder: "Tell us your vision...",
      submit: "Get My Quote",
      whatsappCta: "Or chat on WhatsApp",
      success: "Thank you — we'll respond within 24 hours.",
      sending: "Sending...",
      error: "Something went wrong. Please try WhatsApp instead.",
    },
    contactSection: {
      mainHeading: "Let's Talk",
      heading: "I'm applying for",
      types: ["Project Form", "Procurement Form", "Careers"],
      placeholders: {
        fullName: "Full Name",
        email: "Email",
        mobile: "Mobile Number",
        selectCountry: "Select Country",
        applyingFor: "Applying for",
        linkedin: "LinkedIn URL",
        message: "Write Your Message Here",
        jobTitle: "Job Title",
        phone: "Phone",
        companyName: "Company Name",
        companyDomain: "Company Domain Name (URL)",
        companyPhone: "Company Phone",
        companyEmail: "Company Email",
        companyLinkedin: "LinkedIn Company Page",
        companyAddress: "Company Street Address",
        city: "City",
        region: "Region",
        description: "Description",
        emailAddress: "Email address",
        phoneNumber: "Phone number",
        whatToCreate: "What would you like to create?"
      },
      countries: ["UAE", "KSA", "Other"],
      locations: ["Dubai", "Abu Dhabi", "Other UAE"],
      contactPerson: "Contact Person Details",
      companyDetails: "Company Details",
      uploadCV: "Upload CV",
      sendRequest: "Send Request",
      success: "Thank you—your request has been sent.",
      sending: "Sending...",
      error: "Something went wrong. Please try again or WhatsApp us."
    },
    footer: {
      newsletter: "Newsletter",
      headline: "Sign up to receive\nlatest news & updates!",
      emailLabel: "Email",
      emailPlaceholder: "Enter your email",
      subscribe: "Subscribe",
      subscribing: "Subscribing…",
      subscribed: "Thanks — you're subscribed.",
      subscribeError: "Something went wrong. Please try again.",
      explore: "Explore",
      exploreLinks: ["Home", "About Us", "Projects", "Services", "Pricing", "Contact"],
      importantLinks: "Important Links",
      importantLinksItems: ["Privacy Policy", "Terms & Conditions"],
      contactInfo: "Contact Info",
      salesLabel: "Sales:",
      loc: "Jurf Industrial 2, Ajman, UAE:",
      backToTop: "Back to the top",
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
      copy: "Copyright © 2026 Bait Al Ebdaa. All Rights Reserved."
    },
    ourProjectsPage: {
      metaTitle: "Our Projects | Bait Al Ebdaa",
      metaDescription: "Browse Bait Al Ebdaa's portfolio of villa, office and hospitality interior fit-out projects across the UAE, from concept to handover.",
      home: "Home",
      ourProjects: "Our Projects",
      explorePortfolio: "Explore Our Project Portfolio",
      projectsPortfolio: "Projects Portfolio",
      redefiningHeading: "Redefining Spaces With Bespoke Interior Fit-Out Solutions",
      redefiningBody: "From fine dining establishments to commercial offices, residential properties, and entertainment venues, we approach each project with passion and precision, ensuring seamless execution and exceptional outcomes tailored to your specific needs.",
      filters: {
        all: "All Projects",
        hospitality: "Hospitality",
        fnb: "Food And Beverage",
        commercial: "Commercial",
        residential: "Residential"
      }
    },
    projectDetailPage: {
      projectOverview: "Project Overview",
      stayConnected: "Stay Connected",
      labels: {
        location: "Location",
        sector: "Sector",
        size: "Size",
        year: "Year",
        service: "Service",
        scope: "Scope of Work",
        relatedServices: "Related services"
      },
      // DUMMY/PLACEHOLDER project content below (all entries except "government-authority",
      // the one real published project) — added at the owner's explicit request as
      // placeholder case studies pending real project data. These are noindexed (see
      // [lang]/our-projects/[slug]/page.jsx) so they aren't presented to Google as real
      // evidence. Replace with real location/size/year/scope/description/photos and
      // remove the noindex override once real project data is available.
      projects: {
        "government-authority": {
          title: "Confidential Government Authority Headquarters, Dubai Academic City",
          description: "Interior fit-out and MEP works for a confidential government authority headquarters in Dubai Academic City — 50,500 sq ft across three floors.\n\nThe design takes a minimalist, home-like approach, using soft beige, brown and white tones and natural textures to put employee well-being first.\n\nDistinct department zones encourage interaction and knowledge sharing, while reinforcing each team's identity, values and objectives.\n\nErgonomic workstations, sit-stand desks, privacy-enhancing elements and noise-control solutions support both focus and flexibility.\n\nA variety of collaboration spaces suit different work styles, encouraging creativity, inclusivity and effective teamwork.",
          metadata: {
            location: "Academic City, Dubai, UAE",
            sector: "Commercial",
            size: "50,500 sq ft",
            year: "2026",
            service: "Interior Fit-Out + MEP Works"
          },
          scope: [
            "Interior fit-out across three floors (50,500 sq ft)",
            "MEP works",
            "Department zones designed around each team's objectives",
            "Ergonomic workstations and sit-stand desks",
            "Privacy and noise-control solutions",
            "Collaboration spaces for different work styles"
          ],
          related: [
            { label: "Office fit-out in Dubai", href: "/en/office-fit-out/dubai" },
            { label: "Turnkey fit-out services in Dubai", href: "/en/fit-out/dubai" }
          ],
          images: [
            "/assets/project-office.jpg",
            "/assets/hero-penthouse.jpg",
            "/assets/project-villa.jpg",
            "/assets/cad-render.jpg"
          ]
        },
        "dubai-hills-estate-villa": {
          title: "Dubai Hills Estate Luxury Villa",
          description: "A full turnkey villa fit-out in Dubai Hills Estate — interior design, civil works and European walnut joinery delivered by one accountable team.\n\nThe brief called for a warm, contemporary palette. Fitted wardrobes, a media wall and bespoke dressing units were manufactured in European walnut at our Ajman factory and installed on site, keeping joinery and finishes consistent from room to room.\n\nMotorized curtain tracks and layered lighting were coordinated with the joinery installation, giving the family a home that looks resolved and works smoothly from handover day.",
          metadata: {
            location: "Dubai Hills Estate, Dubai, UAE",
            sector: "Residential",
            size: "8,200 sq ft",
            year: "2026",
            service: "Turnkey Fit-Out + Custom Joinery"
          },
          scope: [
            "Interior design and space planning",
            "Civil and finishing works",
            "Custom European walnut joinery — wardrobes, media wall and dressing units",
            "Motorized curtains and layered lighting coordination",
            "Snagging and final handover"
          ],
          related: [
            { label: "Turnkey fit-out in Dubai", href: "/en/fit-out/dubai" },
            { label: "Custom architectural joinery", href: "/en/joinery/dubai" },
            { label: "Interior design in Dubai", href: "/en/interior-design/dubai" }
          ],
          images: [
            "/assets/project-villa.jpg",
            "/assets/bed-1.jpeg",
            "/assets/dressing-unit-1.jpeg",
            "/assets/curtains-1.jpeg"
          ]
        },
        "palm-jumeirah-penthouse": {
          title: "Palm Jumeirah Beachfront Penthouse",
          description: "A beachfront penthouse on Palm Jumeirah, redesigned around uninterrupted sea views with motorized Somfy curtains and in-house joinery.\n\nA calm, neutral material palette lets the views lead. Motorized Somfy drapery manages light and privacy without breaking the sightlines to the Gulf, while Italian panelling unifies the living and dining spaces.\n\nJoinery — from the media wall to the dressing room — was manufactured in-house and installed to suit the penthouse's existing structural constraints.",
          metadata: {
            location: "Palm Jumeirah, Dubai, UAE",
            sector: "Residential",
            size: "5,400 sq ft",
            year: "2026",
            service: "Interior Design + Somfy Motorized Curtains"
          },
          scope: [
            "Interior design concept and material palette",
            "Somfy motorized curtains and tracks",
            "Italian wall panelling",
            "Custom joinery — media wall and dressing room",
            "Installation coordinated around the existing structure"
          ],
          related: [
            { label: "Interior design in Dubai", href: "/en/interior-design/dubai" },
            { label: "Custom architectural joinery", href: "/en/joinery/dubai" }
          ],
          images: [
            "/assets/hero-penthouse.jpg",
            "/assets/curtains-2.jpeg",
            "/assets/bed-2.jpeg",
            "/assets/dining-table.jpeg"
          ]
        },
        "downtown-dubai-tech-hq": {
          title: "Downtown Dubai Tech HQ Office",
          description: "A Downtown Dubai office fit-out for a technology company, covering MEP coordination, Dubai Municipality approvals and full interior delivery.\n\nOpen-plan workstations, meeting rooms and a reception area were finished with custom joinery panelling, with cable management and acoustic treatment designed in from the start rather than added later.\n\nBait Al Ebdaa's in-house design and fit-out team delivered the project end to end, including all authority submissions.",
          metadata: {
            location: "Downtown Dubai, Dubai, UAE",
            sector: "Commercial",
            size: "12,000 sq ft",
            year: "2026",
            service: "Office Fit-Out + MEP Works"
          },
          scope: [
            "Space planning for open-plan workstations and meeting rooms",
            "MEP coordination",
            "Dubai Municipality approvals and authority submissions",
            "Custom joinery panelling for reception and meeting rooms",
            "Acoustic treatment and cable management"
          ],
          related: [
            { label: "Office fit-out in Dubai", href: "/en/office-fit-out/dubai" },
            { label: "Turnkey fit-out services in Dubai", href: "/en/fit-out/dubai" }
          ],
          images: [
            "/assets/project-office.jpg",
            "/assets/tv-unit-1.jpeg",
            "/assets/cad-render.jpg",
            "/assets/cabinet-joinery.jpeg"
          ]
        },
        "al-barari-eco-villa": {
          title: "Al Barari Eco-Villa Suite",
          description: "A villa suite renovation in Al Barari with bespoke walnut wardrobes and soft furnishings, in a natural palette that suits the community's green setting.\n\nExisting joinery was replaced with custom-manufactured wardrobes and dressing units matched to the villa's natural materials.\n\nNew curtain tracks and layered window treatments complete the suite, adding softness and light control.",
          metadata: {
            location: "Al Barari, Dubai, UAE",
            sector: "Residential",
            size: "6,800 sq ft",
            year: "2025",
            service: "Villa Renovation + Custom Wardrobes"
          },
          scope: [
            "Removal of existing joinery",
            "Custom walnut wardrobes and dressing units",
            "Curtain tracks and layered window treatments",
            "Soft furnishings"
          ],
          related: [
            { label: "Villa renovation in Dubai", href: "/en/villa-renovation/dubai" },
            { label: "Custom wardrobes in Dubai", href: "/en/custom-wardrobes/dubai" }
          ],
          images: [
            "/assets/project-villa.jpg",
            "/assets/dressing-unit-2.jpeg",
            "/assets/bed-3.jpeg",
            "/assets/curtains-3.jpeg"
          ]
        },
        "saadiyat-island-villa": {
          title: "Saadiyat Island Villa Residence",
          description: "A full turnkey villa on Saadiyat Island, Abu Dhabi — interior design, civil coordination and architectural joinery from concept to handover.\n\nThe media wall, fitted wardrobes and dressing suite were manufactured at our Ajman factory and installed on site.\n\nThe design was developed around Abu Dhabi Municipality (DMT) approval requirements from the outset.",
          metadata: {
            location: "Saadiyat Island, Abu Dhabi, UAE",
            sector: "Residential",
            size: "7,500 sq ft",
            year: "2026",
            service: "Turnkey Fit-Out + Architectural Joinery"
          },
          scope: [
            "Interior design and civil coordination",
            "Architectural joinery — media wall, fitted wardrobes and dressing suite",
            "Abu Dhabi Municipality (DMT) approval coordination",
            "On-site installation and handover"
          ],
          related: [
            { label: "Turnkey fit-out in Abu Dhabi", href: "/en/fit-out/abu-dhabi" },
            { label: "Custom architectural joinery in Abu Dhabi", href: "/en/joinery/abu-dhabi" },
            { label: "Interior design in Abu Dhabi", href: "/en/interior-design/abu-dhabi" }
          ],
          images: [
            "/assets/project-villa.jpg",
            "/assets/tv-unit-2.jpeg",
            "/assets/dressing-unit-3.jpeg",
            "/assets/bed-4.jpeg"
          ]
        }
      }
    },
    mediaPage: {
      metaTitle: "Media & Insights | Bait Al Ebdaa",
      metaDescription: "News, project updates and insights from Bait Al Ebdaa's interior design and fit-out studio in the UAE.",
      newsAndInsights: "News & Insights",
      latestNewsAndInsights: "Latest News & Insights",
      readMore: "Read More ↗",
      viewMore: "View More ↗",
      featuredArticle: {
        title: "The Ultimate Guide to Luxury Interior Fit-out in Dubai",
        description: "Discover the essential steps, costs, and timeline for a seamless turnkey interior fit-out for your villa or office in Dubai. Learn how we handle DM approvals and deliver European standards.",
        slug: "luxury-interior-fit-out-guide-dubai",
        link: "/en/media/luxury-interior-fit-out-guide-dubai",
        image: "/assets/hero-penthouse.jpg",
        date: "September 25, 2026",
        author: "Bait Al Ebdaa Design Team",
        content: `<p>Embarking on a <strong>luxury interior fit-out in Dubai</strong> requires more than just a vision; it demands precision, local regulatory expertise, and a flawless execution strategy. Whether you are transforming a high-end villa in Dubai Hills, Emirates Hills or Palm Jumeirah, or building out a corporate headquarters in Downtown Dubai or DIFC, understanding how the fit-out process actually works — not just what it costs — is what separates a smooth six-to-ten-week project from a stressful, budget-blown ordeal that drags on for months. This guide walks through everything a homeowner, facilities manager or business owner needs to know before signing a contract with a <strong>turnkey fit-out contractor in Dubai</strong>.</p>

<h2>What "Luxury Fit-out" Actually Means</h2>
<p>The word "luxury" gets used loosely in Dubai's interiors market, so it's worth being precise. A luxury interior fit-out is not simply an expensive finish schedule. It is the combination of four things working together: an accurate 3D design that is approved before a single wall is touched, mechanical and electrical (MEP) engineering that is planned rather than patched in afterwards, architectural joinery built to millimeter tolerances rather than assembled from flat-pack components, and a single accountable team that owns the outcome from first sketch to final handover. Remove any one of those four elements and the result — no matter how expensive the marble or how large the chandelier — reads as a renovation, not a genuine <strong>luxury interior fit-out</strong>.</p>

<h2>Turnkey vs. Traditional Multi-Contractor Fit-out</h2>
<p>Most fit-out projects in the UAE still happen the traditional way: the client hires an interior designer, who hands drawings to a separate contractor, who then subcontracts joinery, MEP, flooring and curtains to different specialist vendors. Every handoff between those parties is a place where measurements drift, timelines slip, and — critically — nobody is fully accountable when something goes wrong.</p>
<p>A <strong>turnkey fit-out contractor</strong> collapses that chain into one point of contact. At <a href="/en/our-services">Bait Al Ebdaa</a>, design, MEP engineering, authority approvals, joinery manufacturing and on-site installation sit under one roof, which means:</p>
<ul>
<li style='margin-bottom: 10px;'><strong>One contract, one warranty.</strong> There is no finger-pointing between a designer and a contractor when a drawer doesn't close properly — one team is responsible for the entire outcome.</li>
<li style='margin-bottom: 10px;'><strong>Faster decision cycles.</strong> A design change can be checked against manufacturing capacity and MEP routing in the same conversation, rather than a week of emails between three companies.</li>
<li style='margin-bottom: 10px;'><strong>Realistic timelines.</strong> Because the same team plans and builds, published schedules (typically 6–10 weeks for an apartment or villa, longer for large offices) reflect actual production capacity rather than optimistic guesswork.</li>
</ul>

<h2>The Fit-out Process, Step by Step</h2>
<p>Understanding the sequence helps you evaluate any contractor's proposal, not just ours. A properly run <strong>villa or office fit-out in Dubai</strong> moves through five stages — see our full <a href="/en/process">process breakdown</a> for the detailed timeline of each:</p>
<h3>1. Discovery and Photorealistic 3D Design</h3>
<p>A site survey captures exact dimensions, existing MEP points, and structural constraints. From there, a design team produces photorealistic CAD renders so you can approve materials, lighting temperature, joinery finishes and furniture layout before any physical work begins. This step alone removes the single biggest cause of budget overruns: mid-construction changes of mind, which are far cheaper to make on a screen than on site.</p>
<h3>2. Authority Approvals</h3>
<p>Covered in detail below — this is the step DIY renovators and undercapitalized contractors most often underestimate.</p>
<h3>3. Joinery and Furniture Manufacturing</h3>
<p>While approvals are being processed, custom joinery — kitchens, wardrobes, TV units, vanities, bespoke doors — moves into production. Manufacturing in parallel with the approvals process, rather than waiting for a permit before starting production, is one of the main ways an in-house factory shortens the overall timeline.</p>
<h3>4. Site Works and MEP Installation</h3>
<p>Civil works, electrical first-fix and second-fix, plumbing, HVAC modifications and flooring happen in a sequenced program, with daily progress tracked so nothing is signed off out of order.</p>
<h3>5. Installation and Handover</h3>
<p>Manufactured joinery is installed, Somfy motorized curtain systems are commissioned, snagging is completed, and the space is handed over with warranty documentation.</p>

<h2>Navigating Dubai Municipality and Civil Defense Approvals</h2>
<p>One of the biggest hurdles in any UAE interior project is obtaining the necessary No Objection Certificates (NOCs) from the relevant authority — Dubai Municipality (DM), the Dubai Development Authority (DDA) for free zones, Trakhees for certain master-developer communities, or Dubai Civil Defense (DCD) for fire and life-safety systems. Skipping this step, or hiring a contractor who does, is not a shortcut — it is a liability that can result in forced removal of completed work, fines, or an inability to sell or lease the unit later with an unpermitted layout on file.</p>
<p>What actually gets submitted depends on scope: a cosmetic refresh (paint, flooring, movable furniture) typically needs no permit, but any partition work, MEP modification, or structural change requires drawings stamped and submitted through the correct authority before work starts. A contractor who tells you "we'll sort the paperwork after we start" is telling you they don't have an in-house authority-liaison function — which most fit-out companies genuinely don't. A dedicated liaison team that works directly with DM, DDA, Trakhees and DCD, rather than outsourcing approvals to a third-party consultant, is one of the clearest signals of a contractor set up to run projects, not just style them.</p>

<h2>Villa Fit-out vs. Office Fit-out: Key Differences</h2>
<p>The two project types share a process but diverge sharply in priorities:</p>
<ul>
<li style='margin-bottom: 10px;'><strong>Villa fit-out</strong> in communities like Arabian Ranches, Dubai Hills Estate or Al Barari centers on livability — kitchen workflow, walk-in wardrobe capacity, bathroom joinery, and how natural light and Somfy-motorized drapery interact across the day. Approvals typically route through the master developer or DM depending on the community.</li>
<li style='margin-bottom: 10px;'><strong>Office fit-out</strong> in Downtown Dubai, DIFC or Business Bay centers on acoustic performance, cable management for IT infrastructure, brand expression in reception and boardroom areas, and DCD fire-and-life-safety compliance for partitions and ceiling work. Office projects also tend to run on tighter deadlines tied to a lease-commencement date, which makes an accurate, honestly-quoted timeline more important than a slightly lower price.</li>
</ul>

<h2>Cost Factors and Budgeting for a Luxury Fit-out</h2>
<p>Three variables drive the majority of the cost difference between two fit-outs of the same square footage: the scope of MEP work (a full mechanical/electrical rework costs far more than a cosmetic layer over existing services), the amount of bespoke joinery versus loose furniture, and the finish tier chosen for surfaces like stone, veneer and drapery fabric. Rather than quote a single blended rate that hides which of those three is driving the number, we publish indicative starting prices by category on our <a href="/en/pricing">pricing page</a>, and use an interactive size-and-scope calculator so you can see how square footage, project scope and emirate affect the estimate before requesting a firm, survey-based quotation. Treat any online estimate — ours included — as a planning figure; the binding number always follows a site survey.</p>

<h2>Materials and Craftsmanship: Why In-House Joinery Matters</h2>
<p>Luxury is in the details, and the details live in the joinery. A significant share of what a client perceives as "quality" in a finished space — how a soft-close drawer feels, whether a veneer grain matches across a run of wardrobe doors, how flush a handle-less kitchen front sits — comes down to manufacturing tolerance, not design intent. By producing bespoke furniture and architectural joinery in a dedicated 15,000 sq ft facility in Ajman using German CNC machinery, a contractor keeps tight quality control over that tolerance and eliminates the international shipping delays and customs uncertainty that come with importing joinery from Europe or Southeast Asia. It also means a snag — a drawer that needs re-hanging, a hinge that needs adjusting — can be resolved with a factory visit rather than a six-week reorder.</p>

<h2>Choosing the Right Fit-out Contractor in Dubai: A Checklist</h2>
<p>Before signing with any contractor for a <strong>luxury interior fit-out in Dubai</strong>, verify the following:</p>
<ul>
<li style='margin-bottom: 10px;'>Do they hold an in-house design, MEP and joinery-manufacturing capability, or do they subcontract each discipline separately?</li>
<li style='margin-bottom: 10px;'>Can they name the specific authority (DM, DDA, Trakhees, DCD) your project needs to clear, and do they manage that submission directly?</li>
<li style='margin-bottom: 10px;'>Will you see photorealistic 3D renders and approve them before construction starts, or only a 2D floorplan?</li>
<li style='margin-bottom: 10px;'>What workmanship warranty is offered in writing, and what does it actually cover?</li>
<li style='margin-bottom: 10px;'>Can they show a completed project of comparable scope — our <a href="/en/our-projects">portfolio</a> includes a confidential government authority headquarters, private villas and corporate offices across Dubai and Abu Dhabi.</li>
</ul>

<h2>Common Mistakes to Avoid</h2>
<p>The most expensive mistakes in a fit-out project are rarely about the finishes chosen — they're about sequencing and accountability. Starting site works before authority approval is secured, approving a 2D floorplan without seeing a 3D render of how finishes and lighting actually interact, splitting joinery and MEP between separate vendors with no single point of accountability, and accepting a verbal estimate as a fixed price are the four mistakes that account for most of the delays and disputes we're asked to resolve or take over mid-project.</p>

<h2>A Week-by-Week View of a Typical Villa Fit-out</h2>
<p>Published timelines mean little without knowing what actually happens inside them, so it's worth breaking a typical 8-week villa fit-out into its real phases rather than treating it as one undifferentiated block of "construction."</p>
<h3>Weeks 1–2: Survey, Design and Approval Submission</h3>
<p>A detailed site survey is followed by 3D design development and client sign-off. In parallel, drawings are prepared and submitted to the relevant authority. This is the stage most projects rush — and the stage that, when rushed, causes the most downstream delay.</p>
<h3>Weeks 2–4: Approvals Processing and Early Manufacturing</h3>
<p>While the authority reviews submitted drawings (timelines vary by authority and submission complexity), joinery manufacturing for approved, non-structural elements — kitchen carcasses, wardrobe frames — can often begin, since these don't depend on the permit itself, only on the design being locked.</p>
<h3>Weeks 4–7: Site Works, MEP and Installation</h3>
<p>Once approval is granted, civil, electrical and plumbing works proceed on-site in sequence, with manufactured joinery arriving for installation as each area becomes ready to receive it.</p>
<h3>Weeks 7–8: Snagging, Commissioning and Handover</h3>
<p>Motorized systems are commissioned, a full snagging walkthrough is completed with the client, and warranty documentation is issued at handover.</p>
<p>Office fit-outs follow a similar structure but typically run longer for equivalent square footage, since commercial MEP (structured cabling, HVAC zoning, fire-and-life-safety systems) is usually more extensive than in a residential villa.</p>

<h2>Sustainability and Energy Efficiency Considerations</h2>
<p>Sustainability has moved from a nice-to-have to a genuine factor in how UAE fit-outs are specified, driven partly by Dubai's own green building direction and partly by client demand. Practical levers that make a measurable difference without inflating budget significantly include specifying LED lighting throughout rather than halogen, integrating motorized shading (Somfy systems) to reduce solar heat gain and the resulting air-conditioning load, sourcing joinery timber and board from certified sustainable suppliers, and specifying low-VOC paints and adhesives, which also meaningfully improves indoor air quality during and after the fit-out. None of these require a fundamentally different design approach — they're specification decisions made at the design stage, which is one more reason that stage deserves real time and attention rather than being rushed to get to construction sooner.</p>

<h2>Working With an Interior Designer vs. Going Direct to a Turnkey Contractor</h2>
<p>Clients sometimes assume a turnkey fit-out contractor and an independent interior designer are competing options — in practice, the two work well together, and which route makes sense depends on the project. Engaging an independent designer first suits clients who want a highly personalized creative direction and are prepared to manage the additional coordination layer between designer and contractor. Going directly to a turnkey contractor with in-house design capability suits clients who prioritize a single accountable timeline and want to move from concept to handover without a separate design-then-tender phase. Many Bait Al Ebdaa projects also work in a hybrid mode: an external designer sets the creative brief and material palette, while our in-house team handles MEP engineering, authority approvals, joinery manufacturing and installation — the coordination overhead of a fully split model without losing the client's chosen design voice.</p>

<h2>Design Trends Shaping Luxury Interiors in Dubai and Abu Dhabi</h2>
<p>Several material and layout trends have become consistent requests across recent <strong>luxury interior fit-out</strong> projects in the UAE. Warm, tactile material palettes — fluted timber panelling, honed (rather than polished) natural stone, and bouclé or linen-weave upholstery — have largely displaced the high-gloss, heavily mirrored aesthetic that dominated a decade ago. Handle-less, push-to-open joinery continues to be the default expectation in new kitchens and wardrobes rather than a premium upgrade. Home wellness spaces — a dedicated space for a home gym, sauna or plunge pool — have moved from a rare request to a standard line item in villa briefs above a certain size. And centralized smart-home control, tying together Somfy motorized drapery, lighting scenes and climate zoning into a single interface, is now expected in the majority of new villa fit-out briefs rather than treated as an optional add-on.</p>

<h2>Dubai vs. Abu Dhabi: Regional Considerations for Fit-out Projects</h2>
<p>While the fit-out process is broadly similar across the UAE's two largest emirates, a few practical differences are worth knowing before budgeting or scheduling a project. Approval authorities differ — Dubai Municipality, DDA and Trakhees cover different Dubai communities depending on the master developer, while Abu Dhabi projects typically route through the Abu Dhabi Municipality (ADM) or the Department of Culture and Tourism for certain zones, and Abu Dhabi Civil Defense (ADCD) for fire-and-life-safety sign-off — meaning a contractor experienced in Dubai submissions isn't automatically equipped for an Abu Dhabi project without equivalent local authority relationships. Material and labor logistics also differ slightly, since Abu Dhabi projects sit a longer transit distance from an Ajman-based manufacturing facility, which is typically reflected as a modest location multiplier in indicative pricing rather than a fundamentally different cost structure — see our <a href="/en/pricing">pricing page</a> for how this is broken out by emirate.</p>

<h2>Two Real Scenarios: Villa vs. Office Budgeting</h2>
<p>To make the cost factors above concrete, consider two illustrative scenarios drawn from typical project patterns. A 4,500 sq ft villa in Arabian Ranches with a full turnkey scope — new kitchen and wardrobe joinery throughout, MEP refresh, motorized drapery in the main living areas — sits toward the higher end of the residential scope spectrum because of the joinery volume and the number of individually specified rooms. A 4,500 sq ft open-plan office fit-out in Business Bay with a comparable "full turnkey" scope but less joinery volume (a reception desk, a boardroom table surround, some storage joinery) and more MEP-heavy work (structured cabling, HVAC zoning, partition walls) can land in a similar overall range but through a very different cost breakdown — proportionally more MEP and less joinery. This is exactly why an estimator or pricing table needs to be read by category, not just by total square footage: two projects of identical size can have very different cost drivers depending on scope.</p>

<h2>Frequently Asked Questions</h2>
<h3>How long does a luxury villa fit-out take in Dubai?</h3>
<p>A typical villa fit-out runs 6–10 weeks from signed design approval to handover, depending on the extent of joinery and MEP work. Larger villas or projects requiring extensive structural MEP changes can take longer — see our <a href="/en/process">process page</a> for stage-by-stage timelines.</p>
<h3>Do I need Dubai Municipality approval for an interior fit-out?</h3>
<p>Any project involving partitions, MEP modifications or structural change needs authority approval before work starts — the specific authority (DM, DDA, Trakhees or DCD) depends on your building and community. A cosmetic refresh with no partition or MEP change typically doesn't require a permit, but this should always be confirmed against your specific building rather than assumed.</p>
<h3>What's included in a turnkey fit-out quotation?</h3>
<p>A properly scoped quotation itemizes design and 3D visualization, authority approval handling, joinery manufacturing, MEP works, installation labor, and the workmanship warranty period — see our <a href="/en/pricing">pricing guide</a> for indicative ranges by category.</p>
<h3>Is custom joinery worth the extra cost over ready-made furniture?</h3>
<p>For fitted items — kitchens, wardrobes, vanities — custom joinery is built to the exact dimensions of the space, which ready-made furniture cannot match, and it materially increases resale and rental value in Dubai's luxury market. For loose furniture like dining tables or sofas, ready-made can be the more cost-effective choice.</p>
<h3>Can I stay in my villa or keep my office running during the fit-out?</h3>
<p>For partial-scope projects, yes, with a phased program. For full turnkey fit-outs involving structural MEP work, most clients relocate for the duration to avoid dust, noise and the safety complications of an occupied worksite during construction.</p>
<h3>Do I need a separate interior designer, or does a turnkey contractor handle design too?</h3>
<p>A turnkey contractor with in-house design capability — like Bait Al Ebdaa — can take a project from concept through 3D design to construction without a separate designer, though clients who already have a designer relationship can bring that creative direction in and have it executed by the in-house delivery team.</p>
<h3>What warranty should I expect after handover?</h3>
<p>A written workmanship warranty (commonly around 5 years for joinery and fit-out work) should be specified in the contract before work begins, along with what it covers — hardware failure, veneer lifting and structural joinery issues are typical inclusions.</p>
<h3>Can furniture and decor be sourced as part of the same project?</h3>
<p>Yes — many turnkey scopes extend beyond fixed joinery to loose furniture, lighting fixtures and soft furnishings sourcing, coordinated through the same design palette established at the 3D design stage so the finished space reads as a single cohesive scheme rather than fitted joinery plus separately sourced furniture that doesn't quite match.</p>
<h3>What happens if I want to make changes after construction has started?</h3>
<p>Changes after construction begins are always possible but become progressively more expensive and time-consuming the later they're requested — a joinery configuration change is inexpensive before manufacturing starts and costly after panels are already cut, which is exactly why the 3D design and shop-drawing sign-off stages exist and deserve real time before construction begins.</p>

<h3>Ready to start your project?</h3>
<p>Contact <a href="/en/contact">Bait Al Ebdaa</a> today to discuss your vision for a luxury interior space, or use our <a href="/en/pricing">cost estimator</a> to get an indicative starting figure before your site survey.</p>`
      },
      articles: [
        {
          title: "The Impact of Bespoke Joinery on Modern UAE Homes",
          slug: "bespoke-architectural-joinery-uae",
          link: "/en/media/bespoke-architectural-joinery-uae",
          description: "Why bespoke architectural joinery — custom kitchens, wardrobes and millwork built in Dubai and Abu Dhabi — defines luxury in modern UAE homes, and how in-house manufacturing changes the outcome.",
          image: "/assets/cabinet-joinery.jpeg",
          date: "September 10, 2026",
          author: "Bait Al Ebdaa Manufacturing Team",
          content: `<p><strong>Bespoke architectural joinery</strong> is the defining element of true luxury in modern UAE homes. From custom-built walk-in wardrobes to acoustic wood panelling, expertly crafted millwork transforms a standard property into a distinctive, high-value space in a way that loose, imported furniture simply cannot replicate. This guide explains what architectural joinery actually is, why it matters so much in the UAE market specifically, and what separates joinery that lasts fifteen years from joinery that starts failing within two.</p>

<h2>What Is Architectural Joinery?</h2>
<p>Unlike loose furniture — a sofa or dining table you could theoretically take with you when you move — architectural joinery refers to timber items that are built into the structure of a building. This includes fitted kitchens, walk-in wardrobe systems, vanity units, intricate staircases, built-in TV and media walls, home office cabinetry, and specialized wall claddings and acoustic panelling. In the UAE's high-end real estate market, custom joinery is effectively non-negotiable for achieving a premium finish, because a room's proportions, door placements, window reveals and service risers are never quite standard — off-the-shelf cabinetry either leaves awkward gaps or requires the room to be compromised around it, whereas <strong>custom joinery in Dubai</strong> and Abu Dhabi is measured and manufactured to fit the exact space.</p>

<h2>Why Joinery Quality Matters More in the UAE Than Almost Anywhere Else</h2>
<p>Two features of the UAE's environment make joinery quality a much bigger differentiator here than in, say, temperate Europe. The first is climate: sustained high heat and fluctuating indoor/outdoor humidity put real stress on timber, veneers, adhesives and hardware, so joinery that isn't engineered for this climate visibly fails faster — doors warp, veneer lifts at the edges, and soft-close mechanisms stiffen. The second is market expectation: the UAE's luxury residential and hospitality market has trained buyers and tenants to expect European-standard finishes, so joinery that would pass unnoticed in a mid-market property elsewhere reads as a shortfall here. Together, these two facts mean the gap between good and mediocre joinery shows up faster and matters more in Dubai and Abu Dhabi than in most other markets.</p>

<h2>Precision Manufacturing: Why In-House Production Changes the Outcome</h2>
<p>At Bait Al Ebdaa, custom joinery for Dubai and Abu Dhabi projects is manufactured in-house at a dedicated 15,000 sq ft facility in Ajman, using German CNC machinery and sustainably sourced European timber. In-house production — as opposed to outsourcing to a third-party carpentry subcontractor, which is how many "design-only" interior firms actually deliver joinery — matters for three concrete reasons:</p>
<ul>
<li style='margin-bottom: 10px;'><strong>Perfect fit:</strong> Laser-measured templates taken directly from the finished site (not from the original architectural drawings, which rarely match as-built reality exactly) ensure millimeter-perfect installation, with consistent reveals and gaps across every door and drawer front.</li>
<li style='margin-bottom: 10px;'><strong>Premium, consistent finishes:</strong> From high-gloss polyurethane lacquer to natural wood veneers and matte thermofoil, dedicated finishing booths with controlled spray environments deliver a flawless, uniform sheen across an entire run of cabinetry — something very difficult to achieve with finishing done on-site.</li>
<li style='margin-bottom: 10px;'><strong>Faster problem-solving:</strong> If a panel is damaged in transit or a measurement needs adjusting mid-installation, an in-house factory can produce a replacement in days. A subcontracted joinery supplier working through an intermediary can add weeks to that same fix.</li>
</ul>

<h2>What Separates Good Joinery From Great Joinery</h2>
<p>Several details distinguish joinery built to last from joinery that looks fine on handover day but degrades within a year or two:</p>
<h3>Substrate and Core Material</h3>
<p>Moisture-resistant (MR) or marine-grade MDF and plywood cores resist the UAE's humidity swings far better than standard-grade board, particularly in kitchens, bathrooms and any joinery near a balcony or window with frequent air-conditioning cycling.</p>
<h3>Edge Banding and Sealing</h3>
<p>Exposed board edges are where moisture first penetrates a panel. Properly sealed, tightly bonded edge banding — especially on cut-outs for hardware and services — is one of the most overlooked but most important details in humid-climate joinery.</p>
<h3>Hardware Specification</h3>
<p>Soft-close hinges and runners rated for high-cycle, humid-environment use (rather than generic imported hardware) determine whether drawers still glide smoothly after three years of daily use in air-conditioned interiors.</p>
<h3>Veneer and Grain Matching</h3>
<p>On a run of wardrobe or kitchen doors using natural wood veneer, grain-matching across panels — so the timber pattern flows continuously rather than jumping between adjacent doors — is a manufacturing discipline that separates a considered joinery package from a rushed one.</p>

<h2>Where Bespoke Joinery Delivers the Most Value</h2>
<ul>
<li style='margin-bottom: 10px;'><strong>Kitchens:</strong> Handle-less, soft-close cabinetry with integrated appliance panels remains the single highest-impact joinery investment in a UAE villa or apartment.</li>
<li style='margin-bottom: 10px;'><strong>Walk-in wardrobes:</strong> Custom internal configurations — drawer-to-hanging ratios, jewellery trays, shoe racking — that match how a specific household actually dresses, rather than a generic layout.</li>
<li style='margin-bottom: 10px;'><strong>TV and media walls:</strong> Cable management, ventilation for AV equipment, and acoustic considerations built into the joinery from the design stage rather than retrofitted.</li>
<li style='margin-bottom: 10px;'><strong>Home offices:</strong> Increasingly requested since 2023, with integrated cable routing, printer storage and video-call-appropriate backdrop panelling.</li>
</ul>

<h2>Bespoke Joinery and Property Value</h2>
<p>Beyond daily livability, investing in bespoke joinery has a measurable effect on resale and rental positioning in Dubai's luxury market, where listing photography and viewings routinely foreground kitchen and wardrobe quality. Agents and appraisers in the villa and premium apartment segment consistently point to fitted joinery quality as one of the fastest ways a buyer or tenant distinguishes a genuinely renovated property from one with a surface-level refresh, often ahead of more visible factors like wall color or lighting fixtures, precisely because joinery quality is harder to fake with a quick cosmetic refresh.</p>

<h2>The Design Process, From Consultation to Manufacturing</h2>
<p>Bespoke joinery isn't ordered off a catalog — it moves through a defined design sequence, and understanding it helps set realistic expectations for timeline and involvement.</p>
<h3>1. Consultation and Brief</h3>
<p>An initial discussion establishes how the space is actually used — how a household dresses and stores clothing for a wardrobe project, or how a kitchen is used for cooking versus entertaining — since joinery configured around real usage patterns outperforms joinery configured around generic assumptions every time.</p>
<h3>2. Site Measurement</h3>
<p>Laser measurement of the as-built space, not the original architectural drawings, since real-world construction tolerances mean walls, floors and ceilings are rarely perfectly true — a discrepancy of even a few millimeters matters enormously in fitted joinery.</p>
<h3>3. 3D Design and Material Selection</h3>
<p>Photorealistic renders let a client see finish, handle hardware, internal configuration and lighting interaction before committing, with material samples (veneer, laminate, stone) reviewed physically alongside the digital render.</p>
<h3>4. Shop Drawings and Sign-off</h3>
<p>Detailed manufacturing drawings — including every internal division, hinge position and cable cut-out — are issued for final client approval before cutting begins, since this is the last point at which a change is inexpensive.</p>
<h3>5. Manufacturing and Quality Control</h3>
<p>CNC-cut panels move through edge-banding, finishing and hardware-fitting stages, with quality checks at each stage rather than only at final inspection.</p>
<h3>6. Installation</h3>
<p>Site installation by the same team responsible for manufacturing, which shortens the feedback loop if any on-site adjustment is needed.</p>

<h2>Comparing Joinery Styles for UAE Homes</h2>
<p>Three broad joinery aesthetics dominate the current Dubai and Abu Dhabi luxury market, and the right choice depends on the property's overall design language rather than trend alone:</p>
<ul>
<li style='margin-bottom: 10px;'><strong>Modern handle-less:</strong> Push-to-open or integrated channel-pull mechanisms create a minimalist, seamless facade — currently the dominant style in new-build villas and apartments across Dubai.</li>
<li style='margin-bottom: 10px;'><strong>Classic and transitional:</strong> Shaker-style panelling, visible hardware and natural wood veneers suit villas with a more traditional or Mediterranean architectural language, particularly in established communities like Emirates Hills and Jumeirah.</li>
<li style='margin-bottom: 10px;'><strong>Mixed-material contemporary:</strong> Combining matte lacquer, natural stone inlays and brushed metal detailing, popular in larger statement kitchens and media walls where the joinery itself functions as a design centerpiece rather than a background element.</li>
</ul>

<h2>What Drives the Cost of Bespoke Joinery</h2>
<p>Joinery pricing varies more than most clients expect for what looks like a similar finished product, and the variance comes down to a small number of factors: the complexity of internal configuration (a wardrobe with extensive internal drawer and accessory fittings costs meaningfully more than open hanging space), the finish tier (natural veneer and high-gloss lacquer sit above laminate and matte thermofoil), hardware specification (soft-close, push-to-open and motorized elements each add cost over basic hinges and runners), and linear meterage — simply, the total run length of cabinetry being manufactured. Indicative starting prices by joinery category are published on our <a href="/en/pricing">pricing page</a>, with a firm quotation following site measurement.</p>

<h2>Sustainability in Joinery Manufacturing</h2>
<p>Sourcing timber and board from certified sustainable suppliers, minimizing offcut waste through optimized CNC nesting software, and using low-VOC adhesives and lacquers are all specification choices available at the manufacturing stage without materially changing cost or lead time — worth raising explicitly with any joinery supplier during the consultation stage if sustainability is a priority for the project.</p>

<h2>Joinery for Every Room: A Closer Look</h2>
<h3>Bathrooms and Powder Rooms</h3>
<p>Vanity units in wet areas face the most concentrated moisture exposure of any joinery in a home, which makes fully sealed, moisture-resistant board and waterproof-rated finishes non-negotiable rather than optional upgrades. Integrated stone or composite countertops with minimal seams further reduce the risk of water ingress at joints over time.</p>
<h3>Home Bars and Entertaining Spaces</h3>
<p>Increasingly requested in Dubai and Abu Dhabi villas, custom joinery for a home bar typically integrates wine storage at controlled temperature and humidity, backlit display shelving, and durable, easy-clean work surfaces — a specification set closer to a small commercial fit-out than to standard living-room furniture.</p>
<h3>Walk-in Pantries</h3>
<p>A well-configured pantry uses adjustable shelving depth matched to actual storage needs — narrow shelves for spices and cans, deeper shelving for bulk and appliance storage — designed around a household's real shopping and cooking habits rather than a generic layout.</p>
<h3>Home Offices and Study Rooms</h3>
<p>Built-in desks with integrated cable management, printer and equipment storage, and acoustic-conscious material choices have become one of the most frequently requested joinery categories since 2023, reflecting how much home-based work has become a permanent fixture of UAE villa life.</p>

<h2>Caring for a Bespoke Joinery Investment After Installation</h2>
<p>The UAE's heat and humidity mean that even the best-built joinery needs consistent aftercare to perform for its full intended lifespan. Climate-adapted materials at the manufacturing stage significantly reduce the maintenance burden, but routine care — gentle cleaning, periodic hardware lubrication, and sensible sun and moisture management — remains part of protecting the investment long-term. Our <a href="/en/furniture-maintenance-care">detailed maintenance guide</a> covers this room by room.</p>

<h2>Popular Joinery Finishes Explained</h2>
<p>Finish terminology gets thrown around loosely in consultations, so it's worth defining the main categories clearly. High-gloss polyurethane lacquer delivers a mirror-like, reflective surface that reads as strongly contemporary and shows fingerprints and dust more readily than matte alternatives, requiring more frequent light cleaning to stay looking pristine. Matte or satin lacquer offers a softer, fingerprint-resistant surface that has become the more popular choice in recent UAE projects for exactly that lower-maintenance reason. Natural wood veneer brings genuine timber grain and warmth at a lower cost and lighter weight than solid timber, while requiring the UV and moisture care outlined in our <a href="/en/furniture-maintenance-care">maintenance guide</a>. High-pressure laminate (HPL) and thermofoil finishes offer the most durable, scratch- and moisture-resistant surface at the most accessible price point, making them a common choice for high-traffic joinery like kitchen cabinetry in family households.</p>

<h2>In-House vs. Subcontracted Joinery: A Buyer's Checklist</h2>
<p>Not every company that sells "custom joinery" in Dubai actually manufactures it. Many interior design and fit-out firms design joinery in-house but subcontract manufacturing to a third-party carpentry workshop — which isn't necessarily a problem, but it does change what a client should ask before committing. Worth confirming directly: where is the joinery actually manufactured, and can that facility be visited? What happens, in writing, if a panel needs remaking after installation — whose responsibility, and on what timeline? Is the same team responsible for design, manufacturing and installation, or does accountability split between separate companies at any stage? A contractor manufacturing in-house — as Bait Al Ebdaa does at its 15,000 sq ft Ajman facility — should be able to answer all three without hesitation, and ideally invite a facility visit as part of the sales process.</p>

<h2>Color, Texture and Smart-Home Integration Trends</h2>
<p>Joinery aesthetics in Dubai and Abu Dhabi have shifted noticeably over the past few years. Warm, earthy tones — walnut, warm oak and taupe-toned laminates — have gained ground over the cooler greys and high-contrast black-and-white schemes that dominated a few years ago, reflecting a broader move toward warmer, more tactile interiors across the region. Fluted and reeded timber detailing on wardrobe fronts and media walls has become one of the most requested texture treatments in new joinery briefs, adding visual interest without the maintenance complexity of intricate carved detailing. And joinery increasingly integrates with whole-home smart systems from the design stage — wardrobe lighting on motion sensors, kitchen cabinetry with integrated charging stations, and media units designed around concealed cable routing for increasingly complex home entertainment setups — meaning the joinery designer and the smart-home integrator now need to coordinate early in the design process rather than treating automation as a late addition.</p>

<h2>Questions to Ask Before Signing a Joinery Contract</h2>
<p>Beyond the in-house versus subcontracted question above, a short list of practical questions during the consultation stage tends to surface exactly how a joinery supplier operates. Ask what board and hardware brands are specified by default, and whether those specifications can be seen in writing rather than described verbally — a supplier confident in their material quality will provide this readily. Ask how design changes after shop-drawing sign-off are priced and how long they add to the schedule, since this varies enormously between suppliers and matters more than most clients expect once a project is underway. Ask specifically about the warranty terms for hardware versus structural joinery, since these sometimes carry different coverage periods that aren't obvious from a general "warranty included" statement. And ask to see, or visit, a completed project of comparable scope and finish tier — photographs from a portfolio are useful, but an in-person or video walkthrough of installed joinery after a year or more of real household use tells a more honest story than handover-day photography alone.</p>

<h2>Frequently Asked Questions</h2>
<h3>How long does custom joinery take to manufacture?</h3>
<p>Once designs are approved, most residential joinery packages — kitchens, wardrobes, vanities — take 10–14 days to manufacture in a dedicated facility, running in parallel with site works and authority approvals rather than after them. See our <a href="/en/process">process page</a> for the full project timeline.</p>
<h3>Is bespoke joinery more expensive than ready-made cabinetry?</h3>
<p>Per linear meter, yes — but the comparison is misleading, because ready-made cabinetry rarely fits an actual room's dimensions without gap fillers or compromised layouts. Indicative joinery pricing by category is on our <a href="/en/pricing">pricing page</a>.</p>
<h3>What timber and materials work best in the UAE climate?</h3>
<p>Moisture-resistant board cores, properly sealed edge banding, and either engineered veneer or high-quality laminate finishes hold up best against heat and humidity cycling — solid natural timber alone is more vulnerable to movement without careful climate-adapted detailing.</p>
<h3>Can existing joinery be repaired instead of replaced?</h3>
<p>Often, yes — hinge and runner replacement, re-lacquering, and edge-band repair can extend the life of structurally sound joinery significantly cheaper than a full replacement; see our <a href="/en/furniture-maintenance-care">maintenance and care guide</a>.</p>
<h3>Can bespoke joinery be designed to match an existing interior?</h3>
<p>Yes — matching new joinery to an existing material palette, whether that's a specific veneer tone or an established hardware finish, is a routine part of the consultation and material-selection stage, particularly for partial renovations or single-room additions to an otherwise finished property.</p>
<h3>Does bespoke joinery come with a warranty in the UAE?</h3>
<p>Reputable joinery suppliers in Dubai and Abu Dhabi offer a written workmanship warranty — commonly around 5 years — covering hardware, structural integrity and finish defects; always confirm the specific terms and duration in writing before signing a contract rather than relying on a verbal assurance.</p>
<h3>How far in advance should joinery be ordered before a move-in date?</h3>
<p>Allowing 6–8 weeks from design sign-off to installed joinery is a realistic planning window for most residential projects, though this can extend for larger commercial scopes or highly complex custom configurations — building this into a renovation or relocation timeline early avoids the common mistake of underestimating joinery lead time relative to the rest of a fit-out.</p>
<h3>Can joinery be manufactured for a project outside Dubai and Abu Dhabi?</h3>
<p>Manufacturing capacity and delivery logistics generally extend across the UAE from a central Ajman facility, though transit time and any location-based pricing adjustment should be confirmed for projects further afield during the initial consultation.</p>
<h3>What's the difference between architectural joinery and carpentry?</h3>
<p>The terms overlap significantly, but "architectural joinery" typically implies a higher level of design integration with the building itself — items planned alongside the architectural and MEP drawings rather than added afterward — while "carpentry" is sometimes used more loosely to cover any timber-based construction or repair work, including tasks far smaller in scope than a fitted kitchen or wardrobe system.</p>
<h3>Can joinery be phased across a renovation happening room by room?</h3>
<p>Yes — phased joinery delivery, room by room or floor by floor, is common for occupied renovations where a household or business can't vacate entirely, and simply requires the design and manufacturing schedule to be planned around that sequencing from the outset rather than treated as an afterthought.</p>
<h3>Is a site visit to the Ajman manufacturing facility possible before committing?</h3>
<p>Prospective clients are welcome to visit the Ajman facility to see manufacturing quality and finishing standards firsthand before committing to a project — worth requesting during the initial consultation if seeing the process matters to your decision, alongside reviewing the material samples and hardware specifications discussed earlier in this guide.</p>

<p>Investing in bespoke joinery doesn't only elevate your daily living experience — for most owners in Dubai and Abu Dhabi's luxury segment, it measurably increases the valuation of the property itself. <a href="/en/contact">Get in touch</a> to discuss a joinery package for your home.</p>`
        },
        {
          title: "How to Maintain Custom Joinery and Furniture in Humid Climates",
          slug: "furniture-maintenance-care-humid-climate",
          link: "/en/media/furniture-maintenance-care-humid-climate",
          description: "A practical, room-by-room guide to furniture maintenance in the UAE — protecting custom joinery, wood finishes and soft furnishings from heat, humidity and UV exposure.",
          image: "/assets/dining-table.jpeg",
          date: "August 28, 2026",
          author: "Bait Al Ebdaa Aftercare Team",
          content: `<p>The UAE's demanding climate — characterized by intense heat, high UV exposure and fluctuating indoor humidity as air-conditioning cycles on and off — poses a unique challenge for luxury interiors that simply doesn't exist in temperate markets. Proper <strong>furniture maintenance in the UAE</strong> is essential to preserve the integrity and beauty of custom woodwork and soft furnishings, and the good news is that most of what protects a significant joinery investment is inexpensive, routine care rather than costly intervention. This guide covers what actually matters, room by room.</p>

<h2>Why the UAE Climate Is Uniquely Hard on Furniture</h2>
<p>Two climate factors combine to stress timber and joinery in ways most homeowners underestimate. First, the temperature and humidity swing between outdoor air (hot, often humid near the coast) and heavily air-conditioned indoor air (cool, dry) causes wood to expand and contract repeatedly — a cycle that, over years, is what causes joints to loosen and veneers to lift at the edges if the joinery wasn't built with climate-adapted sealants and moisture-resistant cores in the first place. Second, the UAE's UV intensity is significantly higher than in temperate climates for most of the year, which accelerates fading and drying-out of both wood finishes and fabric upholstery far faster than the same pieces would degrade in Europe or North America.</p>

<h2>Protecting Wood Finishes From Humidity</h2>
<p>High humidity can cause natural wood to expand, warp or crack if not properly sealed and maintained, while overly dry, heavily air-conditioned air can cause the opposite problem — shrinkage and surface cracking in solid timber elements. When crafting <strong>custom joinery in Dubai</strong> and Abu Dhabi, using climate-adapted sealants and moisture-resistant board cores from the outset materially reduces this risk, but ongoing care remains essential regardless of build quality:</p>
<ul>
<li style='margin-bottom: 10px;'><strong>Climate control:</strong> Maintain a consistent indoor temperature rather than letting AC cycle off for long periods when a property is unoccupied — large humidity and temperature swings, not stable conditions at either extreme, are what damage timber fastest. In heavily air-conditioned spaces, a dehumidifier can help balance moisture levels during humid months.</li>
<li style='margin-bottom: 10px;'><strong>Gentle, correct cleaning:</strong> Avoid harsh chemical cleaners, ammonia-based products, and abrasive cloths on wood surfaces. Use slightly damp, lint-free microfiber cloths to dust, followed by a dry cloth — never leave standing moisture on a wood surface.</li>
<li style='margin-bottom: 10px;'><strong>Direct sunlight management:</strong> UV rays fade premium veneers, natural timber and upholstery fabric noticeably within a single UAE summer if left unprotected. Motorized drapery systems such as Somfy automate sun protection during peak UV hours without requiring the household to remember to close curtains manually every afternoon.</li>
<li style='margin-bottom: 10px;'><strong>Coasters and mats:</strong> Water rings and heat marks from cups, hot dishes and damp glasses are avoidable damage — a habit worth maintaining even on sealed, high-quality finishes.</li>
</ul>

<h2>Hardware and Mechanism Upkeep</h2>
<p>Soft-close hinges, drawer runners and sliding wardrobe mechanisms require periodic lubrication to prevent stiffening caused by ambient dust combined with humidity — a light silicone-based (not oil-based, which attracts more dust) lubricant applied roughly every 12 months to hinge pivots and runner tracks keeps mechanisms operating smoothly. A comprehensive workmanship warranty — Bait Al Ebdaa provides a 5-year warranty on completed projects — should include guidance on keeping built-in mechanisms functioning flawlessly over that period, and most reputable fit-out contractors will also handle adjustment call-outs under warranty.</p>

<h2>Room-by-Room Maintenance Guide</h2>
<p>The general principles above apply everywhere, but each room in a typical UAE home carries its own specific risk profile worth understanding individually.</p>
<h3>Kitchen Joinery</h3>
<p>Wipe cabinet fronts daily with a soft, dry cloth to remove cooking residue before it bonds to lacquered or laminate finishes. Check under-sink cabinetry every few months for any sign of moisture ingress from plumbing, which is one of the most common sources of unseen joinery damage in kitchens.</p>
<h3>Wardrobes and Walk-in Closets</h3>
<p>Keep internal humidity down with silica gel packs or a small dehumidifying unit, particularly in wardrobes without ventilation, since trapped moisture in an enclosed joinery space accelerates mildew risk on both timber and stored fabric.</p>
<h3>Dining and Living Room Furniture</h3>
<p>Rotate table runners and decorative objects periodically so UV exposure and dust settling are even across a wood surface rather than concentrated, which prevents visible uneven fading over time.</p>
<h3>Outdoor-Adjacent Joinery</h3>
<p>Built-in units near sliding doors to balconies or gardens face the highest combined heat, UV and dust exposure in a property — these benefit most from motorized shading and more frequent inspection.</p>

<h2>What to Do If Damage Has Already Occurred</h2>
<p>Not every issue requires replacement. Loose hinges can usually be re-tightened or replaced without touching the panel itself; minor veneer lifting at an edge can often be re-bonded before it spreads; and surface scratches in lacquered finishes can frequently be buffed or spot-repaired rather than requiring a full refinish. A structural warping issue in solid timber, by contrast, usually does require panel replacement. When in doubt, an aftercare assessment before attempting a DIY fix prevents a repairable issue from becoming a replacement one — and acting on early-stage signs promptly is consistently cheaper than waiting until a problem becomes visible enough to be undeniable.</p>

<h2>A Seasonal Maintenance Calendar for UAE Homes</h2>
<p>Rather than treating maintenance as a single annual task, spreading it across the year according to the UAE's actual seasonal pattern catches small issues before they compound.</p>
<h3>Peak Summer (June–September)</h3>
<p>The highest heat and the heaviest, most continuous air-conditioning use of the year. Check that motorized or manual shading is actually being used consistently during peak daylight hours, and monitor for any new gaps appearing at joinery seams as materials reach their most extreme contraction from constant cooling.</p>
<h3>Transitional Months (October–November, April–May)</h3>
<p>Humidity tends to be more variable in these shoulder months. This is the ideal window for the annual hinge and runner lubrication service, since mechanisms are neither at their most humidity-swollen nor their most dried-out.</p>
<h3>Winter (December–March)</h3>
<p>Lower humidity and more natural ventilation in many households. A good window for a deeper clean of upholstery and soft furnishings, and for inspecting any joinery near frequently opened windows or doors for dust accumulation in mechanisms.</p>
<h3>Year-Round</h3>
<p>Daily dusting, prompt attention to any spilled liquid, and keeping direct sun exposure managed through drapery apply consistently regardless of season.</p>

<h2>Soft Furnishings and Upholstery Care</h2>
<p>Wood joinery gets most of the attention in maintenance discussions, but fabric and leather upholstery face the same UV and humidity pressures. Rotating cushions and loose seating periodically evens out UV exposure and wear; vacuuming upholstered furniture weekly with a soft brush attachment prevents dust from working into fibers and accelerating fabric breakdown; and leather upholstery specifically benefits from a UAE-climate-appropriate conditioner roughly every six months to prevent the drying and cracking that heavily air-conditioned environments accelerate. Professional fabric protection treatment, applied at the time of purchase or reupholstering, meaningfully reduces staining risk and extends usable life in high-traffic living and dining areas.</p>

<h2>Common Furniture Care Mistakes</h2>
<p>A handful of well-intentioned habits actually accelerate damage rather than preventing it. Using all-purpose household cleaning sprays on wood furniture — rather than a product formulated for the specific finish — can dull or damage lacquer over time. Placing furniture directly against exterior-facing walls or windows without any UV protection accelerates fading dramatically faster than most owners expect within a single UAE summer. Ignoring a small mechanism stiffness issue until a hinge or runner fails completely turns a lubrication task into a hardware replacement. And closing off ventilation entirely in unoccupied rooms to save on cooling costs can actually increase humidity-related risk to joinery and furniture left inside, since stagnant, humid air without any circulation is worse for timber than consistent, moderate air movement.</p>

<h2>DIY Care vs. When to Call a Professional</h2>
<p>Daily dusting, gentle cleaning, coaster use and drapery management are entirely appropriate for any household to manage independently. Hinge and runner lubrication is straightforward enough for most owners to handle with basic guidance. However, any sign of structural movement — a door that no longer closes flush, a visible gap opening at a joint, or veneer lifting across more than a small area — is worth a professional assessment before attempting a fix, since an incorrect DIY repair (over-tightening a warped panel back into place, for example) can turn a straightforward repair into a full panel replacement.</p>

<h2>Understanding Humidity Patterns Across the UAE</h2>
<p>Not every part of the UAE experiences the same humidity profile, which is worth factoring into a maintenance routine. Coastal areas — Dubai Marina, JBR, Abu Dhabi's coastal districts and much of Sharjah's waterfront — experience meaningfully higher ambient humidity for much of the year than inland communities such as Arabian Ranches, Dubai Hills Estate or Al Ain, particularly outside the peak summer months when coastal humidity can remain high even as temperatures moderate. A property in a coastal high-rise generally benefits from more attentive humidity management — dehumidification, more frequent hardware checks — than an equivalent inland villa, even though both face the same intense summer heat.</p>

<h2>Professional Servicing vs. DIY: A Cost and Outcome Comparison</h2>
<p>For routine tasks — dusting, gentle cleaning, coaster use, curtain management — DIY care costs nothing beyond a few minutes of regular attention and is entirely sufficient. For annual hinge and runner lubrication, many owners handle this themselves with a basic silicone lubricant, though a professional aftercare visit typically also catches early-stage issues (a slightly misaligned door, an early sign of edge-band lifting) that an untrained eye might miss until the problem has progressed further. For any structural repair — warping, significant veneer damage, hardware that has failed rather than simply stiffened — professional assessment is worth the cost specifically because an incorrect DIY attempt can convert a repairable fault into one that requires full panel replacement, which costs substantially more than the original repair would have.</p>

<h2>Building a Simple Home Maintenance Toolkit</h2>
<p>A small, dedicated set of supplies makes routine furniture care far more likely to actually happen on schedule rather than being postponed indefinitely. Worth keeping on hand: a set of clean, lint-free microfiber cloths reserved only for wood and lacquered surfaces (never used for general household cleaning, which cross-contaminates them with abrasive residue); a finish-appropriate wood cleaner recommended by the joinery manufacturer rather than a generic multi-surface spray; a small silicone-based lubricant for hinges and runners; silica gel packs or a small rechargeable dehumidifier unit for enclosed wardrobe spaces; and a soft-bristle vacuum attachment reserved for upholstery. None of this requires significant investment, and having it on hand removes the most common reason routine maintenance gets skipped — not having the right product within easy reach when a spill or a stiff drawer is first noticed.</p>

<h2>The Long-Term Value of Consistent Maintenance</h2>
<p>The financial case for consistent, low-effort maintenance is straightforward: a joinery package that receives basic ongoing care routinely lasts well beyond a decade in good condition, while the same joinery neglected through UAE summers can show significant wear — stiffened mechanisms, faded finishes, lifting veneer — within just a few years. Since bespoke joinery represents one of the larger single investments in any UAE villa or apartment renovation, the relatively small time cost of the maintenance habits outlined above protects a disproportionately large share of the property's overall interior investment, and continues to support the resale and rental value that quality joinery contributes to a property in Dubai's luxury market.</p>

<h2>Case Example: Reviving Five-Year-Old Kitchen Joinery</h2>
<p>A representative aftercare scenario illustrates how much of this is genuinely recoverable rather than requiring replacement. A kitchen installed five years earlier, in a household that had followed no particular maintenance routine, showed three typical issues on inspection: several drawer runners had stiffened from accumulated dust and dried-out original lubricant, two cabinet doors had begun sagging slightly from hinge wear under daily use, and a small section of edge-banding near the sink had started lifting from sustained moisture exposure. None of the three required panel replacement. Runner lubrication and a hinge adjustment resolved the mechanical issues within the same visit, and the affected edge-banding section was re-bonded rather than replaced. Total intervention cost was a small fraction of what replacing the affected cabinetry would have required, and the kitchen was returned to functioning like new. This is the typical outcome when maintenance issues are addressed while still minor rather than left to compound over additional years of use.</p>

<h2>Documentation Worth Keeping</h2>
<p>Retaining a few simple records makes future maintenance and any warranty claim significantly more straightforward. Worth keeping on file: the original joinery specification sheet noting exact finishes and hardware models (useful if a matching replacement part is ever needed), the workmanship warranty documentation with its start date and coverage terms clearly noted, and photos taken at handover, which provide a useful baseline for comparison if a change in condition is ever in question. None of this needs to be complicated — a single folder, physical or digital, with these three items is sufficient for most households.</p>

<h2>Furniture Maintenance for Rental and Investment Properties</h2>
<p>Owners of investment properties in Dubai and Abu Dhabi face a distinct version of this problem: furniture and joinery maintenance for a space that may sit unoccupied between tenancies, or that's managed remotely rather than lived in daily. For unoccupied periods, maintaining minimal air-conditioning or ventilation rather than switching cooling off entirely prevents the humidity buildup that accelerates joinery damage in a fully sealed, powered-down unit — a common and costly mistake among owners trying to minimize utility costs on a vacant property. For tenanted properties, a documented move-in condition report covering joinery and furniture condition protects both landlord and tenant in the event of a maintenance or damage dispute at move-out. And for owners managing a property remotely, scheduling an annual professional inspection — covering exactly the hinge, runner and edge-seam checks outlined earlier in this guide — provides an objective condition record without requiring the owner's physical presence, which is particularly valuable for second-home owners who may only visit the UAE a few times a year.</p>

<h2>Frequently Asked Questions</h2>
<h3>How often should custom joinery be serviced in the UAE?</h3>
<p>An annual check of hinges, runners and any visible edge-banding or veneer seams is sufficient for most households — more frequent for kitchens and high-use wardrobes.</p>
<h3>Can I use standard furniture polish on custom joinery?</h3>
<p>Many commercial polishes contain silicone or wax that can interfere with factory-applied lacquer finishes over time — a simple damp microfiber cloth followed by a dry one is safer for most modern joinery finishes; check with your joinery provider for a finish-specific recommendation.</p>
<h3>Does Bait Al Ebdaa offer an aftercare or maintenance service?</h3>
<p>Yes — projects completed by Bait Al Ebdaa are covered by a 5-year workmanship warranty, and our aftercare team can be reached for adjustment, repair or maintenance guidance; see our <a href="/en/contact">contact page</a> to get in touch.</p>
<h3>Is it worth installing a dehumidifier in a UAE home just for furniture protection?</h3>
<p>For homes with extensive natural timber joinery, walk-in wardrobes with limited ventilation, or properties left unoccupied for extended periods (a common scenario for second homes and investment properties), a dehumidifier is a relatively low-cost way to meaningfully extend the life of a significant furniture investment.</p>
<h3>What's the biggest single cause of premature furniture damage in the UAE?</h3>
<p>Inconsistent climate control — letting air-conditioning cycle off for extended periods and then run continuously again, rather than maintaining a steady indoor temperature — causes more cumulative stress on timber joinery than almost any other single factor, ahead of direct sun exposure or cleaning-product mistakes.</p>
<h3>Should furniture be treated differently in a new-build versus an older property?</h3>
<p>New-build properties can retain elevated construction moisture in walls and floors for the first year or so of occupancy, which makes climate control and ventilation even more important during that initial period than in an established, fully cured property.</p>
<h3>Does insurance typically cover humidity-related furniture damage?</h3>
<p>Standard home insurance policies in the UAE generally treat gradual humidity or heat damage as a maintenance issue rather than a covered peril, which is different from sudden water damage from a leak — this makes routine preventive care, rather than reliance on insurance, the more realistic protection strategy for most households.</p>
<h3>Do serviced apartments and hotel-managed residences need the same care approach?</h3>
<p>Yes, and arguably more consistently, since managed residences typically see higher furniture turnover between occupants and less individual owner oversight — a scheduled maintenance program run by the facilities or property management team, rather than relying on any single occupant to notice and report issues, is the more reliable approach in that setting.</p>
<h3>Can furniture maintenance products damage a factory warranty?</h3>
<p>Using cleaning products, waxes or polishes not recommended by the original joinery manufacturer can, in some cases, affect warranty coverage if they're shown to have contributed to a finish issue — checking with the supplier before introducing a new product to an existing finish is a simple way to avoid this risk entirely.</p>
<h3>Does moving furniture between rooms during a deep clean risk damaging it?</h3>
<p>Sliding heavy joinery-adjacent furniture across flooring risks both the flooring finish and furniture legs or bases — lifting rather than dragging, and using felt pads under legs permanently, meaningfully reduces this everyday risk at negligible cost.</p>
<h3>What's the single most important habit for protecting furniture in the UAE?</h3>
<p>If only one habit can be maintained consistently, keeping indoor climate stable — avoiding long stretches with air-conditioning switched off entirely, then run at full intensity again — does more to protect timber joinery and furniture over the long term than any single cleaning product or occasional deep-maintenance session, since it addresses the root cause of most humidity-related damage rather than treating symptoms after they appear.</p>

<p>Proper care extends the life of a joinery investment by years, and most of it comes down to consistency rather than expense. For joinery originally built with climate-adapted materials — see how we approach this in our <a href="/en/our-services">services overview</a> — the maintenance burden is significantly lighter from day one.</p>`
        },
        {
          title: "Inside Our First Published Project: A Government Authority HQ",
          slug: "government-authority-hq-case-study",
          link: "/en/media/government-authority-hq-case-study",
          description: "A case study on delivering a 50,500 sq ft government authority headquarters fit-out in Dubai — security, acoustic joinery, DDA/DM approvals and Somfy automation under a strict deadline.",
          image: "/assets/project-office.jpg",
          date: "July 15, 2026",
          author: "Bait Al Ebdaa Projects",
          content: `<p>Executing a <strong>commercial fit-out in Dubai</strong> for a prominent government authority demands a higher level of security, precision and regulatory compliance than almost any other project type in the market. This case study walks through how Bait Al Ebdaa delivered a 50,500 sq ft turnkey interior fit-out across three floors of a confidential government authority headquarters in Dubai Academic City, under a strict, non-negotiable deadline — and what the project reveals about what actually matters in <strong>government and corporate office fit-out in the UAE</strong>. See the full project in our <a href="/en/our-projects/government-authority">portfolio</a>.</p>

<h2>Project Overview</h2>
<p>This overview describes the scope, challenges and delivery approach at a level consistent with the confidentiality terms agreed with the client.</p>
<p>The scope covered a complete interior fit-out and MEP overhaul across three floors, encompassing executive offices, a boardroom, open-plan workstations, reception and public-facing areas, and back-of-house server and communications infrastructure. Government authority projects in the UAE carry procurement, security clearance and compliance requirements well beyond a typical corporate office fit-out, which shaped nearly every decision on the project from the initial design brief onward.</p>

<h2>The Challenge: Security, Confidentiality and Compliance</h2>
<p>The brief required a sophisticated executive workspace that integrated advanced acoustic privacy for confidential meetings, secure server room MEP configurations meeting government IT security standards, and an aesthetic that projected quiet institutional authority rather than corporate flash. Three constraints in particular shaped the project:</p>
<ul>
<li style='margin-bottom: 10px;'><strong>Confidentiality:</strong> Site access, documentation handling and even progress photography required clearance protocols well beyond a standard commercial project, meaning site teams and subcontractors needed vetting before mobilization.</li>
<li style='margin-bottom: 10px;'><strong>Regulatory approvals:</strong> Navigating the stringent approval processes for a government entity meant our authority-liaison team had to flawlessly execute Dubai Development Authority (DDA) and Dubai Municipality (DM) submissions, with essentially no tolerance for the delays that a resubmission would typically cause on a private commercial project.</li>
<li style='margin-bottom: 10px;'><strong>Fixed deadline:</strong> Unlike many private commercial fit-outs where a handover date has some flexibility, a government authority relocation is tied to lease and operational schedules that cannot simply slip — the deadline was fixed at contract signing and did not move.</li>
</ul>

<h2>The Solution: A Turnkey Interior Strategy</h2>
<p>By keeping design, MEP engineering, joinery manufacturing and installation all in-house, Bait Al Ebdaa eliminated the friction of multi-agency delays that would have been unmanageable on a fixed-deadline government project. Three elements of the delivery were central to hitting the schedule:</p>
<h3>3D Spatial Design and Stakeholder Alignment</h3>
<p>Photorealistic CAD renders were produced and approved by all stakeholders — including multiple layers of government sign-off — before a single partition was built. On a project with this many approval layers, resolving design disagreements on-screen rather than mid-construction was the single biggest factor in staying on schedule.</p>
<h3>Acoustic Joinery, Manufactured In-House</h3>
<p>The Ajman manufacturing facility produced specialized sound-dampening wall panels for the boardroom and executive offices, engineered for acoustic privacy suitable for confidential government meetings — a specification that off-the-shelf commercial partition systems don't meet. Manufacturing these panels in-house, rather than sourcing them from a specialist acoustic subcontractor, kept them on the same production and delivery schedule as the rest of the joinery package instead of introducing an additional external dependency.</p>
<h3>Smart Automation for Privacy and Efficiency</h3>
<p>Complete integration of Somfy motorized blind and lighting control systems gave the facilities team centralized control over privacy and energy use across the three floors — particularly important in executive and boardroom zones where manual blind operation would have been inconsistent across dozens of individual windows.</p>

<h2>Secure MEP and Server Room Infrastructure</h2>
<p>Back-of-house server and communications rooms were built to government IT security configurations, with dedicated cooling, power redundancy and physical access control integrated into the MEP design from the outset rather than retrofitted — a sequencing decision that avoided the costly rework common when secure-room requirements surface late in a project.</p>

<h2>Results</h2>
<p>The completed headquarters delivered a highly functional, secure and visually authoritative space that met every regulatory and security requirement on the fixed deadline, setting an internal benchmark for how Bait Al Ebdaa approaches <strong>turnkey interior solutions in the UAE</strong> for security-sensitive and institutional clients since. The project remains one of the largest single commercial fit-outs completed by the team to date, at 50,500 sq ft across three floors, and continues to inform how new institutional briefs are scoped and staffed from day one.</p>

<h2>Lessons for Any Large-Scale Commercial Fit-out</h2>
<p>Several practices from this project apply well beyond government work to any large, deadline-critical <strong>office fit-out in Dubai</strong>:</p>
<ul>
<li style='margin-bottom: 10px;'>Lock design sign-off before construction starts — every stakeholder review cycle done on a 3D render instead of on-site is time saved later.</li>
<li style='margin-bottom: 10px;'>Sequence long-lead items (acoustic joinery, secure MEP infrastructure, motorized automation) to manufacture in parallel with approvals and site works, not after them.</li>
<li style='margin-bottom: 10px;'>Treat a fixed handover date as a design constraint from day one, not a target to manage toward later.</li>
</ul>

<h2>Project Timeline: How a 50,500 sq ft Fit-out Was Delivered on a Fixed Date</h2>
<p>A project of this scale, with this many approval and clearance layers, only meets a fixed deadline through disciplined phasing rather than simply working faster once behind. The program broke into four overlapping phases: an intensive design and stakeholder sign-off phase compressed at the front of the schedule specifically because every subsequent phase depended on it; a parallel-track phase where DDA and DM submissions moved forward simultaneously with acoustic and joinery manufacturing in Ajman, rather than manufacturing waiting for approval as a purely sequential dependency; a site-works phase sequenced floor by floor so installation teams could begin on an approved, completed floor while site works continued on another; and a compressed commissioning and snagging phase where Somfy automation testing, secure-room IT infrastructure verification and final client walkthroughs ran in parallel across different zones of the three floors rather than sequentially.</p>

<h2>Stakeholder Coordination on an Institutional Project</h2>
<p>A government headquarters fit-out involves substantially more stakeholders than a typical private commercial project — facilities management, IT security, procurement, and multiple layers of institutional sign-off, each with its own review cadence. Managing that without letting it stall the schedule required a single project lead on the Bait Al Ebdaa side acting as the sole point of contact across all stakeholder groups, a weekly (and, in the final six weeks, twice-weekly) progress review cycle with clear go/no-go criteria at each phase gate, and documentation standards for security clearance and material specifications prepared to institutional procurement requirements from the outset rather than adapted after the fact. This coordination overhead is exactly what a fragmented, multi-vendor delivery model struggles with — on a project like this, it's arguably the primary reason a turnkey, single-accountability structure was the only viable delivery approach.</p>

<h2>Budget and Value Engineering on Institutional Projects</h2>
<p>Institutional and government projects typically carry more rigorous budget governance than private commercial work, with detailed line-item accountability expected at every stage. Value engineering — finding ways to meet the same functional and security specification at a more efficient cost, without compromising the acoustic, security or durability requirements that mattered most to this brief — was applied selectively: standardizing joinery hardware specifications across less security-sensitive zones while reserving the highest specification for boardroom and executive areas, and optimizing CNC material nesting to reduce timber waste across the very large total joinery run this project required. None of this touched the acoustic or secure-MEP specifications that were non-negotiable for the brief.</p>

<h2>How This Compares to Other Sectors We Serve</h2>
<p>Institutional work sits at one end of a spectrum of commercial and residential sectors covered in our <a href="/en/our-services">services</a>. Hospitality fit-outs prioritize guest-facing aesthetic impact and durability under heavy daily use; retail fit-outs prioritize brand expression and fast turnaround between lease commencement and store opening; private villa fit-outs prioritize livability and personalization; and institutional and government fit-outs, as this project demonstrates, prioritize security, compliance and absolute schedule certainty above all else. The underlying delivery discipline — in-house design, MEP, manufacturing and installation under one accountable team — is what allows the same organization to serve all four sectors without compromising on any single one's specific priorities.</p>

<h2>Security Protocols in Detail</h2>
<p>Delivering an occupied-in-progress government facility required security protocols well beyond a standard commercial site. Every team member and subcontractor mobilized to site underwent identity verification and access clearance before their first day on-site, consistent with the client's institutional security policy. Material deliveries were scheduled and logged through a controlled access point rather than general site access. Progress documentation and photography — normally routine on a commercial project for client reporting — required specific approval on a per-image basis given the sensitivity of the location and its occupants. And as-built drawings and technical documentation for secure-room MEP infrastructure were handled under a restricted-access documentation protocol agreed with the client's IT security team before the project began, rather than through the standard document-sharing workflow used on private commercial projects.</p>

<h2>What We'd Do Differently: Reflections From the Delivery Team</h2>
<p>No project of this scale and sensitivity runs without lessons worth carrying forward. In retrospect, the project team would have front-loaded security clearance processing for subcontractor teams even earlier in the pre-construction phase, since clearance turnaround for newly introduced trades became one of the few genuine schedule-risk items encountered mid-project. The acoustic joinery specification — ultimately a success — also benefited from an earlier-than-usual acoustic consultant review, a step now built into the standard process for any project with a confirmed confidential-meeting requirement, rather than added only when a client specifically requests it.</p>

<h2>Handover and Long-Term Facilities Management</h2>
<p>Handover on an institutional project doesn't end at snagging sign-off the way it might on a smaller commercial fit-out. The facilities management team inherited detailed as-built documentation for all MEP and joinery systems, a full maintenance schedule for Somfy motorized systems and acoustic panelling, and a direct escalation path back to the original delivery team for any post-handover adjustment — all specified as contractual deliverables from the outset rather than assembled reactively after handover. For a facility expected to operate continuously for years without disruption, that documentation and support structure matters as much to long-term operational success as the quality of the original installation.</p>

<h2>Why This Project Set an Internal Benchmark</h2>
<p>Beyond its scale, this project changed how Bait Al Ebdaa approaches every subsequent security-sensitive or institutional brief. The security clearance and documentation protocols developed for this headquarters became the template applied to later confidential commercial and institutional work. The acoustic joinery specifications developed for the boardroom and executive offices were refined into a standard acoustic-joinery product line now offered to any client with a confidential-meeting requirement, rather than engineered from scratch each time. And the phased, floor-by-floor delivery sequencing used to hit this project's fixed deadline is now the default approach recommended to any client with a large multi-floor commercial scope and a non-negotiable handover date.</p>

<h2>Materials and Finishes Used Across the Three Floors</h2>
<p>Material selection on an institutional project needs to balance durability under continuous daily use, an aesthetic of quiet authority rather than corporate ostentation, and — for acoustic and secure zones specifically — performance specifications that go beyond standard commercial-grade finishes. Executive offices and the boardroom used natural timber veneer panelling over acoustic substrate, chosen for warmth and durability rather than the high-gloss lacquer more common in private-sector executive suites. Open-plan workstation areas used durable, low-maintenance laminate joinery specified for high daily traffic rather than showcase aesthetics. Reception and public-facing areas balanced institutional durability with a more considered material palette — natural stone flooring, restrained metal detailing — appropriate for a space representing a government authority to visitors. And secure zones used joinery and finishes selected in part for their compatibility with the specific access-control and cabling infrastructure required, rather than aesthetics alone driving the specification.</p>

<h2>How This Compares to International Government Fit-out Standards</h2>
<p>Government and institutional fit-out projects internationally typically share a common set of priorities regardless of jurisdiction: security and access control integrated at the design stage rather than retrofitted, acoustic privacy for confidential proceedings treated as a hard requirement rather than a nice-to-have, and documentation and procurement standards exceeding typical private-sector expectations. This project was delivered to that same standard within a UAE regulatory context — DDA and DM approvals, UAE fire-and-life-safety compliance through Dubai Civil Defense — demonstrating that institutional-grade delivery doesn't require importing an international project management framework wholesale; it requires the same in-house, single-accountability delivery discipline applied to any large commercial project, executed with the additional rigor a government client's security and compliance requirements demand.</p>

<h2>The Broader Case for a Single-Accountability Delivery Model</h2>
<p>It's worth stepping back from this specific project to state the broader principle it demonstrates clearly. On a private commercial fit-out, a fragmented delivery model — separate designer, contractor and joinery subcontractor — creates friction and risk, but a determined client with flexibility on timeline can usually absorb that friction. On a fixed-deadline, security-sensitive institutional project, that same fragmentation isn't merely inconvenient — it's close to unmanageable, because every additional vendor relationship is another point where a security clearance delay, a miscommunicated specification, or a scheduling conflict can cascade into a missed deadline that, for a government relocation, has no acceptable fallback. This project succeeded specifically because design, MEP engineering, secure-room infrastructure, acoustic joinery manufacturing and installation all sat within one accountable team with one project lead — the same structural principle that underlies every project Bait Al Ebdaa delivers, scaled up to its most demanding test case to date.</p>

<h2>Frequently Asked Questions</h2>
<h3>Does Bait Al Ebdaa handle security-cleared or confidential commercial projects?</h3>
<p>Yes — government and institutional projects requiring site access clearance, confidentiality protocols and secure MEP configurations are handled within the same in-house team structure used across our commercial portfolio; see our <a href="/en/our-services">services page</a> for scope.</p>
<h3>How is a government office fit-out different from a standard corporate fit-out?</h3>
<p>The core process is similar, but approval layers, confidentiality requirements and security-grade MEP specifications for server and communications infrastructure add complexity that a standard private-sector office fit-out doesn't carry.</p>
<h3>What size commercial projects does Bait Al Ebdaa take on?</h3>
<p>Project scope has ranged from single-floor office fit-outs to this 50,500 sq ft, three-floor headquarters project — see indicative cost ranges on our <a href="/en/pricing">pricing page</a> or request a site survey via our <a href="/en/contact">contact page</a>.</p>
<h3>How is a fixed deadline protected on a project this large?</h3>
<p>Through phased, floor-by-floor sequencing that lets installation begin on completed areas while site works continue elsewhere, long-lead items (acoustic joinery, secure MEP infrastructure) manufactured in parallel with approvals rather than after them, and a single project lead coordinating across every stakeholder group so no individual delay silently cascades into the overall schedule unnoticed.</p>
<h3>Does acoustic joinery actually block sound, or just dampen it?</h3>
<p>Properly engineered acoustic joinery — as specified for this project's boardroom and executive offices — meaningfully reduces both sound transmission through walls and reverberation within the room itself, which together are what actually make a space usable for confidential conversation; a standard partition wall alone, without acoustic-rated core materials and sealing, does not achieve the same result.</p>
<h3>How is confidentiality maintained during construction on a live government site?</h3>
<p>Through access-controlled site zones, cleared and vetted personnel for every trade mobilized, restricted and approval-gated documentation and photography, and a phased handover sequence that limits which areas of an occupied or partially occupied facility any given trade team needs to access at a time.</p>
<h3>Were any parts of this project outsourced to third-party subcontractors?</h3>
<p>Core disciplines — design, MEP engineering, acoustic and architectural joinery manufacturing, and installation — were delivered in-house; specialist scopes outside that core capability, where required, were managed under the same single project lead and security clearance protocol as every other trade on site, rather than handed off with reduced oversight.</p>
<h3>How does a project like this get referenced publicly given confidentiality requirements?</h3>
<p>With the client's explicit approval and subject to the confidentiality boundaries agreed for public reference — no floor plans, security infrastructure details or images that could compromise the facility's operational security are shared, which is why this case study describes the project's scope, challenges and delivery approach without naming the client authority or publishing site-specific imagery.</p>
<h3>Does a project of this scale require a different contract structure than a standard commercial fit-out?</h3>
<p>Generally yes — institutional and government contracts typically include more detailed milestone-based payment structures, formal change-order procedures, and documentation requirements tied to government procurement standards, compared with the more streamlined contract structure used for a typical private commercial fit-out.</p>
<h3>How many people were involved in delivering this project at peak?</h3>
<p>At peak site activity, design, MEP, joinery installation and site-management personnel worked concurrently across the three floors under a phased schedule, coordinated by a single project lead — the specific headcount varied by phase, scaling up during the concentrated site-works and installation period and down during design and manufacturing.</p>
<h3>What made this project the largest single commercial fit-out delivered to date?</h3>
<p>The combination of total floor area (50,500 sq ft across three floors), the volume of bespoke acoustic and executive joinery manufactured for it, and the depth of secure-MEP and access-control infrastructure integrated throughout made this project larger in scope, not just square footage, than any single commercial engagement delivered previously — a genuine step up in complexity rather than simply a bigger version of a standard office fit-out, and the clearest demonstration to date of what the in-house delivery model can handle at scale.</p>

<p>Interested in a commercial or institutional fit-out of your own? <a href="/en/contact">Get in touch</a> to discuss scope, security requirements and timeline.</p>`
        }
      ]
    },
    ourServicesPage: {
      metaTitle: "Our Services | Bait Al Ebdaa",
      metaDescription: "Explore Bait Al Ebdaa's interior design, turnkey fit-out and custom joinery services across Dubai and Abu Dhabi, from concept to handover.",
      navTitle: "Our Services",
      pageTitle: "Our Services & Interior Solutions",
      whatWeOffer: "What Do We Offer",
      comprehensiveOfferings: "Comprehensive Service Offerings",
      offeringsSubtitle: "We provide customized interior solutions tailored every project need.",
      learnMore: "Learn More ↗",
      exploreByServiceKicker: "Browse by service",
      exploreByServiceTitle: "Every Service, Across the UAE",
      exploreByServiceSubtitle: "Jump straight to the service you need — each page covers scope, process, cost context and FAQs for your emirate.",
      services: [
        {
          num: "01",
          title: "Interior Fit Out",
          description: "We work closely with your architect, designer, or project manager to deliver top-quality interior fit-out services, including MEP, furniture, and finishes.",
          image: "/assets/tv-unit-1.jpeg",
          link: "/en/fit-out/dubai"
        }
      ]
    },
    ourProcessPage: {
      metaTitle: "Our Process | Bait Al Ebdaa",
      metaDescription: "See how Bait Al Ebdaa delivers projects from 3D design and municipality approvals to in-house manufacturing and handover.",
      navTitle: "Our Process",
      pageTitle: "How We Work",
      whatWeDo: "Step-by-Step",
      processOverview: "Our Working Process",
      processSubtitle: "We follow a meticulous process to ensure every project is delivered on time, within budget, and beyond expectations.",
      learnMore: "Learn More ↗",
      steps: [
        {
          num: "01",
          title: "3D Spatial Design & DM Approval",
          description: "Photorealistic 3D renders matched with 100% Dubai Municipality & Civil Defense compliance.",
          meta: "Timeline: 5–7 Days",
          image: "/assets/hero-penthouse.jpg",
          link: "#"
        },
        {
          num: "02",
          title: "15k sqft Factory Fabrication",
          description: "Precision CNC cutting, European walnut joinery, and custom Italian curtain stitching in our Ajman facility.",
          meta: "Timeline: 10–14 Days",
          image: "/assets/project-office.jpg",
          link: "#"
        },
        {
          num: "03",
          title: "On-Site Turnkey Installation",
          description: "Clean installation by certified site engineers with daily photo feeds pushed to your customer portal.",
          meta: "Timeline: 7–10 Days",
          image: "/assets/cabinet-joinery.jpeg",
          link: "#"
        },
        {
          num: "04",
          title: "Final Handover & Guarantee",
          description: "Final walk-through, municipality completion certificate, and 5-year warranty package.",
          meta: "Warranty: 5 Years Included",
          image: "/assets/dining-table.jpeg",
          link: "#"
        }
      ]
    }
  },
  ar: {
    nav: {
      projects: "المشاريع",
      services: "الخدمات",
      menu: "القائمة",
      close: "إغلاق",
      startProject: "واتساب الآن",
      navigate: "تصفح",
      studio: "الاستوديو",
      studioLocation: "عجمان، الإمارات العربية المتحدة\nنخدم دبي وأبوظبي",
      newEnquiries: "استفسارات جديدة",
      menuNote: "تصميم · موافقات · تجهيز · نجارة",
      contactInfo: "معلومات الاتصال",
      socialMedia: "وسائل التواصل الاجتماعي",
      phoneLabel: "الإمارات",
      getFreeQuote: "احصل على عرض سعر مجاني",
      media: "الإعلام"
    },
    menuItems: ["الرئيسية", "الخدمات", "المشاريع", "العملية", "الأسعار", "اتصل بنا"],
    hero: {
      slides: [
        { eyebrow: "دبي · أبوظبي", title: "تجهيز متكامل ونجارة معمارية مخصصة في الإمارات", body: "من المخطط الأول إلى التسليم النهائي، نقوم بتصميم واعتماد وتصنيع مساحات فريدة للحياة الخليجية الحديثة." },
        { eyebrow: "مساحات العمل", title: "مساحات عمل تنفيذية مصممة بهيبة هادئة وتدفق سلس", body: "مساحات عمل عالية الأداء مصممة حول موظفيك وعلامتك التجارية وأولوياتك التجارية." },
        { eyebrow: "مساكن خاصة", title: "فلل خاصة فاخرة مصممة بأدق التفاصيل المعمارية المميزة", body: "هندسة معمارية ونجارة مخصصة وأثاث ذكي يجمعها فريق واحد مسؤول." }
      ],
      viewWork: "عرض الأعمال المختارة"
    },
    servicesSection: {
      micro: "فريق واحد، من البداية للنهاية",
      title: "من الخيال\nإلى التركيب.",
      lede: "فريق واحد دقيق يمتلك كل قرار - من أول عرض ثلاثي الأبعاد واقعي إلى الدرج النهائي المحاذي.",
      discuss: "ناقش مشروعك",
      items: [
        { number: "01", title: "التصميم والتصور ثلاثي الأبعاد", body: "تتيح لك تصاميم CAD الواقعية الموافقة على المواد والإضاءة والقرارات المكانية قبل بدء العمل في الموقع." },
        { number: "02", title: "التجهيز والموافقات", body: "تنسيق مفصل، وتقديمات للسلطات، وموافقات بلدية دبي وشهادات عدم الممانعة تدار بالكامل." },
        { number: "03", title: "التصنيع المخصص", body: "مطابخ مخصصة وخزائن وأنظمة جدران وأثاث يتم إنتاجه في منشأتنا الخاصة البالغة مساحتها 15,000 قدم مربع." }
      ]
    },
    studioSection: {
      micro: "استوديونا",
      title: "بنيت هنا.\nركبت بجمال.",
      intro: "تمنح منشأة التصنيع الخاصة بنا البالغة مساحتها 15,000 قدم مربع المصممين والصناع حرية حل التفاصيل المخصصة داخلياً - دون المساومة على المفهوم في الموقع.",
      seeHow: "شاهد كيف نعمل",
      facts: [
        { strong: "15,000", span: "قدم مربع مساحة منشأة التصنيع" },
        { strong: "1:1", span: "تحكم من التصميم إلى الإنتاج" },
        { strong: "الإمارات", span: "تسليم في دبي وأبوظبي" }
      ]
    },
    factorySection: {
      badge: "منشأة تصنيع بمساحة 15,000 قدم مربع",
      title: "مصنع النجارة الخاص بنا",
      description: "على عكس المقاولين الذين يوكلون تصنيع الأخشاب لجهات خارجية، تمتلك بيت الإبداع وتدير منشأة تصنيع متطورة بمساحة 15,000 قدم مربع في عجمان مع أكثر من 50 نجاراً محترفاً.",
      features: [
        { title: "آلات CNC ألمانية", desc: "دقة قطع دون المليمتر" },
        { title: "جوز وبلوط أوروبي", desc: "استيراد مباشر للأخشاب من إيطاليا" }
      ],
      cta: "احجز جولة موجهة في المصنع",
      captionLocation: "الجرف الصناعية 2، عجمان",
      captionBadge: "إنتاج مباشر"
    },
    sectorsSection: {
      micro: "مساحات نشكلها",
      title: "مصممة حول\nكيف تتكشف الحياة.",
      explore: "استكشف هذا القطاع",
      items: [
        { label: "فلل فاخرة", body: "منازل خاصة مبنية حول مواد طبيعية، ونسب سخية وطقوس الحياة اليومية." },
        { label: "مكاتب تنفيذية", body: "مساحات عمل مضمونة حيث يعمل الراحة الصوتية، ووجود العلامة التجارية وتدفق العمل كواحد." },
        { label: "العيش الذكي", body: "ستائر Somfy الآلية المخفية وضوابط مدمجة مصممة في الهندسة المعمارية من اليوم الأول." }
      ]
    },
    projectsSection: {
      micro: "مشاريعنا",
      title: "تحويل المساحات",
      viewAll: "عرض جميع المشاريع",
      items: [
        { title: "فيلا فاخرة في دبي هيلز إستيت", place: "دبي هيلز إستيت، دبي", subtitle: "تسليم مفتاح كامل ونجارة أوروبية", slug: "dubai-hills-estate-villa" },
        { title: "بنتهاوس على الواجهة البحرية في نخلة جميرا", place: "نخلة جميرا، دبي", subtitle: "ستائر سومفي الآلية وألواح إيطالية", slug: "palm-jumeirah-penthouse" },
        { title: "مقر شركة تقنية في وسط مدينة دبي", place: "وسط مدينة دبي، دبي", subtitle: "تجهيز تجاري وموافقة بلدية دبي", slug: "downtown-dubai-tech-hq" },
        { title: "جناح فيلا صديقة للبيئة في البراري", place: "البراري، دبي", subtitle: "خزائن جوز مخصصة ومفروشات ناعمة", slug: "al-barari-eco-villa" },
        { title: "فيلا سكنية في جزيرة السعديات", place: "جزيرة السعديات، أبوظبي", subtitle: "عمارة تسليم مفتاح كاملة ونجارة", slug: "saadiyat-island-villa" },
        { title: "المقر الرئيسي السري لهيئة حكومية", place: "مدينة دبي الأكاديمية", subtitle: "التجهيزات الداخلية والأعمال الكهروميكانيكية", slug: "government-authority" }
      ]
    },
    capabilitiesSection: {
      micro: "الميزة تكمن في التفاصيل",
      title: "التعقيد،\nيدار بهدوء.",
      items: [
        ["تصاميم CAD ثلاثية الأبعاد واقعية", "قرارات تتخذ بوضوح، قبل البناء."],
        ["موافقات بلدية دبي وشهادات عدم الممانعة", "تقديمات للسلطات تدار بدون نهايات فضفاضة."],
        ["أتمتة Somfy", "ستائر آلية مدمجة ومخفية ومفوضة."],
        ["نجارة مخصصة", "قطع فريدة تصنع وتنهى تحت سقفنا."]
      ]
    },
    processSection: {
      micro: "رحلة مسيطر عليها",
      title: "أربع مراحل.\nفريق واحد مسؤول.",
      items: [
        ["اكتشف", "مراجعة الموقع، موجز، أولويات وتوافق الاستثمار."],
        ["تصور", "خطط، مواد وتصاميم CAD ثلاثية الأبعاد واقعية."],
        ["اعتمد", "حزم تقنية، تنسيق مع بلدية دبي وشهادات عدم الممانعة."],
        ["اصنع", "إنتاج النجارة، التجهيز، التركيب وتسليم مدروس."]
      ]
    },
    comparisonSection: {
      micro: "مقارنة شفافة للباقات",
      title: "مصفوفة باقات النطاق والمزايا",
      featureLabel: "ميزة خدمة التجهيز",
      standardLabel: "تجهيز قياسي",
      vipLabel: "بيت الإبداع VIP تسليم مفتاح",
      rows: [
        ["تصاميم معمارية ثلاثية الأبعاد واقعية", "مخطط أرضي ثنائي الأبعاد أساسي", "تصاميم ثلاثية الأبعاد بدقة 99.4%"],
        ["تقديمات شهادة عدم ممانعة بلدية دبي", "يتولاها العميل", "تدار بالكامل من قبل بيت الإبداع"],
        ["تصنيع نجارة بمساحة 15,000 قدم مربع", "مقاولون من الباطن خارجيون", "إنتاج داخلي بتقنية CNC ألمانية في عجمان"],
        ["دمج ستائر سومفي الآلية", "مسارات يدوية فقط", "تحريك سومفي Glydea Ultra الذكي"],
        ["حزمة ضمان جودة التصنيع", "سنة واحدة أساسية", "ضمان شامل لمدة 5 سنوات"]
      ]
    },
    estimatorSection: {
      kicker: "حاسبة التكلفة الفورية",
      title: "محرك تقدير الاستثمار الشامل",
      subtitle: "حدد حجم عقارك ونطاق العمل لحساب التكلفة التقديرية لتجهيز مشروعك بالعملة التي تختارها.",
      propertySize: "مساحة العقار (قدم مربع)",
      scope: "تحديد النطاق",
      scopeOptions: ["تسليم مفتاح كامل", "نجارة المصنع", "ستائر سومفي"],
      location: "الإمارة",
      locationOptions: ["دبي (بلدية دبي)", "أبوظبي (بلدية أبوظبي)"],
      estimatedInvestment: "الاستثمار المقدر",
      calculatedValue: "قيمة العقد المحسوبة",
      inclusions: [
        "حزمة CAD معمارية ثلاثية الأبعاد",
        "شهادة عدم ممانعة 100% من البلدية",
        "15 ألف قدم مربع من إنتاج النجارة",
        "ضمان 5 سنوات على جودة العمل"
      ],
      bookSurvey: "حجز مسح واقتباس رسمي"
    },
    faqSection: {
      kicker: "لديك أسئلة؟",
      title: "الأسئلة الشائعة",
      subtitle: "كل ما تحتاج إلى معرفته حول تخطيط وتنفيذ مشروعك الداخلي مع بيت الإبداع.",
      items: [
        {
          q: "هل تتعامل شركة بيت الإبداع مع موافقات بلدية دبي والدفاع المدني؟",
          a: "نعم، بالتأكيد. نحن نتحمل المسؤولية الكاملة عن عملية الموافقات بأكملها نيابة عنك. يدير فريق الامتثال الداخلي المخصص لدينا بدقة جميع تصاريح عدم الممانعة الشاملة والرسومات الهيكلية المعقدة وشهادات الإنجاز النهائية مباشرة مع بلدية دبي وسلطة دبي للتطوير وتراخيص وبلدية أبوظبي والدفاع المدني، مما يضمن راحة البال التنظيمية التامة والالتزام الصارم بالجداول الزمنية."
        },
        {
          q: "ما هي المواد وأنواع الأخشاب المستخدمة في مصنعكم بعجمان الذي تبلغ مساحته 15,000 قدم مربع؟",
          a: "نحن نستورد ونستخدم حصريًا مواد عالية الجودة ومستدامة مصممة للبيئات الفاخرة. يشمل ذلك الأخشاب الصلبة الممتازة والقشور المخصصة المتطابقة بدقة والأخشاب الهندسية المرنة من موردين عالميين موثوقين. تم تجهيز منشأة التصنيع المتطورة لدينا في عجمان بآلات متقدمة للتعامل مع الألواح الصوتية المعقدة وأعمال النجارة المخصصة للضيافة، مما يضمن الدقة والمتانة والتشطيب الممتاز."
        },
        {
          q: "هل الستائر الآلية متوافقة مع أنظمة أتمتة المنازل الذكية؟",
          a: "نعم، تم تصميم ستائر Somfy الآلية المخصصة لدينا لتندمج بسلاسة مع جميع أنظمة أتمتة المنازل الذكية الرئيسية، بما في ذلك Lutron و Crestron و KNX. يتيح لك هذا التكامل الذكي التحكم بسهولة في الإضاءة الطبيعية والخصوصية والأجواء في جميع أنحاء عقارك باستخدام تطبيقات الهواتف الذكية البديهية أو لوحات الحائط المخصصة أو الأوامر الصوتية المريحة، مما يرتقي بالراحة والتطور الحديث لمساحتك."
        },
        {
          q: "ما هو الجدول الزمني النموذجي لتنفيذ فيلا تسليم مفتاح في دبي؟",
          a: "يتراوح الجدول الزمني النموذجي للتنفيذ الشامل لفيلا فاخرة في دبي عمومًا من ثلاثة إلى ستة أشهر. ومع ذلك، يعتمد هذا الجدول الزمني بشكل كبير على النطاق العام والحجم المكاني ومتطلبات التخصيص المعقدة والمحددة لمشروعك الفريد. خلال مرحلة التخطيط الأولية، نقدم جدولًا زمنيًا مفصلًا وشفافًا يحدد كل مرحلة حرجة من المفهوم إلى التسليم النهائي."
        },
        {
          q: "هل مسح الموقع الأولي واستشارة التخطيط ثلاثي الأبعاد مجانية؟",
          a: "نعم، نحن نفخر بتقديم مسح أولي مجاني للموقع واستشارة شخصية شاملة لفهم متطلباتك المكانية الفريدة بعمق. سيناقش خبراء التصميم ذوو الخبرة لدينا رؤيتك بدقة، ويقيمون ظروف الموقع، ويقدمون نظرة عامة مفاهيمية أولية. بمجرد التوافق على الاتجاه الأولي، ننتقل بعد ذلك إلى تطوير حزم عروض CAD ثلاثية الأبعاد المفصلة والواقعية للغاية."
        }
      ]
    },
    furnitureMaintenancePage: {
      metaTitle: "صيانة والعناية بالأثاث دبي | بيت الإبداع",
      metaDescription: "خدمات الصيانة والإصلاح والعناية بالنجارة والأثاث المخصص، مدعومة بمصنعنا الخاص في عجمان وضمان الجودة لمدة 5 سنوات على كل مشروع تجهيز ننفذه.",
      navTitle: "صيانة والعناية بالأثاث",
      pageTitle: "صيانة والعناية بالأثاث",
      kicker: "خدمات ما بعد التسليم",
      intro: "تحتاج النجارة والأثاث المخصص إلى عناية دورية للحفاظ على المفصلات والتشطيبات والآليات تعمل كما كانت يوم التسليم. ولأننا نصنّع كل شيء داخلياً في مصنعنا بعجمان، يعرف فريق الصيانة لدينا بالضبط المواد والتجهيزات والتشطيبات المستخدمة في مشروعك — وأي نجارة قمنا بتصنيعها مشمولة بضمان جودة الصنعة لمدة 5 سنوات.",
      whatWeOffer: "ما تشمله الخدمة",
      offeringsTitle: "خدمات الصيانة والعناية",
      offeringsSubtitle: "عناية عملية بالنجارة والأثاث والتجهيزات التي نصنّعها ونركّبها — يتم تقييمها في الموقع قبل بدء أي عمل.",
      included: [
        "صيانة المفصلات والآليات — تعديل أو استبدال المفصلات وأدراج الإغلاق الناعم ومنزلقات الخزائن وآليات الكبائن",
        "لمسات تجميلية للتشطيبات — تجديد تشطيبات القشرة والورنيش والطلاء لمطابقة المواصفات الأصلية",
        "صيانة ستائر سومفي الآلية والسكك الخاصة بها",
        "إصلاحات مشمولة بالضمان للنجارة التي صنّعتها بيت الإبداع أصلاً",
        "تقييم في الموقع وتقرير حالة مكتوب قبل تحديد نطاق أي عمل",
        "إرشادات عناية لأصحاب المنازل — صيانة يومية تحافظ على ضمانكم"
      ],
      faqHeading: "الأسئلة الشائعة حول صيانة الأثاث",
      faqs: [
        { q: "هل تقومون بصيانة أثاث لم تصنّعوه أنتم؟", a: "نقيّم ذلك حسب كل حالة أثناء زيارة الموقع. يمكننا عادة صيانة نجارة وأثاث مخصص مماثل، لكن الأولوية وتغطية الضمان تنطبق على القطع التي صنّعناها بأنفسنا." },
        { q: "هل الصيانة مشمولة بالضمان؟", a: "النجارة التي نصنّعها ونركّبها مشمولة بضمان جودة الصنعة لمدة 5 سنوات. الإصلاحات المشمولة بالضمان مغطاة بالكامل؛ أما الصيانة الناتجة عن التآكل العادي خارج فترة الضمان فيتم تسعيرها بعد المعاينة." },
        { q: "ماذا تتضمن زيارة الصيانة؟", a: "يقوم فني بمعاينة القطعة في الموقع، وفحص التجهيزات والتشطيبات، وتقديم تقرير مكتوب ونطاق عمل قبل تنفيذ أي إصلاح." },
        { q: "كيف أحجز زيارة صيانة؟", a: "أرسل لنا تفاصيل مشروعك وموقعك عبر واتساب أو نموذج التواصل، وسنقوم بترتيب معاينة في الموقع." }
      ],
      ctaTitle: "احجز تقييم صيانة للأثاث",
      relatedServices: "خدمات ذات صلة",
      relatedJoinery: "النجارة المعمارية",
      relatedWardrobes: "خزائن مخصصة"
    },
    aboutPage: {
      navTitle: "من نحن",
      pageTitle: "عن بيت الإبداع",
      metaTitle: "من نحن | بيت الإبداع",
      metaDescription: "بيت الإبداع شركة تصميم داخلي وتجهيز شامل ونجارة معمارية مقرها عجمان، تخدم دبي وأبوظبي بتصنيع داخلي خاص.",
      intro: "بيت الإبداع شركة تصميم داخلي وتجهيز شامل ونجارة معمارية تخدم دبي وأبوظبي. ننفّذ تصاميم الفلل والمكاتب من المفهوم الأولي وحتى التسليم النهائي، بإدارة فريق واحد مسؤول عن التصميم والموافقات والتصنيع والتركيب، دون سلسلة من مقاولين من الباطن منفصلين.",
      sections: {
        whatWeDo: { title: "ماذا نقدّم", body: "يشمل عملنا التصميم الداخلي، والتجهيز الشامل، وتجهيز المكاتب، وتجديد الفلل والشقق، والنجارة المعمارية المخصصة — بما في ذلك الخزائن والمطابخ المصممة حسب الطلب. يتم تحديد نطاق كل مشروع وتصميمه وتسعيره بشكل فردي، دون أي قوالب جاهزة." },
        manufacturing: { title: "تصنيع داخلي خاص", body: "نُدير مصنع نجارة بمساحة 15,000 قدم مربع في الجرف الصناعية 2، عجمان، مجهّزاً بآلات CNC وبأكثر من 50 نجاراً، باستخدام خشب وقشرة أوروبية. تصنيع النجارة داخلياً — بدلاً من تعهيدها لجهات خارجية — هو ما يتيح لنا تقديم ضمان جودة الصنعة لمدة 5 سنوات على القطع التي نصنّعها ونركّبها." },
        serviceAreas: { title: "مناطق الخدمة", body: "ننفّذ مشاريعنا في دبي وأبوظبي. عنواننا المسجّل ومنشأة التصنيع الخاصة بنا في عجمان." },
        approvals: { title: "موافقات الجهات الحكومية", body: "يتولى فريق الامتثال الداخلي لدينا تقديم الطلبات والمتابعة مباشرة مع بلدية دبي وسلطة دبي للتطوير وتراخيص وبلدية أبوظبي (دائرة البلديات والنقل) والدفاع المدني، بحيث لا يحتاج العميل للتعامل مع إجراءات الجهات الحكومية بنفسه." },
        projects: { title: "خبرة في المشاريع الفعلية", body: "من أعمالنا الأخيرة مقر لهيئة حكومية سرية في مدينة دبي الأكاديمية — مشروع تجهيز داخلي وأعمال كهروميكانيكية بمساحة 50,500 قدم مربع على ثلاثة طوابق. راجع صفحة مشاريعنا للتفاصيل." },
      },
      companyDetailsTitle: "بيانات الشركة",
      companyDetails: {
        name: "الاسم القانوني",
        nameValue: "بيت الإبداع",
        address: "العنوان المسجّل",
        addressValue: "معرض رقم 052004009، الجرف الصناعية 2، عجمان، الإمارات",
        phone: "الهاتف",
        email: "البريد الإلكتروني",
      },
      projectsCta: "استعرض مشاريعنا",
      contactCta: "تواصل معنا",
    },
    privacyPolicyPage: {
      navTitle: "سياسة الخصوصية",
      pageTitle: "سياسة الخصوصية",
      metaTitle: "سياسة الخصوصية | بيت الإبداع",
      metaDescription: "كيف تجمع بيت الإبداع وتستخدم وتحمي المعلومات الشخصية المُرسلة عبر نماذج الموقع وقنوات التواصل.",
      lastUpdated: "آخر تحديث: 24 سبتمبر 2026",
      intro: "توضّح هذه الصفحة المعلومات التي تجمعها بيت الإبداع ('نحن') عند استخدامك لموقع www.baitalebdaa.com، وكيفية استخدامها. نجمع فقط ما هو ضروري للرد على استفسارك.",
      sections: [
        {
          title: "المعلومات التي نجمعها",
          body: "نجمع المعلومات التي ترسلها مباشرة عبر نموذج التواصل، ونموذج طلب عرض السعر، ونموذج التوظيف: اسمك، بريدك الإلكتروني، رقم هاتفك، وأي تفاصيل تختار مشاركتها عن مشروعك أو شركتك أو طلب التوظيف (بما في ذلك ملف السيرة الذاتية لطلبات التوظيف). لا نطلب إنشاء حساب، ولا نجمع معلومات الدفع على هذا الموقع.",
        },
        {
          title: "كيف نستخدم معلوماتك",
          body: "تُرسل نماذج الموقع كبريد إلكتروني مباشر إلى فريقنا باستخدام Resend، وهي خدمة بريد إلكتروني تشغيلية تعالج رسالتك نيابةً عنا لتوصيلها إلينا — تخضع معالجة Resend لهذه البيانات لسياسة الخصوصية الخاصة بها (resend.com/legal/privacy-policy)، لا لهذه السياسة. نستخدم المعلومات التي ترسلها فقط للرد على استفسارك أو طلب عرض السعر أو طلب التوظيف، ولا نبيع أو نؤجر أو نشارك معلوماتك مع أطراف ثالثة لأغراض تسويقية.",
        },
        {
          title: "واتساب",
          body: "أزرار واتساب على هذا الموقع تفتح محادثة في واتساب برسالة معبأة مسبقاً. هذا يفتح خدمة واتساب الخاصة، التي لها سياسة خصوصية مستقلة؛ لا نتحكم في كيفية معالجة واتساب لبياناتك. أي تفاصيل ترسلها لنا عبر واتساب تُستخدم بنفس طريقة استفسار الموقع: للرد عليك.",
        },
        {
          title: "ملفات تعريف الارتباط والتحليلات",
          body: "لا يستخدم هذا الموقع حالياً ملفات تعريف ارتباط للتتبع أو الإعلانات، ولا يستخدم التخزين المحلي في المتصفح. إذا فعّلنا Google Analytics في المستقبل، سنحدّث هذه السياسة لوصف ملفات تعريف الارتباط التي يستخدمها وكيفية إلغاء الاشتراك.",
        },
        {
          title: "الاحتفاظ بالبيانات",
          body: "نحتفظ برسائل الاستفسارات وطلبات التوظيف فقط للمدة اللازمة بشكل معقول للغرض الذي استُلمت من أجله، ووفقاً لمتطلبات العمل أو المتطلبات القانونية المشروعة. يمكنك التواصل معنا لطلب حذف معلوماتك الشخصية، مع مراعاة أي احتفاظ بالبيانات نكون ملزمين أو مسموحاً لنا بالاحتفاظ به. لا نتحكم، ولم نتحقق من، مدة احتفاظ Resend نفسها بالبيانات أثناء معالجة رسالتك نيابةً عنا — يُرجى مراجعة سياسة خصوصية Resend لذلك.",
        },
        {
          title: "حقوقك",
          body: "يمكنك في أي وقت أن تسألنا عن المعلومات التي نحتفظ بها عنك، أو تطلب تصحيحها، أو تطلب حذفها مع مراعاة أي احتفاظ بالبيانات نكون ملزمين أو مسموحاً لنا بالاحتفاظ به، عبر البريد الإلكتروني info@baitalebdaa.com.",
        },
        {
          title: "التواصل",
          body: "يمكن إرسال الأسئلة حول هذه السياسة إلى info@baitalebdaa.com أو معرض رقم 052004009، الجرف الصناعية 2، عجمان، الإمارات.",
        },
      ],
      legalReviewNote: "تصف هذه السياسة المعالجة الفعلية الحالية لبيانات الموقع ولم تتم مراجعتها من قبل محامٍ. يرجى التأكد من توافقها مع قانون حماية البيانات الشخصية الإماراتي (PDPL) أو أي متطلبات تنظيمية أخرى تنطبق على نشاطك قبل الاعتماد عليها.",
    },
    termsPage: {
      navTitle: "الشروط والأحكام",
      pageTitle: "الشروط والأحكام",
      metaTitle: "الشروط والأحكام | بيت الإبداع",
      metaDescription: "الشروط التي تحكم استخدام موقع بيت الإبداع الإلكتروني، بما في ذلك آلية عمل عروض الأسعار وحاسبة التكلفة ونماذج الاستفسار.",
      lastUpdated: "آخر تحديث: 25 سبتمبر 2026",
      intro: "تحكم هذه الشروط استخدامك لموقع www.baitalebdaa.com ('الموقع'). من خلال تصفح الموقع أو إرسال أحد النماذج، فإنك توافق عليها. تغطي هذه الشروط الموقع الإلكتروني فقط — أي مشروع تجهيز داخلي أو نجارة فعلي يخضع لاتفاقية موقّعة منفصلة.",
      sections: [
        {
          title: "محتوى الموقع",
          body: "النصوص والصور الفوتوغرافية والعروض ثلاثية الأبعاد وجداول الأسعار وأوصاف المشاريع على هذا الموقع مُقدَّمة كمعلومات عامة عن خدمات بيت الإبداع، ويتم تحديثها بشكل دوري. نبذل عناية معقولة للحفاظ على دقتها، لكننا لا نضمن أن كل رقم أو صورة يعكس الحالة الراهنة لكل مشروع أو سعر في جميع الأوقات.",
        },
        {
          title: "الأسعار وحاسبة التكلفة وعروض الأسعار",
          body: "الأسعار الموضحة في صفحة الأسعار والأرقام الناتجة عن حاسبة التكلفة على الموقع هي إرشادات أولية تقديرية مبنية على نطاق وحجم نموذجيين، وليست عرض سعر ملزماً. يُصدر السعر النهائي فقط بعد معاينة الموقع، ويتم تأكيده في عرض سعر مكتوب. إرسال نموذج، أو استخدام الحاسبة، أو مراسلتنا عبر واتساب هو استفسار وليس طلب شراء — لا يبدأ أي عمل في المشروع، ولا يُعقد أي عقد، إلى أن يوقّع الطرفان اتفاقية مشروع تحدد النطاق النهائي والسعر وجدول الدفع والجدول الزمني.",
        },
        {
          title: "اتفاقيات المشاريع",
          body: "أي مشروع تجهيز داخلي أو نجارة أو تصميم بحد ذاته — بما في ذلك شروط الدفع والجداول الزمنية للتسليم والتعديلات والإلغاء وضمان جودة الصنعة المُشار إليه في هذا الموقع — يخضع لتلك الاتفاقية الموقّعة المنفصلة، وليس لشروط الموقع هذه. في حال وجود تعارض بينهما بخصوص مشروع قائم، تكون الاتفاقية الموقّعة هي الفيصل.",
        },
        {
          title: "الملكية الفكرية",
          body: "تصميم الموقع ونصوصه وصوره الفوتوغرافية وعروضه ثلاثية الأبعاد مملوكة لبيت الإبداع أو مُستخدمة بترخيص، ولا يجوز إعادة إنتاجها دون إذن. التصاميم المفاهيمية أو العروض أو الرسومات المُعدّة لاستفسار محدد تبقى ملكاً لبيت الإبداع ما لم تنص اتفاقية المشروع الموقّعة على خلاف ذلك.",
        },
        {
          title: "خدمات الأطراف الثالثة",
          body: "تُرسل نماذج الموقع باستخدام Resend، وأزرار واتساب تفتح خدمة واتساب التابعة لـ Meta مباشرة — تعمل كل خدمة وفق شروطها وسياسة خصوصيتها الخاصة، التي لا نتحكم بها. راجع سياسة الخصوصية لمعرفة كيفية تعاملنا مع المعلومات التي ترسلها لنا مباشرة.",
        },
        {
          title: "حدود المسؤولية",
          body: "يُقدَّم الموقع ومحتواه \"كما هو\" لأغراض إرشادية عامة. وإلى الحد الذي يسمح به قانون دولة الإمارات العربية المتحدة، لا تتحمل بيت الإبداع مسؤولية القرارات المتخذة بناءً فقط على المحتوى الإرشادي في هذا الموقع — بما في ذلك نتائج الحاسبة أو الأسعار المعروضة — قبل وجود عرض سعر مكتوب أو اتفاقية مشروع موقّعة.",
        },
        {
          title: "القانون الحاكم",
          body: "تخضع هذه الشروط لقوانين دولة الإمارات العربية المتحدة، وأي نزاع متعلق بالموقع يقع ضمن اختصاص محاكم عجمان، الإمارات العربية المتحدة.",
        },
        {
          title: "التواصل",
          body: "يمكن إرسال الأسئلة حول هذه الشروط إلى info@baitalebdaa.com أو معرض رقم 052004009، الجرف الصناعية 2، عجمان، الإمارات.",
        },
      ],
      legalReviewNote: "تصف هذه الشروط الإعداد الفعلي الحالي للموقع ولم تتم مراجعتها من قبل محامٍ. يُرجى مراجعتها مقابل قانون حماية المستهلك وقانون العقود الإماراتي قبل الاعتماد عليها تجارياً.",
    },
    contactPage: {
      navTitle: "اتصل بنا",
      pageTitle: "لنتحدث عن مشروعك",
      metaTitle: "اتصل بنا | بيت الإبداع",
      metaDescription: "تواصل مع بيت الإبداع لخدمات التصميم الداخلي والتشطيبات الكاملة والنجارة في جميع أنحاء الإمارات — اطلب عرض سعر، أو ناقش التوريد، أو تقدم لوظيفة."
    },
    pricingPage: {
      navTitle: "الأسعار",
      pageTitle: "أسعار ابتدائية واضحة. نتائج نهائية مصممة خصيصًا لك.",
      metaTitle: "أسعار التصميم الداخلي والتشطيب في دبي | بيت الإبداع",
      metaDescription: "تكلفة تقديرية للتجهيز الشامل والتصميم الداخلي وتجديد الفلل والنجارة في دبي — إضافة إلى أسعار ابتدائية للخزائن وخزائن المطبخ وستائر سومفي.",
      heroBody: "اطّلع على تكلفة التجهيز الشامل وتكلفة النجارة وتكلفة التصميم الداخلي للفلل والمكاتب والأثاث المخصص في دبي وأبوظبي. كل مشروع يُقاس ويُحدد نطاقه ويُسعّر بشكل فردي.",
      heroPrimaryCta: "احصل على تقدير مشروعي",
      heroSecondaryCta: "تحدث عبر واتساب",
      heroTrust: "استشارة أولية مجانية • نطاق عمل تفصيلي • عرض سعر شفاف",
      whatsappMessage: "مرحباً! اطلعت على صفحة الأسعار لديكم وأرغب بالحصول على تقدير لمشروعي.",
      globalDisclaimer: "الأسعار المعروضة هي تقديرات ابتدائية مبنية على ظروف قياسية ومواصفات مختارة. يتم تأكيد السعر النهائي بعد القياس ومراجعة النطاق واختيار المواد والتقييم الفني. الأسعار غير شاملة ضريبة القيمة المضافة 5٪، ورسوم الجهات الحكومية، والوصول المتخصص، والرسوم الخارجية، ما لم تكن مدرجة صراحة في عرض السعر.",
      tableHeaders: { product: "المنتج / الخدمة", price: "السعر الابتدائي" },
      items: {
        "curtain-pinch-sheer": "ستائر شفافة مطوية (Pinch-pleat)",
        "curtain-wave-sheer": "ستائر شفافة موجية (Wave)",
        "curtain-pinch-blackout": "ستائر بلاك اوت مطوية",
        "curtain-wave-blackout": "ستائر بلاك اوت موجية",
        "curtain-pinch-layered": "ستائر متعددة الطبقات مطوية",
        "curtain-wave-layered": "ستائر متعددة الطبقات موجية",
        "somfy-sheer": "ستائر شفافة كهربائية سومفي",
        "somfy-blackout": "ستائر بلاك اوت كهربائية سومفي",
        "somfy-layered": "ستائر متعددة الطبقات كهربائية سومفي",
        "somfy-hub": "وحدة التحكم الذكية سومفي (Hub / تطبيق)",
        "somfy-remote": "جهاز تحكم / قناة إضافية سومفي",
        "wardrobe-laminate": "خزانة لامينيت",
        "wardrobe-lacquer": "خزانة لاكيه / فينير فاخرة",
        "wardrobe-luxury": "خزانة فاخرة بإكسسوارات متميزة",
        "media-basic": "وحدة تلفزيون / حائط إعلامي أساسية",
        "media-led": "حائط إعلامي مع تخزين وإضاءة LED",
        "media-stone": "حائط إعلامي فاخر بالحجر والنجارة",
        "bed-headboard": "سرير مخصص منجد / لوح رأس",
        "dressing-table": "طاولة تسريحة",
        "sofa-3seat": "كنبة ثلاثية مقاعد مخصصة",
        "banquette": "مقاعد مدمجة (Banquette)",
        "kitchen-laminate": "مطبخ لامينيت",
        "kitchen-lacquer": "مطبخ لاكيه / فينير",
        "kitchen-premium": "مطبخ فاخر",
        "design-consultation": "استشارة أولية",
        "design-survey": "مسح الموقع (داخل دبي، حسب ملاءمة المشروع)",
        "design-single-room": "تصور غرفة واحدة + رندر ثلاثي الأبعاد واقعي",
        "design-apartment": "باقة تصميم شقة",
        "design-townhouse": "باقة تصميم تاون هاوس",
        "design-villa": "باقة تصميم فيلا",
        "design-office": "باقة تصميم مكتب",
        "design-drawings": "مخططات تنفيذية تفصيلية",
        "design-material-schedule": "جدول مواصفات المواد",
        "villa-selective": "تحديث داخلي انتقائي",
        "villa-townhouse": "تشطيب تاون هاوس كامل",
        "villa-standard": "تشطيب فيلا قياسي",
        "villa-luxury": "تشطيب فيلا فاخر",
        "villa-bespoke": "تشطيب فيلا مصمم بالكامل حسب الطلب",
        "office-essential": "تشطيب مكتب أساسي",
        "office-premium": "تشطيب مكتب متميز",
        "office-luxury": "مكتب تنفيذي / فاخر",
        "approval-noc": "تنسيق عدم ممانعة المالك / المجتمع السكني",
        "approval-dm": "دعم الحصول على موافقة بلدية دبي",
        "approval-office-package": "باقة موافقة تشطيب مكتب كاملة",
        "approval-civil-defence": "تنسيق موافقة الدفاع المدني / الأنظمة الكهروميكانيكية / جهات متخصصة"
      },
      groups: {
        curtainsManual: {
          kicker: "الستائر",
          title: "الستائر اليدوية",
          subtitle: "أسعار ابتدائية لنافذة قياسية حتى 2×3 متر تقريبًا. يعتمد السعر النهائي على الأبعاد الدقيقة والقماش والتشطيب المختار.",
          cta: "احجز قياسًا مجانيًا"
        },
        curtainsSomfy: {
          kicker: "أتمتة سومفي",
          title: "ستائر سومفي الكهربائية",
          subtitle: "يمكن أن تشمل الباقة المحددة محرك سومفي أصلي، سكة كهربائية متوافقة، مجموعة أقمشة مختارة، تركيب احترافي، برمجة أولية، وضمان مكتوب مطبق على المنتج / التصنيع.",
          note: "نقاط الكهرباء، الأسلاك المخفية، الأقمشة الفاخرة، الوصول المتخصص، والتكامل المتقدم مع المنزل الذكي تُسعّر بشكل منفصل.",
          cta: "خصص ستائري"
        },
        joineryWardrobes: {
          kicker: "النجارة المخصصة",
          title: "الخزائن",
          subtitle: "سعر الخزائن المخصصة بالمتر الطولي، ومُصنّعة في مصنعنا الخاص بعجمان.",
          cta: "قدّر خزانتي"
        },
        joineryMedia: {
          kicker: "النجارة المخصصة",
          title: "الحوائط الإعلامية والأثاث المخصص",
          subtitle: "أسعار ابتدائية للحوائط الإعلامية المخصصة والأسرّة والمقاعد وقطع الأثاث المخصص الأخرى في دبي.",
          cta: "شارك أبعاد الحائط"
        },
        joineryKitchens: {
          kicker: "النجارة المخصصة",
          title: "المطابخ",
          subtitle: "سعر المطبخ المخصص وخزائن المطبخ بالمتر الطولي لنجارة المطبخ في دبي.",
          cta: "اطلب تقدير مطبخ"
        },
        design: {
          kicker: "التصميم والتصور ثلاثي الأبعاد",
          title: "باقات التصميم والتصور ثلاثي الأبعاد",
          subtitle: "نطاقات إرشادية لتكلفة وسعر التصميم الداخلي، من الاستشارة الأولية المجانية إلى باقات تصميم الفلل الكاملة، مع تصورات ثلاثية الأبعاد واقعية قبل بدء التنفيذ.",
          note: "قد تُخصم رسوم التصميم المستحقة من قيمة المشروع عند تعيين بيت الإبداع لتنفيذ التشطيب الكامل، وذلك وفقًا لقيمة العقد والشروط المتفق عليها.",
          cta: "احجز استشارة تصميم"
        },
        villa: {
          kicker: "تشطيب الفلل",
          title: "تشطيب الفلل والمساكن",
          subtitle: "نطاقات إرشادية لتكلفة وسعر تجديد الفلل في دبي والمساكن السكنية.",
          note: "تعتمد الميزانيات النهائية على حالة العقار وحجم المشروع والتغييرات الإنشائية أو الكهروميكانيكية والمطابخ والحمامات والنجارة والأثاث ومستوى التشطيب.",
          cta: "خطط لمشروع فيلتي"
        },
        office: {
          kicker: "تشطيب المكاتب",
          title: "نطاقات ميزانية تشطيب المكاتب",
          subtitle: "نطاقات إرشادية لتكلفة وسعر تجهيز المكاتب التجارية في دبي.",
          note: "تختلف نطاقات الميزانية وفقًا لحالة الهيكل الأساسي ونطاق الأنظمة الكهروميكانيكية ومتطلبات الجهات الحكومية والنجارة والأثاث والتقنية والتشطيبات المختارة.",
          cta: "اطلب ميزانية تشطيب"
        },
        approvals: {
          kicker: "الموافقات",
          title: "الموافقات وتنسيق عدم الممانعة",
          subtitle: "تنسيق متكامل مع الملاك والمجتمعات السكنية والجهات الحكومية في جميع أنحاء الإمارات.",
          note: "رسوم الجهات الحكومية والمطورين والاستشاريين والرسوم النظامية تُحتسب منفصلة وبسعرها الفعلي. تبقى المتطلبات والمدد الزمنية خاضعة للجهة المختصة.",
          cta: "ناقش متطلبات الموافقة"
        }
      },
      hardwareTitle: "الإكسسوارات مصنفة على ثلاثة مستويات:",
      hardwareLevels: ["قياسي — إكسسوارات إغلاق ناعم", "متميز — Häfele / Hettich أو ما يعادلها من نطاق محدد", "فاخر — Blum أو ما يعادلها من نطاق محدد"],
      joineryDisclaimer: "يعتمد سعر النجارة النهائي على الأبعاد والتوزيع الداخلي والخامة الأساسية والتشطيب والإكسسوارات والملحقات وظروف التركيب.",
      finalCta: {
        title: "احجز زيارة موقع مجانية",
        body: "احصل على القياسات وتوصيات المواد وعرض سعر تفصيلي دون أي بنود عمل خفية.",
        button: "احجز زيارة موقع"
      }
    },
    quoteModal: {
      title: "احصل على عرض سعر مجاني",
      subtitle: "بيت الإبداع // ضمان الرد خلال 24 ساعة",
      ratingLabel: "تقييم جوجل الرسمي",
      reviewsText: "4.9/5 (أكثر من 180 تقييماً)",
      fullName: "الاسم الكامل",
      fullNamePlaceholder: "مثال: الشيخ محمد القاسمي",
      email: "البريد الإلكتروني",
      emailPlaceholder: "مثال: client@domain.ae",
      phone: "رقم الهاتف الإماراتي",
      propertySize: "مساحة العقار (قدم مربع)",
      serviceType: "نوع الخدمة",
      serviceOptions: ["تجهيز شامل (مدني + كهروميكانيك)", "نجارة مخصصة فقط", "ستائر سومفي الآلية", "جميع ما سبق"],
      locationLabel: "الإمارة",
      locationOptions: [
        "دبي (تصاريح بلدية دبي وسلطة التطوير وتراخيص)",
        "أبوظبي (تصاريح بلدية أبوظبي والدفاع المدني)",
        "الشارقة",
        "عجمان",
        "رأس الخيمة",
        "الفجيرة",
        "أم القيوين",
      ],
      descriptionLabel: "وصف المشروع (اختياري)",
      descriptionPlaceholder: "أخبرنا عن رؤيتك...",
      submit: "احصل على عرض السعر",
      whatsappCta: "أو تحدث عبر واتساب",
      success: "شكراً لك — سنرد خلال 24 ساعة.",
      sending: "جارٍ الإرسال...",
      error: "حدث خطأ ما. يرجى المحاولة عبر واتساب بدلاً من ذلك.",
    },
    contactSection: {
      mainHeading: "لنتحدث",
      heading: "أنا أتقدم لـ",
      types: ["نموذج المشروع", "نموذج المشتريات", "الوظائف"],
      placeholders: {
        fullName: "الاسم الكامل",
        email: "البريد الإلكتروني",
        mobile: "رقم الجوال",
        selectCountry: "اختر الدولة",
        applyingFor: "التقدم لـ",
        linkedin: "رابط LinkedIn",
        message: "اكتب رسالتك هنا",
        jobTitle: "المسمى الوظيفي",
        phone: "الهاتف",
        companyName: "اسم الشركة",
        companyDomain: "اسم مجال الشركة (URL)",
        companyPhone: "هاتف الشركة",
        companyEmail: "البريد الإلكتروني للشركة",
        companyLinkedin: "صفحة LinkedIn للشركة",
        companyAddress: "عنوان شارع الشركة",
        city: "المدينة",
        region: "المنطقة",
        description: "الوصف",
        emailAddress: "عنوان البريد الإلكتروني",
        phoneNumber: "رقم الهاتف",
        whatToCreate: "ماذا تود أن تنشئ؟"
      },
      countries: ["الإمارات", "السعودية", "أخرى"],
      locations: ["دبي", "أبوظبي", "الإمارات الأخرى"],
      contactPerson: "تفاصيل جهة الاتصال",
      companyDetails: "تفاصيل الشركة",
      uploadCV: "رفع السيرة الذاتية",
      sendRequest: "إرسال الطلب",
      success: "شكراً لك - تم إرسال طلبك.",
      sending: "جارٍ الإرسال...",
      error: "حدث خطأ ما. يرجى المحاولة مرة أخرى أو التواصل عبر واتساب."
    },
    footer: {
      newsletter: "النشرة الإخبارية",
      headline: "سجل لتلقي\nآخر الأخبار والتحديثات!",
      emailLabel: "البريد الإلكتروني",
      emailPlaceholder: "أدخل بريدك الإلكتروني",
      subscribe: "اشتراك",
      subscribing: "جارٍ الاشتراك…",
      subscribed: "شكراً — تم اشتراكك بنجاح.",
      subscribeError: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
      explore: "استكشف",
      exploreLinks: ["الرئيسية", "من نحن", "المشاريع", "الخدمات", "الأسعار", "اتصل بنا"],
      importantLinks: "روابط مهمة",
      importantLinksItems: ["سياسة الخصوصية", "الشروط والأحكام"],
      contactInfo: "معلومات الاتصال",
      salesLabel: "المبيعات:",
      loc: "الجرف الصناعية 2، عجمان، الإمارات:",
      backToTop: "العودة للأعلى",
      privacy: "سياسة الخصوصية",
      terms: "الشروط والأحكام",
      copy: "حقوق الطبع والنشر © 2026 بيت الإبداع. جميع الحقوق محفوظة."
    },
    ourProjectsPage: {
      metaTitle: "مشاريعنا | بيت الإبداع",
      metaDescription: "تصفح محفظة أعمال بيت الإبداع من مشاريع تجهيز الفلل والمكاتب والضيافة في الإمارات، من المفهوم حتى التسليم.",
      home: "الرئيسية",
      ourProjects: "مشاريعنا",
      explorePortfolio: "استكشف محفظة مشاريعنا",
      projectsPortfolio: "محفظة المشاريع",
      redefiningHeading: "إعادة تعريف المساحات بحلول تجهيز داخلي مخصصة",
      redefiningBody: "من مؤسسات تناول الطعام الفاخرة إلى المكاتب التجارية والعقارات السكنية وأماكن الترفيه، نتعامل مع كل مشروع بشغف ودقة، مما يضمن التنفيذ السلس والنتائج الاستثنائية المصممة خصيصاً لاحتياجاتك.",
      filters: {
        all: "جميع المشاريع",
        hospitality: "الضيافة",
        fnb: "المأكولات والمشروبات",
        commercial: "التجاري",
        residential: "السكني"
      }
    },
    projectDetailPage: {
      projectOverview: "نظرة عامة على المشروع",
      stayConnected: "ابق على تواصل",
      labels: {
        location: "الموقع",
        sector: "القطاع",
        size: "المساحة",
        year: "السنة",
        service: "الخدمة",
        scope: "نطاق العمل",
        relatedServices: "خدمات ذات صلة"
      },
      projects: {
        "government-authority": {
          title: "المقر الرئيسي السري لهيئة حكومية، مدينة دبي الأكاديمية",
          description: "تجهيزات داخلية وأعمال كهروميكانيكية لمقر رئيسي سري لهيئة حكومية في مدينة دبي الأكاديمية، بمساحة 50,500 قدم مربع موزعة على ثلاثة طوابق.\n\nيعتمد التصميم أسلوباً بسيطاً ومريحاً يشبه أجواء المنزل، بدرجات ناعمة من البيج والبني والأبيض وملمس طبيعي، مع إعطاء الأولوية لراحة الموظفين ورفاهيتهم.\n\nتشجع مناطق الأقسام المتميزة على التفاعل وتبادل المعرفة، وتعزز في الوقت نفسه هوية كل فريق وقيمه وأهدافه.\n\nتدعم محطات العمل المريحة ومكاتب الجلوس والوقوف وعناصر الخصوصية وحلول التحكم في الضوضاء التركيز والمرونة معاً.\n\nوتتنوع مساحات التعاون لتناسب أنماط العمل المختلفة، مما يشجع على الإبداع والشمولية والعمل الجماعي الفعّال.",
          metadata: {
            location: "مدينة دبي الأكاديمية، الإمارات",
            sector: "تجاري",
            size: "50,500 قدم مربع",
            year: "2026",
            service: "التجهيزات الداخلية والأعمال الكهروميكانيكية"
          },
          scope: [
            "أعمال التجهيزات الداخلية على ثلاثة طوابق (50,500 قدم مربع)",
            "الأعمال الكهروميكانيكية",
            "مناطق أقسام مصممة وفق أهداف كل فريق",
            "محطات عمل مريحة ومكاتب للجلوس والوقوف",
            "حلول الخصوصية والتحكم في الضوضاء",
            "مساحات تعاون تناسب أنماط العمل المختلفة"
          ],
          related: [
            { label: "تجهيز المكاتب في دبي", href: "/ar/office-fit-out/dubai" },
            { label: "خدمات التجهيز الشامل في دبي", href: "/ar/fit-out/dubai" }
          ],
          images: [
            "/assets/project-office.jpg",
            "/assets/hero-penthouse.jpg",
            "/assets/project-villa.jpg",
            "/assets/cad-render.jpg"
          ]
        },
        "dubai-hills-estate-villa": {
          title: "فيلا فاخرة في دبي هيلز إستيت",
          description: "تجهيز فيلا بنظام تسليم مفتاح كامل في دبي هيلز إستيت — تصميم داخلي وأعمال مدنية ونجارة من خشب الجوز الأوروبي بإشراف فريق واحد مسؤول.\n\nطلب المشروع لوحة ألوان دافئة ومعاصرة. صُنعت الخزائن المثبتة وجدار الوسائط ووحدات التسريح المخصصة من خشب الجوز الأوروبي في مصنعنا بعجمان وتم تركيبها في الموقع، ليبقى تناسق النجارة والتشطيبات من غرفة إلى أخرى.\n\nجرى تنسيق سكك الستائر الآلية والإضاءة متعددة الطبقات مع تركيب النجارة، لتحصل العائلة على منزل متكامل يعمل بسلاسة منذ يوم التسليم.",
          metadata: {
            location: "دبي هيلز إستيت، دبي، الإمارات",
            sector: "سكني",
            size: "8,200 قدم مربع",
            year: "2026",
            service: "تسليم مفتاح كامل ونجارة مخصصة"
          },
          scope: [
            "التصميم الداخلي وتخطيط المساحات",
            "الأعمال المدنية وأعمال التشطيب",
            "نجارة مخصصة من خشب الجوز الأوروبي — خزائن وجدار وسائط ووحدات تسريح",
            "تنسيق الستائر الآلية والإضاءة متعددة الطبقات",
            "المعاينة النهائية والتسليم"
          ],
          related: [
            { label: "التجهيز الشامل في دبي", href: "/ar/fit-out/dubai" },
            { label: "النجارة المعمارية المخصصة", href: "/ar/joinery/dubai" },
            { label: "التصميم الداخلي في دبي", href: "/ar/interior-design/dubai" }
          ],
          images: [
            "/assets/project-villa.jpg",
            "/assets/bed-1.jpeg",
            "/assets/dressing-unit-1.jpeg",
            "/assets/curtains-1.jpeg"
          ]
        },
        "palm-jumeirah-penthouse": {
          title: "بنتهاوس على الواجهة البحرية في نخلة جميرا",
          description: "بنتهاوس على الواجهة البحرية في نخلة جميرا أُعيد تصميمه حول إطلالات بحرية مفتوحة، مع ستائر سومفي آلية ونجارة مصنّعة داخلياً.\n\nتترك لوحة المواد الهادئة والمحايدة المجال للإطلالة لتكون العنصر الأبرز. تتحكم ستائر سومفي الآلية بالإضاءة والخصوصية دون حجب خطوط الرؤية نحو الخليج، بينما توحّد الألواح الإيطالية مساحتي المعيشة والطعام.\n\nصُنعت النجارة — من جدار الوسائط إلى غرفة التسريح — داخلياً وتم تركيبها بما يناسب القيود الإنشائية القائمة في البنتهاوس.",
          metadata: {
            location: "نخلة جميرا، دبي، الإمارات",
            sector: "سكني",
            size: "5,400 قدم مربع",
            year: "2026",
            service: "تصميم داخلي وستائر سومفي الآلية"
          },
          scope: [
            "مفهوم التصميم الداخلي ولوحة المواد",
            "ستائر وسكك سومفي الآلية",
            "ألواح جدارية إيطالية",
            "نجارة مخصصة — جدار الوسائط وغرفة التسريح",
            "تركيب منسّق حول الهيكل الإنشائي القائم"
          ],
          related: [
            { label: "التصميم الداخلي في دبي", href: "/ar/interior-design/dubai" },
            { label: "النجارة المعمارية المخصصة", href: "/ar/joinery/dubai" }
          ],
          images: [
            "/assets/hero-penthouse.jpg",
            "/assets/curtains-2.jpeg",
            "/assets/bed-2.jpeg",
            "/assets/dining-table.jpeg"
          ]
        },
        "downtown-dubai-tech-hq": {
          title: "مقر شركة تقنية في وسط مدينة دبي",
          description: "تجهيز مكتب شركة تقنية في وسط مدينة دبي، شمل تنسيق الأعمال الكهروميكانيكية وموافقات بلدية دبي وتنفيذ التصميم الداخلي بالكامل.\n\nجرى تشطيب محطات العمل المفتوحة وغرف الاجتماعات ومنطقة الاستقبال بألواح نجارة مخصصة، مع تصميم إدارة الأسلاك والمعالجة الصوتية ضمن المخطط منذ البداية بدلاً من إضافتها لاحقاً.\n\nنفّذ فريق التصميم والتجهيز الداخلي في بيت الإبداع المشروع من البداية إلى النهاية، بما في ذلك جميع التقديمات للجهات المختصة.",
          metadata: {
            location: "وسط مدينة دبي، دبي، الإمارات",
            sector: "تجاري",
            size: "12,000 قدم مربع",
            year: "2026",
            service: "تجهيز مكاتب وأعمال كهروميكانيكية"
          },
          scope: [
            "تخطيط المساحات لمحطات العمل المفتوحة وغرف الاجتماعات",
            "تنسيق الأعمال الكهروميكانيكية",
            "موافقات بلدية دبي والتقديمات للجهات المختصة",
            "ألواح نجارة مخصصة لمنطقة الاستقبال وغرف الاجتماعات",
            "معالجة صوتية وإدارة الأسلاك"
          ],
          related: [
            { label: "تجهيز المكاتب في دبي", href: "/ar/office-fit-out/dubai" },
            { label: "خدمات التجهيز الشامل في دبي", href: "/ar/fit-out/dubai" }
          ],
          images: [
            "/assets/project-office.jpg",
            "/assets/tv-unit-1.jpeg",
            "/assets/cad-render.jpg",
            "/assets/cabinet-joinery.jpeg"
          ]
        },
        "al-barari-eco-villa": {
          title: "جناح فيلا صديقة للبيئة في البراري",
          description: "تجديد جناح فيلا في البراري بخزائن جوز مخصصة ومفروشات ناعمة، بلوحة ألوان طبيعية تناسب الطابع الأخضر للمجتمع.\n\nاستُبدلت النجارة القديمة بخزائن ووحدات تسريح مصنّعة خصيصاً تناسب المواد الطبيعية في الفيلا.\n\nوتكتمل الغرفة بسكك ستائر جديدة ومعالجات نوافذ متعددة الطبقات تضفي نعومة وتتحكم بالإضاءة.",
          metadata: {
            location: "البراري، دبي، الإمارات",
            sector: "سكني",
            size: "6,800 قدم مربع",
            year: "2025",
            service: "تجديد فلل وخزائن مخصصة"
          },
          scope: [
            "إزالة النجارة القائمة",
            "خزائن جوز ووحدات تسريح مخصصة",
            "سكك ستائر ومعالجات نوافذ متعددة الطبقات",
            "مفروشات ناعمة"
          ],
          related: [
            { label: "تجديد الفلل في دبي", href: "/ar/villa-renovation/dubai" },
            { label: "الخزائن المخصصة في دبي", href: "/ar/custom-wardrobes/dubai" }
          ],
          images: [
            "/assets/project-villa.jpg",
            "/assets/dressing-unit-2.jpeg",
            "/assets/bed-3.jpeg",
            "/assets/curtains-3.jpeg"
          ]
        },
        "saadiyat-island-villa": {
          title: "فيلا سكنية في جزيرة السعديات",
          description: "فيلا بنظام تسليم مفتاح كامل في جزيرة السعديات بأبوظبي — تصميم داخلي وتنسيق مدني ونجارة معمارية من المفهوم حتى التسليم.\n\nصُنع جدار الوسائط والخزائن المثبتة وجناح التسريح في مصنعنا بعجمان وتم تركيبها في الموقع.\n\nطُوِّر التصميم منذ البداية وفق متطلبات موافقات بلدية أبوظبي (دائرة البلديات والنقل).",
          metadata: {
            location: "جزيرة السعديات، أبوظبي، الإمارات",
            sector: "سكني",
            size: "7,500 قدم مربع",
            year: "2026",
            service: "تسليم مفتاح كامل ونجارة معمارية"
          },
          scope: [
            "التصميم الداخلي والتنسيق المدني",
            "نجارة معمارية — جدار الوسائط والخزائن المثبتة وجناح التسريح",
            "تنسيق موافقات بلدية أبوظبي (دائرة البلديات والنقل)",
            "التركيب في الموقع والتسليم"
          ],
          related: [
            { label: "التجهيز الشامل في أبوظبي", href: "/ar/fit-out/abu-dhabi" },
            { label: "النجارة المعمارية المخصصة في أبوظبي", href: "/ar/joinery/abu-dhabi" },
            { label: "التصميم الداخلي في أبوظبي", href: "/ar/interior-design/abu-dhabi" }
          ],
          images: [
            "/assets/project-villa.jpg",
            "/assets/tv-unit-2.jpeg",
            "/assets/dressing-unit-3.jpeg",
            "/assets/bed-4.jpeg"
          ]
        }
      }
    },
    mediaPage: {
      metaTitle: "الإعلام والرؤى | بيت الإبداع",
      metaDescription: "أخبار وتحديثات المشاريع ورؤى من استوديو بيت الإبداع للتصميم الداخلي والتجهيز في الإمارات.",
      newsAndInsights: "الأخبار والرؤى",
      latestNewsAndInsights: "أحدث الأخبار والرؤى",
      readMore: "اقرأ المزيد ↗",
      viewMore: "عرض المزيد ↗",
      featuredArticle: {
        title: "الدليل الشامل للتجهيز الداخلي الفاخر في دبي",
        description: "اكتشف الخطوات الأساسية والتكاليف والجدول الزمني لتجهيز داخلي متكامل لفيلا أو مكتبك في دبي.",
        slug: "luxury-interior-fit-out-guide-dubai",
        link: "/ar/media/luxury-interior-fit-out-guide-dubai",
        image: "/assets/hero-penthouse.jpg",
        date: "٢٥ سبتمبر ٢٠٢٦",
        author: "فريق تصميم بيت الإبداع",
        content: "<p>يتطلب البدء في مشروع <strong>التجهيز الداخلي الفاخر في دبي</strong> أكثر من مجرد رؤية؛ إنه يتطلب دقة، خبرة محلية، واستراتيجية تنفيذ خالية من العيوب. سواء كنت تقوم بتجديد فيلا راقية في دبي هيلز أو مقر شركة في وسط مدينة دبي، فإن فهم عملية التجهيز أمر بالغ الأهمية.</p><h2>لماذا تختار مقاول تجهيز داخلي متكامل؟</h2><p>يدير مقاول التجهيز المتكامل (تسليم مفتاح) كل جانب من جوانب المشروع من المفهوم إلى التسليم. هذا يزيل ضغط التنسيق بين موردين متعددين. في بيت الإبداع، يتعامل فريقنا الداخلي مع التصميم المعماري، الأعمال الكهروميكانيكية (MEP)، وتصنيع النجارة المخصصة. يضمن هذا النهج الموحد بقاء مشروع <strong>تجهيز المكاتب في دبي</strong> أو التجديد السكني ضمن الجدول الزمني والميزانية.</p><h2>إدارة موافقات بلدية دبي والدفاع المدني</h2><p>أحد أكبر العقبات في أي مشروع داخلي في الإمارات هو الحصول على شهادات عدم الممانعة (NOCs) والموافقات الرسمية. يعمل فريقنا المختص مباشرة مع بلدية دبي والدفاع المدني لضمان الامتثال بنسبة 100٪، مما يمنع التأخيرات المكلفة.</p><h2>معايير أوروبية، بصناعة محلية</h2><p>الفخامة تكمن في التفاصيل. من خلال إنتاج أثاثنا المصمم خصيصاً والنجارة المعمارية في منشأتنا التي تبلغ مساحتها 15,000 قدم مربع في عجمان، نحافظ على مراقبة صارمة للجودة، تضاهي المعايير الأوروبية بينما نقضي على تأخيرات الشحن الدولي.</p><h3>هل أنت مستعد لبدء مشروعك؟</h3><p>تواصل مع بيت الإبداع اليوم لمناقشة رؤيتك لمساحة داخلية فاخرة.</p>"
      },
      articles: [
        { 
          title: "تأثير النجارة المعمارية المخصصة على المنازل الحديثة في الإمارات", 
          slug: "bespoke-architectural-joinery-uae",
          link: "/ar/media/bespoke-architectural-joinery-uae",
          image: "/assets/cabinet-joinery.jpeg", 
          date: "١٠ سبتمبر ٢٠٢٦",
          author: "فريق تصنيع بيت الإبداع",
          content: "<p>تعتبر <strong>النجارة المعمارية المخصصة</strong> العنصر الحاسم للفخامة الحقيقية في المنازل الحديثة في الإمارات. من غرف الملابس المصممة خصيصاً إلى الألواح الخشبية الصوتية، تحول الأعمال الخشبية المصنوعة ببراعة العقار القياسي إلى تحفة فنية مخصصة.</p><h2>ما هي النجارة المعمارية؟</h2><p>على عكس الأثاث المنفصل، تشير النجارة المعمارية إلى العناصر الخشبية المدمجة في هيكل المبنى. ويشمل ذلك المطابخ المخصصة، وحدات الزينة، السلالم المعقدة، وتكسية الجدران المتخصصة. في سوق العقارات الراقي في الإمارات، تعتبر النجارة المخصصة أمراً لا غنى عنه لتحقيق تشطيب ممتاز.</p><h2>تصنيع دقيق في عجمان</h2><p>في بيت الإبداع، يتم تصنيع <strong>النجارة المخصصة في دبي</strong> وأبوظبي داخلياً في منشأتنا التي تبلغ مساحتها 15,000 قدم مربع في عجمان. من خلال استخدام أحدث آلات CNC الألمانية والأخشاب الأوروبية المستدامة، نقدم دقة لا مثيل لها.</p><ul><li style='margin-bottom: 10px;'><strong>ملاءمة مثالية:</strong> تضمن القوالب المقاسة بالليزر تركيباً دقيقاً بالمليمتر.</li><li style='margin-bottom: 10px;'><strong>تشطيبات فاخرة:</strong> من البولي يوريثين عالي اللمعان إلى قشور الخشب الطبيعية، تقدم كبائن التشطيب لدينا نتائج خالية من العيوب.</li><li style='margin-bottom: 10px;'><strong>المتانة:</strong> مصممة لتحمل تحديات المناخ الفريدة في الإمارات.</li></ul><p>إن الاستثمار في النجارة المخصصة لا يرتقي فقط بتجربة حياتك اليومية ولكنه يزيد بشكل كبير من تقييم الممتلكات الخاصة بك.</p>"
        },
        { 
          title: "كيفية صيانة النجارة المخصصة والأثاث في المناخات الرطبة", 
          slug: "furniture-maintenance-care-humid-climate",
          link: "/ar/media/furniture-maintenance-care-humid-climate",
          image: "/assets/dining-table.jpeg", 
          date: "٢٨ أغسطس ٢٠٢٦",
          author: "فريق العناية اللاحقة ببيت الإبداع",
          content: "<p>يشكل مناخ الإمارات القاسي—الذي يتميز بالحرارة الشديدة والرطوبة المتقلبة—تحدياً فريداً للتصميمات الداخلية الفاخرة. تعد <strong>صيانة الأثاث السليمة في الإمارات</strong> أمراً ضرورياً للحفاظ على سلامة وجمال الأعمال الخشبية والمفروشات المخصصة الخاصة بك.</p><h2>حماية التشطيبات الخشبية من الرطوبة</h2><p>يمكن أن تتسبب الرطوبة العالية في تمدد الخشب الطبيعي أو التواءه أو تشققه إذا لم يتم إغلاقه وصيانته بشكل صحيح. عند صياغة <strong>النجارة المخصصة في دبي</strong>، تستخدم بيت الإبداع مواد مانعة للتسرب مكيفة مع المناخ. ومع ذلك، فإن الرعاية المستمرة أمر حيوي:</p><ul><li style='margin-bottom: 10px;'><strong>التحكم في المناخ:</strong> حافظ على درجة حرارة داخلية متسقة واستخدم مزيلات الرطوبة في المساحات شديدة التكييف لموازنة مستويات الرطوبة.</li><li style='margin-bottom: 10px;'><strong>تنظيف لطيف:</strong> تجنب المنظفات الكيميائية القاسية. استخدم أقمشة من الألياف الدقيقة المبللة قليلاً والخالية من النسالة لتنظيف الأسطح الخشبية.</li><li style='margin-bottom: 10px;'><strong>أشعة الشمس المباشرة:</strong> يمكن للأشعة فوق البنفسجية أن تتسبب في تلاشي القشور الفاخرة. استخدم أنظمة الستائر الآلية من Somfy لأتمتة الحماية من الشمس خلال ساعات الذروة.</li></ul><h2>صيانة الأجهزة والآليات</h2><p>تتطلب المفصلات ذات الإغلاق الهادئ وآليات الانزلاق تشحيماً سنوياً لمنع التصلب الناتج عن الغبار المحيط والرطوبة. يتضمن ضمان الصناعة الشامل لدينا لمدة 5 سنوات إرشادات حول الحفاظ على آلياتك المدمجة تعمل بشكل لا تشوبه شائبة.</p>"
        },
        { 
          title: "داخل أول مشروع ننشر عنه: مقر هيئة حكومية", 
          slug: "government-authority-hq-case-study",
          link: "/ar/media/government-authority-hq-case-study",
          image: "/assets/project-office.jpg", 
          date: "١٥ يوليو ٢٠٢٦",
          author: "مشاريع بيت الإبداع",
          content: "<p>يتطلب تنفيذ <strong>تجهيز تجاري في دبي</strong> لهيئة حكومية بارزة أعلى مستوى من الأمان والدقة والامتثال. تستكشف دراسة الحالة هذه كيف قدمت بيت الإبداع حلاً داخلياً متكاملاً عالمي المستوى تحت موعد نهائي صارم.</p><h2>التحدي: الأمان والامتثال</h2><p>تطلب الموجز مساحة عمل تنفيذية متطورة تدمج الخصوصية الصوتية المتقدمة، وتكوينات MEP الآمنة لغرفة الخوادم، وجمالية تعكس السلطة الهادئة. إن التنقل في عمليات الموافقة الصارمة لجهة حكومية يعني أن فريق الاتصال لدينا كان عليه تنفيذ تقديمات DDA وبلدية دبي بشكل لا تشوبه شائبة.</p><h2>الحل: استراتيجية داخلية متكاملة</h2><p>من خلال إبقاء جميع التخصصات الأساسية داخلية، قضت بيت الإبداع على احتكاك تأخيرات الوكالات المتعددة.</p><ul><li style='margin-bottom: 10px;'><strong>التصميم المكاني ثلاثي الأبعاد:</strong> قدمنا عروض CAD واقعية لضمان توافق جميع أصحاب المصلحة قبل بناء قسم واحد.</li><li style='margin-bottom: 10px;'><strong>النجارة الصوتية:</strong> قام مصنعنا في عجمان بتصنيع ألواح جدارية متخصصة لامتصاص الصوت لقاعة مجلس الإدارة والمكاتب التنفيذية.</li><li style='margin-bottom: 10px;'><strong>الأتمتة الذكية:</strong> دمج كامل لمحركات Somfy للستائر الآلية للخصوصية والتحكم في الإضاءة.</li></ul><p>النتيجة هي مقر عالي الأداء وآمن ومذهل بصرياً يضع معياراً جديداً <strong>للحلول الداخلية المتكاملة في الإمارات</strong>.</p>"
        }
      ]
    },
    ourServicesPage: {
      metaTitle: "خدماتنا | بيت الإبداع",
      metaDescription: "استكشف خدمات بيت الإبداع في التصميم الداخلي والتجهيز الشامل والنجارة المخصصة في دبي وأبوظبي، من المفهوم حتى التسليم.",
      navTitle: "خدماتنا",
      pageTitle: "خدماتنا وحلول التصميم الداخلي",
      whatWeOffer: "ماذا نقدم",
      comprehensiveOfferings: "عروض الخدمات الشاملة",
      offeringsSubtitle: "نحن نقدم حلولًا داخلية مخصصة ومصممة لتلبية احتياجات كل مشروع.",
      learnMore: "اعرف المزيد ↗",
      exploreByServiceKicker: "تصفح حسب الخدمة",
      exploreByServiceTitle: "كل خدمة، في جميع أنحاء الإمارات",
      exploreByServiceSubtitle: "انتقل مباشرة إلى الخدمة التي تحتاجها — تغطي كل صفحة النطاق والعملية والتكلفة التقديرية والأسئلة الشائعة لإمارتك.",
      services: [
        {
          num: "01",
          title: "التجهيزات الداخلية",
          description: "نعمل عن كثب مع المهندس المعماري أو المصمم أو مدير المشروع لتقديم خدمات تجهيزات داخلية عالية الجودة، بما في ذلك الأعمال الميكانيكية والكهربائية والسباكة والأثاث والتشطيبات.",
          image: "/assets/tv-unit-1.jpeg",
          link: "/ar/fit-out/dubai"
        }
      ]
    },
    ourProcessPage: {
      metaTitle: "عمليتنا | بيت الإبداع",
      metaDescription: "تعرف على كيفية تنفيذ بيت الإبداع للمشاريع من التصميم ثلاثي الأبعاد وموافقات البلدية إلى التصنيع الداخلي والتسليم.",
      navTitle: "عمليتنا",
      pageTitle: "كيف نعمل",
      whatWeDo: "خطوة بخطوة",
      processOverview: "عملية العمل لدينا",
      processSubtitle: "نحن نتبع عملية دقيقة لضمان تسليم كل مشروع في الوقت المحدد وفي حدود الميزانية وبما يتجاوز التوقعات.",
      learnMore: "اعرف المزيد ↗",
      steps: [
        {
          num: "01",
          title: "تصميم مكاني ثلاثي الأبعاد وموافقة بلدية دبي",
          description: "تصاميم ثلاثية الأبعاد واقعية مطابقة بنسبة 100% لمتطلبات بلدية دبي والدفاع المدني.",
          meta: "المدة الزمنية: 5–7 أيام",
          image: "/assets/hero-penthouse.jpg",
          link: "#"
        },
        {
          num: "02",
          title: "تصنيع في مصنع بمساحة 15 ألف قدم مربع",
          description: "قطع دقيق بتقنية CNC، ونجارة جوز أوروبي، وخياطة ستائر إيطالية مخصصة في منشأتنا بعجمان.",
          meta: "المدة الزمنية: 10–14 يوماً",
          image: "/assets/project-office.jpg",
          link: "#"
        },
        {
          num: "03",
          title: "تركيب تسليم مفتاح في الموقع",
          description: "تركيب نظيف بواسطة مهندسي موقع معتمدين مع بث صور يومي إلى بوابة العميل الخاصة بك.",
          meta: "المدة الزمنية: 7–10 أيام",
          image: "/assets/cabinet-joinery.jpeg",
          link: "#"
        },
        {
          num: "04",
          title: "التسليم النهائي والضمان",
          description: "جولة تفقد نهائية، وشهادة إنجاز من البلدية، وحزمة ضمان لمدة 5 سنوات.",
          meta: "الضمان: 5 سنوات شاملة",
          image: "/assets/dining-table.jpeg",
          link: "#"
        }
      ]
    }
  }
};
