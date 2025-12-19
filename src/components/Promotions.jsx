import { BadgePercent, CalendarDays, Sparkles, ArrowRight } from "lucide-react";
import SectionTitle from "./SectionTitle";
import { goToContactWithPrefill } from "../helpers/goToContactWithPrefill";
import { UNIDADES } from "../config/unidades";

const promos = [];

export default function Promotions() {
  const unitFallback = UNIDADES?.[0] || null;

  return (
    <section className="relative py-14 md:py-16 bg-white">
      {/* fondo suave como venimos usando */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(16,185,129,0.06),transparent_55%),radial-gradient(circle_at_85%_30%,rgba(120,53,15,0.06),transparent_55%)]" />

      <SectionTitle
        eyebrow="Promociones"
        title="Promos y oportunidades"
        desc="En este espacio te mostramos las promociones vigentes. Si no hay, podés consultarnos igual para que te asesoremos."
      />

      <div className="mx-auto max-w-6xl px-4 mt-8">
        {promos.length === 0 ? (
          <div className="rounded-3xl border border-zinc-200/80 bg-white/70 backdrop-blur-sm shadow-sm ring-1 ring-black/[0.03] p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl border border-zinc-200 bg-zinc-50 flex items-center justify-center shrink-0 leading-none">
                  <Sparkles className="h-6 w-6 text-zinc-700" />
                </div>

                <div>
                  <p className="text-base font-semibold text-zinc-900">Por ahora no hay promociones publicadas</p>
                  <p className="mt-1 text-sm text-zinc-600 leading-relaxed">
                    Igual podés consultar disponibilidad y te pasamos la mejor opción según fechas.
                  </p>
                </div>
              </div>

              <div className="md:ml-auto flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <button
                  type="button"
                  onClick={() => goToContactWithPrefill(unitFallback)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold bg-emerald-700 text-white shadow-sm hover:bg-emerald-600 transition"
                >
                  Consultar disponibilidad
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          // ✅ Lista de promos (cuando haya)
          <div className="grid md:grid-cols-2 gap-5">
            {promos.map((p) => (
              <div
                key={p.title}
                className="rounded-3xl border border-zinc-200/80 bg-white/70 backdrop-blur-sm shadow-sm ring-1 ring-black/[0.03] p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="h-11 w-11 rounded-2xl border border-zinc-200 bg-zinc-50 flex items-center justify-center shrink-0 leading-none">
                      <BadgePercent className="h-5 w-5 text-zinc-700" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-zinc-900">{p.title}</h3>
                      <p className="text-sm text-zinc-600 mt-1 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>

                  {p.tag && (
                    <span className="text-[11px] px-2.5 py-1 rounded-full bg-white border border-zinc-200 text-zinc-600">
                      {p.tag}
                    </span>
                  )}
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center gap-2 text-sm text-zinc-600">
                    <CalendarDays className="h-4 w-4" />
                    {p.dates || "Fechas a confirmar"}
                  </div>

                  <button
                    type="button"
                    onClick={() => goToContactWithPrefill({ ...unitFallback, promo: p })}
                    className="ml-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-700 text-white text-sm font-semibold hover:bg-emerald-600 transition"
                  >
                    Consultar promo
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
