# Design

## Context

La vista `app/[lang]/contacto/page.tsx` define un arreglo de cinco redes sociales y actualmente renderiza cada enlace como texto más una flecha. El proyecto no declara una biblioteca de íconos en `package.json`, por lo que la solución debe considerar el costo y la coherencia visual de introducir una dependencia o de mantener íconos locales.

## Goals / Non-Goals

**Goals:**

- Representar las cinco redes sociales con íconos consistentes y reconocibles.
- Mantener destinos, atributos de seguridad de enlaces externos, layout responsivo y accesibilidad.
- Evitar que los íconos dependan del texto visible para comunicar su propósito.

**Non-Goals:**

- Cambiar URLs, orden, redes incluidas o enlace de WhatsApp.
- Modificar el formulario, su validación, i18n o el contenido de los diccionarios.
- Rediseñar globalmente los botones o añadir un sistema de íconos para otras páginas.

## Decisions

1. **Mantener la configuración de enlaces separada de la presentación.** Extender cada entrada con una identidad de red y renderizarla mediante una selección explícita de ícono. Esto conserva los href existentes y evita inferir la red desde la URL.

2. **Usar íconos vectoriales aptos para React y estilizados con las clases existentes.** Se evaluará primero una solución local o una dependencia ya disponible; si se agrega una dependencia, debe ser pequeña y compatible con el stack actual. Los íconos serán decorativos (`aria-hidden`) y el enlace tendrá un nombre accesible mediante `aria-label`.

3. **Conservar el área interactiva del enlace.** El enlace seguirá siendo un elemento `Link` con estilos de borde, foco y hover, y mantendrá un tamaño cómodo para interacción táctil aunque ya no muestre el nombre visualmente.

4. **Verificar por locales y accesibilidad.** Las pruebas deben comprobar la existencia de los cinco enlaces por nombre accesible en Contacto y que cada uno conserva su destino; la apariencia se revisará en los breakpoints actuales.

## Risks / Trade-offs

- [Riesgo] Una dependencia nueva aumenta el bundle y la superficie de mantenimiento → Preferir íconos locales o una biblioteca ya instalada; justificar cualquier cambio en dependencias.
- [Riesgo] Un ícono sin etiqueta puede ser ambiguo para lectores de pantalla → Mantener `aria-label`/nombre accesible en cada enlace y ocultar el SVG decorativo.
- [Riesgo] El reemplazo de texto reduce la claridad para usuarios que no reconocen marcas → Usar formas oficiales o ampliamente reconocibles, además de conservar el nombre accesible y estados de foco visibles.

## Migration Plan

No hay migración de datos ni cambios de API. Implementar la vista, actualizar las pruebas relevantes y validar las rutas localizada; el rollback consiste en revertir el cambio de presentación y cualquier dependencia añadida.
