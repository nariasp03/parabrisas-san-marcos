"use client";

import { useState } from "react";

const cristales = [
  "Parabrisas",
  "Quemacocos",
  "Puerta delantera izquierda (conductor)",
  "Puerta delantera derecha (copiloto)",
  "Puerta trasera izquierda",
  "Puerta trasera derecha",
  "Medallón",
  "Otro",
];

const sucursales = [
  "Aguascalientes Norte (Fracc. Los Sauces)",
  "Aguascalientes Sur (Monumento al Papa Juan Pablo II)",
  "Zacatecas, Zac. (Héroes de la Reforma)",
  "Lagos de Moreno, Jal. (Pueblo de Moya)",
  "León, Gto. (Jardines de Oriente)",
  "Servicio a domicilio (alrededores de todas las sucursales, Encarnación de Díaz y Villa Hidalgo, Jal.)",
];

const inputClass =
  "mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink outline-none focus:border-primary";

// Países disponibles para el teléfono. "min"/"max" = cantidad de dígitos que
// debe tener el número (sin el código de país). México va primero (es el
// principal). La última opción, "Otro país", deja escribir una lada manual.
const paises = [
  { code: "MX", label: "México", dial: "52", flag: "🇲🇽", min: 10, max: 10, ejemplo: "449 123 4567" },
  { code: "US", label: "Estados Unidos", dial: "1", flag: "🇺🇸", min: 10, max: 10, ejemplo: "555 123 4567" },
  { code: "CA", label: "Canadá", dial: "1", flag: "🇨🇦", min: 10, max: 10, ejemplo: "416 123 4567" },
  { code: "GT", label: "Guatemala", dial: "502", flag: "🇬🇹", min: 8, max: 8, ejemplo: "5123 4567" },
  { code: "SV", label: "El Salvador", dial: "503", flag: "🇸🇻", min: 8, max: 8, ejemplo: "7123 4567" },
  { code: "HN", label: "Honduras", dial: "504", flag: "🇭🇳", min: 8, max: 8, ejemplo: "9123 4567" },
  { code: "CR", label: "Costa Rica", dial: "506", flag: "🇨🇷", min: 8, max: 8, ejemplo: "8312 3456" },
  { code: "PA", label: "Panamá", dial: "507", flag: "🇵🇦", min: 7, max: 8, ejemplo: "6123 4567" },
  { code: "CO", label: "Colombia", dial: "57", flag: "🇨🇴", min: 10, max: 10, ejemplo: "300 123 4567" },
  { code: "VE", label: "Venezuela", dial: "58", flag: "🇻🇪", min: 10, max: 10, ejemplo: "412 123 4567" },
  { code: "EC", label: "Ecuador", dial: "593", flag: "🇪🇨", min: 9, max: 9, ejemplo: "99 123 4567" },
  { code: "PE", label: "Perú", dial: "51", flag: "🇵🇪", min: 9, max: 9, ejemplo: "912 345 678" },
  { code: "CL", label: "Chile", dial: "56", flag: "🇨🇱", min: 9, max: 9, ejemplo: "9 1234 5678" },
  { code: "AR", label: "Argentina", dial: "54", flag: "🇦🇷", min: 10, max: 11, ejemplo: "11 1234 5678" },
  { code: "BR", label: "Brasil", dial: "55", flag: "🇧🇷", min: 10, max: 11, ejemplo: "11 91234 5678" },
  { code: "ES", label: "España", dial: "34", flag: "🇪🇸", min: 9, max: 9, ejemplo: "612 34 56 78" },
  { code: "OTRO", label: "Otro país", dial: "", flag: "🌎", min: 6, max: 15, ejemplo: "Tu número" },
];

// Número de WhatsApp del negocio (formato internacional sin signos ni espacios).
const WHATSAPP = "524491863483";

// Llave de Web3Forms: cuando el cliente elige "Teléfono", el formulario envía
// un correo con sus datos a la dirección registrada en web3forms.com.
const WEB3FORMS_KEY = "8ff836e4-ba1f-4e2f-80c6-da58417be9b3";

type TipoCliente = "particular" | "asegurado" | "flotilla" | "";

export default function CotizacionForm() {
  const [tipoCliente, setTipoCliente] = useState<TipoCliente>("");
  const [sucursal, setSucursal] = useState("");
  const [enviado, setEnviado] = useState(false);
  // Cómo terminó el envío, para mostrar el mensaje correcto al cliente.
  const [metodoEnviado, setMetodoEnviado] = useState<"whatsapp" | "telefono">("whatsapp");
  const [enviando, setEnviando] = useState(false); // mientras se manda el correo
  const [errorEnvio, setErrorEnvio] = useState(""); // si falla el correo
  // Enlace de WhatsApp con el cuestionario ya escrito (se arma al enviar).
  const [waLink, setWaLink] = useState(`https://wa.me/${WHATSAPP}`);

  // Teléfono con selección de país y validación de cantidad de dígitos.
  const [pais, setPais] = useState("MX");
  const [telefono, setTelefono] = useState("");
  const [ladaOtro, setLadaOtro] = useState(""); // lada manual para "Otro país"
  const [errorTel, setErrorTel] = useState("");

  const esDomicilio = sucursal.startsWith("Servicio a domicilio");

  const paisActual = paises.find((p) => p.code === pais)!;
  const esOtroPais = paisActual.code === "OTRO";
  // La lada es la del país elegido, o la que el cliente escribe en "Otro país".
  const ladaActual = esOtroPais ? ladaOtro.replace(/\D/g, "") : paisActual.dial;
  // Nos quedamos solo con los dígitos que escribió el cliente.
  const digitosTel = telefono.replace(/\D/g, "");
  // El número debe tener una cantidad de dígitos dentro del rango del país, y
  // si es "Otro país", también debe haber escrito una lada (1 a 4 dígitos).
  const telValido =
    digitosTel.length >= paisActual.min &&
    digitosTel.length <= paisActual.max &&
    (!esOtroPais || (ladaActual.length >= 1 && ladaActual.length <= 4));

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorEnvio("");

    // Si el teléfono no es válido, no enviamos y mostramos el motivo.
    if (!telValido) {
      if (esOtroPais && (ladaActual.length < 1 || ladaActual.length > 4)) {
        setErrorTel("Escribe la lada (código de país), por ejemplo 39 para Italia.");
      } else {
        const rango =
          paisActual.min === paisActual.max
            ? `${paisActual.min} dígitos`
            : `entre ${paisActual.min} y ${paisActual.max} dígitos`;
        setErrorTel(`Ingresa un número válido de ${rango} para ${paisActual.label}.`);
      }
      return;
    }

    const data = new FormData(e.currentTarget);
    const get = (k: string) => (data.get(k) as string)?.trim() || "";

    // Teléfono completo en formato internacional, ej: +52 4491234567
    const telCompleto = `+${ladaActual} ${digitosTel}`;

    const tipoLabel =
      get("tipoCliente") === "particular"
        ? "Particular"
        : get("tipoCliente") === "asegurado"
          ? "Asegurado"
          : get("tipoCliente") === "flotilla"
            ? "Flotilla"
            : get("tipoCliente");

    const quierePorTelefono = get("contacto") === "telefono";
    const contactoLabel = quierePorTelefono ? "Teléfono (llamar)" : "WhatsApp";

    // Se arma el mensaje solo con los campos que aplican.
    const lineas = [
      "*Nueva solicitud de cotización - Parabrisas San Marcos*",
      "",
      `*Nombre:* ${get("nombre")}`,
      `*Teléfono:* ${telCompleto}`,
      `*Tipo de cliente:* ${tipoLabel}`,
      get("aseguradora") && `*Aseguradora:* ${get("aseguradora")}`,
      get("empresa") && `*Empresa / flotilla:* ${get("empresa")}`,
      get("numUnidades") && `*Unidades a atender:* ${get("numUnidades")}`,
      `*Vehículo y modelo:* ${get("vehiculo")}`,
      `*Cristal a reemplazar:* ${get("cristal")}`,
      `*Sucursal:* ${get("sucursal")}`,
      get("direccionDomicilio") &&
        `*Dirección del servicio a domicilio:* ${get("direccionDomicilio")}`,
      `*Contactar por:* ${contactoLabel}`,
    ].filter(Boolean);

    // Enlace de WhatsApp con el cuestionario ya escrito. Lo guardamos para
    // poder usarlo también en la pantalla de confirmación (opción Teléfono).
    const texto = encodeURIComponent(lineas.join("\n"));
    const waUrl = `https://wa.me/${WHATSAPP}?text=${texto}`;
    setWaLink(waUrl);

    // Guardamos la cotización en la base de datos (para el panel privado).
    // "Best-effort" y sin await: si fallara, no bloqueamos al cliente ni
    // impedimos que se abra WhatsApp.
    fetch("/api/cotizaciones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: get("nombre"),
        telefono: telCompleto,
        tipo_cliente: tipoLabel,
        aseguradora: get("aseguradora"),
        empresa: get("empresa"),
        num_unidades: get("numUnidades"),
        vehiculo: get("vehiculo"),
        cristal: get("cristal"),
        sucursal: get("sucursal"),
        direccion_domicilio: get("direccionDomicilio"),
        contacto_via: quierePorTelefono ? "telefono" : "whatsapp",
      }),
    }).catch(() => {});

    // Opción TELÉFONO: el cliente quiere que le llamemos. Le mandamos el correo
    // a la cotizadora (no depende de que el cliente tenga WhatsApp).
    if (quierePorTelefono) {
      setEnviando(true);
      try {
        const resp = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            subject: "📞 Nueva cotización para LLAMAR - Parabrisas San Marcos",
            from_name: "Sitio web Parabrisas San Marcos",
            Nombre: get("nombre"),
            Teléfono: telCompleto,
            "Tipo de cliente": tipoLabel,
            ...(get("aseguradora") && { Aseguradora: get("aseguradora") }),
            ...(get("empresa") && { "Empresa / flotilla": get("empresa") }),
            ...(get("numUnidades") && { "Unidades a atender": get("numUnidades") }),
            "Vehículo y modelo": get("vehiculo"),
            "Cristal a reemplazar": get("cristal"),
            Sucursal: get("sucursal"),
            ...(get("direccionDomicilio") && {
              "Dirección a domicilio": get("direccionDomicilio"),
            }),
            "Contactar por": "Teléfono (el cliente pide que le llamen)",
            message: lineas.join("\n"),
          }),
        });
        const json = await resp.json();
        if (!json.success) throw new Error(json.message || "Error al enviar");
        setMetodoEnviado("telefono");
        setEnviado(true);
      } catch {
        setErrorEnvio(
          "No pudimos enviar tu solicitud. Revisa tu conexión e inténtalo de nuevo, o contáctanos por WhatsApp.",
        );
      } finally {
        setEnviando(false);
      }
      return;
    }

    // Opción WHATSAPP: abrimos WhatsApp en el dispositivo del cliente con el
    // mensaje ya armado, listo para que solo presione enviar.
    window.open(waUrl, "_blank");
    setMetodoEnviado("whatsapp");
    setEnviado(true);
  }

  if (enviado) {
    return (
      <div className="rounded-2xl border border-line bg-bgalt p-6 text-center sm:p-8">
        <div className="text-4xl">{metodoEnviado === "telefono" ? "📞" : "✅"}</div>
        {metodoEnviado === "telefono" ? (
          <>
            <h2 className="mt-3 font-display text-xl font-bold text-ink">
              ¡Solicitud recibida!
            </h2>
            <p className="mt-2 text-muted">
              Gracias, ya recibimos tu solicitud de cotización. Te{" "}
              <strong>llamaremos pronto</strong> al número que nos diste. Si
              prefieres, también puedes{" "}
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:underline"
              >
                escribirnos por WhatsApp
              </a>
              .
            </p>
          </>
        ) : (
          <>
            <h2 className="mt-3 font-display text-xl font-bold text-ink">¡Casi listo!</h2>
            <p className="mt-2 text-muted">
              Se abrió WhatsApp con tu solicitud lista. Solo presiona{" "}
              <strong>enviar</strong> para que recibamos tu cotización. Si no se abrió,{" "}
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:underline"
              >
                escríbenos por aquí
              </a>
              .
            </p>
          </>
        )}
        <button
          onClick={() => {
            setEnviado(false);
            setTipoCliente("");
            setSucursal("");
            setPais("MX");
            setTelefono("");
            setLadaOtro("");
            setErrorTel("");
            setErrorEnvio("");
          }}
          className="mt-6 rounded-full bg-primary px-6 py-2 text-sm font-semibold text-white hover:bg-primary-light"
        >
          Enviar otra solicitud
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-line bg-white p-6 sm:p-8"
    >
      <p className="text-sm text-muted">
        Todos los campos son obligatorios. Atendemos clientes{" "}
        <strong>particulares, asegurados y flotillas</strong>.
      </p>

      {/* Nombre */}
      <div>
        <label htmlFor="nombre" className="text-sm font-medium">
          Nombre <span className="text-danger">*</span>
        </label>
        <input id="nombre" name="nombre" type="text" required className={inputClass} />
      </div>

      {/* Teléfono con selección de país */}
      <div>
        <label htmlFor="telefono" className="text-sm font-medium">
          Teléfono <span className="text-danger">*</span>
        </label>
        <div className="mt-1 flex flex-wrap gap-2">
          {/* Selector de país (México por defecto) */}
          <select
            aria-label="País del teléfono"
            value={pais}
            onChange={(e) => {
              setPais(e.target.value);
              setErrorTel("");
            }}
            className="rounded-lg border border-line bg-white px-2 py-2 text-sm text-ink outline-none focus:border-primary"
          >
            {paises.map((p) => (
              <option key={p.code} value={p.code}>
                {p.flag} {p.label}
                {p.dial ? ` +${p.dial}` : ""}
              </option>
            ))}
          </select>

          {/* Lada manual: solo aparece si eligió "Otro país" */}
          {esOtroPais && (
            <div className="flex items-center rounded-lg border border-line bg-white pl-2 focus-within:border-primary">
              <span className="text-sm text-muted">+</span>
              <input
                aria-label="Lada (código de país)"
                type="tel"
                inputMode="numeric"
                value={ladaOtro}
                onChange={(e) => {
                  // Lada: máximo 4 dígitos.
                  setLadaOtro(e.target.value.replace(/\D/g, "").slice(0, 4));
                  setErrorTel("");
                }}
                className="w-14 bg-transparent px-1 py-2 text-sm text-ink outline-none"
                placeholder="39"
              />
            </div>
          )}

          {/* Número (solo dígitos) */}
          <input
            id="telefono"
            name="telefono"
            type="tel"
            inputMode="numeric"
            required
            value={telefono}
            onChange={(e) => {
              // Permitimos solo dígitos, espacios y guiones mientras escribe.
              setTelefono(e.target.value.replace(/[^\d\s-]/g, ""));
              setErrorTel("");
            }}
            className={`min-w-[150px] flex-1 rounded-lg border bg-white px-3 py-2 text-sm text-ink outline-none focus:border-primary ${
              errorTel ? "border-danger" : "border-line"
            }`}
            placeholder={paisActual.ejemplo}
          />
        </div>
        {errorTel ? (
          <p className="mt-1 text-sm text-danger">{errorTel}</p>
        ) : (
          <p className="mt-1 text-xs text-muted">
            {esOtroPais
              ? "Escribe la lada de tu país y luego tu número."
              : paisActual.min === paisActual.max
                ? `${paisActual.min} dígitos, sin el código de país.`
                : `Entre ${paisActual.min} y ${paisActual.max} dígitos, sin el código de país.`}
          </p>
        )}
      </div>

      {/* Tipo de cliente */}
      <div>
        <span className="text-sm font-medium">
          ¿El servicio es particular, asegurado o flotilla?{" "}
          <span className="text-danger">*</span>
        </span>
        <div className="mt-2 flex flex-wrap gap-4">
          {[
            { value: "particular", label: "Particular" },
            { value: "asegurado", label: "Asegurado" },
            { value: "flotilla", label: "Flotilla" },
          ].map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="tipoCliente"
                value={opt.value}
                required
                checked={tipoCliente === opt.value}
                onChange={() => setTipoCliente(opt.value as TipoCliente)}
                className="accent-primary"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      {/* Aseguradora (solo si es asegurado) */}
      {tipoCliente === "asegurado" && (
        <div>
          <label htmlFor="aseguradora" className="text-sm font-medium">
            Aseguradora <span className="text-danger">*</span>
          </label>
          <input
            id="aseguradora"
            name="aseguradora"
            type="text"
            required
            className={inputClass}
            placeholder="Nombre de tu aseguradora"
          />
        </div>
      )}

      {/* Datos de flotilla (solo si es flotilla) */}
      {tipoCliente === "flotilla" && (
        <>
          <div>
            <label htmlFor="empresa" className="text-sm font-medium">
              Nombre de la empresa o flotilla <span className="text-danger">*</span>
            </label>
            <input
              id="empresa"
              name="empresa"
              type="text"
              required
              className={inputClass}
              placeholder="Ej: Transportes del Centro S.A. de C.V."
            />
          </div>
          <div>
            <label htmlFor="numUnidades" className="text-sm font-medium">
              Número de unidades a atender <span className="text-danger">*</span>
            </label>
            <input
              id="numUnidades"
              name="numUnidades"
              type="number"
              min={1}
              required
              className={inputClass}
              placeholder="Ej: 5"
            />
          </div>
        </>
      )}

      {/* Vehículo y modelo */}
      {tipoCliente && (
        <div>
          <label htmlFor="vehiculo" className="text-sm font-medium">
            {tipoCliente === "flotilla"
              ? "Vehículo(s) y modelo(s)"
              : "Vehículo y modelo"}{" "}
            <span className="text-danger">*</span>
          </label>
          <input
            id="vehiculo"
            name="vehiculo"
            type="text"
            required
            className={inputClass}
            placeholder={
              tipoCliente === "flotilla"
                ? "Ej: 3 Nissan NP300 2021, 2 Toyota Hiace 2022"
                : "Ej: Nissan Versa 2020"
            }
          />
        </div>
      )}

      {/* Cristal que desea reemplazar */}
      <div>
        <label htmlFor="cristal" className="text-sm font-medium">
          Cristal que desea reemplazar <span className="text-danger">*</span>
        </label>
        <select id="cristal" name="cristal" required defaultValue="" className={inputClass}>
          <option value="" disabled>
            Selecciona una opción
          </option>
          {cristales.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Sucursal */}
      <div>
        <label htmlFor="sucursal" className="text-sm font-medium">
          Sucursal en la que desea ser atendid@ <span className="text-danger">*</span>
        </label>
        <select
          id="sucursal"
          name="sucursal"
          required
          value={sucursal}
          onChange={(e) => setSucursal(e.target.value)}
          className={inputClass}
        >
          <option value="" disabled>
            Selecciona una sucursal
          </option>
          {sucursales.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Dirección del servicio a domicilio (condicional) */}
      {esDomicilio && (
        <div>
          <label htmlFor="direccionDomicilio" className="text-sm font-medium">
            ¿En dónde sería el servicio a domicilio?{" "}
            <span className="text-danger">*</span>
          </label>
          <textarea
            id="direccionDomicilio"
            name="direccionDomicilio"
            required
            rows={3}
            className={inputClass}
            placeholder="Escribe la dirección completa (calle, número, colonia, ciudad y referencias)"
          />
        </div>
      )}

      {/* ¿Por dónde le contactamos? */}
      <div>
        <span className="text-sm font-medium">
          ¿Por dónde le contactamos? <span className="text-danger">*</span>
        </span>
        <div className="mt-2 flex gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="contacto"
              value="whatsapp"
              required
              className="accent-primary"
            />
            WhatsApp
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="contacto"
              value="telefono"
              className="accent-primary"
            />
            Teléfono
          </label>
        </div>
      </div>

      {errorEnvio && (
        <p className="rounded-lg bg-danger/10 px-4 py-3 text-sm text-danger">
          {errorEnvio}
        </p>
      )}

      <button
        type="submit"
        disabled={enviando}
        className="w-full rounded-full bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-light disabled:opacity-60"
      >
        {enviando ? "Enviando..." : "Recibir cotización"}
      </button>
    </form>
  );
}
