import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-2 md:grid-cols-4">
        <div className="sm:col-span-2">
          <div className="flex items-center gap-2 font-display text-lg font-extrabold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary-light text-sm text-white">
              SM
            </span>
            Parabrisas San Marcos
          </div>
          <p className="mt-3 max-w-sm text-sm text-white/75">
            Venta e instalación de parabrisas y cristales automotrices. Servicio a
            domicilio y atención a particulares, asegurados y flotillas. Nuestra prioridad
            es su satisfacción.
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wide text-primary-light">
            Navegación
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li><Link href="/nosotros" className="hover:text-white">Nosotros</Link></li>
            <li><Link href="/contacto" className="hover:text-white">Cotización</Link></li>
            <li><Link href="/ubicaciones" className="hover:text-white">Ubicaciones</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wide text-primary-light">
            Horarios
          </h3>
          <ul className="mt-3 space-y-1 text-sm text-white/80">
            <li>Lun a Vie: 9:00 – 18:00</li>
            <li>Sábado: 9:00 – 14:00</li>
            <li>Domingo: Cerrado</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15 py-4 text-center text-xs text-white/60">
        © {new Date().getFullYear()} Parabrisas San Marcos. Todos los derechos reservados.
      </div>
    </footer>
  );
}
