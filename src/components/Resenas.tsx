import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { CaretLeft, CaretRight, Pause, Play } from '../lib/icons';
import { RESENAS } from '../lib/content';
import { RATIO, photo, srcSet } from '../lib/images';
import { EASE, rise } from '../lib/motion';
import { Display, Label, Reveal, Shell, Stars, outlineCls } from './ui';

/** How long one review holds before the next one comes in. */
const HOLD_MS = 6500;

/** The gold a five-star row gets, not used anywhere else on the page. */
const goldCls = 'text-[#B8923D]';

type Review = (typeof RESENAS.items)[number];

function Quote({ r, size = 'sm' }: { r: Review; size?: 'sm' | 'lg' }) {
  const lg = size === 'lg';
  return (
    <figure className={lg ? 'text-center lg:text-left' : ''}>
      <Stars
        size={lg ? 15 : 11}
        className={lg ? `${goldCls} justify-center lg:justify-start` : goldCls}
      />
      <blockquote
        className={
          lg
            ? 'display mt-6 text-[clamp(1.15rem,2vw,1.5rem)] leading-[1.4] text-ink'
            : 'mt-3 text-[0.85rem] leading-relaxed text-ink-muted'
        }
        style={lg ? { textTransform: 'none' } : undefined}
      >
        “{r.quote}”
      </blockquote>
      <figcaption className={`label mt-5 text-ink-faint ${lg ? '' : 'mt-4'}`}>
        {r.name} <span className="mx-1">/</span> {r.meta}
      </figcaption>
    </figure>
  );
}

/**
 * A narrow column of type against one wide lifestyle frame, then the
 * reviews underneath on a rotator: one large review at a time, handing
 * over on a slow cross-fade.
 *
 * Auto-rotation is pausable, which WCAG 2.2.2 requires of anything that
 * moves on its own for more than five seconds. It also pauses on hover
 * and on keyboard focus, and under `prefers-reduced-motion` it never
 * starts: every review is laid out at once instead, so nothing is hidden
 * behind an animation that will not run.
 */
export default function Resenas() {
  const reduce = useReducedMotion();
  const items = RESENAS.items;

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);

  const running = !reduce && !paused && !hovering && items.length > 1;

  /* A timeout rather than an interval: every change, manual ones
     included, gets the full hold before the next hand-over. */
  useEffect(() => {
    if (!running) return;
    const id = setTimeout(() => setIndex((index + 1) % items.length), HOLD_MS);
    return () => clearTimeout(id);
  }, [running, index, items.length]);

  const headerLeft = (
    <motion.div variants={rise} className="md:col-span-3">
      <Label className="mb-3">{RESENAS.label}</Label>
      <Display className="max-w-[10ch] text-[clamp(1.5rem,2.6vw,2rem)] text-ink">
        {RESENAS.head}
      </Display>
      <a href="#carta" className={`${outlineCls} mt-6`}>
        {RESENAS.cta}
      </a>
    </motion.div>
  );

  /* Reduced motion: no rotator at all, every review on the page. */
  if (reduce) {
    return (
      <section aria-label="Reseñas" className="py-14 md:py-20">
        <Shell>
          <Reveal className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-6">
            {headerLeft}
            <motion.figure variants={rise} className="md:col-span-9">
              <div className="aspect-[16/9] overflow-hidden bg-plate md:aspect-[16/7]">
                <img
                  src={photo(RESENAS.image, 1600, RATIO.wide)}
                  srcSet={srcSet(RESENAS.image, RATIO.wide)}
                  sizes="(min-width: 768px) 72vw, 92vw"
                  alt={RESENAS.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
            </motion.figure>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-8 border-t border-line pt-8 md:grid-cols-3 md:gap-6">
            {items.map((r) => (
              <Quote key={r.name} r={r} />
            ))}
          </div>
        </Shell>
      </section>
    );
  }

  return (
    <section aria-label="Reseñas" className="py-14 md:py-20">
      <Shell>
        <Reveal className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-6">
          {headerLeft}

          {/* The photo and the review it belongs to, side by side: one
              piece, not a picture with its caption stacked underneath. */}
          <motion.div
            variants={rise}
            className="grid grid-cols-1 gap-8 md:col-span-9 lg:grid-cols-2 lg:items-center lg:gap-10"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-plate lg:aspect-[4/5]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={index}
                  src={photo(items[index].image, 900, RATIO.tall)}
                  srcSet={srcSet(items[index].image, RATIO.tall)}
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 60vw, 92vw"
                  alt={items[index].alt}
                  loading="lazy"
                  decoding="async"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  style={{ objectPosition: items[index].focus }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
            </div>

            <div
              aria-roledescription="carrusel"
              aria-label="Reseñas de clientes"
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              onFocusCapture={() => setHovering(true)}
              onBlurCapture={() => setHovering(false)}
            >
              {/* Announced only while it is not moving on its own: a live
                  region that changes every few seconds is unusable. */}
              <div
                aria-live={running ? 'off' : 'polite'}
                aria-atomic="true"
                /* Reserved so a shorter review never collapses the block
                   and jolts the layout. Measured against the longest of
                   the nine quotes at the large display size, in this
                   column's own width at each breakpoint. */
                className="min-h-[292px] sm:min-h-[312px] md:min-h-[272px] lg:min-h-[232px]"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.55, ease: EASE }}
                    aria-roledescription="diapositiva"
                    aria-label={`Reseña ${index + 1} de ${items.length}`}
                  >
                    <Quote r={items[index]} size="lg" />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Controls. A phone gets a counter and arrows instead of
                  nine dots, which would overflow 390px and read as clutter. */}
              <div className="mt-8 flex items-center justify-center gap-3 sm:gap-4 lg:justify-start">
                <ul className="hidden items-center gap-2 md:flex">
                  {items.map((r, i) => (
                    <li key={r.name}>
                      <button
                        type="button"
                        onClick={() => setIndex(i)}
                        aria-label={`Ver reseña de ${r.name}`}
                        aria-current={i === index ? 'true' : undefined}
                        className="group grid h-8 w-6 place-items-center"
                      >
                        <span
                          className={
                            'block h-[2px] transition-all duration-500 ' +
                            (i === index
                              ? 'w-5 bg-ink'
                              : 'w-3 bg-ink/25 group-hover:bg-ink/50')
                          }
                        />
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-1 md:hidden">
                  <button
                    type="button"
                    onClick={() => setIndex((i) => (i - 1 + items.length) % items.length)}
                    aria-label="Reseña anterior"
                    className="grid h-10 w-10 place-items-center text-ink-faint transition-colors hover:text-ink"
                  >
                    <CaretLeft size={15} />
                  </button>
                  <p className="tnum label w-14 text-center text-ink-faint" aria-hidden>
                    {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                  </p>
                  <button
                    type="button"
                    onClick={() => setIndex((i) => (i + 1) % items.length)}
                    aria-label="Reseña siguiente"
                    className="grid h-10 w-10 place-items-center text-ink-faint transition-colors hover:text-ink"
                  >
                    <CaretRight size={15} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setPaused((v) => !v)}
                  aria-label={paused ? 'Reanudar las reseñas' : 'Pausar las reseñas'}
                  className="grid h-10 w-10 place-items-center text-ink-faint transition-colors hover:text-ink md:h-8 md:w-8"
                >
                  {paused ? <Play size={13} weight="fill" /> : <Pause size={13} weight="fill" />}
                </button>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </Shell>
    </section>
  );
}
