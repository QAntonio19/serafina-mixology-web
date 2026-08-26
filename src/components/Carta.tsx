import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CARTA, DRINKS } from '../lib/content';
import { RATIO, photo, srcSet } from '../lib/images';
import { EASE, rise } from '../lib/motion';
import { Display, Label, Reveal, Shell } from './ui';

/**
 * DrinkCard shows name, base spirit, and a toggle to reveal the ingredients.
 * No ordering CTA — this is a catering service, not a bar.
 */
type DrinkCardProps = { drink: (typeof DRINKS)[number] };

function DrinkCard({ drink: d }: DrinkCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4">
      {/* name + base row */}
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="display text-[1.05rem] text-ink">{d.name}</h3>
        <span className="label text-ink-faint">{d.base}</span>
      </div>

      {/* toggle button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="mt-3 inline-flex items-center gap-1.5 text-[0.75rem] font-medium uppercase tracking-[0.07em] text-ink-muted transition-colors duration-150 hover:text-ink"
      >
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.22, ease: EASE }}
          className="inline-block text-[1rem] leading-none"
          aria-hidden
        >
          +
        </motion.span>
        {open ? 'Ocultar' : 'Ver ingredientes'}
      </button>

      {/* expandable ingredient detail */}
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
            <p className="mt-2 border-l-2 border-ink/15 pl-3 text-[0.82rem] leading-relaxed text-ink-muted">
              {d.body}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * The carta as a product grid. Each drink gets a beige tile; the one
 * shot on a pale ground is cut out and stands on its tile, the rest
 * fill theirs, the way a shop mixes pack shots with lifestyle frames.
 */
export default function Carta() {
  return (
    <section id="carta" className="py-14 md:py-20">
      <Shell>
        <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10">
          <div>
            <motion.div variants={rise}>
              <Label className="mb-3">{CARTA.label}</Label>
            </motion.div>
            <motion.div variants={rise}>
              <Display className="max-w-[18ch] text-ink">{CARTA.head}</Display>
            </motion.div>
          </div>
          <motion.p
            variants={rise}
            className="max-w-[30ch] text-[0.85rem] leading-relaxed text-ink-muted"
          >
            {CARTA.note}
          </motion.p>
        </Reveal>

        <Reveal
          stagger={0.06}
          className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6"
        >
          {DRINKS.map((d) => (
            <motion.article key={d.name} variants={rise} className="group">
              <div className="relative flex aspect-square items-end justify-center overflow-hidden bg-plate">
                <img
                  src={photo(d.image, 720, d.cutout ? RATIO.tall : RATIO.square)}
                  srcSet={srcSet(d.image, d.cutout ? RATIO.tall : RATIO.square, [
                    360, 540, 720,
                  ])}
                  sizes="(min-width: 768px) 30vw, 46vw"
                  alt={d.alt}
                  loading="lazy"
                  decoding="async"
                  className={
                    d.cutout
                      ? 'cutout w-[78%] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]'
                      : 'h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]'
                  }
                />
              </div>

              <DrinkCard drink={d} />
            </motion.article>
          ))}
        </Reveal>
      </Shell>
    </section>
  );
}
