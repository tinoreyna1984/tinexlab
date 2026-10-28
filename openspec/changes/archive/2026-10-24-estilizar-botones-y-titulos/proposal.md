# Proposal

## Why

El sitio actual en Next.js usa botones redondeados con relleno de acento y títulos en Geist sin efectos. Esto no coincide con la identidad visual del sitio publicado en `https://tinexlab.vercel.app/`, que ya es conocido: botones negros o blancos con sombra al pasar el cursor, y títulos en Quicksand con sombra suave en tema claro y neón verde menta pulsante en tema oscuro. Además, `app/globals.css` sigue siendo la plantilla de Create Next App. No define los tokens (`accent`, `muted`, `border`, `surface`, etc.) que usan los componentes, así que botones y títulos no se ven correctamente en ningún tema.

## What Changes

- Botones de acción con el estilo del sitio de referencia:
  - En tema claro: fondo negro y texto blanco.
  - En tema oscuro: fondo blanco y texto negro.
  - Esquinas de 0.5rem y texto en negrita.
  - Al pasar el cursor: sombra proyectada en tema claro y resplandor blanco en tema oscuro.
  - El cambio aplica a las llamadas a la acción de inicio, al botón de enviar del formulario de contacto, a los filtros del portafolio, al botón de tema y al botón de menú.
- Variantes del botón:
  - **Principal**: relleno sólido.
  - **Secundaria**: contorno.
  - **Compacta**: filtros y controles pequeños, que conservan su tamaño actual.
  - **Estado presionado**: filtros con `aria-pressed="true"`.
- Títulos (`h1`, `h2`, `h3`) con la fuente Quicksand y una sombra de texto suave en tema claro.
- Efecto neón pulsante (blanco con verde menta `#0fa`) en los títulos principales de página (`h1`) y en el nombre de la marca cuando el tema es oscuro. Se desactiva con `prefers-reduced-motion: reduce`.
- Tokens mínimos de color y superficie para tema claro y oscuro en `app/globals.css`, con soporte para el atributo `data-theme` que ya escribe `ThemeToggle`. Su único objetivo es que botones y títulos se muestren correctamente.
- No cambian rutas, contenido, textos, navegación, envío del formulario, lógica de filtros, persistencia del tema ni el comportamiento del menú.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `tema-apariencia`: se agregan requisitos de estilo para botones de acción y para el formato y los efectos de los títulos. Ambos están alineados con el sitio de referencia y no afectan el funcionamiento.

## Impact

- **Estilos**:
  - `app/globals.css`: tokens, utilidades de botón, estilo base de títulos y animación de neón.
  - `app/layout.tsx`: carga de la fuente Quicksand con `next/font/google`.
- **Componentes, solo clases CSS**:
  - `components/section-heading.tsx`
  - `components/contact-form.tsx`
  - `components/portfolio-grid.tsx`
  - `components/theme-toggle.tsx`
  - `components/site-header.tsx`
  - `app/[lang]/page.tsx`
- **Pruebas**: las pruebas e2e del menú (`e2e/menu-responsive.spec.ts`) deben seguir pasando sin cambios.
- **Dependencias**: no se agregan dependencias nuevas, porque la fuente se carga con `next/font`, que ya forma parte de Next.js.
