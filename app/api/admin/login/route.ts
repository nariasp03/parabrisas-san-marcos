import { NextResponse } from "next/server";
import { iniciarSesion } from "@/app/lib/auth";
import {
  minutosBloqueado,
  registrarFallo,
  limpiarIntentos,
} from "@/app/lib/loginLimiter";

export async function POST(request: Request) {
  // Identificamos al visitante por su IP (para contar sus intentos).
  const ip =
    (request.headers.get("x-forwarded-for") || "local").split(",")[0].trim();

  const min = minutosBloqueado(ip);
  if (min > 0) {
    return NextResponse.json(
      {
        ok: false,
        error: `Demasiados intentos fallidos. Espera ${min} minuto(s) e intenta de nuevo.`,
      },
      { status: 429 },
    );
  }

  const body = await request.json().catch(() => ({}));
  const password = typeof body.password === "string" ? body.password : "";

  const ok = await iniciarSesion(password);
  if (!ok) {
    registrarFallo(ip);
    return NextResponse.json(
      { ok: false, error: "Contraseña incorrecta" },
      { status: 401 },
    );
  }

  limpiarIntentos(ip);
  return NextResponse.json({ ok: true });
}
