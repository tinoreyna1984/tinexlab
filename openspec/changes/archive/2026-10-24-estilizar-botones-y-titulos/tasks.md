# Tasks

## 1. Tokens de tema y tipografía de títulos

- [x] 1.1 En `app/globals.css`, definir los tokens de tema y su respaldo previo a la hidratación:
  - Tokens claros en `:root` y oscuros en `[data-theme="dark"]`.
  - Respaldo con `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) }`.
  - Tokens: `background`, `foreground`, `muted`, `border`, `surface`, `surface-muted`, `accent`, `accent-strong`, `accent-contrast`, `--btn-bg`, `--btn-fg`, `--btn-shadow-hover`, `--heading-shadow` y `--heading-glow`.
  - Exponer los colores en `@theme inline`.
  - Verificación: `npm run build` compila y, en el navegador, `text-accent` y `bg-surface-muted` generan color visible en ambos temas.
    > Nota de verificación: `npm run build` se ejecuta en la tarea 4.1.
- [x] 1.2 Cargar Quicksand con `next/font/google` en `app/layout.tsx` (variable `--font-quicksand`) y mapearla a `--font-heading` en `@theme inline`. Verificación: en DevTools, el `<html>` incluye la clase de la variable y no hay peticiones a `fonts.googleapis.com`.
- [x] 1.3 Agregar en `@layer base` el estilo de `h1, h2, h3`: `font-family: var(--font-heading)` y `text-shadow: var(--heading-shadow)`. Verificación: en `/es/cv` y `/es/intereses`, los títulos se ven en Quicksand con una sombra suave en tema claro.

## 2. Botones de acción

- [x] 2.1 Crear en `@layer components` de `app/globals.css` las clases de botón:
  - `.btn`, `.btn-primary`, `.btn-secondary` y `.btn-compact`.
  - Estados `:hover`/`:focus-visible` con `var(--btn-shadow-hover)`, `[aria-pressed="true"]` con relleno principal y `:disabled` con opacidad reducida y sin sombra.
  - Verificación: la compilación pasa sin advertencias de CSS.
- [x] 2.2 Reemplazar las clases visuales de los dos CTA en `app/[lang]/page.tsx`: `btn btn-primary` para "CV" y `btn btn-secondary` para "Portafolio". Verificación: en `/es`, los CTA se ven negro/blanco en tema claro, invertidos en oscuro, y muestran sombra o resplandor al pasar el cursor. `href` y texto no cambian.
- [x] 2.3 Aplicar `btn btn-primary` al botón de enviar en `components/contact-form.tsx` sin tocar `type`, `disabled` ni la acción. Verificación: en `/es/contacto`, un envío con datos inválidos sigue mostrando los mismos errores y el botón deshabilitado se ve atenuado y sin sombra.
- [x] 2.4 Aplicar `btn btn-compact` a los filtros de `components/portfolio-grid.tsx` y dejar que `aria-pressed` controle el estado seleccionado, en lugar de las clases condicionales. El enlace "limpiar" queda igual. Verificación: en `/es/portafolio`, al activar y desactivar filtros cambian el relleno y la lista filtrada igual que antes.
- [x] 2.5 Aplicar `btn btn-secondary btn-compact` al botón de tema (`components/theme-toggle.tsx`) y al botón de menú (`components/site-header.tsx`) sin modificar `data-testid`, `aria-*`, los manejadores ni las clases del panel. Verificación: el selector de tema sigue alternando sistema → claro → oscuro, y `npx playwright test e2e/menu-responsive.spec.ts` pasa.

## 3. Efecto neón de títulos

- [x] 3.1 Agregar en `app/globals.css` el `@keyframes neon-pulse` y la clase `.title-neon`:
  - En tema oscuro: color blanco, resplandor `var(--heading-glow)` y animación de 0.8s alternada.
  - En tema claro: sin animación.
  - Con `prefers-reduced-motion: reduce`: resplandor estático.
  - Verificación: la compilación pasa.
- [x] 3.2 Aplicar `.title-neon` al `h1` de `components/section-heading.tsx`, al `h1` de `app/[lang]/page.tsx` y al nombre de la marca en `components/site-header.tsx`. Verificación:
  - En tema oscuro, los títulos principales y la marca pulsan con resplandor verde menta.
  - Al cambiar a claro, vuelve la sombra suave.
  - Con "reducir movimiento" emulado en DevTools, el resplandor queda fijo.

## 4. Verificación integral

- [x] 4.1 Ejecutar `npm run lint` y `npm run build` y confirmar que ambos terminan sin errores.
- [x] 4.2 Ejecutar `npx playwright test` y confirmar que todas las pruebas e2e existentes pasan sin modificarlas.
- [x] 4.3 Revisar `/es`, `/es/cv`, `/es/portafolio`, `/es/intereses` y `/es/contacto` en 375 px y 1280 px, en tema claro y oscuro. Confirmar que:
  - Botones y títulos coinciden con el estilo de `https://tinexlab.vercel.app/`.
  - No hay desplazamiento horizontal.
  - El foco con teclado es visible en todos los botones.
