/*
  Animales en adopción — Fundación Huellas de Caldas

  Para agregar, quitar o cambiar un animal, edita esta lista.
  Cada animal va entre { } y separado del siguiente por una coma.

  id            palabra única, en minúsculas y sin tildes ni espacios (va en la dirección: #ficha/canela)
  nombre        como se muestra en la página
  especie       "perro" o "gato"
  sexo          "macho" o "hembra" (cambia textos como Perro/Perra, Mediano/Mediana)
  tamano        "pequeno", "mediano" o "grande"
  edad          texto libre: "2 años", "6 meses"
  fotos         lista de fotos guardadas en la carpeta img/. Si está vacía, se muestra un dibujo de perro o gato.
                La primera es la principal. Con más de 3 aparece «Ver las N fotos».
  encuadre      (opcional) qué parte de la foto principal se ve en las tarjetas, por ejemplo "50% 30%"
  historia      lista de párrafos
  vacunado      true o false
  esterilizado  true o false
  convivencia   (opcional) cómo se lleva con perros, con gatos, con niños y su energía.
                Si no se sabe todavía, pon null y no se muestra.

  Por ahora son animales DE EJEMPLO: hay que cambiarlos por los reales que mande la Fundación.
*/
var ANIMALES = [
  {
    id: "canela",
    nombre: "Canela",
    especie: "perro",
    sexo: "hembra",
    tamano: "mediano",
    edad: "2 años",
    fotos: ["img/canela.jpg"],
    historia: [
      "Canela llegó a la fundación en marzo, después de que unos vecinos del barrio La Enea la encontraran con una patica lastimada. Hoy está completamente recuperada.",
      "Es cariñosa, juguetona y le encanta salir a caminar. Aprende rápido y ya sabe sentarse y dar la pata. Sueña con una familia que le dé paseos y mucho amor."
    ],
    vacunado: true,
    esterilizado: true,
    convivencia: {
      perros: "Se lleva bien",
      gatos: "Con paciencia",
      ninos: "Muy tierna",
      energia: "Media"
    }
  },
  {
    id: "mishi",
    nombre: "Mishi",
    especie: "gato",
    sexo: "hembra",
    tamano: "pequeno",
    edad: "1 año",
    fotos: ["img/mishi.jpg"],
    historia: ["Pronto te contaremos la historia de Mishi."],
    vacunado: false,
    esterilizado: false,
    convivencia: null
  },
  {
    id: "toby",
    nombre: "Toby",
    especie: "perro",
    sexo: "macho",
    tamano: "grande",
    edad: "4 años",
    fotos: ["img/portada-perro-y-gato.jpg"],
    encuadre: "52% 40%",
    historia: ["Pronto te contaremos la historia de Toby."],
    vacunado: false,
    esterilizado: false,
    convivencia: null
  },
  {
    id: "nala",
    nombre: "Nala",
    especie: "gato",
    sexo: "hembra",
    tamano: "pequeno",
    edad: "6 meses",
    fotos: [],
    historia: ["Pronto te contaremos la historia de Nala."],
    vacunado: false,
    esterilizado: false,
    convivencia: null
  },
  {
    id: "rocky",
    nombre: "Rocky",
    especie: "perro",
    sexo: "macho",
    tamano: "pequeno",
    edad: "3 años",
    fotos: [],
    historia: ["Pronto te contaremos la historia de Rocky."],
    vacunado: false,
    esterilizado: false,
    convivencia: null
  },
  {
    id: "simon",
    nombre: "Simón",
    especie: "gato",
    sexo: "macho",
    tamano: "mediano",
    edad: "2 años",
    fotos: [],
    historia: ["Pronto te contaremos la historia de Simón."],
    vacunado: false,
    esterilizado: false,
    convivencia: null
  }
];
