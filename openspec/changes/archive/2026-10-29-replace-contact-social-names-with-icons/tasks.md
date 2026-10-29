# Tasks

## 1. Íconos y presentación de redes sociales

- [x] 1.1 Definir la representación de LinkedIn, Instagram, X, Facebook y GitHub usando íconos vectoriales compatibles con el proyecto; verificar que la solución elegida no introduzca una dependencia innecesaria.
- [x] 1.2 Actualizar `app/[lang]/contacto/page.tsx` para asociar cada red con su ícono, ocultar el SVG decorativo de tecnologías asistivas y conservar los cinco href, `target` y `rel` existentes; verificar la revisión visual en Contacto.
- [x] 1.3 Mantener el tamaño de interacción, foco, hover y comportamiento responsivo de los enlaces; verificar la presentación en viewport móvil y escritorio, incluyendo tema claro y oscuro.

## 2. Accesibilidad y verificación localizada

- [x] 2.1 Añadir o ajustar pruebas e2e para las rutas de Contacto en los locales soportados, verificando cinco enlaces sociales con nombres accesibles y destinos correctos, además del enlace de WhatsApp; verificar con el comando de pruebas del proyecto.
- [x] 2.2 Verificar que los enlaces no dependan del texto visual para su nombre accesible y que el formulario, las etiquetas localizadas y el envío no cambien; ejecutar `npm run lint` y documentar cualquier resultado relevante.

## 3. Integración

- [x] 3.1 Ejecutar la suite de validación disponible y revisar manualmente Contacto en español, inglés y portugués para confirmar que no se alteraron el orden de redes, URLs, apertura externa ni el enlace de WhatsApp.
