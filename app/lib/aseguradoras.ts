export type Aseguradora = { nombre: string; notas?: string[]; logo?: string };

export const REPORTE = "Levantar reporte";
export const ASIGNACION = "Por asignación";

export const aseguradoras: Aseguradora[] = [
  { nombre: "Quálitas", notas: [REPORTE], logo: "/aseguradoras/qualitas.png" },
  { nombre: "HDI", logo: "/aseguradoras/hdi.png" },
  { nombre: "Chubb", notas: [REPORTE], logo: "/aseguradoras/chubb.png" },
  { nombre: "GNP Seguros", notas: [ASIGNACION], logo: "/aseguradoras/gnp.png" },
  { nombre: "Inbursa", notas: [REPORTE], logo: "/aseguradoras/inbursa.png" },
  { nombre: "ANA Seguros", notas: [REPORTE], logo: "/aseguradoras/ana.png" },
  { nombre: "Zurich", logo: "/aseguradoras/zurich.png" },
  { nombre: "Mapfre", notas: [REPORTE, ASIGNACION], logo: "/aseguradoras/mapfre.png" },
  { nombre: "Seguros Banorte", notas: [REPORTE, ASIGNACION], logo: "/aseguradoras/segurosbanorte.png" },
  { nombre: "Multiasistencia BBVA Seguros", notas: [ASIGNACION], logo: "/aseguradoras/multiasistencia.png" },
  { nombre: "Primero Seguros", notas: [ASIGNACION], logo: "/aseguradoras/primeroseguros.png" },
  { nombre: "General de Seguros", notas: [ASIGNACION], logo: "/aseguradoras/generaldeseguros.png" },
  { nombre: "Afirme", notas: [ASIGNACION], logo: "/aseguradoras/afirme.png" },
  { nombre: "Allianz Seguros", notas: [ASIGNACION], logo: "/aseguradoras/allianz.png" },
  { nombre: "El Águila Seguros", notas: [ASIGNACION], logo: "/aseguradoras/elaguila.png" },
  { nombre: "Atlas", notas: [ASIGNACION], logo: "/aseguradoras/atlas.png" },
  { nombre: "Seguros El Potosí", notas: [ASIGNACION], logo: "/aseguradoras/elpotosi.png" },
  { nombre: "Sura", notas: [ASIGNACION], logo: "/aseguradoras/sura.png" },
];
