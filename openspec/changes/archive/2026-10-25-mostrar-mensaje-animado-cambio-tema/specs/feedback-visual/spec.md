# Spec Delta

## Purpose

Define el comportamiento de los mensajes visuales transitorios que confirman acciones de la interfaz: cómo aparecen y desaparecen con animación de desvanecimiento, cómo se cierran, cómo se anuncian y cómo respetan el idioma y la preferencia de movimiento de la persona.

## ADDED Requirements

### Requirement: Mensaje inferior con desvanecimiento
El sistema SHALL mostrar un mensaje temporal fijo en la parte inferior de la pantalla que aparezca con una transición de desvanecimiento (fade-in) y desaparezca con una transición de desvanecimiento (fade-out).

#### Scenario: Aparición del mensaje
- **WHEN** la interfaz muestra un mensaje de confirmación
- **THEN** el mensaje aparece anclado en la parte inferior de la pantalla y su opacidad pasa de transparente a visible con una transición suave

#### Scenario: Desaparición del mensaje
- **WHEN** el mensaje inicia su cierre
- **THEN** su opacidad pasa de visible a transparente, termina la transición y el mensaje deja de ocupar espacio en pantalla

#### Scenario: No obstruye el contenido
- **WHEN** el mensaje está visible en cualquier tamaño de pantalla
- **THEN** permanece fijo en la parte inferior sin provocar desplazamiento horizontal ni ocultar de forma permanente controles de la interfaz

### Requirement: Cierre automático del mensaje
El sistema SHALL cerrar el mensaje automáticamente aproximadamente 4 segundos después de que termine de aparecer, sin requerir interacción.

#### Scenario: Cierre sin interacción
- **WHEN** nadie interactúa con el mensaje durante su tiempo de visualización
- **THEN** el mensaje inicia su desvanecimiento de salida y desaparece de la pantalla

### Requirement: Cierre por interacción con el mensaje
El sistema SHALL permitir cerrar el mensaje con un toque o clic sobre él una vez que terminó de aparecer, también mediante teclado.

#### Scenario: Cierre pulsando el mensaje
- **WHEN** la persona pulsa el mensaje después de que terminó el fade-in de entrada
- **THEN** el mensaje inicia su desvanecimiento de salida antes del cierre automático

#### Scenario: Pulso durante la aparición inicial
- **WHEN** la persona pulsa el mensaje mientras todavía se está apareciendo
- **THEN** el mensaje no se cierra y continúa su animación de entrada

#### Scenario: Cierre con teclado
- **WHEN** la persona activa el cierre del mensaje desde el teclado o una tecnología de asistencia
- **THEN** el mensaje se cierra con la misma animación de salida que al pulsarlo

### Requirement: Reinicio en solicitudes repetidas
El sistema SHALL mostrar un único mensaje a la vez: si se solicita un mensaje nuevo mientras el anterior aún está visible, el sistema SHALL reemplazarlo y reiniciar su temporizador de cierre en lugar de apilar mensajes.

#### Scenario: Mensaje nuevo durante uno visible
- **WHEN** se solicita un mensaje mientras el anterior todavía está en pantalla
- **THEN** solo permanece un mensaje visible, con la información más reciente y su cuenta regresiva de cierre reiniciada

### Requirement: Accesibilidad del mensaje
El sistema SHALL anunciar el mensaje como una región de estado (live region) de cortesía sin robar el foco, y el mensaje SHALL conservar contraste de texto suficiente en los temas claro y oscuro.

#### Scenario: Anuncio sin interrupción
- **WHEN** el mensaje aparece mientras la persona navega con una tecnología de asistencia
- **THEN** su contenido se anuncia de forma cortés y el foco permanece en el elemento donde estaba la persona

#### Scenario: Legibilidad en ambos temas
- **WHEN** el mensaje se muestra con el tema claro o con el tema oscuro
- **THEN** su texto y fondo mantienen contraste suficiente para ser leído cómodamente

### Requirement: Movimiento reducido en el mensaje
El sistema SHALL mostrar y ocultar el mensaje sin transición de desvanecimiento cuando la persona tiene activada la preferencia de reducir movimiento.

#### Scenario: Preferencia de reducir movimiento activa
- **WHEN** `prefers-reduced-motion: reduce` está activo y se muestra un mensaje
- **THEN** el mensaje aparece y desaparece de forma inmediata, sin animación de opacidad

### Requirement: Localización del mensaje
El sistema SHALL mostrar el texto del mensaje localizado en el idioma activo del sitio, usando las traducciones del diccionario correspondiente.

#### Scenario: Idioma activo
- **WHEN** se muestra un mensaje con la interfaz en español, inglés o portugués
- **THEN** el texto del mensaje corresponde al diccionario del idioma activo, sin cadenas sin traducir
