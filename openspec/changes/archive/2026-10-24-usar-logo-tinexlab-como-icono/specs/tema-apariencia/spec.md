# Spec Delta

## ADDED Requirements

### Requirement: Ícono de marca en la cabecera
La cabecera SHALL mostrar el archivo de logo del sitio como ícono visual junto al nombre de la marca, con tamaño responsivo que conserve la proporción de la imagen y con los efectos visuales existentes de esquinas redondeadas y rotación al pasar el cursor.

#### Scenario: Logo en viewport móvil y de escritorio
- **WHEN** una persona visita cualquier sección en un teléfono o en escritorio
- **THEN** el ícono de la cabecera muestra la imagen del logo sin deformarse, adapta su tamaño al breakpoint y mantiene la marca de texto visible junto a él

#### Scenario: Enlace de marca
- **WHEN** una persona activa el ícono de marca o su nombre en texto
- **THEN** navega a la página de inicio del idioma actual, igual que antes del cambio

#### Scenario: Nombre accesible de la marca
- **WHEN** una persona navega la cabecera con tecnología de asistencia
- **THEN** el nombre accesible del enlace de marca se anuncia una sola vez, sin duplicar el texto del ícono

### Requirement: Ícono de la ventana con el logo
La página SHALL declarar el archivo de logo del sitio como único ícono de la ventana (pestaña) del navegador en todas las rutas e idiomas.

#### Scenario: Pestaña con el logo
- **WHEN** una persona abre cualquier página del sitio en cualquier idioma
- **THEN** la pestaña del navegador muestra el logo del sitio como ícono

#### Scenario: Declaración única en el HTML
- **WHEN** se inspecciona el encabezado del documento de cualquier página
- **THEN** solo hay un ícono declarado y apunta al archivo de logo del sitio

#### Scenario: Ausencia del favicon genérico
- **WHEN** se solicita la ruta del favicon genérico de la plantilla
- **THEN** el sitio no responde con ese archivo
