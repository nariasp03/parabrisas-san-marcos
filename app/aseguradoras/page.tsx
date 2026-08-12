import type { Metadata } from "next";
import Link from "next/link";
import { aseguradoras } from "../lib/aseguradoras";

export const metadata: Metadata = {
  title: "Aseguradoras · Parabrisas San Marcos",
  description:
    "Trabajamos con las principales aseguradoras de México para el reemplazo de tu cristal automotriz. Te ayudamos con el trámite de tu siniestro.",
};

export default function AseguradorasPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
      <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        Aseguradoras
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        Trabajamos con las principales aseguradoras del país. Te ayudamos con el
        trámite de tu siniestro, de principio a fin, para el reemplazo de tu cristal.
      </p>

      <div className="mt-10 grid auto-rows-fr grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {aseguradoras.map((a) => (
          <div
            key={a.nombre}
            className="flex h-28 items-center justify-center rounded-2xl border border-line bg-white p-5 shadow-sm shadow-primary-deep/5 transition-shadow hover:shadow-md sm:h-32"
          >
            {a.logo ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={a.logo}
                alt={a.nombre}
                className="max-h-12 max-w-[78%] object-contain"
              />
            ) : (
              <span className="font-display text-lg font-bold text-ink">{a.nombre}</span>
            )}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="relative mt-14 flex flex-wrap items-center justify-between gap-6 overflow-hidden rounded-[40px] bg-coal p-10 text-white shadow-2xl shadow-black/40 sm:p-12">
        <div className="pointer-events-none absolute -right-8 -top-10 h-56 w-56 rounded-full bg-primary/40 blur-3xl" />
        <div className="relative">
          <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
            ¿Tu aseguradora está en la <span className="text-primary-light">lista</span>?
          </h2>
          <p className="mt-2 text-white/70">
            Solicita tu cotización y te ayudamos con el trámite de tu siniestro, de principio a fin.
          </p>
        </div>
        <Link
          href="/contacto"
          className="relative shrink-0 rounded-full bg-primary px-8 py-3.5 font-semibold text-white shadow-[0_14px_30px_-12px_rgba(35,71,33,.85)] transition-colors hover:bg-primary-light hover:text-coal"
        >
          Recibe una cotización
        </Link>
      </div>
    </div>
  );
}
