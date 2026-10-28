# Tasks

## 1. Diccionarios

- [x] 1.1 En `lib/dictionaries/es.json`: renombrar `home.stackLabel` a `home.techLabel` con valor "tecnologías preferidas", agregar `home.techValue` con valor "Java + Spring Boot", renombrar `cv.preferredStack` a `cv.preferredTechnologies` con valor "Tecnologías preferidas" y `cv.preferredStackValue` a `cv.preferredTechnologiesValue` con valor "Java + Spring Boot"; verificar que el JSON sigue siendo válido (`node -e "require('./lib/dictionaries/es.json')"`)
- [x] 1.2 Repetir el paso 1.1 en `lib/dictionaries/en.json` con "preferred technologies" / "Preferred technologies" / "Java + Spring Boot" y verificar validez del JSON
- [x] 1.3 Repetir el paso 1.1 en `lib/dictionaries/pt.json` con "tecnologias preferidas" / "Tecnologias preferidas" / "Java + Spring Boot" y verificar validez del JSON

## 2. Componentes

- [x] 2.1 En `app/[lang]/cv/page.tsx`: actualizar las referencias a `cv.preferredStack` y `cv.preferredStackValue` por `cv.preferredTechnologies` y `cv.preferredTechnologiesValue`; verificar que no queden referencias (`grep -r "preferredStack" app/ lib/` sin resultados)
- [x] 2.2 En `app/[lang]/page.tsx`: reemplazar el literal `"Angular + Spring Boot"` por `home.techValue` y la referencia a `home.stackLabel` por `home.techLabel`; verificar que no queden referencias a `stackLabel` ni "Angular + Spring Boot" en `app/`

## 3. Verificación

- [x] 3.1 Ejecutar el typecheck/build del proyecto (según `package.json`) y verificar que compila sin errores
- [x] 3.2 Actualizar `openspec/specs/perfil-profesional/spec.md` desde el delta (merge de `specs/perfil-profesional/spec.md` del cambio) y verificar con `openspec validate` que el cambio valida sin errores

## Workflow follow-up

- Archivar el cambio cuando la revisión del proyecto lo permita.
