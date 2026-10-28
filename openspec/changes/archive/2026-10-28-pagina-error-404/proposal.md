# Proposal

## Why

Hoy una URL inexistente muestra la página 404 por defecto de Next.js: sin identidad visual de Tinexlab, en inglés y sin enlaces para regresar al sitio. El asset `public/404.jpg` (982×551) ya existe en el proyecto pero no se usa en ninguna parte; es el momento de integrarlo en una página de error cuidada, localizada y coherente con el resto del sitio.

## What Changes

- Crear una página de error HTTP 404 personalizada que renderiza la imagen `public/404.jpg` como elemento visual central.
- La página 404 se muestra dentro del layout de idioma (con header, footer y selector de tema), conservando la navegación del sitio.
- Agregar textos localizados de la página 404 (título, mensaje y enlace "Volver al inicio") en los tres diccionarios (`es`, `en`, `pt`), con español como idioma de respaldo.
- Incluir un enlace de regreso al inicio en el locale correspondiente (p. ej. `/en` para una URL bajo `/en/...`).
- Respetar el tema claro/oscuro del sitio y usar `next/image` para servir `404.jpg` con dimensiones correctas y sin desplazamiento horizontal en móvil.
- Agregar un `not-found.tsx` en la raíz de `app/` como red de seguridad para rutas que no caigan bajo `app/[lang]/`.
- Agregar pruebas end-to-end (Playwright) que verifiquen el código 404, la imagen y el texto localizado, siguiendo el patrón de `e2e/`.

## Capabilities

### New Capabilities

- `pagina-error-404`: comportamiento de la página de error HTTP 404: cuándo se muestra, qué contiene (imagen `404.jpg`, mensaje y enlace al inicio), cómo se localiza por idioma y cómo se adapta al tema claro/oscuro.

### Modified Capabilities

<!-- Ninguna capability existente cambia requisitos: el cambio es aditivo. La localización del 404 se describe dentro de la nueva capability. -->

## Impact

- **Código**: `app/not-found.tsx` (handler del 404, con chrome del sitio), nuevo `components/locale-shell.tsx` (chrome compartido con `app/[lang]/layout.tsx`), nuevo `components/not-found-panel.tsx`; `proxy.ts` adjunta el header `x-locale` (aditivo, sin cambios de ruteo).
- **Contenido**: nuevas claves de textos en `lib/dictionaries/es.json`, `lib/dictionaries/en.json` y `lib/dictionaries/pt.json`.
- **Assets**: usa `public/404.jpg` (982×551, ya existente, sin referencia actual en el código).
- **Pruebas**: nuevo archivo de pruebas en `e2e/`.
- **Sin cambios de API ni de datos**: no afecta servidores, formularios, sitemap ni contenido del portafolio.
- **Dependencias**: sin dependencias nuevas (React 19, Next.js 16, Tailwind 4 existentes).
