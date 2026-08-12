import { NextResponse } from "next/server";
import { insertarCotizacion } from "@/app/lib/db";

// Envía un WhatsApp de aviso a Natalia por CallMeBot (best-effort: si falla o no
// está configurado, no rompe el guardado de la cotización).
async function notificarCallMeBot(texto: string) {
  const phone = process.env.CALLMEBOT_PHONE;
  const apikey = process.env.CALLMEBOT_APIKEY;
  if (!phone || !apikey) return;
  const url =
    `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}` +
    `&text=${encodeURIComponent(texto)}&apikey=${encodeURIComponent(apikey)}`;
  try {
    await fetch(url, { method: "GET" });
  } catch {
    // ignoramos errores de la notificación
  }
}

// POST público: guarda una cotización nueva (la usa el formulario del sitio,
// tanto para WhatsApp como para Teléfono).
export async function POST(request: Request) {
  try {
    const b = await request.json();
    const s = (v: unknown) => (typeof v === "string" ? v.trim() : "");

    const nombre = s(b.nombre);
    const telefono = s(b.telefono);
    if (!nombre || !telefono) {
      return NextResponse.json(
        { ok: false, error: "Faltan datos" },
        { status: 400 },
      );
    }

    await insertarCotizacion({
      nombre,
      telefono,
      tipo_cliente: s(b.tipo_cliente),
      aseguradora: s(b.aseguradora) || null,
      empresa: s(b.empresa) || null,
      num_unidades: s(b.num_unidades) || null,
      vehiculo: s(b.vehiculo),
      marca: s(b.marca) || null,
      modelo: s(b.modelo) || null,
      anio: s(b.anio) || null,
      cristal: s(b.cristal),
      sucursal: s(b.sucursal),
      direccion_domicilio: s(b.direccion_domicilio) || null,
      contacto_via: s(b.contacto_via) === "telefono" ? "telefono" : "whatsapp",
    });

    // Aviso por WhatsApp (CallMeBot) — no bloquea si falla.
    const via = s(b.contacto_via) === "telefono" ? "prefiere que le LLAMEN" : "por WhatsApp";
    const vehiculoTxt = s(b.vehiculo) || [s(b.marca), s(b.modelo), s(b.anio)].filter(Boolean).join(" ");
    const texto = [
      "Nueva cotizacion - Parabrisas San Marcos",
      `Nombre: ${nombre}`,
      `Tel: ${telefono} (${via})`,
      vehiculoTxt && `Vehiculo: ${vehiculoTxt}`,
      s(b.cristal) && `Cristal: ${s(b.cristal)}`,
      s(b.sucursal) && `Sucursal: ${s(b.sucursal)}`,
      s(b.tipo_cliente) &&
        `Cliente: ${s(b.tipo_cliente)}${s(b.aseguradora) ? " - " + s(b.aseguradora) : ""}${s(b.empresa) ? " - " + s(b.empresa) : ""}`,
      s(b.direccion_domicilio) && `Domicilio: ${s(b.direccion_domicilio)}`,
    ]
      .filter(Boolean)
      .join("\n");
    await notificarCallMeBot(texto);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Error al guardar" },
      { status: 500 },
    );
  }
}
