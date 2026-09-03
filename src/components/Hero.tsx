import { motion, useReducedMotion } from 'motion/react';
import { HERO } from '../lib/content';
import { IDS, photo, srcSet } from '../lib/images';
import { EASE } from '../lib/motion';
import { Shell } from './ui';

/* the warm tan the wordmark and CTA lean on wherever the page goes
   dark — the site has no standing accent token (the drinks carry the
   colour everywhere else), so this one hex is scoped to this hero. */
const GOLD = '#C9A46B';

/**
 * A full-bleed night shot behind the pitch: the word, the tagline, the
 * copy and the calls to action stacked left, the service figures
 * pinned to the bottom of the same frame. Nav.tsx reads this section's
 * own height to know when to go from transparent-on-photo to its
 * usual paper bar, so the two stay in sync without either importing
 * the other.
 */
export default function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: EASE, delay },
  });

  return (
    <header id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink">
      <img
        src={photo(IDS.heroBg, 2400, 9 / 16)}
        srcSet={srcSet(IDS.heroBg, 9 / 16, [800, 1200, 1600, 2000, 2400])}
        sizes="100vw"
        alt=""
        aria-hidden
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-[62%_38%]"
      />

      {/* darkened for the type over it: a wash under the left-hand text
          column, and a heavier one under the stats row at the foot */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(100deg, rgba(10,8,6,0.8) 0%, rgba(10,8,6,0.48) 38%, transparent 65%), ' +
            'linear-gradient(to top, rgba(10,8,6,0.85) 0%, transparent 30%), ' +
            'linear-gradient(to bottom, rgba(10,8,6,0.4) 0%, transparent 24%)',
        }}
      />

      <Shell className="relative flex flex-1 flex-col justify-center pb-16 pt-28">
        <motion.p {...rise(0)} className="label" style={{ color: GOLD }}>
          {HERO.eyebrow}
        </motion.p>

        <motion.h1
          {...rise(0.1)}
          className="display mt-4 text-[clamp(3.6rem,13vw,10.5rem)] leading-[0.86] text-paper"
        >
          {HERO.word}
        </motion.h1>

        <motion.p
          {...rise(0.22)}
          className="display mt-6 max-w-[34ch] text-[clamp(1.3rem,2.6vw,2rem)] leading-[1.16]"
          style={{ color: GOLD }}
        >
          {HERO.headA}
          <br />
          {HERO.headB}
        </motion.p>

        <motion.p {...rise(0.32)} className="mt-6 max-w-[34ch] text-[0.9rem] leading-relaxed text-paper/70">
          {HERO.sub}
        </motion.p>

        <motion.div {...rise(0.42)} className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#cotizar"
            className="inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap px-6 text-[0.8rem] font-medium uppercase tracking-[0.06em] text-ink transition-opacity duration-200 hover:opacity-85 active:translate-y-px"
            style={{ backgroundColor: GOLD }}
          >
            {HERO.ctaPrimary}
          </a>
          <a
            href="#paquetes"
            className="inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap border border-paper/35 px-6 text-[0.8rem] font-medium uppercase tracking-[0.06em] text-paper transition-all duration-200 hover:border-paper hover:bg-paper hover:text-ink active:translate-y-px"
          >
            {HERO.ctaSecondary}
          </a>
        </motion.div>
      </Shell>
    </header>
  );
}
