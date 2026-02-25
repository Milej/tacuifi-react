import { Car, Flame, Waves, Trees, ShieldCheck, Sparkles, Baby, MapPin } from "lucide-react";
import SectionTitle from "./SectionTitle";

const items = [
  { icon: Trees, title: "Parque amplio", desc: "Espacios verdes cuidados para descansar y disfrutar al aire libre." },
  { icon: Waves, title: "Piscina", desc: "Área de relax ideal para aflojar y pasar la tarde tranquilo." },
  { icon: Flame, title: "Asadores", desc: "Parrillas disponibles para disfrutar de un buen asado." },
  { icon: Car, title: "Estacionamiento", desc: "Comodidad al llegar, con lugar para dejar el auto." },
  { icon: ShieldCheck, title: "Entorno tranquilo", desc: "Ambiente familiar y seguro para descansar de verdad." },
  { icon: Sparkles, title: "Limpieza", desc: "Unidades y espacios comunes limpios y ordenados." },
  { icon: Baby, title: "Ideal familias", desc: "Apto para estadías familiares." },
  { icon: MapPin, title: "Ubicación práctica", desc: "Fácil acceso y entorno natural, perfecto para desconectar." },
];

export default function Facilities() {
  return (
    <section className="relative py-14 md:py-16">
      <SectionTitle eyebrow="Instalaciones" title="Exterior & servicios" desc="Todo lo necesario para tu estadía." />

      <div className="mx-auto max-w-6xl px-4 mt-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="
                group h-full
                rounded-3xl
                border border-black/5
                bg-white/80
                shadow-[0_10px_30px_-22px_rgba(0,0,0,.35)]
                ring-1 ring-black/[0.03]
                p-5
                transition
                hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_14px_36px_-24px_rgba(0,0,0,.45)]
              "
            >
              <div className="flex items-start gap-3">
                <div
                  className="
                    h-11 w-11 shrink-0
                    rounded-2xl
                    border border-black/5
                    bg-zinc-50
                    flex items-center justify-center
                    transition
                    group-hover:bg-white
                  "
                >
                  <Icon className="h-5 w-5 text-zinc-700" />
                </div>

                <div className="min-w-0">
                  <p className="font-semibold text-zinc-900 leading-tight">{title}</p>
                  <p className="mt-1 text-sm text-zinc-600 leading-relaxed">{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ opcional: mini nota elegante abajo */}
        <p className="mt-6 text-sm text-zinc-600">
          Si necesitás algo puntual para tu estadía, escribinos y lo coordinamos.
        </p>
      </div>
    </section>
  );
}
