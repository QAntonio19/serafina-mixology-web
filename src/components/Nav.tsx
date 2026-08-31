import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, List, X } from '../lib/icons';
import { BRAND, HERO, NAV } from '../lib/content';
import { IDS } from '../lib/images';
import { EASE } from '../lib/motion';
import { onBandCls, solidCls } from './ui';

/* alt="" since the parent link already carries the accessible name via
   aria-label — an image-only logo would otherwise announce twice. The
   mark is drawn in ink; over the hero's photo it's forced to white
   with brightness(0) invert(1) rather than shipping a second file. */
const Wordmark = ({ light = false, className = '' }: { light?: boolean; className?: string }) => (
  <img
    src={IDS.logo}
    alt=""
    className={
      'h-14 w-auto transition-[filter] duration-300 ' + (light ? 'brightness-0 invert' : '') + ' ' + className
    }
  />
);

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  /* Transparent with light type while the hero's photo is still behind
     it, then the usual paper bar once the page scrolls past it — the
     hero is one viewport tall, so its own height is the threshold. */
  const [overHero, setOverHero] = useState(true);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  /* Hides on the way down, reappears on the way up. Small jitters
     (under 6px) are ignored so a trackpad's momentum doesn't flicker
     it, and it always shows near the very top regardless of direction. */
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      if (y < 80) {
        setHidden(false);
      } else if (Math.abs(delta) > 6) {
        setHidden(delta > 0);
      }
      lastY = y;
      setOverHero(y < window.innerHeight - 80);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={
          'fixed inset-x-0 top-0 z-40 transition-[transform,background-color,backdrop-filter] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ' +
          (overHero ? 'bg-transparent' : 'bg-paper/30 backdrop-blur-md') + ' ' +
          (hidden ? '-translate-y-full' : 'translate-y-0')
        }
      >
        <nav
          aria-label="Principal"
          className="mx-auto flex h-[60px] w-full max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8"
        >
          <a
            href="#top"
            aria-label={BRAND.full}
            className={'flex items-center gap-4 ' + (overHero ? 'text-paper' : 'text-ink')}
          >
            <Wordmark light={overHero} className="lg:hidden" />
            <span className="hidden items-center gap-4 lg:flex">
              <span>
                <p className="brand leading-none" style={{ fontSize: '1.05rem' }}>
                  {BRAND.name}
                </p>
                <p className="brand-sub mt-1 opacity-70" style={{ fontSize: '0.55rem' }}>
                  {BRAND.sub}
                </p>
              </span>
              <span aria-hidden className="h-8 w-px bg-current opacity-25" />
            </span>
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={
                  'label transition-opacity hover:opacity-60 ' +
                  (overHero ? 'text-paper' : 'text-ink')
                }
                style={{ fontSize: '0.8rem' }}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <a href="#cotizar" className={overHero ? onBandCls : solidCls}>
                {HERO.ctaPrimary}
                <ArrowRight size={14} />
              </a>
            </div>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={open}
              className={'grid h-11 w-11 place-items-center lg:hidden ' + (overHero ? 'text-paper' : 'text-ink')}
            >
              <List size={21} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            className="fixed inset-0 z-50 bg-paper text-ink lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2, ease: EASE } }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            <div className="flex h-[60px] items-center justify-between border-b border-line px-4 sm:px-6">
              <Wordmark />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar menú"
                className="grid h-11 w-11 place-items-center"
              >
                <X size={21} />
              </button>
            </div>

            <div className="flex flex-col px-4 pt-6 sm:px-6">
              {NAV.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.05, duration: 0.4, ease: EASE }}
                  className="display border-b border-line py-5 text-[2rem]"
                >
                  {item.label}
                </motion.a>
              ))}

              <a
                href="#cotizar"
                onClick={() => setOpen(false)}
                className={`${solidCls} mt-8 h-12 w-full`}
              >
                Cotizar mi evento
              </a>

              <p className="mt-8 text-[0.85rem] leading-relaxed text-ink-muted">
                {BRAND.coverage}
                <a href={`tel:${BRAND.phoneHref}`} className="tnum mt-1 block text-ink">
                  {BRAND.phone}
                </a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
