import * as Icons from "lucide-react";
import { ExternalLink, CalendarCheck } from "lucide-react";
import SectionTitle from "./SectionTitle";
import UnitCarousel from "./UnitCarousel";
import { goToContactWithPrefill } from "../helpers/goToContactWithPrefill";
import { DEFAULT_HOME_CONTENT } from "../content/defaultHomeContent";

function getLucideIcon(name) {
  return Icons?.[name] || Icons.Package;
}

export default function Units({ unit }) {
  const safeUnit = unit || DEFAULT_HOME_CONTENT.accommodations[0];
  const links = safeUnit.links || {};

  return (
    <section className="relative py-14 md:py-16">
      <SectionTitle eyebrow="Unidades" title={safeUnit.title} desc={safeUnit.subtitle} />

      <div className="mx-auto mt-8 grid max-w-6xl items-start gap-6 px-4 lg:grid-cols-2">
        <UnitCarousel folder={safeUnit.folder} images={safeUnit.images} altBase={safeUnit.title} />

        <div className="rounded-3xl border border-zinc-200/80 bg-white/70 p-6 shadow-sm ring-1 ring-black/[0.03] backdrop-blur-sm">
          <p className="text-sm leading-relaxed text-zinc-700 md:text-[15px]">{safeUnit.description || safeUnit.info}</p>

          {safeUnit.equipment?.length > 0 ? (
            <>
              <div className="mt-6 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-zinc-900">Equipamiento</p>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {safeUnit.equipment.map((item) => {
                  const Icon = getLucideIcon(item.icon);
                  return (
                    <div
                      key={`${safeUnit.id}-${item.name}`}
                      className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 shadow-[0_1px_0_rgba(0,0,0,0.03)] transition hover:bg-zinc-50"
                    >
                      <Icon className="h-4 w-4 text-zinc-600" />
                      <span className="leading-none">{item.name}</span>
                    </div>
                  );
                })}
              </div>
            </>
          ) : null}

          <div className="mt-6 h-px w-full bg-zinc-200/70" />

          <div className="mt-5">
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => goToContactWithPrefill(safeUnit)}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600"
              >
                <CalendarCheck className="h-4 w-4" />
                Consultar disponibilidad
              </button>

              {links?.turismomax ? (
                <a
                  href={links.turismomax}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-zinc-300 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50"
                >
                  <ExternalLink className="h-4 w-4" />
                  Reservar en TurismoMax
                </a>
              ) : (
                <div className="hidden sm:block" />
              )}

              {links?.booking ? (
                <a
                  href={links.booking}
                  target="_blank"
                  rel="noreferrer"
                  className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-2.5 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100"
                >
                  <ExternalLink className="h-4 w-4" />
                  Ver en Booking
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
