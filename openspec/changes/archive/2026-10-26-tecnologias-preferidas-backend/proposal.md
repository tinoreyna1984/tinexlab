# Proposal

## Why

El sitio presenta "Angular + Spring Boot" como stack preferido, pero la actividad profesional actual se concentra en backend con Java y Spring Boot. La etiqueta "stack preferido" además es ambigua: "Angular" sigue siendo una habilidad de frontend en el CV, no parte del enfoque destacado.

## What Changes

- Renombrar la etiqueta "Stack preferido" (y sus equivalentes en inglés y portugués) por "Tecnologías preferidas" en el CV.
- Cambiar el valor destacado de "Angular + Spring Boot" a "Java + Spring Boot".
- Actualizar la etiqueta del highlight de Inicio ("stack preferido" → "tecnologías preferidas") y sustituir el valor fijo `"Angular + Spring Boot"` en `app/[lang]/page.tsx` por una clave de diccionario, para que Inicio y CV compartan la misma fuente.
- Renombrar las claves del diccionario (`stackLabel`, `preferredStack`, `preferredStackValue`) a nombres que reflejen el nuevo texto.
- Angular permanece en la lista de habilidades de Frontend del CV; no se elimina contenido.

## Capabilities

### New Capabilities

<!-- ninguna -->

### Modified Capabilities

- `perfil-profesional`: el escenario "Consulta de skills" pasa de distinguir "stack preferido" a distinguir "tecnologías preferidas" como categoría del CV, alineado con el enfoque backend del perfil.

## Impact

- `lib/dictionaries/es.json`, `lib/dictionaries/en.json`, `lib/dictionaries/pt.json`: claves `home.stackLabel`, `cv.preferredStack`, `cv.preferredStackValue` renombradas y con nuevos valores; nueva clave `home.stackValue`.
- `app/[lang]/page.tsx`: línea del highlight de stack deja de usar texto fijo.
- `app/[lang]/cv/page.tsx`: referencias a `cv.preferredStack` / `cv.preferredStackValue`.
- `openspec/specs/perfil-profesional/spec.md`: actualización del escenario de skills.
