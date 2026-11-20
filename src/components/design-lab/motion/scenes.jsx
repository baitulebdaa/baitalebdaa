const field = [[12, 20], [30, 62], [48, 14], [62, 46], [80, 24], [88, 72], [20, 82], [55, 84], [72, 8], [40, 40], [8, 52], [93, 42]];
const pins = [[20, 32], [46, 58], [70, 36], [30, 80], [82, 72], [56, 20]];
const deep = [8, 22, 34, 47, 58, 70, 82, 14, 64, 90];
const at = (list) => (i) => ({ "--x": `${list[i][0]}%`, "--y": `${list[i][1]}%` });
export const scenes = {
    id: "scenes",
    label: "Scenes",
    blurb: "Small ambient scenes for our services, drawn in CSS. No photos.",
    motions: [
        { t: "Sofa steam", k: "loop", c: "js-sofa", n: 3, note: "Steam lifts off a freshly cleaned sofa. For sofa cleaning." },
        { t: "Carpet stripes", k: "loop", c: "js-carpet", n: 7, note: "Vacuum lanes brighten across a rug, one by one. For carpet cleaning." },
        { t: "Window squeegee", k: "loop", c: "js-window", n: 1, note: "A blade crosses a misted window and leaves it clear. For window cleaning." },
        { t: "AC vent airflow", k: "loop", c: "js-vent", n: 5, note: "Clean air streams out of a vent. For AC duct cleaning." },
        { t: "Water tank ripple", k: "loop", c: "js-tank", n: 2, note: "Ripples spread across clean tank water. For water tank cleaning." },
        { t: "Curtain sway", k: "loop", c: "js-curtain", n: 2, note: "Two curtain panels sway gently. For curtain cleaning." },
        { t: "Mattress bounce", k: "loop", c: "js-mattress", n: 1, note: "A pillow bounces on a fresh mattress. For mattress cleaning." },
        { t: "Marble glint", k: "loop", c: "js-marble", note: "A glint crosses a veined marble tile. For marble polishing." },
        { t: "Villa sparkle", k: "loop", c: "js-villa", n: 3, note: "Sparkles twinkle around a villa. For villa cleaning." },
        { t: "Desk wipe", k: "loop", c: "js-desk", n: 1, note: "A cloth wipes along a desk. For office cleaning." },
        { t: "Hob degrease", k: "loop", c: "js-hob", n: 4, note: "Grease spots fade from a hob. For kitchen deep cleaning." },
        { t: "Tile shine", k: "loop", c: "js-tiles", n: 9, v: (i) => ({ "--d": Math.floor(i / 3) + (i % 3) }), note: "A shine runs diagonally across bathroom tiles." },
        { t: "Deep clean bubbles", k: "loop", c: "js-deep", n: 10, v: (i) => ({ "--x": `${deep[i]}%`, "--s": `${8 + (i % 4) * 4}px` }), note: "Bubbles rise all across the floor. For deep cleaning." },
        { t: "Boxes stack", k: "loop", c: "js-boxes", n: 3, note: "Moving boxes drop into a stack. For move-in and move-out cleaning." },
        { t: "Dust and sweep", k: "loop", c: "js-dust", n: 8, note: "Dust settles, then a broom sweeps it away. For post-construction cleaning." },
        { t: "Maid hours", k: "loop", c: "js-hclock", note: "Four hours fill on a clock face. For the hourly maid service." },
        { t: "Mop floor", k: "loop", c: "js-floor", n: 1, note: "A mop crosses the floor; the wet sheen dries behind it." },
        { t: "Spray bottle", k: "loop", c: "js-bottle", n: 7, note: "A spray bottle mists out a fine fan." },
        { t: "Restaurant floor", k: "loop", c: "js-checker", note: "A sheen passes over a checked floor. For restaurant cleaning." },
        { t: "Showroom glass", k: "loop", c: "js-glass", n: 2, note: "Reflections slide down two tall glass panes. For showroom cleaning." },
        { t: "Pile lift", k: "loop", c: "js-pile", n: 12, note: "Flattened carpet fibres stand back up in a wave." },
        { t: "Stain fade", k: "loop", c: "js-stain", n: 5, note: "A stain fades as the spray reaches it." },
        { t: "Bucket drips", k: "loop", c: "js-bucket", n: 3, note: "Water drips from a full bucket." },
        { t: "Sponge suds", k: "loop", c: "js-sponge", n: 5, note: "A sponge scrubs and suds bubble up from it." },
        { t: "Duster flick", k: "loop", c: "js-duster", n: 5, note: "A duster flicks from side to side and dust flies off." },
        { t: "Curtain wash", k: "loop", c: "js-washer", n: 1, note: "Striped curtains turn in a washer drum." },
        { t: "Steam wand", k: "loop", c: "js-wand", n: 4, note: "Puffs of steam leave a cleaning wand." },
        { t: "Sunbeam", k: "loop", c: "js-sun", note: "Morning light moves across the floor of a clean room." },
        { t: "Rain and wiper", k: "loop", c: "js-rain", n: 8, note: "Rain runs down a pane until a wiper clears it." },
        { t: "Grout lines", k: "loop", c: "js-grout", note: "Fresh grout lines draw across white tiles." },
        { t: "Footprints fade", k: "loop", c: "js-prints", n: 4, note: "Footprints appear and fade from a clean floor. For move-out cleaning." },
        { t: "Key swing", k: "loop", c: "js-key", note: "A house key swings on its ring. For handover cleaning." },
        { t: "Team arrives", k: "loop", c: "js-arrive", n: 2, note: "The van drives in and stops with a little bounce." },
        { t: "Area pins", k: "loop", c: "js-pins", n: 6, v: at(pins), note: "Pins pop up across a simple map: areas we cover." },
        { t: "On time", k: "loop", c: "js-ontime", n: 1, note: "The clock hand sweeps round and a tick appears." },
        { t: "Mirror wipe", k: "loop", c: "js-mirror", note: "One circular cloth pass clears a misted mirror." },
        { t: "Sink sparkle", k: "loop", c: "js-sink", n: 3, note: "A clean sink and tap, with sparkles." },
        { t: "Robot vacuum", k: "loop", c: "js-robot", n: 1, note: "A round vacuum robot traces the edges of a room." },
        { t: "Carpet unroll", k: "loop", c: "js-unroll", n: 1, note: "A clean rug rolls out flat." },
        { t: "Cushion fluff", k: "loop", c: "js-pillow", note: "A cushion is squashed and puffs back up." },
        { t: "Curtain rings", k: "loop", c: "js-crings", n: 5, note: "Curtain rings slide along the rod as the curtain gathers." },
        { t: "Balcony glass", k: "loop", c: "js-balcony", n: 1, note: "A squeegee runs down a tall balcony door." },
        { t: "Duct tunnel", k: "loop", c: "js-duct", n: 4, note: "Looking down a clean duct. For AC duct cleaning." },
        { t: "Filtered drop", k: "loop", c: "js-filter", n: 1, note: "A drop passes through filter layers and comes out clean." },
        { t: "Polish swirl", k: "loop", c: "js-swirl", note: "A polishing sheen turns on a floor." },
        { t: "Sheet wave", k: "loop", c: "js-sheet", note: "A bed sheet billows as it is laid." },
        { t: "Dining chairs", k: "loop", c: "js-chairs", n: 4, note: "A row of chairs, each getting its sparkle in turn." },
        { t: "Upholstery refresh", k: "loop", c: "js-uphol", n: 1, note: "A brush passes and dull fabric comes up fresh behind it." },
        { t: "8 AM sunrise", k: "loop", c: "js-sunrise", l: "8 AM", n: 1, note: "The sun rises as we open, daily from 8 AM." },
        { t: "Twinkle field", k: "loop", c: "js-field", n: 12, v: at(field), note: "Sparkles twinkle at random across an area: an ambient hero backdrop." },
        { t: "Bubble drift", k: "loop", c: "js-floatb", n: 1, note: "One soap bubble drifts across and fades." },
        { t: "Fresh air", k: "loop", c: "js-fresh", n: 3, note: "Windows swing open and fresh air flows in." },
        {
            t: "Open 8 AM to 10 PM",
            k: "loop",
            note: "Our hours as one day: the sun rises at 8 AM, crosses and sets, then the moon and stars come out at 10 PM. Groups with 309.",
            node: (<div className="js-day" role="img" aria-label="Open daily, 8 AM to 10 PM">
          <i />
          <i />
          <s />
          <s />
          <s />
          <b aria-hidden="true">8 AM</b>
          <b aria-hidden="true">10 PM</b>
        </div>),
        },
    ],
};
