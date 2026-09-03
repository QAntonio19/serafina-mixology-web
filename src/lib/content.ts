import { IDS } from './images';

export const BRAND = {
  name: 'Serafina',
  sub: 'Mixology & Events',
  full: 'Serafina Mixology',
  tagline: 'Coctelería para eventos',
  coverage: 'Tijuana y Valle de Guadalupe',
  phone: '+1 619 907 5065',
  phoneHref: '+16199075065',
  whatsapp: 'https://wa.me/16199075065',
  email: 'hola@serafinamixology.mx',
  instagram: 'https://instagram.com/serafinamixology',
} as const;

export const NAV = [
  { label: 'La carta', href: '#carta' },
  { label: 'Eventos', href: '#eventos' },
  { label: 'Talleres', href: '#talleres' },
  { label: 'El servicio', href: '#servicio' },
] as const;

export const HERO = {
  eyebrow: 'Coctelería para eventos',
  word: 'Barra',
  headA: 'Cócteles extraordinarios',
  headB: 'eventos extraordinarios.',
  sub: 'Llevamos la barra móvil, los bartenders y una carta de autor a su boda, evento corporativo o fiesta privada.',
  ctaPrimary: 'Cotizar mi evento',
  ctaSecondary: 'Ver paquetes',
} as const;

export type Drink = {
  name: string;
  base: string;
  body: string;
  image: string;
  alt: string;
  /** Shot on a pale seamless ground, so it can be cut out of its tile. */
  cutout?: boolean;
};

export const DRINKS: Drink[] = [
  {
    name: 'Alba Tropical',
    base: 'Gin & Piña',
    body: 'Gin infusionado, cordial de piña, menta fresca y garnish de piña deshidratada colocada a mano.',
    image: IDS.alba,
    alt: 'Alba Tropical, coctel de autor de Serafina Mixology',
    cutout: true,
  },
  {
    name: 'Ámbar Especiado',
    base: 'Bourbon',
    body: 'Bourbon premium, rodaja de naranja fresca, canela en rama y anís estrellado.',
    image: IDS.ambar,
    alt: 'Ámbar Especiado, coctel de autor de Serafina Mixology',
    cutout: true,
  },
  {
    name: 'Grana Jamaica',
    base: 'Mezcal',
    body: 'Mezcal artesanal, infusión de flor de jamaica deshidratada y escarchado de chile piquín.',
    image: IDS.grana,
    alt: 'Grana Jamaica, coctel de autor de Serafina Mixology',
    cutout: true,
  },
  {
    name: 'Bruma & Ocaso',
    base: 'Aperitivo & Mezcal',
    body: 'Dúo de coctelería: trago cítrico refrescante con hierbabuena y negroni de autor en cristal tallado.',
    image: IDS.bruma,
    alt: 'Bruma & Ocaso, coctel de autor de Serafina Mixology',
    cutout: true,
  },
  {
    name: 'Colección de Autor',
    base: 'Destilados Finos',
    body: 'Trilogía botánica con flores comestibles, cítricos frescos y licores de casa.',
    image: IDS.ocaso,
    alt: 'Colección de Autor, coctel de autor de Serafina Mixology',
    cutout: true,
  },
  {
    name: 'Nocturno',
    base: 'Whisky & Café',
    body: 'Whisky, café de olla artesanal, notas de cacao y espuma cremosa con granos de café.',
    image: IDS.nocturno,
    alt: 'Nocturno, coctel de autor de Serafina Mixology',
    cutout: true,
  },
  {
    name: 'Tamarindo Bravo',
    base: 'Ron & Tamarindo',
    body: 'Ron añejo, puré de tamarindo, chile guajillo y sal de gusano en el borde.',
    image: IDS.tamarindo,
    alt: 'Tamarindo Bravo, coctel de autor de Serafina Mixology',
    cutout: true,
  },
  {
    name: 'Flor de Saúco',
    base: 'Vodka & Saúco',
    body: 'Vodka premium, licor de flor de saúco, pepino fresco y un toque de albahaca.',
    image: IDS.saucoFlor,
    alt: 'Flor de Saúco, coctel de autor de Serafina Mixology',
    cutout: true,
  },
  {
    name: 'Ceniza y Miel',
    base: 'Tequila & Miel',
    body: 'Tequila reposado, miel de agave quemada, limón fresco y humo de romero al servir.',
    image: IDS.cenizaMiel,
    alt: 'Ceniza y Miel, coctel de autor de Serafina Mixology',
    cutout: true,
  },
];

export const CARTA = {
  label: 'La carta',
  head: 'Nueve de autor, y la que usted quiera',
  note: 'Cada opción puede adaptarse a sus necesidades.',
} as const;

/** Four packages, real inclusions and price per person still pending
 *  from the business — every field below is a marked placeholder. */
export const PAQUETES = {
  label: 'Paquetes',
  head: 'Elija el paquete para su evento',
  note: 'Cuatro opciones con lo que incluye cada una y el precio por persona.',
  items: [
    { name: 'Paquete 1', includes: 'Pendiente de definir', price: 'Pendiente' },
    { name: 'Paquete 2', includes: 'Pendiente de definir', price: 'Pendiente' },
    { name: 'Paquete 3', includes: 'Pendiente de definir', price: 'Pendiente' },
    { name: 'Paquete 4', includes: 'Pendiente de definir', price: 'Pendiente' },
  ],
} as const;

export const RAZONES = {
  head: 'Todo lo que llega con la barra',
  items: [
    {
      icon: 'bar' as const,
      title: 'Barra completa',
      body: 'Barra móvil, cristalería, hielo tallado a mano, destilados, cordiales de casa y dos bartenders uniformados.',
      image: IDS.barman,
      alt: 'Bartenders de Serafina sirviendo cocteles en la barra montada',
    },
    {
      icon: 'menu' as const,
      title: 'Carta a la medida',
      body: 'Cada opción puede adaptarse a sus necesidades. Siempre van dos opciones sin alcohol.',
      image: IDS.cartaAutor,
      alt: 'Selección de cocteles de autor de Serafina Mixology alineados en la barra',
    },
    {
      icon: 'clean' as const,
      title: 'Montaje y limpieza',
      body: 'Llegamos tres horas antes y nos vamos sin dejar rastro. Solo necesitamos dos metros y una toma de corriente.',
      image: IDS.montaje,
      alt: 'Montaje de la barra móvil de Serafina Mixology',
    },
  ],
} as const;

export const STATEMENT = {
  head: 'Estamos aquí por la fiesta, la compañía y la conversación',
  /** Label matches where it goes: the events section, not a process page. */
  cta: 'Ver los eventos',
} as const;

export const BAND = {
  head: 'Coctelería de barra, donde usted diga',
  body: 'Desde treinta invitados, en salón, terraza o viñedo. Cubrimos Tijuana y Valle de Guadalupe sin costo de traslado.',
  image: IDS.barmanSombrilla,
  alt: 'Bartender de Serafina preparando un coctel en una barra al aire libre',
} as const;

export type EventKind = {
  label: string;
  name: string;
  body: string;
  image: string;
  alt: string;
};

export const EVENTOS: EventKind[] = [
  {
    label: 'Corporativos',
    name: 'Lanzamientos, cenas y fin de año',
    body: 'Facturamos, cumplimos protocolos de sede y llegamos con montaje discreto. Cotización en menos de dos días.',
    image: IDS.corporativos,
    alt: 'Bartender presentando dos gin tonics con pepino a los invitados',
  },
  {
    label: 'Fiestas privadas',
    name: 'En casa, en terraza o en jardín',
    body: 'Desde treinta invitados. Nos adaptamos al espacio que tenga, y si no hay agua llevamos garrafones.',
    image: IDS.privadas,
    alt: 'Bartender colando un coctel sobre hielo en la barra',
  },
  {
    label: 'Bodas',
    name: 'De la recepción al último baile',
    body: 'Coctel de bienvenida, barra durante la cena y una carta firmada por los novios. Coordinamos con su planner y con el banquete.',
    image: IDS.bodas,
    alt: 'Mesa larga de banquete al aire libre con candil, flores y cristalería',
  },
];

export const RESENAS = {
  label: 'Reseñas',
  head: 'Lo que dicen después',
  cta: 'Ver la carta',
  image: IDS.barman,
  alt: 'Bartenders de Serafina sirviendo cocteles en la barra montada',
  items: [
    {
      quote:
        'Montaron la barra en un viñedo sin agua ni luz y salió impecable. Mis invitados siguen preguntando por el trago de mezcal.',
      name: 'Ximena Ferreiro',
      meta: 'Boda en Valle de Guadalupe',
      city: 'Valle de Guadalupe',
      image: IDS.resena1,
      alt: 'Invitados brindando con cocteles de Serafina en un evento al aire libre',
      focus: 'center 40%',
    },
    {
      quote:
        'Hicieron la coctelería para nuestro evento frente al mar en Rosarito. El trago de jamaica y chile con mezcal artesanal fue la sensación.',
      name: 'Carlos & Jennifer Wright',
      meta: 'Evento privado, Rosarito',
      city: 'Rosarito',
      image: IDS.resena2,
      alt: 'Bartender de Serafina sirviendo en la barra durante un evento',
      focus: 'center 35%',
    },
    {
      quote:
        'Cotizaron en un día y atendieron a más de 140 personas con una velocidad impecable. Para un evento corporativo en Tijuana, son garantía.',
      name: 'Bruno Cattáneo',
      meta: 'Cena corporativa, Zona Río, Tijuana',
      city: 'Tijuana',
      image: IDS.resena2,
      alt: 'Bartender de Serafina sirviendo en la barra durante un evento',
      focus: 'center 35%',
    },
    {
      quote:
        'La cata previa definió el concepto de nuestra boda. El hielo tallado a mano y los cordiales botánicos elevaron toda la experiencia.',
      name: 'Mariana & David S.',
      meta: 'Boda boutique, Valle de Guadalupe',
      city: 'Valle de Guadalupe',
      image: IDS.resena1,
      alt: 'Invitados brindando con cocteles de Serafina en un evento al aire libre',
      focus: 'center 40%',
    },
    {
      quote:
        'Puntualidad absoluta, presentación impecable y una carta que compite con los mejores bares de la región.',
      name: 'Sophia Henderson',
      meta: 'Celebración privada, Ensenada',
      city: 'Ensenada',
      image: IDS.resena2,
      alt: 'Bartender de Serafina sirviendo en la barra durante un evento',
      focus: 'center 35%',
    },
    {
      quote:
        'Pedí que me sorprendieran para mi cumpleaños y armaron una carta que de verdad era nuestra. Los bartenders no pararon en cuatro horas.',
      name: 'Lucía Arismendi',
      meta: 'Fiesta privada, La Cacho, Tijuana',
      city: 'Tijuana',
      image: IDS.resena1,
      alt: 'Invitados brindando con cocteles de Serafina en un evento al aire libre',
      focus: 'center 40%',
    },
    {
      quote:
        'Montaron entre barricas, en una bodega sin toma de agua, y no se les notó ni un tropiezo. Se fueron y el lugar quedó como lo encontraron.',
      name: 'Renata Ocampo',
      meta: 'Cena de vendimia, Valle de Guadalupe',
      city: 'Valle de Guadalupe',
      image: IDS.resena2,
      alt: 'Bartender de Serafina sirviendo en la barra durante un evento',
      focus: 'center 35%',
    },
    {
      quote:
        'Llegaron con todo el equipo antes que el catering, sin un solo tropiezo. La barra fue de lo que más habló la gente esa noche.',
      name: 'Andrew Salas',
      meta: 'Boda en Valle de Guadalupe',
      city: 'Valle de Guadalupe',
      image: IDS.resena1,
      alt: 'Invitados brindando con cocteles de Serafina en un evento al aire libre',
      focus: 'center 40%',
    },
    {
      quote:
        'Dieron un taller de mixología para el equipo y terminamos preparando nuestros propios tragos. La mejor actividad que hemos hecho.',
      name: 'Paulina Restrepo',
      meta: 'Taller para equipo, Zona Río, Tijuana',
      city: 'Tijuana',
      image: IDS.resena2,
      alt: 'Bartender de Serafina sirviendo en la barra durante un evento',
      focus: 'center 35%',
    },
  ],
} as const;

export const COBERTURA = {
  label: 'Cobertura',
  head: 'Dónde llegamos',
  body: 'Cubrimos Tijuana, Rosarito, Ensenada y todo el Valle de Guadalupe sin costo de traslado. Fuera de esa zona se cotiza aparte, y sí, viajamos.',
  cta: 'Escríbanos su zona por WhatsApp',
  zonas: [
    { city: 'Tijuana', note: 'Base de operaciones' },
    { city: 'Valle de Guadalupe', note: 'Bodas y viñedos' },
    { city: 'Rosarito y Ensenada', note: 'Sin costo de traslado' },
  ],
} as const;

export const COTIZAR = {
  label: 'Cotización',
  head: 'Cuéntenos del evento',
  note: 'Respondemos en menos de dos días hábiles con una propuesta y un precio por persona.',
  tipos: ['Corporativo', 'Fiesta privada', 'Boda', 'Otro'],
} as const;

export const FOOTER = [
  {
    head: 'Servicio',
    links: [
      { label: 'La carta', href: '#carta' },
      { label: 'Qué incluye', href: '#servicio' },
      { label: 'Cobertura', href: '#cobertura' },
    ],
  },
  {
    head: 'Eventos',
    links: [
      { label: 'Corporativos', href: '#eventos' },
      { label: 'Fiestas privadas', href: '#eventos' },
      { label: 'Bodas', href: '#eventos' },
      { label: 'Talleres', href: '#talleres' },
    ],
  },
  {
    head: 'Contacto',
    links: [
      { label: 'Cotizar', href: '#cotizar' },
      { label: 'WhatsApp', href: BRAND.whatsapp },
      { label: 'Correo', href: 'mailto:' + BRAND.email },
    ],
  },
] as const;
