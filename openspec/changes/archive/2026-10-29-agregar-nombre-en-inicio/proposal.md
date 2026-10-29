# Proposal

## Why

La página principal comunica actualmente el perfil profesional y la propuesta de valor, pero no muestra de forma explícita el nombre de la persona. Esto debilita la identificación inmediata del propietario del portafolio, especialmente cuando la primera impresión ocurre antes de revisar el CV.

## What Changes

- Mostrar `Tino Reyna` en la sección hero de la página principal.
- Colocar el nombre entre el eyebrow profesional y el titular principal, para conservar la jerarquía profesión → identidad → propuesta de valor.
- Mantener el nombre localizado mediante los diccionarios existentes, aunque su valor sea el mismo en los tres idiomas.
- Conservar sin cambios las llamadas a la acción, la tarjeta biográfica, el diseño responsive y el resto del contenido.

## Capabilities

### New Capabilities

### Modified Capabilities
- `perfil-profesional`: la Página de Inicio debe mostrar explícitamente el nombre de la persona en una posición prominente y localizada.

## Impact

- Afecta `app/[lang]/page.tsx` y las claves de inicio en `lib/dictionaries/es.json`, `en.json` y `pt.json`.
- Requiere ajustar pruebas de la página principal para validar presencia, orden visual y localización del nombre.
- No introduce nuevas dependencias, rutas ni cambios de navegación.
