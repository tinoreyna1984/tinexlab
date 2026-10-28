# Spec Delta

## ADDED Requirements

### Requirement: Imagen biográfica en la tarjeta de Inicio
La página de Inicio SHALL presentar en la tarjeta de presentación la fotografía biográfica de la persona, renderizada de forma responsiva y sin distorsión de su relación de aspecto.

#### Scenario: Presencia de la imagen biográfica
- **WHEN** una persona visita Inicio
- **THEN** la tarjeta de presentación muestra la fotografía biográfica en lugar del monograma de texto

#### Scenario: Comportamiento responsivo
- **WHEN** una persona consulta Inicio en un dispositivo móvil o de escritorio
- **THEN** la imagen biográfica se adapta al ancho disponible de su contenedor sin desbordarlo ni deformarse

#### Scenario: Integración visual con la tarjeta
- **WHEN** se presenta la tarjeta de presentación en Inicio
- **THEN** la imagen usa el mismo estilo de bordes redondeados que su contenedor, conserva su proporción natural y se muestra junto a los datos de contacto en pantallas anchas, apilada en pantallas móviles

#### Scenario: Texto alternativo accesible
- **WHEN** se presenta la imagen biográfica
- **THEN** la imagen tiene un texto alternativo descriptivo en el idioma del locale activo
