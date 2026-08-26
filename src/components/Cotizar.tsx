import { useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Check, CircleNotch, Warning } from '../lib/icons';
import { BRAND, COTIZAR } from '../lib/content';
import { EASE, rise } from '../lib/motion';
import { Display, Label, Reveal, Shell, outlineCls, solidCls } from './ui';

type Field = 'nombre' | 'correo' | 'tipo' | 'fecha' | 'invitados';
type Errors = Partial<Record<Field, string>>;
type Status = 'idle' | 'sending' | 'sent' | 'failed';

const LABEL: Record<Field, string> = {
  nombre: 'Nombre',
  correo: 'Correo',
  tipo: 'Tipo de evento',
  fecha: 'Fecha del evento',
  invitados: 'Invitados',
};

const ORDER: Field[] = ['nombre', 'correo', 'tipo', 'fecha', 'invitados'];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const today = () => new Date().toISOString().slice(0, 10);

function validate(d: FormData): Errors {
  const e: Errors = {};
  const nombre = String(d.get('nombre') ?? '').trim();
  const correo = String(d.get('correo') ?? '').trim();
  const tipo = String(d.get('tipo') ?? '');
  const fecha = String(d.get('fecha') ?? '');
  const invitados = String(d.get('invitados') ?? '').trim();

  if (nombre.length < 2) e.nombre = 'Escriba su nombre.';
  if (!EMAIL.test(correo)) e.correo = 'Ese correo no parece válido. Revise el formato.';
  if (!tipo) e.tipo = 'Elija el tipo de evento.';
  if (!fecha) e.fecha = 'Elija una fecha, aunque sea tentativa.';
  else if (fecha < today()) e.fecha = 'Esa fecha ya pasó. Elija una posterior.';
  if (!invitados) e.invitados = 'Indique cuántos invitados espera.';
  else if (Number(invitados) < 1) e.invitados = 'Debe ser al menos una persona.';

  return e;
}

const fieldCls = (bad: boolean) =>
  'h-12 w-full border-b bg-transparent px-0 text-[0.95rem] text-ink ' +
  'outline-none transition-colors placeholder:text-ink-faint focus:border-ink ' +
  (bad ? 'border-danger' : 'border-line');

function FieldError({ id, msg }: { id: string; msg?: string }) {
  return (
    <div id={id} aria-live="polite" className="min-h-[1.3rem]">
      <AnimatePresence>
        {msg && (
          <motion.p
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.22, ease: EASE }}
            className="pt-2 text-[0.78rem] text-danger"
          >
            {msg}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const Req = () => (
  <span className="text-danger" aria-hidden="true">
    *
  </span>
);

export default function Cotizar() {
  const formRef = useRef<HTMLFormElement>(null);
  const reduce = useReducedMotion();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [attempted, setAttempted] = useState(false);

  /** Re-check one field, but only once the user has left it. */
  const revalidate = (name: Field) => {
    if (!formRef.current) return;
    const next = validate(new FormData(formRef.current));
    setErrors((prev) => ({ ...prev, [name]: next[name] }));
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const found = validate(new FormData(form));
    setErrors(found);
    setAttempted(true);

    const firstBad = ORDER.find((k) => found[k]);
    if (firstBad) {
      form.querySelector<HTMLElement>('[name="' + firstBad + '"]')?.focus();
      return;
    }

    setStatus('sending');
    // TODO: wire to the real endpoint (correo, CRM o WhatsApp Business).
    await new Promise((r) => setTimeout(r, 1100));
    setStatus(navigator.onLine ? 'sent' : 'failed');
  }

  const bad = ORDER.filter((k) => errors[k]);
  const showSummary = attempted && bad.length > 1 && status !== 'sent';

  return (
    <section id="cotizar" className="border-t border-line py-14 md:py-20">
      <Shell>
        <Reveal className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-10">
          <motion.div variants={rise} className="md:col-span-4">
            <Label className="mb-3">{COTIZAR.label}</Label>
            <Display className="max-w-[12ch] text-ink">{COTIZAR.head}</Display>
            <p className="mt-5 max-w-[34ch] text-[0.85rem] leading-relaxed text-ink-muted">
              {COTIZAR.note}
            </p>
            <a
              href={'tel:' + BRAND.phoneHref}
              className="tnum mt-6 inline-block text-[0.95rem] text-ink underline underline-offset-4"
            >
              {BRAND.phone}
            </a>
          </motion.div>

          <motion.div variants={rise} className="md:col-span-8">
            <AnimatePresence mode="wait" initial={false}>
              {status === 'sent' ? (
                <motion.div
                  key="sent"
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="bg-tile p-8 md:p-10"
                >
                  <span className="grid h-11 w-11 place-items-center bg-ink text-paper">
                    <Check size={20} />
                  </span>
                  <h3 className="display mt-5 text-[1.5rem] text-ink">
                    Solicitud recibida
                  </h3>
                  <p className="mt-4 max-w-[46ch] text-[0.88rem] leading-relaxed text-ink-muted">
                    Le respondemos en menos de dos días hábiles con una propuesta y un
                    precio por persona. Si su evento es pronto, escríbanos por WhatsApp y
                    lo vemos hoy.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus('idle');
                      setAttempted(false);
                      setErrors({});
                      formRef.current?.reset();
                    }}
                    className={outlineCls + ' mt-7'}
                  >
                    Enviar otra solicitud
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  noValidate
                  onSubmit={onSubmit}
                  initial={false}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                >
                  {showSummary && (
                    <div
                      role="alert"
                      className="mb-7 border-l-2 border-danger bg-tile p-4"
                    >
                      <p className="text-[0.85rem] text-ink">
                        Faltan {bad.length} campos por corregir.
                      </p>
                      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                        {bad.map((k) => (
                          <li key={k}>
                            <a
                              href={'#f-' + k}
                              className="text-[0.78rem] text-danger underline underline-offset-4"
                            >
                              {LABEL[k]}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="f-nombre" className="label text-ink-faint">
                        {LABEL.nombre} <Req />
                      </label>
                      <input
                        id="f-nombre"
                        name="nombre"
                        type="text"
                        autoComplete="name"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.nombre}
                        aria-describedby="e-nombre"
                        onBlur={() => revalidate('nombre')}
                        className={fieldCls(!!errors.nombre)}
                      />
                      <FieldError id="e-nombre" msg={errors.nombre} />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="f-correo" className="label text-ink-faint">
                        {LABEL.correo} <Req />
                      </label>
                      <input
                        id="f-correo"
                        name="correo"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.correo}
                        aria-describedby="e-correo"
                        onBlur={() => revalidate('correo')}
                        className={fieldCls(!!errors.correo)}
                      />
                      <FieldError id="e-correo" msg={errors.correo} />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="f-tipo" className="label text-ink-faint">
                        {LABEL.tipo} <Req />
                      </label>
                      <select
                        id="f-tipo"
                        name="tipo"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.tipo}
                        aria-describedby="e-tipo"
                        defaultValue=""
                        onBlur={() => revalidate('tipo')}
                        className={fieldCls(!!errors.tipo)}
                      >
                        <option value="" disabled>
                          Elegir
                        </option>
                        {COTIZAR.tipos.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                      <FieldError id="e-tipo" msg={errors.tipo} />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="f-fecha" className="label text-ink-faint">
                        {LABEL.fecha} <Req />
                      </label>
                      <input
                        id="f-fecha"
                        name="fecha"
                        type="date"
                        min={today()}
                        required
                        aria-required="true"
                        aria-invalid={!!errors.fecha}
                        aria-describedby="e-fecha"
                        onBlur={() => revalidate('fecha')}
                        className={fieldCls(!!errors.fecha) + ' tnum'}
                      />
                      <FieldError id="e-fecha" msg={errors.fecha} />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="f-invitados" className="label text-ink-faint">
                        {LABEL.invitados} <Req />
                      </label>
                      <input
                        id="f-invitados"
                        name="invitados"
                        type="number"
                        inputMode="numeric"
                        min={1}
                        placeholder="80"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.invitados}
                        aria-describedby="e-invitados"
                        onBlur={() => revalidate('invitados')}
                        className={fieldCls(!!errors.invitados) + ' tnum'}
                      />
                      <FieldError id="e-invitados" msg={errors.invitados} />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="f-tel" className="label text-ink-faint">
                        Teléfono <span className="normal-case">(opcional)</span>
                      </label>
                      <input
                        id="f-tel"
                        name="telefono"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        className={fieldCls(false) + ' tnum'}
                      />
                      <div className="min-h-[1.3rem]" />
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col gap-1">
                    <label htmlFor="f-mensaje" className="label text-ink-faint">
                      Cuéntenos del evento <span className="normal-case">(opcional)</span>
                    </label>
                    <textarea
                      id="f-mensaje"
                      name="mensaje"
                      rows={3}
                      aria-describedby="h-mensaje"
                      className="w-full resize-y border-b border-line bg-transparent py-3 text-[0.95rem] leading-relaxed text-ink outline-none transition-colors focus:border-ink"
                    />
                    <p id="h-mensaje" className="mt-2 text-[0.78rem] text-ink-muted">
                      Sede, horario, si hay banquete, y cualquier trago que quiera en la
                      carta.
                    </p>
                  </div>

                  {status === 'failed' && (
                    <div
                      role="alert"
                      className="mt-6 flex items-start gap-3 border-l-2 border-danger bg-tile p-4"
                    >
                      <Warning size={18} className="mt-0.5 shrink-0 text-danger" />
                      <p className="text-[0.85rem] leading-relaxed text-ink">
                        No pudimos enviar la solicitud. Revise la conexión e inténtelo
                        otra vez, o escríbanos al{' '}
                        <a
                          href={'tel:' + BRAND.phoneHref}
                          className="tnum underline underline-offset-4"
                        >
                          {BRAND.phone}
                        </a>
                        .
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    aria-busy={status === 'sending'}
                    className={solidCls + ' mt-8 h-12 w-full sm:w-auto'}
                  >
                    {status === 'sending' && (
                      <>
                        <CircleNotch size={16} className="animate-spin" />
                        Enviando
                      </>
                    )}
                    {status === 'failed' && 'Reintentar'}
                    {status === 'idle' && (
                      <>
                        Pedir cotización
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </Reveal>
      </Shell>
    </section>
  );
}
