import { Pool } from "pg";

// Reutilizamos un solo "pool" de conexiones entre recargas en desarrollo,
// para no abrir conexiones de más a la base de datos.
const globalForPg = globalThis as unknown as { pgPool?: Pool };

// Quitamos "sslmode" (y "channel_binding") de la URL porque el cliente pg
// muestra un warning al interpretarlos. El SSL lo activamos explícitamente
// abajo con la opción `ssl`, así la conexión sigue siendo cifrada/segura.
function connectionStringLimpia(): string {
  const raw = process.env.DATABASE_URL || "";
  try {
    const u = new URL(raw);
    u.searchParams.delete("sslmode");
    u.searchParams.delete("channel_binding");
    return u.toString();
  } catch {
    return raw;
  }
}

export const pool =
  globalForPg.pgPool ??
  new Pool({
    connectionString: connectionStringLimpia(),
    ssl: { rejectUnauthorized: false },
  });

if (process.env.NODE_ENV !== "production") globalForPg.pgPool = pool;

// Estados posibles de una cotización (control simple).
export const ESTADOS = ["Pendiente", "Vendida", "No concretada"] as const;

export type Cotizacion = {
  id: number;
  creado_en: string;
  nombre: string;
  telefono: string;
  tipo_cliente: string;
  aseguradora: string | null;
  empresa: string | null;
  num_unidades: string | null;
  vehiculo: string;
  cristal: string;
  sucursal: string;
  direccion_domicilio: string | null;
  contacto_via: string; // 'whatsapp' | 'telefono'
  estado: string;
};

let tablaLista = false;
async function ensureTable() {
  if (tablaLista) return;
  await pool.query(`
    CREATE TABLE IF NOT EXISTS cotizaciones (
      id SERIAL PRIMARY KEY,
      creado_en TIMESTAMPTZ NOT NULL DEFAULT now(),
      nombre TEXT NOT NULL DEFAULT '',
      telefono TEXT NOT NULL DEFAULT '',
      tipo_cliente TEXT NOT NULL DEFAULT '',
      aseguradora TEXT,
      empresa TEXT,
      num_unidades TEXT,
      vehiculo TEXT NOT NULL DEFAULT '',
      cristal TEXT NOT NULL DEFAULT '',
      sucursal TEXT NOT NULL DEFAULT '',
      direccion_domicilio TEXT,
      contacto_via TEXT NOT NULL DEFAULT '',
      estado TEXT NOT NULL DEFAULT 'Pendiente'
    );
  `);
  tablaLista = true;
}

export type NuevaCotizacion = {
  nombre: string;
  telefono: string;
  tipo_cliente: string;
  aseguradora?: string | null;
  empresa?: string | null;
  num_unidades?: string | null;
  vehiculo: string;
  cristal: string;
  sucursal: string;
  direccion_domicilio?: string | null;
  contacto_via: string;
};

export async function insertarCotizacion(c: NuevaCotizacion) {
  await ensureTable();
  await pool.query(
    `INSERT INTO cotizaciones
       (nombre, telefono, tipo_cliente, aseguradora, empresa, num_unidades,
        vehiculo, cristal, sucursal, direccion_domicilio, contacto_via)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
    [
      c.nombre,
      c.telefono,
      c.tipo_cliente,
      c.aseguradora ?? null,
      c.empresa ?? null,
      c.num_unidades ?? null,
      c.vehiculo,
      c.cristal,
      c.sucursal,
      c.direccion_domicilio ?? null,
      c.contacto_via,
    ],
  );
}

export async function listarCotizaciones(): Promise<Cotizacion[]> {
  await ensureTable();
  const r = await pool.query<Cotizacion>(
    "SELECT * FROM cotizaciones ORDER BY creado_en DESC",
  );
  return r.rows;
}

export async function actualizarEstado(id: number, estado: string) {
  await ensureTable();
  await pool.query("UPDATE cotizaciones SET estado = $1 WHERE id = $2", [
    estado,
    id,
  ]);
}
