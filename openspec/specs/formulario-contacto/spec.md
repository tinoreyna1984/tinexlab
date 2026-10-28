# formulario-contacto Specification

## Purpose

Ofrece un canal de contacto confiable y localizado para que visitantes envíen mensajes profesionales sin exponer credenciales ni detalles internos del servicio de correo.

## Requirements

### Requirement: Formulario de contacto
La página de Contacto SHALL ofrecer campos para nombre, correo electrónico y mensaje, además de enlaces a redes sociales y WhatsApp.

#### Scenario: Visualización del formulario
- **WHEN** una persona visita Contacto
- **THEN** encuentra los campos requeridos, una acción de envío y los enlaces sociales disponibles

#### Scenario: Formulario localizado
- **WHEN** una persona visita Contacto en inglés o portugués
- **THEN** las etiquetas, instrucciones y acciones aparecen en el idioma seleccionado

### Requirement: Validación de entrada
El sistema SHALL validar en servidor que nombre, correo y mensaje estén presentes, que el correo tenga formato válido y que los límites de longitud sean respetados.

#### Scenario: Datos inválidos
- **WHEN** una persona envía un correo inválido o deja un campo requerido vacío
- **THEN** el sistema rechaza el mensaje, no lo envía y muestra un error localizado

#### Scenario: Datos válidos
- **WHEN** una persona envía todos los datos válidos
- **THEN** el sistema procesa el mensaje sin exponer la credencial de SendGrid al navegador

### Requirement: Entrega mediante SendGrid
El sistema SHALL enviar los mensajes válidos mediante SendGrid usando credenciales de servidor y SHALL informar un resultado de éxito o error sin revelar detalles sensibles.

#### Scenario: Entrega exitosa
- **WHEN** SendGrid acepta un mensaje válido
- **THEN** el sistema muestra una confirmación localizada y limpia o deshabilita el formulario para evitar reenvío accidental

#### Scenario: Fallo del proveedor
- **WHEN** SendGrid rechaza o no puede entregar un mensaje
- **THEN** el sistema muestra un error localizado, conserva los datos ingresados cuando sea posible y no muestra secretos ni trazas internas

### Requirement: Protección honeypot
El formulario SHALL incluir una protección honeypot que descarte envíos automatizados cuando el campo oculto sea completado.

#### Scenario: Envío automatizado detectado
- **WHEN** un envío contiene un valor en el campo honeypot
- **THEN** el sistema no envía el mensaje a SendGrid y responde de forma segura sin revelar la regla anti-spam

### Requirement: Privacidad de credenciales
Las credenciales y configuración sensible de SendGrid MUST permanecer en variables de entorno del servidor y no aparecer en HTML, respuestas públicas ni el repositorio.

#### Scenario: Inspección del cliente
- **WHEN** una persona inspecciona los recursos del navegador
- **THEN** no puede obtener la API key ni otros secretos de SendGrid
