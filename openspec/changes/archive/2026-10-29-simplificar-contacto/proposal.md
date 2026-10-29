# Proposal

## Why

El formulario de contacto depende de un proveedor de correo transaccional que actualmente no está funcionando y añade validación, credenciales, mantenimiento y posibles problemas de spam a un sitio personal. Mostrar directamente la dirección `tinoreyna1984@gmail.com` ofrece un canal simple y transparente para contactar.

## What Changes

- **BREAKING**: Eliminar el formulario de contacto y su flujo de envío en servidor.
- Mostrar `tinoreyna1984@gmail.com` como enlace `mailto:` accesible.
- Mantener la página de contacto localizada en español, inglés y portugués, junto con sus enlaces sociales y WhatsApp.
- Eliminar la integración, configuración y dependencias relacionadas con SendGrid y la validación exclusiva del formulario.
- Actualizar los requisitos de la capacidad de contacto para describir contacto directo por correo electrónico.

## Capabilities

### New Capabilities

- Ninguna.

### Modified Capabilities

- `formulario-contacto`: sustituir el formulario y la entrega mediante proveedor por un enlace de correo electrónico directo, conservando la localización y los canales sociales.

## Impact

- Afecta la página de contacto, los diccionarios de traducción y los componentes y acciones del formulario.
- Elimina la Server Action de envío, las variables de entorno de SendGrid y las dependencias de correo/validación que ya no sean utilizadas.
- No requiere API externa, credenciales, almacenamiento ni cambios en rutas públicas.
