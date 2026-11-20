import { v } from "./kit";
const digits = "0123456789".split("");
function Roller({ value }) {
    return (<div className="jw-roller" aria-label={`AED ${value}`}>
      <small>AED</small>
      {value.split("").map((d, i) => (<span key={i} aria-hidden="true">
          <b style={v({ "--i": i, "--d": Number(d) })}>
            {digits.map((n) => (<em key={n}>{n}</em>))}
          </b>
        </span>))}
    </div>);
}
export const waiting = {
    id: "waiting",
    label: "Waiting",
    blurb: "Loaders, progress and counters, drawn from cleaning itself.",
    motions: [
        { t: "Rising bubbles", k: "loop", c: "jw-bubbles", n: 5, note: "Soap bubbles rise in a column. A loader for search and the quote form." },
        { t: "Mop swing", k: "loop", c: "jw-mop", n: 1, note: "A mop swings side to side on its handle." },
        { t: "Vacuum pass", k: "loop", c: "jw-vac", n: 1, note: "A vacuum head crosses the floor, leaving a clean lane behind it." },
        { t: "Fill bar", k: "loop", c: "jw-level", note: "A lime bar fills, settles, and starts again. Plain and clear." },
        { t: "Spray puffs", k: "loop", c: "jw-puff", n: 3, note: "Three puffs swell in turn, like a trigger spray." },
        { t: "Drying ring", k: "loop", c: "jw-dry", note: "A ring closes as fabric dries. Suits a drying time or a timer." },
        { t: "Spinning brush", k: "loop", c: "jw-brush", n: 8, note: "Bristles spin round a hub, fading toward the tail." },
        { t: "Sparkle trio", k: "loop", c: "jw-twinkle", n: 3, note: "Three sparkles twinkle one after another." },
        { t: "Squeegee pane", k: "loop", c: "jw-pane", n: 1, note: "A blade pulls down a misted pane and leaves it clear." },
        { t: "Bucket slosh", k: "loop", c: "jw-bucket", n: 1, note: "Water tips gently from side to side in a bucket." },
        { t: "Sara is typing", k: "loop", c: "jw-typing", n: 3, note: "Three dots hop in a chat bubble while Ask Sara writes." },
        { t: "Suds ring", k: "loop", c: "jw-suds", n: 8, note: "A ring of suds swells and shrinks around the circle." },
        { t: "Tank fill", k: "loop", c: "jw-tank", note: "A water tank fills and drains. For water tank cleaning." },
        { t: "Steam wisps", k: "loop", c: "jw-wisps", n: 3, note: "Three thin wisps curl upward and fade." },
        { t: "Drop and ripple", k: "loop", c: "jw-drop", n: 1, note: "A drop falls and opens a ripple where it lands." },
        { t: "Ripple rings", k: "loop", c: "jw-rings", n: 3, note: "Rings spread outward from the centre, one after another." },
        { t: "Window streaks", k: "loop", c: "jw-streaks", n: 3, note: "Light streaks slide across a clean window." },
        { t: "Curtain draw", k: "loop", c: "jw-curtain", n: 2, note: "Two curtain panels gather and open. For curtain cleaning." },
        { t: "Clock hand", k: "loop", c: "jw-clock", n: 1, note: "A clock hand sweeps round. For hourly maid bookings." },
        {
            t: "Hours cycle",
            k: "loop",
            note: "2, 4, 6 and 8 hours roll past: the maid service booking lengths.",
            node: (<div className="jw-hours" aria-label="2, 4, 6 or 8 hours">
          <span aria-hidden="true">
            {["2 h", "4 h", "6 h", "8 h", "2 h"].map((h, i) => (<b key={i}>{h}</b>))}
          </span>
        </div>),
        },
        { t: "Step dots", k: "loop", c: "jw-stepdots", n: 3, note: "Three steps light up in order: send, confirm, clean." },
        { t: "Checklist ticking", k: "loop", c: "jw-checks", n: 3, note: "Checklist rows tick themselves off one by one." },
        { t: "Broom sweep", k: "loop", c: "jw-broom", n: 4, note: "A broom sweeps dust specks off to the side." },
        { t: "AC fan", k: "loop", c: "jw-fan", n: 3, note: "Fan blades turn inside a vent ring. For AC duct cleaning." },
        { t: "Airflow", k: "loop", c: "jw-air", n: 4, note: "Lines of air flow out and fade." },
        { t: "Foam stack", k: "loop", c: "jw-foam", n: 4, note: "Foam bubbles pop up into a little pile, then clear." },
        { t: "Polish orbit", k: "loop", c: "jw-orbit", n: 1, note: "A dot orbits a faint ring, like a polishing pad." },
        { t: "Shine pulse", k: "loop", c: "jw-shine", n: 1, note: "A sparkle swells with a ring around it." },
        { t: "Dust settle", k: "loop", c: "jw-settle", n: 6, note: "Dust drifts down and lands. Good for a post-construction page." },
        { t: "Sponge swing", k: "loop", c: "jw-sponge", note: "A sponge swings from a string." },
        { t: "Wave line", k: "loop", c: "jw-wave", note: "A water line ripples along." },
        { t: "Skeleton rows", k: "loop", c: "jw-skel", n: 3, note: "Placeholder rows shimmer while content loads." },
        { t: "Price placeholder", k: "loop", c: "jw-pricesk", l: "AED 149", note: "The price waits as a grey block, then appears." },
        { t: "Running bar", k: "loop", c: "jw-indet", n: 1, note: "A short lime segment runs along a track when time is unknown." },
        { t: "Segments", k: "loop", c: "jw-seg", n: 5, note: "Five segments fill in order, then reset." },
        { t: "Bounce dots", k: "loop", c: "jw-bounce", n: 3, note: "Three lime dots bounce, squashing as they land." },
        { t: "Square to circle", k: "loop", c: "jw-morph", note: "A tile turns into a bubble and back." },
        { t: "Twin squares", k: "loop", c: "jw-twin", n: 2, note: "Two squares turn against each other." },
        { t: "Orbit pair", k: "loop", c: "jw-pair", n: 2, note: "An ink dot and a lime dot circle in opposite directions." },
        { t: "Rinse cycle", k: "loop", c: "jw-rinse", n: 1, note: "A drum spins a lime load inside." },
        { t: "Drum slosh", k: "loop", c: "jw-drum", n: 1, note: "Water turns in a washer door. For curtain cleaning." },
        { t: "Countdown", k: "loop", c: "jw-dry jw-countdown", note: "The drying ring run backwards: time left." },
        { t: "Scan rows", k: "loop", c: "jw-scan", n: 3, note: "A line scans down rows while search works." },
        { t: "Pin drop", k: "loop", c: "jw-pin", n: 1, note: "A map pin drops and lands on its shadow. For area search." },
        { t: "Route dash", k: "loop", c: "jw-route", note: "A dashed route runs from a dot to a pin: the team is on the way." },
        { t: "Van on the way", k: "loop", c: "jw-van", n: 2, note: "A small van rolls along the road." },
        {
            t: "Slot cycle",
            k: "loop",
            note: "Time slots light up in turn while availability loads.",
            node: (<div className="jw-slots">
          {["09:00", "11:00", "14:00", "17:00"].map((s, i) => (<b key={s} style={v({ "--i": i })}>
              {s}
            </b>))}
        </div>),
        },
        { t: "Digit roller", k: "loop", note: "The digits of AED 149 roll up into place.", node: <Roller value="149"/> },
        { t: "Percent ring", k: "loop", c: "jw-pct", note: "A ring and its number count to 100% together." },
        { t: "Bubble pop", k: "loop", c: "jw-popb", n: 1, note: "A bubble swells and pops into a dashed ring." },
        { t: "Towel fold", k: "loop", c: "jw-towel", n: 1, note: "A towel folds in half and opens again." },
        { t: "Spray mist", k: "loop", c: "jw-mist", n: 6, note: "A nozzle sprays a fan of fine mist." },
    ],
};
