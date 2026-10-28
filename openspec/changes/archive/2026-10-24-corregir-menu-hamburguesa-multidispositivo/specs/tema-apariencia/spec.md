# Spec Delta

## MODIFIED Requirements

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
