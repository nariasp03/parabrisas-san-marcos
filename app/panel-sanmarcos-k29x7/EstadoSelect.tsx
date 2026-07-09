"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const ESTADOS = ["Pendiente", "Vendida", "No concretada"];

const colores: Record<string, string> = {
  Pendiente: "bg-amber-100 text-amber-800 border-amber-300",
  Vendida: "bg-green-100 text-green-800 border-green-300",
  "No concretada": "bg-red-100 text-red-700 border-red-300",
};

export default function EstadoSelect({
  id,
  estadoInicial,
}: {
  id: number;
  estadoInicial: string;
}) {
  const router = useRouter();
  const [estado, setEstado] = useState(estadoInicial);
  const [guardando, setGuardando] = useState(false);

  async function cambiar(nuevo: string) {
    const previo = estado;
    setEstado(nuevo);
    setGuardando(true);
    try {
      const r = await fetch(`/api/cotizaciones/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: nuevo }),
      });
      if (!r.ok) throw new Error();
      router.refresh();
    } catch {
      setEstado(previo); // si falla, regresamos al estado anterior
      alert("No se pudo guardar el cambio. Intenta de nuevo.");
    } finally {
      setGuardando(false);
    }
  }

  return (
    <select
      value={estado}
      disabled={guardando}
      onChange={(e) => cambiar(e.target.value)}
      className={`rounded-full border px-3 py-1 text-xs font-semibold outline-none ${
        colores[estado] ?? "border-line bg-white text-ink"
      }`}
    >
      {ESTADOS.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
