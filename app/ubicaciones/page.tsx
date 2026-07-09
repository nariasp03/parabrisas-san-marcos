import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sucursales · Parabrisas San Marcos",
  description:
    "Sucursales de Parabrisas San Marcos en Aguascalientes, León, Zacatecas, Lagos de Moreno y más. Todas con servicio a domicilio.",
};

type Sucursal = {
  nombre: string;
  direccion?: string;
  cp?: string;
  telefonos: string[];
  soloDomicilio?: boolean;
};

const sucursales: Sucursal[] = [
  {
    nombre: "Aguascalientes Norte",
    direccion: "Av. Aguascalientes Pte. 1501-B, Fracc. Los Sauces",
    cp: "20016",
    telefonos: ["449 153 1858", "449 153 1888"],
  },
  {
    nombre: "Aguascalientes Sur",
    direccion: "Av. Aguascalientes Sur #3402-A, Fracc. Prados del Sur",
    cp: "20280",
    telefonos: ["449 140 6600", "449 140 6603"],
  },
  {
    nombre: "León, Guanajuato",
    direccion: "Blvd. Vicente Valtierra #3810, Jardines de Oriente",
    cp: "37257",
    telefonos: ["477 772 4089"],
  },
  {
    nombre: "Zacatecas, Zacatecas",
    direccion: "Héroes de la Reforma 209, Jesús González Ortega",
    cp: "98087",
    telefonos: ["492 491 0921"],
  },
  {
    nombre: "Lagos de Moreno, Jalisco",
    direccion: "Blvd. Félix Ramírez Rentería #405, Col. Pueblo de Moya",
    cp: "47430",
    telefonos: ["474 741 7930"],
  },
  {
    nombre: "Encarnación de Díaz, Jalisco",
    telefonos: ["474 741 7930"],
    soloDomicilio: true,
  },
  {
    nombre: "Villa Hidalgo, Jalisco",
    telefonos: ["474 741 7930"],
    soloDomicilio: true,
  },
];

export default function UbicacionesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
      <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        Sucursales
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        Encuentra la sucursal más cercana.{" "}
        <span className="font-semibold text-primary">
          Todas cuentan con servicio a domicilio.
        </span>
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sucursales.map((s) => (
          <div
            key={s.nombre}
            className="flex flex-col rounded-2xl border border-line bg-white p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-display text-lg font-bold text-primary">{s.nombre}</h2>
              {s.soloDomicilio && (
                <span className="shrink-0 rounded-full bg-primary-light/15 px-2 py-0.5 text-xs font-medium text-primary">
                  Solo a domicilio
                </span>
              )}
            </div>

            {s.direccion && (
              <p className="mt-3 text-sm text-ink">
                📍 {s.direccion}
                {s.cp ? `, C.P. ${s.cp}` : ""}
              </p>
            )}

            <div className="mt-2 space-y-1">
              {s.telefonos.map((tel) => (
                <a
                  key={tel}
                  href={`tel:+52${tel.replace(/\s/g, "")}`}
                  className="block text-sm text-ink hover:text-primary"
                >
                  📞 {tel}
                </a>
              ))}
            </div>

            {s.direccion && (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${s.direccion} ${s.cp ?? ""}`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto pt-4 text-sm font-medium text-primary hover:text-primary-light"
              >
                Ver en el mapa →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
