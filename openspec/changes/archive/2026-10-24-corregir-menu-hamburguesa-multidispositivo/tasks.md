# Tasks

## 1. Infraestructura de validación

- [x] 1.1 Añadir `@playwright/test`, el script `test:e2e` y la configuración mínima de ejecución, verificando que la instalación de dependencias y la instalación de navegadores estén documentadas y funcionen.
- [x] 1.2 Crear helpers de prueba para localizar el botón, el panel, los enlaces y sus estados ARIA, verificando que los selectores no dependan de textos traducidos ni de clases visuales frágiles.

## 2. Corrección del menú

- [x] 2.1 Refactorizar `SiteHeader` para separar el estado del viewport de escritorio del estado abierto del menú móvil, sincronizar ambos con el breakpoint de 1024 px y soportar eventos de resize/orientación compatibles con navegadores portátiles; verificar con lint y typecheck.
- [x] 2.2 Estabilizar la visibilidad del panel mediante estado/atributos consistentes, conservar cierre con Escape y enlaces, devolver foco al botón cuando corresponda y verificar `aria-expanded`, `aria-controls` y foco visible.
- [x] 2.3 Mantener las rutas y etiquetas localizadas existentes, verificando manualmente navegación en español, inglés y portugués sin cambios de destino.

## 3. Matriz responsive automatizada

- [x] 3.1 Añadir pruebas E2E para perfiles verticales `320x568`, `360x800`, `375x667`, `390x844`, `414x896`, `430x932`, `768x1024`, `820x1180` y `912x1368`, verificando abrir, cerrar, Escape, enlace activo y estados ARIA.
- [x] 3.2 Añadir pruebas E2E para perfiles horizontales `568x320`, `667x375`, `800x390`, `896x414` y `1024x768`, verificando cambio de orientación y que el panel no quede bloqueado ni desbordado.
- [x] 3.3 Añadir pruebas de frontera en `1023x800` y `1024x800`, incluyendo transición móvil-escritorio-móvil y activaciones repetidas, verificando que no haya estados visuales ni ARIA incoherentes.
- [x] 3.4 Ejecutar `npm run lint`, `npx next typegen`, `npm run build` y `npm run test:e2e`, verificando que la suite pase contra desarrollo y el build de producción sin errores de consola ni regresiones de navegación.

## Workflow follow-up

- Revisar el comportamiento en una preview de Vercel desde dispositivos físicos o emuladores equivalentes.
- Archivar el change después de completar la matriz responsive y revisar el diff.
