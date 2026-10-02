/* ==========================================================
   ZACHIKO · Temporada Sakura 2027 — CONTENIDO EDITABLE
   Cambiá textos, precios, piezas, fechas y locales desde acá.
   ========================================================== */

const TEMPORADA = {
  inicio: "2027-02-01T12:00:00-03:00",
  fin: "2027-04-30T23:59:00-03:00",
};

/* Días de regalo de la servilleta.
   Criterio: el día en que empezó a florecer el cerezo (開花, kaika) en cada
   lugar según el registro 2026 de la Agencia Meteorológica de Japón (JMA).
   Los lunes ZACHIKO está cerrado: si la fecha cae lunes, pasa al martes. */
const REGALOS = [
  {
    fecha: "2027-02-02T12:00:00-03:00",
    dia: "Martes 2 de febrero",
    lugar: "Islas Amami",
    detalle: "El sur de Japón abre la floración (1/2). Como el 1/2 cae lunes y cerramos, lo pasamos al martes.",
    combo: "Kaika",
  },
  {
    fecha: "2027-03-19T12:00:00-03:00",
    dia: "Viernes 19 de marzo",
    lugar: "Tokio",
    detalle: "Florece el primer cerezo de referencia de la capital, en el santuario Yasukuni.",
    combo: "Mankai",
  },
  {
    fecha: "2027-04-18T12:00:00-03:00",
    dia: "Domingo 18 de abril",
    lugar: "Sapporo, Hokkaido",
    detalle: "El frente de floración llega al norte y cierra el recorrido.",
    combo: "Hanafubuki",
  },
];

const PIEZAS = {
  "sakura-roll": {
    nombre: "Sakura Roll",
    tag: "Edición temporada",
    ingredientes: ["Salmón rosado por fuera", "Palta", "Queso crema", "Arroz y nori", "Tobiko verde y limón"],
    img: "img/piezas/sakura-roll.png",
  },
  philadelphia: {
    nombre: "Philadelphia",
    ingredientes: ["Salmón rosado", "Queso crema", "Ciboulette", "Arroz con sésamo blanco y negro"],
    img: "img/piezas/philadelphia.png",
  },
  california: {
    nombre: "California",
    ingredientes: ["Kanikama", "Palta", "Pepino", "Cubierto de tobiko naranja"],
    img: "img/piezas/california.png",
  },
  "ebi-mango": {
    nombre: "Ebi Mango",
    ingredientes: ["Langostino en tempura", "Pepino", "Hojas verdes", "Topping de mango y spicy de atún"],
    img: "img/piezas/ebi-mango.png",
  },
  "niguiri-salmon": {
    nombre: "Niguiri de salmón",
    ingredientes: ["Bocado de arroz de sushi", "Lámina de salmón rosado", "Un toque de wasabi"],
    img: "img/piezas/niguiri-salmon.png",
  },
  "sake-avocado": {
    nombre: "Sake Avocado",
    ingredientes: ["Salmón rosado", "Palta", "Nori", "Arroz con sésamo"],
    img: "img/piezas/sake-avocado.png",
  },
  "gunkan-tobiko": {
    nombre: "Gunkan Tobiko",
    ingredientes: ["Bocado de arroz envuelto en nori", "Salmón con queso crema", "Cubierto de tobiko naranja"],
    img: "img/piezas/gunkan-tobiko.png",
  },
  veggie: {
    nombre: "Veggie Sésamo",
    ingredientes: ["Palta", "Pepino", "Morrón asado", "Nori", "Cubierto de sésamo tostado"],
    img: "img/piezas/veggie.png",
  },
};

/* 3 combos de 25 piezas. "piezas": [id, cantidad]
   "incluye": lo que viene con cada caja (pedido promedio del informe) */
const INCLUYE = ["25 piezas", "Palillos ×4", "Salsas ×2"];
const COMBOS = [
  {
    id: "kaika",
    nombre: "Kaika",
    kanji: "開花",
    significado: "La primera flor",
    mes: "Febrero",
    color: "#F8CFE2", tinta: "#95182A",
    precio: "$ 32.900",
    texto: "Para abrir la temporada: el Sakura Roll acompañado por los clásicos de siempre.",
    piezas: [["sakura-roll", 10], ["philadelphia", 5], ["california", 5], ["niguiri-salmon", 5]],
    foto: "img/marca/combo-kaika.png",
  },
  {
    id: "mankai",
    nombre: "Mankai",
    kanji: "満開",
    significado: "Plena floración",
    mes: "Marzo",
    color: "#EFA6CA", tinta: "#95182A",
    precio: "$ 36.500",
    texto: "El punto más alto del cerezo: sumamos langostino en tempura y salmón con palta.",
    piezas: [["sakura-roll", 10], ["ebi-mango", 5], ["sake-avocado", 5], ["niguiri-salmon", 5]],
    foto: "img/marca/combo-mankai.png",
  },
  {
    id: "hanafubuki",
    nombre: "Hanafubuki",
    kanji: "花吹雪",
    significado: "Lluvia de pétalos",
    mes: "Abril",
    color: "#95182A", tinta: "#ffffff",
    precio: "$ 34.900",
    texto: "Para despedir la flor: una mezcla fresca con opción veggie incluida.",
    piezas: [["sakura-roll", 10], ["ebi-mango", 5], ["gunkan-tobiko", 5], ["veggie", 5]],
    foto: "img/marca/combo-hanafubuki.png",
  },
];

/* Direcciones y coordenadas de maqueta (ficticias) */
const LOCALES = [
  {
    id: "palermo",
    pin: [77.5, 58.9], // posición en el mapa ilustrado (x%, y%)
    nombre: "Palermo",
    direccion: "Gorriti 4820, Palermo Soho, CABA",
    telefono: "+54 11 5555-0101",
    coords: [-34.5889, -58.4304],
  },
  {
    id: "belgrano",
    pin: [72.6, 48.6], // posición en el mapa ilustrado (x%, y%)
    nombre: "Belgrano",
    direccion: "Av. Cabildo 2150, Belgrano, CABA",
    telefono: "+54 11 5555-0102",
    coords: [-34.5608, -58.4562],
  },
  {
    id: "vicente-lopez",
    pin: [61.1, 34.4], // posición en el mapa ilustrado (x%, y%)
    nombre: "Vicente López",
    direccion: "Av. del Libertador 1150, Vicente López",
    telefono: "+54 11 5555-0103",
    coords: [-34.5262, -58.4735],
  },
  {
    id: "san-isidro",
    pin: [46.6, 21.9], // posición en el mapa ilustrado (x%, y%)
    nombre: "San Isidro",
    direccion: "Av. Centenario 450, San Isidro",
    telefono: "+54 11 5555-0104",
    coords: [-34.4722, -58.5146],
  },
];

const HORARIO = {
  dias: "Martes a domingo",
  mediodia: "12 a 15.30 h",
  noche: "19.30 a 00 h",
  cerrado: "Lunes cerrado",
};
