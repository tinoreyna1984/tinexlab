# Proposal

## Why

Al abrir el sitio, la persona ve contenido parcial o en esqueleto sin una transición de entrada que refleje la identidad de Tinexlab; una pantalla de bienvenida con la imagen `public/inicio.png` y un indicador de progreso da una primera impresión cuidada y comunica que el sitio está terminando de cargar.

## What Changes

- Agregar un splash screen que muestra la imagen `public/inicio.png` a pantalla completa, con animación de fade-in y fade-out, visible durante la carga inicial del sitio.
- Agregar un indicador de porcentaje de carga (0–100 %) anclado en la parte inferior izquierda de la pantalla, visible mientras el splash está en transición.
- El porcentaje avanza de forma simulada/animada (acelerado al inicio, frenando cerca del 100 %) y llega a 100 % cuando la página termina de cargar, antes de iniciar el fade-out.
- El splash se muestra solo en la primera visita por sesión del navegador (controlado con `sessionStorage`); en recargas o visitas posteriores dentro de la misma sesión no interrumpe.
- El splash y el porcentaje son responsivos: la imagen se escala sin recortes ni desplazamiento horizontal en móvil, tableta y escritorio, y el texto del porcentaje mantiene tamaño y contraste legibles.
- Respetar la preferencia `prefers-reduced-motion`: sin animaciones de opacidad cuando está activa.
- Agregar pruebas end-to-end (Playwright) del splash y del porcentaje, siguiendo el patrón de las pruebas existentes en `e2e/`.

## Capabilities

### New Capabilities

- `experiencia-carga`: experiencia de carga inicial del sitio: cuándo y cómo se muestra el splash screen con `inicio.png`, su animación de aparición/desaparición, el indicador de porcentaje de carga en la parte inferior izquierda, su comportamiento responsivo y accesible, y la frecuencia de visualización por sesión.

### Modified Capabilities

<!-- Ninguna capability existente cambia requisitos: el splash es completamente aditivo. -->

## Impact

- **Código**: nuevo componente cliente (p. ej. `components/splash-screen.tsx`) montado en los layouts de la app (`app/layout.tsx` y/o `app/[lang]/layout.tsx`); estilos/keyframes nuevos en `app/globals.css`.
- **Assets**: usa `public/inicio.png` (1180×884, ya existente, sin referencia actual en el código).
- **Estado**: uso de `sessionStorage` para controlar la visualización por sesión.
- **Dependencias**: sin dependencias nuevas (React 19, Next.js 16, Tailwind 4 existentes).
- **Pruebas**: nuevo archivo de pruebas en `e2e/`; puede requerir ajustes de espera en pruebas existentes si el splash cubre contenido durante la carga.
- **Sin cambios de API ni de datos**: no afecta servidores, formularios ni contenido del portafolio.
