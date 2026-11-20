import * as one from "./set-one";
import * as two from "./set-two";
const t = (id, label, use, a, b) => ({
    id: `card-${id}`,
    label,
    use,
    variants: [
        { id: "a", name: a[0], idea: a[1], Demo: a[2] },
        { id: "b", name: b[0], idea: b[1], Demo: b[2] },
    ],
});
/** Variation A is always the flat take (hairlines, no box); B is the soft-tint panel take. */
export const cardTypes = [
    t("service", "Service card", "Services page, home, related services", ["Flat rows", "Icon, name, one line, price and an arrow, split by hairlines.", one.ServiceA], ["Tint tile", "One service per tile with a 'Most booked' label and a text link.", one.ServiceB]),
    t("price", "Price / package", "Service pages, pricing page", ["Flat price", "Big price, checklist, one WhatsApp button, VAT line.", one.PriceA], ["Tint package", "Name and label on top, price over a hairline, two-column checklist.", one.PriceB]),
    t("review", "Review", "Home reviews rail, service pages", ["Flat quote", "Stars, the real review text, name and the Google mark.", one.ReviewA], ["Tint quote", "Quote glyph, text, initial avatar, stars and Google G.", one.ReviewB]),
    t("rating", "Rating summary", "Hero, reviews section, footer", ["Inline score", "4.6 next to stars and the review count, one link.", one.RatingA], ["Centred score", "Google mark, big 4.6/5, stars, read and write links.", one.RatingB]),
    t("quote", "Quick price widget", "Home hero, service pages", ["Chips", "Pick a service from chips, price updates, one button.", one.QuoteA], ["Radio list", "White list of services with prices inside a tint panel.", one.QuoteB]),
    t("time", "Preferred time", "Quote flow, booking", ["Day and time chips", "Two rows of chips, a plain sentence confirms the choice.", one.TimeA], ["Time rows", "Three tappable rows with the time window under each label.", one.TimeB]),
    t("area", "Area coverage", "Service and area pages", ["Area links", "Headline with the area count and a few area links.", one.AreaA], ["Area check", "Type your area and get a yes or 'we'll check' answer.", one.AreaB]),
    t("facts", "Trust facts", "Under the hero, about page", ["Hairline strip", "Four numbers split by hairlines, no icons.", one.FactsA], ["Tint tiles", "Four small tiles with an icon each.", one.FactsB]),
    t("licence", "Licence", "Footer, about, contact", ["Flat line", "Licensed in Abu Dhabi with the trade licence number.", one.LicenceA], ["Details list", "Trade licence, unified licence, founded year and office.", one.LicenceB]),
    t("offer", "Offer", "Home, quote flow", ["Flat line", "One line with the offer and a copy-code link.", one.OfferA], ["Coupon", "Dashed coupon with the amount and a code to copy.", one.OfferB]),
    t("tracker", "Booking tracker", "Track page, client account", ["Step list", "Vertical steps with times; current step is marked.", two.TrackerA], ["Progress bar", "One status headline, four-part bar, link to message the crew.", two.TrackerB]),
    t("contact", "Contact / WhatsApp", "Contact page, end of service pages", ["Flat prompt", "Short question, reply time, button and the phone as text.", two.ContactA], ["Chat preview", "Online status, a sample first message and the button.", two.ContactB]),
    t("included", "What's included", "Service pages", ["Two columns", "Included with ticks, not included with crosses.", two.IncludedA], ["Tick list", "One list with ticks on the right, add-ons noted under it.", two.IncludedB]),
    t("process", "How it works", "Home, service pages", ["Numbered columns", "Three steps side by side under one hairline.", two.ProcessA], ["Numbered list", "Three steps stacked with round numbers in a tint panel.", two.ProcessB]),
    t("guide", "Guide card", "Resources, service pages", ["Flat article", "Label, title link, one-line summary and a read link.", two.GuideA], ["Tint article", "Icon, title and summary in a tint panel.", two.GuideB]),
    t("hours", "Opening hours", "Header strip, contact page", ["Status line", "Live open/closed dot and the daily hours on one line.", two.HoursA], ["Hours panel", "Status label, the hours table and the phone number.", two.HoursB]),
    t("addons", "Add-on picker", "Price calculator, quote flow", ["Check rows", "Rows with a check box and the price, running total below.", two.AddonsA], ["Tile grid", "2×2 tiles with an icon and a check, total at the end.", two.AddonsB]),
    t("compare", "Compare plans", "Home vs deep cleaning, pricing", ["Table", "Hairline table with ticks and dashes per plan.", two.CompareA], ["Pick a plan", "Two tint tiles side by side; tap one to choose it.", two.CompareB]),
    t("promise", "Our promise", "Service pages, near the final CTA", ["Big sentence", "One large sentence with the re-clean promise.", two.PromiseA], ["Three promises", "Re-clean, pay after, price first, each with an icon.", two.PromiseB]),
    t("maid", "Maid hourly rate", "Maid service page, pricing", ["Hours chips", "Choose hours, see rate × hours = total.", two.MaidA], ["Rate table", "Two rates in a white table with 'Best rate' on 4h+.", two.MaidB]),
].map((c, i) => ({ ...c, no: i + 1 }));
