# Design

## Context

El proyecto usa Next.js 16.4.2 con `cacheComponents`, `partialPrefetching` y App Router. El layout localizado y cada página reciben `params` como promesa y los esperan directamente en el componente de ruta. El Portafolio ya contiene un `useSearchParams` dentro de un `Suspense` en su página, pero el acceso a `params` ocurre antes de cualquier límite equivalente. El menú es un Client Component que solo cambia su estado al pulsar el botón y no observa el breakpoint `lg`.

## Goals / Non-Goals

**Goals:**

- Mantener un shell estático útil y trasladar la resolución de URL data a contenido que pueda suspenderse.
- Eliminar las advertencias de `instant-shell-url-data` en las cinco páginas localizadas y su layout.
- Conservar metadata localizada, rutas, filtros y comportamiento de prefetching existentes.
- Hacer que el menú se cierre y se pueda volver a abrir correctamente al cruzar el breakpoint responsive.
- Verificar navegación, resize, teclado, consola y build en desarrollo y producción.

**Non-Goals:**

- No cambiar las URLs, locales, textos, filtros ni el proveedor de correo.
- No desactivar globalmente `cacheComponents` o `partialPrefetching`.
- No añadir una librería de menú, gestor de estado o framework de pruebas nuevo.
- No ocultar errores mediante cambios generales de logging.

## Decisions

### Estado del menú basado en el breakpoint

El `SiteHeader` conservará su estado local, pero se suscribirá a `matchMedia("(min-width: 1024px)")`. Cuando la consulta pase a escritorio, el estado se cerrará explícitamente; así, al regresar a móvil el botón siempre parte cerrado y operativo. Se añadirá cierre con Escape y se mantendrá el cierre existente al activar enlaces. El foco y `aria-expanded` se actualizarán junto con el mismo estado.

Alternativa descartada: depender únicamente de las clases CSS `lg:hidden`/`lg:flex`. Las clases ocultan o muestran elementos, pero no corrigen el estado React que persiste durante un cambio de viewport.

### Resolución de `params` detrás de Suspense

Cada layout/página localizada se dividirá en un componente exterior síncrono y un componente de contenido que recibe la promesa `params`. El exterior renderizará un `Suspense` con un fallback estructural y el componente interno esperará `params`. El layout aplicará el mismo patrón antes de cargar diccionario, navegación y footer; las páginas lo aplicarán antes de cargar su contenido específico.

Este patrón sigue la recomendación de Next.js 16: el shell compartido no lee URL data y el contenido dependiente de la ruta se transmite cuando la promesa se resuelve. Los fallbacks mantendrán encabezado/secciones con altura estable para evitar saltos visuales.

Alternativa descartada: añadir `export const instant = false` globalmente. Aunque silencia la validación, permite que toda la aplicación bloquee navegaciones y oculta problemas que sí pueden resolverse con streaming. Si una lectura de metadata requiere una excepción específica después de la prueba, se limitará al segmento afectado y se documentará como trade-off.

### Auditoría de metadata y query string

Se conservarán las funciones `generateMetadata` localizadas y se comprobará que sus lecturas de `params` no sean confundidas con el shell visual. Se verificará cada página en `next dev` y `next start`, incluyendo rutas con locale y Portafolio con `?tags=...`. `useSearchParams` seguirá dentro del `Suspense` existente; no se moverá al layout compartido.

### Verificación del comportamiento responsive

La validación será manual y reproducible con viewport móvil y escritorio: abrir menú, cruzar ambos breakpoints varias veces, usar Escape, activar un enlace y comprobar que el panel no reaparece abierto inesperadamente. La consola se observará durante carga inicial, navegación interna, refresh y cambio de query string.

## Risks / Trade-offs

- [Los fallbacks pueden aparecer durante una navegación] -> Mantener una estructura visual mínima y usar enlaces con prefetch normal para que la mayoría de navegaciones lleguen con contenido resuelto.
- [El breakpoint CSS y `matchMedia` podrían divergir] -> Usar el mismo valor de 1024 px que corresponde al breakpoint `lg` actual y cubrir el cruce en ambas direcciones.
- [Metadata localizada sigue dependiendo de params] -> Verificar el mensaje específico de Next.js; solo añadir una excepción `instant = false` al segmento mínimo si el framework la exige.
- [El filtro del Portafolio cambia la URL] -> Conservar su boundary `Suspense` y probar tanto carga directa como actualización mediante `router.replace`.

## Migration Plan

1. Extraer wrappers síncronos y contenidos async del layout y las cinco páginas localizadas.
2. Añadir fallbacks de Suspense y actualizar el menú para reaccionar al breakpoint y Escape.
3. Ejecutar lint, build y pruebas manuales con `next dev` y `next start`.
4. Si una advertencia de metadata persiste, aplicar la configuración de segmento más pequeña que recomiende Next.js y repetir la validación.

El rollback consiste en revertir los cambios de wrappers y del `SiteHeader`; no hay migraciones de datos ni cambios de API.

## Open Questions

No hay decisiones pendientes que cambien el alcance o la arquitectura.
