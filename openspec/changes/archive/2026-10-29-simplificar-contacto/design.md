# Design

## Context

La página actual renderiza `ContactForm`, que usa una Server Action para validar datos y enviarlos mediante SendGrid. La página también contiene enlaces sociales y WhatsApp, que deben conservarse. La dirección pública definida para el contacto es `tinoreyna1984@gmail.com`.

## Goals / Non-Goals

**Goals:**

- Convertir el contacto principal en un enlace `mailto:` visible, accesible y localizado.
- Retirar todo el flujo de envío del servidor y sus credenciales.
- Mantener intactos los canales sociales y WhatsApp.

**Non-Goals:**

- No implementar otro proveedor de correo.
- No crear almacenamiento de mensajes ni confirmación automática.
- No cambiar las rutas públicas de la página de contacto.

## Decisions

- **Usar `mailto:` con la dirección visible.** Es el mecanismo nativo más simple para que la persona visitante redacte un mensaje en su cliente de correo. Se descarta ocultar o construir la dirección dinámicamente porque perjudica accesibilidad y no aporta una protección fiable contra spam.
- **Eliminar componentes y lógica, no dejarlos deshabilitados.** Al no existir envío desde el sitio, mantener el formulario o la Server Action conservaría complejidad y referencias a un proveedor que ya no se usa.
- **Mantener la dirección como contenido localizado de la página.** La dirección es la misma en los tres idiomas; las etiquetas y el texto introductorio sí deben continuar usando los diccionarios existentes.
- **Declarar la modificación en la capacidad existente `formulario-contacto`.** La página sigue siendo una capacidad de contacto, pero cambia su comportamiento observable de captura/envío a contacto directo.

## Risks / Trade-offs

- [El enlace depende de que la persona tenga un cliente de correo configurado] → Mostrar también la dirección como texto copiable.
- [Una dirección visible puede recibir spam] → Aceptar este intercambio a cambio de un contacto accesible y sin dependencias; conservar WhatsApp y redes como alternativas.
- [La eliminación del formulario cambia la experiencia actual] → Actualizar textos localizados y pruebas para que validen explícitamente la presencia del enlace `mailto:`.

## Migration Plan

1. Sustituir el bloque del formulario por el contacto directo y actualizar traducciones.
2. Eliminar la Server Action, el componente del formulario, variables de entorno y dependencias que queden sin uso.
3. Actualizar pruebas y ejecutar lint/build/e2e.
4. Desplegar; el rollback consiste en restaurar la versión anterior mientras se mantenga disponible la configuración histórica del proveedor.
