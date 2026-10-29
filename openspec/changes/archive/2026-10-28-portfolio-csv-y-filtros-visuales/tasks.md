# Tasks

## 1. Migración y contrato de datos

- [x] 1.1 Crear el CSV UTF-8 con cabecera, los 19 proyectos actuales, columnas localizadas y representación documentada de tags; verificar conteo, slugs, imágenes y enlaces contra la fuente vigente.
- [x] 1.2 Implementar el parser/adaptador en `lib/projects.ts`, conservando `Project`, `projects` y `projectTags`, validando campos obligatorios y omitiendo URLs vacías; verificar con pruebas que un registro CSV válido produce un proyecto equivalente.
- [x] 1.3 Cubrir comillas, comas, acentos, tags múltiples y registros inválidos del CSV; verificar que las pruebas de parsing reporten fila/columna y no acepten proyectos parciales.

## 2. Presentación de filtros

- [x] 2.1 Rediseñar la estructura visual de filtros, contador y limpieza en `PortfolioGrid` sin modificar `selected`, `toggleTag`, `updateTags` ni el parámetro `tags`; verificar que filtros individuales, combinados y limpieza mantengan los resultados actuales.
- [x] 2.2 Añadir estilos semánticos en `globals.css` para estados activo/inactivo, hover, `focus-visible`, contador y temas claro/oscuro; verificar contraste, foco visible y `aria-pressed` mediante pruebas de teclado.
- [x] 2.3 Actualizar o añadir pruebas e2e del Portafolio para catálogo inicial, filtros sin resultados, cambio de locale con filtro y enlaces externos; verificar que la suite de Playwright pase sin cambios en la navegación pública.

## 3. Integración

- [x] 3.1 Ejecutar validación de tipos, lint y pruebas relevantes; verificar que la página localizada consuma exclusivamente los datos del CSV y que el build de producción complete correctamente.
