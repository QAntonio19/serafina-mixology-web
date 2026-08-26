import { EnvelopeSimple, InstagramLogo, WhatsappLogo } from '../lib/icons';
import { BRAND, FOOTER } from '../lib/content';
import { Shell } from './ui';

const social = [
  { label: 'WhatsApp', href: BRAND.whatsapp, Icon: WhatsappLogo },
  { label: 'Instagram', href: BRAND.instagram, Icon: InstagramLogo },
  { label: 'Correo', href: 'mailto:' + BRAND.email, Icon: EnvelopeSimple },
];

export default function Footer() {
  return (
    <footer className="bg-invert pb-8 pt-12 text-on-invert md:pt-14">
      <Shell>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-12 md:gap-6">
          <div className="col-span-2 md:col-span-4">
            <p className="brand reversed text-[1.15rem]">{BRAND.name}</p>
            <p className="brand-sub reversed mt-1.5 text-[0.46rem] opacity-70">{BRAND.sub}</p>
            <p className="mt-5 text-[0.85rem] leading-relaxed opacity-70">
              {BRAND.tagline}.
              <br />
              {BRAND.coverage}.
            </p>
            <a
              href={'tel:' + BRAND.phoneHref}
              className="tnum mt-4 inline-block text-[0.95rem] underline underline-offset-4"
            >
              {BRAND.phone}
            </a>
          </div>

          {FOOTER.map((col) => (
            <nav key={col.head} aria-label={col.head} className="md:col-span-2">
              <p className="label opacity-55">{col.head}</p>
              <ul className="mt-3 flex flex-col gap-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target={l.href.startsWith('http') ? '_blank' : undefined}
                      rel={l.href.startsWith('http') ? 'noreferrer' : undefined}
                      className="text-[0.85rem] opacity-80 transition-opacity hover:opacity-100"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="col-span-2 md:col-span-2 md:justify-self-end">
            <p className="label opacity-55">Síganos</p>
            <ul className="mt-3 flex items-center gap-2">
              {social.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    title={label}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noreferrer' : undefined}
                    className="grid h-10 w-10 place-items-center border border-current/25 transition-colors hover:border-current"
                  >
                    <Icon size={17} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-current/15 pt-6 text-[0.75rem] opacity-55 sm:flex-row sm:items-center sm:justify-between">
          <p>{BRAND.full}. Prohibida la venta de alcohol a menores de 18 años.</p>
          <p>Aviso de privacidad</p>
        </div>
      </Shell>
    </footer>
  );
}
