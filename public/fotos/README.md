# Fotos propias

Cualquier archivo que se deje aquí se sirve tal cual desde la raíz del sitio.
Para usarlo, basta con poner su ruta en `src/lib/images.ts`, empezando con `/`:

```ts
export const IDS = {
  barman: '/fotos/barra.jpg',   // en lugar del id de Unsplash
  ...
};
```

`photo()` y `srcSet()` detectan la barra inicial y devuelven la ruta sin tocarla,
así que no hay que cambiar ningún componente.

## Qué conviene subir

| Sitio | Qué se ve | Forma |
|---|---|---|
| `hero` | Un trago, a la derecha del encuadre, con espacio limpio a la izquierda para el titular | Apaisada, 2400px de ancho o más |
| `barman` | **Los bartenders trabajando la barra montada**: uniformes, herramientas, garnishes | Apaisada, 2400px o más |
| `salon` | La barra montada, sin gente | Apaisada |
| `alba` | Un trago sobre fondo blanco liso, para recortarlo de su fondo | Vertical |
| `bodas`, `corporativos`, `privadas` | Montajes reales de cada tipo de evento | Apaisadas |

Para la carta, si los tragos se fotografían **sobre fondo blanco liso**, el recorte
por `multiply` funciona en las seis baldosas y no solo en una.
