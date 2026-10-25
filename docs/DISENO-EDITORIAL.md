# Capa editorial de Recepy

Rediseño preparado el 24 de octubre de 2026 para mostrar la aplicación con imágenes reales en el portfolio. La presentación conserva una identidad culinaria propia: marfil, tinta, oliva y tomate; títulos de estilo editorial, marca Italianno local y una composición fotográfica más tranquila.

## Qué cambia

- Portada con acceso directo al recetario y una ficha visual de la pizza original. La foto se mantiene cerca de su tamaño nativo: el archivo histórico tiene 275 × 183 píxeles.
- Cabecera compartida, navegación a Mis recetas y acceso al formulario para compartir.
- Tarjetas de recetas, categorías con iconos SVG y fichas con listas de ingredientes y preparación.
- Vista para las recetas locales, perfil, formulario y pie con los tres autores originales y las instituciones.
- Distribución adaptable a móvil, foco visible e interacciones que respetan movimiento reducido.

## Qué se conserva

No se modifica el contrato de recetas, la validación, el límite de imágenes, los ejemplos, la persistencia en `localStorage` ni la configuración de datos y sesión. El formulario sigue guardando únicamente recetas de demostración en este navegador. El diseño mantiene los fragmentos de URL. Un controlador compartido usa `data-recepy-open` para mostrar los diálogos, gestiona el foco y el aislamiento del fondo, y permite cerrarlos con Escape. `:target` se conserva como respaldo sin JavaScript.

Se reutilizan los recursos del repositorio sin añadir paquetes, fotografías generadas ni servicios. La referencia Git `original-2021` mantiene íntegro el árbol de doce hojas de estilo de la interfaz histórica. La prueba correspondiente verifica esa copia; ya no exige que la nueva presentación coincida visualmente con 2021.

## Ejecutar

```bash
npm run dev -- --port 3001
```

Abrir `http://127.0.0.1:3001/` y entrar al recetario. No se necesita cuenta ni archivo de entorno en el modo de demostración predeterminado. El código de este repositorio incluye la nueva presentación y mantiene el modo de demostración local. Versionar estas mejoras no actualiza Firebase o Auth0 ni implica un despliegue del servicio.

## Comprobaciones

Las dieciséis pruebas automatizadas de Node pasan: nueve de datos, validación y persistencia sin modificaciones, una del archivo histórico de estilos y seis de interacción de modales. Las siete rutas de aplicación responden HTTP 200 en el servidor local: portada, recetario, cuatro categorías y Mis recetas.

La compilación de producción con Webpack y un trabajador terminó sin errores y generó las nueve páginas estáticas. Se verificaron las siete rutas de aplicación con HTTP 200 también al ejecutar `next start`. La revisión visual en Chrome incluyó portada, recetario, detalle de receta y una pantalla de 390 píxeles de ancho sin desbordamiento horizontal. El control para compartir conserva su nombre accesible en móvil aunque oculte el texto visible.

Las cuatro capturas actuales del README están en `docs/images/editorial`: portada, catálogo, ficha y vista móvil. Se copiaron de las tomas reales revisadas para el portfolio, conservando sus bytes y verificando SHA-256. Las capturas antiguas de `docs/images/portada.jpg` y `docs/images/recetas.jpg` se conservan dentro de la sección de historia del README; no representan el nuevo aspecto editorial.

## Revisión completa de interfaz

La revisión posterior incluye también estados de carga, error, acceso no disponible y listas vacías, páginas 404 y 500 con la misma identidad, validaciones accesibles y comportamiento de teclado en los diálogos. La cobertura y los límites de la demostración se detallan en `INTERFAZ-COMPLETA.md`. Las dieciséis pruebas, incluidas seis nuevas de foco y cierre de modales, pasan; los contratos de datos y de sesión permanecen intactos.
