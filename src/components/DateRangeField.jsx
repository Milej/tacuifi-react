import { useRef } from "react";

function addDays(dateStr, days) {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() + days);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function isValidISODate(dateStr) {
  if (!dateStr || typeof dateStr !== "string") return false;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;

  const [y, m, d] = dateStr.split("-").map(Number);
  if (!Number.isFinite(y) || !Number.isFinite(m) || !Number.isFinite(d)) return false;
  if (y < 2000 || y > 2100) return false;
  if (m < 1 || m > 12) return false;
  if (d < 1 || d > 31) return false;

  const dt = new Date(y, m - 1, d);
  return dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d;
}

export default function DateRangeField({ value, onChange, error }) {
  const { desde = "", hasta = "" } = value || {};
  const hastaRef = useRef(null);

  const handleDesdeChange = (e) => {
    const newDesde = e.target.value;

    if (!isValidISODate(newDesde)) {
      onChange({ desde: newDesde, hasta });
      return;
    }

    const minHasta = addDays(newDesde, 1);
    const newHasta = !hasta || hasta < minHasta ? minHasta : hasta;

    onChange({ desde: newDesde, hasta: newHasta });

    requestAnimationFrame(() => {
      if (hastaRef.current) {
        if (typeof hastaRef.current.showPicker === "function") hastaRef.current.showPicker();
        else hastaRef.current.focus();
      }
    });
  };

  const inputBase = [
    "w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none",
    "focus:ring-2 focus:ring-zinc-900/10",
    error ? "border-red-300" : "border-zinc-200",
  ].join(" ");

  return (
    <div className="h-full">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-[11px] text-zinc-500 mb-1">Entrada</p>
          <input type="date" value={desde} onChange={handleDesdeChange} className={inputBase} />
        </div>

        <div>
          <p className="text-[11px] text-zinc-500 mb-1">Salida</p>
          <input
            ref={hastaRef}
            type="date"
            value={hasta}
            min={isValidISODate(desde) ? addDays(desde, 1) : undefined}
            onChange={(e) => onChange({ desde, hasta: e.target.value })}
            className={inputBase}
          />
        </div>
      </div>

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
