# Proposal

## Why

La cabecera muestra una "T" genérica dentro de un bloque de acento en lugar del logo real de Tinexlab, y la pestaña del navegador usa el favicon por defecto de Create Next App (`app/favicon.ico`). Ambos puntos contradicen la identidad de marca que el sitio ya comunica en el contenido y en la paleta de colores.

## What Changes

- Reemplazo responsivo del bloque `<span>` con la letra "T" en la cabecera por la imagen `tinexlab-logo.png`, conservando los efectos existentes (esquinas redondeadas y rotación al pasar el cursor), el enlace a inicio y el nombre de la marca en texto.
- El ícono de la ventana (pestaña) pasa a ser `/tinexlab-logo.png`, declarado con la API de metadatos existente en el layout raíz.
- **Remoción**: se elimina `app/favicon.ico` (favicon genérico de Next) para que el logo sea el único ícono declarado. Decisión confirmada por el propietario del proyecto.
- No se altera funcionalidad: rutas, navegación, menú, textos, atributos ARIA y pruebas e2e permanecen intactos.
- No se agregan archivos nuevos ni dependencias; solo se editan archivos existentes y se elimina el favicon genérico.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `tema-apariencia`: agrega requisitos de identidad de marca — el ícono de la cabecera muestra el logo de forma responsiva, y la ventana del navegador usa el logo como ícono.

## Impact

- **Archivos modificados**:
  - `components/site-header.tsx`: el bloque de ícono del enlace de marca.
  - `app/layout.tsx`: `metadata.icons.icon` en los metadatos existentes.
- **Archivo eliminado**: `app/favicon.ico` (genérico de Create Next App; sin referencias en el código).
- **Sin cambios**: `public/tinexlab-logo.png` (ya existe, se reutiliza tal cual), textos, enlaces, menú, tema y formularios.
- **Pruebas**: las e2e del menú (`e2e/menu-responsive.spec.ts`) no referencian el logo y deben seguir pasando sin modificaciones.
- **Dependencias**: ninguna nueva (`next/image` ya forma parte de Next.js).
