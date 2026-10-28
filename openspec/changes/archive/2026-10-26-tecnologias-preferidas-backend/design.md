# Design

## Context

El texto visible viene de los diccionarios `lib/dictionaries/{es,en,pt}.json`. El CV usa las claves `cv.preferredStack` y `cv.preferredStackValue`; el highlight de Inicio usa `home.stackLabel` pero el valor está hardcodeado en `app/[lang]/page.tsx` como `"Angular + Spring Boot"`. Ver proposal.md para la motivación.

## Goals / Non-Goals

**Goals:**
- Un solo lugar (diccionario) para la etiqueta y el valor de las tecnologías preferidas, usado por Inicio y CV.
- Textos nuevos en los tres locales.

**Non-Goals:**
- Cambiar las listas de skills (Angular permanece en Frontend).
- Reestructurar otros textos del CV o Inicio.

## Decisions

- **Renombrar claves**: `home.stackLabel` → `home.techLabel`, `cv.preferredStack` → `cv.preferredTechnologies`, `cv.preferredStackValue` → `cv.preferredTechnologiesValue`, y nueva `home.stackValue` → `home.techValue`. Alternativa: conservar los nombres viejos y solo cambiar valores; descartada porque los nombres ya no describen el contenido y dejan código ambiguo.
- **Valor compartido**: el valor "Java + Spring Boot" se define en ambas secciones del diccionario (`home.techValue` y `cv.preferredTechnologiesValue`) en lugar de una única clave reutilizada. Alternativa: que Inicio lea `cv.preferredTechnologiesValue`; descartada porque acoplaría secciones independientes del diccionario.
- **Formato del valor**: "Java + Spring Boot", consistente con el formato actual ("Angular + Spring Boot") y con otros valores del diccionario.

## Risks / Trade-offs

- [Referencias olvidadas a claves viejas rompen TypeScript o renderizado] → Buscar todas las referencias (`grep stackLabel|preferredStack`) antes de cerrar y verificar el typecheck/build.
- [Traducciones inconsistentes entre locales] → Actualizar es, en y pt en la misma tarea.

## Open Questions

<!-- ninguna -->
