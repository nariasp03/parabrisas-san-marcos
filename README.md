# Parabrisas San Marcos

Sitio web y panel de gestión de cotizaciones para **Parabrisas San Marcos**, negocio de venta e instalación de parabrisas y cristales automotrices en Aguascalientes.

🔗 **En vivo:** https://parabrisassanmarcos.autos

## ¿Qué hace?

- **Sitio público** con información del negocio, servicios y sucursales.
- **Formulario de cotización** con validación de teléfono internacional (selector de país) y doble canal de envío: WhatsApp (mensaje pre-armado) o correo electrónico.
- **Panel de administración privado** (protegido con contraseña) para ver, buscar, filtrar y gestionar el estado de todas las cotizaciones recibidas.

## Stack

- [Next.js](https://nextjs.org) 16 — App Router, React Server Components
- React 19 + TypeScript
- Tailwind CSS 4
- PostgreSQL (Neon, serverless) con `pg`
- Desplegado en [Railway](https://railway.app)

## Correr en local

```bash
npm install
npm run dev
```

Luego abre [http://localhost:3000](http://localhost:3000).

### Variables de entorno

Crea un archivo `.env.local` en la raíz con:

```
DATABASE_URL=...     # cadena de conexión de PostgreSQL (Neon)
ADMIN_PASSWORD=...   # contraseña del panel de administración
```

## Despliegue

Se despliega en Railway con `railway up`. Las variables de entorno se configuran en el panel de Railway.
