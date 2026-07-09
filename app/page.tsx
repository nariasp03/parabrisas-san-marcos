import Link from "next/link";

const servicios = [
  {
    titulo: "Parabrisas",
    desc: "Venta e instalación de parabrisas para todo tipo de vehículos.",
    icon: "🚗",
  },
  {
    titulo: "Cristales laterales y medallón",
    desc: "Reemplazo de cristales de puertas, medallón y quemacocos.",
    icon: "🪟",
  },
  {
    titulo: "Servicio a domicilio",
    desc: "Vamos a donde estés. Todas nuestras sucursales cuentan con servicio a domicilio.",
    icon: "🚚",
  },
  {
    titulo: "Atención con seguro",
    desc: "Trabajamos con aseguradoras. Te ayudamos con el trámite de tu siniestro.",
    icon: "🛡️",
  },
  {
    titulo: "Atención a flotillas",
    desc: "Convenios y atención especializada para empresas con flotillas de vehículos.",
    icon: "🚐",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark to-primary text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:py-24 md:grid-cols-2 md:items-center">
          <div className="text-center md:text-left">
            <span className="inline-block rounded-full bg-white/15 px-4 py-1 text-sm font-medium backdrop-blur">
              Nuestra prioridad es su satisfacción
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              ¡Bienvenid@ a Parabrisas San Marcos!
            </h1>
            <p className="mt-4 mx-auto max-w-md text-lg text-white/85 md:mx-0">
              Proporcionamos servicios de alta calidad en tiempo y forma. Nuestro equipo
              se adapta a las necesidades específicas de cada cliente para garantizar la
              excelencia, con eficiencia, comunicación clara y un servicio inigualable.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
              <Link
                href="/contacto"
                className="rounded-full bg-white px-6 py-3 font-semibold text-primary-dark transition-colors hover:bg-primary-light hover:text-white"
              >
                Recibe una cotización
              </Link>
              <Link
                href="/ubicaciones"
                className="rounded-full border border-white/40 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                Ver sucursales
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {/* Sucursales — botón que lleva a Ubicaciones */}
            <Link
              href="/ubicaciones"
              className="flex flex-col items-center justify-center rounded-2xl bg-white/10 p-3 text-center backdrop-blur transition-colors hover:bg-white/20 sm:p-5"
            >
              <div className="font-display text-2xl font-extrabold leading-none sm:text-3xl">
                7
              </div>
              <div className="mt-1 text-xs font-medium text-white/90">sucursales</div>
            </Link>

            {/* A domicilio */}
            <div className="flex flex-col items-center justify-center rounded-2xl bg-white/10 p-3 text-center backdrop-blur sm:p-5">
              <div className="font-display text-base font-extrabold leading-tight sm:text-xl">
                A domicilio
              </div>
              <div className="mt-1 text-xs text-white/85">cerca de las sucursales</div>
            </div>

            {/* Tipos de cliente */}
            <div className="flex flex-col items-center justify-center rounded-2xl bg-white/10 p-3 text-center backdrop-blur sm:p-5">
              <div className="font-display text-base font-extrabold leading-tight sm:text-xl">
                Asegurados
              </div>
              <div className="mt-1 text-xs text-white/85">particular y flotillas</div>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
        <div className="text-center">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink">
            Nuestros servicios
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">
            Todo lo que tus cristales automotrices necesitan, con la calidad y rapidez
            que nos caracteriza.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servicios.map((s) => (
            <div
              key={s.titulo}
              className="rounded-2xl border border-line bg-white p-6 transition-shadow hover:shadow-lg"
            >
              <div className="text-center text-4xl">{s.icon}</div>
              <h3 className="mt-4 font-display text-lg font-bold text-ink">{s.titulo}</h3>
              <p className="mt-2 text-sm text-muted">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line bg-bgalt">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-14 md:flex-row">
          <div className="text-center md:text-left">
            <h2 className="font-display text-2xl font-extrabold text-ink">
              ¿Necesitas cambiar un cristal?
            </h2>
            <p className="mt-2 text-muted">
              Solicita tu cotización sin compromiso y te contactamos por WhatsApp o teléfono.
            </p>
          </div>
          <Link
            href="/contacto"
            className="rounded-full bg-primary px-8 py-3 font-semibold text-white transition-colors hover:bg-primary-light"
          >
            Recibe una cotización
          </Link>
        </div>
      </section>
    </div>
  );
}
