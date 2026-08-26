import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { HERO, RESENAS, STATS } from '../lib/content';
import { IDS, RATIO, photo, srcSet } from '../lib/images';
import { EASE } from '../lib/motion';
import { Shell, onBandCls } from './ui';
import { Pause, Play, Star } from '../lib/icons';

/** How long one review holds before the next one comes in. */
const HOLD_MS = 6500;

/**
 * The hero is a photograph, not a flat panel with a product pasted on
 * it: the glass sits in a real space, in real light, with its own
 * shadow. That is what a cut-out cannot fake.
 *
 * The frame is landscape with the glass right of centre and genuine
 * negative space on the left, so the type lands on the photograph
 * rather than beside it. Light on dark, so the display face takes the
 * `reversed` step of weight.
 */
export default function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: EASE, delay },
  });

  const reviews = RESENAS.items;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const running = !reduce && !paused && !hovering && reviews.length > 1;

  /* A timeout rather than an interval: every change, manual or not,
     gets the full hold before the next hand-over. */
  useEffect(() => {
    if (!running) return;
    const id = setTimeout(() => setIndex((index + 1) % reviews.length), HOLD_MS);
    return () => clearTimeout(id);
  }, [running, index, reviews.length]);

  return (
    <header id="top">
      <div className="relative overflow-hidden bg-[#141210]">
        <motion.img
          initial={reduce ? false : { scale: 1.06, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: EASE }}
          src={photo(IDS.heroScene, 1920, RATIO.wide)}
          srcSet={srcSet(IDS.heroScene, RATIO.wide, [900, 1440, 1920, 2400])}
          sizes="100vw"
          alt="Coctel ámbar con romero y cítrico deshidratado servido en la barra"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: '48% 58%' }}
        />

        {/* A wash from the left keeps the type readable without flattening
            the photograph. On a narrow screen there is no room for a
            directional wash: the glass lands under the copy, so the veil
            goes closer to uniform there. */}
        <div
          aria-hidden
          className="absolute inset-0 md:hidden"
          style={{
            background:
              'linear-gradient(180deg, rgb(12 10 9 / 0.82) 0%, rgb(12 10 9 / 0.62) 46%, rgb(12 10 9 / 0.78) 100%)',
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              'linear-gradient(97deg, rgb(12 10 9 / 0.90) 0%, rgb(12 10 9 / 0.70) 34%, rgb(12 10 9 / 0.22) 62%, transparent 84%)',
          }}
        />

        <Shell className="relative flex min-h-[540px] flex-col justify-between py-12 sm:min-h-[600px] lg:min-h-[700px] lg:py-14">
          <div>
            <motion.p
              {...rise(0.15)}
              className="label mb-4 text-[#FBFAF8]/60"
            >
              {HERO.eyebrow}
            </motion.p>

            <motion.h1
              {...rise(0.22)}
              className="display reversed max-w-[13ch] text-[clamp(1.72rem,4.6vw,4rem)] text-[#FBFAF8]"
            >
              {HERO.headA} {HERO.headB}
            </motion.h1>

            <motion.div
              {...rise(0.34)}
              className="mt-7 flex flex-wrap items-center gap-2.5"
            >
              <a href="#cotizar" className={`${onBandCls} h-9 px-5 text-[0.7rem]`}>
                {HERO.ctaPrimary}
              </a>
              <a
                href="#carta"
                className="inline-flex h-9 items-center justify-center border border-[#FBFAF8]/45 bg-[rgb(12_10_9/0.45)] px-5 text-[0.7rem] font-medium uppercase tracking-[0.06em] text-[#FBFAF8] backdrop-blur-[2px] transition-colors duration-200 hover:border-[#FBFAF8] hover:bg-[rgb(12_10_9/0.7)] active:translate-y-px"
              >
                {HERO.ctaSecondary}
              </a>
            </motion.div>
          </div>

          {/* The review, in the corner: the same nine reviews as the
              Reseñas section, rotating on their own so the hero is not
              stuck on a single fixed quote. Pausable per WCAG 2.2.2,
              and it never starts under reduced motion. */}
          <motion.div
            {...rise(0.5)}
            className="mt-16 max-w-[38ch] lg:mt-0"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            onFocusCapture={() => setHovering(true)}
            onBlurCapture={() => setHovering(false)}
          >
            <div
              aria-live={running ? 'off' : 'polite'}
              aria-atomic="true"
              /* Reserved against the longest of the nine reviews at this
                 size, so a shorter one never shifts the buttons above it.
                 One value covers every breakpoint: max-w-[38ch] wraps the
                 same way regardless of viewport, since the column it
                 makes is already narrower than the smallest screen. */
              className="min-h-[142px]"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.figure
                  key={reduce ? 'static' : index}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <span
                    className="flex items-center gap-[3px] text-[#FBFAF8]"
                    role="img"
                    aria-label="Cinco de cinco"
                  >
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star key={i} size={11} weight="fill" />
                    ))}
                  </span>
                  <blockquote className="mt-3 text-[0.8rem] leading-relaxed text-[#FBFAF8]/80">
                    “{reviews[index].quote}”
                  </blockquote>
                  <figcaption className="label mt-3 text-[#FBFAF8]/55">
                    {reviews[index].name} <span className="mx-1">/</span> {reviews[index].meta}
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            {!reduce && reviews.length > 1 && (
              <button
                type="button"
                onClick={() => setPaused((v) => !v)}
                aria-label={paused ? 'Reanudar las reseñas' : 'Pausar las reseñas'}
                className="mt-4 grid h-8 w-8 place-items-center text-[#FBFAF8]/55 transition-colors hover:text-[#FBFAF8]"
              >
                {paused ? <Play size={12} weight="fill" /> : <Pause size={12} weight="fill" />}
              </button>
            )}
          </motion.div>
        </Shell>
      </div>

      {/* what the barra brings, as a thin rule under the photograph */}
      <Shell className="border-b border-line py-5">
        <motion.dl
          {...rise(0.6)}
          className="flex flex-wrap items-baseline gap-x-6 gap-y-3"
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={
                'flex items-baseline gap-2 ' +
                (i > 0 ? 'sm:ml-2 sm:border-l sm:border-line sm:pl-8' : '')
              }
            >
              <dd className="tnum text-[1.05rem] font-semibold text-ink">{s.value}</dd>
              <dt className="label text-ink-faint">{s.label}</dt>
            </div>
          ))}
        </motion.dl>
      </Shell>
    </header>
  );
}
