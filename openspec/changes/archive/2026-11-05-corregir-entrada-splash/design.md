# Design

## Context

- El splash se renderiza por SSR en `app/layout.tsx` (`<SplashScreen />`) y sus fases viven en `components/splash-screen.tsx`: `apareciendo → cargando → desapareciendo → oculto`, con `fadeMs = 300` sincronizado con las animaciones CSS de `app/globals.css`.
- La capa `.splash` es `position: fixed; inset: 0; z-index: 60; background-color: var(--background)` — el mismo token que el `body`, así que si la capa permanece opaca, el contenido detrás es invisible por construcción.
- El bug: `.splash--apareciendo { animation: splash-fade-in 0.3s ease-out both }` anima la opacidad de **toda la capa**, incluido su `background-color`; durante los 300 ms iniciales el fondo se transparenta y el sitio se ve detrás (ver proposal.md - Why).
- El CSS de Next llega render-blocking desde `<head>`, por lo que no hay pintado sin estilos: la capa existe opaca desde el primer pintado en producción.
- Resto del ciclo intacto: bandera de sesión (`lib/splash.ts` + script pre-paint), hard-stop de 8 s, progreso simulado, `prefers-reduced-motion`, `aria-hidden`, `data-testid` para Playwright. Ver `openspec/specs/experiencia-carga/spec.md` (con el delta de este cambio).

## Goals / Non-Goals

**Goals:**
- Que el contenido del sitio nunca sea visible durante la aparición del splash (fade-in), en la primera visita de la sesión.
- Mantener el fade-out de salida tal cual: sigue siendo la transición que revela el contenido al 100 %.
- Conservar todas las garantías existentes: cierre ≤ 8 s, visitas repetidas sin splash, reduced-motion, contraste, accesibilidad de teclado.

**Non-Goals:**
- Ocultar el contenido del sitio con `visibility`/`display` (descartado: ver D2).
- Tocar `components/splash-screen.tsx`, `app/layout.tsx`, `lib/splash.ts` o el script pre-paint.
- Cambiar duraciones, curva de progreso, bandera de sesión o cualquier otro requisito de `experiencia-carga`.
- Fallback sin JavaScript (ya fuera de alcance del cambio original del splash).

## Decisions

### D1. El fade-in se mueve de la capa a sus hijos
`.splash--apareciendo` deja de animar la capa (queda sin animación, fondo opaco de forma permanente) y la animación de entrada pasa a `.splash__image` y `.splash__progress`, reutilizando el keyframe existente `splash-fade-in` (0.3 s, `ease-out`, `both`).

```
Antes:  .splash--apareciendo { animation: splash-fade-in ... }   <-- fondo se transparenta
Después: .splash--apareciendo { /* sin animación, opaco */ }
         .splash--apareciendo .splash__image,
         .splash--apareciendo .splash__progress { animation: splash-fade-in ... }
```

- **Por qué**: es el cambio mínimo (solo CSS) que cumple el spec: la capa nunca baja de `opacity: 1` durante la entrada, así que el contenido detrás no puede transparentarse. Al mantener `background-color` en la capa con el token `--background`, el frame 1 muestra el fondo del tema —visualmente idéntico al body— y la imagen aparece encima con fundido.
- **Sincronización**: se reutiliza `fadeMs = 300 ms` ya existente; la constante JS y el keyframe no cambian, solo dónde se aplican.
- **Transición de fase**: al pasar a `cargando`, la clase `--apareciendo` se retira y las animaciones de los hijos se detienen con los elementos en su estado natural (`opacity: 1`); sin `forwards` residual porque la animación desaparece del todo. La capa sigue opaca: ningún frame intermedio transparenta.
- **Alternativa descartada (A)**: mantener el fade en la capa y darle un fondo opaco vía hermano/pseudo-elemento fuera del árbol animado — exige añadir markup al componente (fuera del alcance declarado) sin ahorro real.

### D2. El contenido del sitio se deja en su lugar (sin ocultarlo)
El sitio detrás del splash permanece en el DOM, visible para el árbol de accesibilidad y el orden de tabulación, tal como hoy.

- **Por qué**: el requisito de accesibilidad de `experiencia-carga` exige que el splash "no intercepta la interacción del teclado con el contenido que carga detrás"; aplicar `visibility: hidden` al contenido lo sacaría del orden de tab durante la carga y entraría en conflicto con ese requisito. Además, con la capa opaca (D1) el resultado visual es idéntico: el contenido no se **ve**, aunque siga ahí.
- **Alternativa descartada**: `html[data-splash="pending"] body > *:not(.splash) { visibility: hidden }` + script pre-paint con dos ramas — toca CSS, script inline y componente, añade riesgo sin JS (contenido oculto para siempre si la hidratación falla), y resuelve un problema que D1 ya elimina.

### D3. `prefers-reduced-motion` se amplía a los hijos
El bloque `@media (prefers-reduced-motion: reduce)` que hoy pone `animation: none !important` en `.splash` debe incluir `.splash__image` y `.splash__progress`.

- **Por qué**: con reduced-motion el JS hace las esperas 0 ms, pero si el CSS no desactiva la animación de los hijos podría aparecer un destello de fundido de 300 ms en el primer frame. Mantiene el contrato del requisito "Movimiento reducido en el splash" (aparición sin transición de opacidad).

### D4. Ajustes de pruebas e2e
- `e2e/splash-screen.spec.ts` línea 62: `expect(entryAnimation).toBe("splash-fade-in")` lee `getComputedStyle(splash).animationName` **sobre la capa** — ahora debe leerse sobre `splash.locator("img")` (la capa ya no anima).
- Línea 199 (reduced-motion): `expect(splash).toHaveCSS("animation-name", "none")` debe verificarse también (o en su lugar) sobre la imagen, que es donde vive la animación de entrada ahora.
- **Test nuevo** "la capa no se transparenta durante la aparición": tras `goto`, durante la fase `apareciendo`, assert de `getComputedStyle(splash).opacity === "1"` y `backgroundColor` opaco (mismo patrón de muestreo con `delayLoad` que los tests existentes para mantener la fase observable). Este test es la regresión directa del bug.
- El trazo de clases (`MutationObserver` sobre `class`) no cambia: las fases siguen en la capa.

## Risks / Trade-offs

- [La capa ya no tiene animación de entrada: si alguien reintenta el fade en la capa, el bug vuelve] → el test nuevo de opacidad 1 durante `apareciendo` falla y lo atrapa.
- [Destello del fondo del tema (sin imagen) en los primeros 300 ms] → es el comportamiento deseado: fondo `--background` del splash = fondo del body, continuidad visual sin contenido detrás; la imagen entra con fundido.
- [Los hijos quedan en `opacity: 0` si la animación no corre (CSS viejo en caché)] → el CSS llega render-blocking junto con el resto del documento; además `animation-fill-mode: both` solo aplica mientras la regla existe, y en `cargando` los hijos recuperan su opacidad natural. Verificar en la suite e2e completa.
- [Sincronía JS ↔ CSS rota si se cambian `fadeMs` o los keyframes] → comentario ya existente en `globals.css` y en el componente lo advierte; el cambio no altera esas duraciones.
- [Pruebas existentes que asumen el fade en la capa] → D4 lista las dos aserciones a ajustar; correr la suite completa (`splash-screen`, `menu-responsive`, `not-found`) al final.

## Migration Plan

Cambio aditivo de solo CSS + pruebas, sin datos ni despliegue especial. Rollback: revertir el commit (las reglas vuelven al comportamiento anterior). No requiere pasos de migración.

## Open Questions

- Ninguna: el alcance (solo la ventana de entrada; el fade-out queda intacto) fue confirmado con el usuario, y la elección entre opacar la capa (D1) y ocultar el contenido (D2) se resolvió aquí con base en el requisito de accesibilidad existente.
