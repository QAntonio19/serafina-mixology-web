import { motion } from 'motion/react';
import { ArrowUpRight } from '../lib/icons';
import { EVENTOS } from '../lib/content';
import { RATIO, photo, srcSet } from '../lib/images';
import { rise } from '../lib/motion';
import { Display, Label, Reveal, Shell } from './ui';

/** Three event types, laid out the way a shop lays out its journal. */
export default function Eventos() {
  return (
    <section id="eventos" className="py-14 md:py-20">
      <Shell>
        <Reveal className="mb-8 flex items-start justify-between gap-6 md:mb-10">
          <motion.div variants={rise}>
            <Label className="mb-3">Eventos</Label>
            <Display className="max-w-[16ch] text-ink">
              Para el evento que esté armando
            </Display>
          </motion.div>
          <motion.a
            variants={rise}
            href="#cotizar"
            className="label mt-1 hidden shrink-0 items-center gap-1.5 text-ink transition-opacity hover:opacity-60 sm:inline-flex"
          >
            Cotizar
            <ArrowUpRight size={13} />
          </motion.a>
        </Reveal>

        <Reveal stagger={0.08} className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {EVENTOS.map((e) => (
            <motion.article key={e.label} variants={rise} className="group">
              <div className="aspect-[4/3] overflow-hidden bg-plate">
                <img
                  src={photo(e.image, 800, RATIO.landscape)}
                  srcSet={srcSet(e.image, RATIO.landscape, [400, 600, 800])}
                  sizes="(min-width: 768px) 31vw, 92vw"
                  alt={e.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
              </div>

              <Label className="mt-4">{e.label}</Label>
              <h3 className="display mt-2 text-[1.15rem] leading-tight text-ink">
                {e.name}
              </h3>
              <p className="mt-3 text-[0.82rem] leading-relaxed text-ink-muted">
                {e.body}
              </p>
            </motion.article>
          ))}
        </Reveal>
      </Shell>
    </section>
  );
}
