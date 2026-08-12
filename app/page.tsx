import Link from "next/link";
import type { ReactNode } from "react";
import { aseguradoras } from "./lib/aseguradoras";
import { flotillas } from "./lib/flotillas";
import Contadores from "./components/Contadores";
import MapaHome from "./components/MapaHome";

const svg = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const servicios: { titulo: string; desc: string; icon: ReactNode }[] = [
  {
    titulo: "Venta e instalación de cristales",
    desc: "Parabrisas, cristales laterales, quemacocos, medallones, aletas, costados y más, para todo tipo de vehículo.",
    icon: (<svg {...svg} className="h-9 w-9"><path d="M3 13l2-5a3 3 0 0 1 2.8-2h8.4A3 3 0 0 1 19 8l2 5" /><path d="M2 13h20v4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" /><circle cx="6.5" cy="15.5" r="1" /><circle cx="17.5" cy="15.5" r="1" /></svg>),
  },
  {
    titulo: "Servicio a domicilio",
    desc: "Vamos a donde estés. Todas nuestras sucursales cuentan con servicio a domicilio.",
    icon: (<svg {...svg} className="h-9 w-9"><path d="M3 7h11v9H3z" /><path d="M14 10h4l3 3v3h-7z" /><circle cx="7" cy="18" r="1.6" /><circle cx="17.5" cy="18" r="1.6" /></svg>),
  },
  {
    titulo: "Asegurados y público en general",
    desc: "Trabajamos con las principales aseguradoras y también atendemos al público en general.",
    icon: (<svg {...svg} className="h-9 w-9"><path d="M12 3l7 3v5c0 4.4-3 7.8-7 9-4-1.2-7-4.6-7-9V6z" /><path d="M9 12l2 2 4-4" /></svg>),
  },
  {
    titulo: "Atención a flotillas",
    desc: "Convenios y atención especializada para empresas con flotillas de vehículos.",
    icon: (<svg {...svg} className="h-9 w-9"><path d="M2 5h7v4H2z" /><path d="M9 6h2.3l1.7 1.8V9H9z" /><rect x="4" y="11" width="9" height="5" rx="1.3" /><path d="M13 12.5h3l2 2V16h-5z" /><circle cx="7" cy="18" r="1.3" /><circle cx="15.5" cy="18" r="1.3" /></svg>),
  },
];


export default function Home() {
  return (
    <div>
      {/* Hero con video de fondo */}
      <section className="relative isolate -mt-[88px] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/videos/hero-poster.jpg"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        {/* Capa verde oscuro para legibilidad del texto */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary-deep/92 via-primary-deep/72 to-primary-deep/35" />

        <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-6xl flex-col px-6 pb-10 pt-28 sm:min-h-[88vh] sm:pb-12 sm:pt-32">
          <div className="flex flex-1 items-center">
            <div className="max-w-2xl">
              <h1 className="font-display text-[32px] font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl">
                Parabrisas y cristales automotrices,{" "}
                <span className="text-primary-light">instalados por expertos</span>
              </h1>
              <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-base font-semibold text-white/90 sm:text-lg">
                <span>Profesionalismo.</span>
                <span>Rapidez.</span>
                <span>Calidad.</span>
              </p>
              <div className="mt-8">
                <Link
                  href="/contacto"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 font-semibold text-white shadow-[0_16px_34px_-12px_rgba(0,0,0,.6)] ring-1 ring-white/10 transition-colors hover:bg-primary-dark sm:w-auto"
                >
                  Recibe tu cotización
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Colaboración (al fondo del video) */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/10 pt-6">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
              En colaboración con
            </span>
            <div className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/pilkington-blanco.png" alt="Pilkington" className="h-12 w-auto sm:h-14" />
              <span className="h-6 w-px bg-white/25" />
              <span className="font-display text-lg font-bold text-white/90">Glass Master</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contadores */}
      <section id="numeros" className="bg-white">
        <div className="mx-auto max-w-4xl px-6 pb-8 pt-14 sm:pb-10 sm:pt-16">
          <span className="text-sm font-bold uppercase tracking-widest text-primary">En números</span>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Respaldados por la experiencia
          </h2>
          <div className="mt-8">
            <Contadores
              stats={[
                {
                  n: 7,
                  label: "Sucursales",
                  sub: "Tenemos servicio en 7 sucursales para atenderte más cerca de ti.",
                  href: "/ubicaciones",
                  linkText: "Ver sucursales",
                },
                {
                  n: aseguradoras.length,
                  plus: true,
                  label: "Aseguradoras",
                  sub: `Trabajamos con más de ${aseguradoras.length} aseguradoras y te ayudamos con el trámite de tu siniestro.`,
                  href: "/aseguradoras",
                  linkText: "Ver aseguradoras",
                },
                {
                  n: flotillas.length,
                  plus: true,
                  label: "Flotillas",
                  sub: `Actualmente atendemos a más de ${flotillas.length} flotillas con convenios para empresas.`,
                  href: "/flotillas",
                  linkText: "Ver flotillas",
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Sucursales (mapa) */}
      <section id="sucursales" className="bg-coal text-white">
        <div className="mx-auto max-w-6xl px-6 pb-16 pt-12 sm:pb-20 sm:pt-14">
          <div className="text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-primary-light">Sucursales</span>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Estamos donde nos necesitas
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-white/60">
              Presencia en el centro de México y{" "}
              <span className="font-semibold text-white">todas cuentan con servicio a domicilio</span>. Da clic en un punto del mapa para ver los datos de esa ubicación.
            </p>
          </div>

          <div className="mt-10">
            <MapaHome />
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/ubicaciones"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-white shadow-[0_14px_30px_-12px_rgba(35,71,33,.7)] transition-colors hover:bg-primary-dark"
            >
              Ver todas las sucursales
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Aseguradoras (slider) */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-sm font-bold uppercase tracking-widest text-primary">Trámite de siniestros</span>
              <h2 className="mt-2 max-w-xl font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                Trabajamos con las principales aseguradoras
              </h2>
              <p className="mt-2 text-muted">Desliza para verlas todas. Te ayudamos con el trámite de principio a fin.</p>
            </div>
            <Link href="/aseguradoras" className="shrink-0 rounded-full bg-soft px-5 py-2.5 text-sm font-semibold text-primary-dark transition-colors hover:bg-primary hover:text-white">
              Ver todas
            </Link>
          </div>

          <div className="mt-8 -mx-6 overflow-x-auto px-6 pb-4 [scrollbar-width:thin]">
            <div className="flex gap-4" style={{ minWidth: "min-content" }}>
              {aseguradoras.map((a) => (
                <div
                  key={a.nombre}
                  className="flex h-32 w-44 flex-none items-center justify-center rounded-3xl border border-line bg-white p-5 shadow-sm shadow-primary-deep/5"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={a.logo} alt={a.nombre} className="max-h-12 max-w-[78%] object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <div className="max-w-2xl">
            <span className="text-sm font-bold uppercase tracking-widest text-primary">Servicios</span>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Todo lo que tus cristales necesitan
            </h2>
            <p className="mt-3 text-muted">
              Cambiamos todos los cristales de tu auto, con la calidad y rapidez que nos caracteriza.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {servicios.map((s) => (
              <div
                key={s.titulo}
                className="rounded-[26px] border border-line bg-white p-7 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary-deep/10"
              >
                <div className="text-primary">{s.icon}</div>
                <h3 className="mt-4 font-display text-lg font-bold text-ink">{s.titulo}</h3>
                <p className="mt-2 text-sm text-muted">{s.desc}</p>
              </div>
            ))}
            {/* CTA card */}
            <div className="relative isolate flex flex-col justify-center overflow-hidden rounded-[26px] bg-coal p-7 text-white">
              <div className="pointer-events-none absolute -right-10 -top-12 -z-10 h-48 w-48 rounded-full bg-primary/45 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-14 -left-10 -z-10 h-44 w-44 rounded-full bg-primary/25 blur-3xl" />
              <h3 className="font-display text-lg font-bold">¿Tu caso es especial?</h3>
              <p className="mt-2 text-sm text-white/70">Cuéntanos qué necesitas y te cotizamos sin compromiso.</p>
              <Link
                href="/contacto"
                className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                Cotizar ahora
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
