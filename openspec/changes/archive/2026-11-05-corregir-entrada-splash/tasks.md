# Tasks

## 1. Corrección CSS de la entrada del splash

- [x] 1.1 En `app/globals.css`, quitar `animation: splash-fade-in 0.3s ease-out both` de `.splash--apareciendo` para que la capa permanezca con fondo opaco durante toda la aparición, y verificar que la regla `.splash--apareciendo` ya no anima la opacidad de la capa
- [x] 1.2 En `app/globals.css`, agregar fade-in de 0.3 s con el keyframe `splash-fade-in` a `.splash__image` y `.splash__progress` dentro de `.splash--apareciendo` (duración sincronizada con `fadeMs = 300` de `components/splash-screen.tsx`), y verificar que al pasar a `--cargando` los hijos quedan en `opacity: 1` sin estado residual
- [x] 1.3 En `app/globals.css`, ampliar el bloque `@media (prefers-reduced-motion: reduce)` para que aplique `animation: none !important` a `.splash__image` y `.splash__progress`, y verificar que con `reducedMotion: "reduce"` la imagen no tiene animación de opacidad

## 2. Pruebas e2e

- [x] 2.1 En `e2e/splash-screen.spec.ts`, ajustar la aserción `entryAnimation` (línea ~62) para leer `getComputedStyle` de la imagen del splash en lugar de la capa, y verificar que el test "primera visita" pasa con `splash-fade-in` en la imagen
- [x] 2.2 En `e2e/splash-screen.spec.ts`, ajustar la aserción de reduced-motion (línea ~199) para verificar `animation-name: none` sobre la imagen del splash, y verificar que el test "con movimiento reducido" pasa
- [x] 2.3 Agregar en `e2e/splash-screen.spec.ts` el test "la capa no se transparenta durante la aparición": con `delayLoad` para sostener la fase `apareciendo`, assert de `getComputedStyle(splash).opacity === "1"` y `backgroundColor` opaco (rgb sin alfa 0) durante la entrada, y verificar que el test falla si se reintegra el fade-in a la capa (revertir temporalmente 1.1 para comprobarlo)

## 3. Verificación integral

- [x] 3.1 Correr `npx playwright test e2e/splash-screen.spec.ts` y verificar que todos los tests del spec pasan (incluidos los existentes: recarga sin splash, cierre 8 s, responsivo, teclado, contraste de temas)
- [x] 3.2 Correr la suite e2e completa (`npx playwright test`) y verificar que `menu-responsive` y `not-found` siguen pasando con el helper `waitForSplashToHide` (65 passed; el único fallo `theme-toast "pulsar durante el fade-in"` es preexistente — se reprodujo con los cambios revertidos)
- [x] 3.3 Verificar en `next build` + `npm run start` (producción) una primera visita manual: el contenido del sitio no se ve en ningún momento durante los 300 ms de aparición, y el fade-out final revela el contenido con normalidad (muestreo en vivo: 23 frames en `apareciendo` con capa `opacity: 1` y fondo opaco, imagen 0→1, splash desmontado y `h1` visible al final)

## Workflow follow-up

- Archivar el cambio con `openspec archive` después de que la revisión del proyecto lo apruebe.
- Verificar el resultado archivado.
