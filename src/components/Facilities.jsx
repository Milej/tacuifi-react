import { Car, Flame, Waves, Trees, ShieldCheck, Sparkles, Baby, MapPin } from "lucide-react";
import SectionTitle from "./SectionTitle";

const items = [
  { icon: Trees, title: "Parque amplio", desc: "Espacios verdes cuidados para descansar y disfrutar al aire libre." },
  { icon: Waves, title: "Piscina", desc: "Área de relax ideal para aflojar y pasar la tarde tranquilo." },
  { icon: Flame, title: "Asadores", desc: "Parrillas disponibles para disfrutar de un buen asado." },
  { icon: Car, title: "Estacionamiento", desc: "Comodidad al llegar, con lugar para dejar el auto." },
  { icon: ShieldCheck, title: "Entorno tranquilo", desc: "Ambiente familiar y seguro para descansar de verdad." },
  { icon: Sparkles, title: "Limpieza", desc: "Unidades y espacios comunes limpios y ordenados." },
  {
    icon: Baby,
    title: "Ideal familias",
    desc: "Apto para estadías familiares.",
  },

  { icon: MapPin, title: "Ubicación práctica", desc: "Fácil acceso y entorno natural, perfecto para desconectar." },
];

export default function Facilities() {
  return (
    <section className="relative py-14 md:py-16 bg-white">
      {/* fondo suave como el resto del sitio */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(16,185,129,0.06),transparent_55%),radial-gradient(circle_at_85%_30%,rgba(120,53,15,0.06),transparent_55%)]" />

      <SectionTitle eyebrow="Instalaciones" title="Exterior & servicios" desc="Todo lo necesario para tu estadía." />

      <div className="mx-auto max-w-6xl px-4 mt-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group rounded-3xl border border-zinc-200/80 bg-white/70 backdrop-blur-sm shadow-sm ring-1 ring-black/[0.03] p-5 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start gap-3">
                {/* ✅ icon badge sin "aplastarse" */}
                <div className="h-11 w-11 rounded-2xl border border-zinc-200 bg-zinc-50 flex items-center justify-center shrink-0 leading-none group-hover:bg-white transition">
                  <Icon className="h-5 w-5 text-zinc-700 shrink-0" />
                </div>

                <div className="min-w-0">
                  <p className="font-semibold text-zinc-900 leading-tight">{title}</p>
                  <p className="mt-1 text-sm text-zinc-600 leading-relaxed">{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
