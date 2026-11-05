# Spec Delta

## MODIFIED Requirements

### Requirement: Animación de aparición y desaparición
El splash SHALL aparecer con una transición de desvanecimiento (fade-in) al iniciar la carga y SHALL desaparecer con una transición de desvanecimiento (fade-out) al llegar al 100 % de carga, antes de dejar de ocupar pantalla. Durante toda la aparición, la capa del splash SHALL mantener un fondo opaco de modo que el contenido del sitio no sea visible a través de ella; el fade-in SHALL aplicar únicamente a la imagen de bienvenida y al indicador de porcentaje.

#### Scenario: Entrada del splash
- **WHEN** comienza la carga del sitio y corresponde mostrar el splash
- **THEN** la imagen de bienvenida y el porcentaje pasan de transparentes a visibles de forma suave mientras la capa que los contiene permanece opaca

#### Scenario: Contenido oculto durante la aparición
- **WHEN** el splash está en su transición de entrada (fade-in) en una primera visita de la sesión
- **THEN** el contenido del sitio detrás del splash no se transparenta ni se visualiza en ningún momento de la aparición

#### Scenario: Salida del splash
- **WHEN** el indicador de carga alcanza el 100 %
- **THEN** la opacidad del splash pasa de visible a transparente y, al terminar la transición, el splash deja de mostrarse y el contenido del sitio queda visible
