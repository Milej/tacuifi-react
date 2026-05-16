import { useState } from "react";
import { MessageCircle } from "lucide-react";

import DateRangeField from "./DateRangeField";
import GuestsPicker from "./GuestsPicker";
import { DEFAULT_HOME_CONTENT } from "../content/defaultHomeContent";
import { resolveAssetUrl } from "../helpers/siteContent";

export default function Hero({ content = DEFAULT_HOME_CONTENT.hero }) {
  const bgImage = resolveAssetUrl(content?.backgroundImage || DEFAULT_HOME_CONTENT.hero.backgroundImage);
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

    window.dispatchEvent(new Event("contact:prefill"));

    const targetSectionId = content?.primaryButtonTarget || "contacto";
    const section = document.getElementById(targetSectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.hash = `#${targetSectionId}`;
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

      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-28">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-semibold tracking-tight text-white md:text-6xl">{content?.title}</h1>
          <p className="mt-2 text-xl font-light text-white/90 md:text-2xl">{content?.subtitle}</p>
          <p className="mt-6 text-base leading-relaxed text-white/90 md:text-lg">{content?.description}</p>
        </div>

        <div className="mt-14">
          <div className="rounded-3xl border border-zinc-200/80 bg-white/90 p-6 shadow-xl backdrop-blur-sm">
            <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-[1fr_1fr_auto]">
              <DateRangeField value={fechas} onChange={setFechas} error="" />
              <GuestsPicker value={personas} onChange={setPersonas} error="" />

              <div className="flex md:justify-end">
                <button
                  type="button"
                  onClick={goContact}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-emerald-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-900/20"
                >
                  <MessageCircle className="h-5 w-5" />
                  {content?.primaryButtonLabel || "Consultar"}
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
