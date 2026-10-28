# Spec Delta

## Purpose

Define la experiencia de carga inicial del sitio: cómo aparece y desaparece el splash screen con la imagen de bienvenida, cómo se muestra el porcentaje de carga en la parte inferior izquierda, con qué frecuencia se muestra por sesión y cómo se adapta a diferentes tamaños de pantalla y preferencias de accesibilidad.

## ADDED Requirements

### Requirement: Splash en la primera visita por sesión
El sistema SHALL mostrar un splash screen a pantalla completa con la imagen `public/inicio.png` únicamente en la primera visita de cada sesión del navegador, y SHALL omitirlo en cargas posteriores dentro de la misma sesión.

#### Scenario: Primera visita de la sesión
- **WHEN** la persona abre el sitio en una sesión del navegador que aún no ha mostrado el splash
- **THEN** el splash cubre la pantalla con la imagen de bienvenida mientras el sitio carga

#### Scenario: Recarga dentro de la misma sesión
- **WHEN** la persona recarga la página o visita otra URL del sitio dentro de la misma sesión después de ya haber visto el splash
- **THEN** el splash no se vuelve a mostrar y el contenido aparece directamente

#### Scenario: Nueva sesión del navegador
- **WHEN** se inicia una nueva sesión del navegador y la persona abre el sitio
- **THEN** el splash se muestra de nuevo

### Requirement: Animación de aparición y desaparición
El splash SHALL aparecer con una transición de desvanecimiento (fade-in) al iniciar la carga y SHALL desaparecer con una transición de desvanecimiento (fade-out) al llegar al 100 % de carga, antes de dejar de ocupar pantalla.

#### Scenario: Entrada del splash
- **WHEN** comienza la carga del sitio y corresponde mostrar el splash
- **THEN** la opacidad del splash pasa de transparente a visible de forma suave

#### Scenario: Salida del splash
- **WHEN** el indicador de carga alcanza el 100 %
- **THEN** la opacidad del splash pasa de visible a transparente y, al terminar la transición, el splash deja de mostrarse y el contenido del sitio queda visible

### Requirement: Porcentaje de carga en la parte inferior izquierda
El splash SHALL mostrar un indicador de porcentaje de carga de 0 % a 100 % anclado en la parte inferior izquierda de la pantalla, visible mientras el splash está presente.

#### Scenario: Indicador visible durante la carga
- **WHEN** el splash se está mostrando
- **THEN** en la esquina inferior izquierda se ve un porcentaje entero con el símbolo "%" que avanza desde 0 %

#### Scenario: Ubicación estable
- **WHEN** el splash está visible en cualquier tamaño de pantalla
- **THEN** el porcentaje permanece en la parte inferior izquierda sin provocar desplazamiento horizontal ni tapar contenido fuera del splash

### Requirement: Avance del porcentaje durante la carga
El indicador SHALL avanzar de forma simulada y siempre creciente, más rápido al inicio y más lento cerca del 100 %, y SHALL alcanzar el 100 % cuando la página termina de cargar, sin retrasar ni bloquear la carga real del sitio.

#### Scenario: Progreso durante la carga
- **WHEN** el sitio se está cargando
- **THEN** el porcentaje aumenta de manera continua sin retroceder y la página carga en paralelo sin esperar al indicador

#### Scenario: Finalización con la carga
- **WHEN** la página termina de cargar
- **THEN** el indicador llega a 100 % y se inicia la salida del splash

### Requirement: Cierre garantizado del splash
El sistema SHALL ocultar el splash dentro de un tiempo máximo de 8 segundos incluso si la página no señala que terminó de cargar, para que nunca quede bloqueado en pantalla.

#### Scenario: Señal de carga que nunca llega
- **WHEN** la página no emite la señal de carga completada
- **THEN** el splash inicia su desvanecimiento y desaparece antes de cumplirse 8 segundos desde su aparición

### Requirement: Diseño responsivo del splash
El splash y el indicador SHALL adaptarse a pantallas móviles, tabletas y escritorio: la imagen SHALL escalarse sin recortes que deformen la escena y sin desplazamiento horizontal, y el porcentaje SHALL mantenerse legible en todos los tamaños.

#### Scenario: Pantalla móvil pequeña
- **WHEN** el splash se muestra en un viewport de 360 px de ancho
- **THEN** la imagen se ajusta al ancho disponible sin recorte ni scroll horizontal y el porcentaje se lee con tamaño suficiente

#### Scenario: Pantalla de escritorio
- **WHEN** el splash se muestra en un viewport de 1440 px de ancho
- **THEN** la imagen se centra y escala sin deformarse y el porcentaje permanece en la esquina inferior izquierda

### Requirement: Movimiento reducido en el splash
El sistema SHALL mostrar y ocultar el splash sin transición de desvanecimiento cuando la persona tiene activada la preferencia de reducir movimiento.

#### Scenario: Preferencia de reducir movimiento activa
- **WHEN** `prefers-reduced-motion: reduce` está activo y corresponde mostrar el splash
- **THEN** el splash aparece y desaparece de forma inmediata, sin animación de opacidad, y el indicador puede actualizar su valor sin animaciones

### Requirement: Accesibilidad del splash
El splash SHALL ser una capa visual que no roba el foco ni intercepta la interacción del teclado con el contenido que carga detrás, y el indicador SHALL conservar contraste de texto suficiente en los temas claro y oscuro.

#### Scenario: Navegación con teclado durante la carga
- **WHEN** la persona navega con teclado mientras el splash está visible
- **THEN** el foco no se mueve al splash y los controles del sitio siguen siendo alcanzables una vez que el splash desaparece

#### Scenario: Legibilidad del porcentaje en ambos temas
- **WHEN** el splash se muestra con el tema claro o con el tema oscuro
- **THEN** el texto del porcentaje mantiene contraste suficiente para leerse cómodamente
