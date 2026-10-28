# Design

## Context

- El ícono actual es un `<span>` con la letra "T" dentro del enlace de marca en `components/site-header.tsx` (bloque con `grid size-9 place-items-center rounded-lg bg-accent … transition-transform group-hover:rotate-6`), acompañado del nombre de marca en texto con la clase `title-neon`.
- El favicon actual proviene de la convención de plantilla: existe `app/favicon.ico` (genérico de Create Next App) y ningún objeto de metadatos declara `icons`. `app/layout.tsx` exporta un `metadata` estático; las páginas localizadas usan `generateMetadata` con `pageMetadata()` de `lib/metadata.ts`, que define título, descripción, `alternates` y `openGraph`, pero nunca `icons`.
- `public/tinexlab-logo.png` ya existe (PNG cuadrado de 96×96 px, 1.4 KB) y se sirve en `/tinexlab-logo.png`. No se modificará.
- El proyecto usa `next/image` en `components/portfolio-grid.tsx`, `app/[lang]/intereses/page.tsx` y `app/page.tsx`.
- Las pruebas e2e no referencian el ícono de marca ni el favicon.
- Restricciones del usuario: sin cambios de funcionalidad, sin archivos nuevos y sin código nuevo (solo editar archivos existentes y eliminar el favicon genérico, decisión confirmada). Ver proposal.md — Why.

## Goals / Non-Goals

**Goals:**

- Que la cabecera muestre `tinexlab-logo.png` de forma responsiva, conservando los efectos existentes y el comportamiento del enlace de marca.
- Que la ventana (pestaña) muestre el mismo logo como único ícono, en todas las rutas e idiomas.
- Cumplir todo lo anterior editando únicamente archivos existentes.

**Non-Goals:**

- Agregar archivos, dependencias, rutas o componentes nuevos.
- Cambiar textos, metadatos de título/descripción, `openGraph`, el efecto neón, el menú o el tema.
- Regenerar, comprimir o convertir el archivo de logo.
- Cambiar el nombre accesible del enlace de marca.

## Decisions

1. **Reemplazar el `<span>` por `next/image` dentro del mismo `Link`.**
   - Se importa `Image` de `next/image` en `components/site-header.tsx` y se sustituye el bloque de la "T" por `<Image src="/tinexlab-logo.png" alt="" … />`, manteniendo el enlace, su `href`, su `onClick={closeMenu}` y las clases `group …` sin tocar.
   - `alt=""` (decorativo): el enlace ya contiene el nombre visible "Tinexlab", que aporta el nombre accesible; un `alt` descriptivo duplicaría la lectura. Este es el comportamiento que exige el escenario "Nombre accesible de la marca".
   - *Alternativa descartada:* `<img>` nativo. Generaría la advertencia de lint `@next/next/no-img-element` y rompería la convención del proyecto, que ya usa `next/image`.

2. **Caja responsiva conservando los efectos existentes.**
   - Clases en la imagen: `size-8 sm:size-9 aspect-square object-contain rounded-lg transition-transform group-hover:rotate-6`.
   - `size-8` (32 px) en móvil y `size-9` (36 px) desde `sm` reproduce el tamaño actual en escritorio; `aspect-square` + `object-contain` garantizan que el PNG cuadrado nunca se deforme aunque la caja cambie.
   - Las clases de tamaño fijan la caja y evitan el salto de diseño que podrían causar los atributos `width`/`height` de `next/image`.
   - *Alternativa descartada:* mantener `size-9` fijo en todos los anchos — no responde al pedido explícito de reemplazo responsivo.

3. **`icons.icon` en los metadatos existentes del layout raíz.**
   - Se agrega `icons: { icon: "/tinexlab-logo.png" }` al objeto `metadata` de `app/layout.tsx`.
   - Herencia garantizada: Next.js combina los metadatos de layout con los de página; `pageMetadata()` no define `icons`, así que todas las rutas localizadas heredan el ícono del layout raíz.
   - No se crea ningún archivo: el PNG ya está en `public/`.

4. **Eliminar `app/favicon.ico`.**
   - La convención `app/favicon.ico` inyecta automáticamente un segundo `<link rel="icon">`; eliminarla deja el logo como único ícono declarado, como exige el escenario "Declaración única en el HTML".
   - `grep` confirma que ninguna ruta, página, layout ni prueba referencia el archivo, y está versionado en git, por lo que su eliminación es reversible.
   - *Alternativa descartada (ofrecida y descartada por el usuario):* conservar ambos — dos íconos declarados y elección no determinista según el navegador.

5. **Alcance estricto sobre el resto de la cabecera.**
   - No se modifica el bloque de navegación, el botón de menú (`data-testid`, ARIA y clases del panel), el selector de idioma ni el botón de tema; el nombre de marca conserva `title-neon`.
   - Esto mantiene intactas las 15 pruebas e2e del menú.

## Risks / Trade-offs

- [Los metadatos `icons` podrían no aplicarse en alguna ruta si una página los sobrescribe.] → Ninguna página define `icons`; se verifica en el HTML construido que exista exactamente un `<link rel="icon">` hacia el logo en varias rutas.
- [Los atributos `width`/`height` de `next/image` podrían desplazar el diseño de la cabecera.] → Caja fija con `size-8 sm:size-9` y `aspect-square`; verificación visual a 375 px y 1280 px.
- [La petición a `/favicon.ico` tras eliminar el archivo podría responder con caché previa en lugar de 404.] → Se verifica contra un servidor de producción recién construido (`next start`); cualquier caché de un despliegue anterior es externa al repositorio.
- [El logo de 96 px podría perder nitidez al escalarse.] → La caja usa 32–36 px, menores que el original; no hay tamaños de ícono mayores que el asset.

## Migration Plan

Cambio estático y de metadatos: se despliega con el flujo normal del proyecto (build de Next.js en Vercel), sin pasos adicionales ni migración de datos. Para revertir basta con deshacer el commit (git restaura `app/favicon.ico` desde el historial).
