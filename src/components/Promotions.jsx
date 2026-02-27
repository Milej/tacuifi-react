import { BadgePercent, CalendarDays, Sparkles, ArrowRight } from "lucide-react";
import SectionTitle from "./SectionTitle";
import { goToContactWithPrefill } from "../helpers/goToContactWithPrefill";
import { UNIDADES } from "../config/unidades";

const promos = [
  {
    id: "3x2",
    title: "Promo 3x2",
    desc: "Pagás 2 noches y te regalamos 1. Ideal para escapadas entre semana.",
    dates: "Todo el año (según disponibilidad)",
    notValid: "No válida para finde largo",
    type: "nxm",
    pay: 2,
    get: 3,
  },
  {
    id: "4x3",
    title: "Promo 4x3",
    desc: "Pagás 3 noches y te regalamos 1. Perfecta para descansar un poco más.",
    dates: "Todo el año (según disponibilidad)",
    notValid: "No válida para finde largo",
    type: "nxm",
    pay: 3,
    get: 4,
  },
  {
    id: "jubilados-10",
    title: "10% OFF Jubilados",
    desc: "Descuento exclusivo para jubilados. Se solicita acreditación al llegar.",
    dates: "Todo el año (según disponibilidad)",
    notValid: "No válida para finde largo",
    type: "percent",
    percent: 10,
  },
  {
    id: "larga-5",
    title: "Descuentos en estadías largas (+5 noches)",
    desc: "Precio especial en reservas de 5 noches o más. Consultanos fechas y unidad.",
    dates: "Todo el año (según disponibilidad)",
    notValid: "No válida para finde largo",
    type: "longStay",
    minNights: 5,
  },
];

export default function Promotions() {
  const unitFallback = UNIDADES?.[0] || null;

  return (
    <section className="relative py-14 md:py-16">
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
          // ✅ Lista de promos
          <div className="grid md:grid-cols-2 gap-5">
            {promos.map((p) => (
              <div
                key={p.id}
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

                      {/* 👇 condición “no válida para finde largo” */}
                      {p.notValid && (
                        <p className="mt-2 text-xs text-zinc-500">
                          <span className="font-semibold text-zinc-700">Importante:</span> {p.notValid}
                        </p>
                      )}
                    </div>
                  </div>
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
