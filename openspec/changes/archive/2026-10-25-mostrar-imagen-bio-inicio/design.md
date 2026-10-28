# Design

## Context

La página de Inicio (`app/[lang]/page.tsx`, componente `HomePageContent`) renderiza una tarjeta lateral (`<aside>`). La primera pasada de implementación reemplazó el monograma de texto por `bio.jpg` (JPEG, 960×959 px, casi cuadrado) con `next/image` en un avatar circular (`rounded-full`) dentro de una cabecera `flex items-center justify-between`; esta revisión del plan cambia esa disposición por un grid responsivo junto a los datos, con bordes iguales a los del contenedor. El proyecto ya depende de `next/image` y lo usa en `components/site-header.tsx`, `components/portfolio-grid.tsx` y `app/[lang]/intereses/page.tsx`. Los textos localizados viven en `lib/dictionaries/{es,en,pt}.json` bajo la sección `home`, con locales en `lib/i18n.ts`. Ver proposal.md - Why.

## Goals / Non-Goals

**Goals:**

- Reemplazar el monograma "T." por `bio.jpg` usando `next/image`.
- Mantener la imagen fluida y sin distorsión entre breakpoints móvil y escritorio.
- Proveer texto alternativo descriptivo localizado (es/en/pt).

**Non-Goals:**

- Cambiar el contenido del resto de la tarjeta (datos de contacto, enlaces) o el diseño general de la página.
- Optimizar o recomprimir `bio.jpg` (ya es un JPEG progresivo razonable).
- Agregar lightbox, galería o interacción con la imagen.
- Tocar otras páginas o secciones del sitio.

## Decisions

**D1: Usar `next/image` en lugar de `<img>` nativo.**
Rationale: es la convención establecida en el proyecto (header, portafolio, intereses); aporta `priority`/`sizes`, lazy-loading y optimización automática sin dependencias nuevas.
Alternativa descartada: `<img>` nativo - requeriría manualmente dimensiones, loading y no aprovecha la configuración de `next.config.ts`.

**D2: Grid responsivo con la imagen junto al `<dl>`, dimensiones intrínsecas y proporción preservada.**
La imagen es casi cuadrada (960×959). La tarjeta se estructura en un grid: en pantallas anchas la imagen ocupa una columna junto a los datos de contacto (`<dl>`) y en móvil se apila sobre ellos, de modo que la imagen queda a la altura del resto de la descripción. Se declara con `width`/`height` intrínsecos y clases de tamaño responsivas (p. ej. `aspect-square object-cover rounded-3xl` con ancho de columna de grid), de modo que la proporción natural se preserva sin estirarse y sin desbordes. `object-cover` solo recorta el mínimo sobrante 960×959 (≈1:1) para llenar la celda sin distorsión.
Alternativa descartada: cabecera `flex items-center justify-between` con la imagen en una esquina (la primera pasada) - no cumple con que la imagen esté a la altura de la descripción ni con el uso de grid; `fill` dentro de un contenedor `relative` - aporta complejidad de posicionamiento innecesaria y requiere dimensiones de contenedor explícitas.

**D3: Texto alternativo localizado agregando una clave `home.bioImageAlt` en los tres diccionarios.**
Rationale: la imagen es informativa (aporta información personal), y el requisito existente de accesibilidad exige texto alternativo equivalente e idiomatico. El patrón de agregar claves bajo `home` ya existe. El componente recibe `home` del diccionario, por lo que basta con exponer la clave.
Alternativa descartada: cadena hardcodeada en español - rompe la localización en `en`/`pt`; `alt=""` (decorativa) - incorrecto porque la imagen sí informa.

**D4: Mismo estilo de bordes redondeados que el contenedor (`rounded-3xl`).**
Rationale: la propuesta exige que la imagen tenga el mismo estilo de bordes redondeados que el elemento que la contiene; el `<aside>` usa `rounded-3xl`, así que la imagen lo replica, integrándose con el lenguaje visual de la tarjeta (badges redondeados, `rounded-3xl`).
Alternativa descartada: avatar circular `rounded-full` (la primera pasada) - contradice la propuesta al usar un radio de borde distinto al del contenedor.

## Risks / Trade-offs

- [Desequilibrio visual entre la columna de la imagen y la de los datos en el grid] → Se define el ancho de columna con clases responsivas acotadas y se verifica en móvil y escritorio.
- [Pérdida de contexto si el locale no tiene la clave `bioImageAlt`] → Se agregan las tres claves (`es`, `en`, `pt`) en la misma tarea; se valida el render por locale.
- [`object-cover` recorta los bordes de una imagen casi cuadrada] → El recorte es mínimo (960×959 ≈ 1:1) necesario para llenar la celda del grid sin distorsión; la proporción percibida se preserva.

## Migration Plan

Cambio visual localizado y reversible: un solo componente y tres claves de diccionario. Rollback = restaurar el `<span>` del monograma y retirar la clave `bioImageAlt`. Sin cambios de datos, rutas ni API; sin pasos de despliegue especiales.

## Open Questions

- Dimensiones finales exactas del avatar (px en móvil vs. escritorio): se resolverán en la implementación ajustando las clases según el resultado visual, sin afectar specs ni desglose de tareas.
