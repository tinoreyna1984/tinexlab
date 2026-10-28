# Design

## Context

El repositorio contiene un scaffold de Next.js 16.4.2 con App Router, React 19, TypeScript y Tailwind CSS v4. No hay componentes de producto, datos locales ni capacidades existentes en `openspec/specs/`. El sitio publicado aporta el contenido inicial: perfil profesional, 19 proyectos, tags, logo e imágenes.

La aplicación debe conservar URLs sin prefijo para español y usar prefijos `/en` y `/pt` para los otros idiomas. Las cinco secciones utilizan slugs estables en español (`/`, `/cv`, `/portafolio`, `/intereses`, `/contacto`), mientras que el contenido y la interfaz se traducen.

## Goals / Non-Goals

**Goals:**

- Crear una arquitectura de rutas localizada, con una única fuente reutilizable de componentes y datos.
- Mantener español sin prefijo visible y soportar `/en/...` y `/pt/...` con selección por navegador en la primera visita.
- Servir contenido estático localizado y tipado para perfil, proyectos e interfaz.
- Mantener el cliente pequeño: cargar diccionarios y contenido desde Server Components siempre que sea posible.
- Asegurar tema del sistema por defecto, elección explícita persistida y renderizado sin parpadeo.
- Procesar Contacto en servidor con SendGrid y sin exponer credenciales.
- Mantener el sitio accesible, mobile-first y preparado para metadata localizada.

**Non-Goals:**

- No crear un CMS ni un panel administrativo.
- No incorporar autenticación, cuentas de usuario ni base de datos.
- No rediseñar el contenido profesional más allá de su organización y traducción.
- No traducir URLs de secciones por idioma; los slugs permanecen estables para simplificar enlaces compartibles y alternates.
- No añadir analítica o seguimiento de terceros como parte de este cambio.

## Decisions

### Rutas y locales

Se usará `app/[lang]/` como árbol canónico de páginas. Un `proxy.ts` validará los locales `es`, `en` y `pt`, detectará `Accept-Language` cuando no haya locale y hará un rewrite interno de las rutas sin prefijo hacia `es`. El navegador conservará la URL española sin `/es`; las rutas de inglés y portugués sí mostrarán su prefijo.

La sección se expresará como rutas anidadas bajo el locale (`app/[lang]/cv`, `app/[lang]/portafolio`, etc.). Un layout localizado cargará el diccionario, establecerá `lang` y expondrá la navegación común. Se elegirá rewrite interno en vez de duplicar árboles de páginas españoles para evitar dos implementaciones de cada sección.

Alternativa descartada: duplicar `app/cv`, `app/portafolio`, etc. junto con `app/[lang]/...`. Aunque evita el rewrite, duplica páginas, metadata y puntos de mantenimiento.

### Contenido y traducciones

Los textos de interfaz vivirán en diccionarios JSON por locale (`es`, `en`, `pt`) cargados en servidor. Los datos estructurados de CV, intereses y proyectos vivirán en módulos tipados, con campos localizados donde corresponda. El español será la fuente de referencia, el inglés se migrará del sitio publicado y el portugués se generará como borrador para revisión antes del despliegue.

Alternativa descartada: depender de una API o CMS para contenido que cambia poco. El contenido estático simplifica despliegue, SEO y consistencia de traducciones.

### Portafolio y filtros

El catálogo conservará un identificador estable por proyecto, sus tags normalizados, año, imagen, repositorio y sitio opcional. El filtro se gestionará en el cliente únicamente en la página de Portafolio para respuesta inmediata; la lista inicial y sus textos serán renderizados desde datos del servidor. El estado del filtro se reflejará en la URL mediante query string para que un resultado filtrado pueda compartirse y recuperarse al cambiar de locale cuando el tag exista.

### Tema y sistema visual

Los tokens de color, tipografía, superficies, bordes y foco se definirán en `globals.css` con las convenciones de Tailwind v4. El modo oscuro se activará mediante una variante basada en clase y un atributo de tema en `html`. Un pequeño script de inicialización en el layout leerá la preferencia persistida y, si no existe, `prefers-color-scheme` antes del primer pintado.

Se conservará el verde menta de marca para el tema oscuro y se definirá una variante de contraste para el tema claro. El componente de navegación será responsive: menú compacto en móvil y navegación expandida en pantallas amplias.

Alternativa descartada: usar solo `prefers-color-scheme` sin selección manual. No satisface la elección explícita solicitada ni permite persistir una preferencia independiente del sistema.

### Contacto y seguridad

El formulario enviará los datos a una función de servidor (Server Action o route handler según las restricciones concretas del formulario) que centralizará validación, honeypot y llamada a SendGrid. La API key, remitente y destinatario se leerán desde variables de entorno; nunca se incluirán en componentes cliente ni respuestas de error. El resultado de la operación se traducirá según el locale de la página.

Alternativa descartada: `mailto:` o servicio de formularios externo. SendGrid ya es el proveedor usado por el sitio y mantiene continuidad operativa, control del remitente y una migración menor.

### Assets y SEO

Los assets recuperados se organizarán en `public/` con nombres estables y referencias desde los datos. Se usarán imágenes responsivas y textos alternativos. Cada página generará metadata según locale, enlaces alternativos con español sin prefijo, `/en` y `/pt`, además de sitemap y robots para las rutas públicas.

## Risks / Trade-offs

- [Rewrite de español sin prefijo] -> Probar navegación directa, refresh, generación estática, metadata y links canónicos para `/` y cada sección.
- [Traducciones portuguesas preliminares] -> Mantenerlas en datos separados y realizar revisión manual antes de publicar; marcar cualquier texto pendiente en la revisión de contenido.
- [Assets del sitio publicado pueden cambiar de URL] -> Descargar copias locales y verificar que cada referencia usada por el catálogo exista durante la migración.
- [Dependencia de SendGrid] -> Validar configuración al arrancar el entorno, devolver errores genéricos al cliente y documentar variables requeridas para Vercel.
- [Preferencia de tema aplicada en cliente] -> Ejecutar la inicialización antes del contenido visible y usar valores seguros por defecto para evitar flash y problemas de hidratación.
- [Filtro en query string] -> Normalizar tags y validar valores desconocidos para que URLs manipuladas no provoquen errores ni filtrados ambiguos.

## Migration Plan

1. Crear la estructura localizada, componentes compartidos, diccionarios y datos tipados.
2. Descargar y verificar logo, imágenes de intereses e imágenes de los 19 proyectos.
3. Implementar páginas, navegación, tema, metadata y filtro de Portafolio.
4. Configurar variables de entorno de SendGrid en desarrollo y Vercel; probar envíos reales controlados.
5. Revisar traducciones portuguesas y validar las cinco secciones en los tres locales.
6. Ejecutar lint, build y pruebas manuales responsive, de accesibilidad, tema y formulario antes del despliegue.

El rollback consiste en desplegar la versión anterior de Vercel. Como el cambio no modifica una base de datos, no requiere migración de datos ni rollback destructivo.

## Open Questions

- Los valores concretos de remitente, destinatario y dominio autenticado de SendGrid se definirán como configuración de despliegue, sin cambiar la arquitectura.
