# Spec Delta

## Purpose

Permite explorar los proyectos profesionales y personales de Tinexlab mediante información localizada, clasificación por tecnologías y enlaces externos relevantes.

## ADDED Requirements

### Requirement: Catálogo de proyectos
La página de Portafolio SHALL mostrar los 19 proyectos migrados, cada uno con título, descripción, año, tecnologías, imagen y enlaces disponibles.

#### Scenario: Catálogo inicial
- **WHEN** una persona visita Portafolio sin filtros
- **THEN** el sistema muestra los 19 proyectos disponibles

#### Scenario: Proyecto sin sitio publicado
- **WHEN** un proyecto no tiene sitio publicado
- **THEN** el sistema conserva el enlace al repositorio y no muestra un enlace de sitio inválido

### Requirement: Filtrado por tags
La página de Portafolio SHALL permitir filtrar el catálogo por uno o más tags de tecnología y SHALL ofrecer una forma de regresar al catálogo completo.

#### Scenario: Filtro por tecnología
- **WHEN** una persona selecciona el tag `React`
- **THEN** el sistema muestra únicamente los proyectos asociados con React

#### Scenario: Limpieza del filtro
- **WHEN** una persona limpia el filtro activo
- **THEN** el sistema vuelve a mostrar todos los proyectos

#### Scenario: Tag sin coincidencias
- **WHEN** una combinación de tags no tiene proyectos asociados
- **THEN** el sistema informa que no existen resultados y mantiene disponible la acción de limpiar filtros

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
