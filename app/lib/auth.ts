import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE = "psm_admin";

// El valor de la cookie es un hash de la contraseña + un prefijo. Así la cookie
// no contiene la contraseña en claro y no se puede falsificar sin conocerla.
function tokenEsperado(): string {
  const secret = process.env.ADMIN_PASSWORD || "";
  return crypto
    .createHash("sha256")
    .update("psm-session::" + secret)
    .digest("hex");
}

export async function estaAutenticado(): Promise<boolean> {
  if (!process.env.ADMIN_PASSWORD) return false;
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  return !!token && token === tokenEsperado();
}

export async function iniciarSesion(password: string): Promise<boolean> {
  const real = process.env.ADMIN_PASSWORD;
  if (!real || password !== real) return false;
  const store = await cookies();
  store.set(COOKIE, tokenEsperado(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 días
  });
  return true;
}

export async function cerrarSesion(): Promise<void> {
  const store = await cookies();
  store.set(COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
}
