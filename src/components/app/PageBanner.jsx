import SurfaceCard from "./SurfaceCard";

export default function PageBanner({ eyebrow, title, description, actions, compact = false }) {
  return (
    <SurfaceCard className={`overflow-hidden border border-zinc-200 ${compact ? "" : "min-h-[220px]"}`}>
      <div className="px-6 py-7 md:px-8 md:py-9">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            {eyebrow ? (
              <p className="text-[11px] uppercase tracking-[0.28em] text-zinc-500">{eyebrow}</p>
            ) : null}
            <h1 className="mt-3 font-display text-4xl leading-none text-zinc-900 md:text-5xl">{title}</h1>
            {description ? <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-700 md:text-base">{description}</p> : null}
          </div>
          {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
        </div>
      </div>
    </SurfaceCard>
  );
}
