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
      propertySize: "Property Size (Square Feet)",
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
        title: "Inside Our 15,000 Sq Ft Ajman Joinery Facility",
        description: "A look inside the in-house manufacturing facility where our CNC machinery, European timber and master carpenters produce every custom joinery piece we install.",
        image: "/assets/joinery-factory.jpg",
        link: "/en/process"
      },
      articles: [
        { title: "How We Manage Dubai Municipality & Civil Defense Approvals", image: "/assets/project-office.jpg", link: "/en/process" },
        { title: "Custom Joinery, Made In-House From Start to Finish", image: "/assets/cabinet-joinery.jpeg", link: "/en/joinery/uae" },
        { title: "Inside Our First Published Project: A Government Authority HQ", image: "/assets/project-office.jpg", link: "/en/our-projects/government-authority" }
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
        },
        {
          num: "02",
          title: "Design and Build",
          description: "We provide complete design and interior fit-out services in full turnkey solutions helping to reduce project risks and costs, and can lead to faster completion.",
          image: "/assets/dressing-unit-1.jpeg",
          link: "/en/interior-design/dubai"
        },
        {
          num: "03",
          title: "Furniture Maintenance & Care",
          description: "Aftercare, repair and hardware servicing for custom joinery and furniture, backed by our in-house Ajman factory and 5-year workmanship guarantee.",
          image: "/assets/cabinet-joinery.jpeg",
          link: "/en/furniture-maintenance-care"
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
      propertySize: "حجم العقار (قدم مربع)",
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
        title: "نظرة داخل مصنع النجارة الخاص بنا في عجمان بمساحة 15,000 قدم مربع",
        description: "نظرة داخل منشأة التصنيع الخاصة بنا، حيث تنتج آلات CNC والأخشاب الأوروبية ونجارونا المحترفون كل قطعة نجارة مخصصة نقوم بتركيبها.",
        image: "/assets/joinery-factory.jpg",
        link: "/ar/process"
      },
      articles: [
        { title: "كيف ندير موافقات بلدية دبي والدفاع المدني", image: "/assets/project-office.jpg", link: "/ar/process" },
        { title: "نجارة مخصصة، مصنوعة بالكامل داخلياً", image: "/assets/cabinet-joinery.jpeg", link: "/ar/joinery/uae" },
        { title: "داخل أول مشروع ننشره: مقر هيئة حكومية", image: "/assets/project-office.jpg", link: "/ar/our-projects/government-authority" }
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
        },
        {
          num: "02",
          title: "التصميم والبناء",
          description: "نحن نقدم خدمات تصميم وتجهيزات داخلية كاملة في حلول جاهزة بالكامل تساعد في تقليل مخاطر المشروع وتكاليفه، ويمكن أن تؤدي إلى إنجاز أسرع.",
          image: "/assets/dressing-unit-1.jpeg",
          link: "/ar/interior-design/dubai"
        },
        {
          num: "03",
          title: "صيانة والعناية بالأثاث",
          description: "خدمات ما بعد التسليم وإصلاح وصيانة تجهيزات النجارة والأثاث المخصص، مدعومة بمصنعنا الخاص في عجمان وضمان جودة الصنعة لمدة 5 سنوات.",
          image: "/assets/cabinet-joinery.jpeg",
          link: "/ar/furniture-maintenance-care"
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
