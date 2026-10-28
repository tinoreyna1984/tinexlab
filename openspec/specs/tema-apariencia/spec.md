# tema-apariencia Specification

## Purpose

Define una experiencia visual consistente, accesible y adaptable que conserve la identidad de Tinexlab en dispositivos móviles, escritorio y preferencias de tema del usuario.

## Requirements

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

### Requirement: Estado coherente del menú responsive
El menú de navegación SHALL sincronizarse con el breakpoint responsive para que el botón, el panel y sus estados ARIA mantengan un comportamiento operable en tamaños, orientaciones y cambios repetidos de viewport de dispositivos portátiles.

#### Scenario: Cambio de móvil a escritorio
- **WHEN** una persona abre el menú en móvil y aumenta la ventana hasta escritorio
- **THEN** el panel deja de ocupar la vista móvil, el menú queda cerrado y la navegación de escritorio permanece disponible

#### Scenario: Regreso a móvil
- **WHEN** una persona reduce nuevamente la ventana después de haber estado en escritorio
- **THEN** el botón de menú aparece en estado cerrado y puede abrir el panel con una sola activación

#### Scenario: Cerrar el menú hamburguesa en modo de dispositivo móvil
- **WHEN** el botón de menú aparece en estado abierto
- **THEN** al pulsar el botón de menú, se cierra el panel y el mismo botón vuelve al estado cerrado. Esta característica debe validarse en todas las dimensiones donde el botón de menú se manifieste

#### Scenario: Cierre por teclado
- **WHEN** el panel móvil está abierto y la persona presiona Escape o activa un enlace
- **THEN** el panel se cierra, devuelve un estado ARIA consistente y permite continuar navegando

#### Scenario: Activación en viewport portátil
- **WHEN** una persona activa el botón hamburguesa en un viewport entre 320 px y 1023 px de ancho
- **THEN** el panel se vuelve visible, el botón indica estado abierto y los enlaces del panel pueden activarse

#### Scenario: Límite del breakpoint
- **WHEN** el viewport cruza repetidamente los límites de 1023 px y 1024 px
- **THEN** el botón y el panel cambian al modo correspondiente sin quedar ocultos, duplicados o abiertos de forma inesperada

#### Scenario: Cambio de orientación
- **WHEN** una persona gira un dispositivo portátil entre orientación vertical y horizontal
- **THEN** el menú conserva un estado coherente con el nuevo ancho y puede volver a abrirse o cerrarse con una sola activación

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

### Requirement: Ícono de marca en la cabecera
La cabecera SHALL mostrar el archivo de logo del sitio como ícono visual junto al nombre de la marca, con tamaño responsivo que conserve la proporción de la imagen y con los efectos visuales existentes de esquinas redondeadas y rotación al pasar el cursor.

#### Scenario: Logo en viewport móvil y de escritorio
- **WHEN** una persona visita cualquier sección en un teléfono o en escritorio
- **THEN** el ícono de la cabecera muestra la imagen del logo sin deformarse, adapta su tamaño al breakpoint y mantiene la marca de texto visible junto a él

#### Scenario: Enlace de marca
- **WHEN** una persona activa el ícono de marca o su nombre en texto
- **THEN** navega a la página de inicio del idioma actual, igual que antes del cambio

#### Scenario: Nombre accesible de la marca
- **WHEN** una persona navega la cabecera con tecnología de asistencia
- **THEN** el nombre accesible del enlace de marca se anuncia una sola vez, sin duplicar el texto del ícono

### Requirement: Ícono de la ventana con el logo
La página SHALL declarar el archivo de logo del sitio como único ícono de la ventana (pestaña) del navegador en todas las rutas e idiomas.

#### Scenario: Pestaña con el logo
- **WHEN** una persona abre cualquier página del sitio en cualquier idioma
- **THEN** la pestaña del navegador muestra el logo del sitio como ícono

#### Scenario: Declaración única en el HTML
- **WHEN** se inspecciona el encabezado del documento de cualquier página
- **THEN** solo hay un ícono declarado y apunta al archivo de logo del sitio

#### Scenario: Ausencia del favicon genérico
- **WHEN** se solicita la ruta del favicon genérico de la plantilla
- **THEN** el sitio no responde con ese archivo

### Requirement: Confirmación animada al cambiar de tema
El sistema SHALL mostrar un mensaje en la parte inferior de la pantalla, con el comportamiento definido en la capacidad `feedback-visual`, cada vez que la persona activa el botón de selector de tema, indicando el tema recién aplicado (sistema, claro u oscuro).

#### Scenario: Selección de tema oscuro
- **WHEN** una persona activa el botón de selector de tema y el siguiente tema es oscuro
- **THEN** el tema se aplica como antes y un mensaje inferior aparece con desvanecimiento indicando el tema oscuro en el idioma activo

#### Scenario: Selección de tema claro
- **WHEN** una persona activa el botón de selector de tema y el siguiente tema es claro
- **THEN** el tema se aplica como antes y un mensaje inferior aparece con desvanecimiento indicando el tema claro en el idioma activo

#### Scenario: Regreso al sistema
- **WHEN** una persona activa el botón de selector de tema y el siguiente tema es el del sistema
- **THEN** el tema del sistema se aplica como antes y un mensaje inferior aparece con desvanecimiento indicando el tema del sistema en el idioma activo

#### Scenario: Cambios repetidos
- **WHEN** una persona cambia de tema varias veces en ráfaga
- **THEN** un solo mensaje permanece visible, siempre con el último tema aplicado, y la preferencia de tema sigue persistiéndose correctamente

### Requirement: Operación conservada del selector de tema
Al mostrar el mensaje de confirmación, el botón de selector de tema SHALL conservar su nombre accesible, su etiqueta visible, su ciclo de preferencias y su persistencia sin cambios.

#### Scenario: Controles existentes
- **WHEN** una persona usa el selector de tema después de agregar el mensaje
- **THEN** el botón sigue rotando entre sistema, claro y oscuro, su `aria-label` y `title` siguen describiendo la preferencia actual y las pruebas existentes siguen pasando

### Requirement: Animación del menú desplegable móvil
El panel del menú de navegación SHALL abrirse y cerrarse con una animación breve en dispositivos móviles: al abrir, el panel se desplaza hacia abajo desde la cabecera combinado con desvanecimiento hasta su posición final; al cerrar, SHALL ejecutar el movimiento inverso hasta desaparecer.

#### Scenario: Apertura del panel con animación
- **WHEN** una persona activa el botón de menú en un viewport móvil (ancho menor a 1024 px)
- **THEN** el panel aparece con una transición corta de desplazamiento hacia abajo y desvanecimiento de entrada hasta quedar completamente visible

#### Scenario: Cierre del panel con animación
- **WHEN** el panel móvil abierto se cierra mediante el botón de menú, la tecla Escape o la activación de un enlace
- **THEN** el panel ejecuta una transición corta de desplazamiento hacia arriba y desvanecimiento de salida y, al terminar, deja de ocupar pantalla y de recibir interacción

#### Scenario: Sin animación en escritorio o cuando no aparece el menú hamburguesa
- **WHEN** se muestra la navegación horizontal de escritorio (ancho de 1024 px o mayor)
- **THEN** la navegación permanece visible de forma estática, sin animación de apertura o cierre

### Requirement: Estados del menú durante la animación
Al activar la apertura o el cierre del panel móvil, el sistema SHALL actualizar de inmediato los atributos de estado (`data-open`, `aria-expanded` y `aria-hidden`) mientras la animación se reproduce, y durante la animación de cierre el panel SHALL impedir interacciones con puntero o teclado.

#### Scenario: Atributos actualizados de inmediato
- **WHEN** una persona pulsa el botón de menú y la animación de apertura o cierre inicia
- **THEN** `data-open`, `aria-expanded` y `aria-hidden` reflejan el nuevo estado desde el primer instante, sin esperar a que termine la transición

#### Scenario: Cierre sin interacción accidental
- **WHEN** el panel está animando su cierre
- **THEN** sus enlaces y controles no pueden activarse ni recibir foco nuevo mientras la transición termina

### Requirement: Movimiento reducido en el menú móvil
El sistema SHALL abrir y cerrar el panel del menú móvil de forma inmediata, sin animación de desplazamiento ni desvanecimiento, cuando la persona tiene activada la preferencia de reducir movimiento.

#### Scenario: Preferencia de reducir movimiento activa
- **WHEN** `prefers-reduced-motion: reduce` está activo y una persona abre o cierra el menú en un viewport móvil
- **THEN** el panel aparece o desaparece de inmediato, sin transición visual alguna
