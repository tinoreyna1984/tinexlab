# Proposal

## Why

El catálogo del Portafolio está acoplado al código TypeScript, lo que dificulta actualizar proyectos sin editar lógica de la aplicación y aumenta el riesgo de inconsistencias con el tipo `Project`. Además, los filtros actuales funcionan correctamente pero tienen una presentación básica que no comunica suficientemente la identidad visual del sitio.

## What Changes

- Sustituir la fuente de datos en duro por un archivo CSV con cabecera y una fila por proyecto compatible con el contrato `Project`.
- Incorporar una carga y transformación validada del CSV para conservar datos localizados, tags, imágenes y enlaces opcionales.
- Mantener sin cambios la lógica observable de selección, combinación y limpieza de filtros.
- Rediseñar visualmente el selector de filtros, sus estados activo/inactivo, el contador y la acción de limpiar, incluyendo estados de foco accesibles y compatibilidad con temas.
- **No** cambiar la semántica de los parámetros de URL ni el resultado de los filtros.

## Capabilities

### New Capabilities

### Modified Capabilities
- `portafolio-proyectos`: el catálogo debe obtener sus proyectos desde un CSV compatible con `Project` y sus controles de filtrado deben conservar su comportamiento mientras adoptan una presentación visual más llamativa.

## Impact

- Afecta `lib/projects.ts`, la nueva ubicación del CSV de proyectos y la carga de datos de `app/[lang]/portafolio/page.tsx`.
- Afecta el componente `components/portfolio-grid.tsx` y estilos compartidos en `app/globals.css`.
- Requiere actualizar pruebas del catálogo, carga de datos y filtros; no requiere nuevas dependencias ni cambios en URLs públicas.
