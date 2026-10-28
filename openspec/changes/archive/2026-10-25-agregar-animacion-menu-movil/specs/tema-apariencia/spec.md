# Spec Delta

## ADDED Requirements

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
