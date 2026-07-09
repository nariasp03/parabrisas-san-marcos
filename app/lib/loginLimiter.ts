// "Guardia" simple contra adivinanzas de contraseña: cuenta los intentos
// fallidos por cada visitante (su IP) y, tras varios fallos, lo bloquea un rato.
// Vive en memoria del servidor (suficiente para 1 instancia como la nuestra).

type Entrada = { fallos: number; bloqueadoHasta: number };

const intentos = new Map<string, Entrada>();

const MAX_FALLOS = 5; // intentos permitidos antes de bloquear
const BLOQUEO_MS = 15 * 60 * 1000; // 15 minutos de bloqueo

// Devuelve los minutos que faltan de bloqueo (0 = no está bloqueado).
export function minutosBloqueado(ip: string): number {
  const e = intentos.get(ip);
  if (e && e.bloqueadoHasta > Date.now()) {
    return Math.ceil((e.bloqueadoHasta - Date.now()) / 60000);
  }
  return 0;
}

export function registrarFallo(ip: string): void {
  const e = intentos.get(ip) ?? { fallos: 0, bloqueadoHasta: 0 };
  e.fallos += 1;
  if (e.fallos >= MAX_FALLOS) {
    e.bloqueadoHasta = Date.now() + BLOQUEO_MS;
    e.fallos = 0; // reiniciamos el conteo durante el bloqueo
  }
  intentos.set(ip, e);
}

// Al entrar bien, se limpia el conteo de esa IP.
export function limpiarIntentos(ip: string): void {
  intentos.delete(ip);
}
