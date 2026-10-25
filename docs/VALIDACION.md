# Validación de Recepy

## Interfaz editorial actual

La versión editorial pasó las dieciséis pruebas automatizadas: nueve de datos, validación y persistencia, una de conservación de los estilos históricos y seis del controlador de modales. ESLint terminó sin errores ni advertencias; la compilación de producción con Webpack y un trabajador generó las nueve páginas estáticas sin errores. Las siete rutas principales respondieron HTTP 200 al ejecutar la compilación local.

La revisión en Chrome incluyó portada, recetario, ficha, formulario y perfil. Se comprobó la apertura del formulario desde la cabecera, el cierre con Escape y la devolución del foco al control de apertura. El catálogo también se revisó a 390 píxeles de ancho, sin desbordamiento horizontal. Las capturas actuales del README están en `docs/images/editorial`.

La cobertura de pantallas, carga, errores y estados vacíos se detalla en [INTERFAZ-COMPLETA.md](INTERFAZ-COMPLETA.md); las decisiones visuales están en [DISENO-EDITORIAL.md](DISENO-EDITORIAL.md). Estos resultados corresponden al modo de demostración local y no certifican una integración real con Auth0 o Firebase.

## Registro de la recuperación anterior

El siguiente registro corresponde a la restauración previa al rediseño editorial y se conserva como parte de la historia del proyecto.

Revisión realizada el 24 de octubre de 2026 con Node.js 24.19.0 y la configuración de demostración predeterminada.

### Comprobaciones automatizadas de la recuperación

- Nueve pruebas de la lógica de recetas aprobadas: ejemplos, campos obligatorios, tipos de datos, categorías, URL de vídeo, persistencia, registros inválidos y límite local.
- Una prueba adicional compara el CSS compilado de las doce hojas Sass con `original-2021`: conserva sus reglas visuales aunque se formatee el código.
- ESLint sin errores ni advertencias.
- Prettier sin diferencias de formato.
- Compilación de producción completada para todas las rutas con `npm run build`.

La compilación utiliza Webpack y un trabajador para reducir los picos de memoria en equipos con pocos recursos. El primer intento con Turbopack encontró un error de recursos de Windows; la configuración publicada usa la alternativa que se comprobó correctamente.

### Comprobación histórica en Chrome

Se ejecutó la compilación de producción con `npm start` y se comprobó:

1. Portada histórica y acceso mediante el botón Log In, sin Google.
2. Interior gris con los controles superiores y los carruseles originales.
3. Apertura de receta destacada y detalle con ingredientes y preparación.
4. Perfil superior y vista Mis recetas vacía.
5. Rechazo del formulario vacío: cuatro campos de texto obligatorios y categoría.
6. Publicación de una receta temporal sin imagen ni vídeo, usando la portada como respaldo.
7. Presencia de esa receta en el catálogo y en la categoría Parrilla.
8. Persistencia de la receta después de recargar esa categoría.
9. Aparición de la receta en Mis recetas, apertura de su detalle y cierre mediante X.
10. Eliminación de los datos temporales mediante Borrar recetas de prueba y vuelta al estado vacío.

No se registraron errores ni advertencias del navegador durante ese recorrido funcional. Los modales conservan el mecanismo histórico de fragmentos de URL y CSS `:target`; se cierran con su enlace X. Las capturas del README se guardaron como archivos locales del repositorio.

La tipografía Italianno se registra desde una copia local oficial, porque el import remoto histórico queda después de otras reglas al extraer el CSS. La fuente y su licencia se conservan en `public/fonts/italianno/`.

## Lo que estas pruebas no certifican

No se inició sesión en Auth0 ni se consultó el proyecto Firebase de 2021. Tampoco se probaron escrituras en la nube: están deshabilitadas en la recuperación. La configuración de servicios externos y su autorización requieren una revisión propia antes de usar datos reales.

El workflow de GitHub repite formato, lint, pruebas y compilación en cada cambio de `main` o pull request. Su resultado se consulta en la pestaña Actions del repositorio.
