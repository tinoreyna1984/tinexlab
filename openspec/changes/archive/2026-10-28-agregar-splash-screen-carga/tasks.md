# Tasks

## 1. Descubrimiento técnico para Next.js 16

- [x] 1.1 Revisar en `node_modules/next/dist/docs/01-app` la guía aplicable a layouts del App Router y a scripts inline en el `<head>`, y confirmar que D1 (montaje en `app/layout.tsx`) y D2 (script inline pre-paint) siguen siendo correctas; si la guía difiere, ajustar `design.md` antes de codificar. Verificación: `design.md` actualizado con el ajuste o nota explícita de confirmación tras leer la guía.

## 2. Implementación del splash (estilos, componente y montaje)

- [x] 2.1 Agregar en `app/globals.css` las clases del splash (contenedor `fixed inset-0 z-[60]`, imagen centrada `object-contain` sobre `var(--background)`, porcentaje abajo-izquierda con `tabular-nums` y `env(safe-area-inset-bottom)`), los keyframes `splash-fade-in` / `splash-fade-out` de 300 ms, la regla que oculta el splash cuando `<html>` tiene `data-splash="seen"` y el bloque `prefers-reduced-motion: reduce` que desactiva esas animaciones. Verificación: `npm run build` completa sin errores de CSS y las clases quedan presentes en el bundle compilado.
- [x] 2.2 Crear `components/splash-screen.tsx` (`"use client"`) con la máquina de fases `oculto → apareciendo → cargando → desapareciendo → oculto`, progreso simulado ease-out con techo de 90 %, remate a 100 % al evento `load` (o si `readyState === "complete"`), temporizador duro de 8 s, bandera `tinexlab-splash-seen` en `sessionStorage` con `try/catch` y degradación a memoria, estado inicial idéntico al SSR (visible, `0 %`) y `data-testid="splash-screen"` / `data-testid="splash-progress"`. Verificación: `npx tsc --noEmit` y `npm run lint` terminan sin errores.
- [x] 2.3 Montar `<SplashScreen />` en el `<body>` de `app/layout.tsx` e inyectar el script inline en el `<head>` que lee `sessionStorage` y marca `data-splash="seen"` antes del primer pintado. Verificación: `curl -s http://127.0.0.1:3000/es | grep -q splash-screen` devuelve el markup SSR y el script inline aparece antes del `<body>`.

## 3. Pruebas e2e del comportamiento principal

- [x] 3.1 Crear `e2e/splash-screen.spec.ts` que verifique la primera visita: el splash se muestra con la imagen `inicio.png`, el porcentaje arranca en 0 % y avanza sin retroceder, y el splash desaparece solo dejando el contenido visible. Verificación: `npx playwright test e2e/splash-screen.spec.ts` pasa.
- [x] 3.2 Agregar al mismo spec el caso de sesión: recargar la página en el mismo contexto de navegador no vuelve a mostrar el splash y el contenido se ve directo. Verificación: `npx playwright test e2e/splash-screen.spec.ts` pasa con el caso nuevo.
- [x] 3.3 Agregar el caso de cierre garantizado: retrasar un recurso con `page.route` para demorar la señal `load` y comprobar que el splash desaparece antes de los 8 s. Verificación: `npx playwright test e2e/splash-screen.spec.ts` pasa con el caso nuevo.

## 4. Responsividad y accesibilidad verificadas

- [x] 4.1 Agregar el caso `reducedMotion: "reduce"`: el splash aparece y desaparece sin transición de opacidad mientras el porcentaje sigue actualizándose. Verificación: `npx playwright test e2e/splash-screen.spec.ts` pasa con el caso nuevo.
- [x] 4.2 Agregar los casos de viewport (360 px y 1440 px): sin desplazamiento horizontal, imagen ajustada sin recorte y porcentaje anclado en la esquina inferior izquierda con tamaño legible. Verificación: `npx playwright test e2e/splash-screen.spec.ts` pasa con los casos nuevos.
- [x] 4.3 Agregar el caso de teclado: mientras el splash está visible, el foco no entra al splash ni tiene elementos enfocables dentro, y una vez desaparecido los controles del sitio son alcanzables con tabulación. Verificación: `npx playwright test e2e/splash-screen.spec.ts` pasa con el caso nuevo.

## 5. Convivencia con la suite existente

- [x] 5.1 Agregar en `e2e/helpers/` una espera compartida de que `[data-testid="splash-screen"]` esté oculto (o no exista) antes de interactuar con la página, siguiendo el patrón de los helpers actuales. Verificación: el helper existe y es importable desde las specs existentes.
- [x] 5.2 Aplicar la espera a las specs existentes que la requieran y correr toda la suite; ajustar solo las pruebas afectadas por el overlay, sin tocar el comportamiento definido en el spec. Verificación: `npx playwright test` completa sin fallos.

## 6. Verificación integral

- [x] 6.1 Ejecutar `npm run lint`, `npx tsc --noEmit` y `npm run build` y confirmar que terminan sin errores. Verificación: los tres comandos salen con código 0.
- [x] 6.2 Revisar cada scenario de `specs/experiencia-carga/spec.md` contra la implementación y las pruebas, y registrar cualquier scenario sin cubrir como tarea pendiente. Verificación: los 16 scenarios del delta quedan cubiertos por pruebas e2e o por verificación observada y anotada. (Nota: el delta contiene 15 scenarios —el texto "16" fue un desfase del planteo— y los 15 quedan cubiertos: 1–2 y 4–6, 8–9, 14–15 por `e2e/splash-screen.spec.ts` "primera visita"/"teclado"/"tema"; 3 porque cada prueba corre en un contexto de navegador nuevo y el splash se muestra; 7, 11–12 por los casos responsivos 360/1440; 10 por "cierre garantizado"; 13 por el caso de movimiento reducido.)
