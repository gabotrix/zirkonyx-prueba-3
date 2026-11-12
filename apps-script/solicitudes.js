/*
  Solicitudes de adopción — Fundación Huellas de Caldas
  Código de Google Apps Script (no lo carga la página: se pega en script.google.com).
  Recibe cada solicitud de la página y manda dos correos:
    1. el aviso a adopciones@huellasdecaldas.org con todos los datos;
    2. la confirmación «Recibimos tu solicitud» a la persona que la envió.

  Cómo publicarlo (con la cuenta de Google de la Fundación, no la de una persona):
    1. Entrar a https://script.google.com con la cuenta de la Fundación y crear un proyecto
       nuevo llamado «Solicitudes de adopción».
    2. Pegar todo este archivo en Código.gs y guardar.
    3. Implementar > Nueva implementación > tipo «Aplicación web».
         Ejecutar como: Yo (la cuenta de la Fundación)
         Quién tiene acceso: Cualquier persona
    4. Aceptar los permisos (enviar correos en su nombre).
    5. Copiar la URL de la aplicación web (termina en /exec) y pegarla en
       js/config.js, en SOLICITUDES_URL.
    Si después se cambia este código, hay que hacer Implementar > Gestionar implementaciones >
    editar > Versión nueva, para que la misma URL use el código nuevo.

  La URL es pública: cualquiera podría mandarle datos. Por eso el script descarta
  las solicitudes con el campo oculto contra spam lleno y vuelve a revisar los datos.
  MailApp tiene un límite diario (unos 100 destinatarios en cuentas gratuitas); cada
  solicitud usa 2.
*/

var CORREO_FUNDACION = "adopciones@huellasdecaldas.org";
var NOMBRE_FUNDACION = "Fundación Huellas de Caldas";
var ZONA_HORARIA = "America/Bogota";
var LARGO_MAXIMO = 3000; // caracteres por campo

function doPost(e) {
  var datos;
  try {
    datos = JSON.parse(e.postData.contents);
  } catch (err) {
    return respuesta({ ok: false, error: "formato" });
  }

  // Campo oculto contra spam: una persona no lo ve, un robot lo llena.
  // Se responde "ok" para que el robot no insista, pero no se manda nada.
  if (datos.web) {
    return respuesta({ ok: true });
  }

  var s = limpiar(datos);
  var error = revisar(s);
  if (error) {
    return respuesta({ ok: false, error: error });
  }
  s.fecha = Utilities.formatDate(new Date(), ZONA_HORARIA, "yyyy-MM-dd HH:mm");

  // Etapa 3: aquí se anota la solicitud en la hoja de seguimiento, dentro de un
  // try/catch para que, si la hoja falla, el correo se mande igual.

  try {
    avisarFundacion(s);
  } catch (err) {
    console.error("No se pudo mandar el aviso: " + err);
    return respuesta({ ok: false, error: "correo" });
  }

  try {
    confirmarSolicitante(s);
  } catch (err) {
    // El aviso ya llegó a la Fundación: la solicitud cuenta como recibida.
    console.error("No se pudo mandar la confirmación: " + err);
  }

  return respuesta({ ok: true });
}

// Para comprobar en el navegador que la URL funciona.
function doGet() {
  return respuesta({ ok: true, servicio: "Solicitudes de adopción" });
}

var CAMPOS = ["animal", "nombre", "cedula", "celular", "correo", "barrio", "vivienda", "otros", "cuales", "porque"];

function limpiar(datos) {
  var s = {};
  CAMPOS.forEach(function (k) {
    s[k] = String(datos[k] == null ? "" : datos[k]).trim().slice(0, LARGO_MAXIMO);
  });
  s.cedula = s.cedula.replace(/[\s.]/g, "");
  s.celular = s.celular.replace(/[\s-]/g, "");
  if (s.otros !== "Sí") s.cuales = "";
  return s;
}

// Las mismas reglas que revisa la página antes de enviar.
function revisar(s) {
  if (!s.animal || !s.nombre || !s.barrio || !s.porque) return "faltan-datos";
  if (!/^\d{6,10}$/.test(s.cedula)) return "cedula";
  if (!/^3\d{9}$/.test(s.celular)) return "celular";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.correo)) return "correo";
  if (s.vivienda !== "Casa" && s.vivienda !== "Apartamento") return "vivienda";
  if (s.otros !== "Sí" && s.otros !== "No") return "otros";
  if (s.otros === "Sí" && !s.cuales) return "cuales";
  return "";
}

function avisarFundacion(s) {
  var cuerpo = [
    "Llegó una solicitud de adopción nueva desde la página.",
    "",
    "Animal: " + s.animal,
    "Fecha: " + s.fecha,
    "",
    "Nombre: " + s.nombre,
    "Cédula: " + s.cedula,
    "Celular: " + s.celular,
    "Correo: " + s.correo,
    "Barrio: " + s.barrio,
    "",
    "Vive en: " + s.vivienda,
    "Otros animales: " + s.otros + (s.cuales ? " (" + s.cuales + ")" : ""),
    "",
    "Por qué quiere adoptar:",
    s.porque,
    "",
    "Para responderle, contesta este correo."
  ].join("\n");

  MailApp.sendEmail({
    to: CORREO_FUNDACION,
    subject: "Solicitud de adopción: " + s.animal + " — " + s.nombre,
    body: cuerpo,
    replyTo: s.correo,
    name: "Página " + NOMBRE_FUNDACION
  });
}

function confirmarSolicitante(s) {
  var nombre = s.nombre.split(/\s+/)[0];
  var cuerpo = [
    "Hola, " + nombre + ":",
    "",
    "Recibimos tu solicitud para adoptar a " + s.animal + ". Gracias por querer darle un hogar.",
    "En los próximos días te llamaremos para conocerte y coordinar una visita.",
    "",
    "Si tienes preguntas, responde este correo o escríbenos a " + CORREO_FUNDACION + ".",
    "",
    NOMBRE_FUNDACION,
    "Manizales, Caldas"
  ].join("\n");

  MailApp.sendEmail({
    to: s.correo,
    subject: "Recibimos tu solicitud",
    body: cuerpo,
    replyTo: CORREO_FUNDACION,
    name: NOMBRE_FUNDACION
  });
}

function respuesta(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
