"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import type { Map as LMap, Marker } from "leaflet";
import { sucursales, type Sucursal } from "../lib/sucursales";

const digits = (t: string) => t.replace(/\D/g, "");
const byName = (k: string) => sucursales.find((s) => s.nombre === k) as Sucursal;

// Coordenadas geográficas reales de cada sucursal
const PINS: { key: string; lat: number; lng: number }[] = [
  { key: "Zacatecas, Zacatecas", lat: 22.7754, lng: -102.5723 },
  { key: "Aguascalientes Norte", lat: 21.905, lng: -102.315 },
  { key: "Aguascalientes Sur", lat: 21.857, lng: -102.2981 },
  { key: "Villa Hidalgo, Jalisco", lat: 21.6769, lng: -102.5892 },
  { key: "Encarnación de Díaz (La Chona)", lat: 21.5263, lng: -102.2403 },
  { key: "San Juan de los Lagos", lat: 21.2475, lng: -102.3317 },
  { key: "Lagos de Moreno, Jalisco", lat: 21.3661, lng: -101.9179 },
  { key: "León, Guanajuato", lat: 21.1277, lng: -101.6461 },
];

const ESTADOS: { estado: string; keys: string[] }[] = [
  { estado: "Aguascalientes", keys: ["Aguascalientes Norte", "Aguascalientes Sur"] },
  { estado: "Zacatecas", keys: ["Zacatecas, Zacatecas"] },
  {
    estado: "Jalisco",
    keys: [
      "Lagos de Moreno, Jalisco",
      "Encarnación de Díaz (La Chona)",
      "San Juan de los Lagos",
      "Villa Hidalgo, Jalisco",
    ],
  },
  { estado: "Guanajuato", keys: ["León, Guanajuato"] },
];

const llByKey = (k: string): [number, number] | null => {
  const p = PINS.find((x) => x.key === k);
  return p ? [p.lat, p.lng] : null;
};

function popupHtml(s: Sucursal) {
  const dom = s.soloDomicilio
    ? `<div style="display:inline-block;background:#dde9d8;color:#1a361a;font-size:10px;font-weight:700;border-radius:999px;padding:2px 8px;margin-top:5px">Solo servicio a domicilio</div>`
    : "";
  const dir = s.direccion
    ? `<div style="color:#586856;font-size:11px;margin-top:5px;line-height:1.35">${s.direccion}${s.cp ? ", C.P. " + s.cp : ""}</div>`
    : "";
  const phoneSvg = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1a361a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex:none"><path d="M6.5 10.8a13 13 0 0 0 6.7 6.7l2-2a1 1 0 0 1 1-.25 10 10 0 0 0 3.2.5 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A16 16 0 0 1 3 5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1 10 10 0 0 0 .5 3.2 1 1 0 0 1-.25 1z"/></svg>`;
  const call = `<a href="tel:+52${digits(s.telefonos[0])}" style="display:flex;align-items:center;justify-content:center;gap:6px;background:#dde9d8;color:#1a361a;font-weight:600;border-radius:999px;padding:6px 10px;text-decoration:none;font-size:12.5px">${phoneSvg}${s.telefonos[0]}</a>`;
  const wa = s.whatsapp
    ? `<a href="https://wa.me/52${digits(s.whatsapp)}" target="_blank" rel="noopener" style="display:flex;align-items:center;justify-content:center;gap:5px;background:#234721;color:#fff;font-weight:600;border-radius:999px;padding:6px 10px;text-decoration:none;font-size:12.5px">WhatsApp</a>`
    : "";
  return `<div style="min-width:150px;max-width:196px;font-family:Inter,system-ui,sans-serif"><strong style="font-family:Montserrat,sans-serif;color:#234721;font-size:14px;font-weight:800;line-height:1.15">${s.nombre}</strong>${dom}${dir}<div style="display:flex;flex-direction:column;gap:5px;margin-top:8px">${call}${wa}</div></div>`;
}

export default function MapaHome() {
  const mapDiv = useRef<HTMLDivElement>(null);
  const mapObj = useRef<LMap | null>(null);
  const markers = useRef<Record<string, Marker>>({});
  const [openEstado, setOpenEstado] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !mapDiv.current || mapObj.current) return;

      const map = L.map(mapDiv.current, {
        zoomControl: true,
        scrollWheelZoom: true,
        attributionControl: false,
        maxZoom: 12,
      });
      mapObj.current = map;

      // Contorno de estados (GeoJSON georreferenciado)
      const geo = await fetch("/mexico-estados.json").then((r) => r.json());
      if (cancelled) return;
      const estados = L.geoJSON(geo, {
        style: { fillColor: "#d9e8d2", color: "#2f5a2c", weight: 1, fillOpacity: 1, opacity: 1 },
      }).addTo(map);
      map.setMaxBounds(estados.getBounds().pad(0.35));

      const pinIcon = L.divIcon({
        className: "",
        html: `<svg width="28" height="28" viewBox="0 0 24 24" fill="#234721" stroke="#fff" stroke-width="1.5"><path d="M12 2C7.6 2 4 5.6 4 10c0 5.4 7 11.4 7.3 11.7.4.3 1 .3 1.4 0C13 21.4 20 15.4 20 10c0-4.4-3.6-8-8-8z"/><circle cx="12" cy="10" r="3" fill="#fff" stroke="none"/></svg>`,
        iconSize: [28, 28],
        iconAnchor: [14, 26],
        popupAnchor: [0, -24],
      });

      const closeAll = () => Object.values(markers.current).forEach((m) => m.closePopup());

      const pts: Array<[number, number]> = [];
      PINS.forEach((p) => {
        const s = byName(p.key);
        pts.push([p.lat, p.lng]);
        const m = L.marker([p.lat, p.lng], { icon: pinIcon }).addTo(map);
        m.bindPopup(popupHtml(s), {
          autoClose: false,
          closeOnClick: false,
          minWidth: 160,
          maxWidth: 210,
          autoPanPadding: [24, 24],
        });
        m.off("click");
        m.on("click", () => {
          closeAll();
          m.openPopup();
        });
        markers.current[p.key] = m;
      });

      // Tope de zoom-out: todo México (evita fondo vacío)
      map.fitBounds(estados.getBounds());
      map.setMinZoom(map.getZoom());
      // Vista inicial: acercada a los puntos
      map.fitBounds(pts, { padding: [55, 55] });
      // Abrir por defecto Aguascalientes Norte
      markers.current["Aguascalientes Norte"]?.openPopup();
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const focusUbicacion = (key: string) => {
    const map = mapObj.current;
    if (!map) return;
    Object.values(markers.current).forEach((m) => m.closePopup());
    const ll = llByKey(key);
    const m = markers.current[key];
    if (ll && m) {
      map.setView(ll, Math.max(map.getZoom(), 8), { animate: true });
      window.setTimeout(() => m.openPopup(), 350);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_230px]">
      <div
        ref={mapDiv}
        style={{ background: "#0c130f" }}
        className="relative isolate h-[460px] w-full overflow-hidden rounded-3xl ring-1 ring-white/10 sm:h-[540px] [&_.leaflet-container]:bg-[#0c130f]"
      />
      {/* Leyenda por estado (acordeón) */}
      <div className="flex flex-col">
        <h3 className="font-display text-sm font-bold uppercase tracking-wide text-primary-light">Por estado</h3>
        <p className="mt-1 text-xs text-white/55">Elige un estado y luego una ubicación para verla en el mapa.</p>
        <div className="mt-3 flex flex-col gap-2">
          {ESTADOS.map((e) => {
            const isOpen = openEstado === e.estado;
            return (
              <div key={e.estado} className="overflow-hidden rounded-2xl border border-line bg-white">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenEstado(isOpen ? null : e.estado)}
                  className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left transition-colors hover:bg-soft"
                >
                  <span className="flex min-w-0 items-center gap-2.5">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
                    <span className="truncate font-semibold text-ink">{e.estado}</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-soft text-xs font-bold text-primary-dark">
                      {e.keys.length}
                    </span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={`h-4 w-4 text-muted transition-transform ${isOpen ? "rotate-180" : ""}`}>
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <ul className="border-t border-line">
                    {e.keys.map((k) => {
                      const s = byName(k);
                      return (
                        <li key={k}>
                          <button
                            type="button"
                            onClick={() => focusUbicacion(k)}
                            className="flex w-full items-center justify-between gap-2 px-4 py-2.5 text-left text-sm transition-colors hover:bg-soft"
                          >
                            <span className="min-w-0 truncate font-medium text-ink">{s.nombre}</span>
                            {s.soloDomicilio && (
                              <span className="shrink-0 rounded-full bg-soft px-2 py-0.5 text-[10px] font-semibold text-primary-dark">Sólo a domicilio</span>
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
