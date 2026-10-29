# Tasks

## 1. Rediseñar la composición de Contacto

- [x] 1.1 Reorganizar el markup de `app/[lang]/contacto/page.tsx` para presentar el correo como acción principal y agrupar redes sociales, WhatsApp e información complementaria en una composición equilibrada; verificar que se mantengan los destinos existentes.
- [x] 1.2 Aplicar clases responsive con layout flexible para móvil, tablet y escritorio, incluyendo estados de foco visibles y ausencia de desbordamiento horizontal; verificar visualmente los viewports definidos en la configuración de Playwright.
- [x] 1.3 Revisar los textos de contacto en español, inglés y portugués para que describan correctamente la nueva composición; verificar que no existan referencias al formulario eliminado.

## 2. Verificar accesibilidad y comportamiento responsive

- [x] 2.1 Ampliar las pruebas end-to-end de contacto para validar correo, redes sociales y WhatsApp en los tres idiomas, además de comprobar que cada viewport no tenga overflow horizontal; verificar con Playwright.
- [x] 2.2 Ejecutar lint y build de Next.js después del rediseño y corregir cualquier referencia o tipo afectado; verificar que ambos comandos terminen exitosamente.
