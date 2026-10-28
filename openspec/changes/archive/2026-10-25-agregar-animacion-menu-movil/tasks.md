# Tasks

## 1. Animación de apertura y cierre del panel móvil

- [x] 1.1 Agregar en `app/globals.css` las clases de estado del panel móvil con transición de opacidad y desplazamiento vertical (entrada ~250 ms `ease-out`, salida ~200 ms `ease-in`) y `visibility` retrasado al final del cierre; verificar con `npm run lint` y `npm run build` sin errores y con las reglas presentes en el CSS compilado.
- [x] 1.2 Modificar `components/site-header.tsx` para sustituir `data-[open=false]:hidden` por las clases de estado cerrado de 1.1, conservando `data-open`, `aria-expanded`, `aria-hidden`, el cierre con Escape y la sincronización del breakpoint; verificar con `npx playwright test e2e/menu-responsive.spec.ts` en verde.
- [x] 1.3 Bloquear la interacción durante el cierre (`pointer-events: none` e `inert` cuando `data-open="false"`) en el mismo componente; verificar con el nuevo test E2E de 1.4 que los enlaces no son clicables ni enfocables durante la transición de salida.
- [x] 1.4 Crear `e2e/menu-animation.spec.ts` que verifique: (a) el panel termina completamente visible tras abrir y completamente oculto tras cerrar, (b) `data-open`/`aria-expanded` cambian inmediatamente al pulsar sin esperar la transición, y (c) sin overflow horizontal durante la animación en viewports móviles (320×568, 375×667); verificar con `npx playwright test e2e/menu-animation.spec.ts` en verde.

## 2. Movimiento reducido

- [x] 2.1 Anular la transición del panel bajo `@media (prefers-reduced-motion: reduce)` en `app/globals.css`, siguiendo el patrón existente de `.title-neon` y `.theme-toast`; verificar con `npm run lint` sin errores.
- [x] 2.2 Agregar a `e2e/menu-animation.spec.ts` un caso con `page.emulateMedia({ reducedMotion: "reduce" })` que abra y cierre el menú y compruebe que los estados finales (visible/oculto, `data-open`) son idénticos a los de la animación normal; verificar con `npx playwright test e2e/menu-animation.spec.ts` en verde.

## 3. Verificación de integración

- [x] 3.1 Ejecutar la suite E2E completa con `npx playwright test` y confirmar 0 fallos, incluidas las pruebas históricas de `menu-responsive.spec.ts` y `theme-toast.spec.ts`.
- [x] 3.2 Ejecutar `npm run lint` y `npm run build` y confirmar que terminan con código de salida 0.
- [x] 3.3 Verificar en `npm run dev` con emulación de dispositivo: la animación de entrada/salida se ve suave en 320–1023 px, la navegación de escritorio (≥ 1024 px) permanece estática sin animación, y abrir/cerrar en ráfaga no deja el panel atrapado a mitad de transición.

## Workflow follow-up

- Archivar el cambio con `openspec archive` cuando la revisión del proyecto lo apruebe.
- Verificar que el requisito agregado se consolidó en `openspec/specs/tema-apariencia/spec.md`.
