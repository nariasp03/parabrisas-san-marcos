import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { estaAutenticado } from "@/app/lib/auth";
import { listarCotizaciones } from "@/app/lib/db";
import LogoutButton from "./LogoutButton";
import PanelCotizaciones from "./PanelCotizaciones";

export const metadata: Metadata = {
  title: "Panel de cotizaciones · Parabrisas San Marcos",
  robots: { index: false, follow: false },
};

// Siempre datos frescos (no cachear esta página).
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await estaAutenticado())) redirect("/panel-sanmarcos-k29x7/login");

  const cotizaciones = await listarCotizaciones();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
            Cotizaciones
          </h1>
          <p className="mt-1 text-sm text-muted">
            Todas las solicitudes recibidas (WhatsApp y Teléfono).
          </p>
        </div>
        <div className="flex justify-center sm:block">
          <LogoutButton />
        </div>
      </div>

      <PanelCotizaciones cotizaciones={cotizaciones} />
    </div>
  );
}
