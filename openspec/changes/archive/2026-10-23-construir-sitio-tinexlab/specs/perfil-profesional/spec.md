# Spec Delta

## Purpose

Presenta de forma clara y localizada la identidad profesional de Tinexlab, su trayectoria, capacidades técnicas y áreas de interés personal.

## ADDED Requirements

### Requirement: Página de Inicio
La página de Inicio SHALL mostrar el nombre, rol profesional, resumen biográfico y llamadas a la acción hacia CV, Portafolio y Contacto.

#### Scenario: Consulta de Inicio
- **WHEN** una persona visita Inicio
- **THEN** encuentra una presentación breve, datos de contacto principales y enlaces para continuar explorando el perfil

#### Scenario: Inicio localizado
- **WHEN** una persona visita Inicio con un locale soportado
- **THEN** los textos visibles aparecen en ese idioma

### Requirement: CV completo
La página de CV SHALL mostrar experiencia laboral, educación, skills técnicos y dominio de idiomas.

#### Scenario: Consulta de trayectoria
- **WHEN** una persona visita CV
- **THEN** puede consultar los puestos, organizaciones, ubicaciones, periodos y descripciones de experiencia y educación

#### Scenario: Consulta de skills
- **WHEN** una persona consulta la sección de skills del CV
- **THEN** puede distinguir frontend, backend, herramientas de gestión, herramientas preferidas, stack preferido y otras capacidades

#### Scenario: CV localizado
- **WHEN** una persona cambia el locale del CV
- **THEN** las etiquetas, títulos y descripciones del CV aparecen traducidos sin perder los datos de trayectoria

### Requirement: Página de Intereses
La página de Intereses SHALL presentar música, lectura y deportes de combate con sus textos e imágenes descriptivas.

#### Scenario: Consulta de intereses
- **WHEN** una persona visita Intereses
- **THEN** encuentra las tres áreas de interés con una descripción y recurso visual cuando esté disponible

#### Scenario: Intereses localizados
- **WHEN** una persona visita Intereses en inglés o portugués
- **THEN** los nombres y descripciones de las áreas aparecen en el locale seleccionado

### Requirement: Accesibilidad del contenido
Las páginas de perfil SHALL usar títulos jerárquicos, textos alternativos descriptivos y controles navegables mediante teclado.

#### Scenario: Navegación por teclado
- **WHEN** una persona recorre Inicio, CV o Intereses usando teclado
- **THEN** puede identificar el foco y activar todos los enlaces y controles relevantes

#### Scenario: Imagen informativa
- **WHEN** se presenta una imagen que aporta información
- **THEN** la imagen tiene un texto alternativo equivalente
