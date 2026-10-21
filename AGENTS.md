# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Mobile app decisions (`baitalebdaa_app/`)

- 18 Oct 2026 (replaces the earlier 4-tab layout): bottom navigation is Home · Services · Projects · Book · Profile, with Book as the strongest action. The AI assistant ("Ask Ali", the website assistant's name) is reached from a Home card, not a tab.
- 18 Oct 2026 (replaces splash → sign-in → Home): launch is splash → Home. No sign-in screen at launch; guests browse everything and can fill in a request.
- 18 Oct 2026: sending a consultation request requires signing in (at the Review step; the draft is kept while they sign in).
- 18 Oct 2026: Firebase is on the free Spark plan, so there is no Firebase Storage. Photos and plans are shared on WhatsApp after sending, with the request reference prefilled.
- 18 Oct 2026: Firebase project `baitalebdaa-76046` serves dev and staging; `baitalebdaa` is reserved for production so real customer data never mixes with test data.
- 20 Oct 2026: the Play package name is `com.baitalebdaa.app` (final; Play never allows a change). The production build uses the Firebase project `baitalebdaa`.
- 20 Oct 2026: every screen uses the one shared header in `lib/design_system/components/navigation/app_header.dart`: `AppScrollView` (eyebrow, large title, one line under it, collapsing into a slim pinned bar) for scrolling pages, `AppPhotoSliverHeader` for service and project pages, `AppTopBar` otherwise. Round 40 px header buttons; back appears only on pushed screens. No raw `AppBar`/`SliverAppBar` (the conventions check enforces it).
- The app is premium project discovery + consultation request + request tracking. Not a shop, marketplace or instant-booking app. Never "Booking confirmed"; a request is "received" until staff schedule it. Only real services, prices and projects from the website's own data.
