# Spec Delta

## MODIFIED Requirements

### Requirement: Página de Inicio
La página de Inicio SHALL mostrar explícitamente el nombre `Tino Reyna`, el rol profesional, el resumen biográfico y llamadas a la acción hacia CV, Portafolio y Contacto. El nombre SHALL aparecer entre la identificación profesional y el titular principal, y SHALL estar disponible en el locale activo.

#### Scenario: Consulta de Inicio
- **WHEN** una persona visita Inicio
- **THEN** encuentra el nombre `Tino Reyna`, una presentación breve, datos de contacto principales y enlaces para continuar explorando el perfil

#### Scenario: Jerarquía de identidad
- **WHEN** una persona observa la sección principal de Inicio
- **THEN** encuentra el eyebrow profesional, después el nombre y luego el titular de propuesta de valor

#### Scenario: Inicio localizado
- **WHEN** una persona visita Inicio con un locale soportado
- **THEN** los textos visibles aparecen en ese idioma y el nombre permanece disponible como identidad del perfil
