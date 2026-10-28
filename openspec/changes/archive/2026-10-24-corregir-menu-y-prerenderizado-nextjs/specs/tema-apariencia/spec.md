# Spec Delta

## ADDED Requirements

### Requirement: Estado coherente del menú responsive
El menú de navegación SHALL sincronizarse con el breakpoint responsive para que el botón y el panel mantengan un estado operable al cambiar repetidamente entre móvil y escritorio.

#### Scenario: Cambio de móvil a escritorio
- **WHEN** una persona abre el menú en móvil y aumenta la ventana hasta escritorio
- **THEN** el panel deja de ocupar la vista móvil, el menú queda cerrado y la navegación de escritorio permanece disponible

#### Scenario: Regreso a móvil
- **WHEN** una persona reduce nuevamente la ventana después de haber estado en escritorio
- **THEN** el botón de menú aparece en estado cerrado y puede abrir el panel con una sola activación

#### Scenario: Cierre por teclado
- **WHEN** el panel móvil está abierto y la persona presiona Escape o activa un enlace
- **THEN** el panel se cierra, devuelve un estado ARIA consistente y permite continuar navegando
