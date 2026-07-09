import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nosotros · Parabrisas San Marcos",
  description:
    "Conoce Parabrisas San Marcos: profesionalismo, rapidez y calidad en cristales automotrices.",
};

const valores = [
  {
    titulo: "Profesionalismo",
    desc: "Personal capacitado y un trato cuidadoso en cada instalación.",
  },
  {
    titulo: "Rapidez",
    desc: "Servicios en tiempo y forma, adaptándonos a tu disponibilidad.",
  },
  {
    titulo: "Calidad",
    desc: "Cristales y materiales de primera, con resultados garantizados.",
  },
];

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

      {/* Valores */}
      <h2 className="mt-14 font-display text-2xl font-extrabold text-ink">
        Nuestros valores
      </h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-3">
        {valores.map((v) => (
          <div
            key={v.titulo}
            className="rounded-2xl border border-line bg-white p-6"
          >
            <h3 className="font-display text-lg font-bold text-primary">{v.titulo}</h3>
            <p className="mt-2 text-sm text-muted">{v.desc}</p>
          </div>
        ))}
      </div>

      {/* Misión */}
      <div className="mt-14 rounded-2xl border border-line bg-bgalt p-8">
        <h2 className="font-display text-xl font-bold text-ink">Nuestra misión</h2>
        <p className="mt-3 text-muted">
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
