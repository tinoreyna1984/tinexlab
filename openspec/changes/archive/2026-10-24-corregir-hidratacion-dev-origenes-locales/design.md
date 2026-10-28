# Design

## Context

Ver proposal.md - Why para la motivación. Estado actual y restricciones que determinan el enfoque:

- Next.js 16 bloquea por seguridad las solicitudes cross-origin a recursos y endpoints de desarrollo; solo permite `localhost`, sus subdominios y el hostname con el que se inició el servidor. Cualquier otro hostname requiere una entrada en `allowedDevOrigins` (documentación local en `node_modules/next/dist/docs/.../allowedDevOrigins.md`). Las entradas se comparan contra el hostname del header `Origin` —o del `Referer` en solicitudes no-cors como la carga de assets—, ignorando esquema, puerto, ruta y query.
- Diagnóstico verificado con viewport portátil (390x844): `localhost:3000` hidrata y el menú abre/cierra; `127.0.0.1:3000` y `192.168.18.10:3000` sirven HTML y chunks pero nunca hidratan (ningún control responde, no solo el menú); el build de producción local funciona. El log del dev server registra `Blocked cross-origin request to Next.js dev resource /_next/hmr` exactamente para `127.0.0.1` y `192.168.18.10`.
- Restricciones de la persona usuaria: cambio mínimo exclusivo en `next.config.ts`; `components/site-header.tsx` intacto; sin librerías nuevas ni archivos de proyecto nuevos. La validación reutiliza Playwright (ya instalado) y la suite `e2e/menu-responsive.spec.ts` existente.

## Goals / Non-Goals

**Goals:**

- Que el sitio en desarrollo se hidrate y sea fully interactivo desde `localhost`, `127.0.0.1` y la IP de red local del equipo.
- Validación reproducible del menú hamburguesa en los tres orígenes y en dimensiones portátiles, sin añadir archivos al repositorio.

**Non-Goals:**

- Modificar `components/site-header.tsx`, la suite E2E u otro código del sitio.
- Cambiar el comportamiento del build de producción, del sitio desplegado o emprender su despliegue.
- Detectar o sincronizar automáticamente la IP LAN dinámica del equipo.

## Decisions

1. **`allowedDevOrigins: ["127.0.0.1", "192.168.18.10"]` en `next.config.ts`.** Es el mecanismo documentado por Next.js 16 para este problema exacto y no afecta a `next build`/`next start`. Las entradas se escriben sin esquema ni puerto, como exige la documentación. Alternativas descartadas:
   - Patrones comodín (`*`/`**`): la documentación prohíbe la sustitución parcial y solo `**` al inicio; ampliarían la superficie autorizada sin necesidad concreta. Se documentan como opción futura si la IP DHCP cambia con frecuencia (`192.168.18.*` cubriría el último octeto, previa verificación empírica).
   - Iniciar el servidor con otro hostname/host (`-H`): no elimina el bloqueo basado en `Origin`/`Referer` de los recursos de desarrollo.
   - Túneles o desactivar HMR: fuera del alcance autorizado y más complejos que la opción documentada.
2. **Reinicio del dev server tras el cambio.** `allowedDevOrigins` se lee al iniciar; la validación debe reiniciar el servidor en curso (el proyecto mantiene un lock que impide un segundo `next dev` simultáneo).
3. **Validación sin archivos nuevos.** La verificación en los tres orígenes se hará con scripts efímeros de Playwright (heredocs de `node`, sin persistir en el repo) sobre viewports portátiles representativos (por ejemplo 320x568, 390x844, 768x1024), comprobando menú y otro control (tema) como evidencia de hidratación completa. La regresión de producción se cubre ejecutando la suite existente `npm run test:e2e` contra un build nuevo.
4. **Recarga de página tras reinicios.** Una pestaña abierta contra un dev server reiniciado pierde interactividad hasta recargarse; la validación y las instrucciones de uso deben recargar después de cada reinicio. Esto explica con probabilidad la observación de fallo en `localhost:3000`, donde el código actual sí funciona.

## Risks / Trade-offs

- [La IP LAN cambia por DHCP y la entrada deja de coincidir, reapareciendo el síntoma] → Documentar en el resultado que la lista debe actualizarse con la IP vigente; evaluar entonces el comodín `192.168.18.*`.
- [Los orígenes autorizados pueden consumir recursos de desarrollo del servidor expuesto en la red local] → Mantener la lista mínima (loopback + IP LAN actual), sin comodín `**`; revisar si el servidor se expone a otras redes.
- [Pestañas dev abiertas antes del reinicio parecen seguir rotas] → Recargar la página tras el reinicio antes de juzgar el comportamiento; la validación lo hace explícito.
- [Percepción persistente de que `site-header.tsx` falla] → La validación cubre los tres orígenes, varios viewports portátiles y la suite de producción 15/15, dejando evidencia del origen real del problema.

## Migration Plan

No aplica: cambio de configuración local de desarrollo, sin despliegue. Rollback: eliminar la entrada `allowedDevOrigins` de `next.config.ts`.
