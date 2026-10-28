# Design

## Context

`SiteHeader` es un Client Component con un booleano `menuOpen`, un listener de `matchMedia("(min-width: 1024px)")` y clases Tailwind que alternan `hidden`, `absolute` y `lg:flex`. No existe una suite de pruebas de interacción; las validaciones anteriores fueron principalmente lint, build y smoke tests HTTP. El requisito existente ya exige un menú coherente, pero el fallo persiste en cambios de tamaño y orientación de dispositivos portátiles.

## Goals / Non-Goals

**Goals:**

- Hacer determinista la relación entre estado React, visibilidad CSS y atributos ARIA.
- Mantener operable el menú entre 320 px y 1023 px, incluidos cambios de orientación y los límites 1023/1024 px.
- Mantener la navegación de escritorio visible y separada del estado del panel móvil.
- Cubrir la interacción con pruebas automatizadas de viewport y teclado.

**Non-Goals:**

- No cambiar rutas, contenido, traducciones, enlaces, locales ni el breakpoint de diseño de 1024 px.
- No rediseñar la navegación de escritorio ni añadir nuevas opciones al menú.
- No modificar tema, formulario, datos del portafolio ni APIs de servidor.

## Decisions

### Estado responsive explícito

Se definirá una única constante de breakpoint compartida por la lógica del menú y se separarán conceptualmente `isDesktop` y `menuOpen`. La lógica inicializará el estado con el viewport actual, escuchará cambios de `matchMedia` y tendrá un fallback de `resize` para navegadores portátiles que no implementen de forma uniforme los eventos de `MediaQueryList`. Al entrar en escritorio, el panel móvil se cerrará; al volver a móvil, el botón comenzará cerrado.

El panel usará clases estructuralmente estables y un atributo de estado (`data-open`) en vez de depender de una cadena condicional que mezcle visibilidad móvil y layout de escritorio. Esto evita que CSS y estado React diverjan durante un resize.

Alternativa descartada: usar solamente `window.innerWidth` durante el render. Solo está disponible en cliente, puede causar desajustes de hidratación y no expresa correctamente los cambios de media query.

### Accesibilidad e interacción

El botón conservará `aria-expanded` y `aria-controls`, y el panel tendrá una relación estable con el botón. Escape cerrará el menú y devolverá el foco al disparador; activar un enlace cerrará el panel sin impedir la navegación. Se verificará que el botón tenga una zona táctil suficiente, foco visible y nombre localizado.

### Validación automatizada por viewport

Se añadirá `@playwright/test` como dependencia de desarrollo y un script `test:e2e`. La matriz cubrirá perfiles portátiles frecuentes y límites críticos:

- Vertical: `320x568`, `360x800`, `375x667`, `390x844`, `414x896`, `430x932`, `768x1024`, `820x1180`, `912x1368`.
- Horizontal: `568x320`, `667x375`, `800x390`, `896x414`, `1024x768`.
- Límites exactos: `1023x800` y `1024x800`.

Cada prueba abrirá el menú, verificará visibilidad y ARIA, activará un enlace o cerrará mediante el botón/Escape, y repetirá el ciclo tras cambiar viewport. La prueba de límites confirmará que el botón móvil no aparece en escritorio y que el panel no queda abierto al regresar a un ancho portátil.

Alternativa descartada: verificar únicamente con snapshots o screenshots. No detectan de forma confiable la transición de estado, foco y atributos ARIA.

## Risks / Trade-offs

- [La instalación de navegadores de Playwright aumenta el tiempo de CI] -> Documentar el comando de instalación y ejecutar la suite solo como validación E2E explícita, manteniendo lint/build independientes.
- [Breakpoint CSS y breakpoint JS pueden separarse] -> Centralizar el valor `1024` en el componente y probar específicamente 1023/1024 px.
- [Cambios de orientación disparan varios eventos] -> Hacer las transiciones idempotentes y comprobar el estado final, no la cantidad de eventos.
- [Un enlace puede navegar antes de que termine la animación] -> No depender de timers; cerrar estado y permitir navegación inmediatamente.

## Migration Plan

1. Refactorizar `SiteHeader` y sus clases de visibilidad conservando las rutas y textos existentes.
2. Añadir la configuración y prueba E2E del menú con la matriz responsive definida.
3. Ejecutar lint, typegen, build y la suite de viewport en desarrollo y producción.
4. Revisar la ejecución en CI/Vercel preview antes de desplegar.

El rollback consiste en revertir el componente, estilos y archivos de prueba; no hay migraciones de datos ni cambios de API.

## Open Questions

No hay decisiones pendientes que cambien el alcance o la arquitectura.
