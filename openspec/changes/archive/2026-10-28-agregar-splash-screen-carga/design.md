# Design

## Context

- El sitio es una app Next.js 16 (App Router) con React 19 y Tailwind 4. `proxy.ts` reescribe `/` a `/<locale>`, por lo que **todas** las rutas renderizadas pasan por `app/layout.tsx` (root layout) y luego por `app/[lang]/layout.tsx`.
- `public/inicio.png` (1180×884) existe y actualmente no se referencia en ningún componente.
- Ya existe un patrón probado de componente cliente con fases y animaciones: `components/theme-toast.tsx` (máquina de fases `oculto → apareciendo → visible → desapareciendo`), con sus keyframes y bloque `prefers-reduced-motion` en `app/globals.css`, duraciones en ms sincronizadas entre JS y CSS, y `data-testid` para Playwright.
- El tema se resuelve con tokens CSS (`--background`, `--foreground`) más `data-theme`/media queries; no hay scripts inline previos en el proyecto.
- Pruebas e2e con Playwright (`e2e/`, servidor `npm run start -p 3002`, un solo worker), patrón de `data-testid` y `expect` de Playwright.
- Requisitos observables: ver `specs/experiencia-carga/spec.md`. Motivación: ver `proposal.md` - Why.

## Goals / Non-Goals

**Goals:**
- Splash con fade-in/fade-out basado en `inicio.png`, visible solo en la primera visita por sesión.
- Porcentaje 0–100 % animado, anclado abajo-izquierda, sincronizado con el fin de la carga y con cierre garantizado ≤ 8 s.
- Comportamiento responsivo y accesible (reduced motion, contraste, sin robo de foco).
- Cobertura e2e y que la suite existente siga pasando.

**Non-Goals:**
- Progreso real basado en descarga de recursos (decisión confirmada con el usuario: progreso simulado).
- Mostrar el splash en navegaciones internas con `next/link` o en visitas repetidas de la misma sesión.
- Textos localizados en el splash (solo dígitos y `%`; sin cambios al diccionario).
- Cambiar requisitos de capabilities existentes (`tema-apariencia`, `feedback-visual`, etc.).

## Decisions

### D1. Montaje en el root layout (`app/layout.tsx`)
El `<SplashScreen />` se coloca dentro del `<body>` del root layout.
- **Por qué**: es el único layout por el que pasan `/`, `/<lang>/...`, el fallback de `Suspense` y el `not-found`; además el splash no depende del idioma (sin textos), así que no necesita el diccionario de `app/[lang]/layout.tsx`.
- **Alternativa descartada**: montarlo en `app/[lang]/layout.tsx` (más cerca de la UI del sitio, pero quedaría fuera de rutas no localizadas y acoplaría un elemento no traducible a la capa de idioma).

### D2. SSR + script inline pre-paint para evitar parpadeos
El markup del splash se renderiza en el servidor **siempre visible por defecto**; un `<script>` pequeño e inline en el `<head>` del root layout, que ejecuta antes del primer pintado, lee la bandera de sesión (`tinexlab-splash-seen`) y, si existe, agrega `data-splash="seen"` a `<html>`; una regla CSS oculta el splash cuando ese atributo está presente.
- **Por qué**: en la primera visita el splash es visible desde el HTML sin esperar hidración (sin "pop-in" tardío); en visitas repetidas no hay ni un frame de splash parpadeante.
- **Alternativas descartadas**: (a) renderizar el splash solo desde `"use client"` después de montar — aparece tarde, justo lo contrario de "apareciendo durante la carga"; (b) inyectar el splash con el script inline — complica el árbol de React y el ciclo de vida.
- **Confirmado contra la guía oficial de Next 16** (`node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md`, sección "Themes"): el patrón exacto es script inline en el `<head>` del root layout con `try/catch`, y el `<html>` DEBE llevar `suppressHydrationWarning` porque el script cambia su atributo antes de hidratar (si no, React descarta el DOM corregido y repite el parpadeo).
- **Detalle de desarrollo**: en dev, React Strict Mode remonta los componentes y limpia los atributos de `<html>` que no gestionó JSX, borrando `data-splash="seen"`; `SplashScreen` debe re-aplicar la bandera desde `sessionStorage` en un `useLayoutEffect` (no-op en producción), tal como indica la guía.

### D3. Componente cliente con máquina de fases (patrón ThemeToast)
`components/splash-screen.tsx` con `"use client"` y fases `oculto → apareciendo → cargando → desapareciendo → oculto`.
- Al montar: si la bandera de sesión existe → `oculto` (y el CSS ya lo ocultaba); si no, escribe la bandera en `sessionStorage` de inmediato y arranca `apareciendo`.
- `apareciendo` dura lo mismo que el fade-in CSS (300 ms, igual que `theme-toast`; las constantes JS y los keyframes DEBEN coincidir, siguiendo el comentario ya existente en `globals.css`).
- `cargando`: actualiza el porcentaje con `setInterval`/`requestAnimationFrame`; al completarse pasa a `desapareciendo` (fade-out 300 ms) y finalmente a `oculto`, donde el nodo se desmonta y deja de ocupar pantalla.
- El estado inicial del cliente coincide con el SSR (splash visible, `0 %`) para evitar hidratación discordante; toda decisión post-mount ocurre en `useEffect`.
- **Por qué**: reutiliza un patrón ya validado en el proyecto y sus convenciones (`data-testid="splash-screen"`, `data-testid="splash-progress"`).

### D4. Curva de progreso simulado con dos anclas
- Durante `cargando`, el porcentaje avanza con una curva ease-out (rápido al inicio, lento hacia el 90 %) hasta un techo de **90 %** en ~2.5 s; nunca retrocede.
- El 100 % se alcanza cuando `window` dispara `load` (o si `document.readyState === "complete"` al montar): remate final de 90 → 100 % en ~300 ms y luego fade-out.
- **Cierre garantizado**: un temporizador de **8 s** desde la aparición fuerza `100 %` + fade-out si la señal `load` nunca llega (requisito del spec).
- **Alternativa descartada**: seguir `PerformanceObserver`/bytes reales — impredecible en App Router y descartado por el usuario (progreso simulado).

### D5. Capa visual con contraste garantizado
Splash `fixed inset-0`, `z-index` por encima del header y del toast (toast usa `z-50`; splash usa `z-[60]`), `overflow: hidden`. La imagen `inicio.png` se centra con `object-contain` (sin recorte ni deformación) sobre fondo `var(--background)`; el porcentaje usa `var(--foreground)` con `font-variant-numeric: tabular-nums` (evita saltos de ancho) y `bottom`/`left` con `env(safe-area-inset-bottom)` (patrón ya usado por `.theme-toast`).
- **Por qué**: el contraste texto/fondo queda garantizado por tokens en ambos temas (requisito del spec) sin analizar los píxeles de la imagen.
- **Alternativa descartada**: imagen a sangre completa (`object-cover`) como fondo — recorta la escena (viola "sin recortes") y haría el contraste del porcentaje impredecible.

### D6. Accesibilidad
Capa con `aria-hidden="true"` (decorativa), sin elementos enfocables dentro, sin `autofocus`; el splash no mueve ni roba el foco. El overlay bloquea puntero (`pointer-events: auto`) para evitar toques accidentales sobre contenido cubierto, pero no toca el teclado ni el árbol de foco: al desaparecer, los controles son alcanzables con tabulación. `prefers-reduced-motion: reduce` desactiva las animaciones de opacidad vía CSS (`animation: none !important`, patrón existente); el JS sigue actualizando el número.

### D7. Manejo defensivo de `sessionStorage`
Todas las lecturas/escrituras van en `try/catch`. Si el almacenamiento está deshabilitado (modo privado estricto), la bandera vive solo en memoria: el splash se muestra una vez por carga de página y nunca rompe la app.

### D8. Pruebas e2e
- Nuevo `e2e/splash-screen.spec.ts`: primera visita muestra splash y `%` que avanza; recarga en el mismo contexto no lo muestra; `reducedMotion: "reduce"` no anima opacidad; viewports 360 px y 1440 px sin scroll horizontal y con el `%` abajo-izquierda; splash desaparece solo (techo 8 s).
- La suite existente usa contextos nuevos por prueba, así que **todas** verán el splash: se agrega una espera compartida (helper en `e2e/helpers/`) de que `#splash-screen`/`[data-testid="splash-screen"]` esté oculto antes de interactuar; solo si alguna prueba resistiera esa espera se ajustará su `beforeEach`.

## Risks / Trade-offs

- [Las pruebas e2e existentes fallan porque el overlay cubre los controles] → espera compartida del helper + correr la suite completa al final; si persiste, ajustar las pruebas afectadas, no el comportamiento del spec.
- [Parpadeo del splash en visitas repetidas si el script inline llega tarde] → script inline en `<head>` antes del cuerpo + regla CSS que lo oculta pre-paint (D2); verificar con prueba de recarga.
- [Hidratación discordante por diferencia SSR/cliente] → estado inicial idéntico al HTML del servidor y toda decisión en `useEffect` (D3); revisar los warnings de consola en dev.
- [La señal `load` no llega y el splash queda pegado] → temporizador duro de 8 s (D4, requisito del spec).
- [El porcentaje "salta" o vibra visualmente] → techo de 90 % + remate corto, `tabular-nums` y duración fija por fase.
- [Flash incorrecto si el usuario comparte navegador/sesión con otra persona] → comportamiento esperado de `sessionStorage` por pestaña de sesión; sin dato sensible en la bandera.
- [Next 16 puede diferir de patrones conocidos de layouts/scripts] → antes de implementar, leer la guía aplicable en `node_modules/next/dist/docs/01-app` (AVISO de AGENTS.md) y ajustar D1/D2 si la guía lo indica, sin cambiar el spec.

## Migration Plan

No aplica: cambio aditivo sin datos, esquemas ni pasos de despliegue. El rollback es retirar el componente del layout, su script inline y sus estilos.

## Open Questions

- Ninguno: las dos ambigüedades relevantes (frecuencia de visualización y naturaleza del porcentaje) se resolvieron con el usuario antes de crear el cambio.
