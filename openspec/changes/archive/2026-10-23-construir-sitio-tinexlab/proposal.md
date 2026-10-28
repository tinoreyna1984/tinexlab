# Proposal

## Why

El proyecto actual es un scaffold vacío de Next.js y no ofrece la presencia profesional de Tinexlab que existe en el sitio publicado. Esta oportunidad permite reconstruir el sitio con una arquitectura mantenible, navegación por secciones, experiencia mobile-first y contenido disponible en español, inglés y portugués.

## What Changes

- Crear un sitio personal Tinexlab con rutas independientes para Inicio, CV, Portafolio, Intereses y Contacto.
- Incorporar español como idioma principal, además de inglés y portugués, conservando la sección actual al cambiar de idioma.
- Migrar y organizar el contenido del perfil: experiencia, educación, skills, intereses y los 19 proyectos del portafolio.
- Añadir filtrado de proyectos por tags y enlaces a repositorio o sitio de cada proyecto.
- Implementar formulario de contacto con envío mediante SendGrid, validación del servidor y protección honeypot.
- Implementar modo claro y oscuro, usando el tema del sistema inicialmente y permitiendo una preferencia persistida del usuario.
- Evolucionar la identidad visual existente basada en negro, blanco y acento verde menta, con diseño responsivo mobile-first.
- Incorporar metadata localizada, enlaces alternativos por idioma, sitemap y robots.
- Recuperar y organizar el logo, imágenes de intereses e imágenes de proyectos del sitio publicado.

## Capabilities

### New Capabilities

- `sitio-multidioma`: rutas localizadas, navegación entre secciones, selector de idioma y metadata alternativa.
- `perfil-profesional`: contenido de Inicio, CV con experiencia, educación y skills, e Intereses.
- `portafolio-proyectos`: listado localizado de proyectos, tags, filtrado y enlaces externos.
- `formulario-contacto`: formulario localizado, validación, envío mediante SendGrid y protección anti-spam.
- `tema-apariencia`: diseño responsivo y selección persistida entre tema claro, oscuro y preferencia del sistema.

### Modified Capabilities

No existen capacidades previas en `openspec/specs/`; todas las capacidades descritas son nuevas.

## Impact

- Afecta la estructura de rutas y componentes bajo `app/`, el layout raíz y los estilos globales.
- Requiere archivos de contenido localizado y datos estáticos tipados para perfil y portafolio.
- Requiere assets en `public/` y configuración de metadata, sitemap y robots.
- Requiere un endpoint o Server Action para SendGrid y las variables de entorno correspondientes en el despliegue.
- Requiere configurar el dominio de envío autorizado y documentar `SENDGRID_API_KEY`, destinatario y remitente.
