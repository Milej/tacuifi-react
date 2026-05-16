import { ArrowRight, BadgePercent, CalendarDays, Sparkles } from "lucide-react";
import SectionTitle from "./SectionTitle";
import { goToContactWithPrefill } from "../helpers/goToContactWithPrefill";
import { DEFAULT_HOME_CONTENT } from "../content/defaultHomeContent";
import { formatPromotionDateLabel, getImageAlt, isPromotionVisible, resolveAssetUrl } from "../helpers/siteContent";

export default function Promotions({
  section = DEFAULT_HOME_CONTENT.promotionsSection,
  promotions = DEFAULT_HOME_CONTENT.promotions,
  accommodations = DEFAULT_HOME_CONTENT.accommodations,
}) {
  const visiblePromotions = (promotions || [])
    .filter((item) => isPromotionVisible(item))
    .slice()
    .sort((left, right) => Number(left?.sortOrder ?? 0) - Number(right?.sortOrder ?? 0));
  const unitFallback = accommodations?.[0] || null;

  const getTargetUnit = (unitId) => accommodations.find((item) => item.id === unitId) || unitFallback;

  return (
    <section className="relative py-14 md:py-16">
      <SectionTitle eyebrow={section?.eyebrow} title={section?.title} desc={section?.description} />

      <div className="mx-auto mt-8 max-w-6xl px-4">
        {visiblePromotions.length === 0 ? (
          <div className="rounded-3xl border border-zinc-200/80 bg-white/70 p-6 shadow-sm ring-1 ring-black/[0.03] backdrop-blur-sm md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50 leading-none">
                  <Sparkles className="h-6 w-6 text-zinc-700" />
                </div>

                <div>
                  <p className="text-base font-semibold text-zinc-900">{section?.emptyTitle}</p>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-600">{section?.emptyDescription}</p>
                </div>
              </div>

              <div className="flex w-full flex-col gap-3 sm:flex-row md:ml-auto md:w-auto">
                <button
                  type="button"
                  onClick={() => goToContactWithPrefill(unitFallback)}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600"
                >
                  Consultar disponibilidad
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {visiblePromotions.map((promo) => (
              <div
                key={promo.id}
                className="overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/70 shadow-sm ring-1 ring-black/[0.03] backdrop-blur-sm"
              >
                {promo.image?.url ? (
                  <div className="aspect-[16/9] overflow-hidden border-b border-zinc-200/80 bg-zinc-100">
                    <img
                      src={resolveAssetUrl(promo.image)}
                      alt={getImageAlt(promo.image, promo.title)}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ) : null}

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50 leading-none">
                        <BadgePercent className="h-5 w-5 text-zinc-700" />
                      </div>

                      <div>
                        {promo.highlightText ? (
                          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-800">
                            {promo.highlightText}
                          </p>
                        ) : null}
                        <h3 className="mt-1 font-semibold text-zinc-900">{promo.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-zinc-600">{promo.description}</p>

                        {promo.disclaimer ? (
                          <p className="mt-2 text-xs text-zinc-500">
                            <span className="font-semibold text-zinc-700">Importante:</span> {promo.disclaimer}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <div className="inline-flex items-center gap-2 text-sm text-zinc-600">
                      <CalendarDays className="h-4 w-4" />
                      {formatPromotionDateLabel(promo)}
                    </div>

                    <button
                      type="button"
                      onClick={() => goToContactWithPrefill({ ...getTargetUnit(promo.unitId), promo })}
                      className="ml-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600"
                    >
                      {promo.ctaLabel || "Consultar promo"}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
