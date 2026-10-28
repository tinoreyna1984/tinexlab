# Spec Delta

## ADDED Requirements

### Requirement: Estilo de botones de acción
Los botones de acción del sitio SHALL usar un estilo de alto contraste en blanco y negro, con esquinas ligeramente redondeadas y texto en negrita. El estilo SHALL invertirse según el tema y SHALL aplicarse por igual a los enlaces que se presentan visualmente como botones.

#### Scenario: Botón principal en tema claro
- **WHEN** se muestra un botón principal, como una llamada a la acción de inicio o el botón de enviar del formulario de contacto, con el tema claro
- **THEN** el botón tiene fondo negro, texto blanco en negrita y esquinas redondeadas de aproximadamente 0.5rem

#### Scenario: Botón principal en tema oscuro
- **WHEN** se muestra un botón principal con el tema oscuro
- **THEN** el botón tiene fondo blanco y texto negro en negrita

#### Scenario: Botón secundario
- **WHEN** se muestra un botón secundario, como la llamada a la acción del portafolio, el botón de tema o el botón de menú
- **THEN** el botón usa un contorno del color del texto del tema, conserva las mismas esquinas y la misma tipografía en negrita, y tiene suficiente contraste sobre el fondo

### Requirement: Efecto de los botones al pasar el cursor
Los botones de acción SHALL mostrar una transición suave de sombra al pasar el cursor o recibir el foco del teclado. La sombra SHALL ser oscura en tema claro y un resplandor blanco en tema oscuro.

#### Scenario: Cursor en tema claro
- **WHEN** una persona pasa el cursor sobre un botón de acción con el tema claro
- **THEN** el botón muestra una sombra oscura proyectada hacia abajo con una transición suave

#### Scenario: Cursor en tema oscuro
- **WHEN** una persona pasa el cursor sobre un botón de acción con el tema oscuro
- **THEN** el botón muestra un resplandor blanco a su alrededor con una transición suave

#### Scenario: Foco con teclado
- **WHEN** una persona enfoca un botón de acción con el teclado
- **THEN** el botón muestra un indicador de foco visible, además del efecto de sombra

### Requirement: Estado visual de botones compactos y seleccionados
Los botones compactos, como los filtros del portafolio, SHALL conservar su tamaño reducido y usar el mismo lenguaje visual. Cuando están seleccionados, SHALL mostrar el relleno sólido del botón principal. Cuando no están seleccionados, SHALL mostrar contorno.

#### Scenario: Filtro seleccionado
- **WHEN** un filtro del portafolio está activo
- **THEN** se muestra con relleno sólido invertido según el tema y se distingue claramente de los filtros inactivos

#### Scenario: Filtro inactivo
- **WHEN** un filtro del portafolio no está activo
- **THEN** se muestra con contorno y fondo transparente, con el mismo tamaño compacto

#### Scenario: Botón deshabilitado
- **WHEN** un botón de acción está deshabilitado, por ejemplo mientras se envía el formulario
- **THEN** se muestra con opacidad reducida, no muestra el efecto de sombra y no parece interactivo

### Requirement: Formato de títulos
Los títulos de página y de sección SHALL usar una tipografía redondeada sans-serif, distinta de la del cuerpo de texto. Los títulos de página y de sección SHALL mostrar una sombra de texto suave en tema claro.

#### Scenario: Título en tema claro
- **WHEN** se muestra un título de página o de sección con el tema claro
- **THEN** el título usa la tipografía de títulos y muestra una sombra de texto suave y difusa que no reduce su legibilidad

#### Scenario: Tipografía disponible sin parpadeo
- **WHEN** una persona carga cualquier página
- **THEN** los títulos se muestran con la tipografía de títulos sin un cambio de diseño visible por la carga de la fuente

### Requirement: Efecto neón de títulos en tema oscuro
En tema oscuro, el título principal de cada página y el nombre de la marca en la cabecera SHALL mostrarse en blanco con un resplandor neón verde menta que pulsa de forma continua y sutil.

#### Scenario: Título principal en tema oscuro
- **WHEN** se muestra el título principal de una página con el tema oscuro
- **THEN** el título aparece en blanco con un resplandor verde menta que alterna suavemente su intensidad

#### Scenario: Movimiento reducido
- **WHEN** la persona tiene activada la preferencia de reducir movimiento
- **THEN** el título conserva el resplandor neón estático, sin animación de pulso

#### Scenario: Cambio de tema
- **WHEN** una persona cambia del tema oscuro al claro
- **THEN** el efecto neón desaparece y el título vuelve a mostrar la sombra suave del tema claro

### Requirement: Cambios visuales sin alterar el funcionamiento
Los cambios de apariencia de botones y títulos SHALL conservar el texto visible, los nombres accesibles, los atributos ARIA, los destinos de navegación y el comportamiento de cada control.

#### Scenario: Controles existentes
- **WHEN** una persona usa el menú, el selector de tema, los filtros del portafolio o el formulario de contacto después del cambio visual
- **THEN** cada control produce el mismo resultado que antes, y las pruebas automatizadas existentes del menú siguen pasando
