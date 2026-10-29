# Design

## Context

El catálogo actual se construye con un helper y un arreglo en `lib/projects.ts`; la página localiza esos objetos antes de pasarlos a `PortfolioGrid`. El componente cliente conserva el estado de filtros en la query `tags`, combina tags con lógica AND y ya expone `aria-pressed`. Los estilos globales disponen de tokens para superficie, borde, acento y ambos temas.

## Goals / Non-Goals

**Goals:**
- Definir un único archivo CSV como fuente editable del catálogo y convertir sus columnas en objetos `Project` tipados.
- Detectar registros mal formados de manera explícita durante la carga, evitando proyectos parcialmente válidos.
- Mejorar la jerarquía visual de filtros, selección, conteo y limpieza aprovechando tokens existentes.
- Mantener la URL, la lógica de combinación, la localización y la accesibilidad observable.

**Non-Goals:**
- No cambiar el número o contenido editorial de los proyectos salvo su representación en CSV.
- No introducir un CMS, endpoint remoto, nueva dependencia de parsing o un nuevo modelo público.
- No rediseñar las tarjetas ni modificar la navegación externa.

## Decisions

1. **CSV versionado dentro del proyecto.** Se usará un archivo UTF-8 con cabecera y columnas planas para valores simples; títulos y descripciones tendrán columnas `es`, `en` y `pt`, y los tags se serializarán con un separador documentado. Esto permite edición directa y revisión por diff, en lugar de JSON (más cercano al código) o una fuente remota (innecesaria para contenido estático).

2. **Adaptador de datos en `lib/projects.ts`.** El módulo conservará `Project` como contrato interno y expondrá el mismo `projects`/`projectTags` que consume la página. El adaptador normalizará rutas de imagen, URLs vacías y tags, y validará campos obligatorios; así la interfaz no conoce el formato CSV y la migración no altera sus consumidores.

3. **Carga compatible con el modelo de renderizado actual.** La lectura se hará en el servidor antes de construir los datos localizados, con manejo determinista de errores de formato. No se agregará una API ni estado cliente para el catálogo.

4. **Presentación mediante clases semánticas de filtros.** `PortfolioGrid` conservará `selected`, `toggleTag`, `updateTags` y el contrato de query. Se añadirán estructura y clases para agrupación, badges/contador, estados `aria-pressed`, hover y focus-visible; CSS usará variables de tema y no dependerá de colores fijos que rompan el modo oscuro.

5. **Validación orientada a regresión.** Se cubrirá el parsing del CSV, equivalencia del catálogo, filtros por uno/múltiples tags, limpieza, URL y navegación por teclado. Las pruebas existentes de Playwright serán la referencia para comportamiento visible.

## Risks / Trade-offs

- [CSV mal escapado o con delimitadores dentro de texto] → usar un parser que respete comillas RFC 4180 y agregar una prueba con campos localizados que contengan comas.
- [Un registro inválido deja el catálogo inutilizable] → validar al cargar, reportar la columna/fila problemática y probar el comportamiento de error en desarrollo/CI.
- [Diseño vistoso reduce contraste] → conservar indicadores textuales y `aria-pressed`, validar focus-visible y contraste en ambos temas.
- [Diferencias entre número de registros y documentación histórica] → verificar que el CSV conserve los 19 proyectos y actualizar solo referencias de implementación necesarias.

## Migration Plan

1. Crear el CSV a partir del catálogo vigente y comparar conteo, slugs, tags, enlaces e imágenes.
2. Implementar el adaptador manteniendo la exportación consumida por la página.
3. Aplicar la presentación de filtros y ejecutar pruebas unitarias/e2e.
4. Si la validación falla, revertir el adaptador y conservar temporalmente la fuente actual mientras se corrigen los registros; el rollback no requiere migración de datos externa.

## Open Questions

No hay preguntas abiertas que cambien el contrato o el desglose de implementación.
