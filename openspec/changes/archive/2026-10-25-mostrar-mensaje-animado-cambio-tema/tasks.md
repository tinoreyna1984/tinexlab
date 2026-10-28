# Tasks

## 1. Cadenas localizadas del mensaje

- [x] 1.1 Agregar la sección `themeToast` a `lib/dictionaries/es.json` con el mensaje por preferencia (`system`, `light`, `dark`) y la etiqueta de cierre, y verificar que el archivo parsea con `node -e "JSON.parse(require('fs').readFileSync('lib/dictionaries/es.json','utf8'))"` sin error
- [x] 1.2 Agregar las claves equivalentes a `lib/dictionaries/en.json` y `lib/dictionaries/pt.json`, y verificar la paridad de claves entre los tres diccionarios (mismas claves, valores no vacíos) con un one-liner de Node que los recorra
- [x] 1.3 Verificar que `npx tsc --noEmit` y `npm run lint` terminan sin errores tras tocar los diccionarios

## 2. Componente, montaje, estilos y pruebas del mensaje

- [x] 2.1 Consultar la guía aplicable de Next.js en `node_modules/next/dist/docs/` (componentes de cliente montados desde un layout de servidor) y crear `components/theme-toast.tsx` con la máquina de estados (`apareciendo` 300 ms → `visible` 4000 ms → `desapareciendo` 300 ms), temporizadores centralizados con cleanup, suscripción a `tinexlab-theme-change` y `storage`, contenedor `role="status"` `aria-live="polite"` siempre montado y `<button>` de cierre que solo responde en estado `visible`; verificar con `npx tsc --noEmit` y `npm run lint` sin errores
- [x] 2.2 Montar `<ThemeToast>` en `app/[lang]/layout.tsx` pasando las cadenas `themeToast` del diccionario activo como props, y verificar con `npm run dev` que el clic en el selector de tema muestra el mensaje en `/`, `/en/` y `/pt/` en todas las secciones, por encima del header y sin desplazar el footer
- [x] 2.3 Agregar en `app/globals.css` los keyframes y estilos del mensaje (posición `fixed` inferior, `z-50`, tokens de tema existentes) con la nota que correlaciona sus duraciones con las constantes de `theme-toast.tsx`, más la regla `prefers-reduced-motion: reduce` que deshabilita la transición; verificar en el navegador con `npm run dev` que el mensaje hace fade-in/fade-out en tema claro y oscuro y que con la preferencia de movimiento reducido aparece y desaparece sin animación
- [x] 2.4 Agregar a `e2e/theme-toast.spec.ts` la verificación de aparición: el clic en el selector de tema muestra `data-testid="theme-toast"` con el texto localizado del diccionario en es, en y pt, y que cambios repetidos dejan un solo mensaje visible; verificar con `npm run build && npx playwright test e2e/theme-toast.spec.ts`
- [x] 2.5 Agregar a `e2e/theme-toast.spec.ts` la verificación de cierres: pulsar el mensaje después del fade-in lo cierra antes del auto-cierre, pulsarlo durante el fade-in no lo cierra, se cierra solo tras ~4 s, y con `page.emulateMedia({ reducedMotion: 'reduce' })` aparece y se cierra igual; verificar con `npm run build && npx playwright test e2e/theme-toast.spec.ts`

## 3. Integración y verificación final

- [x] 3.1 Correr la suite completa con `npm run build && npx playwright test` y verificar que todos los archivos pasan, incluido `e2e/menu-responsive.spec.ts` sin regresiones
- [x] 3.2 Correr `npm run lint` y `npx tsc --noEmit` y verificar que terminan sin errores
- [x] 3.3 Validar manualmente en ambos temas, los tres idiomas y viewports de 320 px y escritorio: contraste legible del mensaje, cierre con teclado (Tab hasta el mensaje y Enter), que no obstruye controles de forma permanente y que el `aria-label`/`title` del botón de tema siguen intactos
