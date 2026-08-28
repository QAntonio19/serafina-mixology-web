import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import { HERO, STATS } from '../lib/content';
import { HERO_SEQUENCE, photo } from '../lib/images';
import { EASE } from '../lib/motion';
import { Shell, outlineCls, solidCls } from './ui';

/** How long one photo holds before the sequence cycles to the next. */
const HOLD_MS = 5000;

/**
 * A poster, not a component grid: a huge single word bled behind a
 * tilted product-style shot, a textured dark disc with a ghost stat
 * peeking out of it, a scatter of dried garnish, and the pitch tucked
 * into the bottom-right corner — the same composition as a spirits
 * label page, in Serafina's own type and tokens. The full canvas only
 * holds up with room to art-direct, so it is desktop-only; small
 * screens get the same pieces stacked in reading order instead.
 */
export default function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: EASE, delay },
  });

  /* The drink drifts down as the section scrolls by — tied to the
     hero's own scroll progress (0 as its top hits the viewport top, 1
     as its bottom does), so it drifts exactly across the section's
     lifespan rather than the whole page's. A separate motion.div holds
     this, since the entrance rise() above already animates `y` once on
     mount; two animated values on the same element would fight. */
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const photoScrollY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ['0vh', '0vh'] : ['0vh', '65vh'],
  );

  /* The hero photo cycles through HERO_SEQUENCE on its own, pausable by
     hover or keyboard focus. The box it sits in keeps the first photo's
     2:3 shape and size at every breakpoint — later photos are framed
     with `object-contain` inside that same box rather than resizing it,
     so the composition never shifts as the sequence advances. */
  const [photoIndex, setPhotoIndex] = useState(0);
  const [photoHovering, setPhotoHovering] = useState(false);
  const photoRunning = !reduce && !photoHovering && HERO_SEQUENCE.length > 1;

  useEffect(() => {
    if (!photoRunning) return;
    const id = setTimeout(
      () => setPhotoIndex((i) => (i + 1) % HERO_SEQUENCE.length),
      HOLD_MS,
    );
    return () => clearTimeout(id);
  }, [photoRunning, photoIndex]);

  const photoHoverProps = {
    onMouseEnter: () => setPhotoHovering(true),
    onMouseLeave: () => setPhotoHovering(false),
    onFocusCapture: () => setPhotoHovering(true),
    onBlurCapture: () => setPhotoHovering(false),
  };

  /* An invisible copy of the first photo, sized exactly the way the
     single image used to be. It has no visual role — it just occupies
     layout, in flow, so the absolutely-positioned figure around it gets
     a real box to be (position:absolute with only aspect-ratio and no
     in-flow content collapses to 0×0; a replaced element in flow is
     what gives it something to size against). */
  const photoSpacer = (sizeClassName: string) => (
    <img
      src={photo(HERO_SEQUENCE[0], 900, 1.5)}
      alt=""
      aria-hidden
      className={`invisible block h-auto w-auto ${sizeClassName}`}
    />
  );

  const photoImg = (className: string) => (
    <AnimatePresence mode="wait" initial={false}>
      <motion.img
        key={HERO_SEQUENCE[photoIndex]}
        src={photo(HERO_SEQUENCE[photoIndex], 900, 1.5)}
        alt="Coctel de autor de Serafina Mixology"
        fetchPriority={photoIndex === 0 ? 'high' : 'auto'}
        decoding="async"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduce ? 0 : 0.8, ease: EASE }}
        className={`absolute inset-0 h-full w-full object-contain ${className}`}
      />
    </AnimatePresence>
  );

  return (
    <header id="top" ref={heroRef} className="relative overflow-hidden bg-[#C9A46B]">
      {/* real wood grain, procedural: turbulence stretched into long
          streaks, then remapped from grayscale into an oak colour ramp
          — the same recipe as the classic SVG "wood" filter, kept light
          enough that the ink-coloured type over it still reads. */}
      <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full">
        <filter id="heroWoodGrain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.24"
            numOctaves={5}
            seed={7}
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0.33 0.33 0.33 0 0
                    0.33 0.33 0.33 0 0
                    0.33 0.33 0.33 0 0
                    0    0    0    1 0"
            result="gray"
          />
          <feComponentTransfer in="gray">
            <feFuncR type="table" tableValues="0.60 0.72 0.82 0.92" />
            <feFuncG type="table" tableValues="0.44 0.57 0.70 0.83" />
            <feFuncB type="table" tableValues="0.26 0.37 0.52 0.68" />
          </feComponentTransfer>
        </filter>
        <rect width="100%" height="100%" filter="url(#heroWoodGrain)" />
      </svg>

      {/* long plank seams, so the grain reads as boards rather than a
          single sheet */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, rgb(0 0 0 / 0.1) 0px, rgb(0 0 0 / 0.1) 2px, transparent 2px, transparent 220px)',
        }}
      />

      {/* a soft sheen top-left and a darker fall-off at the edges, the
          way a varnished bar top catches light unevenly */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 12% 0%, rgb(255 255 255 / 0.22) 0%, transparent 45%), ' +
            'radial-gradient(140% 110% at 50% 50%, transparent 55%, rgb(40 24 8 / 0.28) 100%)',
        }}
      />

      {/* ============================================================ */}
      {/* Desktop: the full poster                                      */}
      {/* ============================================================ */}
      <div className="relative hidden h-[100svh] lg:block">
        {/* dark textured disc with a ghost stat behind the photo — sized
            off the viewport like the photo, so it reaches down toward
            the pitch text instead of leaving a gap above it */}
        <div
          aria-hidden
          className="absolute -right-28 -top-20 h-[min(80svh,900px)] w-[min(80svh,900px)] overflow-hidden rounded-full bg-invert"
        >
          <svg className="absolute inset-0 h-full w-full opacity-[0.16]">
            <filter id="heroDiscGrain">
              <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#heroDiscGrain)" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-on-invert/10">
            {/* a sharp-pointed star, not Phosphor's rounder one — a
                deep inner radius (0.38 of the outer) is what gives a
                star its point rather than a blunt pinwheel look */}
            <svg viewBox="0 0 100 100" width={56} height={56} fill="currentColor" aria-hidden>
              <polygon points="50,2 60.58,35.44 95.65,35.17 67.12,55.56 78.21,88.83 50,68 21.79,88.83 32.88,55.56 4.35,35.17 39.42,35.44" />
            </svg>
            <p className="display mt-2 leading-none" style={{ fontSize: 'clamp(9rem, 16vw, 13rem)' }}>
              4.9<span style={{ fontSize: '0.32em' }}>/5</span>
            </p>
            <p className="label mt-3 text-on-invert">Calificación de reseñas</p>
          </div>
        </div>

        {/* the giant word, bled under the photograph, with the eyebrow,
            tagline and calls to action stacked directly under it — one
            group instead of two independently-placed blocks, so the
            text always sits below BARRA regardless of viewport size */}
        <div className="absolute left-0 top-[52%] flex -translate-y-1/2 flex-col gap-8 pl-6 xl:pl-10">
          <motion.div {...rise(0.16)} className="flex items-stretch gap-5">
            <span aria-hidden className="w-2 shrink-0 bg-ink" />
            <h1 className="display whitespace-nowrap text-[clamp(6.5rem,13vw,11rem)] leading-none text-ink">
              {HERO.word}
            </h1>
          </motion.div>

          <motion.div {...rise(0.3)} className="max-w-[270px] xl:max-w-[320px]">
            <p className="label mb-4 text-ink/80">{HERO.eyebrow}</p>
            <p className="display text-[1.55rem] leading-tight text-ink xl:text-[1.8rem]">
              {HERO.headA} {HERO.headB}
            </p>
            <div className="mt-6 flex items-center gap-2.5">
              <a href="#cotizar" className={`${solidCls} h-9 px-4 text-[0.68rem]`}>
                {HERO.ctaPrimary}
              </a>
              <a href="#carta" className={`${outlineCls} h-9 px-4 text-[0.68rem]`}>
                {HERO.ctaSecondary}
              </a>
            </div>
          </motion.div>
        </div>

        {/* the product-style shot, tilted, overlapping both. The box is
            constrained by width AND height at once (both as max-) so a
            short, wide viewport can't push it past the fold — whichever
            limit binds first wins. It keeps the same 2:3 shape as the
            first photo at every breakpoint; later photos in the
            sequence are framed inside it with object-contain rather
            than resizing the box, so the layout never shifts. */}
        <motion.figure {...rise(0.3)} className="absolute left-[34%] top-[8%]">
          <motion.div
            {...photoHoverProps}
            style={{ y: photoScrollY, rotate: -6 }}
            className="relative inline-block"
          >
            {photoSpacer('max-w-[40vw] max-h-[calc(100svh-165px)] xl:max-w-[660px]')}
            {photoImg('drop-shadow-[0_40px_80px_rgba(0,0,0,0.45)]')}
          </motion.div>
        </motion.figure>

        {/* the pitch, tucked into the corner, clear of the stats bar
            fixed to the very bottom of this same viewport-height box */}
        <motion.div
          {...rise(0.42)}
          className="absolute bottom-24 right-10 max-w-[28ch] text-right xl:right-14"
        >
          <span aria-hidden className="ml-auto mb-4 block h-px w-10 bg-ink/30" />
          <p className="text-[0.85rem] leading-relaxed text-ink/70">{HERO.sub}</p>
        </motion.div>

        {/* what the barra brings, folded into the same viewport-height
            box rather than appended after it, so the whole poster —
            not just the top of it — fits the first view */}
        <div className="absolute inset-x-0 bottom-0 border-t border-ink/20 bg-[#C9A46B]/40 backdrop-blur-[1px]">
          <Shell>
            <motion.dl
              {...rise(0.5)}
              className="flex flex-wrap items-baseline gap-x-6 gap-y-2 py-4"
            >
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className={
                    'flex items-baseline gap-2 ' +
                    (i > 0 ? 'sm:ml-2 sm:border-l sm:border-ink/20 sm:pl-8' : '')
                  }
                >
                  <dd className="tnum text-[1.05rem] font-semibold text-ink">{s.value}</dd>
                  <dt className="label text-ink/80">{s.label}</dt>
                </div>
              ))}
            </motion.dl>
          </Shell>
        </div>
      </div>

      {/* ============================================================ */}
      {/* Small screens: the same pieces, stacked in reading order       */}
      {/* ============================================================ */}
      <div className="relative lg:hidden">
        <Shell className="relative pt-10">
          <motion.p {...rise(0)} className="label mb-4 text-ink/80">
            {HERO.eyebrow}
          </motion.p>
          <motion.div {...rise(0.1)} className="flex gap-4">
            <span aria-hidden className="w-1.5 shrink-0 bg-ink" />
            <h1 className="display text-[clamp(3.4rem,15vw,5.5rem)] leading-[0.86] text-ink">
              {HERO.word}
            </h1>
          </motion.div>
        </Shell>

        <motion.figure {...rise(0.22)} {...photoHoverProps} className="relative mt-8">
          {photoSpacer('w-full')}
          {photoImg('drop-shadow-[0_24px_48px_rgba(0,0,0,0.4)]')}
        </motion.figure>

        <Shell className="relative mt-8 pb-2">
          <motion.p {...rise(0.32)} className="display text-[1.3rem] leading-snug text-ink">
            {HERO.headA} {HERO.headB}
          </motion.p>
          <motion.p {...rise(0.4)} className="mt-4 text-[0.85rem] leading-relaxed text-ink/70">
            {HERO.sub}
          </motion.p>
          <motion.div {...rise(0.48)} className="mt-6 flex flex-wrap items-center gap-2.5">
            <a href="#cotizar" className={`${solidCls} h-10 px-5 text-[0.72rem]`}>
              {HERO.ctaPrimary}
            </a>
            <a href="#carta" className={`${outlineCls} h-10 px-5 text-[0.72rem]`}>
              {HERO.ctaSecondary}
            </a>
          </motion.div>
        </Shell>
      </div>

      {/* what the barra brings, as a thin rule under the composition —
          desktop already folds this into the poster's own height box,
          so only the mobile stack still needs it appended in flow */}
      <Shell className="relative mt-10 border-t border-ink/20 py-5 lg:hidden">
        <motion.dl {...rise(0.5)} className="flex flex-wrap items-baseline gap-x-6 gap-y-3">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={
                'flex items-baseline gap-2 ' +
                (i > 0 ? 'sm:ml-2 sm:border-l sm:border-ink/20 sm:pl-8' : '')
              }
            >
              <dd className="tnum text-[1.05rem] font-semibold text-ink">{s.value}</dd>
              <dt className="label text-ink/80">{s.label}</dt>
            </div>
          ))}
        </motion.dl>
      </Shell>
    </header>
  );
}
