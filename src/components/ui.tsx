import type { ReactNode } from 'react';
import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react';
import { Star } from '../lib/icons';
import { inView, riseParent } from '../lib/motion';

/* ------------------------------------------------------------------ */
/* Buttons. No exception to the radius rule: square corners here too.  */
/* ------------------------------------------------------------------ */

const base =
  'inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap ' +
  'px-6 text-[0.8rem] font-medium uppercase tracking-[0.06em] ' +
  'transition-[background-color,color,border-color,opacity] duration-200 ' +
  'active:translate-y-px disabled:pointer-events-none disabled:opacity-50';

export const solidCls = `${base} bg-ink text-paper hover:opacity-85`;

export const outlineCls =
  `${base} border border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-paper`;

/** For use on a dark band, where the ink colours are the wrong way up. */
export const onBandCls =
  `${base} bg-[#FBFAF8] text-[#141414] hover:opacity-85`;

/* ------------------------------------------------------------------ */
/* Type                                                                */
/* ------------------------------------------------------------------ */

export function Label({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={`label text-ink-faint ${className}`}>{children}</p>;
}

export function Display({
  children,
  className = '',
  as: Tag = 'h2',
}: {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}) {
  return (
    <Tag className={`display text-[clamp(1.9rem,4.2vw,3.2rem)] ${className}`}>
      {children}
    </Tag>
  );
}

/** Five marks, the way a shop shows a review. */
export function Stars({
  label,
  size = 11,
  className = 'text-ink',
}: {
  label?: string;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={`flex items-center gap-[3px] ${className}`}
      role="img"
      aria-label={label ?? 'Cinco de cinco'}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} size={size} weight="fill" />
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Layout                                                              */
/* ------------------------------------------------------------------ */

export function Shell({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

/** Staggered scroll reveal for grids and stacked blocks. */
export function Reveal({
  children,
  stagger = 0.07,
  className = '',
  ...rest
}: { children: ReactNode; stagger?: number } & HTMLMotionProps<'div'>) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={riseParent(stagger)}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={inView}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
