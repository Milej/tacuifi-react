import SurfaceCard from "./SurfaceCard";

export default function StatCard({ label, value, detail, accent = "emerald" }) {
  const accentClass =
    accent === "sand"
      ? "border-amber-200 bg-amber-50/70"
      : accent === "deep"
        ? "border-emerald-900/15 bg-emerald-950/[0.03]"
        : "border-emerald-900/10 bg-white/85";

  return (
    <SurfaceCard className="overflow-hidden">
      <div className={`border ${accentClass} px-5 py-5`}>
        <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{label}</p>
        <p className="mt-3 text-3xl font-semibold text-zinc-900">{value}</p>
        {detail ? <p className="mt-2 text-sm leading-relaxed text-zinc-600">{detail}</p> : null}
      </div>
    </SurfaceCard>
  );
}
