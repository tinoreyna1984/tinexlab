# Spec Delta

## Purpose

Define el comportamiento del servidor de desarrollo del sitio para que las páginas se hidraten y sus controles interactivos —en particular el menú de navegación— funcionen desde los orígenes de acceso local y de red local utilizados para probar en dispositivos portátiles.

## ADDED Requirements

### Requirement: Hidratación desde orígenes de desarrollo autorizados
El servidor de desarrollo SHALL permitir los orígenes de acceso local configurados (loopback y red local) de modo que las páginas solicitadas desde ellos se hidraten y todos sus controles interactivos funcionen igual que en el build de producción.

#### Scenario: Acceso por dirección loopback
- **WHEN** una persona abre el sitio en desarrollo desde la dirección loopback en un viewport portátil
- **THEN** la página se hidrata y el menú hamburguesa abre y cierra con una sola activación cada vez

#### Scenario: Acceso desde dispositivo en red local
- **WHEN** un dispositivo portátil abre el sitio en desarrollo desde la dirección IP de red local del equipo
- **THEN** la página se hidrata, el menú hamburguesa abre y cierra, y el log del servidor no registra avisos de recursos de desarrollo bloqueados para ese origen

#### Scenario: Paridad entre orígenes locales
- **WHEN** una persona compara la interactividad del sitio en desarrollo entre `localhost`, la dirección loopback y la IP de red local
- **THEN** los tres orígenes ofrecen el mismo comportamiento operable del menú en las dimensiones de dispositivos portátiles

### Requirement: Alcance limitado al modo desarrollo
La configuración de orígenes de desarrollo SHALL aplicarse únicamente al modo desarrollo y no SHALL alterar el comportamiento del build de producción ni del sitio desplegado.

#### Scenario: Build de producción sin cambios
- **WHEN** se generan el build de producción y la suite E2E existente después del cambio de configuración
- **THEN** la matriz responsive del menú hamburguesa sigue pasando completa sin modificaciones de código
