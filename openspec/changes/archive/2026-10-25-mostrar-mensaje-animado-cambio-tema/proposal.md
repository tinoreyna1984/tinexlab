# Proposal

## Why

El selector de tema cambia la apariencia del sitio sin dar retroalimentación visible: la persona no recibe confirmación de qué tema quedó aplicado. Esto se agrava en móvil, donde el botón muestra solo el ícono (el texto «Tema» está oculto bajo el breakpoint `sm`), por lo que el resultado de la acción es fácil de pasar por alto.

## What Changes

- Al activar el botón de selector de tema se muestra un mensaje fijo en la parte inferior de la pantalla con animación de desvanecimiento (fade-in al aparecer y fade-out al desaparecer).
- El mensaje informa el tema recién aplicado (sistema, claro u oscuro) y está localizado en los tres idiomas del sitio (es, en, pt).
- El mensaje se cierra solo tras unos segundos y también puede cerrarse con un toque o clic una vez que terminó de aparecer.
- La animación respeta la preferencia de reducir movimiento (`prefers-reduced-motion`).
- El mensaje es accesible: se anuncia como región de estado (live region) y su cierre está disponible también por teclado.
- Activaciones repetidas del botón reinician el mensaje con el tema más reciente, sin apilar mensajes.

Supuestos registrados (detalles menores asumidos): el texto del mensaje confirma el tema aplicado (p. ej. «Tema: oscuro»); el auto-cierre ocurre después de ~4 segundos; el toque durante el fade-in inicial no lo cierra (solo después de haber terminado de aparecer, tal como se pidió).

## Capabilities

### New Capabilities

- `feedback-visual`: confirmaciones visuales transitorias de acciones de la interfaz (mensajes breves que aparecen y desaparecen con animación).

### Modified Capabilities

- `tema-apariencia`: se agrega un requisito de retroalimentación animada al cambiar el tema (mensaje inferior con fade, cierre automático y por interacción, localizado y accesible), sin alterar el comportamiento existente del selector de tema.

## Impact

- Código afectado:
  - `components/theme-toggle.tsx` (o un componente nuevo, p. ej. `components/theme-toast.tsx`) para mostrar y cerrar el mensaje.
  - `components/site-header.tsx` y `app/[lang]/layout.tsx` para pasar etiquetas localizadas del mensaje.
  - `lib/dictionaries/es.json`, `lib/dictionaries/en.json`, `lib/dictionaries/pt.json` (nuevas cadenas del mensaje).
  - `app/globals.css` (keyframes de fade y estilo del mensaje, tokens de tema existentes).
- Pruebas: nueva especificación Playwright en `e2e/` para el mensaje; las pruebas existentes del menú y del selector de tema deben seguir pasando.
- Sin cambios de API, dependencias ni datos persistidos (ya existe la clave `tinexlab-theme` en `localStorage`).
