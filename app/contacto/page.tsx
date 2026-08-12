import type { Metadata } from "next";
import Link from "next/link";
import CotizacionForm from "./CotizacionForm";

export const metadata: Metadata = {
  title: "Cotización · Parabrisas San Marcos",
  description:
    "Recibe una cotización para el reemplazo de tu cristal automotriz. Te contactamos por WhatsApp o teléfono.",
};

export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
      <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        Recibe una cotización
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        Completa el formulario y te enviaremos tu cotización personalizada por WhatsApp o teléfono.
      </p>

      <div className="mt-12 grid gap-10 md:grid-cols-[1.5fr_1fr]">
        <CotizacionForm />

        {/* Datos de contacto */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-line p-6">
            <h2 className="font-display font-bold text-ink">Horario de atención</h2>
            <p className="mt-1 text-sm text-muted">
              Lunes a Viernes: 9:00 am – 6:00 pm
              <br />
              Sábado: 9:00 am – 2:00 pm
              <br />
              Domingo: Cerrado
            </p>
          </div>

          <div className="rounded-2xl border border-line bg-bgalt p-6">
            <h2 className="font-display font-bold text-ink">¿Buscas una sucursal?</h2>
            <p className="mt-1 text-sm text-muted">
              Consulta todas nuestras sucursales, con su ubicación y teléfonos.
            </p>
            <Link
              href="/ubicaciones"
              className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-dark"
            >
              Ver sucursales
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
