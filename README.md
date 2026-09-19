# James Travel

Sitio web de James Travel, agencia de viajes en Santiago, República Dominicana.
Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4, bilingüe
(ES/EN), 100% estático (SSG) — sin backend ni base de datos por ahora.

## Cómo correr el proyecto localmente

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) (redirige automáticamente
a `/es`). Cambia de idioma con el selector ES/EN del header, o visita `/en`
directamente.

```bash
npm run build   # build de producción (SSG)
npm run start   # sirve el build de producción
npm run lint    # ESLint
```

## Fotos de los paquetes

Cada paquete tiene una foto limpia (`cover`) en `public/images/tours/`,
recortada de los flyers, que se usa en tarjetas y en el detalle; el flyer
original sigue en `images` y se enlaza como "Ver flyer original". Campos
opcionales en `packages.json`: `gallery` (fotos extra del detalle),
`coverPosition` (encuadre CSS de la tarjeta) y `departsOn` (fecha ISO de una
salida confirmada: aparece en "Próximas salidas" de la portada). Cuando el
cliente entregue fotos originales de mayor resolución, reemplaza esos
archivos con el mismo nombre.

## Editar el catálogo de paquetes

Todos los paquetes (nacionales e internacionales) viven en un solo archivo,
separado del código:

```
src/data/packages.json
```

Cada paquete es un objeto con este formato:

```json
{
  "id": "mi-nuevo-paquete",       // usado en la URL: /paquetes/mi-nuevo-paquete
  "type": "nacional",              // "nacional" | "internacional"
  "featured": true,                 // true = aparece en "Paquetes destacados" del home
  "title": { "es": "...", "en": "..." },
  "summary": { "es": "...", "en": "..." },      // texto corto para las tarjetas
  "description": { "es": "...", "en": "..." },  // texto largo para el detalle
  "duration": { "es": "3 días / 2 noches", "en": "3 days / 2 nights" },
  "dates": { "es": "Salidas: ...", "en": "Departures: ..." },
  "price": { "adult": 185, "child": 140, "currency": "USD" }, // child: null si no aplica (muestra "Consultar")
  "includes": { "es": ["..."], "en": ["..."] },
  "excludes": { "es": ["..."], "en": ["..."] },   // opcional
  "destinations": { "es": ["..."], "en": ["..."] },
  "images": ["/images/packages/mi-nuevo-paquete/1.svg", "..."]
}
```

Para agregar un paquete nuevo:

1. Agrega sus fotos en `public/images/packages/<id>/` (cualquier formato:
   jpg, png, webp; no tienen que ser SVG — los placeholders son solo
   provisionales).
2. Agrega el objeto correspondiente a `packages.json`.
3. Corre `npm run build` de nuevo — la página de catálogo, el detalle y la
   galería general se regeneran solos (usan `generateStaticParams`, no hay
   que tocar código).

No hay base de datos: todo se genera en build time a partir de este archivo.
Si más adelante se necesita un panel de administración, este archivo es el
punto de partida natural para migrar a Firestore (mismo shape de datos).

## Marca (logo, colores, tipografía)

El logo y la paleta de colores **ya son los reales** de James Travel (no
placeholders): se extrajeron del `Logo.jpg` que compartiste y de los flyers
de tours. Todo sigue centralizado en 2-3 archivos por si cambian más
adelante — los componentes nunca usan un hex o una ruta de imagen directa:

1. **Logo**: `public/brand/logo-horizontal.png` es tu logo real, con el
   fondo removido (recortado de `Logo.jpg`). `public/brand/icon.svg` es una
   versión vectorial redibujada del ícono de pin+sol+ola que aparece en tus
   flyers, en los mismos colores. Si más adelante tienes archivos de logo
   nuevos u oficiales (por ejemplo, un AI/SVG vectorial del diseñador),
   reemplaza estos archivos con el mismo nombre — o actualiza las rutas en
   `src/lib/brand.ts` si cambias el nombre/formato.

2. **Colores**: extraídos por muestreo de píxeles del logo y los flyers —
   azul navy `#254d8b` y dorado `#e8c84c`, con variantes en
   `src/styles/brand-theme.css`. Si el diseñador te da valores hex exactos
   (de un archivo vectorial o guía de marca), reemplázalos ahí.

3. **Tipografía**: `Outfit` para títulos, `DM Sans` para texto de cuerpo y
   `Kaushan Script` solo para una palabra de acento por título (imita las
   letras dibujadas a mano del logo y los flyers: "tu guía *al mundo*").
   Configurado en `src/lib/fonts.ts`; si tienes una tipografía de marca con
   licencia, cámbiala ahí manteniendo los nombres de variable
   `--font-heading` / `--font-body` / `--font-script`.

Los archivos originales que compartiste (`Logo.jpg`, la carpeta
`Tours para este año/`) se quedaron en la raíz del proyecto tal cual los
pusiste — no se modificaron, solo se usaron como fuente para generar los
assets de `/public`.

## Datos del negocio (WhatsApp, pagos, redes, estadísticas)

Todo lo que no es catálogo vive en `src/data/business.ts`. Los dos números
de teléfono (809-854-1113 y 809-241-7012) son los reales, tomados de tus
propios flyers ("Para reservar debe de llamar") — confirma cuál de los dos
tiene WhatsApp activo (por ahora se usa el 809-854-1113 para el botón de
WhatsApp del sitio). Lo que sigue marcado `[PLACEHOLDER]` son datos que
todavía no tengo: correo, redes sociales, estadísticas del home y los datos de pago
(Zelle y transferencia bancaria en RD). Es informativo — el sitio no
procesa pagos, solo muestra las instrucciones y dirige al cliente por
WhatsApp para coordinar.

**Nota sobre precios**: el catálogo sale de los flyers en
`Tours para este año/`. Las tres salidas de 2026 (Tour Sur Profundo,
San Juan/Elías Piña/Pedernales y Otoño Europeo) llevan fecha vigente.
El resto son tours reales de flyers anteriores: el precio es el último
publicado y la fecha dice "Consulte próximas salidas" para no anunciar
una salida ya pasada. No se publicaron tarifas de hotel de terceros
(Palladium, Hyatt, Lifestyle) ni el aviso de COVID, porque no son tours
de James Travel.

El sitio ya no muestra estadísticas ni testimonios: eran datos de ejemplo y se
quitaron. Cuando el cliente tenga cifras y reseñas reales, se pueden agregar
secciones nuevas en `src/components/home/`.

Las redes sociales del pie de página solo aparecen cuando se llenan
`business.social.instagram` / `facebook` en `src/data/business.ts`.

## Bilingüe (ES/EN)

- Rutas con prefijo de idioma siempre: `/es/...` y `/en/...` (i18n con
  [next-intl](https://next-intl.dev), configurado en `src/i18n/` y
  `src/proxy.ts`).
- Textos de interfaz (botones, menús, encabezados de sección) están en
  `src/messages/es.json` y `src/messages/en.json`.
- Los textos de contenido (paquetes, testimonios, negocio) son bilingües
  dentro de su propio archivo de datos (`{ "es": "...", "en": "..." }`), no
  en los archivos de `messages`.

## Estructura del proyecto

```
src/
  app/[locale]/          rutas (home, /paquetes, /paquetes/[slug], /galeria, /pagos, /contacto)
  components/            componentes de UI, organizados por sección
  data/                  packages.json, business.ts, gallery.ts, testimonials.ts
  i18n/                  configuración de next-intl (rutas, navegación, request)
  lib/                   helpers (packages.ts, brand.ts, fonts.ts)
  messages/              textos de interfaz ES/EN
  proxy.ts               enrutamiento de idioma (antes "middleware.ts")
public/
  brand/                 logo y assets de marca (reemplazar aquí)
  images/                fotos de paquetes y galería (placeholders SVG)
```

## Deploy en Vercel

Proyecto 100% estático, sin variables de entorno requeridas.

```bash
npm i -g vercel
vercel
```

O conecta el repositorio directamente desde el dashboard de Vercel — detecta
Next.js automáticamente.
