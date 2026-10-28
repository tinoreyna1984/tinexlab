# Spec Delta

## Purpose

Permite que las personas visiten y naveguen el sitio Tinexlab en español, inglés o portugués, con URLs estables por sección y contenido localizado.

## ADDED Requirements

### Requirement: Rutas localizadas por sección
El sitio SHALL exponer Inicio, CV, Portafolio, Intereses y Contacto como rutas independientes en cada idioma soportado.

#### Scenario: Navegación en español
- **WHEN** una persona visita `/cv`
- **THEN** el sistema muestra el CV en español

#### Scenario: Navegación en inglés
- **WHEN** una persona visita `/en/portafolio`
- **THEN** el sistema muestra el Portafolio en inglés

#### Scenario: Navegación en portugués
- **WHEN** una persona visita `/pt/intereses`
- **THEN** el sistema muestra Intereses en portugués

### Requirement: Selección inicial de idioma
El sistema SHALL usar español como idioma predeterminado y SHALL considerar la preferencia de idioma del navegador para las visitas sin locale explícito.

#### Scenario: Visita sin locale
- **WHEN** una persona visita la raíz sin un idioma explícito
- **THEN** el sistema muestra o redirige a la versión en español, salvo que la preferencia del navegador coincida con inglés o portugués

#### Scenario: Locale no soportado
- **WHEN** la preferencia del navegador contiene un idioma no soportado
- **THEN** el sistema usa español

### Requirement: Cambio de idioma contextual
El selector de idioma SHALL conservar la sección actual al cambiar de idioma y SHALL mostrar el destino disponible para cada locale.

#### Scenario: Cambio desde CV
- **WHEN** una persona cambia el idioma desde `/cv` a inglés
- **THEN** el sistema navega a `/en/cv`

#### Scenario: Cambio desde Inicio
- **WHEN** una persona cambia el idioma desde Inicio a portugués
- **THEN** el sistema navega a `/pt`

### Requirement: Metadatos alternativos por locale
Cada sección SHALL publicar título, descripción y referencias `hreflang` para sus versiones disponibles en español, inglés y portugués.

#### Scenario: Indexación de una sección
- **WHEN** un rastreador solicita la página de Portafolio
- **THEN** la respuesta incluye metadata en el idioma de la ruta y enlaces alternativos a las otras versiones

#### Scenario: Recursos de rastreo
- **WHEN** un rastreador solicita el sitemap o robots
- **THEN** el sitio devuelve recursos válidos que incluyen las rutas públicas localizadas
