# Proposal

## Why

El botón de menú hamburguesa se percibe como "no abre ni cierra" en dispositivos móviles cuando el sitio en desarrollo se accede desde `127.0.0.1` o desde la IP de red local (por ejemplo `http://192.168.18.10:3000` en un teléfono real). El diagnóstico confirmó que el código de `components/site-header.tsx` es correcto —pasó la matriz E2E 15/15 contra el build de producción y abre/cierra correctamente vía `http://localhost:3000`—: la falla real es que Next.js 16 bloquea los recursos de desarrollo (`/_next/hmr`) para orígenes no permitidos, lo que impide por completo la hidratación de React y deja inoperantes todos los controles de la página, no solo el menú.

## What Changes

- Añadir `allowedDevOrigins` en `next.config.ts` con los hostnames de acceso local: el loopback `127.0.0.1` y la IP de red local `192.168.18.10`, de modo que el servidor de desarrollo hidrate las páginas solicitadas desde esos orígenes.
- Mantener intacto `components/site-header.tsx`; no se modifican otros archivos de código, no se instalan librerías y no se crean archivos de proyecto nuevos (la única excepción autorizada por la persona usuaria es el cambio mínimo de configuración en `next.config.ts`).
- Validar que la página en desarrollo se hidrate desde `localhost`, `127.0.0.1` y la IP LAN, y que el menú hamburguesa abra y cierre en dimensiones de dispositivos portátiles, sin avisos de recursos de desarrollo bloqueados en el log del servidor.
- Confirmar que no hay regresiones en el build de producción con la suite E2E existente (`npm run test:e2e`, 15 pruebas).
- Fuera de alcance: el despliegue del fix a `https://tinexlab.vercel.app`. El sitio live aún ejecuta código antiguo porque el trabajo está sin commitear y el repositorio no tiene remoto; eso requerirá un esfuerzo separado de commit/despliegue.

## Capabilities

### New Capabilities

- `entorno-desarrollo`: comportamiento del servidor de desarrollo respecto a la hidratación y la interactividad del sitio (incluido el menú de navegación) desde los orígenes de acceso local y de red local.

### Modified Capabilities

Ninguna. Los requisitos de `tema-apariencia` sobre el menú responsive no cambian; el menú ya cumple su contrato cuando la página se hidrata.

## Impact

- `next.config.ts`: único archivo de código modificado (adición de `allowedDevOrigins`).
- Solo desarrollo: el build de producción y el sitio desplegado no cambian de comportamiento; `allowedDevOrigins` no tiene efecto en `next start`/`next build`.
- Seguridad: los orígenes listados quedan autorizados a consumir recursos de desarrollo; es aceptable para una red local doméstica y debe revisarse si el servidor de desarrollo se expone a otras redes.
- La validación reutiliza la infraestructura existente (Playwright instalado, suite `e2e/menu-responsive.spec.ts`, scripts actuales); no añade dependencias.
