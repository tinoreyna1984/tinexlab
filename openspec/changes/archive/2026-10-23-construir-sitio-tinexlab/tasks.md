# Tasks

## 1. Base del proyecto y sistema visual

- [x] 1.1 Instalar y configurar las dependencias necesarias para SendGrid y cualquier utilidad de validación, verificando que `npm install` actualice el lockfile sin conflictos.
- [x] 1.2 Definir tokens de color, tipografía, superficies, estados de foco y variantes claro/oscuro en los estilos globales, verificando contraste legible en ambos temas.
- [x] 1.3 Crear los componentes compartidos de layout, navegación, selector de idioma, selector de tema, enlaces y estados de carga/error, verificando que `npm run lint` no reporte errores en ellos.
- [x] 1.4 Implementar el layout mobile-first y navegación colapsable, verificando manualmente ausencia de desplazamiento horizontal en móvil y navegación por teclado.

## 2. Localización y routing

- [x] 2.1 Crear tipos de locale, diccionarios `es`, `en` y `pt`, y carga segura de traducciones, verificando que todos los locales compartan las mismas claves requeridas.
- [x] 2.2 Implementar el árbol de rutas bajo `[lang]` y el `proxy` para rewrite español, detección de `Accept-Language` y rechazo seguro de locales no soportados; verificar acceso directo a las 15 URLs públicas.
- [x] 2.3 Conectar navegación y selector de idioma para conservar la sección actual, verificando que cada cambio produzca la URL equivalente con el contenido traducido.
- [x] 2.4 Generar metadata localizada, alternates/hreflang, sitemap y robots, verificando que cada URL pública aparezca una sola vez y con el locale correcto.
- [x] 2.5 Completar los borradores de traducción portuguesa de interfaz y contenido, verificando paridad de claves y dejando el contenido listo para revisión manual antes del despliegue.

## 3. Perfil, CV e intereses

- [x] 3.1 Modelar y migrar datos tipados de experiencia, educación, skills, idiomas e intereses desde el sitio publicado, verificando que no se pierdan periodos, categorías ni descripciones.
- [x] 3.2 Descargar y organizar logo e imágenes de perfil/intereses en `public/`, verificando que cada archivo referenciado exista y tenga texto alternativo definido.
- [x] 3.3 Construir Inicio, CV e Intereses con sus contenidos localizados y jerarquía semántica, verificando las rutas en los tres locales y una navegación completa por teclado.
- [x] 3.4 Verificar responsive y accesibilidad de las páginas de perfil en móvil y escritorio, incluyendo headings, foco, alt text y lectura del contenido sin imágenes.

## 4. Portafolio

- [x] 4.1 Migrar los 19 proyectos y 19 tags a datos tipados con títulos, descripciones en los tres locales, años, imágenes y enlaces opcionales, verificando conteo y enlaces contra el sitio publicado.
- [x] 4.2 Descargar y comprobar las imágenes de los proyectos, verificando que las rutas locales existan y que proyectos sin sitio publicado solo muestren enlaces válidos disponibles.
- [x] 4.3 Construir la página de Portafolio con cards accesibles, tags visibles y enlaces externos seguros, verificando que el catálogo inicial muestre los 19 proyectos.
- [x] 4.4 Implementar filtrado por tags y persistencia del filtro en query string, verificando filtro con resultados, sin resultados, limpieza y cambio de locale.

## 5. Contacto y entrega de correo

- [x] 5.1 Implementar la función de servidor para validar nombre, correo, mensaje y honeypot antes de llamar a SendGrid, verificando con pruebas que los datos inválidos o automatizados no generan envíos.
- [x] 5.2 Configurar el cliente de SendGrid con variables de entorno para API key, remitente y destinatario, verificando que ningún secreto aparezca en el bundle, HTML o respuestas públicas.
- [x] 5.3 Construir el formulario de Contacto y feedback localizado para éxito, validación y fallo del proveedor, verificando conservación segura de datos y prevención de reenvío accidental.
- [x] 5.4 Documentar las variables de entorno y el procedimiento de prueba controlada de SendGrid, verificando que un entorno nuevo pueda configurarse sin incluir secretos en el repositorio.

## 6. Integración y validación

- [x] 6.1 Ejecutar `npm run lint` y `npm run build`, corrigiendo errores de tipos, rutas, metadata o hidratación hasta obtener una compilación limpia.
- [x] 6.2 Validar manualmente una matriz de las cinco secciones en es, en y pt, incluyendo navegación, enlaces alternativos, filtros, formulario y recursos de rastreo.
- [x] 6.3 Validar tema del sistema, selección explícita, persistencia y carga sin parpadeo en navegadores de escritorio y móvil.
- [x] 6.4 Ejecutar una revisión final de accesibilidad y responsive, verificando contraste, teclado, labels, alt text, foco visible y ausencia de scroll horizontal.

## Workflow follow-up

- Revisar y aprobar las traducciones portuguesas antes del despliegue.
- Configurar las variables de entorno y el dominio autenticado de SendGrid en Vercel.
- Desplegar una preview, ejecutar la validación manual y promover a producción tras la revisión.
- Archivar el change cuando la implementación y la validación estén completas.
