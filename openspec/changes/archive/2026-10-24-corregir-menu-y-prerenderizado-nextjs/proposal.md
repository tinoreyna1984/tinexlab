# Proposal

## Why

El menú responsive conserva estado local al cambiar entre móvil y escritorio, lo que puede dejarlo en un estado incoherente al volver a reducir la ventana. Además, Next.js 16 con Cache Components reporta lecturas de `params` fuera de un límite `Suspense` durante el prerenderizado de las rutas localizadas, generando errores de desarrollo y degradando la experiencia de navegación.

## What Changes

- Sincronizar el estado del menú con los cambios del breakpoint responsive y asegurar que el botón siga funcionando al alternar dimensiones.
- Cerrar el menú móvil al cambiar a escritorio, al seleccionar una ruta o al cancelar la interacción con teclado.
- Mover las lecturas de `params` del layout y páginas localizadas detrás de límites `Suspense` con estados de carga útiles.
- Auditar las lecturas de `searchParams` y la metadata localizada para que no introduzcan nuevas advertencias de URL data o prerenderizado.
- Añadir validaciones de desarrollo y producción para resize, navegación localizada, carga inicial y consola limpia.

## Capabilities

### New Capabilities

No se introducen capacidades nuevas.

### Modified Capabilities

- `sitio-multidioma`: las rutas localizadas deben resolver sus datos de URL dentro del flujo compatible con Instant Navigation, sin advertencias de `instant-shell-url-data`.
- `tema-apariencia`: la navegación responsive debe conservar un estado coherente al cambiar entre breakpoints y ofrecer cierre seguro del menú.

## Impact

- Afecta `components/site-header.tsx`, los layouts y páginas bajo `app/[lang]/`, y los componentes que usan `useSearchParams`.
- Puede añadir componentes de fallback/loading y ajustes de configuración de segmento específicos de Next.js 16.
- No cambia las URLs públicas, locales soportados ni el contenido del sitio.
- No requiere nuevas dependencias ni cambios en SendGrid, datos, assets o APIs públicas.
