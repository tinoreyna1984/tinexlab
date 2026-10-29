# Design

## Context

La página actual conserva un grid de dos columnas diseñado para el formulario eliminado: el correo ocupa un panel independiente y los canales sociales quedan en un `aside`, lo que produce una composición visual desequilibrada. La página usa Tailwind CSS, mantiene las traducciones en tres diccionarios y ya dispone de pruebas Playwright para el correo, redes sociales y WhatsApp.

## Goals / Non-Goals

**Goals:**

- Crear una composición visual equilibrada que use el espacio disponible sin depender de la altura de un formulario.
- Dar prioridad visual al correo directo y agrupar de forma clara las alternativas de contacto.
- Mantener accesibilidad, localización y enlaces existentes.
- Garantizar una experiencia usable en móvil, tablet y escritorio.

**Non-Goals:**

- No recuperar ni reemplazar el formulario.
- No cambiar la dirección de correo, URLs sociales o enlace de WhatsApp.
- No añadir nuevas dependencias, servicios externos ni contenido dinámico.
- No rediseñar el resto del sitio ni modificar las rutas públicas.

## Decisions

- **Usar una composición de contacto unificada y flexible.** El correo y los canales complementarios se presentarán como bloques relacionados dentro de una estructura que pueda pasar de una columna a varias según el ancho disponible. Esto evita conservar artificialmente la separación del formulario eliminado.
- **Mantener el correo como enlace visible y copiable.** El correo seguirá siendo texto real dentro de un enlace `mailto:`, con estilos de foco visibles y suficiente contraste. Se descarta ocultarlo en un botón ambiguo porque la dirección debe poder copiarse.
- **Adaptar el layout con puntos de ruptura existentes.** Se usarán utilidades responsive de Tailwind y anchos flexibles, evitando dimensiones fijas que causen scroll horizontal. En móvil los bloques se apilarán; en anchos mayores podrán distribuirse horizontalmente.
- **Verificar comportamiento, no coordenadas visuales rígidas.** Las pruebas comprobarán enlaces, accesibilidad y ausencia de desbordamiento en varios viewports; la composición podrá evolucionar sin acoplarse a una posición exacta.

## Risks / Trade-offs

- [Una composición más compacta puede reducir la separación visual entre canales] → Usar jerarquía tipográfica, agrupación semántica y espacios consistentes.
- [Textos traducidos de distinta longitud pueden alterar el layout] → Probar los tres idiomas en viewports móviles y de escritorio con contenido flexible.
- [Las pruebas responsive pueden ser sensibles al navegador] → Verificar propiedades observables como `scrollWidth <= clientWidth`, visibilidad y accesibilidad, en vez de depender solo de capturas.

## Migration Plan

1. Rediseñar el markup y las clases de la página de Contacto manteniendo los mismos enlaces y diccionarios.
2. Actualizar o añadir pruebas Playwright para los tres idiomas y viewports representativos.
3. Ejecutar lint, build y las pruebas end-to-end.
4. Desplegar el cambio; si la composición presenta problemas, revertir el archivo de la página y las pruebas asociadas sin migración de datos.
