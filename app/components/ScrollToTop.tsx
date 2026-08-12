"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Sube la vista al inicio cada vez que se cambia de página. Si la URL trae un
// ancla (#seccion), NO sube: así respetamos los enlaces a secciones internas.
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return null;
}
