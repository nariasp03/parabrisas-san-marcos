import type { Metadata } from "next";
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
        Completa el formulario y te enviaremos tu cotización. También puedes llamarnos
        directamente a la sucursal de tu preferencia.
      </p>

      <div className="mt-12 grid gap-10 md:grid-cols-[1.5fr_1fr]">
        <CotizacionForm />

        {/* Datos de contacto */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-line p-6">
            <h2 className="font-display font-bold text-ink">Teléfonos</h2>
            <ul className="mt-2 space-y-1 text-sm">
              <li>
                <span className="text-muted">Ags. Norte:</span>{" "}
                <a href="tel:+524491531858" className="text-primary hover:underline">
                  449 153 1858
                </a>
              </li>
              <li>
                <span className="text-muted">Ags. Sur:</span>{" "}
                <a href="tel:+524491406600" className="text-primary hover:underline">
                  449 140 6600
                </a>
              </li>
              <li>
                <span className="text-muted">León, Gto.:</span>{" "}
                <a href="tel:+524777724089" className="text-primary hover:underline">
                  477 772 4089
                </a>
              </li>
              <li>
                <span className="text-muted">Zacatecas:</span>{" "}
                <a href="tel:+524924910921" className="text-primary hover:underline">
                  492 491 0921
                </a>
              </li>
              <li>
                <span className="text-muted">Lagos / Jalisco:</span>{" "}
                <a href="tel:+524747417930" className="text-primary hover:underline">
                  474 741 7930
                </a>
              </li>
            </ul>
          </div>

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
            <h2 className="font-display font-bold text-ink">Servicio a domicilio</h2>
            <p className="mt-1 text-sm text-muted">
              Todas nuestras sucursales cuentan con servicio a domicilio en sus
              alrededores, incluyendo Encarnación de Díaz y Villa Hidalgo, Jal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
