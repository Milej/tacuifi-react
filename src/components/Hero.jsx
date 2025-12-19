import { MapPin, Trees, Sparkles } from "lucide-react";
import InfoPill from "./InfoPill";

export default function Hero() {
  const bgImage = "/hero.jpg";

  return (
    <section
      id="inicio"
      className="relative min-h-[78vh] md:min-h-[82vh] flex items-center overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay base (suave, general) */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Overlay vertical (como ya tenías) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-[#fbf7ee]/10" />

      {/* Overlay lateral SOLO para mejorar lectura del texto (clave) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 pt-20 pb-14 md:pt-24 md:pb-20 w-full">
        {/* Bloque con panel MUY sutil para contraste (no se ve como “caja”) */}
        <div className="max-w-2xl rounded-3xl bg-black/25 backdrop-blur-[2px] p-6 md:p-8 border border-white/10">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white backdrop-blur">
            <Sparkles className="h-4 w-4" />
            Los Reartes · Valle de Calamuchita
          </div>

          <h1
            className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-white"
            style={{ textShadow: "0 2px 18px rgba(0,0,0,0.55)" }}
          >
            Tacuifí
            <span
              className="block text-white/90 font-normal text-2xl md:text-3xl mt-2"
              style={{ textShadow: "0 2px 18px rgba(0,0,0,0.55)" }}
            >
              Apart & Cabañas
            </span>
          </h1>

          <p
            className="mt-4 text-base md:text-lg text-white/90 leading-relaxed"
            style={{ textShadow: "0 2px 16px rgba(0,0,0,0.55)" }}
          >
            Ubicadas sobre la avenida principal, en un amplio predio iluminado, parquizado y arbolado. A 200 mts del río
            y a 350 mts del casco histórico.
          </p>

          {/* CTAs */}
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#apartamentos"
              className="px-5 py-3 rounded-2xl bg-emerald-800 text-white font-semibold text-sm hover:bg-emerald-700 transition shadow-sm"
            >
              Ver unidades
            </a>

            <a
              href="#galeria"
              className="px-5 py-3 rounded-2xl border border-white/25 bg-white/10 text-white font-semibold text-sm hover:bg-white/15 transition backdrop-blur"
            >
              Ver galería
            </a>
          </div>

          {/* Píldoras */}
          <div className="mt-10 grid sm:grid-cols-3 gap-3">
            <InfoPill icon={Trees} title="Predio arbolado" desc="Parquizado e iluminado" />
            <InfoPill icon={MapPin} title="A 200 mts del río" desc="Y 350 mts del centro" />
            <InfoPill icon={Sparkles} title="Ambiente tranquilo" desc="Ideal para descansar y desconectar" />
          </div>
        </div>
      </div>

      {/* Fade abajo para empalmar con el resto */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-[#fbfaf7]" />
    </section>
  );
}
