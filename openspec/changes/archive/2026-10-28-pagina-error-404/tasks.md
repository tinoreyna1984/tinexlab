# Tasks

## 1. Diccionarios localizados

- [x] 1.1 Agregar la sección `notFound` (título, mensaje, texto alternativo de la imagen y etiqueta del enlace al inicio) a `lib/dictionaries/es.json`, verificando que la estructura quede dentro del mismo patrón de secciones que `nav` o `footer`
- [x] 1.2 Agregar las claves equivalentes `notFound` a `lib/dictionaries/en.json` y `lib/dictionaries/pt.json`, verificando con `npx tsc --noEmit` que el typecheck pasa (el tipo `Record<Locale, Dictionary>` valida la paridad de claves entre los tres idiomas)

## 2. Panel de presentación

- [x] 2.1 Crear `components/not-found-panel.tsx` como componente cliente que resuelve el locale con `useParams()` (fallback `"es"`), renderiza `next/image` de `/404.jpg` con `width={982} height={551}` y ancho responsivo, muestra los textos del diccionario del locale y el enlace al inicio con `localizedPath()`, exponiendo `data-testid="not-found-panel"`; verificar con `npm run lint` y `npx tsc --noEmit` sin errores

## 3. Boundaries not-found y prueba básica

- [x] 3.1 Crear `components/locale-shell.tsx` con el chrome del sitio (header, main, footer, toast de tema) y usarlo en `app/[lang]/layout.tsx` sin cambiar su comportamiento; verificar con `npm run lint`, `npx tsc --noEmit` y con `next start` que una ruta real (p. ej. `/es/cv`) sigue renderizando header y footer
- [x] 3.2 Crear `app/not-found.tsx` con `metadata` estático (título "Página no encontrada | Tinexlab") que renderiza el mismo panel con fallback a español; verificar con `npm run build` que el proyecto compila
- [x] 3.4 Modificar `proxy.ts` para adjuntar el header `x-locale` (aditivo, sin cambios de ruteo) y usarlo en `app/not-found.tsx` (con `instant = false`) para componer el chrome y los textos localizados vía `LocaleShell` + `NotFoundPanel`; verificar con build + `next start` que `/pagina-inexistente` responde 404 con el panel, el header y el footer del sitio (ver design.md D1/D2)
- [x] 3.3 Agregar `e2e/not-found.spec.ts` con el escenario base: status 404 en la respuesta, panel visible después de `waitForSplashToHide`, imagen `/404.jpg` completa y centrada, enlace al inicio con `href="/"` y copia en español; verificar con `npx playwright test e2e/not-found.spec.ts`

## 4. Localización, responsive y temas

- [x] 4.1 Extender `e2e/not-found.spec.ts` con los escenarios localizados: `/en/ruta-inexistente` (copia en inglés, enlace a `/en`), `/pt/ruta-inexistente` (copia en portugués, enlace a `/pt`) y `/xx/ruta-inexistente` (copia en español con enlace a `/`); verificar con `npx playwright test e2e/not-found.spec.ts`
- [x] 4.2 Agregar al spec e2e la aserción de viewport móvil (375 px) sin desplazamiento horizontal en la página de error; verificar con `npx playwright test e2e/not-found.spec.ts`
- [x] 4.3 Verificar manualmente en `npm run dev` la legibilidad del panel con tema claro y tema oscuro usando el selector de tema del sitio, confirmando contraste legible del texto y correcta visualización de la imagen en ambos temas

## 5. Verificación de integración

- [x] 5.1 Correr `npm run lint`, `npx tsc --noEmit` y la suite completa `npx playwright test`; verificar que todo pasa sin regresiones, en particular las pruebas e2e existentes que visitan páginas del sitio

## Workflow follow-up

- Archive the change after the project's review requirements are satisfied.
- Verify the archived result.
