# Configuración de Recepy

La aplicación arranca en modo de demostración. No necesita las cuentas de Auth0, Firebase o Vercel usadas en 2021.

## Requisitos y arranque

Usa Node.js **22.13.0 o posterior** y npm. El entorno empleado durante la recuperación fue Node.js 24.19.0.

```bash
npm ci
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). Para declarar variables, copia `.env.example` a `.env.local` en la raíz del proyecto. Ese archivo es local y no debe subirse a Git.

Las variables `NEXT_PUBLIC_` se incorporan al código entregado al navegador. Después de cambiarlas, reinicia el servidor de desarrollo o vuelve a compilar y desplegar el proyecto.

## Modo demo

```dotenv
NEXT_PUBLIC_DATA_MODE=demo
```

Este es el comportamiento predeterminado incluso cuando no existe `.env.local`. La demo ofrece un perfil local y recetas de ejemplo que permiten recorrer la aplicación sin iniciar sesión en un proveedor externo.

### Recorrido con la interfaz original

1. Abre la portada fotográfica y pulsa el botón `Log In`. En modo demo entra directamente al interior: no se abre Google ni se crea una cuenta externa.
2. Explora el interior gris, los carruseles de recetas y las categorías. Las fichas y controles usan los modales de fragmento de URL de la interfaz histórica.
3. Usa el control superior para agregar una receta. Completa los campos y guarda la preparación; la demo valida la información antes de escribir en el navegador.
4. Consulta el perfil superior y la vista **Mis recetas**, disponible en `/home/mis-recetas`, para revisar tus publicaciones locales.

La vista Mis recetas es una adaptación de la demo. Usa el archivo histórico `GetUser.module.scss`, pero no corresponde a un componente `GetUser` original encontrado en el repositorio. Las recetas de ejemplo y la sesión local tampoco son cuentas o datos recuperados de 2021.

Los estilos conservan la portada con Italianno roja y sombra blanca, el interior `#141414` con paneles `#1e1e1e`, los carruseles horizontales y los modales CSS `:target`. Las transiciones de interacción son de `333ms`; Motion mantiene las apariciones retardadas con `duration: 0` del código histórico. No necesitas activar ninguna opción para ver esa presentación en `main`.

Las recetas nuevas se guardan en `localStorage`, con la clave `recepy-demo-recipes-v1`. Solo están disponibles en el mismo navegador y origen; `localhost`, `127.0.0.1` y un dominio publicado son orígenes distintos y no comparten ese almacenamiento.

- La imagen es local y admite hasta **1 MiB**. Cuando no se proporciona una imagen, se usa un recurso de la aplicación.
- El video es una **URL HTTP o HTTPS opcional**. No se sube un archivo de video.
- Se valida el contenido del formulario y de la información leída del almacenamiento.
- Existe un límite de 3.000.000 de caracteres para las recetas serializadas, además de las cuotas que imponga el navegador.
- La vista Mis recetas permite borrar las recetas de prueba y volver a los ejemplos.
- Mis recetas muestra las publicaciones locales y permite comprobar el recorrido después de guardarlas; los ejemplos del catálogo no representan publicaciones del visitante.
- Borrar los datos del navegador elimina las recetas guardadas. La demo no ofrece sincronización, copias de seguridad ni publicación para otros visitantes.

Los ejemplos no proceden de la base de datos original y no deben confundirse con datos de sus usuarios.

## Modo Firebase: lectura configurable

```dotenv
NEXT_PUBLIC_DATA_MODE=firebase
NEXT_PUBLIC_AUTH0_DOMAIN=tu-dominio.auth0.com
NEXT_PUBLIC_AUTH0_CLIENT_ID=tu-identificador-publico
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_FIREBASE_API_KEY=tu-api-key-web
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu-proyecto
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu-identificador
NEXT_PUBLIC_FIREBASE_APP_ID=tu-app-id
```

Son valores ilustrativos. Usa la configuración real de un proyecto y una aplicación que puedas administrar; no reutilices una cuenta histórica sin verificar su estado y sus permisos.

| Variable                                   | Responsabilidad                                                                    |
| ------------------------------------------ | ---------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_DATA_MODE`                    | `demo` para almacenamiento local; `firebase` para consultar Firestore              |
| `NEXT_PUBLIC_AUTH0_DOMAIN`                 | Dominio de la aplicación de Auth0, sin protocolo                                   |
| `NEXT_PUBLIC_AUTH0_CLIENT_ID`              | Identificador público de la aplicación de Auth0                                    |
| `NEXT_PUBLIC_APP_URL`                      | Origen de la aplicación, sin ruta, usado para construir las direcciones de retorno |
| `NEXT_PUBLIC_FIREBASE_API_KEY`             | Identificador web de acceso a las APIs del proyecto Firebase                       |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`         | Dominio de autenticación de la aplicación Firebase                                 |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID`          | Proyecto cuya colección de recetas se consultará                                   |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`      | Bucket de la configuración web; esta recuperación no realiza subidas a Storage     |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Identificador del remitente de la configuración web                                |
| `NEXT_PUBLIC_FIREBASE_APP_ID`              | Identificador de la aplicación web registrada en Firebase                          |

El conector consulta una colección Firestore llamada `recipes`. Cada documento puede contener `name`, `description`, `ingredients`, `howTo`, `type`, `image`, `video`, `author` y `date`. Las categorías usadas por la aplicación son `Pasteleria`, `Vegetariano`, `Parrilla` y `Otro`. El ID del documento se usa como identificador de la receta.

Usa `image` con una URL accesible y `video` con una URL web opcional. Mostrar una receta no copia automáticamente sus archivos multimedia al repositorio ni garantiza la disponibilidad futura de sus enlaces.

### Configurar Auth0

Usa una aplicación de tipo Single Page Application y configura las URLs permitidas para el entorno elegido.

Para el ejemplo local con `NEXT_PUBLIC_APP_URL=http://localhost:3000`:

- Callback permitido: `http://localhost:3000/home/lobby`.
- URL de cierre de sesión permitida: `http://localhost:3000`.
- Web origin permitido: `http://localhost:3000`.

Si entras mediante `127.0.0.1` o publicas en otro dominio, usa el origen correspondiente de forma consistente en las variables y en Auth0. Revisa también la configuración del proveedor antes de probar el inicio de sesión.

Auth0 identifica al visitante de la interfaz. Esa sesión **no inicia una sesión de Firebase Authentication** ni concede por sí sola permisos para leer o escribir documentos en Firestore.

### Reglas y autorización de Firebase

La configuración web de Firebase y el Client ID de Auth0 son identificadores públicos. No equivalen a una clave privada de servidor y tampoco sustituyen las reglas de seguridad.

La lectura de Firestore debe estar autorizada por las reglas del proyecto. No abras el acceso a datos privados para conseguir que el catálogo cargue. Si las reglas exigen Firebase Authentication, la sesión de Auth0 de esta aplicación no satisface esa condición automáticamente; habrá que implementar el puente de identidad adecuado.

Esta recuperación no incluye un backend que valide tokens de Auth0 y autorice escrituras en Firebase. Por eso el modo `firebase` se mantiene en **solo lectura** y la publicación en la nube no está habilitada.

Antes de habilitar publicación real se necesita, como mínimo:

1. Un backend que verifique la firma, el emisor, la audiencia y la caducidad del JWT de Auth0.
2. Una estrategia de autorización para Firebase: operaciones desde un backend autorizado o intercambio controlado hacia tokens de Firebase, con permisos por usuario.
3. Reglas de Firestore y Storage acordes con esa identidad, propiedad de los documentos y visibilidad de los datos.
4. Validación en servidor del contenido y de los archivos, límites de tamaño y gestión de errores de subida.
5. Pruebas de acceso permitido y denegado con cuentas reales del entorno elegido.

Las claves de cuentas de servicio, secretos de cliente y credenciales de administración deben permanecer en el servidor. Nunca deben asignarse a variables `NEXT_PUBLIC_`, guardarse en recursos públicos o incluirse en el repositorio.

## Compilación y ejecución

```bash
npm run lint
npm test
npm run format:check
npm run build
npm start
```

Para publicar una demo, conserva `NEXT_PUBLIC_DATA_MODE=demo` durante la compilación. Cada visitante tendrá su propio almacenamiento local; un despliegue público no convierte la demo en una base de datos compartida.

La compilación no recupera despliegues antiguos de Vercel ni configura cuentas externas. La historia y el alcance de lo conservado se explican en [RECUPERACION.md](RECUPERACION.md).

## Problemas frecuentes

| Síntoma                                                        | Qué revisar                                                                                           |
| -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| No aparecen recetas de prueba guardadas                        | Que uses el mismo navegador y origen; revisa si se borró el almacenamiento local                      |
| No se puede guardar una receta local                           | Tamaño de la imagen, límite de datos y permisos o cuota del navegador                                 |
| Auth0 rechaza la redirección                                   | Coincidencia entre `NEXT_PUBLIC_APP_URL`, callback, logout URL y web origin permitidos                |
| Firebase no devuelve recetas                                   | Variables del proyecto, existencia de `recipes`, reglas de lectura y estado del servicio              |
| El acceso de Auth0 funciona pero Firebase deniega la operación | Son sistemas de autorización distintos; falta revisar las reglas o implementar el puente de identidad |
| Cambiar `.env.local` no cambia el comportamiento               | Reinicia el servidor o vuelve a compilar; las variables públicas se incluyen en la compilación        |
