/*
  Fundación Huellas de Caldas — pantallas de la página.

  Direcciones:
    #inicio                  inicio (con #donar baja a los datos para donar)
    #adopta                  lista de animales con filtros
    #ficha/<id>              ficha de un animal
    #solicitud/<id>/1        solicitud, paso 1: tus datos
    #solicitud/<id>/2        solicitud, paso 2: tu hogar
    #listo                   solicitud enviada

  Los datos de la solicitud solo se guardan en memoria mientras la persona
  llena el formulario (no se guardan en el navegador).
*/
(function () {
  "use strict";

  var CORREO = "adopciones@huellasdecaldas.org";
  var app = document.getElementById("app");

  var TAMANOS = { pequeno: "Pequeño", mediano: "Mediano", grande: "Grande" };
  // Fondo y color del dibujo cuando un animal no tiene foto
  var FONDOS = [["#F6E2B8", "#B7860B"], ["#FBE3D6", "#D9653B"], ["#E4EFE2", "#5E8C61"]];

  var ICONOS = {
    huella: '<circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="20" cy="16" r="2"/><path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"/>',
    donar: '<path d="M11 14h2a2 2 0 0 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16"/><path d="m14.45 13.39 5.05-4.694C20.196 8 21 6.85 21 5.75a2.75 2.75 0 0 0-4.797-1.837.276.276 0 0 1-.406 0A2.75 2.75 0 0 0 11 5.75c0 1.2.802 2.248 1.5 2.946L16 11.95"/><path d="m2 15 6 6"/><path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a1 1 0 0 0-2.75-2.91"/>',
    flecha: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    atras: '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
    perro: '<path d="M11.25 16.25h1.5L12 17z"/><path d="M16 14v.5"/><path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309"/><path d="M8 14v.5"/><path d="M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5-1.931.722-3.576-.297-3.656-1-.113-.994 1.177-6.53 4-7 1.923-.321 3.651.845 3.651 2.235A7.497 7.497 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5"/>',
    gato: '<path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z"/><path d="M8 14v.5"/><path d="M16 14v.5"/><path d="M11.25 16.25h1.5L12 17l-.75-.75Z"/>',
    rescate: '<path d="M7 18v-6a5 5 0 1 1 10 0v6"/><path d="M5 21a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2z"/><path d="M21 12h1"/><path d="M18.5 4.5 18 5"/><path d="M2 12h1"/><path d="M12 2v1"/><path d="m4.929 4.929.707.707"/><path d="M12 12v6"/>',
    salud: '<path d="M11 2v2"/><path d="M5 2v2"/><path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"/><path d="M8 15a6 6 0 0 0 12 0v-3"/><circle cx="20" cy="10" r="2"/>',
    casa: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    apartamento: '<path d="M10 12h4"/><path d="M10 8h4"/><path d="M14 21v-3a2 2 0 0 0-4 0v3"/><path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"/><path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/>',
    corazon: '<path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>',
    enviar: '<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',
    chulo: '<path d="M20 6 9 17l-5-5"/>',
    correo: '<path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/>',
    celular: '<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>',
    banco: '<path d="M10 18v-7"/><path d="M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z"/><path d="M14 18v-7"/><path d="M18 18v-7"/><path d="M3 22h18"/><path d="M6 18v-7"/>',
    cerrar: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>'
  };

  // Estado en memoria
  var filtros = { especie: "todos", tamano: "todos" };
  var solicitud = solicitudVacia();
  var ultima = null; // nombre y animal de la última solicitud enviada, para la pantalla Listo
  var primeraVez = true;

  function solicitudVacia() {
    return {
      animal: "", nombre: "", cedula: "", celular: "", correo: "", barrio: "",
      vivienda: "", otros: "", cuales: "", porque: "",
      web: "" // campo oculto contra spam: una persona lo deja vacío
    };
  }

  /* ---------- Ayudas ---------- */

  function esc(texto) {
    return String(texto == null ? "" : texto)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function ico(nombre, tam, color, estilo) {
    return '<svg width="' + tam + '" height="' + tam + '" style="color:' + color + (estilo ? ";" + estilo : "") +
      '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      ICONOS[nombre] + "</svg>";
  }

  function buscarAnimal(id) {
    for (var i = 0; i < ANIMALES.length; i++) {
      if (ANIMALES[i].id === id) return ANIMALES[i];
    }
    return null;
  }

  function esHembra(a) { return a.sexo === "hembra"; }
  function especieTxt(a) {
    if (a.especie === "gato") return esHembra(a) ? "Gata" : "Gato";
    return esHembra(a) ? "Perra" : "Perro";
  }
  function tamanoTxt(a) {
    var t = TAMANOS[a.tamano] || "";
    return esHembra(a) ? t.replace(/o$/, "a") : t;
  }
  function generoTxt(a, macho, hembra) { return esHembra(a) ? hembra : macho; }

  function fondo(a) { return FONDOS[ANIMALES.indexOf(a) % FONDOS.length]; }
  function dibujo(a, tam) {
    var f = fondo(a);
    return { fondo: f[0], svg: ico(a.especie === "gato" ? "gato" : "perro", tam, f[1]) };
  }
  function encuadre(a) {
    return a.encuadre ? ' style="object-position:' + esc(a.encuadre) + '"' : "";
  }

  /* ---------- Piezas ---------- */

  function tarjeta(a) {
    var foto = a.fotos && a.fotos[0];
    var ph;
    if (foto) {
      ph = '<div class="ph"><img src="' + esc(foto) + '" alt="' + esc(a.nombre) + '" loading="lazy"' + encuadre(a) + "></div>";
    } else {
      var d = dibujo(a, 60);
      ph = '<div class="ph" style="background:' + d.fondo + '">' + d.svg + "</div>";
    }
    return '<a class="pet" href="#ficha/' + esc(a.id) + '">' +
      '<span class="badge">' + tamanoTxt(a) + "</span>" + ph +
      '<div class="in"><div><h3>' + esc(a.nombre) + "</h3><small>" + especieTxt(a) + " · " + esc(a.edad) + "</small></div>" +
      '<span class="go">' + ico("flecha", 18, "#D9653B") + "</span></div></a>";
  }

  function pasos(actual) {
    var nombres = ["1. Tus datos", "2. Tu hogar", "3. Listo"];
    var html = '<ol class="steps" aria-label="Pasos de la solicitud">';
    for (var i = 1; i <= 3; i++) {
      html += "<li" + (i === actual ? ' class="now" aria-current="step"' : "") + '><div class="bar' + (i <= actual ? " on" : "") + '"></div>' + nombres[i - 1] + "</li>";
    }
    return html + "</ol>";
  }

  /* ---------- Pantalla: Inicio ---------- */

  function pantallaInicio() {
    var tarjetas = ANIMALES.slice(0, 4).map(tarjeta).join("");
    return '<section class="hero"><div class="wrap"><div class="box">' +
        '<span class="kick">Fundación de rescate · Manizales</span>' +
        "<h1>Rescatamos perros y gatos. Tú les das un hogar.</h1>" +
        "<p>En la Fundación Huellas de Caldas cuidamos a animales abandonados hasta que encuentran una familia que los quiera para siempre.</p>" +
        '<div class="acts">' +
          '<a class="btn b1" href="#adopta">' + ico("huella", 18, "#fff") + " Quiero adoptar</a>" +
          '<a class="btn b3" href="#donar">' + ico("donar", 18, "#3B2A22") + " Quiero donar</a>" +
        "</div>" +
      "</div></div></section>" +

      // Franja verde: lo que hace la fundación, sin cifras
      '<section class="strip" aria-label="Lo que hacemos"><div class="wrap">' +
        '<div class="it"><i>' + ico("rescate", 22, "#fff") + "</i>Rescatamos animales abandonados</div>" +
        '<div class="it"><i>' + ico("salud", 22, "#fff") + "</i>Los vacunamos y esterilizamos</div>" +
        '<div class="it"><i>' + ico("casa", 22, "#fff") + "</i>Les buscamos una familia</div>" +
        '<div class="it"><i>' + ico("donar", 22, "#fff") + "</i>Tú puedes adoptar o donar</div>" +
      "</div></section>" +

      '<section class="sec"><div class="wrap">' +
        '<div class="head"><div><h2>Ellos buscan familia</h2><p>Conoce a algunos de los peluditos que hoy esperan por ti.</p></div>' +
        '<a class="btn b3" href="#adopta">Ver todos ' + ico("flecha", 16, "#3B2A22") + "</a></div>" +
        '<div class="grid">' + tarjetas + "</div>" +
      "</div></section>" +

      // Datos de donación (de ejemplo hasta que la Fundación mande los reales)
      '<section class="don" id="donar"><div class="wrap">' +
        "<div><h2>Dona y ayúdanos a seguir rescatando</h2>" +
          '<p style="font-size:17px">Con tu aporte compramos comida, vacunas y medicinas, y pagamos esterilizaciones. Cualquier valor ayuda.</p>' +
          '<p style="font-size:13px;opacity:.7">Datos de ejemplo.</p></div>' +
        '<div class="pays">' +
          '<div class="pay"><span class="lg nequi">' + ico("celular", 18, "#A3154F") + " Nequi</span>" +
            "<dl><dt>Número</dt><dd>310 456 7890</dd><dt>A nombre de</dt><dd>Fundación Huellas de Caldas</dd></dl></div>" +
          '<div class="pay"><span class="lg banco">' + ico("banco", 18, "#7A5A00") + " Bancolombia</span>" +
            "<dl><dt>Cuenta de ahorros</dt><dd>123-456789-01</dd><dt>Titular</dt><dd>Fundación Huellas de Caldas</dd><dt>NIT</dt><dd>900.123.456-7</dd></dl></div>" +
        "</div>" +
      "</div></section>";
  }

  /* ---------- Pantalla: Adopta ---------- */

  function botonFiltro(grupo, valor, texto, icono) {
    var on = filtros[grupo] === valor;
    return '<button type="button" class="ck' + (on ? " on" : "") + '" data-filtro="' + grupo + '" data-valor="' + valor + '" aria-pressed="' + on + '">' +
      "<i></i>" + (icono ? ico(icono, 16, "#3B2A22") + " " : "") + texto + "</button>";
  }

  function listaFiltrada() {
    var lista = ANIMALES.filter(function (a) {
      return (filtros.especie === "todos" || a.especie === filtros.especie) &&
        (filtros.tamano === "todos" || a.tamano === filtros.tamano);
    });
    if (!lista.length) return '<p class="vacia">No hay animales con estos filtros.</p>';
    return lista.map(tarjeta).join("");
  }

  function pantallaAdopta() {
    return '<section class="sec"><div class="wrap">' +
      '<div class="head"><div><h1>Animales en adopción</h1><p>Perros y gatos de Manizales que esperan una familia.</p></div></div>' +
      '<div class="lay">' +
        '<aside class="side" aria-label="Filtros">' +
          '<div class="grupo" role="group" aria-labelledby="f-especie"><h2 id="f-especie">¿Perro o gato?</h2>' +
            botonFiltro("especie", "todos", "Todos") +
            botonFiltro("especie", "perro", "Perros", "perro") +
            botonFiltro("especie", "gato", "Gatos", "gato") +
          "</div>" +
          '<div class="grupo" role="group" aria-labelledby="f-tamano"><h2 id="f-tamano">Tamaño</h2>' +
            botonFiltro("tamano", "todos", "Todos") +
            botonFiltro("tamano", "pequeno", "Pequeño") +
            botonFiltro("tamano", "mediano", "Mediano") +
            botonFiltro("tamano", "grande", "Grande") +
          "</div>" +
        "</aside>" +
        '<div class="grid" id="lista" aria-live="polite">' + listaFiltrada() + "</div>" +
      "</div>" +
    "</div></section>";
  }

  function cambiarFiltro(boton) {
    var grupo = boton.getAttribute("data-filtro");
    filtros[grupo] = boton.getAttribute("data-valor");
    var botones = app.querySelectorAll('[data-filtro="' + grupo + '"]');
    for (var i = 0; i < botones.length; i++) {
      var on = botones[i].getAttribute("data-valor") === filtros[grupo];
      botones[i].classList.toggle("on", on);
      botones[i].setAttribute("aria-pressed", String(on));
    }
    document.getElementById("lista").innerHTML = listaFiltrada();
  }

  /* ---------- Pantalla: Ficha ---------- */

  function mosaico(a) {
    var fotos = a.fotos || [];
    if (!fotos.length) {
      var d = dibujo(a, 110);
      return '<div class="mosaic m1"><div style="background:' + d.fondo + '">' + d.svg + "</div></div>";
    }
    var n = Math.min(fotos.length, 3);
    var html = '<div class="mosaic m' + n + '">';
    for (var i = 0; i < n; i++) {
      html += '<div><img src="' + esc(fotos[i]) + '" alt="' + esc(a.nombre) + (i ? " (foto " + (i + 1) + ")" : "") + '" loading="lazy"' + (i === 0 ? encuadre(a) : "") + ">";
      if (i === n - 1 && fotos.length > 3) {
        html += '<button type="button" class="allf" data-galeria="' + esc(a.id) + '">Ver las ' + fotos.length + " fotos</button>";
      }
      html += "</div>";
    }
    return html + "</div>";
  }

  function pantallaFicha(a) {
    var tags = "<span>" + especieTxt(a) + "</span><span>" + tamanoTxt(a) + "</span><span>" + esc(a.edad) + "</span>";
    if (a.vacunado) tags += '<span class="v">' + generoTxt(a, "Vacunado", "Vacunada") + "</span>";
    if (a.esterilizado) tags += '<span class="v">' + generoTxt(a, "Esterilizado", "Esterilizada") + "</span>";

    var historia = (a.historia || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");

    var conv = "";
    var c = a.convivencia;
    if (c) {
      var filas = [["Con perros", c.perros], ["Con gatos", c.gatos], ["Con niños", c.ninos], ["Energía", c.energia]];
      filas.forEach(function (f) {
        if (f[1]) conv += '<div class="li"><span>' + f[0] + "</span><b>" + esc(f[1]) + "</b></div>";
      });
    }

    return '<section class="sec"><div class="wrap">' +
      '<a class="back" href="#adopta">' + ico("atras", 18, "#D9653B") + " Volver a la lista</a>" +
      mosaico(a) +
      '<div class="fi">' +
        "<div><h1>" + esc(a.nombre) + '</h1><div class="tags">' + tags + "</div>" +
          "<h2>Su historia</h2>" + historia + "</div>" +
        '<div class="card"><h2 class="t">¿Le das un hogar?</h2>' + conv +
          '<a class="btn b1 pedir" href="#solicitud/' + esc(a.id) + '/1">' + ico("corazon", 18, "#fff") + " Solicitar adopción</a>" +
          '<p class="corto">Son 2 pasos cortos, menos de 5 minutos.</p>' +
        "</div>" +
      "</div>" +
    "</div></section>";
  }

  function abrirGaleria(a) {
    var cuadro = document.createElement("div");
    cuadro.className = "galeria";
    cuadro.setAttribute("role", "dialog");
    cuadro.setAttribute("aria-modal", "true");
    cuadro.setAttribute("aria-label", "Fotos de " + a.nombre);
    cuadro.innerHTML = '<button type="button" class="cerrar" aria-label="Cerrar">' + ico("cerrar", 22, "#3B2A22") + "</button>" +
      '<div class="fotos">' + a.fotos.map(function (f, i) {
        return '<img src="' + esc(f) + '" alt="' + esc(a.nombre) + " (foto " + (i + 1) + ')" loading="lazy">';
      }).join("") + "</div>";

    var antes = document.activeElement;
    function cerrar() {
      document.removeEventListener("keydown", tecla);
      window.removeEventListener("hashchange", cerrar);
      cuadro.remove();
      document.body.style.overflow = "";
      if (antes && antes.focus) antes.focus();
    }
    function tecla(e) { if (e.key === "Escape") cerrar(); }

    cuadro.addEventListener("click", function (e) {
      if (e.target === cuadro || e.target.closest(".cerrar")) cerrar();
    });
    document.addEventListener("keydown", tecla);
    window.addEventListener("hashchange", cerrar);
    document.body.style.overflow = "hidden";
    document.body.appendChild(cuadro);
    cuadro.querySelector(".cerrar").focus();
  }

  /* ---------- Solicitud ---------- */

  function campo(id, etiqueta, opciones) {
    return '<div class="f' + (opciones.full ? " full" : "") + '">' +
      '<label for="s-' + id + '">' + etiqueta + "</label>" +
      '<input class="inp" id="s-' + id + '" name="' + id + '" data-campo="' + id + '" value="' + esc(solicitud[id]) + '"' +
        ' placeholder="' + opciones.ejemplo + '" type="' + (opciones.tipo || "text") + '"' +
        (opciones.auto ? ' autocomplete="' + opciones.auto + '"' : "") +
        (opciones.teclado ? ' inputmode="' + opciones.teclado + '"' : "") +
        ' required aria-describedby="e-' + id + '">' +
      '<p class="err" id="e-' + id + '"></p></div>';
  }

  function pantallaPaso1(a) {
    return '<section class="sec"><div class="wrap wiz">' +
      '<a class="back" href="#ficha/' + esc(a.id) + '">' + ico("atras", 18, "#D9653B") + " Volver a " + esc(a.nombre) + "</a>" +
      pasos(1) +
      '<form class="card" id="paso-1" data-animal="' + esc(a.id) + '" novalidate>' +
        "<h1>Cuéntanos quién eres</h1>" +
        '<p class="intro">Solicitud para adoptar a <b>' + esc(a.nombre) + "</b>.</p>" +
        '<div class="fg">' +
          campo("nombre", "Nombre completo", { full: true, ejemplo: "Ej: Laura Gómez Ríos", auto: "name" }) +
          campo("cedula", "Cédula", { ejemplo: "Ej: 1053 456 789", teclado: "numeric" }) +
          campo("celular", "Celular", { ejemplo: "Ej: 310 123 4567", tipo: "tel", auto: "tel", teclado: "tel" }) +
          campo("correo", "Correo", { ejemplo: "tucorreo@ejemplo.com", tipo: "email", auto: "email" }) +
          campo("barrio", "Barrio", { ejemplo: "Ej: Chipre, Manizales" }) +
        "</div>" +
        '<div class="nav2">' +
          '<a class="btn b3" href="#ficha/' + esc(a.id) + '">Cancelar</a>' +
          '<button type="submit" class="btn b1">Siguiente ' + ico("flecha", 18, "#fff") + "</button>" +
        "</div>" +
      "</form>" +
    "</div></section>";
  }

  function opcion(nombre, valor, texto, icono) {
    var on = solicitud[nombre] === valor;
    return '<label class="opt' + (on ? " on" : "") + '">' +
      '<input class="sr" type="radio" name="' + nombre + '" value="' + valor + '" data-campo="' + nombre + '"' + (on ? " checked" : "") + ">" +
      (icono ? ico(icono, 18, "currentColor") + " " : "") + texto + "</label>";
  }

  function pantallaPaso2(a) {
    return '<section class="sec"><div class="wrap wiz">' +
      '<a class="back" href="#solicitud/' + esc(a.id) + '/1">' + ico("atras", 18, "#D9653B") + " Volver al paso 1</a>" +
      pasos(2) +
      '<form class="card" id="paso-2" data-animal="' + esc(a.id) + '" novalidate>' +
        "<h1>Tu hogar y tus razones</h1>" +
        '<div class="fg">' +
          '<div class="f full"><fieldset aria-describedby="e-vivienda"><legend>¿Vives en casa o apartamento?</legend>' +
            '<div class="opts">' + opcion("vivienda", "Casa", "Casa", "casa") + opcion("vivienda", "Apartamento", "Apartamento", "apartamento") + "</div>" +
            '<p class="err" id="e-vivienda"></p></fieldset></div>' +
          '<div class="f full"><fieldset aria-describedby="e-otros"><legend>¿Tienes otros animales?</legend>' +
            '<div class="opts">' + opcion("otros", "Sí", "Sí") + opcion("otros", "No", "No") + "</div>" +
            '<p class="err" id="e-otros"></p></fieldset>' +
            '<div class="cuales" id="bloque-cuales"' + (solicitud.otros === "Sí" ? "" : " hidden") + ">" +
              '<label class="sr" for="s-cuales">¿Cuáles?</label>' +
              '<input class="inp" id="s-cuales" name="cuales" data-campo="cuales" value="' + esc(solicitud.cuales) + '" placeholder="¿Cuáles? Ej: un gato de 3 años" aria-describedby="e-cuales">' +
              '<p class="err" id="e-cuales"></p>' +
            "</div>" +
          "</div>" +
          '<div class="f full"><label for="s-porque">¿Por qué quieres adoptar?</label>' +
            '<textarea class="inp" id="s-porque" name="porque" data-campo="porque" placeholder="Cuéntanos por qué quieres darle un hogar a ' + esc(a.nombre) + '" required aria-describedby="e-porque">' + esc(solicitud.porque) + "</textarea>" +
            '<p class="err" id="e-porque"></p></div>' +
        "</div>" +
        // Campo contra spam: no se ve ni se puede enfocar; si llega lleno, el script descarta la solicitud
        '<div class="sr" aria-hidden="true"><label for="s-web">Deja este campo vacío</label>' +
          '<input id="s-web" name="web" data-campo="web" type="text" tabindex="-1" autocomplete="off" value=""></div>' +
        '<p class="nota">' + ico("correo", 15, "#D9653B", "vertical-align:-2px") + " Tu solicitud llega a <b>" + CORREO + "</b>. Usamos tus datos solo para la adopción.</p>" +
        '<div class="aviso-error" id="error-envio" role="alert" hidden></div>' +
        '<div class="nav2">' +
          '<a class="btn b3" href="#solicitud/' + esc(a.id) + '/1">Atrás</a>' +
          '<button type="submit" class="btn b1" id="boton-enviar">' + ico("enviar", 18, "#fff") + " Enviar solicitud</button>" +
        "</div>" +
      "</form>" +
    "</div></section>";
  }

  function pantallaListo() {
    var texto;
    if (ultima) {
      var nombre = ultima.nombre.split(/\s+/)[0];
      texto = "Gracias, " + esc(nombre) + ". Tu solicitud para adoptar a <b>" + esc(ultima.animal) + "</b> llegó a " + CORREO + ".";
    } else {
      texto = "Gracias. Tu solicitud llegó a " + CORREO + ".";
    }
    return '<section class="sec"><div class="wrap wiz">' +
      pasos(3) +
      '<div class="ok">' +
        '<div class="big">' + ico("chulo", 48, "#fff") + "</div>" +
        "<h1>¡Solicitud enviada!</h1>" +
        "<p>" + texto + " También te enviamos un correo de confirmación. En los próximos días te llamaremos para conocerte y coordinar una visita.</p>" +
        '<div class="acts"><a class="btn b1" href="#inicio">Volver al inicio</a><a class="btn b3" href="#adopta">Ver más animales</a></div>' +
      "</div>" +
    "</div></section>";
  }

  /* ---------- Validación ---------- */

  var REGLAS_PASO_1 = {
    nombre: function (v) { return v ? "" : "Escribe tu nombre completo."; },
    cedula: function (v) {
      if (!v) return "Escribe tu número de cédula.";
      return /^\d{6,10}$/.test(v.replace(/[\s.]/g, "")) ? "" : "La cédula debe tener solo números, de 6 a 10 dígitos.";
    },
    celular: function (v) {
      if (!v) return "Escribe tu celular.";
      return /^3\d{9}$/.test(v.replace(/[\s-]/g, "")) ? "" : "El celular debe tener 10 dígitos y empezar por 3.";
    },
    correo: function (v) {
      if (!v) return "Escribe tu correo.";
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Revisa tu correo: debe ser como nombre@ejemplo.com.";
    },
    barrio: function (v) { return v ? "" : "Escribe tu barrio."; }
  };

  var REGLAS_PASO_2 = {
    vivienda: function (v) { return v ? "" : "Elige casa o apartamento."; },
    otros: function (v) { return v ? "" : "Elige Sí o No."; },
    cuales: function (v) { return solicitud.otros !== "Sí" || v ? "" : "Cuéntanos qué animales tienes."; },
    porque: function (v) { return v ? "" : "Cuéntanos por qué quieres adoptar."; }
  };

  // Revisa los campos. Si muestra es true, pinta los errores y lleva al primero.
  function validar(reglas, muestra) {
    var primero = null;
    Object.keys(reglas).forEach(function (nombre) {
      var mensaje = reglas[nombre](String(solicitud[nombre] || "").trim());
      if (mensaje && !primero) primero = nombre;
      if (!muestra) return;
      var err = document.getElementById("e-" + nombre);
      if (err) err.textContent = mensaje;
      var input = document.getElementById("s-" + nombre);
      if (input) input.setAttribute("aria-invalid", mensaje ? "true" : "false");
    });
    if (muestra && primero) {
      var foco = document.getElementById("s-" + primero) || app.querySelector('[name="' + primero + '"]');
      if (foco) foco.focus();
    }
    return !primero;
  }

  /*
    Envío de la solicitud al Google Apps Script de la Fundación (apps-script/solicitudes.js),
    que manda el aviso a adopciones@huellasdecaldas.org y la confirmación a la persona.
    La dirección está en js/config.js (SOLICITUDES_URL).
    Se manda como text/plain con JSON para que el navegador no la bloquee (CORS).
    Devuelve una promesa que se cumple si el envío salió bien y falla si no.
  */
  var ESPERA_MAXIMA = 30000; // milisegundos

  function enviarSolicitud(datos) {
    var url = typeof SOLICITUDES_URL === "string" ? SOLICITUDES_URL.trim() : "";
    if (!url || !window.fetch) return Promise.reject(new Error("Sin dirección de envío"));

    var control = window.AbortController ? new AbortController() : null;
    var reloj = control ? setTimeout(function () { control.abort(); }, ESPERA_MAXIMA) : null;

    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(datos),
      signal: control ? control.signal : undefined
    }).then(function (res) {
      if (!res.ok) throw new Error("Respuesta " + res.status);
      return res.json();
    }).then(function (r) {
      if (reloj) clearTimeout(reloj);
      if (!r || r.ok !== true) throw new Error((r && r.error) || "No se pudo enviar");
      return r;
    }, function (err) {
      if (reloj) clearTimeout(reloj);
      throw err;
    });
  }

  function enviar(form, a) {
    var boton = document.getElementById("boton-enviar");
    var aviso = document.getElementById("error-envio");
    var textoBoton = boton.innerHTML;
    aviso.hidden = true;
    boton.disabled = true;
    boton.textContent = "Enviando…";

    var datos = {};
    Object.keys(solicitud).forEach(function (k) { datos[k] = String(solicitud[k] || "").trim(); });
    datos.animal = a.nombre;
    if (datos.otros !== "Sí") datos.cuales = "";

    enviarSolicitud(datos).then(function () {
      ultima = { nombre: datos.nombre, animal: a.nombre };
      solicitud = solicitudVacia();
      location.hash = "#listo";
    }, function () {
      boton.disabled = false;
      boton.innerHTML = textoBoton;
      aviso.innerHTML = "No pudimos enviar tu solicitud. Inténtalo de nuevo en un momento o escríbenos a " +
        '<a href="mailto:' + CORREO + '"><b>' + CORREO + "</b></a>.";
      aviso.hidden = false;
    });
  }

  /* ---------- Rutas ---------- */

  function leerRuta() {
    var partes = location.hash.replace(/^#\/?/, "").split("/");
    var id = partes[1] || "";
    try { id = decodeURIComponent(id); } catch (e) { id = ""; }
    return { nombre: partes[0] || "inicio", id: id, paso: partes[2] || "1" };
  }

  function mostrar() {
    var r = leerRuta();
    var html, titulo, menu = "", a;

    if (r.nombre === "adopta") {
      html = pantallaAdopta(); titulo = "Animales en adopción"; menu = "adopta";
    } else if (r.nombre === "ficha" && (a = buscarAnimal(r.id))) {
      html = pantallaFicha(a); titulo = a.nombre; menu = "adopta";
    } else if (r.nombre === "solicitud" && (a = buscarAnimal(r.id))) {
      if (solicitud.animal !== a.id) solicitud.animal = a.id;
      if (r.paso === "2" && !validar(REGLAS_PASO_1, false)) {
        location.replace("#solicitud/" + a.id + "/1");
        return;
      }
      html = r.paso === "2" ? pantallaPaso2(a) : pantallaPaso1(a);
      titulo = "Solicitud para adoptar a " + a.nombre; menu = "adopta";
    } else if (r.nombre === "listo") {
      html = pantallaListo(); titulo = "Solicitud enviada";
    } else if (r.nombre === "ficha" || r.nombre === "solicitud") {
      html = '<section class="sec"><div class="wrap"><h1>No encontramos ese animal</h1><p>Puede que ya haya encontrado familia.</p>' +
        '<a class="btn b1" href="#adopta">Ver los animales en adopción</a></div></section>';
      titulo = "No encontrado"; menu = "adopta";
    } else {
      html = pantallaInicio(); titulo = ""; menu = r.nombre === "donar" ? "" : "inicio";
    }

    app.innerHTML = html;
    document.title = (titulo ? titulo + " · " : "") + "Fundación Huellas de Caldas";

    var enlaces = document.querySelectorAll(".nav [data-menu]");
    for (var i = 0; i < enlaces.length; i++) {
      var on = enlaces[i].getAttribute("data-menu") === menu;
      enlaces[i].classList.toggle("on", on);
      if (on) enlaces[i].setAttribute("aria-current", "page"); else enlaces[i].removeAttribute("aria-current");
    }

    if (r.nombre === "donar") {
      document.getElementById("donar").scrollIntoView();
    } else {
      window.scrollTo(0, 0);
      if (!primeraVez) {
        var t = app.querySelector("h1");
        if (t) { t.setAttribute("tabindex", "-1"); t.focus({ preventScroll: true }); }
      }
    }
    primeraVez = false;
  }

  /* ---------- Eventos ---------- */

  app.addEventListener("click", function (e) {
    var filtro = e.target.closest("[data-filtro]");
    if (filtro) { cambiarFiltro(filtro); return; }
    var galeria = e.target.closest("[data-galeria]");
    if (galeria) { abrirGaleria(buscarAnimal(galeria.getAttribute("data-galeria"))); }
  });

  // Si ya estamos en #donar y se vuelve a tocar Donar, igual baja a la sección
  document.addEventListener("click", function (e) {
    var enlace = e.target.closest('a[href="#donar"]');
    if (enlace && location.hash === "#donar") {
      e.preventDefault();
      document.getElementById("donar").scrollIntoView({ behavior: "smooth" });
    }
  });

  // Lo que se escribe queda en memoria para no perderlo al ir Atrás
  function guardarCampo(e) {
    var el = e.target;
    var nombre = el.getAttribute && el.getAttribute("data-campo");
    if (!nombre) return;
    solicitud[nombre] = el.value;
    if (el.type === "radio") {
      var grupo = app.querySelectorAll('input[name="' + nombre + '"]');
      for (var i = 0; i < grupo.length; i++) grupo[i].parentNode.classList.toggle("on", grupo[i].checked);
      if (nombre === "otros") {
        document.getElementById("bloque-cuales").hidden = el.value !== "Sí";
        if (el.value === "Sí") document.getElementById("s-cuales").focus();
      }
      var err = document.getElementById("e-" + nombre);
      if (err) err.textContent = "";
    }
  }
  app.addEventListener("input", guardarCampo);
  app.addEventListener("change", guardarCampo);

  app.addEventListener("submit", function (e) {
    var form = e.target;
    e.preventDefault();
    var a = buscarAnimal(form.getAttribute("data-animal"));
    if (!a) return;
    if (form.id === "paso-1") {
      if (validar(REGLAS_PASO_1, true)) location.hash = "#solicitud/" + a.id + "/2";
    } else if (form.id === "paso-2") {
      if (validar(REGLAS_PASO_2, true)) enviar(form, a);
    }
  });

  window.addEventListener("hashchange", mostrar);
  mostrar();
})();
