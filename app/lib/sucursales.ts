export type Sucursal = {
  nombre: string;
  direccion?: string;
  cp?: string;
  telefonos: string[]; // [0] = principal, [1] = secundario
  whatsapp?: string; // número de WhatsApp (puede diferir del principal)
  soloDomicilio?: boolean;
  mapsUrl?: string;
};

const MAPS = {
  agsNorte: "https://maps.app.goo.gl/kvUC5vmZjKyJvQac6",
  agsSur: "https://maps.app.goo.gl/gPz3hCHF8rcLUMeQ8",
  leon: "https://maps.app.goo.gl/YL6G1ugDocZ2bVvF8",
  lagos: "https://maps.app.goo.gl/EWmM8ki7dbVdC17m8",
  zacatecas: "https://maps.app.goo.gl/ejXvU9723RDihfVQ8",
};

export const sucursales: Sucursal[] = [
  {
    nombre: "Aguascalientes Norte",
    direccion: "Av. Aguascalientes Pte. 1501-B, Fracc. Los Sauces",
    cp: "20016",
    telefonos: ["449 309 3246", "449 153 1858"],
    whatsapp: "449 309 3246",
    mapsUrl: MAPS.agsNorte,
  },
  {
    nombre: "Aguascalientes Sur",
    direccion: "Av. Aguascalientes Sur #3402-A, Fracc. Prados del Sur",
    cp: "20280",
    telefonos: ["449 401 6472", "449 140 6600"],
    whatsapp: "449 401 6472",
    mapsUrl: MAPS.agsSur,
  },
  {
    nombre: "León, Guanajuato",
    direccion: "Blvd. Vicente Valtierra #3810, Jardines de Oriente",
    cp: "37257",
    telefonos: ["477 141 9055", "477 772 4089"],
    whatsapp: "477 141 9055",
    mapsUrl: MAPS.leon,
  },
  {
    nombre: "Zacatecas, Zacatecas",
    direccion: "Héroes de la Reforma 209, Jesús González Ortega",
    cp: "98087",
    telefonos: ["492 491 0921"],
    whatsapp: "449 119 2439",
    mapsUrl: MAPS.zacatecas,
  },
  {
    nombre: "Lagos de Moreno, Jalisco",
    direccion: "Blvd. Félix Ramírez Rentería #405, Col. Pueblo de Moya",
    cp: "47430",
    telefonos: ["474 108 0287", "474 741 7930"],
    whatsapp: "474 108 0287",
    mapsUrl: MAPS.lagos,
  },
  {
    nombre: "Encarnación de Díaz (La Chona)",
    telefonos: ["474 108 0287", "474 741 7930"],
    whatsapp: "474 108 0287",
    soloDomicilio: true,
  },
  {
    nombre: "San Juan de los Lagos",
    telefonos: ["474 108 0287", "474 741 7930"],
    whatsapp: "474 108 0287",
    soloDomicilio: true,
  },
  {
    nombre: "Villa Hidalgo, Jalisco",
    telefonos: ["449 401 6472", "449 140 6600"],
    whatsapp: "449 401 6472",
    soloDomicilio: true,
  },
];
