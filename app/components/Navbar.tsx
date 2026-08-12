"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/aseguradoras", label: "Aseguradoras" },
  { href: "/flotillas", label: "Flotillas" },
  { href: "/ubicaciones", label: "Ubicaciones" },
  { href: "/contacto", label: "Cotización" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Navbar transparente solo sobre el hero de la home (arriba del todo)
  const overlay = pathname === "/" && !scrolled && !open;

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        overlay ? "bg-transparent" : "border-b border-line bg-paper/90 backdrop-blur"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link
          href="/"
          aria-label="Parabrisas San Marcos — Inicio"
          className="flex items-center"
          onClick={() => setOpen(false)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={overlay ? "/logo-white.png" : "/logo-color.png"}
            alt="Parabrisas San Marcos"
            className="h-16 w-auto"
          />
        </Link>

        {/* Menú escritorio */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    overlay
                      ? active
                        ? "bg-white/15 text-white"
                        : "text-white/85 hover:bg-white/10 hover:text-white"
                      : active
                        ? "bg-soft text-primary-dark"
                        : "text-muted hover:bg-white hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li>
            <a
              href="tel:+524493093246"
              className="ml-2 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgba(35,71,33,.7)] transition-colors hover:bg-primary-dark"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M6.5 10.8a13 13 0 0 0 6.7 6.7l2-2a1 1 0 0 1 1-.25 10 10 0 0 0 3.2.5 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A16 16 0 0 1 3 5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1 10 10 0 0 0 .5 3.2 1 1 0 0 1-.25 1z" />
              </svg>
              Llámanos
            </a>
          </li>
        </ul>

        {/* Botón móvil */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
          aria-expanded={open}
          className={`grid h-10 w-10 place-items-center rounded-xl border transition-colors md:hidden ${
            overlay
              ? "border-white/30 bg-white/10 text-white hover:bg-white/20"
              : "border-line bg-white text-ink hover:bg-soft"
          }`}
        >
          {open ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5"><path d="M6 6l12 12M18 6L6 18" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          )}
        </button>
      </nav>

      {open && (
        <ul className="flex flex-col gap-1 border-t border-line bg-paper px-6 py-3 md:hidden">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-xl px-4 py-3 text-sm font-semibold ${
                    active ? "bg-soft text-primary-dark" : "text-muted hover:bg-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li>
            <a href="tel:+524493093246" className="mt-1 block rounded-xl bg-primary px-4 py-3 text-center text-sm font-semibold text-white">
              Llámanos
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
