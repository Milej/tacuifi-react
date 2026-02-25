import { useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";

import DateRangeField from "./DateRangeField";
import GuestsPicker from "./GuestsPicker";

export default function Hero() {
  const bgImage = "/hero.jpg";

  const NEXT_BG = "#ebe6dc";

  const [fechas, setFechas] = useState({ desde: "", hasta: "" });
  const [personas, setPersonas] = useState({ adultos: 2, menores: 0 });

  const goContact = () => {
    sessionStorage.setItem(
      "contact_prefill",
      JSON.stringify({
        fechasPrefill: { desde: fechas?.desde || "", hasta: fechas?.hasta || "" },
        personasPrefill: {
          adultos: Number(personas?.adultos ?? 1),
          menores: Number(personas?.menores ?? 0),
        },
      }),
    );

    // ✅ avisamos al form que lea el prefill
    window.dispatchEvent(new Event("contact:prefill"));

    // ✅ scroll suave al final (sin depender del hash)
    const section = document.getElementById("contacto");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // fallback por si todavía no está montado
      window.location.hash = "#contacto";
    }
  };

  return (
    <section
      id="inicio"
      className="relative overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative mx-auto max-w-6xl px-4 pt-28 pb-16">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-white">Tacuifí</h1>
          <p className="mt-2 text-xl md:text-2xl text-white/90 font-light">Apart & Cabañas — Los Reartes</p>
          <p className="mt-6 text-base md:text-lg text-white/90 leading-relaxed">
            Predio amplio, arbolado e iluminado sobre la avenida principal. Un lugar tranquilo para descansar, a pasos
            del río y cerca de todo.
          </p>
        </div>

        <div className="mt-14">
          <div className="rounded-3xl border border-zinc-200/80 bg-white/90 backdrop-blur-sm shadow-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 items-end">
              <DateRangeField value={fechas} onChange={setFechas} error={""} />
              <GuestsPicker value={personas} onChange={setPersonas} error={""} />

              <div className="flex md:justify-end">
                <button
                  type="button"
                  onClick={goContact}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-800 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition focus:outline-none focus:ring-2 focus:ring-emerald-900/20 whitespace-nowrap"
                >
                  <MessageCircle className="h-5 w-5" />
                  Consultar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-24"
        style={{
          background: `linear-gradient(to bottom, rgba(0,0,0,0), ${NEXT_BG})`,
        }}
      />
    </section>
  );
}
