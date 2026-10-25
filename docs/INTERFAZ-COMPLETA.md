# Cobertura de la interfaz de Recepy

La capa editorial se aplica a toda la interfaz local existente. La revisión amplía el trabajo de portada y catálogo a los estados secundarios y al uso de los diálogos con teclado. Los contratos de recetas, la sesión, los ejemplos y el almacenamiento no se modifican.

| Vista o estado                                  | Presentación y recorrido                                                                                                               |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Portada                                         | Identidad, acceso al recetario, fotografía histórica, introducción y créditos.                                                         |
| Recetario                                       | Cabecera, destacados, tarjetas, categorías, perfil y acceso al formulario.                                                             |
| Pastelería, Vegetariano, Parrilla y Otras ideas | Cabecera compartida, título editorial, tarjetas y estado sin recetas.                                                                  |
| Mis recetas                                     | Lista local, estado vacío, controles y regreso al recetario.                                                                           |
| Ficha de receta                                 | Fotografía o vídeo, autor, descripción, ingredientes y preparación.                                                                    |
| Compartir receta                                | Campos, miniatura opcional, vídeo, categoría, guardado y validaciones identificadas para lectores de pantalla.                         |
| Perfil                                          | Avatar, identidad de demostración, acceso a recetas propias y cierre de sesión.                                                        |
| Carga y errores                                 | Tarjetas editoriales para sesión y datos; mensajes de acceso y guardado, sin cuadros de alerta del navegador para el inicio de sesión. |
| Página no encontrada y fallo del servidor       | Páginas 404 y 500 propias, con la identidad de Recepy y enlaces de regreso.                                                            |

Los diálogos conservan sus fragmentos de URL, de modo que los enlaces históricos siguen funcionando. Un controlador compartido lleva el foco al diálogo, limita Tab y Shift+Tab a sus controles, cierra con Escape, devuelve el foco al enlace de apertura y aísla el fondo con `inert` y `aria-hidden`. Al cerrar o desmontar una ruta se restauran los valores anteriores. Su visibilidad mejorada usa un atributo explícito: no depende de que `pushState` de Next Link actualice `:target`. Sin JavaScript, el selector de fragmento sigue siendo el respaldo. El efecto no depende de animaciones; el diseño respeta movimiento reducido.

Se añadieron seis pruebas del controlador: fragmentos que no son diálogos, foco inicial y aislamiento, navegación por teclado, cierre y restauración, cambio entre diálogos y limpieza al desmontar. Las dieciséis pruebas totales pasan, manteniendo sin cambios las nueve pruebas de datos y persistencia y la comprobación de los estilos históricos. ESLint pasó sin errores ni advertencias y la compilación de producción terminó sin errores, con nueve páginas estáticas generadas. La revisión visual en Chrome de esa compilación incluyó portada, catálogo, ficha, formulario y perfil, junto con apertura de diálogos, cierre con Escape y retorno del foco. El catálogo se comprobó también a 390 píxeles de ancho, sin desplazamiento horizontal.

Esta preparación corresponde a la interfaz y a la demostración local. No supone actualizar Firebase, Auth0, las reglas de datos ni una integración de producción, y tampoco acredita pruebas en una cuenta externa. Las fotografías de comida siguen siendo las originales de baja resolución; se conserva su procedencia en vez de presentarlas como material nuevo.
