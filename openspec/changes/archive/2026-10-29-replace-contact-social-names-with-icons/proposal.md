# Proposal

## Why

Los enlaces sociales de la página de Contacto muestran actualmente nombres de texto, lo que ocupa más espacio y hace que la lista se perciba menos visual y reconocible. Sustituir esos nombres por sus íconos correspondientes mejora el escaneo visual sin cambiar los destinos ni la disponibilidad de los enlaces.

## What Changes

- Reemplazar las etiquetas textuales de LinkedIn, Instagram, X, Facebook y GitHub por íconos reconocibles.
- Mantener los mismos destinos, apertura en una pestaña nueva y relación semántica accesible mediante nombres para lectores de pantalla.
- Conservar la presentación localizada de la sección y el enlace independiente de WhatsApp.
- Añadir o ajustar verificaciones visuales/accesibles para confirmar que todos los enlaces sociales siguen disponibles.

## Capabilities

### New Capabilities

<!-- No se introduce una capacidad nueva; se modifica el comportamiento visual de una capacidad existente. -->

### Modified Capabilities

- `formulario-contacto`: los enlaces sociales de Contacto deben representarse visualmente con sus íconos correspondientes, manteniendo accesibilidad y destinos.

## Impact

- Afecta la vista `app/[lang]/contacto/page.tsx` y posiblemente sus dependencias de íconos o estilos.
- No cambia rutas, URLs externas, envío del formulario, traducciones ni contratos del servidor.
- Si se incorpora una biblioteca de íconos, será una dependencia de presentación; debe preferirse una solución compatible con las dependencias y convenciones actuales del proyecto.
