# Tasks

## 1. Texto localizado y composición del footer

- [x] 1.1 Revisar y adaptar las entradas `footer.copyright` de español, inglés y portugués para que expresen el texto base y permitan insertar el año dinámico; verificar que las tres traducciones mantengan su formato esperado.
- [x] 1.2 Actualizar `components/site-footer.tsx` para obtener el año calendario vigente durante el renderizado y componerlo con el texto localizado; verificar que el marcado visible incluya el año actual sin alterar los enlaces del footer.

## 2. Verificación del comportamiento

- [x] 2.1 Agregar o ajustar pruebas E2E del footer para las rutas/locales soportados, comprobando que muestran el año del reloj actual y que los enlaces existentes siguen funcionando.
- [x] 2.2 Ejecutar el lint y la suite de pruebas relevante del proyecto; verificar que no existan errores de tipos, formato ni regresiones visuales en el shell localizado.
