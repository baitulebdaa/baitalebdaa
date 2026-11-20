import CtaBubbles from "./cta-motion/bubbles/v1";
import CtaFlat from "./cta-motion/flat/v1";
import CtaShine from "./cta-motion/shine/v1";
import CtaSponge from "./cta-motion/sponge/v1";
import FaqFold from "./faq-toggle/fold/v1";
import FaqRing from "./faq-toggle/ring/v1";
import FaqSwap from "./faq-toggle/swap/v1";
import FaqWipe from "./faq-toggle/wipe/v1";
import FooterCentred from "./footer-layout/centred/v1";
import FooterColumns from "./footer-layout/columns/v1";
import HeroFloat from "./hero-motion/float/v1";
import HeroGlints from "./hero-motion/glints/v1";
import HeroSteam from "./hero-motion/steam/v1";
import HeroStill from "./hero-motion/still/v1";
import LinkDraw from "./link-hover/draw/v1";
import LinkGlide from "./link-hover/glide/v1";
import LinkTint from "./link-hover/tint/v1";
import LinkUnderline from "./link-hover/underline/v1";
import RevealFade from "./section-reveal/fade/v1";
import RevealNone from "./section-reveal/none/v1";
import RevealRise from "./section-reveal/rise/v1";
import RevealWipe from "./section-reveal/wipe/v1";
/**
 * "<slot>/<variant>/<version>" to its component. Add a line here for each new version file,
 * next to its entry in lib/design-lab/registry.ts.
 */
export const interactionDemos = {
    "faq-toggle/swap/v1": FaqSwap,
    "faq-toggle/fold/v1": FaqFold,
    "faq-toggle/wipe/v1": FaqWipe,
    "faq-toggle/ring/v1": FaqRing,
    "cta-motion/flat/v1": CtaFlat,
    "cta-motion/shine/v1": CtaShine,
    "cta-motion/sponge/v1": CtaSponge,
    "cta-motion/bubbles/v1": CtaBubbles,
    "section-reveal/fade/v1": RevealFade,
    "section-reveal/rise/v1": RevealRise,
    "section-reveal/wipe/v1": RevealWipe,
    "section-reveal/none/v1": RevealNone,
    "hero-motion/still/v1": HeroStill,
    "hero-motion/float/v1": HeroFloat,
    "hero-motion/steam/v1": HeroSteam,
    "hero-motion/glints/v1": HeroGlints,
    "link-hover/underline/v1": LinkUnderline,
    "link-hover/draw/v1": LinkDraw,
    "link-hover/tint/v1": LinkTint,
    "link-hover/glide/v1": LinkGlide,
    "footer-layout/columns/v1": FooterColumns,
    "footer-layout/centred/v1": FooterCentred,
};
