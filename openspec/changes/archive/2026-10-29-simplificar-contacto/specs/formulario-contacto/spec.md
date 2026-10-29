# Spec Delta

## MODIFIED Requirements

### Requirement: Formulario de contacto
La página de Contacto SHALL ofrecer una dirección de correo electrónico visible y enlazada mediante `mailto:`, además de enlaces a redes sociales y WhatsApp. Los enlaces de redes sociales SHALL mostrar visualmente el ícono correspondiente y conservar un nombre accesible.

#### Scenario: Visualización del formulario
- **WHEN** una persona visita Contacto
- **THEN** encuentra la dirección `tinoreyna1984@gmail.com` como enlace para iniciar un correo y los enlaces sociales disponibles

#### Scenario: Enlaces sociales con íconos
- **WHEN** una persona visita la sección de redes sociales
- **THEN** cada enlace muestra el ícono correspondiente a LinkedIn, Instagram, X, Facebook o GitHub, sin presentar el nombre como etiqueta visual principal
- **AND** cada enlace conserva un nombre accesible que identifica la red social

#### Scenario: Formulario localizado
- **WHEN** una persona visita Contacto en español, inglés o portugués
- **THEN** las etiquetas y las instrucciones del contacto aparecen en el idioma seleccionado

## REMOVED Requirements

### Requirement: Validación de entrada
**Reason**: Se elimina el formulario, por lo que ya no existen datos ingresados que validar en servidor.
**Migration**: Las personas visitantes iniciarán el contacto desde el enlace `mailto:`.

#### Scenario: Datos inválidos
- **WHEN** una persona envía un correo inválido o deja un campo requerido vacío
- **THEN** el sistema rechaza el mensaje, no lo envía y muestra un error localizado

#### Scenario: Datos válidos
- **WHEN** una persona envía todos los datos válidos
- **THEN** el sistema procesa el mensaje sin exponer la credencial de SendGrid al navegador

### Requirement: Entrega mediante SendGrid
**Reason**: El sitio deja de enviar correos mediante un proveedor externo.
**Migration**: El cliente de correo de la persona visitante gestionará el envío mediante el enlace `mailto:`.

#### Scenario: Entrega exitosa
- **WHEN** SendGrid acepta un mensaje válido
- **THEN** el sistema muestra una confirmación localizada y limpia o deshabilita el formulario para evitar reenvío accidental

#### Scenario: Fallo del proveedor
- **WHEN** SendGrid rechaza o no puede entregar un mensaje
- **THEN** el sistema muestra un error localizado, conserva los datos ingresados cuando sea posible y no muestra secretos ni trazas internas

### Requirement: Protección honeypot
**Reason**: Ya no hay formulario público que proteger contra envíos automatizados.
**Migration**: No se requiere migración; el correo queda protegido por el cliente de correo de la persona visitante.

#### Scenario: Envío automatizado detectado
- **WHEN** un envío contiene un valor en el campo honeypot
- **THEN** el sistema no envía el mensaje a SendGrid y responde de forma segura sin revelar la regla anti-spam

### Requirement: Privacidad de credenciales
**Reason**: Se eliminan las credenciales y la configuración de SendGrid porque el sitio ya no realiza envíos desde el servidor.
**Migration**: Eliminar las variables de entorno y la integración de SendGrid.

#### Scenario: Inspección del cliente
- **WHEN** una persona inspecciona los recursos del navegador
- **THEN** no puede obtener la API key ni otros secretos de SendGrid
