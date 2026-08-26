import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { List, MoonStars, Sun, X } from '../lib/icons';
import { BRAND, NAV } from '../lib/content';
import { EASE } from '../lib/motion';
import { solidCls } from './ui';
import type { Theme } from '../lib/useTheme';

type Props = { theme: Theme; onToggleTheme: () => void };

const Wordmark = () => (
  <span className="flex flex-col items-start gap-[3px]">
    <span className="brand text-[1.05rem] sm:text-[1.2rem]">{BRAND.name}</span>
    <span className="brand-sub text-[0.42rem] text-ink-muted sm:text-[0.47rem]">
      {BRAND.sub}
    </span>
  </span>
);

export default function Nav({ theme, onToggleTheme }: Props) {
  const [open, setOpen] = useState(false);

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

  const themeLabel = theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
        <nav
          aria-label="Principal"
          className="mx-auto flex h-[60px] w-full max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8"
        >
          <a href="#top" aria-label={BRAND.full}>
            <Wordmark />
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="label text-ink transition-opacity hover:opacity-60"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={themeLabel}
              title={themeLabel}
              className="grid h-11 w-11 place-items-center text-ink transition-opacity hover:opacity-60"
            >
              {theme === 'dark' ? <Sun size={17} /> : <MoonStars size={17} />}
            </button>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={open}
              className="grid h-11 w-11 place-items-center text-ink lg:hidden"
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
