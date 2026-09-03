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
  /* The nav logomark, transparent PNG. */
  logo: '/fotos/logo.png',

  /* The hero scene, and the sequence it cycles through. Kept as its own
     array (not spread into IDS) since it's an ordered list, not a
     lookup by name. */
  heroScene: '/fotos/hero-barra.png',

  /* The hero's full-bleed night shot: the three drinks already sitting
     on a real bar counter, the party blurred behind. */
  heroBg: '/fotos/hero-bar-crowd.png',

  /* La carta. Cut-out product shots, transparent background. */
  alba: '/fotos/carta-04.png',
  ambar: '/fotos/carta-05.png',
  grana: '/fotos/carta-06.png',
  bruma: '/fotos/carta-07.png',
  ocaso: '/fotos/carta-08.png',
  nocturno: '/fotos/carta-09.png',
  tamarindo: '/fotos/carta-01.png',
  saucoFlor: '/fotos/carta-02.png',
  cenizaMiel: '/fotos/carta-03.png',

  /* The service and the set-up, also real. */
  barman: '/fotos/barra-servicio.jpg',
  barmanSombrilla: '/fotos/banda-sombrilla.jpg',
  montaje: '/fotos/barra-montaje.jpg',
  cartaAutor: '/fotos/cocteles-autor.png',
  equipo: '/fotos/cobertura-equipo.jpg',
  coberturaMapa: '/fotos/cobertura-mapa.png',

  /* Guests at real events, one per review in the rotator. */
  resena1: '/fotos/resena-1.jpg',
  resena2: '/fotos/resena-2.jpg',

  /* Events and moments, also real. */
  bodas: '/fotos/evento-bodas.jpg',
  privadas: '/fotos/evento-privadas.jpg',
  corporativos: '/fotos/evento-corporativos.jpg',
} as const;

/** The hero photo, cycling through this sequence in order — first the
 *  original scene, then the rest in the order they were shot. */
export const HERO_SEQUENCE = [
  IDS.heroScene,
  '/fotos/hero-seq-02.png',
  '/fotos/hero-seq-03.png',
  '/fotos/hero-seq-04.png',
  '/fotos/hero-seq-05.png',
  '/fotos/hero-seq-06.png',
  '/fotos/hero-seq-07.png',
] as const;

export const RATIO = {
  tall: 5 / 4,
  portrait: 4 / 3,
  square: 1,
  landscape: 3 / 4,
  wide: 9 / 16,
  band: 1 / 2,
} as const;
