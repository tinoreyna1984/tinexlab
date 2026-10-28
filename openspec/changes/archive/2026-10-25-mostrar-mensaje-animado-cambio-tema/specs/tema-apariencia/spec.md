# Spec Delta

## ADDED Requirements

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
