# Spec Delta

## MODIFIED Requirements

### Requirement: Catálogo de proyectos
La página de Portafolio SHALL mostrar los 19 proyectos migrados, cada uno con título, descripción, año, tecnologías, imagen y enlaces disponibles. La fuente mantenible del catálogo SHALL ser un archivo CSV con cabecera y registros compatibles con todos los campos requeridos por `Project`, incluidos los valores localizados y los enlaces opcionales.

#### Scenario: Catálogo inicial
- **WHEN** una persona visita Portafolio sin filtros
- **THEN** el sistema muestra los 19 proyectos disponibles cargados desde el CSV

#### Scenario: Proyecto sin sitio publicado
- **WHEN** un proyecto no tiene sitio publicado
- **THEN** el sistema conserva el enlace al repositorio y no muestra un enlace de sitio inválido

#### Scenario: Registro CSV válido
- **WHEN** el catálogo se carga desde un CSV con cabecera y un registro compatible con `Project`
- **THEN** el sistema transforma ese registro en un proyecto con sus textos localizados, tags, imagen y enlaces opcionales

### Requirement: Filtrado por tags
La página de Portafolio SHALL permitir filtrar el catálogo por uno o más tags de tecnología y SHALL ofrecer una forma de regresar al catálogo completo. Los controles de filtro SHALL presentar estados activo, inactivo, conteo, foco y limpieza visualmente diferenciados sin cambiar su semántica ni la del parámetro `tags` de la URL.

#### Scenario: Filtro por tecnología
- **WHEN** una persona selecciona el tag `React`
- **THEN** el sistema muestra únicamente los proyectos asociados con React y presenta el control como activo

#### Scenario: Limpieza del filtro
- **WHEN** una persona limpia el filtro activo
- **THEN** el sistema vuelve a mostrar todos los proyectos y restaura el estado visual inicial de los controles

#### Scenario: Tag sin coincidencias
- **WHEN** una combinación de tags no tiene proyectos asociados
- **THEN** el sistema informa que no existen resultados y mantiene disponible la acción de limpiar filtros

#### Scenario: Navegación accesible del filtro
- **WHEN** una persona navega los filtros mediante teclado o usa un tema claro u oscuro
- **THEN** cada control conserva un foco visible, un estado seleccionado perceptible y contraste suficiente sin perder su etiqueta accesible

### Requirement: Portafolio localizado
Los títulos, descripciones, tags visibles y controles del Portafolio SHALL aparecer en español, inglés o portugués según el locale de la ruta.

#### Scenario: Proyecto en portugués
- **WHEN** una persona visita `/pt/portfolio`
- **THEN** los datos textuales del catálogo aparecen en portugués y sus URLs externas permanecen sin cambios

#### Scenario: Cambio de locale con filtro
- **WHEN** una persona cambia de idioma desde un Portafolio filtrado
- **THEN** el sistema conserva el filtro equivalente cuando existe y muestra el catálogo en el nuevo idioma

### Requirement: Enlaces externos seguros
Los enlaces a repositorios y sitios de proyectos SHALL abrir destinos explícitos sin alterar la navegación interna del sitio.

#### Scenario: Apertura de repositorio
- **WHEN** una persona activa el enlace de repositorio de un proyecto
- **THEN** el sistema abre la URL externa indicada y conserva la posibilidad de volver al Portafolio
