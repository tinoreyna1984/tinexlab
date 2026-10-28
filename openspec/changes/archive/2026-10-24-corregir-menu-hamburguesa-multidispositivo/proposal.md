# Proposal

## Why

El botón de menú hamburguesa continúa presentando un comportamiento inconsistente en distintos tamaños y orientaciones de dispositivos portátiles, aun después de añadir sincronización con el breakpoint y cierre con Escape. La corrección necesita revisar la visibilidad real del panel, el estado del botón y la compatibilidad del cambio de viewport, además de validarse con una matriz reproducible de dispositivos.

## What Changes

- Revisar y corregir la implementación del menú hamburguesa en `SiteHeader`.
- Separar de forma explícita los estados de menú abierto, cerrado y navegación de escritorio.
- Hacer robustos los cambios de viewport y orientación, incluyendo los límites del breakpoint responsive.
- Garantizar que el botón, el panel y sus atributos ARIA representen siempre el mismo estado.
- Añadir pruebas automatizadas de interacción para perfiles portátiles, tablets y anchos límite.
- Mantener intactas las rutas, traducciones, enlaces de navegación y comportamiento de escritorio.

## Capabilities

### New Capabilities

No se introducen capacidades nuevas.

### Modified Capabilities

- `tema-apariencia`: el menú responsive debe funcionar correctamente en una matriz amplia de tamaños, orientaciones y cambios repetidos de viewport.

## Impact

- Afecta `components/site-header.tsx`, sus estilos responsive y la configuración de pruebas.
- Puede añadir una herramienta de pruebas end-to-end como dependencia de desarrollo y un script reproducible de validación.
- No cambia APIs públicas, rutas, contenido, traducciones, SendGrid ni dependencias de producción.
