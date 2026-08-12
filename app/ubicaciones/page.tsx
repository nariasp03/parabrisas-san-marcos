import type { Metadata } from "next";
import { sucursales } from "../lib/sucursales";

export const metadata: Metadata = {
  title: "Sucursales · Parabrisas San Marcos",
  description:
    "Sucursales de Parabrisas San Marcos en Aguascalientes, León, Zacatecas, Lagos de Moreno, La Chona, San Juan de los Lagos y Villa Hidalgo. Todas con servicio a domicilio.",
};

const digits = (t: string) => t.replace(/\D/g, "");

export default function UbicacionesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
      <span className="text-sm font-bold uppercase tracking-widest text-primary">Sucursales</span>
      <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        Encuentra tu sucursal más cercana
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        Presencia en el centro de México.{" "}
        <span className="font-semibold text-primary">Todas cuentan con servicio a domicilio.</span>
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sucursales.map((s) => (
          <div key={s.nombre} className="flex flex-col rounded-2xl border border-white/10 bg-primary-deep p-6 text-white shadow-lg shadow-primary-deep/30">
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-display text-lg font-bold text-white">{s.nombre}</h2>
              {s.soloDomicilio && (
                <span className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-medium text-white">
                  Solo a domicilio
                </span>
              )}
            </div>

            {s.direccion && (
              <p className="mt-3 flex items-start gap-2 text-sm text-white/85">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 h-4 w-4 shrink-0 text-primary-light">
                  <path d="M12 21c4-4.4 6-7.6 6-10.5A6 6 0 0 0 6 10.5C6 13.4 8 16.6 12 21z" />
                  <circle cx="12" cy="10.5" r="2" />
                </svg>
                <span>
                  {s.direccion}
                  {s.cp ? `, C.P. ${s.cp}` : ""}
                </span>
              </p>
            )}

            <div className="mt-4 space-y-3">
              {s.telefonos.map((t, i) => (
                <div key={t}>
                  <div className="text-[11px] font-bold uppercase tracking-wide text-white/50">
                    {i === 0 ? "Principal" : "Secundario"}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <a
                      href={`tel:+52${digits(t)}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-white/20"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                        <path d="M6.5 10.8a13 13 0 0 0 6.7 6.7l2-2a1 1 0 0 1 1-.25 10 10 0 0 0 3.2.5 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A16 16 0 0 1 3 5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1 10 10 0 0 0 .5 3.2 1 1 0 0 1-.25 1z" />
                      </svg>
                      {t}
                    </a>
                    {i === 0 && s.whatsapp && (
                      <a
                        href={`https://wa.me/52${digits(s.whatsapp)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                          <path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.5A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.8.9.9-2.7-.2-.3A8 8 0 1 1 12 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.1-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.4.2-.4.6-1.2.1-.1 0-.3 0-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3c-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.2.7 3 .6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1z" />
                        </svg>
                        WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {s.mapsUrl && (
              <a
                href={s.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-primary-light hover:text-white"
              >
                Ver en el mapa
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
