"use client";

import { useEffect, useRef, useState } from "react";

const valores = [
  {
    titulo: "Profesionalismo",
    desc: "Personal capacitado y un trato cuidadoso en cada instalación.",
    icon: (
      <path d="M12 3l7 3v5c0 4.4-3 7.8-7 9-4-1.2-7-4.6-7-9V6zM9 12l2 2 4-4" />
    ),
  },
  {
    titulo: "Rapidez",
    desc: "Servicios en tiempo y forma, adaptándonos a tu disponibilidad.",
    icon: <path d="M13 2L4.5 13H11l-1 9 8.5-11H12l1-9z" />,
  },
  {
    titulo: "Calidad",
    desc: "Cristales y materiales de primera, con excelentes resultados.",
    icon: <path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.6l1-5.8-4.3-4.1 5.9-.9L12 3z" />,
  },
];

export default function Valores() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShow(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="mt-6 grid gap-6 sm:grid-cols-3">
      {valores.map((v, i) => (
        <div
          key={v.titulo}
          style={{ transitionDelay: `${i * 160}ms` }}
          className={`rounded-2xl border border-line bg-white p-6 transition-all duration-700 ease-out ${
            show ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-soft text-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
              {v.icon}
            </svg>
          </div>
          <h3 className="mt-4 font-display text-lg font-bold text-primary">{v.titulo}</h3>
          <p className="mt-2 text-sm text-muted">{v.desc}</p>
        </div>
      ))}
    </div>
  );
}
