import type { Metadata } from "next";
import Link from "next/link";
import { flotillas } from "../lib/flotillas";

export const metadata: Metadata = {
  title: "Flotillas · Parabrisas San Marcos",
  description:
    "Atención especializada y convenios para empresas con flotillas de vehículos. Cambio de parabrisas y cristales automotrices con servicio a domicilio.",
};

export default function FlotillasPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
      <span className="text-sm font-bold uppercase tracking-widest text-primary">Convenios con empresas</span>
      <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        Flotillas
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        Atendemos a empresas con flotillas de vehículos con precios preferenciales,
        servicio a domicilio y atención especializada. Estas son algunas de las
        flotillas con las que trabajamos.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {flotillas.map((f) => (
          <div
            key={f.nombre}
            className="flex h-32 items-center justify-center rounded-2xl border border-line bg-white p-5 shadow-sm shadow-primary-deep/5 transition-shadow hover:shadow-md sm:h-36"
          >
            {f.logo ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={f.logo}
                alt={f.nombre}
                className="max-h-full max-w-full object-contain"
              />
            ) : (
              <span className="font-display text-lg font-bold text-ink">{f.nombre}</span>
            )}
          </div>
        ))}
      </div>

      {/* CTA (estilo del cuadro que le gustó a Natalia) */}
      <div className="relative mt-14 flex flex-wrap items-center justify-between gap-6 overflow-hidden rounded-[40px] bg-coal p-10 text-white shadow-2xl shadow-black/40 sm:p-12">
        <div className="pointer-events-none absolute -right-8 -top-10 h-56 w-56 rounded-full bg-primary/40 blur-3xl" />
        <div className="relative">
          <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
            ¿Tienes una <span className="text-primary-light">flotilla</span>?
          </h2>
          <p className="mt-2 text-white/70">
            Solicita un convenio para tu empresa. Te cotizamos sin compromiso y te
            contactamos por WhatsApp o teléfono.
          </p>
        </div>
        <Link
          href="/contacto"
          className="relative shrink-0 rounded-full bg-primary px-8 py-3.5 font-semibold text-white shadow-[0_14px_30px_-12px_rgba(35,71,33,.85)] transition-colors hover:bg-primary-light hover:text-coal"
        >
          Solicitar convenio
        </Link>
      </div>
    </div>
  );
}
