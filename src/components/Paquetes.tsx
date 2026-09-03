import { motion } from 'motion/react';
import { PAQUETES } from '../lib/content';
import { rise } from '../lib/motion';
import { Display, Label, Reveal, Shell, outlineCls } from './ui';

/**
 * Four package cards — placeholder content until the business supplies
 * the real inclusions and price per person. The dashed border is
 * deliberate: it reads as "still being defined," not a finished price
 * list, so nobody mistakes it for the real thing before it's swapped in.
 */
export default function Paquetes() {
  return (
    <section id="paquetes" className="bg-tile py-14 md:py-24">
      <Shell>
        <Reveal className="mb-12 flex flex-col items-center gap-3 text-center md:mb-16">
          <motion.div variants={rise}>
            <Label>{PAQUETES.label}</Label>
          </motion.div>
          <motion.div variants={rise}>
            <Display className="max-w-[20ch] text-ink">{PAQUETES.head}</Display>
          </motion.div>
          <motion.p
            variants={rise}
            className="max-w-[30ch] text-[0.85rem] leading-relaxed text-ink-muted sm:max-w-none sm:whitespace-nowrap"
          >
            {PAQUETES.note}
          </motion.p>
        </Reveal>

        <Reveal stagger={0.08} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PAQUETES.items.map((p) => (
            <motion.div
              key={p.name}
              variants={rise}
              className="flex flex-col gap-5 border border-dashed border-ink/25 bg-paper p-6"
            >
              <h3 className="display text-[1.1rem] text-ink">{p.name}</h3>

              <div>
                <p className="label text-ink-faint">Incluye</p>
                <p className="mt-1 text-[0.85rem] leading-relaxed text-ink-muted">{p.includes}</p>
              </div>

              <div>
                <p className="label text-ink-faint">Precio por persona</p>
                <p className="tnum mt-1 text-[1.1rem] font-semibold text-ink">{p.price}</p>
              </div>

              <a href="#cotizar" className={`${outlineCls} mt-auto h-10 text-[0.68rem]`}>
                Cotizar este paquete
              </a>
            </motion.div>
          ))}
        </Reveal>
      </Shell>
    </section>
  );
}
