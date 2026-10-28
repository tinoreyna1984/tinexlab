# Proposal

## Why

El menú desplegable de la cabecera en dispositivos móviles aparece y desaparece de forma instantánea (se oculta con `hidden` al cerrarse), lo que produce un salto visual brusco al abrir y cerrar. Un sitio con acabado cuidado debe transicionar ese panel con una animación suave, coherente con las demás animaciones del sitio (mensaje de tema, resplandor neón) y respetando la preferencia de movimiento reducido.

## What Changes

- El panel de navegación móvil (`#site-navigation`) se abre con una animación de entrada (desplazamiento vertical hacia abajo combinado con desvanecimiento) y se cierra con una animación de salida inversa, en lugar de aparecer/desaparecer de forma instantánea.
- La animación aplica únicamente en viewport móvil/tablet (menú hamburguesa, `< 1024 px`); en escritorio el menú horizontal permanece sin cambios.
- Se respeta `prefers-reduced-motion: reduce`: con esa preferencia el panel abre y cierra de forma inmediata, igual que hoy.
- Se conservan sin cambios los comportamientos existentes: estados ARIA (`aria-expanded`, `aria-hidden`, `aria-controls`), cierre con Escape, cierre al navegar, sincronización con el breakpoint, `data-open` y las pruebas E2E del menú.

## Capabilities

### New Capabilities

<!-- Ninguna capacidad nueva. -->

### Modified Capabilities

- `tema-apariencia`: se agrega un requisito de animación de apertura/cierre del menú desplegable en dispositivos móviles (entrada y salida suaves, duración breve, movimiento reducido), sin alterar los requisitos existentes de estado responsive del menú.

## Impact

- `components/site-header.tsx`: lógica de render/estado del panel móvil para permitir animación de salida (evitar `hidden` inmediato) manteniendo `data-open` y ARIA consistentes.
- `app/globals.css`: nuevas reglas/keyframes de animación del panel del menú y su anulación bajo `prefers-reduced-motion`.
- `e2e/menu-responsive.spec.ts` y `e2e/helpers/menu.ts`: verificación de que las pruebas existentes siguen pasando; posible ajuste menor si alguna aserción depende de oclusión inmediata.
- Sin cambios de API, dependencias, rutas ni contenido; impacto puramente visual/interactivo en la cabecera.
