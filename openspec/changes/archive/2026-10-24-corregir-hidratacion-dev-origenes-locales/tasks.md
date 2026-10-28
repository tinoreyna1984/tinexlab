# Tasks

## 1. Configuración de orígenes de desarrollo

- [ ] 1.1 Añadir `allowedDevOrigins: ["127.0.0.1", "192.168.18.10"]` en `next.config.ts`, conservando intactas las opciones existentes (`cacheComponents`, `partialPrefetching`, `turbopack`, `experimental.agentFeedback`) y sin tocar ningún otro archivo; verificar con `npm run lint` y `npx tsc --noEmit` sin errores.

## 2. Validación en desarrollo

- [ ] 2.1 Reiniciar el servidor de desarrollo en curso para que lea la nueva configuración (el lock del proyecto impide un segundo `next dev`), solicitar la página desde `127.0.0.1:3000` y `192.168.18.10:3000`, y verificar que el log ya no registra `Blocked cross-origin request to Next.js dev resource` para esos orígenes.
- [ ] 2.2 Verificar con scripts efímeros de Playwright (sin crear archivos en el repo) que la página se hidrata desde `localhost:3000`, `127.0.0.1:3000` y `192.168.18.10:3000` en viewports portátiles representativos (320x568, 390x844, 768x1024): el menú hamburguesa abre y cierra con una sola activación cada vez (`aria-expanded` y `data-open` coherentes) y el botón de tema cambia `data-theme`, como evidencia de hidratación completa tras recargar la página.

## 3. Regresión en producción

- [ ] 3.1 Ejecutar `npm run build` y `npm run test:e2e` contra el build de producción recién generado, verificando que la matriz responsive existente del menú pasa 15/15 sin cambios de código ni errores nuevos.

## Workflow follow-up

- Archivar el change con `/opsx-archive` cuando las validaciones anteriores estén satisfechas.
- El despliegue del código actual a `https://tinexlab.vercel.app` queda fuera de este change (requiere commit/remoto y un esfuerzo separado); el sitio live seguirá mostrando el menú antiguo hasta que se despliegue.
