# Design

## Context

- `app/globals.css` sigue siendo la plantilla de Create Next App. Solo define `--background` y `--foreground` con `prefers-color-scheme` y fija `font-family: Arial` en `body`.
- Los componentes ya usan utilidades de Tailwind v4 que todavía no tienen tokens definidos: `bg-accent`, `text-accent-contrast`, `hover:bg-accent-strong`, `text-muted`, `border-border`, `bg-surface` y `bg-surface-muted`. Por eso esas clases no generan estilos visibles.
- `components/theme-toggle.tsx` aplica el tema con `document.documentElement.dataset.theme = "dark" | "light"` después de hidratar. Antes de eso, `<html>` no tiene `data-theme`.
- `app/layout.tsx` carga Geist y Geist Mono con `next/font/google` mediante variables CSS.
- Botones y enlaces con forma de botón:
  - CTA de inicio (dos `Link`) en `app/[lang]/page.tsx`.
  - Enviar en `components/contact-form.tsx`.
  - Filtros y "limpiar" en `components/portfolio-grid.tsx`.
  - Tema en `components/theme-toggle.tsx`.
  - Menú en `components/site-header.tsx`.
- Títulos: `h1` en `components/section-heading.tsx` y en `app/[lang]/page.tsx`; varios `h2` y `h3` en las páginas CV, intereses, contacto y portafolio.
- Valores del sitio de referencia que se van a replicar:
  - Botón: `padding 1rem 3rem`, `border-radius .5rem`, `font-weight 700`, negro/blanco.
  - Sombra del botón al pasar el cursor en tema claro: `0 17px 35px -11px rgba(0,0,0,.7)`.
  - Sombra del botón al pasar el cursor en tema oscuro: `0 0 51px 5px hsla(0,0%,100%,.95)`.
  - Títulos: Quicksand con `text-shadow: 4px 4px 11px rgba(0,0,0,.24)`.
  - Neón: `text-shadow` con capas `#fff` y `#0fa`, animación `pulsate .8s infinite alternate`.

## Goals / Non-Goals

**Goals:**

- Centralizar el estilo de botones y títulos en `app/globals.css` para que cada componente solo cambie clases.
- Hacer que el tema oscuro se vea bien tanto antes como después de hidratar, es decir, con o sin `data-theme`.
- Definir solo los tokens que ya consumen los componentes.

**Non-Goals:**

- Crear un componente React `Button` o cambiar el marcado, los elementos, los textos o las props.
- Cambiar la fuente del cuerpo, los layouts, los espaciados de sección, las tarjetas o los enlaces de texto.
- Agregar el script anti-parpadeo del tema descrito en la especificación vigente. Es un hueco existente que queda fuera de este cambio.
- Replicar los colores azules de los filtros del sitio de referencia. Se mantiene la identidad blanco/negro/menta.

## Decisions

1. **Tokens por tema con tres selectores.**
   - Los valores claros van en `:root`.
   - Los valores oscuros van en `[data-theme="dark"]` y también en `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { … } }`.
   - `@theme inline` expone estos colores como utilidades de Tailwind: `background`, `foreground`, `muted`, `border`, `surface`, `surface-muted`, `accent`, `accent-strong` y `accent-contrast`.
   - *Alternativa descartada:* usar solo `prefers-color-scheme`. No respetaría la elección explícita guardada por `ThemeToggle`.

2. **Efectos dependientes del tema como variables CSS.**
   - Los efectos son: `--btn-bg`, `--btn-fg`, `--btn-shadow-hover`, `--heading-shadow` y `--heading-glow`.
   - Las clases de botón y título no necesitan selectores de tema propios: heredan el valor correcto del bloque de tokens activo.
   - *Alternativa descartada:* duplicar reglas con una variante `dark:`. Exigiría `@custom-variant` y aun así no cubriría el estado previo a la hidratación sin repetir la media query.

3. **Clases utilitarias de botón en `@layer components`.**
   - `.btn` es la base: `inline-flex`, `rounded-[0.5rem]`, `font-bold`, `transition` de 0.5s y `focus-visible` con anillo de acento.
   - `.btn-primary` usa relleno `--btn-bg` y `--btn-fg`.
   - `.btn-secondary` usa contorno del color del texto con fondo transparente.
   - `.btn-compact` reduce el padding y el tamaño de letra para filtros y controles de cabecera.
   - `.btn[aria-pressed="true"]` toma el relleno principal.
   - `:hover` y `:focus-visible` aplican `box-shadow: var(--btn-shadow-hover)`. `:disabled` reduce la opacidad y anula la sombra.
   - *Alternativa descartada:* un componente `<Button>`. Obligaría a cambiar el marcado de `Link` y `button` y aumentaría el riesgo de alterar el comportamiento.
   - El enlace "limpiar" del portafolio se queda como enlace de texto, porque visualmente no es un botón.

4. **Quicksand con `next/font/google`.**
   - Se carga en `app/layout.tsx` con `variable: "--font-quicksand"`, se mapea a `--font-heading` en `@theme inline` y se aplica en `@layer base` a `h1, h2, h3` junto con `text-shadow: var(--heading-shadow)`.
   - `next/font` se aloja en el propio sitio y evita el cambio de diseño por la carga de la fuente, como exige el escenario "Tipografía disponible sin parpadeo".
   - *Alternativa descartada:* `<link>` a Google Fonts. Agrega una petición externa y puede producir FOUT.

5. **Neón solo en la clase `.title-neon`.**
   - La clase se aplica al `h1` de `SectionHeading`, al `h1` de inicio y al nombre de la marca en `SiteHeader`.
   - En tema oscuro usa color blanco, `text-shadow: var(--heading-glow)` y `animation: neon-pulse .8s infinite alternate`.
   - En tema claro, la animación es `none` y se hereda la sombra suave.
   - `@media (prefers-reduced-motion: reduce)` desactiva la animación pero conserva el resplandor estático.
   - *Alternativa descartada:* aplicar el neón a todos los títulos. Los `h2`/`h3` de tarjetas generarían ruido visual y el sitio de referencia solo lo usa en títulos de sección y en la marca.

6. **Colores de acento.**
   - En tema oscuro, `accent` es `#00ffaa`, el mismo verde menta del neón.
   - En tema claro, `accent` es un verde más oscuro con contraste AA sobre blanco, por ejemplo `#047857`.
   - `accent-contrast` se ajusta para que el texto sobre el acento sea legible en cada tema.

## Risks / Trade-offs

- [Algunos componentes ya usan clases como `text-accent` que hoy no generan estilo. Al definir los tokens, también cambiará la apariencia de esos elementos.] → Es el comportamiento que esas clases siempre buscaron y está alineado con el requisito de identidad visual existente. Se revisarán visualmente todas las páginas en ambos temas.
- [Animar `text-shadow` de forma continua tiene costo de repintado.] → Se limita a pocos elementos (un `h1` por página y la marca) y respeta `prefers-reduced-motion`.
- [Sin script anti-parpadeo, una persona con preferencia explícita contraria al sistema puede ver el tema del sistema por un momento.] → Es un comportamiento existente fuera de alcance. Los tokens funcionan con ambos estados del atributo.
- [Las pruebas e2e del menú dependen de `data-testid`, de los atributos ARIA y de la visibilidad del panel.] → Solo se cambian clases de apariencia del botón. No se tocan las clases `data-[open=…]` ni `lg:!…` del panel. Las pruebas se ejecutan antes de cerrar el cambio.
- [El sombreado blanco amplio del botón en tema oscuro (`51px 5px`) puede invadir elementos vecinos.] → En botones compactos se usa un resplandor más pequeño mediante una variable local.

## Migration Plan

Solo cambian estilos y no hay datos ni APIs involucrados. Para revertir basta con deshacer el commit. No requiere pasos de despliegue especiales.
