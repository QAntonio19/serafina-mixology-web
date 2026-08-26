/**
 * Photography. Every id below was fetched and looked at before being
 * committed, so none are dead links and none are off-brief.
 *
 * Source: Unsplash, as placeholders. Swap for the real shoot at launch.
 */
const unsplash = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

/**
 * An entry is either an Unsplash id or a local file. Anything starting
 * with "/" is served from `public/` untouched, so a real photograph can
 * be dropped in and referenced without changing any component.
 */
const isLocal = (src: string) => src.startsWith('/');

/** Width-descriptor srcset so the browser picks the cheapest file. */
export const srcSet = (
  src: string,
  ratio: number,
  widths = [480, 720, 1080, 1600],
): string | undefined =>
  isLocal(src)
    ? undefined
    : widths.map((w) => `${unsplash(src, w, Math.round(w * ratio))} ${w}w`).join(', ');

export const photo = (src: string, w: number, ratio: number) =>
  isLocal(src) ? src : unsplash(src, w, Math.round(w * ratio));

export const IDS = {
  /* The hero scene. */
  heroScene: '/fotos/pina-garnish.jpg',

  /* La carta. All real photos from Serafina Mixology Instagram */
  alba: '/fotos/pina-garnish.jpg',
  bruma: '/fotos/duo-dorado.jpg',
  ambar: '/fotos/ambar-especia.jpg',
  grana: '/fotos/jamaica-mezcal.jpg',
  ocaso: '/fotos/cocteles-autor.png',
  nocturno: '/fotos/nocturno.jpg',

  /* The service and the set-up, also real. */
  barman: '/fotos/barra-servicio.jpg',
  barmanSombrilla: '/fotos/banda-sombrilla.jpg',
  equipo: '/fotos/cobertura-equipo.jpg',

  /* Guests at real events, one per review in the rotator. */
  resena1: '/fotos/resena-1.jpg',
  resena2: '/fotos/resena-2.jpg',
  resena3: '/fotos/resena-3.jpg',
  resena4: '/fotos/resena-4.jpg',
  resena5: '/fotos/resena-5.jpg',

  /* Events and moments, also real. */
  bodas: '/fotos/evento-bodas.jpg',
  privadas: '/fotos/evento-privadas.jpg',
  corporativos: '/fotos/evento-corporativos.jpg',
} as const;

export const RATIO = {
  tall: 5 / 4,
  portrait: 4 / 3,
  square: 1,
  landscape: 3 / 4,
  wide: 9 / 16,
  band: 1 / 2,
} as const;
