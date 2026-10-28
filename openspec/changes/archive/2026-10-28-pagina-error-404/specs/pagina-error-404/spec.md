# Spec Delta

## Purpose

Define el comportamiento de la página de error HTTP 404 del sitio Tinexlab: qué rutas la activan, qué contenido muestra (imagen `404.jpg`, mensaje y enlace al inicio), cómo se localiza por idioma y cómo se adapta al tema claro/oscuro.

## ADDED Requirements

### Requirement: Página de error para rutas inexistentes
El sistema SHALL mostrar una página de error 404 personalizada, en lugar de la página por defecto del framework, cuando una URL no corresponda a ninguna ruta del sitio.

#### Scenario: Ruta inexistente sin locale
- **WHEN** una persona visita `/pagina-inexistente`
- **THEN** el sistema responde con estado HTTP 404 y muestra la página de error personalizada

#### Scenario: Ruta profunda inexistente
- **WHEN** una persona visita `/cv/subseccion-inexistente`
- **THEN** el sistema muestra la página de error personalizada

#### Scenario: Exclusión de indexación
- **WHEN** el sistema responde una ruta inexistente
- **THEN** la respuesta indica a los buscadores no indexar la página

### Requirement: Imagen `404.jpg` como elemento central
La página de error SHALL mostrar la imagen `public/404.jpg` como elemento visual central, con su relación de aspecto preservada, texto alternativo descriptivo localizado y sin provocar desplazamiento horizontal en ningún tamaño de pantalla.

#### Scenario: Imagen completa en escritorio
- **WHEN** la página de error se muestra en un viewport de escritorio
- **THEN** la imagen `404.jpg` se ve completa y centrada

#### Scenario: Sin desplazamiento horizontal en móvil
- **WHEN** la página de error se muestra en un viewport móvil
- **THEN** la imagen y el contenido caben en el ancho de la pantalla sin desplazamiento horizontal

#### Scenario: Texto alternativo
- **WHEN** la imagen de la página de error carga
- **THEN** expone un texto alternativo descriptivo en el idioma de la URL

### Requirement: Conservación de la navegación del sitio
La página de error SHALL renderizar dentro del layout del idioma, conservando el encabezado, el pie de página y la navegación del sitio para que la persona pueda salir del error hacia cualquier sección.

#### Scenario: Navegación disponible desde el error
- **WHEN** la página de error se muestra bajo un locale soportado
- **THEN** el encabezado y el pie de página permanecen visibles y sus enlaces de sección funcionan

### Requirement: Localización de los textos del error
La página de error SHALL mostrar título, mensaje y enlace de regreso al inicio localizados en español, inglés y portugués, usando español como idioma de respaldo cuando la URL no especifique un locale soportado.

#### Scenario: Copia en español
- **WHEN** una persona visita `/ruta-inexistente`
- **THEN** el título, el mensaje y el enlace de regreso se muestran en español

#### Scenario: Copia en inglés con enlace al inicio localizado
- **WHEN** una persona visita `/en/ruta-inexistente`
- **THEN** el texto se muestra en inglés y el enlace de regreso apunta a `/en`

#### Scenario: Copia en portugués con enlace al inicio localizado
- **WHEN** una persona visita `/pt/ruta-inexistente`
- **THEN** el texto se muestra en portugués y el enlace de regreso apunta a `/pt`

#### Scenario: Locale no soportado
- **WHEN** el primer segmento de la URL no corresponde a un locale soportado
- **THEN** la página se muestra en español con el enlace de regreso a la raíz del sitio

### Requirement: Compatibilidad con el tema claro y oscuro
La página de error SHALL conservar contraste de texto legible y una presentación coherente con el sitio en los temas claro y oscuro.

#### Scenario: Tema oscuro
- **WHEN** la persona tiene activo el tema oscuro y visita una ruta inexistente
- **THEN** el texto mantiene contraste legible sobre el fondo oscuro y la imagen se muestra correctamente

#### Scenario: Tema claro
- **WHEN** la persona tiene activo el tema claro y visita una ruta inexistente
- **THEN** el texto mantiene contraste legible sobre el fondo claro y la imagen se muestra correctamente
