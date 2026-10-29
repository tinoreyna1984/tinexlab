# pie-pagina-dinamico Specification

## Purpose

Permite que el pie de página presente un aviso de copyright vigente sin depender de actualizaciones manuales al comenzar un nuevo año calendario.

## Requirements

### Requirement: Año actual en el copyright

El pie de página SHALL mostrar el año calendario actual como parte del aviso de copyright en cada locale soportado.

#### Scenario: Año vigente

- **WHEN** una persona visita cualquier página que incluye el pie de página
- **THEN** el aviso de copyright contiene el año actual del entorno de ejecución

#### Scenario: Cambio de año

- **WHEN** cambia el año calendario y se vuelve a renderizar el sitio
- **THEN** el aviso muestra automáticamente el nuevo año sin modificar manualmente el contenido localizado

#### Scenario: Locales soportados

- **WHEN** una persona visita el sitio en español, inglés o portugués
- **THEN** el aviso de copyright conserva el formato localizado y muestra el mismo año calendario vigente
