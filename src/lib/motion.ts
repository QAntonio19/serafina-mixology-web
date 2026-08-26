import type { Variants } from 'motion/react';

/** One easing curve for the whole page, so everything shares a rhythm. */
export const EASE = [0.16, 1, 0.3, 1] as const;

/** Entrances are slower than exits, per Material's motion guidance. */
export const DUR = { in: 0.7, out: 0.45, micro: 0.22 } as const;

export const riseParent = (stagger = 0.07, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

export const rise: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.in, ease: EASE } },
};

/** Type reveal: the line slides up from behind a clipping mask. */
export const maskLine: Variants = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 0.9, ease: EASE } },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DUR.in, ease: EASE } },
};

/** Shared viewport config so sections trigger at a consistent depth. */
export const inView = { once: true, amount: 0.25 } as const;
