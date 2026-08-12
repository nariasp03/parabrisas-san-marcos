import Link from "next/link";

export default function Footer() {
  return (
    <footer className="rounded-t-[44px] bg-primary-deep text-white">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div className="sm:col-span-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-white.png" alt="Parabrisas San Marcos" className="h-16 w-auto" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">
              Venta e instalación de parabrisas y cristales automotrices. Servicio a
              domicilio y atención a particulares, asegurados y flotillas. Nuestra
              prioridad es su satisfacción.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href="https://www.instagram.com/parabrisasglassmaster/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
                </svg>
                Instagram
              </a>
              <a
                href="https://www.facebook.com/share/1HZksFhJKD/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M13 22v-8h2.7l.4-3H13V9c0-.9.2-1.5 1.5-1.5H16.2V4.8c-.3 0-1.3-.1-2.4-.1-2.3 0-3.8 1.4-3.8 3.9V11H7.5v3h2.5v8H13z" />
                </svg>
                Facebook
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary-light">Navegación</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              <li><Link href="/nosotros" className="transition-colors hover:text-white">Nosotros</Link></li>
              <li><Link href="/aseguradoras" className="transition-colors hover:text-white">Aseguradoras</Link></li>
              <li><Link href="/flotillas" className="transition-colors hover:text-white">Flotillas</Link></li>
              <li><Link href="/ubicaciones" className="transition-colors hover:text-white">Ubicaciones</Link></li>
              <li><Link href="/contacto" className="transition-colors hover:text-white">Cotización</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary-light">Horarios</h3>
            <ul className="mt-3 space-y-1 text-sm text-white/80">
              <li>Lun a Vie: 9:00 – 18:00</li>
              <li>Sábado: 9:00 – 14:00</li>
              <li>Domingo: Cerrado</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-white/15 pt-5 text-center text-xs text-white/55">
          © {new Date().getFullYear()} Parabrisas San Marcos. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
