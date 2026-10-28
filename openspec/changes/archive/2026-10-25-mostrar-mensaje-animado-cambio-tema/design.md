# Design

## Context

- `components/theme-toggle.tsx` es un componente cliente que cicla `system → light → dark → system`, persiste en `localStorage` (`tinexlab-theme`), aplica `data-theme` en `<html>` y ya despacha el evento `tinexlab-theme-change` en cada cambio (también escucha `storage` para sincronizar entre pestañas).
- El botón vive dentro de `components/site-header.tsx`, dentro del panel `#site-navigation`, que en móvil queda con `hidden` cuando el menú está cerrado (`data-[open=false]:hidden`); el header es `sticky z-40`.
- El layout por idioma (`app/[lang]/layout.tsx`) es un componente servidor que ya baja etiquetas localizadas al header (`themeLabel={dictionary.nav.theme}`) usando `lib/dictionaries/{es,en,pt}.json`.
- `app/globals.css` define tokens de tema (`--surface`, `--foreground`, `--border`, `--accent`), la capa `@layer components` con estilos `.btn*` y precedente de `prefers-reduced-motion: reduce` (deshabilita la animación del título neón).
- Las pruebas E2E usan Playwright (`e2e/`) con `data-testid` (`menu-toggle`, `site-navigation`); no hay otro runner de pruebas configurado.

Ver `proposal.md` - Why para la motivación y `specs/` para los requisitos.

## Goals / Non-Goals

**Goals:**

- Mostrar un mensaje fijo en la parte inferior con fade-in/fade-out al activar el selector de tema, informando el tema aplicado.
- Cierre automático (~4 s tras aparecer) y cierre por pulsación una vez terminado el fade-in, también por teclado.
- Un solo mensaje a la vez (reemplazo, no apilado), localizado en es/en/pt, accesible (live region) y con soporte de `prefers-reduced-motion`.
- Cero dependencias nuevas; conservar el comportamiento, ARIA y persistencia actuales del selector de tema.

**Non-Goals:**

- Generalizar el mecanismo de mensajes para otras acciones (envío de formulario, cambio de idioma): `feedback-visual` queda abierta como capacidad, pero este cambio solo implementa el disparo por tema.
- Alterar el ciclo de preferencias, la persistencia, el `aria-label`/`title` existentes del botón ni el cierre (o no) del menú móvil al seleccionar.
- Corregir el detalle preexistente de que `theme-toggle.tsx` codifica los nombres de preferencia en español para su `aria-label` (fuera de alcance; el mensaje nuevo sí usa diccionario).

## Decisions

1. **Componente `ThemeToast` montado en el layout por idioma, activado por el evento existente `tinexlab-theme-change`.**
   - Por qué: montarlo dentro de `ThemeToggle` dejaría el mensaje dentro del panel del menú móvil, oculto cuando el panel está cerrado, y acoplaría estado de UI al botón. El evento ya se despacha en cada ciclo (y `storage` lo propaga entre pestañas), así que el toast solo necesita suscribirse.
   - Alternativa descartada: estado `useState` en `ThemeToggle` + React portal (más complejidad, mismo resultado).

2. **Máquina de estados con temporizadores en JS: `oculto → apareciendo (300 ms) → visible (4000 ms) → desapareciendo (300 ms) → oculto`.**
   - Por qué: `animationend` no se dispararía con `prefers-reduced-motion` (la animación está deshabilitada), dejando el mensaje trancado. Con timeouts fijos el flujo es idéntico con o sin animación; el CSS solo decide si hay transición visual.
   - Las duraciones se centralizan en constantes comentadas junto a los keyframes de `globals.css` para que quede explícita su correspondencia.

3. **El mensaje es un `<button type="button">` dentro de un contenedor `role="status"` + `aria-live="polite"` que permanece montado siempre.**
   - Por qué: el botón da cierre con teclado/tecnología de asistencia de forma nativa; `status` anuncia cortésmente sin robar el foco (`alert` interrumpiría). El contenedor montado evita que el live region vacío pierda la capacidad de anunciar.
   - El cierre por pulsación solo se atiende en el estado `visible` (fade-in terminado), tal como se pidió; durante `apareciendo` el clic se ignora.

4. **Cadenas nuevas en el diccionario bajo una sección `themeToast` (mensaje por preferencia + etiqueta de cierre), propagadas desde `LocaleLayoutContent` como props.**
   - Por qué: sigue el patrón existente de `themeLabel`/`labels`, resuelve la localización en el servidor y evita detectar idioma en cliente.
   - Ejemplo de contenido (es): «Tema: oscuro», «Tema: claro», «Tema: sistema», cierre «Cerrar mensaje»; en/pt equivalentes.

5. **Estilo con los tokens de tema existentes, `fixed bottom` centrado, `z-50`.**
   - Por qué: `z-50` garantiza que quede sobre el header `z-40`; `fixed` no desplaza contenido ni depende del contenedor donde se monte; los tokens ya garantizan contraste en ambos temas (misma fórmula que los `.btn`).
   - Alternativa descartada: `absolute` dentro del flujo del layout (empujaría el footer y solo se vería al hacer scroll al final).

6. **Reemplazo en solicitudes repetidas: una sola instancia; cada evento reinicia la máquina de estados y limpia todos los temporizadores pendientes.**
   - Por qué: cumple «un solo mensaje» con el mínimo de estado; no hay que reconciliar varios timeouts compitiendo.

## Risks / Trade-offs

- [Duraciones JS y CSS pueden divergir si alguien cambia una sin la otra] → centralizar ambas en constantes/variables comentadas y agregar una nota en ambos archivos.
- [El temporizador de cierre no se limpia al desmontar o al cambiar de ruta con la app en cliente] → limpiar todos los `setTimeout` en el cleanup del `useEffect` de suscripción y al reiniciar estados.
- [El evento `tinexlab-theme-change` también se dispara por `storage` entre pestañas, mostrando el mensaje sin clic local] → aceptado y deseable: confirma un cambio de tema real; si resultara ruidoso, se puede filtrar después sin tocar los requisitos.
- [Nuevos `data-testid` o texto del mensaje pudieran afectar pruebas existentes] → usar `data-testid="theme-toast"` único y correr la suite Playwright completa (`menu-responsive` incluida) como verificación.
- [Contraste del pill en ambos temas] → reutilizar tokens ya usados por `.btn-secondary`/superficies, verificación visual en es/en/pt y ambos temas durante la tarea de validación.

## Migration Plan

No aplica: es UI nueva sin cambios de datos, esquema ni despliegue especial. Rollback = retirar el componente y sus props/cadenas.

## Open Questions

Ninguna abierta: los detalles no especificados (texto del mensaje, auto-cierre ~4 s, ignorar pulsaciones durante el fade-in) quedaron resuelto como supuestos en `proposal.md`.
