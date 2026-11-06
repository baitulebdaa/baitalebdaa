# Conversion measurement

How enquiries are measured on www.baitalebdaa.com (set up 6 Nov 2026). The code is in
`src/lib/analytics.js`, `src/components/AnalyticsClicks.jsx`, `src/components/QuoteModal.jsx`
and `src/components/SiteVisitModal.jsx`.

## Rules

- **Consent first.** Google Analytics loads only after a visitor accepts cookies, and `track()`
  sends nothing without that consent. Events from before consent are dropped, not queued.
  GA therefore sees only visitors who accepted: use it for trends and ratios, and the admin
  panel for absolute enquiry counts.
- **No personal data.** Events carry only `service`, `emirate`, `page_type`, `cta_location`,
  `cta`, `form_type`, `error_type`, `lang`. Never a name, phone number, email or message.
- **Leads are not clicks.** `generate_lead` fires only after `/api/contact` confirms receipt.
  WhatsApp and phone clicks are separate interaction events: a click does not prove a
  conversation took place. Never add them together into one "conversions" number.
- **No invented values.** No lead value or revenue is sent.

## Events

| Event | When | Main parameters | Counts as a lead? |
|---|---|---|---|
| `cta_click` | A "Request a Quote" or "Request a free site visit" button is pressed | `cta` (quote, site_visit), `cta_location` (hero, estimator, quoted-card, home-mobile-bar, service-mobile-bar), `service` | No |
| `form_start` | First input in the quote or site visit form | `form_type`, `cta_location`, `service` | No |
| `form_error` | Validation failure, server error or network error | `form_type`, `error_type` (validation, server_&lt;code&gt;, network) | No |
| `generate_lead` | `/api/contact` returned success for a quote or site visit request | `form_type` (quote, site_visit), `service`, `emirate`, `cta_location` | **Yes**, once per received enquiry |
| `whatsapp_click` | Any WhatsApp link is clicked | `cta_location` (hero, estimator, quote-form, header, bottom-nav, footer…), `service` | No |
| `phone_click` | Any `tel:` link is clicked | `cta_location`, `service` | No |

`page_type` (home, service, project, pricing, contact, media, product, services, other) and
`lang` are added to every event.

## GA4 setup still to do (in the GA4 property, not in code)

1. Admin → Events: mark `generate_lead` as a **key event**. Do not mark `whatsapp_click`,
   `phone_click` or `cta_click` as key events.
2. Admin → Custom definitions: register event-scoped dimensions `service`, `emirate`,
   `page_type`, `cta_location`, `cta`, `form_type`, `error_type`.
3. Check DebugView with a test enquiry on a preview deployment. Production enquiries reach
   the admin panel and the team's inbox, so test there only with a clearly marked test lead
   and delete it afterwards.

## Baseline (measure 4 weeks before any experiment)

| Metric | Definition | Source |
|---|---|---|
| Enquiry rate | `generate_lead` ÷ sessions, by `page_type` and device | GA4 (consented visitors) |
| Form completion | `generate_lead` (quote) ÷ `form_start` (quote) | GA4 |
| Form error rate | `form_error` ÷ `form_start`, by `error_type` | GA4 |
| Received enquiries | Website leads in the admin panel (quote, site visit, contact forms) | Admin panel |
| Valid enquiries | Received minus spam, duplicates and test leads | Admin panel (needs staff to mark them) |
| Qualified leads | Leads the team has called and that fit the service area and budget | Admin panel status (see below) |
| Confirmed site visits | Leads with a booked visit (`visitAt` set, status "Visit") | Admin panel |
| WhatsApp / phone clicks | `whatsapp_click`, `phone_click` | GA4: interactions, reported separately |

## Missing integrations

- **`qualify_lead` and `close_convert_lead` are not sent.** The outcomes exist in the admin
  panel (statuses New · Called · Visit · Done · Cancelled), but nothing links a lead back to
  its GA session. Sending them needs (a) the GA `client_id` stored with the lead at submission
  (only for consented visitors), (b) a server call to the GA4 Measurement Protocol when staff
  change the status, and (c) the owner to define which status means "qualified" and which
  means "won" ("Done" may mean finished rather than won).
- **No spam or duplicate flag** in the admin panel, so "valid enquiries" cannot yet be
  counted automatically.
- **WhatsApp conversations** cannot be measured from the website. If the business uses the
  WhatsApp Business app, the team can tag chats that started from the website message
  ("From your page: …") to count them by hand.
- **No A/B testing tool** is installed. The experiments below need a simple, consistent
  split (for example a first-party cookie set in middleware, 50/50) and the variant sent as an
  event parameter.

## Two experiments to run once the baseline is reliable

### 1. Hero main action: "Request a Quote" or "Request a free site survey"

- **Hypothesis:** visitors planning a renovation are unsure of measurements and budget, so
  offering the free survey as the main hero action brings more enquiries without lowering
  their quality.
- **Primary metric:** received enquiries (`generate_lead`, both form types) per homepage
  session.
- **Lead-quality guardrail:** share of website leads that reach "Called" and then "Visit" in
  the admin panel must not drop by more than 10% relative.
- **Sample:** with a baseline enquiry rate p and a minimum detectable relative lift d, each
  arm needs about 16 × p(1 − p) ÷ (p × d)² sessions (80% power, 5% significance). At p = 1%
  and d = 30%, that is about 17,600 consented homepage sessions per arm. Run at least two
  full weeks (weekday and weekend patterns) and do not stop early on a few enquiries.

### 2. Mobile action bar on service pages: shown or hidden

- **Hypothesis:** on phones, a persistent "Request a Quote / WhatsApp" bar after the hero
  scrolls away increases enquiries from service pages.
- **Primary metric:** received enquiries per mobile service-page session.
- **Lead-quality guardrail:** qualified-lead share (as above), plus the rate of empty or
  duplicate enquiries, must not worsen.
- **Secondary (not a success metric):** `whatsapp_click` per session, reported separately.
- **Sample:** same formula, using the mobile service-page enquiry rate. If the rate is below
  0.5%, the test is unlikely to reach a conclusion within a quarter; increase traffic or
  test a larger change instead of declaring a winner early.
