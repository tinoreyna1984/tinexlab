# Spec Delta

## MODIFIED Requirements

### Requirement: CV completo
La página de CV SHALL mostrar experiencia laboral, educación, skills técnicos y dominio de idiomas.

#### Scenario: Consulta de trayectoria
- **WHEN** una persona visita CV
- **THEN** puede consultar los puestos, organizaciones, ubicaciones, periodos y descripciones de experiencia y educación

#### Scenario: Consulta de skills
- **WHEN** una persona consulta la sección de skills del CV
- **THEN** puede distinguir frontend, backend, herramientas de gestión, herramientas preferidas, tecnologías preferidas y otras capacidades

#### Scenario: CV localizado
- **WHEN** una persona cambia el locale del CV
- **THEN** las etiquetas, títulos y descripciones del CV aparecen traducidos sin perder los datos de trayectoria
