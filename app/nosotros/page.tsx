import type { Metadata } from "next";
import Valores from "./Valores";

export const metadata: Metadata = {
  title: "Nosotros · Parabrisas San Marcos",
  description:
    "Conoce Parabrisas San Marcos: profesionalismo, rapidez y calidad en cristales automotrices.",
};

const horarios = [
  { dia: "Lunes a Viernes", hora: "9:00 am – 6:00 pm" },
  { dia: "Sábado", hora: "9:00 am – 2:00 pm" },
  { dia: "Domingo", hora: "Cerrado" },
];

export default function NosotrosPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
      <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        Nosotros
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        Desde que iniciamos operaciones, nos hemos comprometido con dar el mejor
        servicio posible, siendo muy cuidadosos con la eficiencia, la calidad y la
        comunicación clara con los clientes. Atendemos a clientes particulares,
        asegurados y flotillas de empresas.
      </p>

      <div className="mt-8 overflow-hidden rounded-[28px] shadow-xl shadow-primary-deep/15">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/fotos/home-nosotros.jpg"
          alt="Equipo de Parabrisas San Marcos"
          className="h-[260px] w-full object-cover object-[center_35%] sm:h-[400px]"
        />
      </div>

      {/* Valores */}
      <h2 className="mt-14 font-display text-2xl font-extrabold text-ink">
        Nuestros valores
      </h2>
      <Valores />

      {/* Misión */}
      <div className="mt-14 overflow-hidden rounded-[28px] bg-gradient-to-br from-primary to-primary-deep p-8 text-white shadow-2xl shadow-primary-deep/25 sm:p-10">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 flex-none place-items-center rounded-2xl bg-white/15">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
              <circle cx="12" cy="12" r="9" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
            </svg>
          </span>
          <h2 className="font-display text-2xl font-extrabold">Nuestra misión</h2>
        </div>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/85">
          Proporcionar servicios de alta calidad en tiempo y forma. Nuestro equipo se
          adapta a las necesidades específicas de cada cliente para garantizar la
          excelencia, con eficiencia, comunicación clara y un servicio inigualable.
        </p>
      </div>

      {/* Horarios */}
      <h2 id="horarios" className="mt-14 font-display text-2xl font-extrabold text-ink">
        Horarios de atención
      </h2>
      <div className="mt-6 overflow-hidden rounded-2xl border border-line">
        {horarios.map((h, i) => (
          <div
            key={h.dia}
            className={`flex items-center justify-between px-6 py-4 ${
              i % 2 === 0 ? "bg-white" : "bg-bgalt"
            }`}
          >
            <span className="font-medium text-ink">{h.dia}</span>
            <span className={h.hora === "Cerrado" ? "text-danger" : "text-muted"}>
              {h.hora}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm text-muted">
        Días especiales: consultar en Google Business.
      </p>
    </div>
  );
}
