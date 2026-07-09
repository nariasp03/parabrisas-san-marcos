import { NextResponse } from "next/server";
import { actualizarEstado, ESTADOS } from "@/app/lib/db";
import { estaAutenticado } from "@/app/lib/auth";

// PATCH protegido: cambia el estado de una cotización. Solo la administradora.
export async function PATCH(
  request: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  if (!(await estaAutenticado())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const { id } = await ctx.params;
  const body = await request.json().catch(() => ({}));
  const estado = typeof body.estado === "string" ? body.estado : "";

  if (!(ESTADOS as readonly string[]).includes(estado)) {
    return NextResponse.json(
      { ok: false, error: "Estado inválido" },
      { status: 400 },
    );
  }

  await actualizarEstado(Number(id), estado);
  return NextResponse.json({ ok: true });
}
