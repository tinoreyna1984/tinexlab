# Design

## Context

El shell localizado comparte `SiteFooter` entre las páginas y actualmente le entrega el texto completo desde `dictionary.footer.copyright`. La solución debe conservar la localización del aviso y funcionar durante el renderizado del servidor sin introducir dependencias.

## Goals / Non-Goals

**Goals:**

- Separar el texto localizado del valor dinámico del año.
- Calcular el año vigente en un único punto del footer compartido.
- Mantener una salida estable y testeable para los tres locales.

**Non-Goals:**

- Cambiar el diseño visual, los enlaces o las rutas del pie de página.
- Añadir persistencia, configuración administrativa o una dependencia de fecha.

## Decisions

- **Cálculo en el componente compartido:** obtener el año desde la fecha actual durante el renderizado de `SiteFooter`, porque el valor es una propiedad de presentación y así todas las páginas usan la misma fuente. Alternativamente, calcularlo en cada página duplicaría lógica; usar un valor fijo conserva el problema actual.
- **Localización como plantilla o segmentos:** conservar el texto base en los diccionarios y componerlo con el año mediante un marcador o parámetros explícitos, para que las traducciones no pierdan control sobre el formato. Evitar una traducción completamente construida en el componente, que mezclaría contenido localizado con lógica.
- **Validación por pruebas existentes y nuevas:** verificar que el footer contiene el año del reloj del entorno en cada locale y que los enlaces actuales permanecen intactos. No se requiere una API ni migración de datos.

## Risks / Trade-offs

- [Riesgo] El año depende de la zona horaria del entorno cerca de medianoche del 31 de diciembre → [Mitigación] usar la fecha local en la zona horaria GMT-5 (Bogotá, Lima, Quito).
- [Riesgo] Una traducción podría contener un formato distinto al esperado → [Mitigación] definir el contrato del texto localizado y revisar los tres diccionarios durante la implementación.

## Migration Plan

Actualizar el componente y los textos localizados, agregar o ajustar pruebas, y desplegar normalmente. El rollback consiste en restaurar esos cambios; no hay datos persistidos ni migración irreversible.

## Open Questions

No hay preguntas abiertas que cambien el alcance o el contrato definido.
