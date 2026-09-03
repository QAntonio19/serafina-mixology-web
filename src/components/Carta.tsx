import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { CARTA, DRINKS, type Drink } from '../lib/content';
import { RATIO, photo, srcSet } from '../lib/images';
import { CaretLeft, CaretRight } from '../lib/icons';
import { EASE, rise } from '../lib/motion';
import { Display, Label, Reveal, Shell } from './ui';

/** How many cards fit in the viewport at once: one on a phone, two on a
 *  tablet, three from desktop up — matched to the breakpoints already
 *  used for the rest of the page's layout shifts. */
function useItemsPerView() {
  const [n, setN] = useState(3);
  useEffect(() => {
    const mqMd = window.matchMedia('(min-width: 768px)');
    const mqLg = window.matchMedia('(min-width: 1024px)');
    const compute = () => setN(mqLg.matches ? 3 : mqMd.matches ? 2 : 1);
    compute();
    mqMd.addEventListener('change', compute);
    mqLg.addEventListener('change', compute);
    return () => {
      mqMd.removeEventListener('change', compute);
      mqLg.removeEventListener('change', compute);
    };
  }, []);
  return n;
}

/**
 * One drink: glass, name, and a "ver receta" toggle with a dashed ring
 * behind it — the connective tissue to the next glass in the strip. The
 * last drink overall skips the ring, since nothing follows it.
 *
 * `cutout` drinks are true transparent PNGs (product shots with an
 * alpha channel) and float directly on the page, sized by height with a
 * drop-shadow standing in for ground contact. Anything without an alpha
 * channel falls back to a plate tile with `object-cover`.
 */
function DrinkCard({ drink: d, hasNext }: { drink: Drink; hasNext: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:gap-5 sm:text-left">
      {d.cutout ? (
        <div className="flex h-52 shrink-0 items-end sm:h-64 md:h-80">
          <img
            src={photo(d.image, 480, RATIO.tall)}
            alt={d.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-auto object-contain transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.04]"
            style={{
              filter:
                'saturate(1.3) brightness(1.06) contrast(1.1) drop-shadow(0 22px 30px rgba(0,0,0,0.3))',
            }}
          />
        </div>
      ) : (
        <div className="aspect-square h-40 shrink-0 overflow-hidden bg-plate shadow-[0_18px_28px_-18px_rgb(0_0_0/0.45)] sm:h-48 md:h-56">
          <img
            src={photo(d.image, 480, RATIO.square)}
            srcSet={srcSet(d.image, RATIO.square, [280, 400, 480, 640])}
            sizes="24vw"
            alt={d.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.05]"
          />
        </div>
      )}

      <div className="min-w-0">
        <h3 className="display max-w-[8ch] text-[1.15rem] uppercase leading-[1.08] text-ink sm:text-[1.4rem]">
          {d.name}
        </h3>
        <span className="label mt-2 block text-ink-faint">{d.base}</span>

        <div className="relative mt-3 inline-block">
          {hasNext && (
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 hidden h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-ink/20 lg:block"
            />
          )}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="label relative text-ink-muted underline decoration-ink/25 underline-offset-4 transition-colors duration-150 hover:text-ink hover:decoration-ink"
          >
            {open ? 'Ocultar' : 'Ver ingredientes'}
          </button>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="detail"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: EASE }}
              className="overflow-hidden"
            >
              <p className="mt-3 max-w-[26ch] text-[0.8rem] leading-relaxed text-ink-muted">
                {d.body}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/** How long one page holds before the strip advances on its own. */
const HOLD_MS = 4500;

/**
 * The carta as a strip that scrolls one glass at a time, three in view
 * on desktop — not a static grid. It pages itself on a slow interval,
 * loops back to the start, and pauses on hover or keyboard focus; a
 * manual arrow click just moves the index, which resets the same timer,
 * so it always gets a full hold before the next auto step. Arrows and
 * the count are deliberately quiet: a hint that more exists, not a
 * piece of navigation chrome to look at.
 */
export default function Carta() {
  const reduce = useReducedMotion();
  const itemsPerView = useItemsPerView();
  const maxIndex = Math.max(0, DRINKS.length - itemsPerView);
  const pageCount = maxIndex + 1;
  const [rawIndex, setIndex] = useState(0);
  // Clamped at render time rather than in an effect: itemsPerView can
  // only change from a resize, which already re-renders this component.
  const index = Math.min(rawIndex, maxIndex);

  const [hovering, setHovering] = useState(false);
  const canPage = DRINKS.length > itemsPerView;
  const running = !reduce && !hovering && canPage;

  const go = (dir: 1 | -1) => setIndex((index + dir + pageCount) % pageCount);

  /* A timeout rather than an interval: every advance, manual or not,
     gets the full hold before the next hand-over. */
  useEffect(() => {
    if (!running) return;
    const id = setTimeout(() => setIndex((index + 1) % pageCount), HOLD_MS);
    return () => clearTimeout(id);
  }, [running, index, pageCount]);

  const slideWidthPct = 100 / itemsPerView;

  return (
    <section id="carta" className="relative overflow-hidden pb-14 pt-36 md:pb-24 md:pt-52">
      <p
        aria-hidden
        className="display pointer-events-none absolute inset-x-0 top-24 select-none whitespace-nowrap text-center text-tile-2 md:top-36"
        style={{ fontSize: 'clamp(3.2rem, 15vw, 11rem)', lineHeight: 0.85 }}
      >
        Cócteles
      </p>

      <Shell className="relative">
        <Reveal className="mb-16 flex flex-col items-center gap-3 text-center md:mb-20">
          <motion.div variants={rise}>
            <Label>{CARTA.label}</Label>
          </motion.div>
          <motion.div variants={rise}>
            <Display className="max-w-[23ch] text-ink">{CARTA.head}</Display>
          </motion.div>
          <motion.p
            variants={rise}
            className="max-w-none whitespace-nowrap text-[0.85rem] leading-relaxed text-ink-muted"
          >
            {CARTA.note}
          </motion.p>
        </Reveal>
      </Shell>

      <Reveal>
        {/* Wider than the standard Shell: the header reads best at
            paragraph width, but the carousel earns the extra room on a
            big screen — bigger cards without giving up the 3-in-view
            rule. */}
        <motion.div
          variants={rise}
          className="relative mx-auto w-full max-w-[1760px] px-4 sm:px-6 lg:px-10"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onFocusCapture={() => setHovering(true)}
          onBlurCapture={() => setHovering(false)}
        >
          {/* overflow-hidden here is what makes the strip a carousel —
              it hides the off-screen slides sitting to the right. The
              padding gives the visible cards' drop-shadow and hover
              scale room to render before that same clip catches them. */}
          <div className="overflow-hidden pb-16 pt-4">
            <motion.div
              className="flex"
              animate={{ x: `-${index * slideWidthPct}%` }}
              transition={{ duration: reduce ? 0 : 0.9, ease: EASE }}
            >
              {DRINKS.map((d, i) => (
                <div
                  key={d.name}
                  className="shrink-0 px-3 md:px-6"
                  style={{ width: `${slideWidthPct}%` }}
                >
                  <DrinkCard drink={d} hasNext={i !== DRINKS.length - 1} />
                </div>
              ))}
            </motion.div>
          </div>

          {canPage && (
            <div className="-mt-6 flex items-center justify-center gap-3 opacity-60 transition-opacity duration-300 hover:opacity-100">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Tragos anteriores"
                className="grid h-8 w-8 place-items-center text-ink-faint transition-colors hover:text-ink"
              >
                <CaretLeft size={13} />
              </button>
              <p className="tnum text-[0.62rem] tracking-[0.1em] text-ink-faint" aria-hidden>
                {String(index + 1).padStart(2, '0')}–
                {String(Math.min(index + itemsPerView, DRINKS.length)).padStart(2, '0')} /{' '}
                {String(DRINKS.length).padStart(2, '0')}
              </p>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Más tragos"
                className="grid h-8 w-8 place-items-center text-ink-faint transition-colors hover:text-ink"
              >
                <CaretRight size={13} />
              </button>
            </div>
          )}
        </motion.div>
      </Reveal>
    </section>
  );
}
