import { motion } from 'motion/react';
import { WhatsappLogo } from '../lib/icons';
import { BRAND, COBERTURA } from '../lib/content';
import { RATIO, photo, srcSet } from '../lib/images';
import { rise } from '../lib/motion';
import { Display, Label, Reveal, Shell, outlineCls } from './ui';

/** Photograph on the left, the practical answer on the right. */
export default function Cobertura() {
  return (
    <section id="cobertura" className="py-14 md:py-20">
      <Shell>
        <Reveal className="grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-10">
          <motion.figure variants={rise} className="md:col-span-7">
            <div className="aspect-[4/3] overflow-hidden bg-plate md:aspect-[3/2]">
              <img
                src={photo(COBERTURA.image, 1200, RATIO.landscape)}
                srcSet={srcSet(COBERTURA.image, RATIO.landscape, [600, 900, 1200])}
                sizes="(min-width: 768px) 56vw, 92vw"
                alt={COBERTURA.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.figure>

          <motion.div variants={rise} className="md:col-span-5">
            <Label className="mb-3">{COBERTURA.label}</Label>
            <Display className="max-w-[12ch] text-ink">{COBERTURA.head}</Display>
            <p className="mt-5 max-w-[40ch] text-[0.88rem] leading-relaxed text-ink-muted">
              {COBERTURA.body}
            </p>
            <a
              href={BRAND.whatsapp}
              target="_blank"
              rel="noreferrer"
              className={`${outlineCls} mt-7`}
            >
              <WhatsappLogo size={16} />
              {COBERTURA.cta}
            </a>
          </motion.div>
        </Reveal>
      </Shell>
    </section>
  );
}
