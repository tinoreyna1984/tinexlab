# Spec Delta

## Purpose

Define una experiencia visual consistente, accesible y adaptable que conserve la identidad de Tinexlab en dispositivos móviles, escritorio y preferencias de tema del usuario.

## ADDED Requirements

### Requirement: Diseño responsivo mobile-first
El sitio SHALL adaptar navegación, contenido, controles, imágenes y formularios a pantallas móviles, tabletas y escritorio sin pérdida de información ni desplazamiento horizontal innecesario.

#### Scenario: Pantalla móvil
- **WHEN** una persona visita cualquier sección desde un teléfono
- **THEN** el contenido se presenta en una columna utilizable, la navegación es accesible y los controles pueden operarse táctilmente

#### Scenario: Pantalla amplia
- **WHEN** una persona visita cualquier sección desde escritorio
- **THEN** el contenido aprovecha el espacio disponible sin exceder anchos legibles ni romper la jerarquía visual

### Requirement: Identidad visual consistente
El sitio SHALL conservar una identidad basada en negro, blanco y acento verde menta, con variantes que mantengan legibilidad en fondos claros y oscuros.

#### Scenario: Acento en tema oscuro
- **WHEN** se muestra el tema oscuro
- **THEN** el acento de marca mantiene su apariencia verde menta brillante sobre superficies oscuras

#### Scenario: Acento en tema claro
- **WHEN** se muestra el tema claro
- **THEN** el acento usa una variante con contraste suficiente sobre superficies claras

### Requirement: Preferencia de tema
El sistema SHALL respetar el tema del sistema por defecto y SHALL permitir elegir tema claro u oscuro con una preferencia persistida por dispositivo.

#### Scenario: Preferencia del sistema
- **WHEN** una persona visita por primera vez sin preferencia guardada
- **THEN** el sistema usa el tema claro u oscuro indicado por el sistema operativo

#### Scenario: Selección explícita
- **WHEN** una persona selecciona tema oscuro
- **THEN** el sistema cambia la interfaz a oscuro y conserva esa elección en visitas posteriores

#### Scenario: Regreso al sistema
- **WHEN** una persona selecciona seguir el sistema
- **THEN** el sistema vuelve a reflejar la preferencia del sistema operativo y elimina la selección explícita

### Requirement: Cambio de tema sin parpadeo
El sistema SHALL aplicar el tema inicial antes de mostrar el contenido principal para evitar un cambio visible incorrecto durante la carga.

#### Scenario: Carga con tema guardado
- **WHEN** una persona recarga el sitio con una preferencia explícita guardada
- **THEN** la interfaz se muestra directamente con esa preferencia sin parpadear al tema contrario
