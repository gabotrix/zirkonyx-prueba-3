# zirkonyx-prueba-3
Prueba de ZIRKONYX: página creada desde cero (fundación de adopción)

Página de la Fundación Huellas de Caldas. Es HTML, CSS y JavaScript sin paso de armado: GitHub Pages sirve los archivos tal cual.

- `index.html`: encabezado, pie y el espacio donde se dibujan las pantallas.
- `css/estilos.css`: colores, tipografías y ajustes para celular.
- `js/animales.js`: la lista de animales en adopción (aquí se agregan, quitan o cambian).
- `js/app.js`: las pantallas (inicio, adopta, ficha, solicitud en dos pasos y listo) y los filtros.
- `js/config.js`: la dirección (SOLICITUDES_URL) a la que se envían las solicitudes de adopción.
- `apps-script/solicitudes.js`: el código de Google Apps Script que recibe cada solicitud, la anota en la hoja de Google «Solicitudes de adopción» (con Estado: Nueva, En entrevista, Aprobada, No aprobada) y manda el aviso a adopciones@huellasdecaldas.org y la confirmación a la persona. No lo carga la página: se pega en script.google.com con la cuenta de la Fundación (los pasos, incluida la creación de la hoja con `prepararHoja`, están al inicio del archivo). La hoja se comparte solo con el equipo de adopciones.
- `img/`: fotos.

Para verla en el computador basta con abrir `index.html` en el navegador.
