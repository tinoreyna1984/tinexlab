# Design

## Context

- El panel móvil es el `div#site-navigation` de `components/site-header.tsx`: cuando `mobileMenuOpen` es falso en viewport `< 1024 px`, la clase `data-[open=false]:hidden` lo remueve del layout de inmediato (`display: none`), por eso hoy no hay transición posible: `display: none` no participa en animaciones CSS.
- El panel en estado abierto ya está posicionado de forma absoluta bajo la cabecera (`absolute top-full`), por lo que no ocupa espacio en el flujo ni puede provocar desplazamiento horizontal durante la animación.
- Los estados observables que prueban las E2E (`data-open`, `aria-expanded`, `aria-hidden`) se derivan de React y deben seguir cambiando de inmediato al activar el botón (ver `e2e/helpers/menu.ts` → `expectMenuState`).
- Ya existe lenguaje de animación en el sitio: `theme-toast-fade-in/out` y `neon-pulse` en `app/globals.css`, con anulación bajo `prefers-reduced-motion: reduce` en esa misma hoja. Ver `proposal.md - Why` para la motivación.

## Goals / Non-Goals

**Goals:**
- Animar apertura y cierre del panel del menú móvil con desplazamiento vertical + desvanecimiento, en ≤ ~250 ms.
- Conservar intactos: estados ARIA/`data-open`, cierre con Escape, cierre al navegar, sincronización del breakpoint, pruebas E2E existentes y ausencia de overflow horizontal.
- Respetar `prefers-reduced-motion: reduce` (cambio inmediato, sin transición).
- No afectar la navegación horizontal de escritorio (`lg:`).

**Non-Goals:**
- Animar otros elementos (enlaces individuales del menú, botón ☰/X, selector de idioma o tema).
- Agregar librerías de animación (Framer Motion, GSAP) o dependencias nuevas.
- Cambiar el diseño, textos, destinos o jerarquía del menú.
- Animar la transición móvil ↔ escritorio.

## Decisions

1. **Animación por CSS puro (transiciones/keyframes en `app/globals.css`) dirigida por el atributo `data-open`, en lugar de un estado de fase en React.**
   - Rationale: `data-open` ya existe y cambia de inmediato; React solo debe animar el cierre. Alternativa descartada: replicar el patrón de fases de `theme-toast.tsx` (`apareciendo/visible/desapareciendo`) — agrega temporizadores JS duplicados de la duración CSS y riesgo de dessincronización; se usará solo si las transiciones CSS no alcanzan.

2. **Dejar de usar `display: none` (`data-[open=false]:hidden`) para el cierre y sustituirlo por `visibility: hidden` con retardo de transición + `pointer-events: none`.**
   - Con `visibility` el panel permanece renderizado durante la animación de salida y desaparece del layout al terminar (hereda que el panel abierto es `absolute`, así que no ocupa flujo en ninguno de los dos estados).
   - Alternativa descartada: quitar el nodo tras `transitionend` con un temporizador JS — más propenso a race conditions con clics rápidos y con el cierre por Escape.

3. **Transiciones: apertura ~200–250 ms (`ease-out`) desde `opacity: 0` + `translateY(-8px…-12px)`; cierre ~150–200 ms (`ease-in`) inverso, con `visibility` retrasada a la duración total.**
   - El desplazamiento es pequeño: el panel nace justo debajo de la cabecera, un slide largo se percibiría lento en móvil.
   - La opacidad/transform se anulan en escritorio dentro de los breakpoints `lg:` existentes para que la navegación horizontal no herede la transición.

4. **Bloqueo de interacción durante el cierre con `pointer-events: none` + `inert` (o `aria-hidden` ya presente más evitar `tabbable`), aplicado cuando `data-open="false"`.**
   - Satisface el escenario "Cierre sin interacción accidental" sin tocar los estados que ya cambian de inmediato. Alternativa descartada: mantener el panel interactivo durante la salida (riesgo de toques accidentales al navegar).

5. **`prefers-reduced-motion: reduce` anula la transición completa en `globals.css`**, siguiendo el patrón ya usado para `.title-neon` y `.theme-toast`: `transition: none` / `animation: none !important`. Sin JS adicional.

6. **Pruebas**: mantener verdes las E2E de `e2e/menu-responsive.spec.ts`; agregar un escenario E2E que verifique (a) `data-open`/`aria-expanded` cambian inmediatamente al hacer clic, (b) el panel termina oculto tras el cierre, y (c) con `prefers-reduced-motion: reduce` simulado el estado final es idéntico. Si alguna aserción existente depende de oclusión inmediata, ajustar la aserción (esperar el estado final), no la animación.

## Risks / Trade-offs

- [Duración de la animación hace fallar aserciones E2E que esperan el panel oculto] → Los estados ARIA/`data-open` cambian de inmediato; las aserciones de visibilidad usan auto-retry de Playwright y la transición dura < 250 ms. Si una aserción falla, se espera el estado final explícitamente.
- [Panel visible pero `aria-hidden` durante ~200 ms de cierre] → Se combina con `pointer-events: none` + `inert`; ninguna tecnología de asistencia enfocará el panel durante la salida.
- [Interrupciones: abrir/cerrar en ráfaga o cruzar el breakpoint a mitad de transición] → Las transiciones CSS se recalculan sobre el estado `data-open` actual; el cambio a escritorio ya fuerza `menuOpen = false` y las clases `lg:` anulan la transición.
- [Espacio de toque cubierto por el panel en cierre] → `pointer-events: none` en cierre evita taps accidentales sobre el contenido de abajo.
- [Exceso de animación percibido como lentitud] → Duraciones cortas (≤ 250 ms) y movimiento mínimo; sin rebotes ni efectos adicionales.

## Migration Plan

Cambio puramente visual en cliente, sin datos ni despliegue especial: se despliega con el build normal de Next.js. Rollback = revertir el commit (el estado sin animación es el comportamiento actual del sitio).

## Open Questions

- Ninguna pendiente: el tipo de animación (slide + fade), duración (≤ 250 ms) y respeto de movimiento reducido son decisiones tomadas arriba; no alteran los requisitos del delta.
