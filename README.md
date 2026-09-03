# Serafina Mixology

Landing de un **servicio de coctelería para eventos**: bodas, corporativos, fiestas
privadas y talleres de mixología, en **Tijuana y Valle de Guadalupe**.
React 19 + Vite + Tailwind v4 + Motion.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc + vite build -> dist/
npm run preview  # sirve dist/ en :4173
npm run lint
```

## El lenguaje visual

Construido sobre la referencia de **MOTH**, traduciendo su estructura de e-commerce a
un negocio de servicio:

- Fondo hueso, **baldosas beige** que cargan la fotografía, **bandas negras** para los
  momentos fuertes, y texto funcional muy pequeño.
- **Dos familias, con papeles claros.** El display es **Bodoni Moda**, la didona del
  logotipo real, en mayúsculas con tracking abierto. Todo lo funcional (cuerpo,
  etiquetas, botones, formulario) va en **Archivo**: una didona a 13px es ilegible.
- El **lockup de marca** reproduce el logotipo: `SERAFINA` sobre `MIXOLOGY & EVENTS`,
  este último muy pequeño y muy separado. Aparece en la barra, en el pie y a sangre
  completa sobre la banda negra.
- **Sin color de acento**: las bebidas ponen todo el color. Los botones son negro
  sólido o contorno.
- Radio 0 en todo, sin excepción: baldosa, tarjeta, imagen y también los botones.
  Esquina recta en toda la página.

## Estructura

| Sección | Equivalente en la referencia |
|---|---|
| Hero | **Una fotografía a sangre completa.** El trago está en un espacio real, con luz y sombra reales; el titular, los botones y la reseña con estrellas van encima, sobre el espacio negativo de la izquierda. La reseña **rota sola** entre las mismas nueve de Reseñas —pausable, y estática con movimiento reducido— en vez de una fija |
| Tira | Bajo la fotografía: las cifras del servicio, separadas por filetes |
| La carta | La rejilla de producto: seis baldosas con nombre, base y botón |
| El servicio | **Banda beige** con el titular arriba y tres columnas anchas: icono en círculo, título en la didona y cuerpo legible. Es la mejor copia de venta de la página, así que tiene superficie propia y escala real |
| Declaración | Un momento tipográfico centrado, sin nada al lado |
| Banda | El momento a sangre completa. Muestra **el servicio**, no a los invitados: alguien llega y sirve |
| Eventos | Cuatro tarjetas: bodas, corporativos, fiestas privadas y talleres |
| Reseñas | Columna de texto fija a un lado; al otro, la foto y la reseña **lado a lado** desde escritorio ancho (apiladas en tablet y móvil, donde no cabe el par). La foto cambia con cada reseña —invitados reales brindando en eventos, del mismo Instagram— y el texto con estrellas doradas hace el relevo al mismo tiempo, en fundido lento |
| Cobertura | Foto a la izquierda, respuesta práctica a la derecha |
| Cotización | El formulario, con campos subrayados |
| Logotipo | El nombre a sangre completa sobre banda negra |

## Dos técnicas que vale la pena conocer

**Por qué el hero es una fotografía y no un recorte.** La primera versión era un panel
de color plano con la bebida recortada encima, y no se parecía a la referencia: le
faltaba el espacio real, la luz real y la sombra proyectada. Un recorte no puede
fingirlas. La toma elegida es la única del set con la estructura correcta (apaisada,
copa a la derecha, espacio negativo a la izquierda), así que el hero es la foto entera
con un velo direccional debajo del texto. En pantalla angosta no hay sitio para un velo
direccional (la copa cae bajo la copia), así que ahí el velo se vuelve casi uniforme.

**El recorte de la bebida.** Las fotos de stock no traen canal alfa. El fondo se
elimina ópticamente: el contraste empuja el fondo casi blanco a blanco puro,
`mix-blend-mode: multiply` lo hace desaparecer en la baldosa, y una máscara radial
suave difumina el borde del encuadre. Solo funciona con fotos ya tomadas sobre fondo
claro y liso, y de esas hay pocas en stock: por eso hay una sola bebida recortada, y
las otras cinco llenan su baldosa. Se probó una segunda para armar un grupo de producto
en el hero, pero su fondo cálido y su sombra dura sobreviven a la mezcla y leen como una
losa gris; se descartó.

**Las superficies fotográficas no invierten con el tema.** La baldosa (`--plate`) se
queda beige en las dos ediciones, porque ahí es donde se apoya la fotografía. En modo
oscuro la página es casi negra y las baldosas siguen siendo beige, que además se ve
muy bien.

**El rotador de reseñas se puede parar.** WCAG 2.2.2 lo exige de cualquier cosa que se
mueva sola más de cinco segundos, así que hay un botón de pausa, y además se detiene al
pasar el cursor y al recibir foco de teclado. Con `prefers-reduced-motion` no arranca
nunca: en su lugar se despliegan las nueve reseñas a la vez, para que nada quede
escondido detrás de una animación que no va a correr. La región `aria-live` solo anuncia
cuando está detenido, porque una que cambia cada seis segundos es inservible.

La altura del bloque está **reservada por breakpoint y medida**, no estimada: tres
columnas angostas a 768px son el caso más alto (182px) y antes se reservaban 164, lo que
producía un salto de 18px al cambiar de página.

**El eje `opsz` es lo que hace legible a la didona.** Bodoni tiene contraste extremo
entre trazo grueso y fino, y su eje de tamaño óptico (6 a 96) controla exactamente eso.
A `opsz` 96, el corte de *display*, las líneas finas quedan como pelos y desaparecen en
pantalla. La página usa **14 con peso 600** para titulares y **12 con 600** para el
lockup: misma familia, misma marca, pero con trazos que se sostienen.

**Y en blanco sobre negro hace falta un paso más de peso.** El texto invertido adelgaza
ópticamente, así que la clase `.reversed` sube a peso 700 y baja el `opsz` a 11. Se
aplica al logotipo gigante, al lockup del pie y al titular sobre la fotografía oscura.
En la edición noche **todo** el display recibe ese mismo refuerzo por CSS, porque ahí
cada titular es claro sobre oscuro.

**Por qué la banda no es de pantalla completa.** A altura completa quedaban ~230px
muertos arriba y abajo de la columna. La banda de la referencia mide unos 700px, no una
pantalla entera, así que se fijó en 720px y la columna se centra: márgenes equilibrados
leen como espacio deliberado, un hueco desbalanceado lee como un error. La reseña y las
cifras salieron de la banda a una tira propia, para que el hero se quede en cuatro cosas.


## Verificado

Conducido en Chrome headless, no solo compilado:

- Sin desbordamiento horizontal en 1440 ni 390. Cero errores de consola.
- Edición clara y edición oscura, con la baldosa comprobada en las dos.
- Movimiento reducido: ningún revelado se queda oculto. Los únicos elementos con
  opacidad reducida son los del pie, intencionales, y todos pasan AA.
- Formulario: foco al primer campo inválido, `aria-invalid` en los cinco requeridos,
  errores con `role="alert"`, resumen con anclas, `aria-busy` al enviar, confirmación.
- Menú móvil con `role="dialog"`, bloqueo de scroll y cierre con Escape.
- Enlace de salto al contenido como primera parada de tabulación.

Crítico: **122 kB gzip**, un solo bundle. La imagen del hero se precarga con el mismo
`imagesrcset` que pide el `<img>`.

## Pendiente antes de publicar

1. **El formulario simula el envío.** Conectarlo a correo, CRM o WhatsApp Business
   (marcado con `TODO` en `Cotizar.tsx`).
2. **Datos del negocio inventados.** Teléfono, correo, las seis recetas y **las nueve
   reseñas con sus cinco estrellas** son de relleno. Viven en `src/lib/content.ts`.
   Las reseñas están escritas para Tijuana, Rosarito, Ensenada y Valle de Guadalupe, pero
   **son ficticias**: hay que reemplazarlas por testimonios reales antes de publicar.
   La cobertura y la ubicación sí son las reales, tomadas del perfil de Instagram.
3. ~~**Fotos propias.**~~ Hecho: cada foto del sitio es un archivo real en
   `public/fotos/`, ya no queda ningún id de Unsplash en `src/lib/images.ts`.
   `photo()` y `srcSet()` detectan la barra inicial (`/fotos/...`) y devuelven la
   ruta sin tocarla, así que dejar un archivo nuevo ahí no exige cambiar ningún
   componente. `public/fotos/README.md` documenta qué conviene subir a cada sitio.
4. **Aviso de privacidad**: el enlace del pie no tiene destino.
