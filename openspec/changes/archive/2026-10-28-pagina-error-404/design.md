# Design

## Context

- El sitio corre en Next.js 16.4.2 (App Router, `cacheComponents: true`) con React 19 y Tailwind 4.
- El i18n funciona con `proxy.ts`: toda URL sin locale explícito se reescribe a `/{locale}{path}` (es predeterminado; preferencia del navegador solo aplica en `/`). `app/[lang]/layout.tsx` valida el locale con `isLocale()` y lanza `notFound()` si no es soportado; define header, footer, tema e idioma del sitio.
- Actualmente no existe ningún `not-found.tsx` en el proyecto: cualquier ruta inexistente cae en la página 404 por defecto de Next.js.
- Según la documentación de Next.js 16 (`node_modules/next/dist/docs/.../not-found.md`): `not-found.tsx` no acepta props; `global-not-found.js` es experimental y solo se justifica cuando no existe un root layout único (no es nuestro caso: `app/layout.tsx` existe). Next inyecta `<meta name="robots" content="noindex" />` automáticamente en respuestas 404.
- Los textos de UI viven en `lib/dictionaries/{es,en,pt}.json`; `lib/dictionaries.ts` carga los JSON tras `import "server-only"`, pero los archivos JSON en sí son datos estáticos importables desde componentes cliente.
- `public/404.jpg` (982×551, ~60 KB) existe y no tiene referencias en el código. `app/[lang]/page.tsx` ya usa `next/image` para `bio.jpg`, y `e2e/helpers/splash.ts` provee `waitForSplashToHide` para pruebas.

Ver proposal.md — Why para la motivación y `specs/pagina-error-404/spec.md` para los requisitos observables.

## Goals / Non-Goals

**Goals:**

- Que toda ruta inexistente muestre la página 404 personalizada con `404.jpg`, localizada y dentro del chrome del sitio.
- Resolver de forma robusta el locale dentro de un boundary `not-found.tsx`, que no recibe props en Next 16.
- Mantener una sola fuente de verdad para los textos (los diccionarios del proyecto).

**Non-Goals:**

- Cambiar el comportamiento del proxy o la estrategia de i18n existente.
- Modificar la página raíz plantilla `app/page.tsx` ni el metadata "Create Next App" del root layout (fuera del alcance de este cambio).
- Crear una ruta tipo catch-all `/[...rest]` ni usar `global-not-found.js` (experimental).
- Animaciones o transiciones nuevas en la página de error.

## Decisions

**D1 — Un solo boundary efectivo: `app/not-found.tsx`, que compone el chrome del sitio.**
En esta app (cacheComponents + layout de idioma con Suspense) toda URL sin ruta propia renderiza el `not-found` de la raíz, por lo que `app/not-found.tsx` es el handler principal del 404 (no una red de seguridad) y reproduce el chrome del sitio completo (header, footer, tema, idioma) mediante el componente compartido `components/locale-shell.tsx`. Next inyecta `<meta name="robots" content="noindex" />` automáticamente y el status 404 se envía antes de iniciar el streaming. Verificación empírica: las cinco rutas de prueba del spec (sin locale, `/en/`, `/pt/`, ruta profunda y locale no soportado) responden 404 con chrome y copia correctos. `app/not-found.tsx` exporta `instant = false` para permitir render bloqueante bajo cacheComponents, ya que el contenido depende de headers de la petición (evita además un fallback de Suspense que duplicaría el panel en el DOM). Alternativa descartada: `global-not-found.js` exige el flag experimental, bypassa layouts y pierde chrome.

**D2 — Locale resuelto en el proxy con header `x-locale` y leído con `headers()`.**
Los archivos `not-found` no reciben props ni params en Next.js 16, y `headers()` no expone el pathname. El proxy ya conoce el locale (es el que reescribe a `/{locale}{path}`), así que adjunta `x-locale` como header de petición en la respuesta `next()`/`rewrite()`; `app/not-found.tsx` lo lee con `headers()`, valida con `isLocale()` y cae a `"es"` cuando no existe (p. ej. URLs con punto que el matcher del proxy excluye). El locale viaja como prop al `LocaleShell` y al panel. Cambio aditivo al proxy: no altera el ruteo ni la estrategia de i18n, solo adjunta el header. Alternativas descartadas: `useParams()` (depende de que el boundary renderice dentro del segmento `[lang]`, que no ocurre para URLs sin ruta propia); catch-all `[...rest]` que lanza `notFound()` (innecesario: el handler en la raíz ya cubre todos los casos con chrome e idioma).

**D3 — Textos del 404 como claves `notFound` en los tres diccionarios JSON.**
Se agregaron las claves `notFound` (título, mensaje, texto alternativo de la imagen y etiqueta del enlace al inicio) a `es`, `en` y `pt`. El invariant `Record<Locale, Dictionary>` en `lib/dictionaries.ts` fuerza paridad de claves entre locales a nivel de tipos. El panel es un componente servidor y usa `getDictionary()` directamente, así que no hay imports de JSON duplicados ni guard `server-only` evitado. Alternativa descartada: duplicar los strings en un módulo aparte (dos fuentes de verdad, posible divergencia).

**D4 — `LocaleShell` compartido entre el layout de idioma y la página de error.**
El chrome del sitio (header, main, footer y toast de tema) vive en `components/locale-shell.tsx`, un componente servidor que recibe `locale` y `children`. `app/[lang]/layout.tsx` lo usa tras validar el locale (conservando su Suspense y su `notFound()` para locales inválidos, sin cambio de comportamiento) y `app/not-found.tsx` lo usa con el locale resuelto por `x-locale`. Así el 404 compone exactamente la misma estructura que una página real, sin duplicar lógica, y el enlace al inicio usa `localizedPath()`.

**D5 — `next/image` con dimensiones explícitas para `404.jpg`.**
`width={982} height={551}` con ancho responsivo (`w-full h-auto` acotado) evita CLS y respeta la relación de aspecto en todos los viewports; el `alt` viene del diccionario. La imagen es una JPG con contenido fotográfico/ilustrativo: no aplica `dark:invert` (patrón reservado para SVGs del tema). Alternativa descartada: `background-image` en CSS, que pierde `alt`, optimización de imágenes y accesibilidad.

**D6 — Metadata de la página 404.**
`app/not-found.tsx` exporta `metadata` estático con título localizado por defecto (es) — la doc de Next 16 lo soporta explícitamente. Para el boundary bajo `[lang]` no hay API de metadata con params en not-found; el `noindex` automático de Next cubre el requisito de no indexación. Título localizado preciso bajo `[lang]` es mejora futura opcional, sin cambio de specs.

## Risks / Trade-offs

- [El root not-found renderiza sin header/footer del sitio] → Es una red de seguridad poco frecuente; el panel con fallback `es` sigue ofreciendo el enlace al inicio, que redirige al locale correcto vía proxy.
- [El splash de carga cubre el 404 en la primera visita] → Las pruebas e2e usan `waitForSplashToHide` antes de asertar, como el resto de las specs.
- [Importar JSON directamente en un componente cliente evita el guard `server-only`] → Intencional y seguro: los JSON son datos estáticos; el guard sigue protegiendo `lib/dictionaries.ts`.
- [Paridad de claves entre diccionarios] → Ya garantizada por el tipo `Record<Locale, Dictionary>`; agregar la clave solo en `es` rompe el typecheck.
- [Estado HTTP 404 con `cacheComponents: true`] → La doc indica que el status 404 se envía antes de iniciar el streaming; la prueba e2e verifica el status real para detectar regresiones.

## Migration Plan

Cambio puramente aditivo: no hay datos ni despliegues que migrar. Rollback = eliminar los archivos nuevos y las claves agregadas a los diccionarios.

## Open Questions

<!-- Ninguna abierta: el texto exacto de los mensajes (copy) se define al implementar dentro de los diccionarios; los requisitos solo restringen localización y comportamiento. -->
