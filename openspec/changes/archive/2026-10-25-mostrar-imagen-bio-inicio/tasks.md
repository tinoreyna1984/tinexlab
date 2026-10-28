# Tasks

## 1. Localización del texto alternativo

- [x] 1.1 Agregar la clave `home.bioImageAlt` a `lib/dictionaries/es.json`, `en.json` y `pt.json` con un texto descriptivo en cada idioma, y verificar que `npm run lint` pase sin errores de tipo por la nueva clave
- [x] 1.2 Confirmar que `getDictionary` sigue exponiendo `home.bioImageAlt` en los tres locales revisando el tipado de `lib/dictionaries.ts` (verificación: `npm run lint` sin errores de TypeScript)

## 2. Reemplazo del monograma por la imagen

- [x] 2.1 En `app/[lang]/page.tsx`, importar `Image` de `next/image` y sustituir el `<span>` del monograma "T." por `<Image src="/bio.jpg" ... />` usando dimensiones intrínsecas 960×959, `alt={home.bioImageAlt}` y clases responsivas (`aspect-square object-cover rounded-full` + tamaño acotado móvil/escritorio), verificando que `npm run build` compila sin errores
- [x] 2.2 Verificar en el navegador (o con un test e2e) que la imagen biográfica se renderiza en la tarjeta de Inicio en lugar del monograma, sin desbordes ni deformación en viewport móvil y de escritorio (verificación: comportamiento visible y `npm run build` exitoso)

## 3. Verificación de accesibilidad y locales

- [x] 3.1 Verificar que la imagen presenta texto alternativo descriptivo distinto de vacío en cada locale (es/en/pt), conforme al requisito "Imagen informativa" de `perfil-profesional` (verificación: inspección del DOM por locale o test e2e)
- [x] 3.2 Ejecutar `npm run lint` y `npm run build` completos y confirmar que pasan sin errores ni regresiones en otras secciones

## 4. Reestructuración de la tarjeta con grid responsivo

- [x] 4.1 En `app/[lang]/page.tsx`, reestructurar la tarjeta de Inicio en un grid responsivo que muestre la imagen junto al `<dl>` (dos columnas en pantallas anchas, apilado en móvil), con bordes `rounded-3xl` iguales a los del contenedor y proporción de imagen preservada (sin estirar); verificar con `npm run build` sin errores
- [x] 4.2 Ajustar `e2e/bio-image.spec.ts` a la nueva disposición (imagen junto a los datos, mismo radio de borde que el contenedor, sin desbordes ni deformación) y verificar con la suite e2e completa que pasa sin regresiones
- [x] 4.3 Ejecutar `npm run lint` y `npm run build` completos y confirmar que pasan sin errores ni regresiones en otras secciones

## Workflow follow-up

- Archive the change after the project's review requirements are satisfied.
- Verify the archived result.
