# Design

## Context

La página localizada de Inicio obtiene el contenido `home` desde los diccionarios de `lib/dictionaries` y actualmente renderiza el eyebrow seguido directamente por el `h1` de propuesta de valor. La sección hero ya usa un layout responsive y estilos tipográficos compartidos.

## Goals / Non-Goals

**Goals:**
- Añadir una clave `name` al contenido localizado de Inicio.
- Renderizar el nombre en el hero entre el eyebrow y el titular, con una jerarquía visual clara.
- Mantener la estructura responsive, accesibilidad semántica y las acciones existentes.

**Non-Goals:**
- No cambiar el titular, rol, fotografía, datos de contacto ni llamadas a la acción.
- No crear una nueva ruta, componente independiente o mecanismo de traducción.
- No modificar el contenido de CV, Portafolio o Contacto.

## Decisions

1. **Usar los diccionarios existentes.** La clave `name` se añadirá a `home` en español, inglés y portugués. Aunque el nombre propio no se traduzca, mantenerlo en cada diccionario evita que la página dependa de un literal y conserva el patrón de localización existente.

2. **Ubicar el nombre antes del `h1`.** El orden eyebrow → nombre → propuesta establece primero el contexto profesional, después la identidad y finalmente el mensaje principal. Es preferible a colocarlo en la tarjeta lateral, donde competiría con la fotografía y los datos de contacto.

3. **Usar un encabezado secundario.** El nombre se presentará como `h2` o elemento tipográfico equivalente dentro del hero, sin reemplazar el único `h1` de la página. Esto conserva una jerarquía accesible y permite que el titular siga siendo la propuesta principal.

4. **Verificar por locale y orden DOM.** Las pruebas comprobarán que el nombre aparece en las tres rutas localizadas y que su posición precede al titular, además de confirmar que las llamadas a la acción siguen presentes.

## Risks / Trade-offs

- [El nombre puede competir visualmente con el titular] → usar un tamaño intermedio y el mismo sistema de color/tipografía del hero.
- [Una clave faltante rompe el renderizado localizado] → actualizar los tres diccionarios y cubrirlos en pruebas.
- [Un encabezado adicional puede alterar selectores existentes] → conservar el `h1` actual y validar la jerarquía en pruebas e2e.

## Migration Plan

1. Añadir la clave `name` en los tres diccionarios.
2. Renderizarla entre el eyebrow y el titular principal.
3. Actualizar pruebas de Inicio y ejecutar lint, tipos y build.
4. Revertir únicamente la nueva clave y el bloque visual si se detecta una regresión; no hay datos persistentes ni migración externa.

## Open Questions

No hay preguntas abiertas que cambien el alcance o la solución propuesta.
