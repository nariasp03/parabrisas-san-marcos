"use client";

import { useMemo, useState } from "react";
import EstadoSelect from "./EstadoSelect";
import type { Cotizacion } from "@/app/lib/db";

function fecha(valor: string) {
  return new Date(valor).toLocaleString("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Mexico_City",
  });
}

// Los 4 contadores que también funcionan como filtros por estado.
const FILTROS = [
  { key: "Total", label: "Total", clase: "text-ink" },
  { key: "Pendiente", label: "Pendientes", clase: "text-amber-600" },
  { key: "Vendida", label: "Vendidas", clase: "text-green-600" },
  { key: "No concretada", label: "No concretadas", clase: "text-red-600" },
];

function ViaBadge({ via }: { via: string }) {
  return via === "telefono" ? (
    <span className="inline-block rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
      Llamar
    </span>
  ) : (
    <span className="inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
      WhatsApp
    </span>
  );
}

export default function PanelCotizaciones({
  cotizaciones,
}: {
  cotizaciones: Cotizacion[];
}) {
  const [filtro, setFiltro] = useState("Total");
  const [busqueda, setBusqueda] = useState("");
  const [orden, setOrden] = useState<"nuevo" | "viejo">("nuevo");
  const [filtroSucursal, setFiltroSucursal] = useState("");
  const [filtroVia, setFiltroVia] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");

  const sucursalesUnicas = useMemo(
    () => Array.from(new Set(cotizaciones.map((c) => c.sucursal).filter(Boolean))).sort(),
    [cotizaciones],
  );
  const tiposUnicos = useMemo(
    () => Array.from(new Set(cotizaciones.map((c) => c.tipo_cliente).filter(Boolean))).sort(),
    [cotizaciones],
  );

  const cuenta = (k: string) =>
    k === "Total"
      ? cotizaciones.length
      : cotizaciones.filter((c) => c.estado === k).length;

  // Lista final: filtrada por estado + búsqueda, y ordenada por fecha.
  const visibles = useMemo(() => {
    let lista = cotizaciones;

    if (filtro !== "Total") lista = lista.filter((c) => c.estado === filtro);
    if (filtroSucursal) lista = lista.filter((c) => c.sucursal === filtroSucursal);
    if (filtroVia) lista = lista.filter((c) => c.contacto_via === filtroVia);
    if (filtroTipo) lista = lista.filter((c) => c.tipo_cliente === filtroTipo);

    const q = busqueda.trim().toLowerCase();
    if (q) {
      lista = lista.filter((c) =>
        [
          c.nombre,
          c.telefono,
          c.vehiculo,
          c.cristal,
          c.sucursal,
          c.tipo_cliente,
          c.aseguradora,
          c.empresa,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(q),
      );
    }

    return [...lista].sort((a, b) => {
      const fa = new Date(a.creado_en).getTime();
      const fb = new Date(b.creado_en).getTime();
      return orden === "nuevo" ? fb - fa : fa - fb;
    });
  }, [cotizaciones, filtro, busqueda, orden, filtroSucursal, filtroVia, filtroTipo]);

  return (
    <div className="mt-6">
      {/* Contadores / filtros (clic para filtrar) */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {FILTROS.map((f) => {
          const activo = filtro === f.key;
          return (
            <button
              key={f.key}
              onClick={() => setFiltro(f.key)}
              className={`rounded-2xl border bg-white p-4 text-center transition-colors ${
                activo
                  ? "border-primary ring-2 ring-primary/30"
                  : "border-line hover:border-primary/40"
              }`}
            >
              <div className={`font-display text-2xl font-extrabold ${f.clase}`}>
                {cuenta(f.key)}
              </div>
              <div className="mt-1 text-xs text-muted">{f.label}</div>
            </button>
          );
        })}
      </div>

      {/* Buscador + ordenar */}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar por nombre, teléfono, vehículo..."
          className="w-full flex-1 rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink outline-none focus:border-primary"
        />
        <select
          value={orden}
          onChange={(e) => setOrden(e.target.value as "nuevo" | "viejo")}
          className="rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink outline-none focus:border-primary"
        >
          <option value="nuevo">Recientes primero</option>
          <option value="viejo">Antiguos primero</option>
        </select>
      </div>

      {/* Filtros por sucursal / vía / tipo de cliente */}
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <select
          value={filtroSucursal}
          onChange={(e) => setFiltroSucursal(e.target.value)}
          className="rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink outline-none focus:border-primary"
        >
          <option value="">Todas las sucursales</option>
          {sucursalesUnicas.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          value={filtroVia}
          onChange={(e) => setFiltroVia(e.target.value)}
          className="rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink outline-none focus:border-primary"
        >
          <option value="">Todas las vías</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="telefono">Llamar</option>
        </select>
        <select
          value={filtroTipo}
          onChange={(e) => setFiltroTipo(e.target.value)}
          className="rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink outline-none focus:border-primary"
        >
          <option value="">Todos los clientes</option>
          {tiposUnicos.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <p className="mt-4 text-xs text-muted">
        Mostrando {visibles.length} de {cotizaciones.length}
      </p>

      {visibles.length === 0 ? (
        <p className="mt-3 rounded-2xl border border-line bg-bgalt p-8 text-center text-muted">
          {cotizaciones.length === 0
            ? "Aún no hay cotizaciones. Cuando un cliente llene el formulario, aparecerá aquí."
            : "No hay cotizaciones que coincidan con tu búsqueda o filtro."}
        </p>
      ) : (
        <>
          {/* TABLA — solo en pantallas grandes (computadora) */}
          <div className="mt-3 hidden overflow-x-auto rounded-2xl border border-line md:block">
            <table className="w-full min-w-[900px] border-collapse text-sm">
              <thead>
                <tr className="bg-bgalt text-left text-xs uppercase tracking-wide text-muted">
                  <th className="px-4 py-3 font-semibold">Fecha</th>
                  <th className="px-4 py-3 font-semibold">Cliente</th>
                  <th className="px-4 py-3 font-semibold">Teléfono</th>
                  <th className="px-4 py-3 font-semibold">Vía</th>
                  <th className="px-4 py-3 font-semibold">Vehículo</th>
                  <th className="px-4 py-3 font-semibold">Cristal</th>
                  <th className="px-4 py-3 font-semibold">Sucursal</th>
                  <th className="px-4 py-3 font-semibold">Estado</th>
                </tr>
              </thead>
              <tbody>
                {visibles.map((c) => (
                  <tr key={c.id} className="border-t border-line align-top">
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-muted">
                      {fecha(c.creado_en)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-ink">{c.nombre}</div>
                      <div className="mt-1 text-xs text-muted">
                        {c.tipo_cliente}
                        {c.aseguradora ? ` · ${c.aseguradora}` : ""}
                        {c.empresa ? ` · ${c.empresa}` : ""}
                        {c.num_unidades ? ` · ${c.num_unidades} unidades` : ""}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <a
                        href={`tel:${c.telefono.replace(/\s/g, "")}`}
                        className="font-medium text-primary hover:underline"
                      >
                        {c.telefono}
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      <ViaBadge via={c.contacto_via} />
                    </td>
                    <td className="px-4 py-3 text-ink">{c.vehiculo}</td>
                    <td className="px-4 py-3 text-ink">{c.cristal}</td>
                    <td className="px-4 py-3 text-ink">
                      {c.sucursal}
                      {c.direccion_domicilio ? (
                        <div className="mt-1 text-xs text-muted">
                          <span className="font-medium">Domicilio:</span>{" "}
                          {c.direccion_domicilio}
                        </div>
                      ) : null}
                    </td>
                    <td className="px-4 py-3">
                      <EstadoSelect id={c.id} estadoInicial={c.estado} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* TARJETAS — solo en celular */}
          <div className="mt-3 space-y-3 md:hidden">
            {visibles.map((c) => (
              <div
                key={c.id}
                className="rounded-2xl border border-line bg-white p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-semibold text-ink">{c.nombre}</div>
                    <div className="text-xs text-muted">{fecha(c.creado_en)}</div>
                  </div>
                  <EstadoSelect id={c.id} estadoInicial={c.estado} />
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                  <a
                    href={`tel:${c.telefono.replace(/\s/g, "")}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {c.telefono}
                  </a>
                  <ViaBadge via={c.contacto_via} />
                </div>

                <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
                  <dt className="text-muted">Vehículo:</dt>
                  <dd className="text-ink">{c.vehiculo}</dd>
                  <dt className="text-muted">Cristal:</dt>
                  <dd className="text-ink">{c.cristal}</dd>
                  <dt className="text-muted">Sucursal:</dt>
                  <dd className="text-ink">{c.sucursal}</dd>
                  <dt className="text-muted">Cliente:</dt>
                  <dd className="text-ink">
                    {c.tipo_cliente}
                    {c.aseguradora ? ` · ${c.aseguradora}` : ""}
                    {c.empresa ? ` · ${c.empresa}` : ""}
                    {c.num_unidades ? ` · ${c.num_unidades} u.` : ""}
                  </dd>
                  {c.direccion_domicilio ? (
                    <>
                      <dt className="text-muted">Domicilio:</dt>
                      <dd className="text-ink">{c.direccion_domicilio}</dd>
                    </>
                  ) : null}
                </dl>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
