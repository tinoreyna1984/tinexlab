# Proposal

## Why

Después de eliminar el formulario, la página de Contacto conserva una composición de dos columnas pensada para un contenido más alto y deja un bloque amplio de espacio desaprovechado. El rediseño debe dar mayor presencia al contacto directo y organizar mejor el correo, las redes sociales y WhatsApp sin perder legibilidad en pantallas pequeñas.

## What Changes

- **BREAKING**: Cambiar la composición visual de la página de Contacto para eliminar el espacio vacío heredado del formulario.
- Presentar el correo electrónico como la acción principal dentro de una sección de contacto más equilibrada.
- Reorganizar los enlaces de redes sociales, WhatsApp y la información complementaria en una composición coherente.
- Asegurar que la composición se adapte de forma responsiva a móvil, tablet y escritorio, sin desbordamiento ni pérdida de accesibilidad.
- Mantener las rutas, el correo `tinoreyna1984@gmail.com`, los destinos sociales y WhatsApp, y las traducciones existentes.

## Capabilities

### New Capabilities

- Ninguna.

### Modified Capabilities

- `formulario-contacto`: actualizar la presentación responsiva del contacto directo y sus canales complementarios, conservando el comportamiento y los enlaces existentes.

## Impact

- Afecta el layout y los estilos de `app/[lang]/contacto/page.tsx`.
- Puede requerir ajustar textos o claves de presentación en los diccionarios localizados.
- Requiere actualizar las pruebas end-to-end para verificar la presencia, accesibilidad y comportamiento responsivo del contacto.
- No cambia las rutas públicas, el contenido del correo ni integra servicios externos.
