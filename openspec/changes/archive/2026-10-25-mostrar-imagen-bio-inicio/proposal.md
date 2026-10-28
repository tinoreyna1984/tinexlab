# Proposal

## Why

La tarjeta de presentación de la página de Inicio muestra actualmente un monograma de texto ("T.") en lugar de una imagen real de la persona. Ya existe el recurso `public/bio.jpg`, pero no se usa en ningún punto del sitio. Mostrar la fotografía biográfica humaniza la presentación inicial y aprovecha un activo ya disponible.

## What Changes

- Reemplazar el `<span>` del monograma "T." en la tarjeta lateral (aside) de la página de Inicio por la imagen `bio.jpg`.
- Renderizar la imagen con `next/image`, respetando las convenciones ya usadas en el proyecto (`portfolio-grid`, `site-header`, `intereses`).
- Asegurar la responsividad de la imagen y de su contenedor: tamaño fluido entre breakpoints móviles y de escritorio, sin desbordes ni distorsión de la relación de aspecto.
- La imagen debe estar a la altura del resto de la descripción —visualmente acorde, preservando su proporción natural sin estirarse— y con el mismo estilo de bordes redondeados que el elemento que la contiene. Emplear grid responsivo que muestre la imagen junto a los datos de contacto en pantallas anchas y las apile en móvil.
- Incluir texto alternativo descriptivo e idiomatico (por locale), conforme al requisito existente de accesibilidad de contenido.

## Capabilities

### New Capabilities

<!-- Ninguna -->

### Modified Capabilities

- `perfil-profesional`: se agrega un requisito sobre la imagen biográfica en la tarjeta de presentación de Inicio, con requerimientos explícitos de responsividad, integración visual con la tarjeta y texto alternativo accesible. El comportamiento existente de "Página de Inicio" no cambia.

## Impact

- Código afectado: `app/[lang]/page.tsx` (componente `HomePageContent`, sección `aside`).
- Recurso existente reutilizado: `public/bio.jpg` (JPEG, 960×959 px, casi cuadrado).
- Dependencia existente: `next/image` (ya usada en el proyecto; sin nuevas dependencias).
- Diccionarios (`lib/dictionaries`) si se agrega una cadena localizada para el texto alternativo.
- Tests e2e: `e2e/bio-image.spec.ts` (verificación de render, responsividad y accesibilidad).
- Sin cambios de API, rutas, datos ni comportamiento de otras secciones.
