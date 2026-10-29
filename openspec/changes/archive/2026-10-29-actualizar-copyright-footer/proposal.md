# Proposal

## Why

El texto de copyright del pie de página puede quedar desactualizado cuando cambia el año calendario. Esto reduce la precisión del contenido legal visible y requiere una actualización manual innecesaria.

## What Changes

- Generar automáticamente el año mostrado en el copyright usando el año actual del tiempo de ejecución.
- Mantener el copyright visible en el pie de página para todos los locales soportados.
- Evitar que el año quede fijado en los diccionarios o en el marcado estático del sitio.

## Capabilities

### New Capabilities

- `pie-pagina-dinamico`: Mostrar información de copyright del pie de página con el año calendario actual.

### Modified Capabilities

- Ninguna.

## Impact

- Afecta al componente compartido `components/site-footer.tsx` y al flujo que lo renderiza desde `components/locale-shell.tsx`.
- Puede requerir ajustar los datos localizados del footer para conservar únicamente el texto variable y permitir que el año se inserte de forma consistente.
- No cambia rutas, APIs públicas ni dependencias externas; el comportamiento observable cambia únicamente cuando cambia el año calendario.
