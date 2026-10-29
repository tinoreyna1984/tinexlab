# Tasks

## 1. Actualizar la experiencia de contacto

- [x] 1.1 Sustituir el formulario de contacto por un bloque localizado que muestre `tinoreyna1984@gmail.com` como enlace `mailto:` visible, copiable y accesible; verificar manualmente las rutas `/es/contacto`, `/en/contacto` y `/pt/contacto`.
- [x] 1.2 Actualizar los diccionarios de español, inglés y portugués con las etiquetas e instrucciones del contacto directo; verificar que no queden claves de formulario sin uso ni textos sin traducir.
- [x] 1.3 Ajustar o añadir la prueba end-to-end de contacto para comprobar el nombre accesible y el destino exacto `mailto:tinoreyna1984@gmail.com`, además de conservar los enlaces sociales y WhatsApp; verificarla con Playwright.

## 2. Retirar la integración de envío

- [x] 2.1 Eliminar el componente del formulario y la Server Action de envío, junto con el honeypot y la validación específica; verificar que no existan imports ni referencias de ejecución a esos módulos.
- [x] 2.2 Retirar `@sendgrid/mail`, las dependencias de validación que queden sin uso y las variables `SENDGRID_*` del ejemplo de entorno; verificar con una instalación limpia y el análisis de dependencias que el proyecto siga resolviendo correctamente.
- [x] 2.3 Ejecutar lint y build de Next.js y corregir referencias huérfanas; verificar que ambos comandos terminen exitosamente.
