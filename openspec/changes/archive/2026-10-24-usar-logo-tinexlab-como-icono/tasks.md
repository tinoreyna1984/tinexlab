# Tasks

## 1. Ícono de marca en la cabecera

- [x] 1.1 En `components/site-header.tsx`, importar `Image` de `next/image` y sustituir el `<span>` de la letra "T" (dentro del enlace de marca) por `<Image src="/tinexlab-logo.png" alt="" width={96} height={96} className="size-8 sm:size-9 aspect-square object-contain rounded-lg transition-transform group-hover:rotate-6" />`, conservando intactos el `Link` (href, `onClick`, clases `group`), el nombre de marca `title-neon` y el bloque de navegación. — Verificación: `npm run lint` sin errores del componente y el encabezado muestra el logo sin deformarse en `/es` a 375 px y 1280 px.

## 2. Ícono de la ventana con el logo

- [x] 2.1 En `app/layout.tsx`, agregar `icons: { icon: "/tinexlab-logo.png" }` al objeto `metadata` existente, sin tocar `title` ni `description`. — Verificación: el HTML servido de `/es`, `/en/portafolio` y `/pt/intereses` incluye exactamente un `<link rel="icon" href="/tinexlab-logo.png">` y ninguno hacia `/favicon.ico`.
- [x] 2.2 Eliminar `app/favicon.ico` (favicon genérico de Create Next App, sin referencias en el código). — Verificación: una petición a `/favicon.ico` contra `next start` responde 404 y `git status` muestra la eliminación como único efecto de este paso.

## 3. Verificación del cambio completo

- [x] 3.1 Ejecutar `npm run lint` y `npm run build` sin errores. — Verificación: ambos comandos terminan con código 0.
- [x] 3.2 Ejecutar `npx playwright test` sin modificar las pruebas. — Verificación: las 15 pruebas del menú pasan.
- [x] 3.3 Verificar en el navegador que al activar el ícono o el nombre de la marca se navega a la página de inicio del idioma actual, y que el nombre accesible del enlace se anuncia una sola vez (la imagen es decorativa con `alt=""`). — Verificación: navegación correcta y nombre accesible único en el DOM.
- [x] 3.4 Revisión visual en temas claro y oscuro a 375 px y 1280 px: logo con esquinas redondeadas, rotación al pasar el cursor y pestaña del navegador con el logo. — Verificación: checklist visual registrada en la respuesta de implementación.
