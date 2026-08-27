import { motion } from 'motion/react';
import { WhatsappLogo, InstagramLogo } from '../lib/icons';
import { BRAND, COBERTURA } from '../lib/content';
import { IDS, photo } from '../lib/images';
import { rise } from '../lib/motion';
import { Display, Label, Reveal, Shell } from './ui';

/** The practical answer — where the barra reaches — set as a map. */
export default function Cobertura() {
  return (
    <section id="cobertura" className="relative isolate overflow-hidden py-14 md:py-24">
      <Shell className="relative">
        {/* aligned to the content column, not the viewport edge — a
            sibling of the section (left-0) drifted to x=0 regardless of
            where the Shell's own padding put everything else. Negative
            z-index (with `isolate` on the section to keep it contained)
            so the map photo paints over it instead of the other way
            round: an absolutely-positioned element with z-index:auto
            paints above static content by default, regardless of DOM
            order. */}
        <p
          aria-hidden
          className="display pointer-events-none absolute -top-2 left-4 -z-10 select-none whitespace-nowrap text-tile-2 sm:left-6 md:-top-4 lg:left-8"
          style={{ fontSize: 'clamp(3rem, 13vw, 9.5rem)', lineHeight: 0.85 }}
        >
          Dónde
        </p>

        <Reveal className="grid grid-cols-1 items-center gap-10 pt-16 md:grid-cols-12 md:gap-10 md:pt-24">
          <motion.div variants={rise} className="md:col-span-4">
            <Label className="mb-3">{COBERTURA.label}</Label>
            <Display className="max-w-[12ch] text-ink">{COBERTURA.head}</Display>
            <p className="mt-5 max-w-[40ch] text-[0.88rem] leading-relaxed text-ink-muted">
              {COBERTURA.body}
            </p>

            <a
              href={BRAND.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="mt-7 flex h-12 items-center gap-3 border border-ink/30 px-4 text-[0.78rem] font-medium uppercase tracking-[0.06em] text-ink transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-paper"
            >
              <WhatsappLogo size={17} className="shrink-0" />
              {COBERTURA.cta}
            </a>

            <ul className="mt-3 flex items-center gap-2">
              <li>
                <a
                  href={BRAND.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  title="Instagram"
                  className="grid h-10 w-10 place-items-center border border-ink/25 text-ink transition-colors hover:border-ink"
                >
                  <InstagramLogo size={16} />
                </a>
              </li>
              <li>
                <a
                  href={BRAND.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  title="WhatsApp"
                  className="grid h-10 w-10 place-items-center border border-ink/25 text-ink transition-colors hover:border-ink"
                >
                  <WhatsappLogo size={16} />
                </a>
              </li>
            </ul>

            <dl className="mt-9 hidden flex-col gap-4 border-t border-line pt-6 md:flex">
              {COBERTURA.zonas.map((z) => (
                <div key={z.city} className="flex items-baseline justify-between gap-3">
                  <dt className="text-[0.9rem] text-ink">{z.city}</dt>
                  <dd className="label text-right text-ink-faint">{z.note}</dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <motion.div variants={rise} className="md:col-span-8">
            <img
              src={photo(IDS.coberturaMapa, 1200, 2 / 3)}
              alt="Mapa de la cobertura de Serafina: San Diego, Tijuana y Valle de Guadalupe"
              loading="lazy"
              decoding="async"
              className="block w-full h-auto"
            />
          </motion.div>
        </Reveal>
      </Shell>
    </section>
  );
}
