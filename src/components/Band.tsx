import { motion, useReducedMotion } from 'motion/react';
import { BAND } from '../lib/content';
import { RATIO, photo, srcSet } from '../lib/images';
import { EASE } from '../lib/motion';
import { Shell } from './ui';

/**
 * The loud full-bleed moment, with the copy sitting on the photograph.
 *
 * The frame shows the service, not the guests: the point of the section
 * is that someone comes and pours.
 */
export default function Band() {
  const reduce = useReducedMotion();

  return (
    <section aria-label="El servicio en su evento" className="relative overflow-hidden">
      <div className="relative min-h-[440px] md:min-h-[560px]">
        <img
          src={photo(BAND.image, 1920, RATIO.band)}
          srcSet={srcSet(BAND.image, RATIO.band)}
          sizes="100vw"
          alt={BAND.alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(100deg, rgb(10 10 10 / 0.88) 0%, rgb(10 10 10 / 0.62) 44%, rgb(10 10 10 / 0.18) 100%)',
          }}
        />

        <Shell className="relative flex min-h-[440px] flex-col justify-center py-14 md:min-h-[560px]">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-[560px] lg:max-w-[820px]"
          >
            <h2 className="display reversed text-[clamp(1.9rem,4.4vw,3.6rem)] text-[#FBFAF8]">
              {BAND.head}
            </h2>
            <p className="mt-6 max-w-[42ch] text-[0.92rem] leading-relaxed text-[#FBFAF8]/78">
              {BAND.body}
            </p>
          </motion.div>
        </Shell>
      </div>
    </section>
  );
}
