# Proposal

## Why

En la primera visita de la sesión, el splash screen entra con un fade-in de 300 ms aplicado a la capa completa, así que su fondo se transparenta y el contenido del sitio se ve asomando detrás antes de que el splash termine de aparecer. El sitio no debe ser visible hasta que el splash complete su aparición y realice la transición de salida.

## What Changes

- La capa del splash mantendrá el fondo opaco desde el primer pintado: la animación de entrada (fade-in) se aplica solo a la imagen de bienvenida y al indicador de porcentaje, no a la capa que cubre el contenido.
- El fade-out de salida se mantiene igual: es la transición que revela el contenido del sitio al llegar al 100 %.
- Se ajustan las pruebas e2e de la entrada del splash para verificar que la capa nunca se transparenta durante la aparición.

## Capabilities

### New Capabilities

<!-- Ninguna: es un ajuste de comportamiento de una capability existente. -->

### Modified Capabilities

- `experiencia-carga`: El requisito "Animación de aparición y desaparición" cambia para especificar que, durante la aparición, la capa del splash permanece opaca (el contenido del sitio nunca se transparenta a través de ella) y el fade-in aplica únicamente a la imagen y al indicador; se agrega un escenario que cubre que el contenido del sitio no es visible durante la entrada.

## Impact

- **Código**: `app/globals.css` (reglas `.splash--apareciendo`, `.splash__image`, `.splash__progress` y bloque `prefers-reduced-motion`). No se tocan `components/splash-screen.tsx`, `app/layout.tsx`, `lib/splash.ts` ni el script pre-paint.
- **Specs**: delta en `experiencia-carga` (MODIFIED del requisito de animación).
- **Pruebas**: `e2e/splash-screen.spec.ts` — ajuste de las aserciones de animación de entrada y de reduced-motion, más un test nuevo que verifica opacidad 1 y fondo opaco de la capa durante la aparición.
- **Sin cambios de comportamiento en**: visitas repetidas (script pre-paint), cierre garantizado de 8 s, progreso simulado, responsividad, accesibilidad del teclado ni porcentaje.
