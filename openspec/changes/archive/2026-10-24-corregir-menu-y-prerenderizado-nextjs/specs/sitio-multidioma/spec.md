# Spec Delta

## ADDED Requirements

### Requirement: Resolución de locale compatible con navegación instantánea
Las rutas localizadas SHALL resolver los datos de URL dentro de contenido que pueda suspenderse y SHALL evitar advertencias de `instant-shell-url-data` durante cargas y navegaciones.

#### Scenario: Carga inicial de una ruta localizada
- **WHEN** una persona abre una ruta localizada en desarrollo o producción
- **THEN** el sistema muestra un estado de carga útil mientras resuelve el locale y después presenta el contenido traducido correspondiente

#### Scenario: Navegación entre secciones
- **WHEN** una persona navega entre dos secciones localizadas mediante un enlace interno
- **THEN** la navegación no genera errores de URL data en la consola y conserva el idioma seleccionado

#### Scenario: Navegación con filtro
- **WHEN** una persona navega al Portafolio con parámetros de filtro
- **THEN** los parámetros se resuelven dentro de su límite interactivo y no bloquean ni generan advertencias en el shell compartido
