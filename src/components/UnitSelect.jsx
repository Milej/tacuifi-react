const UNITS = ["Apartamento", "Cabaña de piedra"];

function normalizeUnidad(input) {
  const raw = String(input || "").trim();
  const v = raw.toLowerCase();

  if (v.includes("apart")) return "Apartamento";
  if (v.includes("piedra")) return "Cabaña de piedra";

  // si viene algo raro, lo dejamos (pero vamos a mostrar placeholder)
  return raw;
}

export default function UnitSelect({ value, onChange, error }) {
  const normalizedValue = normalizeUnidad(value);

  const isValid = UNITS.includes(normalizedValue);
  const selectValue = isValid ? normalizedValue : "";

  return (
    <div>
      <label className="block text-xs text-zinc-600 mb-1">Unidad</label>

      <select
        value={selectValue}
        onChange={(e) => onChange(e.target.value)}
        className={[
          "w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none",
          "focus:ring-2 focus:ring-zinc-900/10",
          error ? "border-red-300" : "border-zinc-200",
        ].join(" ")}
      >
        <option value="" disabled>
          Elegí una unidad
        </option>

        {UNITS.map((u) => (
          <option key={u} value={u}>
            {u}
          </option>
        ))}
      </select>

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
