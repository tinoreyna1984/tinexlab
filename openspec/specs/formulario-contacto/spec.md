# formulario-contacto Specification

## Purpose

Ofrece un canal de contacto confiable y localizado para que visitantes envíen mensajes profesionales sin exponer credenciales ni detalles internos del servicio de correo.

## Requirements

### Requirement: Formulario de contacto
La página de Contacto SHALL presentar el correo directo como acción principal dentro de una composición equilibrada y responsiva, junto con enlaces a redes sociales y WhatsApp. Los enlaces sociales SHALL mostrar sus íconos y conservar nombres accesibles.

#### Scenario: Visualización del formulario
- **WHEN** una persona visita Contacto
- **THEN** encuentra la dirección `tinoreyna1984@gmail.com` como enlace para iniciar un correo, los enlaces sociales y WhatsApp sin un bloque de espacio vacío heredado del formulario

#### Scenario: Enlaces sociales con íconos
- **WHEN** una persona visita la sección de redes sociales
- **THEN** cada enlace muestra el ícono correspondiente a LinkedIn, Instagram, X, Facebook o GitHub, sin presentar el nombre como etiqueta visual principal
- **AND** cada enlace conserva un nombre accesible que identifica la red social

#### Scenario: Formulario localizado
- **WHEN** una persona visita Contacto en inglés o portugués
- **THEN** las etiquetas y las instrucciones del contacto aparecen en el idioma seleccionado

#### Scenario: Composición responsiva
- **WHEN** una persona visita Contacto desde una pantalla móvil, tablet o escritorio
- **THEN** el contenido se reorganiza para aprovechar el espacio disponible sin desbordamiento horizontal, solapamientos ni pérdida de acceso a los enlaces
