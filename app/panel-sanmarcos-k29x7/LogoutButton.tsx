"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function salir() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/panel-sanmarcos-k29x7/login");
    router.refresh();
  }

  return (
    <button
      onClick={salir}
      className="rounded-full border border-line px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-bgalt"
    >
      Cerrar sesión
    </button>
  );
}
