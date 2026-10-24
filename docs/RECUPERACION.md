# Recuperación del proyecto

Esta recuperación parte de una obra estudiantil de 2021. Su propósito es conservar el proyecto, identificar la versión más completa y permitir que vuelva a explorarse sin depender de cuentas de servicios antiguas.

## Autoría y procedencia

El README original atribuye Recepy a **Juan Pablo Gutierrez Gutierrez, Esteban Perez Garzon y Cristian David Ramirez Vargas**, estudiantes del **Cefit**. El proyecto conserva además los recursos institucionales de Cefit y SENA que formaban parte de la versión original. La migración no convierte una obra colaborativa en una obra de autor individual.

- Origen: [gautierrgautier/application](https://github.com/gautierrgautier/application).
- Destino de la recuperación: [own21m/recepy](https://github.com/own21m/recepy).
- El repositorio de origen se mantiene; la nueva publicación conserva su historial.
- No se añade una licencia nueva al trabajo colaborativo ni se presupone permiso de reutilización de todos los recursos de terceros.

## Cómo se eligió la versión

Se revisaron ramas, árboles de archivos, manifiestos, commits y estados públicos de despliegue el 24 de octubre de 2026. Los cuatro repositorios publicaban únicamente la rama `main`.

| Repositorio                                                                       | Revisión comparada                         | Evidencia principal                                                                                                    |
| --------------------------------------------------------------------------------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| [application](https://github.com/gautierrgautier/application)                     | `6bc8d07e0305dbf04689936f29cd357b06a0ebd5` | 51 commits; catálogo, destacados, cuatro categorías, perfil y formulario con imagen, video, ingredientes y preparación |
| [recepy-application](https://github.com/gautierrgautier/recepy-application)       | `e50c0c5912b1545d53e9c9c697790e5eb0989238` | 13 commits; prototipo con acceso, perfil y formulario de nombre, descripción y tipo                                    |
| [ApplicationRepository](https://github.com/gautierrgautier/ApplicationRepository) | `f90a1acc1aa9cc7e8287d01e30c71aff4a8c6bc6` | 8 commits; prototipo anterior con styled-components, Auth0 y formulario básico                                         |
| [recepy-app](https://github.com/gautierrgautier/recepy-app)                       | `b3af9ea8b70264980836c343621f51320db4b8e4` | 3 commits; maqueta inicial de interfaz y componentes de portada                                                        |

Los dos repositorios más antiguos guardaban miles de archivos de `node_modules` y `.next` en Git. Su mayor tamaño no equivalía a una aplicación más completa.

Se eligió **application** por sus funcionalidades y evolución. No era necesario retroceder toda la aplicación para corregir los problemas finales: hacerlo habría descartado parte del formulario multimedia, los modales y los estilos terminados.

## Referencias históricas conservadas

| Referencia               | Commit                                     | Qué representa                                                                              |
| ------------------------ | ------------------------------------------ | ------------------------------------------------------------------------------------------- |
| `original-2021`          | `6bc8d07e0305dbf04689936f29cd357b06a0ebd5` | Último árbol publicado del repositorio original, de octubre de 2021                         |
| `ultimo-despliegue-2021` | `dd804bc0ba31edc7b82079986a71ce113edb651c` | Última revisión de esta secuencia con despliegue de producción informado como satisfactorio |

La rama `demo-modernizada` conserva la primera demostración de la recuperación, en `45790cb`, que utilizaba otra composición visual. La rama `main` vuelve a tomar los estilos y la estructura visual de `original-2021` como referencia y mantiene las adaptaciones de datos locales necesarias para recorrer el proyecto.

El despliegue de `dd804bc` se creó el **13 de octubre de 2021 a las 00:23:52 UTC** y su estado público es `success`. Los siete despliegues posteriores consultados, desde `bf6044f` hasta `6bc8d07`, tienen estado `failure`.

Evidencias públicas: [estado del último despliegue satisfactorio](https://api.github.com/repos/gautierrgautier/application/deployments/437027742/statuses), [primer fallo posterior](https://api.github.com/repos/gautierrgautier/application/deployments/438775201/statuses) y [estado del último commit original](https://api.github.com/repos/gautierrgautier/application/deployments/440804679/statuses).

Estos registros documentan el estado comunicado por GitHub/Vercel en aquel momento. Un despliegue satisfactorio no certifica todas las funciones de la aplicación, y sus metadatos no recuperan la cuenta de Vercel ni garantizan que una URL histórica siga disponible.

## Problemas encontrados

### Importaciones del pie de página

El archivo final estaba en `components/content/Footer.jsx`, pero `pages/index.js` lo buscaba en `components/Footer` y `components/content/Main.jsx` en `../Footer`.

El historial permite seguir el error: `6906ef3` movió el componente a la raíz de `components` y ajustó los imports; `512c82d` lo devolvió a `content` sin actualizar esos dos consumidores. Esas rutas rotas son errores comprobables de compilación. Sin los logs privados de Vercel no puede afirmarse que fueran la única causa de los despliegues fallidos.

### Carga y presentación de recetas

`Special.jsx` tenía un efecto sin dependencias que podía repetir consultas tras cada render. Las vistas de detalle accedían directamente a `recipes[index]`, lo que podía fallar al recibir una colección vacía. También faltaban estados suficientes de carga y error, y el formulario permitía situaciones de envío anteriores a la finalización de sus subidas.

### Dependencia de servicios antiguos

La autenticación incluía direcciones de retorno fijas a localhost y la configuración apuntaba al proyecto de Firebase de 2021. Iniciar sesión con Auth0 no demostraba autorización para escribir en Firebase. No se encontraron reglas de Firestore o Storage en el árbol original.

La recuperación no reutiliza esa infraestructura automáticamente. La demo funciona sin ella y la integración configurable con Firebase se limita a lectura. La publicación en la nube queda pendiente de un backend que valide la sesión y aplique permisos adecuados.

## Qué conserva y qué cambia la recuperación

- Conserva la historia Git, los créditos, las categorías y los recursos visuales disponibles del proyecto de 2021.
- Recupera los estilos originales y la composición gris del interior, la portada fotográfica, los carruseles y los modales por `:target`.
- Repara la estructura de importaciones y organiza la carga de recetas mediante un proveedor compartido.
- Añade estados de carga, error y ausencia de resultados para evitar depender de que siempre existan recetas.
- Actualiza las dependencias y herramientas, manteniendo Pages Router y los estilos Sass por componente.
- Incorpora una demo con ejemplos identificados como tales y persistencia local de nuevas recetas.
- Declara la configuración externa mediante variables de entorno y evita incluir credenciales privadas.
- Incluye comprobaciones de formato, lint, compilación y pruebas de la lógica de recetas.

La selección de destacados conserva un criterio sencillo de ordenación por nombre; no se atribuyen valoraciones o actividad social que no se hayan implementado.

## Fidelidad visual y adaptaciones de la demo

La referencia visual es `application` en `6bc8d07`, cuya interfaz final se incorporó principalmente en `bf6044f`. No se toma el rediseño de la primera demo como prueba de cómo era la aplicación de 2021.

| Elemento              | Evidencia histórica que se recupera                                                                                         |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Portada               | `Index.module.scss`: `wallpaper.jpg`, degradado hacia negro, marca roja en Italianno, tamaño `40vh` y sombra blanca         |
| Interior              | `styles/global/style.scss`: fondo `rgb(20,20,20)`, equivalente a `#141414`, y tipografía del sistema                        |
| Controles y paneles   | Superficies `rgb(30,30,30)`, equivalentes a `#1e1e1e`, bordes, sombras negras y esquinas redondeadas                        |
| Destacados y catálogo | Franjas horizontales desplazables; destacados con fotografía de fondo y tarjetas generales con imagen, nombre, autor y tipo |
| Modales               | Fragmentos de URL, selectores `:target`, overlay negro y panel gris en los estilos de receta, usuario y formulario          |
| Interacciones         | Transiciones CSS de `333ms`, hover y apariciones de Motion con retardos históricos                                          |

El código histórico declara `duration: 0` en las apariciones de Motion. Se conserva ese comportamiento: los elementos aparecen tras sus retardos, sin atribuirles una interpolación suave de escala que no ejecutaba aquella versión. Los estilos CSS aportan las transiciones de interacción.

El botón de acceso recupera el texto `Log In`. En modo demo enlaza con el interior mediante una sesión local; no abre Google ni crea una cuenta externa. El perfil sigue situado en los controles superiores. Los ejemplos se construyeron para probar catálogo, categorías y detalle, y no proceden de una copia de la base de datos histórica.

### Mis recetas

La recuperación incorpora `/home/mis-recetas` para revisar las recetas publicadas localmente. Utiliza `styles/database/GetUser.module.scss`, un archivo que sí existía en el árbol original.

No se encontró `GetUser.jsx`, `GetUser.js`, una página de perfil con listado propio ni una consulta por autor en el historial público revisado. El formulario histórico guardaba `idAuthor`, pero eso no prueba que la vista estuviera terminada. Por tanto, **Mis recetas es una adaptación de demostración**, no un listado original que se hubiera recuperado. Se añade para probar las publicaciones propias manteniendo el lenguaje visual de los estilos disponibles.

Las adaptaciones funcionales de la recuperación incluyen datos de ejemplo, persistencia en `localStorage`, validación, estados vacíos y mensajes de carga o error. Los identificadores, URLs y servicios de 2021 no se reactivan por conservar su interfaz.

## Imágenes del README

El README final utilizaba una captura alojada en Discord con identificador `900194490462117998`; una versión anterior enlazaba otra con identificador `889674441804636220`. Ambos enlaces respondieron **HTTP 404** durante la revisión.

No se encontró copia de esas capturas en los archivos ni en el historial revisado. Se reemplazan por capturas nuevas de la recuperación almacenadas en `docs/images/portada.jpg` y `docs/images/recetas.jpg`. No se presentan como las imágenes originales recuperadas.

La comparación entre `dd804bc` y el último árbol original no mostró archivos propios eliminados. Las imágenes de aquella revisión siguen disponibles. La versión final añadió, entre otros recursos, `wallpaper.jpg`, fotos adicionales y los logotipos institucionales.

## Alcance y límites

Esta recuperación conserva **código, recursos disponibles e historia del repositorio**. No es una restauración de los servicios de producción de 2021.

No se recuperaron bases de datos, cuentas de usuarios, recetas privadas, archivos de Storage, secretos de servidor ni copias de seguridad de Vercel, Auth0 o Firebase. Las recetas de demostración son ejemplos nuevos; las recetas que se agregan en la demo solo se almacenan en ese navegador.

La configuración y las condiciones necesarias antes de conectar servicios reales se describen en [CONFIGURACION.md](CONFIGURACION.md).
