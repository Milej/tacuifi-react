import SectionTitle from "./SectionTitle";
import UnitCarousel from "./UnitCarousel";
import { UNIDADES } from "../config/unidades";
import * as Icons from "lucide-react";
import { goToContactWithPrefill } from "../helpers/goToContactWithPrefill";
import { ExternalLink, CalendarCheck, Image as ImageIcon } from "lucide-react";

function getLucideIcon(name) {
  return Icons?.[name] || Icons.Package;
}

export default function Units({ variant = "apartamentos" }) {
  const id = variant === "piedra" ? "piedra" : "apartamento";
  const unit = UNIDADES.find((u) => u.id === id);

  if (!unit) return null;

  const links = unit.links || {};

  return (
    <section className="relative py-14 md:py-16 bg-[#fbfaf7]">
      {/* ✅ SOLO acá va título/subtítulo */}
      <SectionTitle eyebrow="Unidades" title={unit.title} desc={unit.subtitle} />

      <div className="mx-auto max-w-6xl px-4 mt-8 grid lg:grid-cols-2 gap-6 items-start">
        {/* Carousel */}
        <UnitCarousel folder={unit.folder} images={unit.images} altBase={unit.title} />

        {/* Info card */}
        <div className="rounded-3xl border border-zinc-200/80 bg-white/70 backdrop-blur-sm shadow-sm ring-1 ring-black/[0.03] p-6">
          {/* ✅ Descripción (sin repetir título) */}
          <p className="text-sm md:text-[15px] text-zinc-700 leading-relaxed">{unit.info}</p>

          {/* Equipamiento */}
          {unit.equipment?.length > 0 && (
            <>
              <div className="mt-6 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-zinc-900">Equipamiento</p>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {unit.equipment.map((it) => {
                  const Icon = getLucideIcon(it.icon);
                  return (
                    <div
                      key={it.name}
                      className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 shadow-[0_1px_0_rgba(0,0,0,0.03)] hover:bg-zinc-50 transition"
                    >
                      <Icon className="h-4 w-4 text-zinc-600" />
                      <span className="leading-none">{it.name}</span>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Divider */}
          <div className="mt-6 h-px w-full bg-zinc-200/70" />

          {/* CTAs - ordenados y con jerarquía */}
          <div className="mt-5">
            {/* Botonera */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Primary */}
              <button
                type="button"
                onClick={() => goToContactWithPrefill(unit)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold bg-emerald-700 text-white shadow-sm hover:bg-emerald-600 transition"
              >
                <CalendarCheck className="h-4 w-4" />
                Consultar disponibilidad
              </button>

              {/* Secondary */}
              {links?.turismomax ? (
                <a
                  href={links.turismomax}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold border border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-50 transition"
                >
                  <ExternalLink className="h-4 w-4" />
                  Reservar en TurismoMax
                </a>
              ) : (
                <div className="hidden sm:block" />
              )}

              {/* Tertiary */}
              {links?.booking && (
                <a
                  href={links.booking}
                  target="_blank"
                  rel="noreferrer"
                  className="sm:col-span-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold border border-zinc-300 bg-zinc-50 text-zinc-900 hover:bg-zinc-100 transition"
                >
                  <ExternalLink className="h-4 w-4" />
                  Ver en Booking
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
