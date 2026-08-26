import { motion, useReducedMotion } from "motion/react";
import { Broom, ClipboardText, Martini } from "../lib/icons";
import { RAZONES, STATEMENT } from "../lib/content";
import { EASE, rise, riseParent, inView } from "../lib/motion";
import { Display, Reveal, Shell } from "./ui";

const ICONS = { bar: Martini, menu: ClipboardText, clean: Broom } as const;

/**
 * Servicio — two premium sections using the site warm palette.
 *
 * Razones: Beige tile surface. Three large numbered cards (01/02/03)
 * on white paper tiles with a 3-px ink top-accent that sweeps in,
 * a watermark number, icon that flips ink-on-paper on hover, and
 * an arrow link. Cards lift on hover.
 *
 * Statement: Deep ink panel (the page sole dark beat). Large cream
 * headline in the display face, accent rule, copy, two CTAs.
 */

/* ─── Animated ink top bar ───────────────────────────────────────── */
function InkBar({ delay = 0 }: { delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden
      className="block h-[3px] w-full origin-left bg-ink"
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={inView}
      transition={{ duration: 0.85, ease: EASE, delay }}
    />
  );
}

export default function Servicio() {
  const reduce = useReducedMotion();

  return (
    <>
      {/* ── RAZONES ─────────────────────────────────────────────── */}
      <section
        id="servicio"
        aria-label="Todo lo que incluye el servicio"
        className="bg-tile py-20 md:py-28"
      >
        <Shell>
          {/* Header row */}
          <Reveal className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <motion.div variants={rise}>
              <p className="label mb-4 text-ink-faint">El servicio</p>
              <Display className="max-w-[20ch] text-ink">{RAZONES.head}</Display>
            </motion.div>
            <motion.p
              variants={rise}
              className="max-w-[36ch] text-[0.9rem] leading-relaxed text-ink-muted md:text-right"
            >
              Cada detalle coordinado para que usted no tenga que pensar en nada.
            </motion.p>
          </Reveal>

          {/* Cards */}
          <motion.div
            variants={riseParent(0.12, 0.05)}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={inView}
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {RAZONES.items.map((item, i) => {
              const Icon = ICONS[item.icon];
              const num = ["01", "02", "03"][i];
              return (
                <motion.div key={item.title} variants={rise}>
                  <motion.div
                    whileHover={
                      reduce
                        ? {}
                        : {
                            y: -8,
                            boxShadow: "0 28px 56px -8px rgba(20,20,20,0.16)",
                          }
                    }
                    transition={{ duration: 0.35, ease: EASE }}
                    className="group relative flex h-full flex-col overflow-hidden bg-paper p-8 md:p-10"
                    style={{ boxShadow: "0 2px 8px -2px rgba(20,20,20,0.06)" }}
                  >
                    <InkBar delay={i * 0.1} />

                    {/* Watermark number */}
                    <span
                      aria-hidden
                      className="display pointer-events-none absolute right-5 top-3 select-none text-[6.5rem] font-bold leading-none text-ink/[0.04] transition-opacity duration-500 group-hover:text-ink/[0.09] md:text-[8rem]"
                    >
                      {num}
                    </span>

                    {/* Icon */}
                    <div className="relative mt-8 mb-8 flex items-center gap-4">
                      <span className="grid h-12 w-12 place-items-center border border-ink/20 text-ink transition-all duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
                        <Icon size={22} />
                      </span>
                      <span className="label text-ink-faint">{num}</span>
                    </div>

                    {/* Text */}
                    <h3 className="display mb-3 text-[1.3rem] leading-tight text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-1 flex-1 text-[0.9rem] leading-relaxed text-ink-muted">
                      {item.body}
                    </p>

                    {/* Link */}
                    <a
                      href="#cotizar"
                      className="mt-8 inline-flex items-center gap-2 text-[0.75rem] font-medium uppercase tracking-[0.1em] text-ink transition-opacity duration-200 hover:opacity-55"
                    >
                      Incluir en mi evento
                      <span aria-hidden className="text-base leading-none">
                        →
                      </span>
                    </a>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </Shell>
      </section>

      {/* ── STATEMENT ───────────────────────────────────────────── */}
      <section
        aria-label="Nuestra manera de trabajar"
        className="relative overflow-hidden bg-ink py-24 md:py-36"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 60% at 50% 110%, rgba(251,250,248,0.05) 0%, transparent 70%)",
          }}
        />

        <Shell className="relative">
          <Reveal className="flex flex-col items-center text-center" stagger={0.1}>
            <motion.p
              variants={rise}
              className="label mb-8 tracking-[0.22em] text-paper/45"
            >
              Serafina Mixology
            </motion.p>

            <motion.h2
              variants={rise}
              className="display max-w-[18ch] text-[clamp(2.4rem,5.8vw,4.8rem)] leading-[1.03] text-paper"
            >
              {STATEMENT.head}
            </motion.h2>

            <motion.span
              variants={rise}
              aria-hidden
              className="mt-10 block h-[2px] w-14 bg-paper/30"
            />

            <motion.p
              variants={rise}
              className="mt-8 max-w-[40ch] text-[0.95rem] leading-relaxed text-paper/60"
            >
              Cada barra que montamos lleva nuestra firma: el hielo tallado a mano, los cordiales de casa, y la manera de atender a sus invitados.
            </motion.p>

            <motion.div
              variants={rise}
              className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <a
                href="#cotizar"
                className="inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap bg-paper px-8 text-[0.8rem] font-medium uppercase tracking-[0.08em] text-ink transition-opacity duration-200 hover:opacity-85 active:translate-y-px"
              >
                Cotizar mi evento
              </a>
              <a
                href="#eventos"
                className="inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap border border-paper/25 px-8 text-[0.8rem] font-medium uppercase tracking-[0.08em] text-paper/75 transition-all duration-200 hover:border-paper/55 hover:text-paper active:translate-y-px"
              >
                {STATEMENT.cta}
              </a>
            </motion.div>
          </Reveal>
        </Shell>
      </section>
    </>
  );
}
