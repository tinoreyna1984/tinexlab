# Tasks

## 1. Menú responsive

- [x] 1.1 Sincronizar el estado de `SiteHeader` con `matchMedia` usando el mismo breakpoint `lg` de Tailwind, cerrando el panel al entrar en escritorio y verificando que `npm run lint` no reporte errores.
- [x] 1.2 Añadir cierre por Escape, devolución de foco al botón cuando corresponda y estados `aria-expanded`/`aria-controls` coherentes, verificando navegación completa del menú mediante teclado.
- [x] 1.3 Probar el menú en una matriz móvil-escritorio: abrir en móvil, ampliar, reducir, abrir de nuevo, activar enlaces y repetir el ciclo; verificar que nunca reaparezca abierto de forma inesperada.

## 2. Shell localizado y URL data

- [x] 2.1 Extraer el contenido dependiente de `params` del layout `[lang]` a un componente suspendible con fallback estable, verificando que header, footer y diccionario sigan resolviendo el locale correcto.
- [x] 2.2 Aplicar el mismo patrón de `Suspense` a Inicio, CV, Intereses, Portafolio y Contacto, verificando que cada ruta muestre fallback y después contenido localizado sin cambiar sus URLs.
- [x] 2.3 Revisar metadata localizada y el uso de `useSearchParams` del Portafolio, manteniendo el filtro detrás de `Suspense` y aplicando únicamente una configuración de segmento específica si Next.js reporta una advertencia de metadata; verificar que no haya errores de URL data en consola.

## 3. Validación de Next.js

- [x] 3.1 Ejecutar `npm run dev` y recorrer las 15 URLs en español, inglés y portugués, incluyendo refresh, navegación interna y `/portafolio?tags=react`; verificar consola limpia y contenido correcto.
- [x] 3.2 Ejecutar `npm run lint`, `npx next typegen` y `npm run build`, verificando que no existan errores de tipos, prerenderizado, hidratación ni validación de Instant Navigation.
- [x] 3.3 Ejecutar `npm run start` sobre el build final y repetir navegación, cambio de viewport y filtros, verificando que el comportamiento de producción coincida con desarrollo.

## Workflow follow-up

- Revisar el diff de la corrección antes de desplegar.
- Publicar una preview y confirmar que los errores de consola permanecen resueltos en el entorno de Vercel.
- Archivar el change después de completar todas las tareas.
