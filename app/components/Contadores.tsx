"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type Stat = {
  n: number;
  plus?: boolean;
  label: string;
  sub: string;
  href: string;
  linkText: string;
};

function useCountUp(target: number, run: boolean, duration = 1300) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!run) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVal(target);
      return;
    }

    let raf = 0;
    let start: number | null = null;
    const step = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [run, target, duration]);

  return val;
}

function StatRow({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);
  const val = useCountUp(stat.n, run);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="flex items-center gap-5 border-b border-line py-8 last:border-0 sm:gap-8"
    >
      <div className="w-24 shrink-0 text-right sm:w-36">
        <span className="font-display text-5xl font-extrabold leading-none tabular-nums text-primary sm:text-7xl">
          {stat.plus ? "+" : ""}
          {val}
        </span>
      </div>
      <div className="min-w-0">
        <h3 className="font-display text-lg font-bold text-ink sm:text-xl">{stat.label}</h3>
        <p className="mt-1 text-sm text-muted sm:text-base">{stat.sub}</p>
        <Link
          href={stat.href}
          className="group mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
        >
          {stat.linkText}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default function Contadores({ stats }: { stats: Stat[] }) {
  return (
    <div className="divide-line">
      {stats.map((s) => (
        <StatRow key={s.label} stat={s} />
      ))}
    </div>
  );
}
