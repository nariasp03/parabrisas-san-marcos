"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Cotización" },
  { href: "/ubicaciones", label: "Ubicaciones" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-primary-dark text-white shadow-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-xl font-extrabold tracking-tight text-white"
        >
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary-light text-white">
            SM
          </span>
          <span className="leading-none">
            Parabrisas
            <span className="block text-xs font-semibold text-primary-light">
              San Marcos
            </span>
          </span>
        </Link>

        {/* Menú escritorio */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary-light text-white"
                      : "text-white/85 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li>
            <a
              href="tel:+524491863483"
              className="ml-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary-dark transition-colors hover:bg-primary-light hover:text-white"
            >
              Llámanos
            </a>
          </li>
        </ul>

        {/* Botón móvil */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
          className="grid h-10 w-10 place-items-center rounded-lg border border-white/30 md:hidden"
        >
          <span className="text-xl leading-none text-white">{open ? "✕" : "☰"}</span>
        </button>
      </nav>

      {/* Menú móvil desplegable */}
      {open && (
        <ul className="flex flex-col gap-1 border-t border-white/15 px-6 py-3 md:hidden">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-4 py-3 text-sm font-medium ${
                    active
                      ? "bg-primary-light text-white"
                      : "text-white/85 hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </header>
  );
}
