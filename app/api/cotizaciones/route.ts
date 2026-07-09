import { NextResponse } from "next/server";
import { insertarCotizacion } from "@/app/lib/db";

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
      cristal: s(b.cristal),
      sucursal: s(b.sucursal),
      direccion_domicilio: s(b.direccion_domicilio) || null,
      contacto_via: s(b.contacto_via) === "telefono" ? "telefono" : "whatsapp",
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Error al guardar" },
      { status: 500 },
    );
  }
}
