const toneMap = {
  active: "bg-emerald-100 text-emerald-800 border-emerald-200",
  approved: "bg-emerald-100 text-emerald-800 border-emerald-200",
  confirmed: "bg-emerald-100 text-emerald-800 border-emerald-200",
  paid: "bg-emerald-100 text-emerald-800 border-emerald-200",
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  partial: "bg-amber-100 text-amber-800 border-amber-200",
  scheduled: "bg-zinc-100 text-zinc-700 border-zinc-200",
  completed: "bg-emerald-100 text-emerald-800 border-emerald-200",
  expired: "bg-zinc-200 text-zinc-700 border-zinc-300",
  cancelled: "bg-rose-100 text-rose-700 border-rose-200",
  removed: "bg-rose-100 text-rose-700 border-rose-200",
  failed: "bg-rose-100 text-rose-700 border-rose-200",
  refunded: "bg-rose-100 text-rose-700 border-rose-200",
  normal: "bg-zinc-200 text-zinc-700 border-zinc-300",
};

export default function StatusBadge({ status, children }) {
  const key = String(status || "").toLowerCase();
  const classes = toneMap[key] || "bg-zinc-100 text-zinc-700 border-zinc-200";

  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${classes}`}>
      {children || status}
    </span>
  );
}
